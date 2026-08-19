/* =========================================================================
   TRIBU — noyau de l'application
   =========================================================================
   Ce fichier contient : les outils de base (dates, points, affichage),
   la securite (codes chiffres, invitations), le stockage (local ou partage
   via Firebase), la connexion des membres, et toutes les actions.

   Le dessin des ecrans est dans vues.js, les formulaires dans formulaires.js.

   ---------------------------------------------------------------------------
   COMMENT L'ACCES EST PROTEGE (version 2)
   ---------------------------------------------------------------------------
   1. Le code de la famille ne donne plus aucun acces. Il ne sert qu'a
      afficher un nom lisible. Pour entrer, il faut que l'appareil soit
      inscrit dans la liste `membresUid` de la famille.
   2. On y entre par une INVITATION a usage unique creee par un
      administrateur (un long jeton aleatoire, valable quelques jours).
   3. Les codes a 4 chiffres ne sont jamais enregistres tels quels : on
      garde seulement une empreinte chiffree (PBKDF2), impossible a relire.
   4. Les points vivent dans un JOURNAL en ecriture unique. Chaque ligne est
      creee par un administrateur, ne peut plus etre modifiee ensuite, et son
      montant est verifie par Firebase lui-meme (voir firestore.rules).
      Personne ne peut donc s'attribuer des points depuis son telephone.
   ========================================================================= */

/* ============================ 1. Outils ============================ */

const $ = (sel) => document.querySelector(sel);
const RAYONS = ["Fruits & légumes", "Boucherie", "Poissonnerie", "Crèmerie",
  "Boulangerie", "Épicerie", "Surgelés", "Boissons", "Entretien", "Autre"];
const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const EMOJIS_MEMBRES = ["😀", "😎", "🦊", "🐻", "🐼", "🦁", "🐨", "🐧", "🦉", "🐬",
  "🌻", "🌷", "⭐", "🚀", "⚽", "🎸", "🎨", "📚", "🍀", "🐢"];
const EMOJIS_TACHES = ["🧹", "🧽", "🍽️", "🧺", "🗑️", "🛏️", "🚿", "🪣", "🧴", "🌱",
  "🐕", "🚗", "📬", "🧑‍🍳", "🪟", "👕", "♻️", "🧻", "🛋️", "🪥"];
const EMOJIS_CADEAUX = ["🎁", "🍿", "🎮", "🍦", "🎬", "🎡", "🍕", "🧸", "🎨", "⚽",
  "📱", "🚴", "🎧", "💤", "🏊", "🎳", "🍫", "🎟️", "🛍️", "🌟"];

/* Rubriques rangees dans le document principal de la famille.
   `etats` et `journal` sont a part : ils ont leurs propres regles de securite. */
const CLES_DOC = ["famille", "membres", "membresUid", "adminsUid", "taches", "bareme",
  "courses", "recettes", "repas", "notes", "cadeaux", "tarifs", "echanges",
  "reglages", "jetonUtilise"];

function id() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function pad(n) { return String(n).padStart(2, "0"); }
function propre(v) { return JSON.parse(JSON.stringify(v)); }

/* --- Dates et periodes --- */
function isoDate(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
function deIso(s) { const [a, m, j] = s.split("-").map(Number); return new Date(a, m - 1, j); }
function lundiDe(d) {
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  t.setDate(t.getDate() - ((t.getDay() + 6) % 7));
  return t;
}
function numSemaine(d) {
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  t.setDate(t.getDate() - ((t.getDay() + 6) % 7) + 3);      // jeudi de la semaine
  const pj = new Date(t.getFullYear(), 0, 4);
  pj.setDate(pj.getDate() - ((pj.getDay() + 6) % 7) + 3);   // jeudi de la semaine 1
  return { annee: t.getFullYear(), num: 1 + Math.round((t - pj) / (7 * 86400000)) };
}
function cleSemaine(d) { const s = numSemaine(d); return s.annee + "-S" + pad(s.num); }
function lundiDeCle(cle) {
  const [a, n] = cle.split("-S").map(Number);
  const pj = new Date(a, 0, 4);
  pj.setDate(pj.getDate() - ((pj.getDay() + 6) % 7));       // lundi de la semaine 1
  pj.setDate(pj.getDate() + (n - 1) * 7);
  return pj;
}
function indexPeriode(freq, d) {
  if (freq === "jour") return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  if (freq === "mois") return d.getFullYear() * 12 + d.getMonth();
  const l = lundiDe(d);
  return Math.floor(Date.UTC(l.getFullYear(), l.getMonth(), l.getDate()) / 86400000 / 7);
}
function clePeriode(freq, d) {
  if (freq === "jour") return isoDate(d);
  if (freq === "mois") return d.getFullYear() + "-" + pad(d.getMonth() + 1);
  return cleSemaine(d);
}
function libellePeriode(freq) {
  if (freq === "jour") return "aujourd'hui";
  if (freq === "mois") return "ce mois-ci";
  return "cette semaine";
}
function dateJolie(s, avecAnnee) {
  if (!s) return "";
  const d = deIso(s);
  const o = { weekday: "short", day: "numeric", month: "short" };
  if (avecAnnee) o.year = "numeric";
  return d.toLocaleDateString("fr-FR", o);
}
function joursEntre(a, b) { return Math.round((deIso(b) - deIso(a)) / 86400000); }

/* --- Affichage --- */
let minuterieToast;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(minuterieToast);
  minuterieToast = setTimeout(() => t.classList.remove("on"), 2600);
}
function ouvrirFeuille(titre, html, apres) {
  const f = $("#feuille");
  f.innerHTML = '<div class="feuille-poignee"></div>' +
    (titre ? "<h3>" + esc(titre) + "</h3>" : "") + html;
  $("#voile").classList.add("on");
  if (apres) apres(f);
}
function fermerFeuille() {
  $("#voile").classList.remove("on");
  setTimeout(() => { if (!$("#voile").classList.contains("on")) $("#feuille").innerHTML = ""; }, 250);
}
function confirmer(message, opts) {
  opts = opts || {};
  return new Promise((resolve) => {
    ouvrirFeuille(opts.titre || "Confirmer",
      '<p style="margin:.2rem 0 1.2rem;line-height:1.5;font-size:.92rem">' + esc(message) + "</p>" +
      '<div class="rangee-btn">' +
      '<button class="btn" data-role="non">Annuler</button>' +
      '<button class="btn ' + (opts.danger ? "danger" : "principal") + '" data-role="oui">' +
      esc(opts.ok || "Confirmer") + "</button></div>",
      (f) => {
        f.querySelector('[data-role="non"]').onclick = () => { fermerFeuille(); resolve(false); };
        f.querySelector('[data-role="oui"]').onclick = () => { fermerFeuille(); resolve(true); };
      });
  });
}

