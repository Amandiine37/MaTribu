/* =========================================================================
   TRIBU — noyau de l'application
   =========================================================================
   Ce fichier contient : les outils de base (dates, points, affichage),
   le stockage (local ou partage via Firebase), la connexion des membres,
   et toutes les actions (cocher une tache, valider, echanger un cadeau...).

   Le dessin des ecrans est dans vues.js, les formulaires dans formulaires.js.
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
function melanger(t) {
  const a = t.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
function libellePeriode(freq, d) {
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
function joursEntre(a, b) {
  return Math.round((deIso(b) - deIso(a)) / 86400000);
}

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

/* ============================ 2. Etat ============================ */

function etatVide() {
  return {
    famille: { nom: "", code: "", creeLe: "" },
    membres: [], taches: [], etatsTaches: {}, courses: [], recettes: [],
    repas: {}, notes: [], cadeaux: [], echanges: [], journal: [], reglages: {}
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
  focus: null                         // id du champ a refocaliser apres rendu
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

/* --- Taches : qui, quand, ou en est-on --- */
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
  return etat.etatsTaches[cleEtat(t, d)] || { statut: "afaire" };
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

/* --- Notes (pense-betes) --- */
function notesTriees() {
  return etat.notes.slice().sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));
}
function notesAVenir() {
  const auj = isoDate(new Date());
  return notesTriees().filter((n) => !n.fait);
}
function notesUrgentes() {
  const auj = isoDate(new Date());
  return notesAVenir().filter((n) => n.date && n.date <= auj);
}

/* ============================ 3. Stockage ============================ */

const Store = {
  mode: "local",          // "local" ou "nuage"
  code: null,
  raison: "",             // pourquoi on est en local
  _ref: null, _fs: null, _unsub: null, _surChangement: null,

  configOk() {
    const c = window.CONFIG_FIREBASE;
    return !!(c && c.apiKey && c.apiKey !== "A_REMPLIR" && c.projectId && c.projectId !== "A_REMPLIR");
  },

  async preparer() {
    if (!this.configOk()) { this.mode = "local"; this.raison = "config"; return; }
    try {
      const base = "https://www.gstatic.com/firebasejs/10.12.2/";
      const [app, auth, fs] = await Promise.all([
        import(base + "firebase-app.js"),
        import(base + "firebase-auth.js"),
        import(base + "firebase-firestore.js")
      ]);
      const a = app.initializeApp(window.CONFIG_FIREBASE);
      const au = auth.getAuth(a);
      await auth.signInAnonymously(au);
      this._fs = fs;
      this._db = fs.getFirestore(a);
      this.mode = "nuage";
    } catch (err) {
      console.warn("Firebase indisponible, passage en mode local :", err);
      this.mode = "local";
      this.raison = "erreur";
    }
  },

  _cleLocale(code) { return "tribu:donnees:" + code; },

  async charger(code) {
    if (this.mode === "nuage") {
      const d = await this._fs.getDoc(this._fs.doc(this._db, "familles", code));
      return d.exists() ? d.data() : null;
    }
    const brut = localStorage.getItem(this._cleLocale(code));
    return brut ? JSON.parse(brut) : null;
  },

  async creer(code, donnees) {
    if (this.mode === "nuage") {
      await this._fs.setDoc(this._fs.doc(this._db, "familles", code), propre(donnees));
    } else {
      localStorage.setItem(this._cleLocale(code), JSON.stringify(donnees));
    }
  },

  abonner(code, cb) {
    this.code = code;
    this._surChangement = cb;
    if (this.mode === "nuage") {
      if (this._unsub) this._unsub();
      this._unsub = this._fs.onSnapshot(this._fs.doc(this._db, "familles", code), (d) => {
        if (d.exists()) cb(d.data());
      }, (err) => { console.warn("Ecoute interrompue :", err); });
    } else {
      window.addEventListener("storage", (e) => {
        if (e.key === this._cleLocale(code) && e.newValue) cb(JSON.parse(e.newValue));
      });
    }
  },

  /* Ecrit UNE cle de premier niveau (ex : "taches"). On n'ecrit jamais tout
     le document d'un coup : ainsi deux personnes qui modifient deux rubriques
     differentes en meme temps ne s'ecrasent pas. */
  async ecrire(cles) {
    const morceau = {};
    cles.forEach((c) => { morceau[c] = propre(etat[c]); });
    if (this.mode === "nuage") {
      try {
        await this._fs.setDoc(this._fs.doc(this._db, "familles", this.code), morceau, { merge: true });
      } catch (err) {
        console.warn("Echec de l'enregistrement :", err);
        toast("Enregistrement impossible (hors ligne ?)");
      }
    } else {
      localStorage.setItem(this._cleLocale(this.code), JSON.stringify(etat));
    }
  }
};

