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
/* Les grilles d'icones. Elles sont volontairement fournies : c'est ce qui
   permet a chacun de se reconnaitre du premier coup d'oeil dans les listes. */
const EMOJIS_MEMBRES = [
  "😀", "😄", "😎", "🥳", "🤓", "🙂", "😺", "🧑", "👦", "👧",
  "🦊", "🐻", "🐼", "🦁", "🐨", "🐧", "🦉", "🐬", "🐢", "🦄",
  "🐯", "🐰", "🐥", "🦋", "🐝", "🐙", "🐳", "🦖", "🐴", "🐶",
  "🌻", "🌷", "🌺", "🍀", "🌵", "🍄", "🌈", "⭐", "🔥", "⚡",
  "🚀", "⚽", "🏀", "🎾", "🎸", "🎹", "🎤", "🎨", "📚", "🎯",
  "🎮", "🛹", "🏄", "🚲", "🧩", "💎", "👑", "🎩"];

const EMOJIS_TACHES = [
  "🧹", "🧽", "🧼", "🪣", "🧴", "🧻", "🪥", "🚿", "🛁", "🚽",
  "🍽️", "🧑‍🍳", "🧊", "🗑️", "♻️", "📦", "🛏️", "🛋️", "🪑", "🪟",
  "🧺", "👕", "🧦", "👟", "🖼️", "🕯️", "💡", "🔌", "🔋", "🚪",
  "🌱", "🌳", "🍂", "🌾", "❄️", "🏡", "🚗", "🚲", "📬", "📮",
  "🛒", "🐕", "🐈", "🐟", "🐹", "🔧", "🔨", "🪛", "🧰", "🧯"];

const EMOJIS_CADEAUX = [
  "🎁", "🌟", "🎟️", "🎫", "🛍️", "💶", "🧸", "🎲", "🃏", "🧩",
  "🍿", "🍦", "🍫", "🍪", "🧁", "🎂", "🍭", "🥤", "🧋", "🍕",
  "🍔", "🌮", "🥞", "🧇", "🎬", "🎮", "📱", "🎧", "📸", "🔭",
  "🎡", "🎢", "🎪", "🎠", "🏕️", "🏖️", "🎣", "⚽", "🏊", "🎳",
  "🚴", "🛼", "⛸️", "🎿", "🐴", "🎨", "🎻", "🪁", "💤", "🎈"];

const EMOJIS_RECETTES = [
  "🍽️", "🍲", "🥘", "🍜", "🍝", "🍚", "🍛", "🥣", "🫕", "🥫",
  "🥗", "🥙", "🌯", "🥪", "🍔", "🌮", "🍕", "🥧", "🥟", "🧆",
  "🍗", "🍖", "🥩", "🥓", "🍤", "🦐", "🐟", "🍣", "🍱", "🥚",
  "🍳", "🥞", "🧇", "🧀", "🥔", "🍅", "🥦", "🥕", "🌽", "🍆",
  "🥑", "🍄", "🫑", "🥬", "🧅", "🧄", "🫘", "🌿", "🍞", "🥖",
  "🥐", "🍰", "🍮", "🍯", "🍋", "🍎", "☕"];

const EMOJIS_LISTES = [
  "🛒", "📅", "📝", "🛍️", "🧺", "🏪", "🥖", "🥕", "🍎", "🐟",
  "🥩", "🧊", "🧽", "🧼", "🧴", "💊", "🎁", "🎂", "🎄", "🎒",
  "✏️", "🏕️", "🌻", "🔧", "📦", "👶", "🐾", "🐶", "🍼", "🎨"];

const VERSION = "0.9.2 bêta";

/* Unites utilisables pour les ingredients, le stock et les courses.
   "" = pas d'unite, on compte simplement (4 carottes). */
const UNITES = ["", "g", "kg", "ml", "cl", "l", "boîte(s)", "paquet(s)", "pot(s)",
  "sachet(s)", "tranche(s)", "bouquet(s)", "branche(s)", "gousse(s)", "tête(s)",
  "bûche(s)", "morceau(x)", "pincée(s)", "c. à soupe", "c. à café"];

/* Familles d'unites convertibles entre elles, avec leur valeur de reference. */
const FAMILLES_UNITES = {
  masse: { g: 1, kg: 1000 },
  volume: { ml: 1, cl: 10, l: 1000 }
};

/* Rubriques rangees dans le document principal de la famille.
   `etats` et `journal` sont a part : ils ont leurs propres regles de securite. */
const CLES_DOC = ["famille", "membres", "membresUid", "adminsUid", "appareils", "taches",
  "bareme", "courses", "listesCourses", "stock", "recettes", "repas", "notes", "cadeaux",
  "tarifs", "echanges", "reglages", "jetonUtilise"];

/* Les saisons, au sens cuisine : ce qu'on a envie de manger et ce qu'on
   trouve sur l'étal. Une recette sans saison indiquée convient toute l'annee. */
const SAISONS = [
  { val: "printemps", nom: "Printemps", emoji: "🌸", mois: [3, 4, 5] },
  { val: "ete", nom: "Été", emoji: "☀️", mois: [6, 7, 8] },
  { val: "automne", nom: "Automne", emoji: "🍂", mois: [9, 10, 11] },
  { val: "hiver", nom: "Hiver", emoji: "❄️", mois: [12, 1, 2] }
];

/* Calendrier des fruits et legumes, pour proposer les saisons d'une recette
   a partir de ses ingredients. Volontairement court : les produits courants
   suffisent, le reste est considere comme disponible toute l'annee. */
const CALENDRIER = {
  printemps: ["asperge", "radis", "épinard", "petit pois", "artichaut", "fraise", "rhubarbe",
    "oseille", "blette", "navet", "laitue", "cresson", "carotte nouvelle", "oignon nouveau"],
  ete: ["courgette", "tomate", "aubergine", "poivron", "concombre", "haricot vert", "melon",
    "pastèque", "abricot", "pêche", "nectarine", "cerise", "framboise", "basilic", "maïs",
    "fenouil", "prune", "figue", "laitue", "tomate cerise"],
  automne: ["potiron", "potimarron", "courge", "champignon", "poireau", "chou", "brocoli",
    "betterave", "raisin", "pomme", "poire", "noix", "châtaigne", "céleri", "panais",
    "épinard", "fenouil", "figue"],
  hiver: ["poireau", "chou", "endive", "carotte", "navet", "panais", "céleri", "potiron",
    "courge", "orange", "clémentine", "mandarine", "pamplemousse", "kiwi", "poire", "pomme",
    "salsifis", "topinambour", "mâche", "betterave"]
};

/* Types de liste de courses. « mensuelle » = on la remplit au fil de l'eau
   sans acheter tout de suite : elle ne déclenche donc pas les rappels. */
const TYPES_LISTE = [
  { val: "semaine", nom: "Chaque semaine", emoji: "🛒", alerte: true },
  { val: "mois", nom: "Une fois par mois", emoji: "📅", alerte: false },
  { val: "ponctuelle", nom: "Ponctuelle", emoji: "📝", alerte: true }
];
/* Liste implicite des familles créées avant les listes multiples. */
const LISTE_PRINCIPALE = {
  id: "liste-principale", nom: "Mes courses", emoji: "🛒",
  type: "semaine", magasin: ""
};

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

/* --- Quantites et unites --- */

/* "1,2" ou "1.2" -> 1.2 ; texte vide ou illisible -> null */
function nombre(v) {
  if (v === null || v === undefined || v === "") return null;
  const n = parseFloat(String(v).replace(",", ".").trim());
  return isNaN(n) ? null : n;
}
/* 1.5 -> "1,5" ; 3 -> "3" */
function texteNombre(n) {
  if (n === null || n === undefined) return "";
  return String(Math.round(n * 100) / 100).replace(".", ",");
}
function formaterQte(qte, unite) {
  const brut = String(qte == null ? "" : qte).trim();
  /* Ancien format, d'avant la séparation quantité / unité : « 800 g »,
     « 2 briques »… On l'affiche tel quel plutôt que d'en perdre la moitié. */
  if (!unite && /[a-zà-ÿ]/i.test(brut)) return brut;
  const n = nombre(brut);
  const q = n === null ? brut : texteNombre(n);
  if (!q) return unite || "";
  return unite ? q + " " + unite : q;
}
function familleUnite(u) {
  for (const f in FAMILLES_UNITES) if (FAMILLES_UNITES[f][u] !== undefined) return f;
  return null;
}
/* Convertit une quantite d'une unite vers une autre. null si impossible. */
function convertirUnite(qte, de, vers) {
  const n = nombre(qte);
  if (n === null) return null;
  if ((de || "") === (vers || "")) return n;
  const fa = familleUnite(de), fb = familleUnite(vers);
  if (!fa || fa !== fb) return null;
  return n * FAMILLES_UNITES[fa][de] / FAMILLES_UNITES[fa][vers];
}

/* Additionne des quantites { qte, unite }. Celles qui ne se convertissent pas
   restent affichees a part : « 500 g + 2 boîte(s) ». */