/* ============================ 2. Securite ============================ */

/* Le chiffrement du navigateur n'existe qu'en https ou sur localhost.
   Ailleurs (http simple), on previent au lieu de faire semblant. */
const CRYPTO_DISPO = !!(window.crypto && window.crypto.subtle && window.isSecureContext);

function octetsVersHex(o) {
  return Array.from(o).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function hexVersOctets(h) {
  const o = new Uint8Array(h.length / 2);
  for (let i = 0; i < o.length; i++) o[i] = parseInt(h.substr(i * 2, 2), 16);
  return o;
}
function jetonAleatoire(octets) {
  return octetsVersHex(crypto.getRandomValues(new Uint8Array(octets || 24)));
}

/* Transforme un code a 4 chiffres en empreinte impossible a relire.
   PBKDF2 = on repasse 150 000 fois dans une moulinette, ce qui rend les
   essais en masse tres lents. */
async function hachePin(pin, selHex) {
  if (!CRYPTO_DISPO) return { sel: "", hash: "", clair: pin };
  const sel = selHex ? hexVersOctets(selHex) : crypto.getRandomValues(new Uint8Array(16));
  const cle = await crypto.subtle.importKey("raw", new TextEncoder().encode(pin),
    "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: sel, iterations: 150000, hash: "SHA-256" }, cle, 256);
  return { sel: octetsVersHex(sel), hash: octetsVersHex(new Uint8Array(bits)) };
}

/* Fabrique les champs a enregistrer pour un membre. */
async function champsPin(pin) {
  const r = await hachePin(pin);
  return r.hash ? { pinHash: r.hash, pinSel: r.sel, pin: null } : { pin: pin, pinHash: null, pinSel: null };
}

async function verifiePin(pin, m) {
  if (!m) return false;
  if (m.pinHash && m.pinSel) {
    const r = await hachePin(pin, m.pinSel);
    return r.hash === m.pinHash;
  }
  return !!m.pin && m.pin === pin;   // ancien format : converti au prochain enregistrement
}

/* Convertit en douceur les anciens codes en clair vers le format chiffre. */
async function migrerPinSiBesoin(m, pin) {
  if (!m || m.pinHash || !CRYPTO_DISPO) return;
  Object.assign(m, await champsPin(pin));
  await Store.ecrire(["membres"]);
}

/* ============================ 3. Etat ============================ */

function etatVide() {
  return {
    famille: { nom: "", code: "", creeLe: "", version: 2 },
    membres: [], membresUid: [], adminsUid: [],
    taches: [], bareme: {}, etats: {},
    courses: [], recettes: [], repas: {}, notes: [],
    cadeaux: [], tarifs: {}, echanges: [], journal: [],
    reglages: {}, jetonUtilise: null
  };
}

let etat = etatVide();
let moi = null;                       // membre connecte
const ui = {
  vue: "accueil",
  semaine: cleSemaine(new Date()),
  filtreTaches: "moi",
  filtreNotes: "avenir",
  rechercheRecette: "",
  focus: null
};

function membre(idm) { return etat.membres.find((m) => m.id === idm) || null; }
function estAdmin() { return !!(moi && moi.role === "admin"); }
function pointsDe(idm) {
  return etat.journal.reduce((s, e) => s + (e.membreId === idm ? e.delta : 0), 0);
}
function classement() {
  return etat.membres.map((m) => ({ m, pts: pointsDe(m.id) }))
    .sort((a, b) => b.pts - a.pts || a.m.prenom.localeCompare(b.m.prenom));
}

/* Les listes que Firebase utilise pour verifier les droits et les montants.
   A recalculer des qu'on touche aux membres, aux taches ou aux cadeaux. */
function recalculerIndex() {
  const uids = [];
  const admins = [];
  etat.membres.forEach((m) => {
    (m.uids || []).forEach((u) => {
      if (u && uids.indexOf(u) === -1) uids.push(u);
      if (u && m.role === "admin" && admins.indexOf(u) === -1) admins.push(u);
    });
  });
  etat.membresUid = uids;
  etat.adminsUid = admins;
  etat.bareme = {};
  etat.taches.forEach((t) => { etat.bareme[t.id] = t.points || 0; });
  etat.tarifs = {};
  etat.cadeaux.forEach((c) => { etat.tarifs[c.id] = c.cout || 0; });
}

/* --- Taches --- */
function participantsValides(t) {
  return (t.participants || []).filter((x) => membre(x));
}
function assigneDe(t, d) {
  const p = participantsValides(t);
  if (!p.length) return null;
  if (t.rotation === false) return p[0];
  const n = p.length;
  const i = (((indexPeriode(t.frequence, d) + (t.decalage || 0)) % n) + n) % n;
  return p[i];
}
function cleEtat(t, d) { return t.id + "|" + clePeriode(t.frequence, d); }
function etatTache(t, d) {
  return etat.etats[cleEtat(t, d)] || { statut: "afaire" };
}
function tachesDuMoment() {
  const d = new Date();
  return etat.taches.filter((t) => t.actif !== false).map((t) => ({
    t, d, assigne: assigneDe(t, d), et: etatTache(t, d)
  }));
}
function mesTachesAFaire() {
  return tachesDuMoment().filter((x) => x.assigne === (moi && moi.id) && x.et.statut === "afaire");
}
function tachesAValider() {
  return tachesDuMoment().filter((x) => x.et.statut === "fait");
}
function echangesEnAttente() {
  return etat.echanges.filter((e) => e.statut === "demande");
}

/* --- Notes --- */
function notesTriees() {
  return etat.notes.slice().sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));
}
function notesAVenir() { return notesTriees().filter((n) => !n.fait); }
function notesUrgentes() {
  const auj = isoDate(new Date());
  return notesAVenir().filter((n) => n.date && n.date <= auj);
}

/* ============================ 4. Stockage ============================ */