/* Enregistre + redessine. `cles` = rubriques modifiees. */
function sauver(...cles) {
  Store.ecrire(cles);
  rendre();
}

/* ============================ 4. Session ============================ */

const CLE_SESSION = "tribu:session";
function lireSession() {
  try { return JSON.parse(localStorage.getItem(CLE_SESSION) || "null"); } catch (e) { return null; }
}
function ecrireSession(s) {
  if (s) localStorage.setItem(CLE_SESSION, JSON.stringify(s));
  else localStorage.removeItem(CLE_SESSION);
}

function appliquerDonnees(d) {
  const v = etatVide();
  etat = Object.assign(v, d || {});
  // filets de securite si une rubrique manque
  ["membres", "taches", "courses", "recettes", "notes", "cadeaux", "echanges", "journal"]
    .forEach((c) => { if (!Array.isArray(etat[c])) etat[c] = []; });
  ["etatsTaches", "repas", "reglages", "famille"]
    .forEach((c) => { if (!etat[c] || typeof etat[c] !== "object") etat[c] = c === "famille" ? { nom: "", code: "" } : {}; });
  if (moi) moi = membre(moi.id) || moi;
}

async function entrerDansFamille(code, membreId) {
  const d = await Store.charger(code);
  if (!d) return false;
  appliquerDonnees(d);
  moi = membre(membreId);
  if (!moi) return false;
  Store.code = code;
  Store.abonner(code, (nouv) => { appliquerDonnees(nouv); rendre(); });
  ecrireSession({ code: code, membreId: membreId });
  $("#ecran-connexion").hidden = true;
  $("#ecran-app").hidden = false;
  ui.vue = "accueil";
  rendre();
  return true;
}

function deconnecter(oublierFamille) {
  ecrireSession(null);
  moi = null;
  etat = etatVide();
  $("#ecran-app").hidden = true;
  $("#ecran-connexion").hidden = false;
  Connexion.aller(oublierFamille ? "accueil" : "accueil");
}

/* ============================ 5. Actions ============================ */

function ajouterPoints(membreId, delta, motif) {
  etat.journal.unshift({
    id: id(), membreId: membreId, delta: delta, motif: motif,
    date: new Date().toISOString()
  });
  if (etat.journal.length > 400) etat.journal = etat.journal.slice(0, 400);
}