function additionnerQuantites(liste) {
  const paquets = [];
  liste.forEach((x) => {
    const n = nombre(x.qte);
    if (n === null) { paquets.push({ qte: null, unite: x.unite || "", texte: String(x.qte || "") }); return; }
    const trouve = paquets.find((p) => p.qte !== null && convertirUnite(1, x.unite || "", p.unite) !== null);
    if (trouve) trouve.qte += convertirUnite(n, x.unite || "", trouve.unite);
    else paquets.push({ qte: n, unite: x.unite || "", texte: "" });
  });
  return {
    paquets: paquets,
    texte: paquets.map((p) => p.qte === null ? p.texte : formaterQte(p.qte, p.unite))
      .filter(Boolean).join(" + ")
  };
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

/* Code d'invitation : 12 caracteres tires au sort, sans I, O, 0 ni 1 pour
   qu'il puisse etre LU, DICTE et RETAPE. C'est indispensable : sur iPhone,
   l'icone de l'ecran d'accueil est une application separee, sans barre
   d'adresse — un lien n'y suffit pas, il faut pouvoir taper le code.
   32^12 ≈ un milliard de milliards de combinaisons : le deviner est hors
   de portee, et l'invitation ne sert qu'une fois. */
const LETTRES_CODE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function codeInvitation() {
  const alea = crypto.getRandomValues(new Uint8Array(12));
  let s = "";
  for (let i = 0; i < 12; i++) s += LETTRES_CODE[alea[i] % LETTRES_CODE.length];
  return s;
}
/* Presentation en trois groupes : plus facile a relire et a dicter. */
function codeLisible(jeton) {
  const t = String(jeton || "");
  if (!/^[A-Z2-9]{12}$/.test(t)) return t;
  return t.slice(0, 4) + "-" + t.slice(4, 8) + "-" + t.slice(8);
}

/* Repere de famille tire au sort. Il sert d'identifiant du dossier : deux
   familles ne peuvent pas porter le meme. Comme on n'a pas le droit de lire
   les familles des autres, impossible de verifier a l'avance qu'il est libre
   -> on le prend assez long pour que la collision soit negligeable. */
function nouveauRepere() {
  const lettres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";   // sans I, O, 0, 1
  let s = "";
  const alea = crypto.getRandomValues(new Uint8Array(6));
  for (let i = 0; i < 6; i++) s += lettres[alea[i] % lettres.length];
  return "MAISON-" + s;
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
    membres: [], membresUid: [], adminsUid: [], appareils: {},
    taches: [], bareme: {}, etats: {},
    courses: [], listesCourses: [], stock: [], recettes: [], repas: {}, notes: [],
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
  ongletCourses: "liste",        // "liste" ou "stock"
  rechercheRecette: "",
  filtresRecettes: [],           // "perso", "vege", "rapide", "leger"
  triRecettes: "alpha",          // "alpha", "recent", "saison"
  focus: null
};

/* Les plats fournis avec l'application : on ne les propose pas au partage,
   toutes les familles les ont déjà. Le reste est considéré comme « à vous ». */
const NOMS_DEPART = new Set((window.RECETTES_DEPART || [])
  .map((r) => r.nom.toLowerCase().trim()));

function estRecettePerso(r) {
  if (r.origine === "perso") return true;
  if (r.origine) return false;                       // "depart" ou "importee"
  return !NOMS_DEPART.has(String(r.nom || "").toLowerCase().trim());
}

/* --- Saisons --- */

function saisonActuelle(d) {
  const m = (d || new Date()).getMonth() + 1;
  return (SAISONS.find((s) => s.mois.indexOf(m) !== -1) || SAISONS[0]).val;
}
function infoSaison(val) {
  return SAISONS.find((s) => s.val === val) || null;
}
/* Sans saison indiquée, une recette convient toute l'année. */
function estDeSaison(r, d) {
  const l = r.saisons || [];
  if (!l.length) return true;
  return l.indexOf(saisonActuelle(d)) !== -1;
}
function saisonsToutelAnnee(r) { return !(r.saisons || []).length; }

/* Produits dont le nom contient celui d'un produit saisonnier sans en être un :
   des pommes de terre ne sont pas des pommes. On les écarte du calendrier. */
const PRODUITS_TOUTE_ANNEE = ["pomme de terre", "haricot rouge", "haricot blanc",
  "haricot sec", "tomate pelee", "tomate concassee", "coulis de tomate"];

/* Découpe un nom en mots comparables : sans accent, au singulier.
   « Courgettes » → ["courgette"] ; « Pommes de terre » → ["pomme","de","terre"] */
function motsDe(texte) {
  return String(texte || "")
    .toLowerCase()
    .replace(/œ/g, "oe").replace(/æ/g, "ae")   // sinon « bœuf » se coupe en deux
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .split(/[^a-z]+/)
    .filter(Boolean)
    .map((m) => (m.length > 3 && /[sx]$/.test(m) ? m.slice(0, -1) : m));
}

/* Le produit figure-t-il dans ce nom ? On compare des MOTS ENTIERS : sinon
   « courgette » déclencherait « courge », et « poireau » déclencherait
   « poire ». C'est exactement le piège qu'on veut éviter. */
function contientProduit(mots, produit) {
  const p = motsDe(produit);
  for (let i = 0; i + p.length <= mots.length; i++) {
    let ok = true;
    for (let j = 0; j < p.length; j++) { if (mots[i + j] !== p[j]) { ok = false; break; } }
    if (ok) return true;
  }
  return false;
}

/* Propose des saisons d'après les ingrédients : si un ingrédient n'est de
   saison qu'à un moment, la recette l'est aussi. Une aide, pas une vérité. */
function devinerSaisons(ingredients) {
  const scores = {};
  SAISONS.forEach((s) => { scores[s.val] = 0; });
  let trouves = 0;

  (ingredients || []).forEach((ing) => {
    const mots = motsDe(ing.nom);
    if (!mots.length) return;
    if (PRODUITS_TOUTE_ANNEE.some((p) => contientProduit(mots, p))) return;
    const dedans = [];
    for (const s in CALENDRIER) {
      if (CALENDRIER[s].some((p) => contientProduit(mots, p))) dedans.push(s);
    }
    /* Un produit disponible partout (ou inconnu) ne dit rien d'utile. */
    if (!dedans.length || dedans.length === SAISONS.length) return;
    trouves++;
    dedans.forEach((s) => { scores[s] += 1; });
  });

  if (!trouves) return [];
  const max = Math.max.apply(null, Object.values(scores));
  if (!max) return [];
  return SAISONS.filter((s) => scores[s.val] >= max).map((s) => s.val);
}

function recettesFiltrees() {
  const q = ui.rechercheRecette.toLowerCase().trim();
  const f = ui.filtresRecettes;
  return etat.recettes.filter((r) => {
    if (q && !r.nom.toLowerCase().includes(q) &&
      !(r.ingredients || []).some((i) => i.nom.toLowerCase().includes(q))) return false;
    if (f.includes("perso") && !estRecettePerso(r)) return false;
    if (f.includes("vege") && !r.vegetarien) return false;
    if (f.includes("rapide") && !r.rapide) return false;
    if (f.includes("leger") && r.type !== "leger") return false;
    if (f.includes("saison") && !estDeSaison(r)) return false;
    if (f.includes("thermomix") && !r.thermomix) return false;
    return true;
  }).sort(comparerRecettes(ui.triRecettes));
}

/* Les trois façons de ranger le cahier. « recent » se fie d'abord à la date
   de création ; les plats fournis n'en ont pas, on retombe alors sur leur
   ordre d'arrivée dans la liste — ce qui met bien en tête ceux que la
   dernière mise à jour vient d'ajouter. */
function comparerRecettes(tri) {
  const rang = new Map();
  etat.recettes.forEach((r, k) => rang.set(r.id, k));
  const alpha = (a, b) => a.nom.localeCompare(b.nom, "fr");

  if (tri === "recent") {
    return (a, b) => String(b.creeLe || "").localeCompare(String(a.creeLe || "")) ||
      (rang.get(b.id) - rang.get(a.id));
  }
  if (tri === "saison") {
    return (a, b) => (estDeSaison(b) ? 1 : 0) - (estDeSaison(a) ? 1 : 0) ||
      /* à saison égale, les plats vraiment de saison passent devant ceux
         qui conviennent toute l'année : ce sont eux qu'on cherche. */
      (saisonsToutelAnnee(a) ? 1 : 0) - (saisonsToutelAnnee(b) ? 1 : 0) ||
      alpha(a, b);
  }
  return alpha;
}

/* La lettre sous laquelle ranger un plat : sans accent, en majuscule.
   « Œufs cocotte » et « Omelette » se retrouvent ainsi au même endroit. */
function lettreRecette(r) {
  const m = motsDe(r.nom)[0] || "";
  return (m.charAt(0) || "#").toUpperCase();
}

function membre(idm) { return etat.membres.find((m) => m.id === idm) || null; }
function estAdmin() { return !!(moi && moi.role === "admin"); }

/* Profil « géré » : un enfant sans téléphone. Il participe normalement aux
   tâches, aux points et aux cadeaux, mais ne se connecte pas lui-même : ce
   sont les parents qui cochent pour lui et qui dépensent ses points. */
function estGere(idm) {
  const m = typeof idm === "string" ? membre(idm) : idm;
  return !!(m && m.sansAppareil);
}
function membresGeres() { return etat.membres.filter((m) => m.sansAppareil); }

/* Combien d'appareils sont rattachés à ce profil dans le registre. */
function registreAppareils(membreId) {
  return Object.keys(etat.appareils || {})
    .filter((u) => etat.appareils[u] === membreId).length;
}

/* Ce profil s'est-il déjà connecté quelque part ?
   Deux sources à consulter — et c'est important : depuis le passage aux
   invitations, un appareil qui rejoint s'inscrit dans le registre `appareils`
   et NON dans le champ `uids` du profil (il n'a pas le droit de réécrire la
   liste des membres). Ne regarder que `uids` afficherait « en attente
   d'invitation » sur des gens pourtant bien connectés. */
function aUnAppareil(m) {
  if (!m) return false;
  return !!((m.uids || []).length || registreAppareils(m.id));
}
function membresConnectables() { return etat.membres.filter((m) => !m.sansAppareil); }

/* Les tâches en attente des enfants gérés, pour que le parent les coche. */
function tachesDesEnfants() {
  return tachesDuMoment().filter((x) => x.assigne && estGere(x.assigne) && x.et.statut === "afaire");
}
function pointsDe(idm) {
  return etat.journal.reduce((s, e) => s + (e.membreId === idm ? e.delta : 0), 0);
}
function classement() {
  return etat.membres.map((m) => ({ m, pts: pointsDe(m.id) }))
    .sort((a, b) => b.pts - a.pts || a.m.prenom.localeCompare(b.m.prenom));
}

/* Les listes que Firebase utilise pour verifier les droits et les montants.
   A recalculer des qu'on touche aux membres, aux taches ou aux cadeaux. */
/* Recalcule les listes que Firebase utilise pour vérifier les droits et les
   montants. Travaille sur n'importe quel document, pas seulement sur l'état
   courant — indispensable pour le mode local, où l'appareil qui rejoint n'a
   rien en mémoire. */
function recalculerIndexSur(d) {
  const uids = [];
  const admins = [];
  const profil = (idm) => (d.membres || []).find((m) => m.id === idm) || null;
  const ajoute = (u, estAdminDuProfil) => {
    if (!u) return;
    if (uids.indexOf(u) === -1) uids.push(u);
    if (estAdminDuProfil && admins.indexOf(u) === -1) admins.push(u);
  };
  /* Deux sources : les appareils notés dans chaque profil (écrits par un
     administrateur) et le registre `appareils`, rempli par ceux qui
     rejoignent par invitation sans pouvoir lire le reste de la famille. */
  (d.membres || []).forEach((m) => (m.uids || []).forEach((u) => ajoute(u, m.role === "admin")));
  Object.keys(d.appareils || {}).forEach((u) => {
    const m = profil(d.appareils[u]);
    if (m) ajoute(u, m.role === "admin");
  });

  /* Filet anti-verrouillage. Un appareil déjà autorisé qu'on n'arrive pas à
     rattacher à un profil appartient quand même à quelqu'un : le retirer le
     mettrait dehors sans prévenir. On ne retire donc que les appareils dont
     le profil a été supprimé, et jamais celui qui est en train d'écrire. */
  const orphelin = (u) => {
    const cible = (d.appareils || {})[u];
    return cible !== undefined && !profil(cible);
  };
  (d.membresUid || []).forEach((u) => {
    if (uids.indexOf(u) === -1 && !orphelin(u)) uids.push(u);
  });
  if (Store.uid && uids.indexOf(Store.uid) === -1) uids.push(Store.uid);

  d.membresUid = uids;
  d.adminsUid = admins;
  d.bareme = {};
  (d.taches || []).forEach((t) => { d.bareme[t.id] = t.points || 0; });
  d.tarifs = {};
  (d.cadeaux || []).forEach((c) => { d.tarifs[c.id] = c.cout || 0; });
  return d;
}

function recalculerIndex() { return recalculerIndexSur(etat); }

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
    const remplie = !!(c && c.apiKey && c.apiKey !== "A_REMPLIR" && c.projectId && c.projectId !== "A_REMPLIR");
    if (!remplie) return false;

    /* Garde-fou : sur un serveur de test (localhost), on reste en mode local
       pour ne pas écrire dans la vraie base de la famille. Pour tester quand
       même la synchronisation, ouvrir l'adresse avec « ?nuage=1 ». */
    const local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
    if (local && !new URLSearchParams(location.search).has("nuage")) {
      this.raison = "localhost";
      console.info("Serveur de test : mode local forcé (ajoutez ?nuage=1 pour utiliser Firebase).");
      return false;
    }
    return true;
  },

  async preparer() {
    this.raison = "";
    if (!this.configOk()) {
      this.mode = "local";
      if (!this.raison) this.raison = "config";   // configOk() peut dire « localhost »
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

  /* Petit annuaire des repères déjà pris. Il ne contient QUE la date de
     création : savoir qu'un repère existe n'ouvre aucun accès. Il sert
     uniquement à dire honnêtement « ce nom est déjà utilisé » au lieu de le
     deviner à partir d'un refus, qui peut avoir d'autres causes. */
  async repereLibre(code) {
    if (this.mode !== "nuage") return !this._lireLocal(code);
    try {
      const d = await this._fs.getDoc(this._fs.doc(this._db, "reperes", code));
      return !d.exists();
    } catch (err) {
      console.warn("Annuaire des repères illisible :", err);
      return null;                     // on ne sait pas : on tentera quand même
    }
  },

  async marquerRepere(code) {
    if (this.mode !== "nuage") return;
    try {
      await this._fs.setDoc(this._fs.doc(this._db, "reperes", code),
        { creeLe: Date.now() });
    } catch (err) {
      console.warn("Repère non enregistré dans l'annuaire :", err);
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

  /* Retire vraiment des appareils du registre.
     Indispensable : une ecriture « fusionnee » ajoute ou remplace des cles,
     mais n'en supprime jamais. Il faut le demander explicitement. */
  async retirerAppareils(uids) {
    if (!uids.length) return;
    if (this.mode !== "nuage") { this._ecrireLocal(this.code, etat); return; }
    const morceau = { appareils: {} };
    uids.forEach((u) => { morceau.appareils[u] = this._fs.deleteField(); });
    try {
      await this._fs.setDoc(this._fs.doc(this._db, "familles", this.code), morceau, { merge: true });
    } catch (err) {
      console.warn("Retrait d'appareil refusé :", err);
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

  /* --- retours des utilisateurs (bugs, idées) ---
     Ils partent dans une collection à part, que personne ne peut relire depuis
     l'application : ils se consultent dans la console Firebase. */
  async envoyerRetour(retour) {
    if (this.mode !== "nuage") {
      const t = JSON.parse(localStorage.getItem("tribu:retours") || "[]");
      t.unshift(retour);
      localStorage.setItem("tribu:retours", JSON.stringify(t.slice(0, 50)));
      return true;
    }
    try {
      await this._fs.setDoc(this._fs.doc(this._db, "retours", retour.id), propre(retour));
      return true;
    } catch (err) {
      console.warn("Retour non envoyé :", err);
      this.derniereErreur = err;
      return false;
    }
  },

  /* --- recettes partagées entre familles ---
     Une petite bibliothèque commune, ouverte à toutes les familles de l'app.
     On n'y met QUE ce qu'une famille décide explicitement de publier. */
  async publierRecette(fiche) {
    if (this.mode !== "nuage") return false;
    try {
      await this._fs.setDoc(this._fs.doc(this._db, "recettesPartagees", fiche.id), propre(fiche));
      return true;
    } catch (err) {
      console.warn("Publication refusée :", err);
      this.derniereErreur = err;
      return false;
    }
  },

  async listerRecettesPartagees() {
    if (this.mode !== "nuage") return null;
    try {
      const q = await this._fs.getDocs(this._fs.collection(this._db, "recettesPartagees"));
      const l = [];
      q.forEach((s) => l.push(Object.assign({ id: s.id }, s.data())));
      return l.sort((a, b) => String(b.publieLe || "").localeCompare(String(a.publieLe || "")));
    } catch (err) {
      console.warn("Lecture du catalogue refusée :", err);
      this.derniereErreur = err;
      return null;
    }
  },

  async retirerRecettePartagee(idFiche) {
    if (this.mode !== "nuage") return false;
    try {
      await this._fs.deleteDoc(this._fs.doc(this._db, "recettesPartagees", idFiche));
      return true;
    } catch (err) {
      console.warn("Retrait refusé :", err);
      this.derniereErreur = err;
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
    this.derniereErreur = null;
    if (this.mode !== "nuage") {
      const t = JSON.parse(localStorage.getItem("tribu:invitations") || "{}");
      return t[jeton] || null;
    }
    try {
      const d = await this._fs.getDoc(this._fs.doc(this._db, "invitations", jeton));
      return d.exists() ? Object.assign({ jeton: jeton }, d.data()) : null;
    } catch (err) {
      console.warn("Lecture de l'invitation refusée :", err);
      this.derniereErreur = err;
      return null;
    }
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

  /* Entree dans la famille : on inscrit CET appareil dans la liste autorisee.
     C'est la seule ecriture qu'un non-membre a le droit de faire, et
     uniquement en presentant un jeton d'invitation valide.

     Point important : a cet instant, l'appareil n'a PAS encore le droit de
     lire la famille. On ne peut donc rien recopier de l'existant : on ajoute
     seulement, avec arrayUnion et une fusion de map. Sinon on ecraserait
     les autres membres. */
  async rejoindre(code, jeton, opts) {
    const nouveau = opts.nouveauMembre || null;
    const membreId = nouveau ? nouveau.id : opts.membreId;

    if (this.mode !== "nuage") {
      /* On repart du document enregistré, surtout PAS de l'état en mémoire :
         un appareil qui rejoint n'a encore rien chargé, et on effacerait la
         famille entière. */
      const d = this._lireLocal(code);
      if (!d) return false;
      if (nouveau) { d.membres = (d.membres || []).concat([nouveau]); }
      d.appareils = Object.assign({}, d.appareils || {});
      d.appareils[this.uid] = membreId;
      recalculerIndexSur(d);
      this._ecrireLocal(code, d);
      return true;
    }
    try {
      const morceau = {
        membresUid: this._fs.arrayUnion(this.uid),
        appareils: { [this.uid]: membreId },
        jetonUtilise: jeton
      };
      if (nouveau) morceau.membres = this._fs.arrayUnion(propre(nouveau));
      if (opts.admin) morceau.adminsUid = this._fs.arrayUnion(this.uid);
      await this._fs.setDoc(this._fs.doc(this._db, "familles", code), morceau, { merge: true });
      return true;
    } catch (err) {
      console.warn("Invitation refusee :", err);
      this.derniereErreur = err;
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

  ["membres", "taches", "courses", "listesCourses", "stock", "recettes", "notes", "cadeaux",
    "echanges", "journal", "membresUid", "adminsUid"]
    .forEach((c) => { if (!Array.isArray(etat[c])) etat[c] = []; });
  ["etats", "repas", "reglages", "bareme", "tarifs", "appareils"].forEach((c) => {
    if (!etat[c] || typeof etat[c] !== "object") etat[c] = {};
  });
  if (!etat.famille || typeof etat.famille !== "object") etat.famille = { nom: "", code: "" };
  if (moi) moi = membre(moi.id) || moi;
}

async function entrerDansFamille(code, membreId, opts) {
  const d = await Store.charger(code);
  if (!d) return false;
  appliquerDonnees(d);
  moi = membre(membreId);
  if (!moi) return false;
  Store.code = code;
  Store.abonner(code, (nouv, portee) => { appliquerDonnees(nouv, portee); rendre(); });
  ecrireSession({ code: code, membreId: membreId });
  localStorage.setItem("tribu:derniereFamille", code);
  verifierRepere(code);          // en arrière-plan, sans bloquer l'ouverture
  majRecettesSiBesoin();         // idem : complète les recettes d'avant
  $("#ecran-connexion").hidden = true;
  $("#ecran-app").hidden = false;
  /* Ouverture depuis une session déjà enregistrée : on reprend là où on
     s'était arrêté. Après une vraie connexion, on repart de l'accueil. */
  ui.vue = "accueil";
  if (opts && opts.reprendreVue) restaurerVue();
  memoriserVue();
  rendre();
  return true;
}

/* Les familles créées avant l'annuaire des repères n'y figurent pas : leur nom
   pourrait donc être proposé à quelqu'un d'autre, qui se heurterait alors à un
   refus difficile à comprendre. On répare en douceur, une seule fois par
   appareil et par famille, sans jamais bloquer l'ouverture de l'application. */
async function verifierRepere(code) {
  if (Store.mode !== "nuage") return;
  const cle = "tribu:repereVerifie:" + code;
  if (localStorage.getItem(cle)) return;
  localStorage.setItem(cle, "1");
  try {
    if (await Store.repereLibre(code) === true) await Store.marquerRepere(code);
  } catch (e) { /* sans importance : on réessaiera sur un autre appareil */ }
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
  async marquerFaite(tacheId) {
    const t = etat.taches.find((x) => x.id === tacheId);
    if (!t) return;
    const d = new Date();
    const cle = cleEtat(t, d);
    if ((etat.etats[cle] || {}).statut === "valide") return;

    /* Les points reviennent a la personne a qui la tache est attribuee.
       Si un parent coche a la place d'un enfant, c'est l'enfant qui gagne. */
    const assigne = assigneDe(t, d);
    const beneficiaire = assigne || (moi && moi.id);
    const gere = !!(assigne && estGere(assigne));

    /* Un enfant sans telephone ne peut pas valider lui-meme : quand le parent
       coche pour lui, cela vaut validation, sinon la tache resterait bloquee. */
    const directe = estAdmin() && gere;

    etat.etats[cle] = {
      statut: directe ? "valide" : "fait",
      parQui: beneficiaire,
      faitLe: new Date().toISOString(),
      valideLe: directe ? new Date().toISOString() : null,
      valideePar: directe ? moi.id : null
    };
    await Store.ecrireEtat(cle, etat.etats[cle]);

    if (directe) {
      await crediterTache(t, cle, beneficiaire);
      rendre();
      const m = membre(beneficiaire);
      toast(m && t.points ? "+" + t.points + " points pour " + m.prenom + " 🌟" : "Validé");
      return;
    }
    rendre();
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

    await crediterTache(t, cle, gagnant);
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
  ajouterCourse(nom, rayon, qte, unite, opts) {
    nom = (nom || "").trim();
    if (!nom) return;
    opts = opts || {};
    /* Un article hérite du vrac de sa fiche de réserve : inutile de le
       recocher à chaque fois, et on n'oublie pas le bocal. */
    const enReserve = articleStock(nom);
    etat.courses.unshift({
      id: id(), nom: nom, qte: String(qte || "").trim(), unite: unite || "",
      rayon: rayon || "Autre", coche: false,
      listeId: opts.listeId || listeCourante().id,
      vrac: opts.vrac !== undefined ? !!opts.vrac : !!(enReserve && enReserve.vrac),
      parQui: moi && moi.id, creeLe: new Date().toISOString()
    });
    sauver("courses");
  },

  /* --- Listes de courses --- */
  enregistrerListe(donnees, lid) {
    assurerListes();
    if (lid) {
      const l = etat.listesCourses.find((x) => x.id === lid);
      if (!l) return;
      Object.assign(l, donnees);
      ui.listeActive = l.id;
    } else {
      const nouvelle = Object.assign({ id: id(), creeLe: new Date().toISOString() }, donnees);
      etat.listesCourses.push(nouvelle);
      ui.listeActive = nouvelle.id;
    }
    sauver("listesCourses");
  },

  async supprimerListe(lid) {
    const l = listesCourses().find((x) => x.id === lid);
    if (!l) return;
    if (listesCourses().length <= 1) { toast("Gardez au moins une liste"); return; }
    const n = coursesDe(lid).length;
    const ok = await confirmer("Supprimer « " + l.nom + " »" +
      (n ? " et ses " + n + " article(s)" : "") + " ?",
      { titre: "Supprimer la liste", ok: "Supprimer", danger: true });
    if (!ok) return;
    etat.courses = etat.courses.filter((c) => listeDe(c) !== lid);
    etat.listesCourses = etat.listesCourses.filter((x) => x.id !== lid);
    ui.listeActive = listeParDefaut().id;
    sauver("courses", "listesCourses");
    toast("Liste supprimée");
  },

  /* Déplacer un article d'une liste à l'autre (ex : du mois vers la semaine). */
  deplacerCourse(cid, listeId) {
    const c = etat.courses.find((x) => x.id === cid);
    if (!c) return;
    c.listeId = listeId;
    c.coche = false;
    sauver("courses");
    const l = listesCourses().find((x) => x.id === listeId);
    toast("Déplacé vers « " + (l ? l.nom : "?") + " »");
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
  /* Les courses cochées sortent de la liste. Si l'article existe dans la
     réserve, on propose d'y ajouter ce qui vient d'être acheté. */
  /* Fin des courses : les articles cochés quittent la liste et rejoignent la
     réserve. `nouveaux` = les noms que l'on accepte d'y créer en plus. */
  async terminerCourses(opts) {
    opts = opts || {};
    const cible = opts.listeId || listeCourante().id;
    const achetes = etat.courses.filter((c) => c.coche && listeDe(c) === cible);
    if (!achetes.length) { toast("Aucun article coché"); return; }

    const aCreer = new Set(opts.nouveaux || []);
    let majes = 0, crees = 0, ignores = 0;

    if (opts.enReserve !== false) {
      achetes.forEach((c) => {
        const s = articleStock(c.nom);
        if (s) {
          const ajout = convertirUnite(c.qte, c.unite || "", s.unite || "");
          /* Unités incompatibles (2 boîtes vs 500 g) : on ne bricole pas un
             chiffre faux, on le signale. */
          if (ajout === null) { ignores++; return; }
          s.qte = texteNombre((nombre(s.qte) || 0) + ajout);
          s.majLe = new Date().toISOString();
          majes++;
        } else if (aCreer.has(c.nom)) {
          etat.stock.push({
            id: id(), nom: c.nom, qte: String(c.qte || "").trim(), unite: c.unite || "",
            mini: "", rayon: c.rayon || "Autre", vrac: !!c.vrac,
            majLe: new Date().toISOString()
          });
          crees++;
        }
      });
    }

    const partis = new Set(achetes.map((c) => c.id));
    etat.courses = etat.courses.filter((c) => !partis.has(c.id));
    sauver("courses", "stock");

    const bilan = [];
    if (majes) bilan.push(majes + " réapprovisionné" + (majes > 1 ? "s" : ""));
    if (crees) bilan.push(crees + " ajouté" + (crees > 1 ? "s" : "") + " à la réserve");
    toast(bilan.length
      ? "Courses terminées : " + bilan.join(", ") + " ✅"
      : achetes.length + " article(s) retiré(s) de la liste");
    if (ignores) {
      setTimeout(() => toast(ignores + " article(s) à vérifier : unités différentes"), 2800);
    }
  },

  /* --- Stock --- */
  enregistrerStock(donnees, sid) {
    if (sid) {
      const s = etat.stock.find((x) => x.id === sid);
      if (!s) return;
      Object.assign(s, donnees, { majLe: new Date().toISOString() });
    } else {
      etat.stock.push(Object.assign({ id: id(), majLe: new Date().toISOString() }, donnees));
    }
    sauver("stock");
  },
  supprimerStock(sid) {
    etat.stock = etat.stock.filter((x) => x.id !== sid);
    sauver("stock");
  },
  /* Boutons + / − directement dans la liste du stock */
  ajusterStock(sid, delta) {
    const s = etat.stock.find((x) => x.id === sid);
    if (!s) return;
    const q = nombre(s.qte) || 0;
    s.qte = texteNombre(Math.max(0, q + delta));
    s.majLe = new Date().toISOString();
    sauver("stock");
  },

  /* Envoie dans les courses tout ce qui est passé sous le minimum. */
  async racheterSousMinimum() {
    const bas = stockSousMinimum();
    if (!bas.length) { toast("Rien à racheter, tout est au-dessus du minimum"); return; }
    const dejaLa = new Set(etat.courses.filter((c) => !c.coche).map((c) => c.nom.toLowerCase().trim()));
    const aAjouter = bas.filter((s) => !dejaLa.has(s.nom.toLowerCase().trim()));
    if (!aAjouter.length) { toast("Ils sont déjà dans la liste de courses"); return; }
    const ok = await confirmer("Ajouter " + aAjouter.length + " article(s) à la liste de courses ?",
      { titre: "Réapprovisionner", ok: "Ajouter" });
    if (!ok) return;
    const cible = listeCourante().id;
    aAjouter.slice().reverse().forEach((s) => {
      const mini = nombre(s.mini) || 0;
      const q = nombre(s.qte) || 0;
      etat.courses.unshift({
        id: id(), nom: s.nom, qte: texteNombre(Math.max(mini - q, mini)), unite: s.unite || "",
        rayon: s.rayon || "Autre", coche: false, listeId: cible, vrac: !!s.vrac,
        parQui: moi && moi.id, creeLe: new Date().toISOString()
      });
    });
    sauver("courses");
    toast(aAjouter.length + " article(s) ajouté(s) 🛒");
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

  /* Un parent dépense les points d'un enfant qui n'a pas de téléphone :
     il n'y a personne pour faire la demande, donc l'échange est direct. */
  async accorderCadeauPour(membreId, cadeauId) {
    if (!estAdmin()) return;
    const c = etat.cadeaux.find((x) => x.id === cadeauId);
    const m = membre(membreId);
    if (!c || !m) return;
    if (pointsDe(membreId) < c.cout) { toast("Pas assez de points"); return; }
    const ok = await confirmer("Échanger " + c.cout + " points de " + m.prenom +
      " contre « " + c.nom + " » ?", { titre: "Offrir ce cadeau", ok: "Échanger" });
    if (!ok) return;

    const eid = id();
    const credite = await ajouterAuJournal({
      id: "c|" + eid, type: "cadeau", refId: c.id,
      membreId: membreId, delta: -c.cout, motif: "Cadeau : " + c.nom
    });
    if (!credite) return;
    etat.echanges.unshift({
      id: eid, membreId: membreId, cadeauId: c.id, cadeauNom: c.nom, cadeauEmoji: c.emoji,
      cout: c.cout, statut: "accorde", demandeLe: new Date().toISOString(),
      traiteLe: new Date().toISOString(), traitePar: moi.id
    });
    sauver("echanges");
    toast(c.nom + " pour " + m.prenom + " 🎉");
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

/* Credite les points d'une tache validee, une seule fois par periode. */
async function crediterTache(t, cle, beneficiaire) {
  if (!beneficiaire || !t.points) return;
  await ajouterAuJournal({
    id: "t|" + t.id + "|" + clePeriode(t.frequence, new Date()),
    type: "tache", refId: t.id, cleEtat: cle.replace(/\|/g, "__"),
    membreId: beneficiaire, delta: t.points, motif: "Tâche : " + t.nom
  });
}

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

  /* L'invitation embarque tout ce qu'il faut pour entrer : le nom de la tribu
     et, si elle vise un profil existant, ce profil (avec l'empreinte de son
     code, pour pouvoir le vérifier). C'est indispensable : tant qu'il n'est
     pas inscrit, l'appareil invité n'a pas le droit de lire la famille. */
  async creer(joursValidite, pourMembreId) {
    if (!estAdmin()) return null;
    const cible = pourMembreId ? membre(pourMembreId) : null;
    const inv = {
      jeton: codeInvitation(),
      famille: etat.famille.code,
      nomFamille: etat.famille.nom,
      pour: cible ? cible.id : "nouveau",
      profil: cible ? {
        id: cible.id, prenom: cible.prenom, emoji: cible.emoji || "🙂",
        role: cible.role || "membre",
        pinHash: cible.pinHash || null, pinSel: cible.pinSel || null,
        pin: cible.pinHash ? null : (cible.pin || null)
      } : null,
      profilRole: cible ? (cible.role || "membre") : "",
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

  /* Accepte tout ce qu'on peut lui donner : un lien collé, un code tapé avec
     ou sans tirets, en minuscules, avec des espaces. Les invitations créées
     avant le passage aux codes courts (48 caractères hexadécimaux) restent
     valables : c'est la longueur qui distingue les deux formats. */
  extraireJeton(texte) {
    const t = (texte || "").trim();
    const dansLien = t.match(/invitation=([A-Za-z0-9-]+)/);
    const brut = dansLien ? dansLien[1] : t;
    const nu = brut.replace(/[^A-Za-z0-9]/g, "");
    /* Ancien format : identifiant hexadécimal, sensible à la casse. */
    if (/^[a-f0-9]{32,}$/i.test(nu)) return nu.toLowerCase();
    const code = nu.toUpperCase();
    return /^[A-Z2-9]{12}$/.test(code) ? code : null;
  },

  /* On ne lit QUE l'invitation : la famille n'est pas encore lisible pour cet
     appareil, et c'est justement ce qui la protège. */
  async valider(jeton) {
    const inv = await Store.lireInvitation(jeton);
    if (!inv) {
      return {
        ok: false,
        message: Store.derniereErreur
          ? "Impossible de lire l'invitation (connexion ?)."
          : "Cette invitation n'existe pas ou a été supprimée."
      };
    }
    if (inv.utilisee) return { ok: false, message: "Cette invitation a déjà été utilisée." };
    if (inv.expireLe && inv.expireLe < Date.now()) return { ok: false, message: "Cette invitation a expiré." };
    return { ok: true, invitation: inv };
  }
};

/* ============ Remise à niveau des recettes d'une famille existante ============

   Les plats fournis sont recopiés dans la famille le jour de sa création :
   les améliorations apportées ensuite au fichier `recettes.js` ne les
   atteignent donc jamais. Cette fonction complète ce qui manque — et
   UNIQUEMENT ce qui manque, sans jamais écraser ce que la famille a saisi. */

const UNITES_CONNUES = {
  "g": "g", "gr": "g", "gramme": "g", "grammes": "g",
  "kg": "kg", "kilo": "kg", "kilos": "kg",
  "ml": "ml", "cl": "cl", "l": "l", "litre": "l", "litres": "l",
  "boite": "boîte(s)", "boites": "boîte(s)", "boîte": "boîte(s)", "boîtes": "boîte(s)",
  "paquet": "paquet(s)", "paquets": "paquet(s)",
  "pot": "pot(s)", "pots": "pot(s)",
  "sachet": "sachet(s)", "sachets": "sachet(s)",
  "tranche": "tranche(s)", "tranches": "tranche(s)",
  "bouquet": "bouquet(s)", "bouquets": "bouquet(s)",
  "branche": "branche(s)", "branches": "branche(s)",
  "gousse": "gousse(s)", "gousses": "gousse(s)",
  "tete": "tête(s)", "tête": "tête(s)", "têtes": "tête(s)",
  "buche": "bûche(s)", "bûche": "bûche(s)", "bûches": "bûche(s)",
  "morceau": "morceau(x)", "morceaux": "morceau(x)",
  "pincee": "pincée(s)", "pincée": "pincée(s)", "pincées": "pincée(s)",
  "c. à soupe": "c. à soupe", "c. a soupe": "c. à soupe",
  "c. à café": "c. à café", "c. a cafe": "c. à café"
};
function normaliserUnite(txt) {
  const t = String(txt || "").trim().toLowerCase();
  if (!t) return "";
  if (UNITES.indexOf(txt) !== -1) return txt;          // déjà au bon format
  return UNITES_CONNUES[t] !== undefined ? UNITES_CONNUES[t] : null;
}

function reparerRecettes() {
  const reference = new Map((window.RECETTES_DEPART || [])
    .map((r) => [r.nom.toLowerCase().trim(), r]));
  let saisonsAjoutees = 0;
  let unitesSeparees = 0;
  let etapesAjoutees = 0;

  etat.recettes.forEach((r) => {
    /* Saisons absentes : on reprend celles du plat de référence, s'il existe.
       Une recette maison reste « toute l'année » tant que rien n'est coché. */
    const ref = reference.get(String(r.nom || "").toLowerCase().trim());
    if (r.saisons === undefined) {
      r.saisons = ref ? (ref.saisons || []).slice() : [];
      if (r.saisons.length) saisonsAjoutees++;
    }
    if (r.thermomix === undefined) r.thermomix = !!(ref && ref.thermomix);
    if (r.etapes === undefined) {
      r.etapes = ref ? (ref.etapes || []).slice() : [];
      if (r.etapes.length) etapesAjoutees++;
    }
    /* Quantité et unité collées : « 800 g » -> 800 + g. En cas de doute sur
       l'unité, on ne touche à rien : mieux vaut l'ancien format qu'une perte. */
    (r.ingredients || []).forEach((i) => {
      if (i.unite !== undefined && i.unite !== null) return;
      const m = String(i.qte || "").trim().match(/^([0-9]+(?:[.,][0-9]+)?)\s*(.*)$/);
      if (!m) return;
      const u = normaliserUnite(m[2]);
      if (u === null) return;
      i.qte = m[1];
      i.unite = u;
      unitesSeparees++;
    });
  });

  return { saisons: saisonsAjoutees, unites: unitesSeparees, etapes: etapesAjoutees };
}

/* Les plats fournis avec l'application que cette famille n'a pas (encore).
   On ne les ajoute JAMAIS d'office : une famille a pu en supprimer exprès. */
function recettesManquantes() {
  const presentes = new Set(etat.recettes.map((r) => String(r.nom || "").toLowerCase().trim()));
  return (window.RECETTES_DEPART || [])
    .filter((r) => !presentes.has(r.nom.toLowerCase().trim()));
}

function ajouterRecettesManquantes() {
  const aAjouter = recettesManquantes();
  aAjouter.forEach((r) => {
    etat.recettes.push(Object.assign({ id: id(), origine: "depart" }, JSON.parse(JSON.stringify(r))));
  });
  if (aAjouter.length) sauver("recettes");
  return aAjouter.length;
}

/* ---------------------- Notifications de mise à jour ----------------------
   Ce que l'application propose de nouveau et que cette famille n'a pas encore.
   Réservé aux administrateurs : eux seuls peuvent y donner suite. */
/* Ce qui manque au cahier de recettes de cette famille.
   UNE SEULE fonction fait ce constat : la pastille de notification et la
   fenêtre de mise à jour s'y réfèrent toutes les deux. Quand elles comptaient
   chacune de leur côté, elles finissaient par se contredire — la pastille
   restait allumée alors que la fenêtre annonçait « rien à faire ». */
function diagnosticRecettes() {
  const manqueChamp = (r) =>
    r.saisons === undefined || r.thermomix === undefined || r.etapes === undefined;
  const manqueUnite = (r) =>
    (r.ingredients || []).some((i) => i.unite === undefined || i.unite === null);

  const aCompleter = etat.recettes.filter((r) => manqueChamp(r) || manqueUnite(r));
  const d = {
    aCompleter: aCompleter.length,
    saisons: etat.recettes.filter((r) => r.saisons === undefined).length,
    etapes: etat.recettes.filter((r) => r.etapes === undefined).length,
    unites: etat.recettes.reduce((n, r) =>
      n + (r.ingredients || []).filter((i) => i.unite === undefined || i.unite === null).length, 0),
    nouvelles: recettesManquantes()
  };
  d.rienAFaire = !d.aCompleter && !d.nouvelles.length;
  return d;
}

function misesAJour() {
  if (!moi || !estAdmin()) return [];
  const d = diagnosticRecettes();
  if (d.rienAFaire) return [];

  const details = [];
  if (d.nouvelles.length) details.push(d.nouvelles.length + " nouveau" +
    (d.nouvelles.length > 1 ? "x" : "") + " plat" + (d.nouvelles.length > 1 ? "s" : "") + " à ajouter");
  if (d.aCompleter) details.push(d.aCompleter + " recette" +
    (d.aCompleter > 1 ? "s" : "") + " à compléter");

  return [{
    id: "recettes", emoji: "📖", titre: "Cahier de recettes",
    detail: details.join(" • "), action: "recettes-maj"
  }];
}

/* Lancée une fois par famille, par un administrateur, au démarrage. */
async function majRecettesSiBesoin() {
  if (!estAdmin()) return;
  const cle = "tribu:recettesMaj:" + (etat.famille.code || "?");
  if (localStorage.getItem(cle)) return;
  const besoin = diagnosticRecettes().aCompleter > 0;
  localStorage.setItem(cle, "1");
  if (!besoin) return;
  const bilan = reparerRecettes();
  const parts = [];
  if (bilan.saisons) parts.push(bilan.saisons + " saison" + (bilan.saisons > 1 ? "s" : ""));
  if (bilan.etapes) parts.push(bilan.etapes + " déroulé" + (bilan.etapes > 1 ? "s" : ""));
  if (bilan.unites) parts.push(bilan.unites + " unité" + (bilan.unites > 1 ? "s" : ""));
  if (parts.length) {
    await Store.ecrire(["recettes"]);
    rendre();
    toast("Recettes mises à jour : " + parts.join(", "));
  }
}

/* ==================== Partage de recettes entre familles ==================== */

const Partage = {

  /* Ce qui part vraiment dans le catalogue commun : la recette, et le seul
     nom de la tribu. Ni code de famille secret, ni prénoms, ni points. */
  ficheDe(r) {
    return {
      id: id(),
      nom: r.nom,
      emoji: r.emoji || "🍽️",
      type: r.type || "consistant",
      vegetarien: !!r.vegetarien,
      rapide: !!r.rapide,
      saisons: (r.saisons || []).slice(0, 4),
      etapes: (r.etapes || []).slice(0, 20),
      lien: r.lien || "",
      ingredients: (r.ingredients || []).slice(0, 40).map((i) => ({
        nom: i.nom, qte: i.qte || "", unite: i.unite || "", rayon: i.rayon || "Autre"
      })),
      parFamille: etat.famille.nom || "Une famille",
      familleRef: etat.famille.code,      // sert à pouvoir retirer sa publication
      publieLe: new Date().toISOString(),
      version: VERSION
    };
  },

  async publier(recetteId) {
    const r = etat.recettes.find((x) => x.id === recetteId);
    if (!r) return false;
    if (Store.mode !== "nuage") {
      toast("Le partage demande la connexion familiale (Firebase)");
      return false;
    }
    if (!estRecettePerso(r)) {
      toast("Seules vos propres recettes peuvent être partagées");
      return false;
    }
    const fiche = this.ficheDe(r);
    const ok = await Store.publierRecette(fiche);
    if (!ok) { toast("Publication refusée par le serveur"); return false; }
    r.partageId = fiche.id;
    sauver("recettes");
    return true;
  },

  async retirer(recetteId) {
    const r = etat.recettes.find((x) => x.id === recetteId);
    if (!r || !r.partageId) return false;
    const ok = await Store.retirerRecettePartagee(r.partageId);
    if (!ok) { toast("Retrait impossible"); return false; }
    r.partageId = null;
    sauver("recettes");
    return true;
  },

  /* Recopie une recette du catalogue dans la bibliothèque de la famille. */
  importer(fiche) {
    const existe = etat.recettes.some((r) =>
      r.nom.toLowerCase().trim() === String(fiche.nom).toLowerCase().trim());
    if (existe) { toast("Vous avez déjà un plat de ce nom"); return false; }
    etat.recettes.push({
      id: id(),
      nom: fiche.nom, emoji: fiche.emoji || "🍽️", type: fiche.type || "consistant",
      vegetarien: !!fiche.vegetarien, rapide: !!fiche.rapide,
      saisons: (fiche.saisons || []).slice(0, 4),
      etapes: (fiche.etapes || []).slice(0, 20), lien: fiche.lien || "",
      ingredients: (fiche.ingredients || []).map((i) => ({
        nom: i.nom, qte: i.qte || "", unite: i.unite || "", rayon: i.rayon || "Autre"
      })),
      origine: "importee",
      deQui: fiche.parFamille || "",
      creeLe: new Date().toISOString()
    });
    sauver("recettes");
    return true;
  }
};

/* ============================ 8. Generateur de menus ============================ */

/* --- De quoi est fait un plat -------------------------------------------
   Le rayon des ingrédients est ce qu'il y a de plus sûr (Boucherie,
   Poissonnerie), mais un thon en boîte se range en épicerie : on regarde
   donc aussi les noms, en MOTS ENTIERS pour ne pas confondre « échalotte »
   et « lotte ». Un plat qui contient les deux compte comme poisson : c'est
   celui-là qu'on cherche à placer dans la semaine. */
const MOTS_POISSON = ["poisson", "saumon", "thon", "cabillaud", "colin", "merlu",
  "lieu noir", "truite", "sardine", "maquereau", "anchois", "dorade", "sole",
  "haddock", "crevette", "moule", "gambas", "crabe", "surimi", "calamar",
  "encornet", "saint jacques", "bulot", "seiche", "eglefin", "rouget", "lotte",
  "hareng", "poulpe", "espadon", "julienne de la mer", "fruits de mer"];
const MOTS_VIANDE = ["viande", "boeuf", "poulet", "volaille", "dinde", "porc",
  "veau", "agneau", "canard", "lapin", "jambon", "lardon", "saucisse", "saucisson",
  "merguez", "chorizo", "bacon", "steak", "escalope", "magret", "roti", "gigot",
  "paleron", "chipolata", "knacki", "andouille", "boudin", "pancetta",
  "charcuterie", "gesier", "tripe", "onglet", "bavette", "cuisse", "aiguillette"];
/* Un bouillon de bœuf ne fait pas un repas de viande : on ne le compte pas. */
const INGREDIENTS_NEUTRES = ["bouillon", "cube", "fond"];

function ingredientCompte(ing) {
  const mots = motsDe(ing && ing.nom);
  return !INGREDIENTS_NEUTRES.some((m) => contientProduit(mots, m));
}
function citeUnProduit(r, liste) {
  return (r.ingredients || []).some((ing) => {
    if (!ingredientCompte(ing)) return false;
    const mots = motsDe(ing.nom);
    return liste.some((p) => contientProduit(mots, p));
  });
}

/* "vege" | "poisson" | "viande" | "autre" (œufs, fromage, pâtes...) */
function categorieRepas(r) {
  if (r.vegetarien) return "vege";
  const ing = r.ingredients || [];
  if (ing.some((i) => i.rayon === "Poissonnerie") || citeUnProduit(r, MOTS_POISSON)) return "poisson";
  if (ing.some((i) => i.rayon === "Boucherie") || citeUnProduit(r, MOTS_VIANDE)) return "viande";
  return "autre";
}
const CATEGORIES_REPAS = [
  { val: "poisson", nom: "Poisson", emoji: "🐟" },
  { val: "viande", nom: "Viande", emoji: "🍗" },
  { val: "vege", nom: "Végétarien", emoji: "🥦" }
];
function nomCategorie(val) {
  const c = CATEGORIES_REPAS.find((x) => x.val === val);
  return c ? c.emoji + " " + c.nom.toLowerCase() : "autre";
}

/* Ce que contient une semaine déjà prévue. C'est le meilleur retour sur les
   nombres demandés au générateur : on voit tout de suite ce qu'on mange. */
function compositionSemaine(cleSem) {
  const c = { poisson: 0, viande: 0, vege: 0, autre: 0, total: 0 };
  Object.keys(etat.repas[cleSem] || {}).forEach((k) => {
    const v = etat.repas[cleSem][k];
    if (!v || !v.recetteId) return;
    const r = etat.recettes.find((x) => x.id === v.recetteId);
    if (!r) return;
    c[categorieRepas(r)]++;
    c.total++;
  });
  return c;
}

/* Part des ingrédients d'un plat que l'on a déjà dans la réserve (0 à 1).
   Sert à proposer en premier ce qui ne demande presque pas de courses. */
function couvertureReserve(r) {
  const ing = (r.ingredients || []).filter((i) => i && i.nom);
  if (!ing.length || !etat.stock.length) return 0;
  let ok = 0;
  ing.forEach((i) => {
    const m = manquePour(i.nom, i.qte, i.unite || "");
    if (m.enStock === null) return;               // pas du tout en réserve
    if (m.connu && m.manque !== null && m.manque > 0) return;  // pas assez
    ok++;
  });
  return ok / ing.length;
}

/* Une étiquette par repas de la semaine, mélangée : c'est ce qui garantit
   « deux poissons » plutôt que « deux poissons si la chance le veut ». */
function repartitionSouhaitee(nb, quotas) {
  const l = [];
  CATEGORIES_REPAS.forEach((c) => {
    const n = quotas[c.val];
    for (let k = 0; k < n && l.length < nb; k++) l.push(c.val);
  });
  const places = l.length;
  while (l.length < nb) l.push("libre");
  for (let i = l.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = l[i]; l[i] = l[j]; l[j] = t;
  }
  return { plan: l, places: places };
}

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
  opt = opt || {};
  const regime = opt.regime || "libre";
  let pool = etat.recettes.slice();
  if (!pool.length) { toast("Ajoutez d'abord des recettes"); return null; }

  /* Le régime, lui, n'est pas une préférence : les plats écartés le sont
     pour de bon, ils ne peuvent pas ressortir faute de mieux. */
  if (regime === "vege") pool = pool.filter((r) => categorieRepas(r) === "vege");
  else if (regime === "sansViande") pool = pool.filter((r) => categorieRepas(r) !== "viande");
  if (!pool.length) {
    toast(regime === "vege"
      ? "Aucun plat végétarien dans votre cahier de recettes"
      : "Aucun plat sans viande dans votre cahier de recettes");
    return null;
  }

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
  if (!cases.length) { toast("Rien à remplir avec ces options"); return null; }

  /* Un nombre demandé (« 2 poissons ») est un nombre exact : la catégorie
     ne réapparaît pas ailleurs dans la semaine. Une catégorie laissée sur
     « peu importe » reste, elle, entièrement libre. */
  const quotas = {};
  const fixees = [];
  CATEGORIES_REPAS.forEach((c) => {
    let n = opt[c.val];
    if (regime === "vege") n = (c.val === "vege" ? cases.length : 0);
    else if (regime === "sansViande" && c.val === "viande") n = 0;
    if (n === null || n === undefined || n === "") { quotas[c.val] = 0; return; }
    quotas[c.val] = Math.max(0, Math.min(Number(n) || 0, cases.length));
    fixees.push(c.val);
  });
  const demande = CATEGORIES_REPAS.reduce((s, c) => s + quotas[c.val], 0);
  const plan = repartitionSouhaitee(cases.length, quotas).plan;

  const recents = recettesUtiliseesRecemment(cleSem, Math.max(0, Number(opt.semaines) || 3));
  const utilises = new Set();
  const bilan = { poisson: 0, viande: 0, vege: 0, autre: 0 };

  if (!etat.repas[cleSem]) etat.repas[cleSem] = {};

  cases.forEach((c, rang) => {
    const voulu = plan[rang];
    let meilleur = null, meilleurScore = -1e9;
    pool.forEach((r) => {
      let s = Math.random() * 1.5;
      const cat = categorieRepas(r);
      if (utilises.has(r.id)) s -= 40;
      if (recents.has(r.id)) s -= 6;
      /* La répartition demandée passe avant le reste. */
      if (voulu !== "libre") s += (cat === voulu ? 30 : -30);
      else if (fixees.indexOf(cat) !== -1) s -= 20;   // son compte est déjà fait
      /* Hors saison, on écarte franchement : un gratin de courgettes en
         janvier, ce n'est pas une bonne idée. */
      if (opt.saisons !== false && !estDeSaison(r)) s -= 25;
      if (opt.saisons !== false && !saisonsToutelAnnee(r) && estDeSaison(r)) s += 3;
      if (opt.soirLeger && c.moment === "soir" && r.type === "leger") s += 4;
      if (opt.soirLeger && c.moment === "midi" && r.type === "consistant") s += 1.5;
      if (opt.rapideSemaine && c.jour !== "samedi" && c.jour !== "dimanche" && r.rapide) s += 2.5;
      if (opt.thermomix && r.thermomix) s += 3;
      /* Ce dont on a déjà les ingrédients passe devant : moins de courses,
         moins de perte. Ça pèse, sans écraser la saison ni la répartition. */
      if (opt.reserve) s += couvertureReserve(r) * 10;
      if (s > meilleurScore) { meilleurScore = s; meilleur = r; }
    });
    if (!meilleur) return;
    utilises.add(meilleur.id);
    bilan[categorieRepas(meilleur)]++;
    etat.repas[cleSem][c.jour + "-" + c.moment] = { recetteId: meilleur.id, texte: "" };
  });

  sauver("repas");
  return { n: cases.length, bilan: bilan, tropDemande: Math.max(0, demande - cases.length) };
}

/* Tous les ingredients des repas prevus, regroupes par nom et additionnes. */
function ingredientsDeLaSemaine(cleSem) {
  const sem = etat.repas[cleSem] || {};
  const parNom = new Map();
  Object.values(sem).forEach((c) => {
    if (!c || !c.recetteId) return;
    const r = etat.recettes.find((x) => x.id === c.recetteId);
    if (!r) return;
    (r.ingredients || []).forEach((ing) => {
      const cle = ing.nom.toLowerCase().trim();
      if (!parNom.has(cle)) {
        parNom.set(cle, { nom: ing.nom, rayon: ing.rayon || "Autre", morceaux: [] });
      }
      parNom.get(cle).morceaux.push({ qte: ing.qte, unite: ing.unite || "" });
    });
  });

  return Array.from(parNom.values()).map((e) => {
    const total = additionnerQuantites(e.morceaux);
    const principal = total.paquets[0] || { qte: null, unite: "" };
    return {
      nom: e.nom, rayon: e.rayon,
      qte: principal.qte === null ? "" : texteNombre(principal.qte),
      unite: principal.unite,
      besoinTexte: total.texte
    };
  }).sort((a, b) =>
    RAYONS.indexOf(a.rayon) - RAYONS.indexOf(b.rayon) || a.nom.localeCompare(b.nom));
}

/* Rentrer les achats en réserve sans confirmation : réglage de l'appareil,
   activé par défaut — c'est le geste que l'on attend au retour du magasin. */
function reserveAutomatique() {
  return localStorage.getItem("tribu:reserveAuto") !== "0";
}

/* ======================= Les listes de courses ======================= */

/* Tant que la famille n'a pas créé de listes, tout vit dans une liste
   implicite. Elle n'est écrite dans les données qu'au moment où on en
   ajoute une deuxième — inutile de bousculer les familles existantes. */
function listesCourses() {
  return etat.listesCourses.length ? etat.listesCourses : [LISTE_PRINCIPALE];
}
function listeParDefaut() { return listesCourses()[0]; }
function listeDe(c) { return c.listeId || LISTE_PRINCIPALE.id; }
function listeCourante() {
  return listesCourses().find((l) => l.id === ui.listeActive) || listeParDefaut();
}
function coursesDe(listeId) {
  return etat.courses.filter((c) => listeDe(c) === listeId);
}
function typeListe(l) {
  return TYPES_LISTE.find((t) => t.val === (l && l.type)) || TYPES_LISTE[0];
}
/* Ce qui compte comme « à acheter » : les listes ponctuelles et hebdomadaires.
   La liste du mois se remplit tranquillement, elle ne réclame rien. */
function coursesUrgentes() {
  const ids = listesCourses().filter((l) => typeListe(l).alerte).map((l) => l.id);
  return etat.courses.filter((c) => !c.coche && ids.indexOf(listeDe(c)) !== -1);
}
/* Matérialise la liste implicite : nécessaire dès qu'il y en a une deuxième. */
function assurerListes() {
  if (etat.listesCourses.length) return;
  etat.listesCourses = [Object.assign({}, LISTE_PRINCIPALE, { creeLe: new Date().toISOString() })];
}

/* ============================ Stock (la réserve) ============================ */

function articleStock(nom) {
  const n = String(nom || "").toLowerCase().trim();
  return etat.stock.find((s) => s.nom.toLowerCase().trim() === n) || null;
}

/* Un article est « à racheter » quand sa quantité passe sous le minimum. */
function stockSousMinimum() {
  return etat.stock.filter((s) => {
    const mini = nombre(s.mini);
    const q = nombre(s.qte);
    return mini !== null && mini > 0 && (q === null || q < mini);
  });
}

/* Ce qu'il reste vraiment à acheter pour un ingrédient, compte tenu du stock.
   Renvoie { manque, unite, connu } — `connu` est faux quand les unités ne se
   convertissent pas (on ne devine pas, on le dit). */
function manquePour(nom, qte, unite) {
  const s = articleStock(nom);
  const besoin = nombre(qte);
  if (!s) return { manque: besoin, unite: unite, connu: true, enStock: null };
  const dispo = convertirUnite(s.qte, s.unite || "", unite || "");
  if (besoin === null || dispo === null) {
    return { manque: besoin, unite: unite, connu: false, enStock: formaterQte(s.qte, s.unite) };
  }
  return {
    manque: Math.max(0, besoin - dispo), unite: unite, connu: true,
    enStock: formaterQte(s.qte, s.unite)
  };
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

  const maj = misesAJour();
  $("#btn-profil").innerHTML = esc(moi.emoji || "🙂") +
    (maj.length ? '<span class="point-maj"></span>' : "");
  $("#btn-profil").title = maj.length
    ? maj.length + " mise(s) à jour disponible(s)" : "Mon profil";
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
    courses: coursesUrgentes().length,
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
  stock: { admin: false, action: "stock-nouveau" },
  notes: { admin: false, action: "note-nouvelle" },
  recettes: { admin: false, action: "recette-nouvelle" },
  points: { admin: true, action: "cadeau-nouveau" }
};
function majFab() {
  const f = $("#fab");
  /* L'onglet Courses abrite deux listes : le bouton + change de rôle. */
  const cle = ui.vue === "courses" && ui.ongletCourses === "stock" ? "stock" : ui.vue;
  const conf = FAB[cle];
  if (!conf || (conf.admin && !estAdmin())) { f.hidden = true; return; }
  f.hidden = false;
  f.dataset.action = conf.action;
}

function aller(vue) {
  ui.vue = vue;
  memoriserVue();
  window.scrollTo({ top: 0 });
  rendre();
}

/* On retient l'onglet ouvert : recharger la page ne doit pas ramener
   brutalement à l'accueil au milieu de ce qu'on était en train de faire. */
function memoriserVue() {
  try {
    localStorage.setItem("tribu:vue", JSON.stringify({
      vue: ui.vue,
      ongletCourses: ui.ongletCourses,
      listeActive: ui.listeActive || null
    }));
  } catch (e) { /* sans importance */ }
}

function restaurerVue() {
  let v;
  try { v = JSON.parse(localStorage.getItem("tribu:vue") || "null"); } catch (e) { return; }
  if (!v || !v.vue || !Vues[v.vue]) return;
  /* L'administration n'a pas de sens pour un membre ordinaire. */
  if (v.vue === "admin" && !estAdmin()) return;
  ui.vue = v.vue;
  if (v.ongletCourses) ui.ongletCourses = v.ongletCourses;
  if (v.listeActive) ui.listeActive = v.listeActive;
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
    case "course-editer": Formulaires.course(v); break;
    case "courses-vider": Formulaires.terminerCourses(); break;
    case "reserve-auto": {
      const on = localStorage.getItem("tribu:reserveAuto") !== "0";
      localStorage.setItem("tribu:reserveAuto", on ? "0" : "1");
      rendre();
      toast(on ? "Le récapitulatif sera affiché à chaque fois"
               : "Les achats connus rentreront directement en réserve");
      break;
    }
    case "courses-onglet": ui.ongletCourses = b.dataset.valeur; rendre(); break;
    case "liste-choisir": ui.listeActive = b.dataset.valeur; ui.ongletCourses = "liste"; rendre(); break;
    case "liste-nouvelle": Formulaires.liste(null); break;
    case "liste-editer": Formulaires.liste(listeCourante().id); break;
    case "course-deplacer": Formulaires.deplacerCourse(v); break;

    /* réserve */
    case "stock-nouveau": Formulaires.stock(null); break;
    case "stock-editer": Formulaires.stock(v); break;
    case "stock-plus": Actions.ajusterStock(v, 1); break;
    case "stock-moins": Actions.ajusterStock(v, -1); break;
    case "stock-racheter": Actions.racheterSousMinimum(); break;

    /* retours */
    case "retour": Formulaires.retour(); break;

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
    case "recette-voir": Formulaires.consulterRecette(v); break;
    case "recettes-partagees": Formulaires.catalogue(); break;
    case "recettes-maj": Formulaires.majRecettes(); break;
    case "recettes-filtre": {
      const f = b.dataset.valeur;
      const i = ui.filtresRecettes.indexOf(f);
      if (i === -1) ui.filtresRecettes.push(f); else ui.filtresRecettes.splice(i, 1);
      rendre();
      break;
    }
    case "recettes-filtre-vider": ui.filtresRecettes = []; ui.rechercheRecette = ""; rendre(); break;
    case "recettes-tri": ui.triRecettes = b.dataset.valeur; rendre(); break;

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
    case "cadeau-pour": Formulaires.cadeauPour(v); break;

    case "membre-nouveau": Formulaires.membre(null); break;
    case "membre-editer": Formulaires.membre(v); break;
    case "inviter": Formulaires.invitation(); break;
    case "masquer-conseils":
      localStorage.setItem("tribu:conseilsMasques", "1");
      rendre();
      toast("Conseils masqués — ils reviennent depuis Administration");
      break;
    case "revoir-conseils":
      localStorage.removeItem("tribu:conseilsMasques");
      aller("accueil");
      break;
    case "menu-profil": Formulaires.menuProfil(); break;
    case "mon-appareil": Formulaires.monAppareil(); break;
    case "maj-liste": Formulaires.misesAJour(); break;
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

  /* Sur téléphone, la mémoire d'un site peut être effacée pour faire de la
     place. Cette demande met la session à l'abri quand le navigateur la
     comprend, et ne coûte rien quand il l'ignore (c'est le cas de Safari). */
  if (navigator.storage && navigator.storage.persist) {
    try { navigator.storage.persist(); } catch (e) { /* sans importance */ }
  }

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
    const ok = await entrerDansFamille(s.code, s.membreId, { reprendreVue: true });
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