const Store = {
  mode: "local",          // "local" ou "nuage"
  code: null,
  uid: null,              // identifiant de CET appareil
  raison: "",
  _db: null, _fs: null, _unsubs: [],

  configOk() {
    const c = window.CONFIG_FIREBASE;
    return !!(c && c.apiKey && c.apiKey !== "A_REMPLIR" && c.projectId && c.projectId !== "A_REMPLIR");
  },

  async preparer() {
    if (!this.configOk()) {
      this.mode = "local";
      this.raison = "config";
      this.uid = this._uidLocal();
      return;
    }
    try {
      const base = "https://www.gstatic.com/firebasejs/10.12.2/";
      const [app, auth, fs] = await Promise.all([
        import(base + "firebase-app.js"),
        import(base + "firebase-auth.js"),
        import(base + "firebase-firestore.js")
      ]);
      const a = app.initializeApp(window.CONFIG_FIREBASE);
      const au = auth.getAuth(a);
      const cred = await auth.signInAnonymously(au);
      this._fs = fs;
      this._db = fs.getFirestore(a);
      this.uid = cred.user.uid;
      this.mode = "nuage";
    } catch (err) {
      console.warn("Firebase indisponible, passage en mode local :", err);
      this.mode = "local";
      this.raison = "erreur";
      this.uid = this._uidLocal();
    }
  },

  /* En mode local, l'appareil s'invente un identifiant stable. */
  _uidLocal() {
    let u = localStorage.getItem("tribu:appareil");
    if (!u) { u = "local-" + jetonAleatoire(8); localStorage.setItem("tribu:appareil", u); }
    return u;
  },

  _cleLocale(code) { return "tribu:donnees:" + code; },
  _lireLocal(code) {
    const brut = localStorage.getItem(this._cleLocale(code));
    return brut ? JSON.parse(brut) : null;
  },
  _ecrireLocal(code, d) {
    localStorage.setItem(this._cleLocale(code), JSON.stringify(d));
  },

  /* --- lecture ---
     Ne leve jamais d'exception : renvoie null et note la cause dans
     `derniereErreur`, pour que l'appelant puisse expliquer plutot que planter. */
  derniereErreur: null,

  async charger(code) {
    this.derniereErreur = null;
    if (this.mode !== "nuage") return this._lireLocal(code);
    try {
      const d = await this._fs.getDoc(this._fs.doc(this._db, "familles", code));
      if (!d.exists()) return null;
      const principal = d.data();
      const e = {};
      const j = [];
      try {
        const [etats, journal] = await Promise.all([
          this._fs.getDocs(this._fs.collection(this._db, "familles", code, "etats")),
          this._fs.getDocs(this._fs.collection(this._db, "familles", code, "journal"))
        ]);
        etats.forEach((s) => { e[s.id.replace(/__/g, "|")] = s.data(); });
        journal.forEach((s) => j.push(Object.assign({ id: s.id }, s.data())));
      } catch (err) {
        /* Les rubriques annexes peuvent etre refusees sans que tout soit perdu. */
        console.warn("Lecture partielle (états / points) :", err);
        this.derniereErreur = err;
      }
      return Object.assign({}, principal, { etats: e, journal: j });
    } catch (err) {
      console.warn("Lecture refusée :", err);
      this.derniereErreur = err;
      return null;
    }
  },

  async creer(code, donnees) {
    this.derniereErreur = null;
    if (this.mode !== "nuage") { this._ecrireLocal(code, donnees); return true; }
    try {
      const principal = {};
      CLES_DOC.forEach((c) => { principal[c] = propre(donnees[c]); });
      await this._fs.setDoc(this._fs.doc(this._db, "familles", code), principal);
      return true;
    } catch (err) {
      console.warn("Création refusée :", err);
      this.derniereErreur = err;
      return false;
    }
  },

  abonner(code, cb) {
    this.code = code;
    this._detacher();
    if (this.mode === "nuage") {
      const d = this._db, fs = this._fs;
      const surErreur = (err) => console.warn("Ecoute interrompue :", err);
      this._unsubs.push(fs.onSnapshot(fs.doc(d, "familles", code), (s) => {
        if (s.exists()) cb(s.data(), "doc");
      }, surErreur));
      this._unsubs.push(fs.onSnapshot(fs.collection(d, "familles", code, "etats"), (q) => {
        const e = {};
        q.forEach((s) => { e[s.id.replace(/__/g, "|")] = s.data(); });
        cb({ etats: e }, "etats");
      }, surErreur));
      this._unsubs.push(fs.onSnapshot(fs.collection(d, "familles", code, "journal"), (q) => {
        const j = [];
        q.forEach((s) => j.push(Object.assign({ id: s.id }, s.data())));
        cb({ journal: j }, "journal");
      }, surErreur));
    } else {
      const surStockage = (ev) => {
        if (ev.key === this._cleLocale(code) && ev.newValue) cb(JSON.parse(ev.newValue), "tout");
      };
      window.addEventListener("storage", surStockage);
      this._unsubs.push(() => window.removeEventListener("storage", surStockage));
    }
  },

  _detacher() {
    this._unsubs.forEach((u) => { try { u(); } catch (e) { } });
    this._unsubs = [];
  },

  /* --- ecriture du document principal (une ou plusieurs rubriques) --- */
  async ecrire(cles) {
    if (this.mode !== "nuage") { this._ecrireLocal(this.code, etat); return; }
    const morceau = {};
    cles.forEach((c) => { if (CLES_DOC.indexOf(c) !== -1) morceau[c] = propre(etat[c]); });
    if (!Object.keys(morceau).length) return;
    try {
      await this._fs.setDoc(this._fs.doc(this._db, "familles", this.code), morceau, { merge: true });
    } catch (err) {
      console.warn("Echec de l'enregistrement :", err);
      toast("Enregistrement refusé (droits insuffisants ?)");
    }
  },

  /* --- ecriture de l'etat d'une tache --- */
  async ecrireEtat(cle, valeur) {
    if (this.mode !== "nuage") { this._ecrireLocal(this.code, etat); return; }
    try {
      await this._fs.setDoc(
        this._fs.doc(this._db, "familles", this.code, "etats", cle.replace(/\|/g, "__")),
        propre(valeur), { merge: true });
    } catch (err) {
      console.warn("Echec de l'enregistrement de la tache :", err);
      toast("Enregistrement refusé");
    }
  },

  /* --- ajout d'une ligne au journal des points (jamais de modification) --- */
  async ecrireJournal(entree) {
    if (this.mode !== "nuage") { this._ecrireLocal(this.code, etat); return true; }
    const { id: ident, ...corps } = entree;
    try {
      await this._fs.setDoc(
        this._fs.doc(this._db, "familles", this.code, "journal", ident),
        propre(corps));
      return true;
    } catch (err) {
      console.warn("Ligne de points refusee :", err);
      toast("Points refusés par le serveur");
      return false;
    }
  },

  /* --- invitations --- */
  async creerInvitation(inv) {
    this.derniereErreur = null;
    if (this.mode !== "nuage") {
      const t = JSON.parse(localStorage.getItem("tribu:invitations") || "{}");
      t[inv.jeton] = inv;
      localStorage.setItem("tribu:invitations", JSON.stringify(t));
      return true;
    }
    try {
      const { jeton, ...corps } = inv;
      await this._fs.setDoc(this._fs.doc(this._db, "invitations", jeton), propre(corps));
      return true;
    } catch (err) {
      console.warn("Invitation refusée :", err);
      this.derniereErreur = err;
      return false;
    }
  },

  async lireInvitation(jeton) {
    if (this.mode !== "nuage") {
      const t = JSON.parse(localStorage.getItem("tribu:invitations") || "{}");
      return t[jeton] || null;
    }
    const d = await this._fs.getDoc(this._fs.doc(this._db, "invitations", jeton));
    return d.exists() ? Object.assign({ jeton: jeton }, d.data()) : null;
  },

  async consommerInvitation(jeton) {
    if (this.mode !== "nuage") {
      const t = JSON.parse(localStorage.getItem("tribu:invitations") || "{}");
      if (t[jeton]) { t[jeton].utilisee = true; t[jeton].utiliseeLe = Date.now(); }
      localStorage.setItem("tribu:invitations", JSON.stringify(t));
      return;
    }
    await this._fs.setDoc(this._fs.doc(this._db, "invitations", jeton),
      { utilisee: true, utiliseeLe: Date.now() }, { merge: true });
  },

  /* Entree dans la famille : on ajoute cet appareil a la liste autorisee.
     C'est la seule ecriture qu'un non-membre a le droit de faire, et
     uniquement en presentant un jeton d'invitation valide. */
  async rejoindre(code, jeton) {
    if (this.mode !== "nuage") { this._ecrireLocal(code, etat); return true; }
    try {
      await this._fs.setDoc(this._fs.doc(this._db, "familles", code), {
        membres: propre(etat.membres),
        membresUid: propre(etat.membresUid),
        jetonUtilise: jeton
      }, { merge: true });
      return true;
    } catch (err) {
      console.warn("Invitation refusee :", err);
      return false;
    }
  }
};