const Actions = {

  /* --- Taches --- */
  marquerFaite(tacheId) {
    const t = etat.taches.find((x) => x.id === tacheId);
    if (!t) return;
    const d = new Date();
    const cle = cleEtat(t, d);
    const ancien = etat.etatsTaches[cle] || {};
    if (ancien.statut === "valide") return;
    etat.etatsTaches[cle] = {
      statut: "fait",
      parQui: (moi && moi.id) || assigneDe(t, d),
      faitLe: new Date().toISOString(),
      valideLe: null, valideePar: null
    };
    sauver("etatsTaches");
    toast(estAdmin() ? "Fait ! À valider ci-dessous." : "Fait ! En attente de validation.");
  },

  annulerFaite(tacheId) {
    const t = etat.taches.find((x) => x.id === tacheId);
    if (!t) return;
    const cle = cleEtat(t, new Date());
    const e = etat.etatsTaches[cle];
    if (!e || e.statut !== "fait") return;
    etat.etatsTaches[cle] = { statut: "afaire", parQui: null, faitLe: null, valideLe: null, valideePar: null };
    sauver("etatsTaches");
  },

  valider(tacheId) {
    const t = etat.taches.find((x) => x.id === tacheId);
    if (!t || !estAdmin()) return;
    const cle = cleEtat(t, new Date());
    const e = etat.etatsTaches[cle];
    if (!e || e.statut !== "fait") return;
    e.statut = "valide";
    e.valideLe = new Date().toISOString();
    e.valideePar = moi.id;
    etat.etatsTaches[cle] = e;
    const gagnant = e.parQui || assigneDe(t, new Date());
    if (gagnant && t.points) ajouterPoints(gagnant, t.points, "Tâche : " + t.nom);
    sauver("etatsTaches", "journal");
    const m = membre(gagnant);
    toast(m ? "+" + t.points + " points pour " + m.prenom + " 🌟" : "Validé");
  },

  async refuser(tacheId) {
    const t = etat.taches.find((x) => x.id === tacheId);
    if (!t || !estAdmin()) return;
    const ok = await confirmer("Renvoyer « " + t.nom + " » en « à faire » ? Aucun point ne sera donné.",
      { titre: "Refuser la tâche", ok: "Renvoyer", danger: true });
    if (!ok) return;
    etat.etatsTaches[cleEtat(t, new Date())] =
      { statut: "afaire", parQui: null, faitLe: null, valideLe: null, valideePar: null };
    sauver("etatsTaches");
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
    etat.repas[cleSem][jour + "-" + moment] = valeur;   // {recetteId} | {texte} | null
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
  accorderEchange(eid) {
    const e = etat.echanges.find((x) => x.id === eid);
    if (!e || !estAdmin() || e.statut !== "demande") return;
    if (pointsDe(e.membreId) < e.cout) { toast("Ce membre n'a plus assez de points"); return; }
    e.statut = "accorde";
    e.traiteLe = new Date().toISOString();
    e.traitePar = moi.id;
    ajouterPoints(e.membreId, -e.cout, "Cadeau : " + e.cadeauNom);
    sauver("echanges", "journal");
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
  ajusterPoints(membreId, delta, motif) {
    if (!estAdmin()) return;
    ajouterPoints(membreId, delta, motif || "Ajustement");
    sauver("journal");
    toast((delta > 0 ? "+" : "") + delta + " points");
  }
};

/* ============================ 6. Generateur de menus ============================ */

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
      const dejaLa = semaine[j + "-" + m];
      if (dejaLa && !opt.remplacer) return;
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

/* ============================ 7. Rendu general ============================ */

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
  const sous = v === "accueil"
    ? etat.famille.nom
    : (TITRES[v] ? TITRES[v][1] : "");
  $("#sous-titre-vue").textContent = sous;
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

/* ============================ 8. Ecoute des clics ============================ */

document.addEventListener("click", (e) => {
  const nav = e.target.closest(".nav button");
  if (nav) { aller(nav.dataset.vue); return; }

  if (e.target.id === "voile") { fermerFeuille(); return; }

  const b = e.target.closest("[data-action]");
  if (!b) return;
  const a = b.dataset.action;
  const v = b.dataset.id;

  switch (a) {
    /* navigation */
    case "aller": aller(b.dataset.vue); break;
    case "fermer": fermerFeuille(); break;

    /* taches */
    case "tache-fait": Actions.marquerFaite(v); break;
    case "tache-annuler": Actions.annulerFaite(v); break;
    case "tache-valider": Actions.valider(v); break;
    case "tache-refuser": Actions.refuser(v); break;
    case "tache-nouvelle": Formulaires.tache(null); break;
    case "tache-editer": Formulaires.tache(v); break;
    case "taches-filtre": ui.filtreTaches = b.dataset.valeur; rendre(); break;

    /* courses */
    case "course-toggle": Actions.basculerCourse(v); break;
    case "course-suppr": Actions.supprimerCourse(v); break;
    case "course-nouvelle": Formulaires.course(); break;
    case "courses-vider": Actions.viderCoches(); break;

    /* menus */
    case "semaine-prec": {
      const d = lundiDeCle(ui.semaine); d.setDate(d.getDate() - 7);
      ui.semaine = cleSemaine(d); rendre(); break;
    }
    case "semaine-suiv": {
      const d = lundiDeCle(ui.semaine); d.setDate(d.getDate() + 7);
      ui.semaine = cleSemaine(d); rendre(); break;
    }
    case "semaine-auj": ui.semaine = cleSemaine(new Date()); rendre(); break;
    case "repas-case": Formulaires.repas(b.dataset.jour, b.dataset.moment); break;
    case "menus-generer": Formulaires.generateur(); break;
    case "menus-courses": Formulaires.ingredientsVersCourses(); break;

    /* recettes */
    case "recette-nouvelle": Formulaires.recette(null); break;
    case "recette-editer": Formulaires.recette(v); break;

    /* notes */
    case "note-toggle": Actions.basculerNote(v); break;
    case "note-nouvelle": Formulaires.note(null); break;
    case "note-editer": Formulaires.note(v); break;
    case "notes-filtre": ui.filtreNotes = b.dataset.valeur; rendre(); break;

    /* cadeaux et points */
    case "cadeau-demander": Actions.demanderCadeau(v); break;
    case "cadeau-nouveau": Formulaires.cadeau(null); break;
    case "cadeau-editer": Formulaires.cadeau(v); break;
    case "echange-accorder": Actions.accorderEchange(v); break;
    case "echange-refuser": Actions.refuserEchange(v); break;
    case "points-ajuster": Formulaires.ajustementPoints(v); break;
    case "points-historique": Formulaires.historique(); break;

    /* membres et reglages */
    case "membre-nouveau": Formulaires.membre(null); break;
    case "membre-editer": Formulaires.membre(v); break;
    case "menu-profil": Formulaires.menuProfil(); break;
    case "deconnexion": fermerFeuille(); deconnecter(false); break;
    case "theme": {
      const actuel = document.documentElement.dataset.theme || "auto";
      const suivant = actuel === "auto" ? "light" : actuel === "light" ? "dark" : "auto";
      if (suivant === "auto") delete document.documentElement.dataset.theme;
      else document.documentElement.dataset.theme = suivant;
      localStorage.setItem("tribu:theme", suivant);
      Formulaires.menuProfil();
      break;
    }
    case "copier-code": {
      const t = etat.famille.code;
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => toast("Code copié"));
      else toast("Code : " + t);
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

/* Devine le rayon d'un article : d'abord d'apres les recettes deja saisies,
   sinon d'apres une liste de mots courants. */
const MOTS_RAYONS = {
  "Fruits & légumes": ["pomme", "banane", "tomate", "salade", "carotte", "oignon", "ail ", "courgette",
    "pomme de terre", "pommes de terre", "citron", "fraise", "poireau", "champignon", "brocoli",
    "concombre", "avocat", "orange", "raisin", "persil", "basilic", "épinard", "haricot", "poivron",
    "aubergine", "melon", "kiwi", "poire", "endive", "radis", "salade"],
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

/* ============================ 9. Demarrage ============================ */

async function demarrer() {
  const th = localStorage.getItem("tribu:theme");
  if (th && th !== "auto") document.documentElement.dataset.theme = th;

  await Store.preparer();

  const s = lireSession();
  if (s && s.code && s.membreId) {
    const ok = await entrerDansFamille(s.code, s.membreId);
    if (ok) return;
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