/* Enregistre le document principal + redessine. */
function sauver(...cles) {
  if (cles.some((c) => ["membres", "taches", "cadeaux"].indexOf(c) !== -1)) {
    recalculerIndex();
    ["membresUid", "adminsUid", "bareme", "tarifs"].forEach((c) => {
      if (cles.indexOf(c) === -1) cles.push(c);
    });
  }
  Store.ecrire(cles);
  rendre();
}
function sauverEtat(cle) {
  Store.ecrireEtat(cle, etat.etats[cle]);
  rendre();
}

/* ============================ 5. Session ============================ */

const CLE_SESSION = "tribu:session";
function lireSession() {
  try { return JSON.parse(localStorage.getItem(CLE_SESSION) || "null"); } catch (e) { return null; }
}
function ecrireSession(s) {
  if (s) localStorage.setItem(CLE_SESSION, JSON.stringify(s));
  else localStorage.removeItem(CLE_SESSION);
}

function appliquerDonnees(d, portee) {
  if (portee === "etats") { etat.etats = d.etats || {}; return; }
  if (portee === "journal") { etat.journal = d.journal || []; return; }

  const v = etatVide();
  const garde = { etats: etat.etats, journal: etat.journal };
  etat = Object.assign(v, d || {});
  if (portee === "doc") {          // le document principal ne porte pas ces deux-la
    etat.etats = garde.etats;
    etat.journal = garde.journal;
  }
  /* Reprise des donnees de la version 1 */
  if (d && d.etatsTaches && !Object.keys(etat.etats || {}).length) etat.etats = d.etatsTaches;

  ["membres", "taches", "courses", "recettes", "notes", "cadeaux", "echanges", "journal",
    "membresUid", "adminsUid"].forEach((c) => { if (!Array.isArray(etat[c])) etat[c] = []; });
  ["etats", "repas", "reglages", "bareme", "tarifs"].forEach((c) => {
    if (!etat[c] || typeof etat[c] !== "object") etat[c] = {};
  });
  if (!etat.famille || typeof etat.famille !== "object") etat.famille = { nom: "", code: "" };
  if (moi) moi = membre(moi.id) || moi;
}

async function entrerDansFamille(code, membreId) {
  const d = await Store.charger(code);
  if (!d) return false;
  appliquerDonnees(d);
  moi = membre(membreId);
  if (!moi) return false;
  Store.code = code;
  Store.abonner(code, (nouv, portee) => { appliquerDonnees(nouv, portee); rendre(); });
  ecrireSession({ code: code, membreId: membreId });
  localStorage.setItem("tribu:derniereFamille", code);
  $("#ecran-connexion").hidden = true;
  $("#ecran-app").hidden = false;
  ui.vue = "accueil";
  rendre();
  return true;
}

/* Deconnexion : l'appareil reste autorise, on revient juste au choix du profil. */
async function deconnecter() {
  const code = Store.code || localStorage.getItem("tribu:derniereFamille");
  ecrireSession(null);
  moi = null;
  Store._detacher();
  $("#ecran-app").hidden = true;
  $("#ecran-connexion").hidden = false;
  if (code) {
    const d = await Store.charger(code);
    if (d) {
      etat = etatVide();
      Connexion.aller("profils", { code: code, donnees: d, jeton: null });
      return;
    }
  }
  etat = etatVide();
  Connexion.aller("accueil");
}

/* ============================ 6. Actions ============================ */

const Actions = {

  /* --- Taches --- */
  marquerFaite(tacheId) {
    const t = etat.taches.find((x) => x.id === tacheId);
    if (!t) return;
    const d = new Date();
    const cle = cleEtat(t, d);
    if ((etat.etats[cle] || {}).statut === "valide") return;
    etat.etats[cle] = {
      statut: "fait",
      parQui: (moi && moi.id) || assigneDe(t, d),
      faitLe: new Date().toISOString(),
      valideLe: null, valideePar: null
    };
    sauverEtat(cle);
    toast(estAdmin() ? "Fait ! À valider ci-dessous." : "Fait ! En attente de validation.");
  },

  annulerFaite(tacheId) {
    const t = etat.taches.find((x) => x.id === tacheId);
    if (!t) return;
    const cle = cleEtat(t, new Date());
    if ((etat.etats[cle] || {}).statut !== "fait") return;
    etat.etats[cle] = { statut: "afaire", parQui: null, faitLe: null, valideLe: null, valideePar: null };
    sauverEtat(cle);
  },

  async valider(tacheId) {
    const t = etat.taches.find((x) => x.id === tacheId);
    if (!t || !estAdmin()) return;
    const cle = cleEtat(t, new Date());
    const e = etat.etats[cle];
    if (!e || e.statut !== "fait") return;

    const gagnant = e.parQui || assigneDe(t, new Date());
    e.statut = "valide";
    e.valideLe = new Date().toISOString();
    e.valideePar = moi.id;
    etat.etats[cle] = e;
    await Store.ecrireEtat(cle, e);

    if (gagnant && t.points) {
      await ajouterAuJournal({
        id: "t|" + t.id + "|" + clePeriode(t.frequence, new Date()),
        type: "tache", refId: t.id, cleEtat: cle.replace(/\|/g, "__"),
        membreId: gagnant, delta: t.points, motif: "Tâche : " + t.nom
      });
    }
    rendre();
    const m = membre(gagnant);
    toast(m && t.points ? "+" + t.points + " points pour " + m.prenom + " 🌟" : "Validé");
  },

  async refuser(tacheId) {
    const t = etat.taches.find((x) => x.id === tacheId);
    if (!t || !estAdmin()) return;
    const ok = await confirmer("Renvoyer « " + t.nom + " » en « à faire » ? Aucun point ne sera donné.",
      { titre: "Refuser la tâche", ok: "Renvoyer", danger: true });
    if (!ok) return;
    const cle = cleEtat(t, new Date());
    etat.etats[cle] = { statut: "afaire", parQui: null, faitLe: null, valideLe: null, valideePar: null };
    sauverEtat(cle);
  },

  /* --- Courses --- */
  ajouterCourse(nom, rayon, qte) {
    nom = (nom || "").trim();
    if (!nom) return;
    etat.courses.unshift({
      id: id(), nom: nom, qte: (qte || "").trim(), rayon: rayon || "Autre",
      coche: false, parQui: moi && moi.id, creeLe: new Date().toISOString()
    });
    sauver("courses");
  },
  basculerCourse(cid) {
    const c = etat.courses.find((x) => x.id === cid);
    if (!c) return;
    c.coche = !c.coche;
    sauver("courses");
  },
  supprimerCourse(cid) {
    etat.courses = etat.courses.filter((x) => x.id !== cid);
    sauver("courses");
  },
  async viderCoches() {
    const n = etat.courses.filter((c) => c.coche).length;
    if (!n) return;
    const ok = await confirmer("Retirer les " + n + " article(s) coché(s) de la liste ?",
      { titre: "Nettoyer la liste", ok: "Retirer" });
    if (!ok) return;
    etat.courses = etat.courses.filter((c) => !c.coche);
    sauver("courses");
    toast("Liste nettoyée");
  },

  /* --- Repas --- */
  definirRepas(cleSem, jour, moment, valeur) {
    if (!etat.repas[cleSem]) etat.repas[cleSem] = {};
    etat.repas[cleSem][jour + "-" + moment] = valeur;
    sauver("repas");
  },

  /* --- Notes --- */
  basculerNote(nid) {
    const n = etat.notes.find((x) => x.id === nid);
    if (!n) return;
    if (!n.fait && n.repetition && n.repetition !== "aucune" && n.date) {
      const d = deIso(n.date);
      if (n.repetition === "hebdo") d.setDate(d.getDate() + 7);
      else if (n.repetition === "mensuel") d.setMonth(d.getMonth() + 1);
      else d.setFullYear(d.getFullYear() + 1);
      n.date = isoDate(d);
      sauver("notes");
      toast("Reporté au " + dateJolie(n.date, true));
      return;
    }
    n.fait = !n.fait;
    sauver("notes");
  },
  supprimerNote(nid) {
    etat.notes = etat.notes.filter((x) => x.id !== nid);
    sauver("notes");
  },

  /* --- Cadeaux et points --- */
  async demanderCadeau(cid) {
    const c = etat.cadeaux.find((x) => x.id === cid);
    if (!c || !moi) return;
    if (pointsDe(moi.id) < c.cout) { toast("Pas encore assez de points"); return; }
    const ok = await confirmer("Échanger " + c.cout + " points contre « " + c.nom +
      " » ? Un administrateur devra accepter.", { titre: "Demander ce cadeau", ok: "Demander" });
    if (!ok) return;
    etat.echanges.unshift({
      id: id(), membreId: moi.id, cadeauId: c.id, cadeauNom: c.nom, cadeauEmoji: c.emoji,
      cout: c.cout, statut: "demande", demandeLe: new Date().toISOString(),
      traiteLe: null, traitePar: null
    });
    sauver("echanges");
    toast("Demande envoyée 🎁");
  },

  async accorderEchange(eid) {
    const e = etat.echanges.find((x) => x.id === eid);
    if (!e || !estAdmin() || e.statut !== "demande") return;
    if (pointsDe(e.membreId) < e.cout) { toast("Ce membre n'a plus assez de points"); return; }

    const ok = await ajouterAuJournal({
      id: "c|" + e.id, type: "cadeau", refId: e.cadeauId,
      membreId: e.membreId, delta: -e.cout, motif: "Cadeau : " + e.cadeauNom
    });
    if (!ok) return;
    e.statut = "accorde";
    e.traiteLe = new Date().toISOString();
    e.traitePar = moi.id;
    sauver("echanges");
    toast("Cadeau accordé 🎉");
  },

  async refuserEchange(eid) {
    const e = etat.echanges.find((x) => x.id === eid);
    if (!e || !estAdmin() || e.statut !== "demande") return;
    const ok = await confirmer("Refuser la demande de cadeau « " + e.cadeauNom + " » ?",
      { titre: "Refuser", ok: "Refuser", danger: true });
    if (!ok) return;
    e.statut = "refuse";
    e.traiteLe = new Date().toISOString();
    e.traitePar = moi.id;
    sauver("echanges");
  },

  async ajusterPoints(membreId, delta, motif) {
    if (!estAdmin()) return;
    const ok = await ajouterAuJournal({
      id: "a|" + id(), type: "ajustement", refId: null,
      membreId: membreId, delta: delta, motif: motif || "Ajustement"
    });
    if (ok) { rendre(); toast((delta > 0 ? "+" : "") + delta + " points"); }
  }
};

/* Ajoute une ligne au journal des points.
   Le serveur verifie le montant : si la ligne existe deja ou si le montant ne
   correspond pas au bareme, elle est refusee et rien n'est credite. */
async function ajouterAuJournal(entree) {
  entree.date = new Date().toISOString();
  entree.parAdmin = moi ? moi.id : null;
  const ok = await Store.ecrireJournal(entree);
  if (!ok) return false;
  if (!etat.journal.some((x) => x.id === entree.id)) etat.journal.unshift(entree);
  return true;
}

/* ============================ 7. Invitations ============================ */

const Invitations = {
  async creer(joursValidite) {
    if (!estAdmin()) return null;
    const inv = {
      jeton: jetonAleatoire(24),
      famille: etat.famille.code,
      nomFamille: etat.famille.nom,
      creeePar: moi.id,
      creeeLe: Date.now(),
      expireLe: Date.now() + (joursValidite || 7) * 86400000,
      utilisee: false,
      utiliseeLe: null
    };
    const ok = await Store.creerInvitation(inv);
    if (!ok) {
      toast("Invitation refusée : règles Firebase à vérifier");
      return null;
    }
    return inv;
  },

  lien(jeton) {
    const base = location.origin + location.pathname;
    return base + "?invitation=" + jeton;
  },

  /* Extrait le jeton d'un lien colle, ou renvoie le texte s'il s'agit deja d'un jeton. */
  extraireJeton(texte) {
    const t = (texte || "").trim();
    const m = t.match(/invitation=([a-f0-9]{16,})/i);
    if (m) return m[1].toLowerCase();
    return /^[a-f0-9]{16,}$/i.test(t) ? t.toLowerCase() : null;
  },

  async valider(jeton) {
    const inv = await Store.lireInvitation(jeton);
    if (!inv) return { ok: false, message: "Cette invitation n'existe pas." };
    if (inv.utilisee) return { ok: false, message: "Cette invitation a déjà été utilisée." };
    if (inv.expireLe && inv.expireLe < Date.now()) return { ok: false, message: "Cette invitation a expiré." };
    const donnees = await Store.charger(inv.famille);
    if (!donnees) return { ok: false, message: "Famille introuvable." };
    return { ok: true, invitation: inv, donnees: donnees };
  }
};

/* ============================ 8. Generateur de menus ============================ */

function recettesUtiliseesRecemment(cleSem, nbSemaines) {
  const vus = new Set();
  const lundi = lundiDeCle(cleSem);
  for (let k = 1; k <= nbSemaines; k++) {
    const d = new Date(lundi); d.setDate(d.getDate() - 7 * k);
    const sem = etat.repas[cleSemaine(d)];
    if (!sem) continue;
    Object.values(sem).forEach((c) => { if (c && c.recetteId) vus.add(c.recetteId); });
  }
  return vus;
}

function genererMenus(cleSem, opt) {
  const pool = etat.recettes.slice();
  if (!pool.length) { toast("Ajoutez d'abord des recettes"); return 0; }

  const semaine = etat.repas[cleSem] || {};
  const cases = [];
  JOURS.forEach((j) => {
    ["midi", "soir"].forEach((m) => {
      if (m === "midi" && !opt.midi) return;
      if (m === "soir" && !opt.soir) return;
      if (semaine[j + "-" + m] && !opt.remplacer) return;
      cases.push({ jour: j, moment: m });
    });
  });
  if (!cases.length) { toast("Rien à remplir avec ces options"); return 0; }

  const recents = recettesUtiliseesRecemment(cleSem, 3);
  const utilises = new Set();
  let vegeRestants = Math.min(opt.vege || 0, cases.length);

  if (!etat.repas[cleSem]) etat.repas[cleSem] = {};

  cases.forEach((c, rang) => {
    const casesRestantes = cases.length - rang;
    let meilleur = null, meilleurScore = -1e9;
    pool.forEach((r) => {
      let s = Math.random() * 1.5;
      if (utilises.has(r.id)) s -= 40;
      if (recents.has(r.id)) s -= 6;
      if (vegeRestants > 0) {
        if (r.vegetarien) s += (vegeRestants >= casesRestantes ? 30 : 6);
        else if (vegeRestants >= casesRestantes) s -= 30;
      }
      if (opt.soirLeger && c.moment === "soir" && r.type === "leger") s += 4;
      if (opt.soirLeger && c.moment === "midi" && r.type === "consistant") s += 1.5;
      if (opt.rapideSemaine && c.jour !== "samedi" && c.jour !== "dimanche" && r.rapide) s += 2.5;
      if (s > meilleurScore) { meilleurScore = s; meilleur = r; }
    });
    if (!meilleur) return;
    utilises.add(meilleur.id);
    if (meilleur.vegetarien && vegeRestants > 0) vegeRestants--;
    etat.repas[cleSem][c.jour + "-" + c.moment] = { recetteId: meilleur.id, texte: "" };
  });

  sauver("repas");
  return cases.length;
}

function ingredientsDeLaSemaine(cleSem) {
  const sem = etat.repas[cleSem] || {};
  const parNom = new Map();
  Object.values(sem).forEach((c) => {
    if (!c || !c.recetteId) return;
    const r = etat.recettes.find((x) => x.id === c.recetteId);
    if (!r) return;
    (r.ingredients || []).forEach((ing) => {
      const cle = ing.nom.toLowerCase().trim();
      if (parNom.has(cle)) {
        const e = parNom.get(cle);
        if (ing.qte && e.qte.indexOf(ing.qte) === -1) e.qte += " + " + ing.qte;
      } else {
        parNom.set(cle, { nom: ing.nom, qte: ing.qte || "", rayon: ing.rayon || "Autre" });
      }
    });
  });
  return Array.from(parNom.values()).sort((a, b) =>
    RAYONS.indexOf(a.rayon) - RAYONS.indexOf(b.rayon) || a.nom.localeCompare(b.nom));
}

/* ============================ 9. Rendu general ============================ */

const TITRES = {
  accueil: ["Accueil", ""],
  taches: ["Tâches", "Qui fait quoi"],
  courses: ["Courses", "Liste partagée"],
  menus: ["Menus", "Repas de la semaine"],
  notes: ["Rappels", "À ne pas oublier"],
  points: ["Points & cadeaux", "La boutique de la famille"],
  recettes: ["Mes recettes", "Bibliothèque de plats"],
  admin: ["Administration", "Réglages de la famille"]
};

function rendre() {
  if (!moi) return;
  const v = ui.vue;

  $("#btn-profil").textContent = moi.emoji || "🙂";
  $("#titre-vue").textContent = TITRES[v] ? TITRES[v][0] : "Tribu";
  $("#sous-titre-vue").textContent = v === "accueil" ? etat.famille.nom : (TITRES[v] ? TITRES[v][1] : "");
  $("#mes-points").textContent = pointsDe(moi.id);

  document.querySelectorAll(".vue").forEach((s) => s.classList.remove("active"));
  const cible = $("#vue-" + v);
  cible.classList.add("active");
  cible.innerHTML = Vues[v]();

  document.querySelectorAll(".nav button").forEach((b) => {
    b.classList.toggle("active", b.dataset.vue === v);
  });
  majPastilles();
  majFab();

  if (ui.focus) {
    const el = document.getElementById(ui.focus);
    if (el) { el.focus(); if (el.setSelectionRange) { const n = el.value.length; el.setSelectionRange(n, n); } }
    ui.focus = null;
  }
}

function majPastilles() {
  const compteurs = {
    taches: mesTachesAFaire().length + (estAdmin() ? tachesAValider().length : 0),
    courses: etat.courses.filter((c) => !c.coche).length,
    notes: notesUrgentes().length
  };
  document.querySelectorAll(".nav button").forEach((b) => {
    const anc = b.querySelector(".pastille");
    if (anc) anc.remove();
    const n = compteurs[b.dataset.vue];
    if (n) {
      const s = document.createElement("span");
      s.className = "pastille";
      s.textContent = n > 99 ? "99+" : n;
      b.appendChild(s);
    }
  });
}

const FAB = {
  taches: { admin: true, action: "tache-nouvelle" },
  courses: { admin: false, action: "course-nouvelle" },
  notes: { admin: false, action: "note-nouvelle" },
  recettes: { admin: false, action: "recette-nouvelle" },
  points: { admin: true, action: "cadeau-nouveau" }
};
function majFab() {
  const f = $("#fab");
  const conf = FAB[ui.vue];
  if (!conf || (conf.admin && !estAdmin())) { f.hidden = true; return; }
  f.hidden = false;
  f.dataset.action = conf.action;
}

function aller(vue) {
  ui.vue = vue;
  window.scrollTo({ top: 0 });
  rendre();
}

/* ============================ 10. Ecoute des clics ============================ */

document.addEventListener("click", (e) => {
  const nav = e.target.closest(".nav button");
  if (nav) { aller(nav.dataset.vue); return; }
  if (e.target.id === "voile") { fermerFeuille(); return; }

  const b = e.target.closest("[data-action]");
  if (!b) return;
  const a = b.dataset.action;
  const v = b.dataset.id;

  switch (a) {
    case "aller": aller(b.dataset.vue); break;
    case "fermer": fermerFeuille(); break;

    case "tache-fait": Actions.marquerFaite(v); break;
    case "tache-annuler": Actions.annulerFaite(v); break;
    case "tache-valider": Actions.valider(v); break;
    case "tache-refuser": Actions.refuser(v); break;
    case "tache-nouvelle": Formulaires.tache(null); break;
    case "tache-editer": Formulaires.tache(v); break;
    case "taches-filtre": ui.filtreTaches = b.dataset.valeur; rendre(); break;

    case "course-toggle": Actions.basculerCourse(v); break;
    case "course-suppr": Actions.supprimerCourse(v); break;
    case "course-nouvelle": Formulaires.course(); break;
    case "courses-vider": Actions.viderCoches(); break;

    case "semaine-prec": {
      const d = lundiDeCle(ui.semaine); d.setDate(d.getDate() - 7);
      ui.semaine = cleSemaine(d); rendre(); break;
    }
    case "semaine-suiv": {
      const d = lundiDeCle(ui.semaine); d.setDate(d.getDate() + 7);
      ui.semaine = cleSemaine(d); rendre(); break;
    }
    case "repas-case": Formulaires.repas(b.dataset.jour, b.dataset.moment); break;
    case "menus-generer": Formulaires.generateur(); break;
    case "menus-courses": Formulaires.ingredientsVersCourses(); break;

    case "recette-nouvelle": Formulaires.recette(null); break;
    case "recette-editer": Formulaires.recette(v); break;

    case "note-toggle": Actions.basculerNote(v); break;
    case "note-nouvelle": Formulaires.note(null); break;
    case "note-editer": Formulaires.note(v); break;
    case "notes-filtre": ui.filtreNotes = b.dataset.valeur; rendre(); break;

    case "cadeau-demander": Actions.demanderCadeau(v); break;
    case "cadeau-nouveau": Formulaires.cadeau(null); break;
    case "cadeau-editer": Formulaires.cadeau(v); break;
    case "echange-accorder": Actions.accorderEchange(v); break;
    case "echange-refuser": Actions.refuserEchange(v); break;
    case "points-ajuster": Formulaires.ajustementPoints(v); break;
    case "points-historique": Formulaires.historique(); break;

    case "membre-nouveau": Formulaires.membre(null); break;
    case "membre-editer": Formulaires.membre(v); break;
    case "inviter": Formulaires.invitation(); break;
    case "menu-profil": Formulaires.menuProfil(); break;
    case "deconnexion": fermerFeuille(); deconnecter(); break;

    case "theme": {
      const actuel = document.documentElement.dataset.theme || "auto";
      const suivant = actuel === "auto" ? "light" : actuel === "light" ? "dark" : "auto";
      if (suivant === "auto") delete document.documentElement.dataset.theme;
      else document.documentElement.dataset.theme = suivant;
      localStorage.setItem("tribu:theme", suivant);
      Formulaires.menuProfil();
      break;
    }
    case "copier": {
      const t = b.dataset.texte || "";
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => toast("Copié"));
      else toast(t);
      break;
    }
  }
});

/* Saisie rapide dans la liste de courses */
document.addEventListener("submit", (e) => {
  if (e.target.id !== "form-course-rapide") return;
  e.preventDefault();
  const champ = document.getElementById("champ-course");
  const val = champ.value.trim();
  if (!val) return;
  champ.value = "";
  ui.focus = "champ-course";
  Actions.ajouterCourse(val, devinerRayon(val), "");
});

/* Recherche dans la bibliotheque de recettes */
document.addEventListener("input", (e) => {
  if (e.target.id !== "champ-recherche-recette") return;
  ui.rechercheRecette = e.target.value;
  ui.focus = "champ-recherche-recette";
  rendre();
});

/* Devine le rayon d'un article */
const MOTS_RAYONS = {
  "Fruits & légumes": ["pomme", "banane", "tomate", "salade", "carotte", "oignon", "ail ", "courgette",
    "pomme de terre", "pommes de terre", "citron", "fraise", "poireau", "champignon", "brocoli",
    "concombre", "avocat", "orange", "raisin", "persil", "basilic", "épinard", "haricot", "poivron",
    "aubergine", "melon", "kiwi", "poire", "endive", "radis"],
  "Boucherie": ["poulet", "boeuf", "bœuf", "porc", "jambon", "lardon", "steak", "saucisse", "merguez",
    "dinde", "veau", "agneau", "escalope", "rôti", "roti", "viande"],
  "Poissonnerie": ["saumon", "cabillaud", "poisson", "crevette", "moule", "colin", "truite", "sole"],
  "Crèmerie": ["lait", "beurre", "yaourt", "fromage", "crème", "creme", "oeuf", "œuf", "gruyère",
    "gruyere", "mozzarella", "chèvre", "chevre", "féta", "feta", "parmesan", "pâte brisée",
    "pâte feuilletée", "gnocchi", "reblochon"],
  "Boulangerie": ["pain", "baguette", "brioche", "croissant", "viennoiserie"],
  "Surgelés": ["surgelé", "surgele", "glace", "frites", "pizza surgelée"],
  "Boissons": ["eau", "jus", "vin", "bière", "biere", "soda", "café", "cafe", "thé", "sirop"],
  "Entretien": ["lessive", "liquide vaisselle", "éponge", "eponge", "papier toilette", "sopalin",
    "sac poubelle", "nettoyant", "savon", "shampoing", "dentifrice", "mouchoir", "couche"]
};
function devinerRayon(nom) {
  const n = nom.toLowerCase();
  for (const r of etat.recettes) {
    for (const i of (r.ingredients || [])) {
      if (i.nom && i.nom.toLowerCase() === n) return i.rayon || "Épicerie";
    }
  }
  for (const rayon in MOTS_RAYONS) {
    if (MOTS_RAYONS[rayon].some((m) => n.includes(m))) return rayon;
  }
  return "Épicerie";
}

/* ============================ 11. Ecran de panne ============================ */

/* Regle d'or : l'application ne doit JAMAIS rester blanche. Si quelque chose
   casse au demarrage, on affiche ce qui s'est passe, en clair, avec de quoi
   s'en sortir sans ordinateur. */
let panneAffichee = false;

function ecranPanne(err, titre, conseil) {
  if (panneAffichee) return;
  panneAffichee = true;

  const app = document.getElementById("ecran-app");
  const el = document.getElementById("ecran-connexion");
  if (!el) return;
  if (app) app.hidden = true;
  el.hidden = false;

  const morceaux = [];
  if (err) {
    if (err.code) morceaux.push(err.code);
    if (err.message) morceaux.push(err.message);
    if (!morceaux.length) morceaux.push(String(err));
  }
  (window.__erreursDemarrage || []).forEach((t) => { if (morceaux.indexOf(t) === -1) morceaux.push(t); });
  const detail = morceaux.join(" — ") || "Aucun message technique.";

  /* Message adapte a la cause la plus probable */
  let explication = conseil;
  if (!explication && err && err.code === "permission-denied") {
    explication = "Firebase refuse l'accès aux données. Le plus souvent : les règles de sécurité " +
      "publiées ne correspondent pas à la version de l'application qui est en ligne.";
  }
  if (!explication) explication = "L'application n'a pas réussi à démarrer.";

  el.innerHTML =
    '<div class="logo-tribu">🏡</div>' +
    "<h1>" + esc(titre || "Ça coince") + "</h1>" +
    '<p class="intro">' + esc(explication) + "</p>" +
    '<div class="carte"><div class="carte-titre">Détail technique</div>' +
    '<p style="font-size:.78rem;line-height:1.5;word-break:break-word;margin:0">' +
    esc(detail) + "</p></div>" +
    '<button class="btn principal plein" data-role="recharger" style="margin-bottom:.5rem">Recharger la page</button>' +
    '<button class="btn plein" data-role="vider" style="margin-bottom:.5rem">Vider le cache et recharger</button>' +
    '<button class="btn plein danger" data-role="zero">Repartir de zéro sur cet appareil</button>' +
    '<p class="aide centre" style="margin-top:1rem">Si ça ne suffit pas, faites une capture ' +
    "d'écran de ce message.</p>";

  el.querySelector('[data-role="recharger"]').onclick = () => location.reload();
  el.querySelector('[data-role="vider"]').onclick = async () => {
    await viderCacheLocal();
    location.reload();
  };
  const bz = el.querySelector('[data-role="zero"]');
  let confirme = false;
  bz.onclick = async () => {
    if (!confirme) {
      confirme = true;
      bz.textContent = "Confirmer ? Vos données de CET appareil seront effacées";
      return;
    }
    localStorage.clear();
    await viderCacheLocal();
    location.reload();
  };
}

async function viderCacheLocal() {
  try {
    if (window.caches) {
      const noms = await caches.keys();
      await Promise.all(noms.map((n) => caches.delete(n)));
    }
    if (navigator.serviceWorker) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    }
  } catch (e) { console.warn("Nettoyage du cache impossible :", e); }
}

window.__signalerPanne = function () {
  const app = document.getElementById("ecran-app");
  if (app && !app.hidden) return;          // l'app tourne : ce n'est pas fatal
  if (!document.getElementById("chargement")) return;
  ecranPanne(null);
};

/* ============================ 12. Demarrage ============================ */

async function demarrer() {
  try {
    await demarrerVraiment();
  } catch (err) {
    console.error("Démarrage impossible :", err);
    ecranPanne(err);
  }
}

async function demarrerVraiment() {
  const th = localStorage.getItem("tribu:theme");
  if (th && th !== "auto") document.documentElement.dataset.theme = th;

  await Store.preparer();

  /* Un lien d'invitation a-t-il ete ouvert ? */
  const params = new URLSearchParams(location.search);
  const jetonUrl = params.get("invitation");
  if (jetonUrl) {
    history.replaceState(null, "", location.pathname);
    $("#ecran-connexion").hidden = false;
    Connexion.aller("invitation", { jetonPreRempli: jetonUrl });
    return;
  }

  const s = lireSession();
  if (s && s.code && s.membreId) {
    const ok = await entrerDansFamille(s.code, s.membreId);
    if (ok) return;
    /* Echec : soit la famille a disparu, soit Firebase refuse l'accès.
       Dans le second cas on l'explique au lieu de renvoyer bêtement au départ. */
    if (Store.derniereErreur && Store.derniereErreur.code === "permission-denied") {
      ecranPanne(Store.derniereErreur, "Accès refusé");
      return;
    }
    ecrireSession(null);
  }
  $("#ecran-connexion").hidden = false;
  Connexion.aller("accueil");
}

if ("serviceWorker" in navigator &&
  (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => { }));
}

document.addEventListener("DOMContentLoaded", demarrer);
