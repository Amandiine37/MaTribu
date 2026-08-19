/* =========================================================================
   TRIBU — dessin des ecrans
   =========================================================================
   Chaque fonction de `Vues` renvoie le HTML d'un onglet.
   `Connexion` gere les ecrans d'avant-connexion (creer / rejoindre / code).
   ========================================================================= */

/* ------------------------- petits morceaux reutilisables ------------------------- */

function avatarDe(m, taille) {
  if (!m) return '<span class="avatar ' + (taille || "sm") + '">❓</span>';
  return '<span class="avatar ' + (taille || "sm") + '">' + esc(m.emoji || "🙂") + "</span>";
}
function nomDe(idm) {
  const m = membre(idm);
  return m ? m.prenom : "quelqu'un";
}
function bloc(titre, contenu, lienTexte, lienAction, lienVue) {
  return '<div class="carte"><div class="carte-titre">' + titre +
    (lienTexte ? '<button class="lien" data-action="' + lienAction +
      (lienVue ? '" data-vue="' + lienVue : "") + '">' + esc(lienTexte) + "</button>" : "") +
    "</div>" + contenu + "</div>";
}
function rienDu(emoji, texte) {
  return '<div class="vide"><span class="emoji">' + emoji + "</span>" + texte + "</div>";
}
function etiquetteFrequence(f) {
  const n = f === "jour" ? "Chaque jour" : f === "mois" ? "Chaque mois" : "Chaque semaine";
  return '<span class="etiquette">' + n + "</span>";
}

const Vues = {};

/* ================================ ACCUEIL ================================ */

Vues.accueil = function () {
  const h = [];
  const heure = new Date().getHours();
  const salut = heure < 5 ? "Bonne nuit" : heure < 12 ? "Bonjour" : heure < 18 ? "Bon après-midi" : "Bonsoir";
  const auj = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  h.push('<h2 class="titre-section">' + salut + " " + esc(moi.prenom) + " 👋</h2>");
  h.push('<p class="aide" style="margin:-.6rem 0 1rem;text-transform:capitalize">' + esc(auj) + "</p>");

  if (Store.mode === "local") {
    h.push('<div class="bandeau">⚠️<div><b>Mode hors partage.</b> Les données restent sur cet appareil. ' +
      "Pour partager avec la famille, remplissez le fichier <b>firebase-config.js</b> (voir le guide).</div></div>");
  }

  /* Mes taches */
  const mes = mesTachesAFaire();
  h.push(bloc("🧹 Mes tâches" + (mes.length ? ' <span class="etiquette chaud">' + mes.length + "</span>" : ""),
    mes.length
      ? mes.map((x) => ligneTache(x, true)).join("")
      : rienDu("🎉", "Rien à faire pour le moment. Profitez-en !"),
    "Tout voir", "aller", "taches"));

  /* A valider (admin) */
  if (estAdmin()) {
    const aValider = tachesAValider();
    const demandes = echangesEnAttente();
    if (aValider.length || demandes.length) {
      const l = [];
      aValider.forEach((x) => {
        l.push('<div class="ligne">' + avatarDe(membre(x.et.parQui)) +
          '<div class="ligne-corps"><b>' + esc(x.t.emoji + " " + x.t.nom) + "</b><small>" +
          esc(nomDe(x.et.parQui)) + " dit l'avoir faite • +" + x.t.points + " pts</small></div>" +
          '<button class="btn mini danger" data-action="tache-refuser" data-id="' + x.t.id + '">✕</button>' +
          '<button class="btn mini principal" data-action="tache-valider" data-id="' + x.t.id + '">Valider</button>' +
          "</div>");
      });
      demandes.forEach((e) => {
        l.push('<div class="ligne">' + avatarDe(membre(e.membreId)) +
          '<div class="ligne-corps"><b>' + esc((e.cadeauEmoji || "🎁") + " " + e.cadeauNom) + "</b><small>" +
          esc(nomDe(e.membreId)) + " demande ce cadeau • " + e.cout + " pts</small></div>" +
          '<button class="btn mini danger" data-action="echange-refuser" data-id="' + e.id + '">✕</button>' +
          '<button class="btn mini principal" data-action="echange-accorder" data-id="' + e.id + '">Accorder</button>' +
          "</div>");
      });
      h.push(bloc("✅ À valider", l.join("")));
    }
  }

  /* Menu du jour */
  const cleSem = cleSemaine(new Date());
  const jour = JOURS[(new Date().getDay() + 6) % 7];
  const sem = etat.repas[cleSem] || {};
  const midi = sem[jour + "-midi"], soir = sem[jour + "-soir"];
  const nomRepas = (c) => {
    if (!c) return null;
    if (c.recetteId) {
      const r = etat.recettes.find((x) => x.id === c.recetteId);
      return r ? (r.emoji || "🍽️") + " " + r.nom : null;
    }
    return c.texte ? "🍽️ " + c.texte : null;
  };
  const nm = nomRepas(midi), ns = nomRepas(soir);
  h.push(bloc("🍽️ Aujourd'hui au menu",
    (nm || ns)
      ? '<div class="ligne"><div class="ligne-corps"><small>Midi</small><b>' + esc(nm || "— non prévu") + "</b></div></div>" +
      '<div class="ligne"><div class="ligne-corps"><small>Soir</small><b>' + esc(ns || "— non prévu") + "</b></div></div>"
      : rienDu("🤷", "Aucun repas prévu aujourd'hui."),
    "Voir la semaine", "aller", "menus"));

  /* Rappels */
  const prochains = notesAVenir().slice(0, 3);
  h.push(bloc("🔔 Rappels",
    prochains.length ? prochains.map(ligneNote).join("") : rienDu("😌", "Aucun rappel en attente."),
    "Tout voir", "aller", "notes"));

  /* Courses */
  const restants = etat.courses.filter((c) => !c.coche).length;
  h.push(bloc("🛒 Courses",
    restants
      ? '<div class="ligne"><div class="ligne-corps"><b>' + restants + " article" + (restants > 1 ? "s" : "") +
      " à acheter</b><small>" + esc(etat.courses.filter((c) => !c.coche).slice(0, 4).map((c) => c.nom).join(", ")) +
      (restants > 4 ? "…" : "") + "</small></div></div>"
      : rienDu("✨", "La liste de courses est vide."),
    "Ouvrir", "aller", "courses"));

  /* Classement */
  const cl = classement();
  if (cl.length > 1) {
    h.push(bloc("🌟 Classement de la tribu",
      cl.map((x, i) =>
        '<div class="ligne"><span class="rang' + (i === 0 ? " or" : "") + '">' + (i + 1) + "</span>" +
        avatarDe(x.m) + '<div class="ligne-corps"><b>' + esc(x.m.prenom) + "</b></div>" +
        '<span class="etiquette or">' + x.pts + " pts</span></div>").join(""),
      "Boutique", "aller", "points"));
  }

  return h.join("");
};

/* ================================ TACHES ================================ */

function ligneTache(x, compact) {
  const t = x.t, et = x.et;
  const jeSuisAssigne = x.assigne === moi.id;
  const boutons = [];

  if (et.statut === "afaire") {
    if (jeSuisAssigne || estAdmin()) {
      boutons.push('<button class="btn mini principal" data-action="tache-fait" data-id="' + t.id + '">C\'est fait</button>');
    }
  } else if (et.statut === "fait") {
    if (estAdmin()) {
      boutons.push('<button class="btn mini danger" data-action="tache-refuser" data-id="' + t.id + '">✕</button>');
      boutons.push('<button class="btn mini principal" data-action="tache-valider" data-id="' + t.id + '">Valider</button>');
    } else if (et.parQui === moi.id) {
      boutons.push('<button class="btn mini" data-action="tache-annuler" data-id="' + t.id + '">Annuler</button>');
    }
  }

  let statutHtml = "";
  if (et.statut === "fait") statutHtml = '<span class="etiquette chaud">à valider</span>';
  else if (et.statut === "valide") statutHtml = '<span class="etiquette vert">✓ validée</span>';

  const qui = membre(x.assigne);
  const sous = compact
    ? "+" + t.points + " pts • " + libellePeriode(t.frequence)
    : (qui ? qui.prenom : "personne d'assigné") + " • +" + t.points + " pts";

  return '<div class="ligne' + (et.statut === "valide" ? " fait" : "") + '">' +
    (compact ? "" : avatarDe(qui)) +
    '<div class="ligne-corps"><b>' + esc((t.emoji || "🧹") + " " + t.nom) + "</b>" +
    "<small>" + esc(sous) + "</small>" +
    (statutHtml || (!compact ? etiquetteFrequence(t.frequence) : "")
      ? '<span class="etiquettes">' + statutHtml + (!compact ? etiquetteFrequence(t.frequence) : "") + "</span>"
      : "") +
    "</div>" +
    (estAdmin() && !compact
      ? '<button class="btn mini" data-action="tache-editer" data-id="' + t.id + '">✏️</button>' : "") +
    boutons.join("") + "</div>";
}

Vues.taches = function () {
  const h = [];
  h.push('<div class="puces" style="margin:.2rem 0 1rem">' +
    '<button class="puce ' + (ui.filtreTaches === "moi" ? "on" : "") + '" data-action="taches-filtre" data-valeur="moi">Les miennes</button>' +
    '<button class="puce ' + (ui.filtreTaches === "toutes" ? "on" : "") + '" data-action="taches-filtre" data-valeur="toutes">Toute la famille</button>' +
    "</div>");

  const toutes = tachesDuMoment();
  if (!toutes.length) {
    h.push(rienDu("🧹", estAdmin()
      ? "Aucune tâche pour l'instant.<br>Appuyez sur <b>+</b> pour en créer une."
      : "Aucune tâche pour l'instant."));
    return h.join("");
  }

  if (estAdmin()) {
    const av = tachesAValider();
    if (av.length) {
      h.push(bloc("✅ En attente de votre validation", av.map((x) => ligneTache(x, false)).join("")));
    }
  }

  const liste = ui.filtreTaches === "moi"
    ? toutes.filter((x) => x.assigne === moi.id)
    : toutes;

  if (!liste.length) {
    h.push(rienDu("🎉", "Aucune tâche ne vous est attribuée en ce moment."));
    return h.join("");
  }

  [["jour", "Chaque jour"], ["semaine", "Chaque semaine"], ["mois", "Chaque mois"]].forEach(([f, titre]) => {
    const g = liste.filter((x) => x.t.frequence === f);
    if (!g.length) return;
    const faites = g.filter((x) => x.et.statut === "valide").length;
    h.push('<div class="sous-titre"><h3>' + titre + "</h3><span class=\"etiquette\">" +
      faites + "/" + g.length + " ✓</span></div>");
    h.push('<div class="carte">' + g.map((x) => ligneTache(x, false)).join("") + "</div>");
  });

  return h.join("");
};

/* ================================ COURSES ================================ */

Vues.courses = function () {
  const h = [];
  h.push('<form id="form-course-rapide" style="display:flex;gap:.5rem;margin:.2rem 0 1rem">' +
    '<input type="text" id="champ-course" placeholder="Ajouter un article…" autocomplete="off">' +
    '<button class="btn principal" type="submit" style="flex-shrink:0">Ajouter</button></form>');

  const actifs = etat.courses.filter((c) => !c.coche);
  const coches = etat.courses.filter((c) => c.coche);

  if (!etat.courses.length) {
    h.push(rienDu("🛒", "La liste est vide.<br>Tapez un article ci-dessus, ou remplissez-la depuis l'onglet Menus."));
    return h.join("");
  }

  const parRayon = {};
  actifs.forEach((c) => { (parRayon[c.rayon] = parRayon[c.rayon] || []).push(c); });

  const ordre = RAYONS.concat(Object.keys(parRayon).filter((r) => !RAYONS.includes(r)));
  ordre.forEach((r) => {
    const l = parRayon[r];
    if (!l || !l.length) return;
    h.push('<div class="sous-titre"><h3>' + esc(r) + "</h3><span class=\"etiquette\">" + l.length + "</span></div>");
    h.push('<div class="carte">' + l.map(ligneCourse).join("") + "</div>");
  });

  if (coches.length) {
    h.push('<div class="sous-titre"><h3>Dans le panier</h3>' +
      '<button class="lien" data-action="courses-vider">Retirer les ' + coches.length + "</button></div>");
    h.push('<div class="carte">' + coches.map(ligneCourse).join("") + "</div>");
  }
  return h.join("");
};

function ligneCourse(c) {
  return '<div class="ligne' + (c.coche ? " fait" : "") + '">' +
    '<button class="coche' + (c.coche ? " on" : "") + '" data-action="course-toggle" data-id="' + c.id + '">✓</button>' +
    '<div class="ligne-corps"><b>' + esc(c.nom) + "</b>" +
    (c.qte ? "<small>" + esc(c.qte) + "</small>" : "") + "</div>" +
    '<button class="btn mini" data-action="course-suppr" data-id="' + c.id + '">🗑️</button></div>';
}

/* ================================ MENUS ================================ */

Vues.menus = function () {
  const h = [];
  const lundi = lundiDeCle(ui.semaine);
  const dim = new Date(lundi); dim.setDate(dim.getDate() + 6);
  const fmt = { day: "numeric", month: "short" };
  const estSemaineCourante = ui.semaine === cleSemaine(new Date());

  h.push('<div class="semaine-nav">' +
    '<button data-action="semaine-prec">‹</button>' +
    "<b>" + lundi.toLocaleDateString("fr-FR", fmt) + " – " + dim.toLocaleDateString("fr-FR", fmt) +
    (estSemaineCourante ? " • cette semaine" : "") + "</b>" +
    '<button data-action="semaine-suiv">›</button></div>');

  h.push('<div class="rangee-btn" style="margin-bottom:1rem">' +
    '<button class="btn principal" data-action="menus-generer">🎲 Générer</button>' +
    '<button class="btn doux" data-action="menus-courses">🛒 Aux courses</button>' +
    '<button class="btn" data-action="aller" data-vue="recettes">📖 Recettes</button></div>');

  const sem = etat.repas[ui.semaine] || {};
  const aujIso = isoDate(new Date());

  JOURS.forEach((j, i) => {
    const d = new Date(lundi); d.setDate(d.getDate() + i);
    const cest = isoDate(d) === aujIso;
    h.push('<div class="jour-repas' + (cest ? " aujourdhui" : "") + '">' +
      '<div class="entete"><b>' + j + "</b><small>" + d.toLocaleDateString("fr-FR", fmt) + "</small></div>" +
      caseRepas(j, "midi", sem[j + "-midi"]) +
      caseRepas(j, "soir", sem[j + "-soir"]) + "</div>");
  });

  return h.join("");
};

function caseRepas(jour, moment, contenu) {
  let texte = "à définir", libre = true, emoji = "＋";
  if (contenu) {
    if (contenu.recetteId) {
      const r = etat.recettes.find((x) => x.id === contenu.recetteId);
      if (r) { texte = r.nom; libre = false; emoji = r.emoji || "🍽️"; }
    } else if (contenu.texte) {
      texte = contenu.texte; libre = false; emoji = "📝";
    }
  }
  return '<button class="case-repas" data-action="repas-case" data-jour="' + jour + '" data-moment="' + moment + '">' +
    '<span class="quand">' + (moment === "midi" ? "Midi" : "Soir") + "</span>" +
    "<span>" + emoji + "</span>" +
    '<span class="plat' + (libre ? " libre" : "") + '">' + esc(texte) + "</span></button>";
}

/* ================================ RECETTES ================================ */

Vues.recettes = function () {
  const h = [];
  h.push('<button class="lien" data-action="aller" data-vue="menus" style="margin-bottom:.8rem">‹ Retour aux menus</button>');
  h.push('<input type="text" id="champ-recherche-recette" placeholder="Rechercher un plat…" ' +
    'value="' + esc(ui.rechercheRecette) + '" autocomplete="off" style="margin-bottom:1rem">');

  const q = ui.rechercheRecette.toLowerCase().trim();
  const liste = etat.recettes
    .filter((r) => !q || r.nom.toLowerCase().includes(q) ||
      (r.ingredients || []).some((i) => i.nom.toLowerCase().includes(q)))
    .sort((a, b) => a.nom.localeCompare(b.nom));

  if (!liste.length) {
    h.push(rienDu("📖", q ? "Aucun plat ne correspond." : "Aucune recette.<br>Appuyez sur <b>+</b> pour en ajouter une."));
    return h.join("");
  }

  h.push('<div class="sous-titre"><h3>' + liste.length + " plat" + (liste.length > 1 ? "s" : "") + "</h3></div>");
  h.push('<div class="carte">' + liste.map((r) =>
    '<div class="ligne"><span style="font-size:1.4rem">' + esc(r.emoji || "🍽️") + "</span>" +
    '<div class="ligne-corps"><b>' + esc(r.nom) + "</b><small>" +
    (r.ingredients || []).length + " ingrédients</small>" +
    '<span class="etiquettes">' +
    (r.vegetarien ? '<span class="etiquette vert">végé</span>' : "") +
    (r.rapide ? '<span class="etiquette">rapide</span>' : "") +
    (r.type === "leger" ? '<span class="etiquette">léger</span>' : "") +
    (r.lien ? '<span class="etiquette chaud">lien</span>' : "") +
    "</span></div>" +
    '<button class="btn mini" data-action="recette-editer" data-id="' + r.id + '">✏️</button></div>').join("") +
    "</div>");
  return h.join("");
};

/* ================================ RAPPELS ================================ */

function ligneNote(n) {
  const auj = isoDate(new Date());
  let badge = "";
  if (n.fait) badge = '<span class="etiquette vert">fait</span>';
  else if (n.date) {
    const dj = joursEntre(auj, n.date);
    if (dj < 0) badge = '<span class="etiquette rouge">en retard</span>';
    else if (dj === 0) badge = '<span class="etiquette chaud">aujourd\'hui</span>';
    else if (dj === 1) badge = '<span class="etiquette chaud">demain</span>';
    else if (dj <= 7) badge = '<span class="etiquette">dans ' + dj + " jours</span>";
  }
  const qui = (n.concernes || []).map((i) => membre(i)).filter(Boolean);
  const sous = [
    n.date ? dateJolie(n.date, true) + (n.heure ? " à " + n.heure : "") : "sans date",
    qui.length ? qui.map((m) => m.prenom).join(", ") : "toute la famille"
  ].join(" • ");

  return '<div class="ligne' + (n.fait ? " fait" : "") + '">' +
    '<button class="coche' + (n.fait ? " on" : "") + '" data-action="note-toggle" data-id="' + n.id + '">✓</button>' +
    '<div class="ligne-corps"><b>' + esc(n.titre) + "</b><small>" + esc(sous) + "</small>" +
    (badge || n.note ? '<span class="etiquettes">' + badge +
      (n.repetition && n.repetition !== "aucune" ? '<span class="etiquette">↻</span>' : "") + "</span>" : "") +
    "</div>" +
    '<button class="btn mini" data-action="note-editer" data-id="' + n.id + '">✏️</button></div>';
}

Vues.notes = function () {
  const h = [];
  h.push('<div class="puces" style="margin:.2rem 0 1rem">' +
    '<button class="puce ' + (ui.filtreNotes === "avenir" ? "on" : "") + '" data-action="notes-filtre" data-valeur="avenir">À venir</button>' +
    '<button class="puce ' + (ui.filtreNotes === "faits" ? "on" : "") + '" data-action="notes-filtre" data-valeur="faits">Terminés</button>' +
    "</div>");

  const liste = ui.filtreNotes === "avenir"
    ? notesTriees().filter((n) => !n.fait)
    : notesTriees().filter((n) => n.fait).reverse();

  if (!liste.length) {
    h.push(rienDu("🔔", ui.filtreNotes === "avenir"
      ? "Aucun rappel.<br>Appuyez sur <b>+</b> pour noter un rendez-vous."
      : "Rien de terminé pour l'instant."));
    return h.join("");
  }
  h.push('<div class="carte">' + liste.map(ligneNote).join("") + "</div>");
  return h.join("");
};

/* ================================ POINTS & CADEAUX ================================ */

Vues.points = function () {
  const h = [];
  const mesPts = pointsDe(moi.id);
  const dispo = etat.cadeaux.filter((c) => c.actif !== false).sort((a, b) => a.cout - b.cout);
  const prochain = dispo.find((c) => c.cout > mesPts);

  h.push('<div class="carte" style="text-align:center">' +
    '<div style="font-size:2.4rem;font-family:var(--font-display);line-height:1">' + mesPts + "</div>" +
    '<div class="aide" style="margin-top:.1rem">points disponibles</div>' +
    (prochain
      ? '<div style="margin-top:.9rem"><div class="barre-progression"><i style="width:' +
      Math.min(100, Math.round(mesPts / prochain.cout * 100)) + '%"></i></div>' +
      '<div class="aide" style="margin-top:.4rem">Encore ' + (prochain.cout - mesPts) +
      " points pour « " + esc(prochain.nom) + " »</div></div>"
      : "") +
    '<button class="lien" data-action="points-historique" style="margin-top:.9rem">Voir mon historique</button>' +
    "</div>");

  /* Demandes a traiter */
  if (estAdmin()) {
    const dem = echangesEnAttente();
    if (dem.length) {
      h.push(bloc("🎁 Demandes à traiter", dem.map((e) =>
        '<div class="ligne">' + avatarDe(membre(e.membreId)) +
        '<div class="ligne-corps"><b>' + esc((e.cadeauEmoji || "🎁") + " " + e.cadeauNom) + "</b><small>" +
        esc(nomDe(e.membreId)) + " • " + e.cout + " pts</small></div>" +
        '<button class="btn mini danger" data-action="echange-refuser" data-id="' + e.id + '">✕</button>' +
        '<button class="btn mini principal" data-action="echange-accorder" data-id="' + e.id + '">Accorder</button>' +
        "</div>").join("")));
    }
  }

  /* Mes demandes */
  const miennes = etat.echanges.filter((e) => e.membreId === moi.id).slice(0, 5);
  if (miennes.length) {
    h.push(bloc("📬 Mes demandes", miennes.map((e) =>
      '<div class="ligne"><div class="ligne-corps"><b>' + esc((e.cadeauEmoji || "🎁") + " " + e.cadeauNom) +
      "</b><small>" + e.cout + " pts</small></div>" +
      '<span class="etiquette ' + (e.statut === "accorde" ? "vert" : e.statut === "refuse" ? "rouge" : "chaud") + '">' +
      (e.statut === "accorde" ? "accordé" : e.statut === "refuse" ? "refusé" : "en attente") +
      "</span></div>").join("")));
  }

  /* Boutique */
  h.push('<div class="sous-titre"><h3>La boutique</h3>' +
    (estAdmin() ? '<button class="lien" data-action="cadeau-nouveau">Ajouter</button>' : "") + "</div>");
  if (!dispo.length) {
    h.push(rienDu("🎁", estAdmin()
      ? "Aucun cadeau.<br>Appuyez sur <b>+</b> pour créer la première récompense."
      : "Aucun cadeau proposé pour l'instant."));
  } else {
    h.push('<div class="grille-cadeaux">' + dispo.map((c) => {
      const assez = mesPts >= c.cout;
      return '<div class="cadeau"><span class="em">' + esc(c.emoji || "🎁") + "</span>" +
        "<b>" + esc(c.nom) + "</b>" +
        '<span class="etiquette or">' + c.cout + " pts</span>" +
        (estAdmin() ? '<button class="btn mini" data-action="cadeau-editer" data-id="' + c.id + '">Modifier</button>' : "") +
        '<button class="btn mini ' + (assez ? "principal" : "") + '" data-action="cadeau-demander" data-id="' + c.id + '"' +
        (assez ? "" : " disabled") + ">" + (assez ? "Échanger" : "Trop cher") + "</button></div>";
    }).join("") + "</div>");
  }

  /* Classement */
  h.push('<div class="sous-titre"><h3>Classement</h3></div>');
  h.push('<div class="carte">' + classement().map((x, i) =>
    '<div class="ligne"><span class="rang' + (i === 0 ? " or" : "") + '">' + (i + 1) + "</span>" +
    avatarDe(x.m) + '<div class="ligne-corps"><b>' + esc(x.m.prenom) + "</b></div>" +
    '<span class="etiquette or">' + x.pts + " pts</span>" +
    (estAdmin() ? '<button class="btn mini" data-action="points-ajuster" data-id="' + x.m.id + '">±</button>' : "") +
    "</div>").join("") + "</div>");

  return h.join("");
};

/* ================================ ADMINISTRATION ================================ */

Vues.admin = function () {
  const h = [];
  h.push('<button class="lien" data-action="aller" data-vue="accueil" style="margin-bottom:.8rem">‹ Retour</button>');

  if (!estAdmin()) {
    h.push(rienDu("🔒", "Seuls les administrateurs peuvent modifier les réglages de la famille."));
    return h.join("");
  }

  h.push(bloc("👨‍👩‍👧 Membres de la famille",
    etat.membres.map((m) =>
      '<div class="ligne">' + avatarDe(m) +
      '<div class="ligne-corps"><b>' + esc(m.prenom) + "</b><small>" +
      (m.role === "admin" ? "Administrateur" : "Membre") + " • " + pointsDe(m.id) + " pts</small></div>" +
      '<button class="btn mini" data-action="membre-editer" data-id="' + m.id + '">✏️</button></div>').join(""),
    "Ajouter", "membre-nouveau"));

  h.push(bloc("🔑 Code de la famille",
    '<div class="code-famille">' + esc(etat.famille.code) + "</div>" +
    '<p class="aide">Donnez ce code aux membres de la famille : il leur permet de rejoindre ' +
    "la tribu depuis leur téléphone. Gardez-le pour vous.</p>" +
    '<button class="btn plein doux" data-action="copier-code" style="margin-top:.6rem">Copier le code</button>'));

  h.push(bloc("🧹 Tâches (" + etat.taches.length + ")",
    etat.taches.length
      ? etat.taches.map((t) =>
        '<div class="ligne"><span style="font-size:1.2rem">' + esc(t.emoji || "🧹") + "</span>" +
        '<div class="ligne-corps"><b>' + esc(t.nom) + "</b><small>" +
        (t.frequence === "jour" ? "chaque jour" : t.frequence === "mois" ? "chaque mois" : "chaque semaine") +
        " • " + t.points + " pts • " + participantsValides(t).length + " participant(s)" +
        (t.actif === false ? " • en pause" : "") + "</small></div>" +
        '<button class="btn mini" data-action="tache-editer" data-id="' + t.id + '">✏️</button></div>').join("")
      : rienDu("🧹", "Aucune tâche."),
    "Ajouter", "tache-nouvelle"));

  h.push(bloc("🎁 Cadeaux (" + etat.cadeaux.length + ")",
    etat.cadeaux.length
      ? etat.cadeaux.map((c) =>
        '<div class="ligne"><span style="font-size:1.2rem">' + esc(c.emoji || "🎁") + "</span>" +
        '<div class="ligne-corps"><b>' + esc(c.nom) + "</b><small>" + c.cout + " pts" +
        (c.actif === false ? " • retiré" : "") + "</small></div>" +
        '<button class="btn mini" data-action="cadeau-editer" data-id="' + c.id + '">✏️</button></div>').join("")
      : rienDu("🎁", "Aucun cadeau."),
    "Ajouter", "cadeau-nouveau"));

  h.push(bloc("📖 Recettes (" + etat.recettes.length + ")",
    '<p class="aide">La bibliothèque de plats sert au générateur de menus.</p>' +
    '<button class="btn plein doux" data-action="aller" data-vue="recettes" style="margin-top:.6rem">Gérer les recettes</button>'));

  return h.join("");
};

/* =========================================================================
   ECRANS DE CONNEXION
   ========================================================================= */

const Connexion = {
  brouillon: {},

  aller(etape, donnees) {
    const el = document.getElementById("ecran-connexion");
    el.innerHTML = this[etape](donnees);
    window.scrollTo({ top: 0 });
    this.brancher(etape, donnees);
  },

  entete(sousTitre) {
    return '<div class="logo-tribu">🏡</div><h1>Tribu</h1>' +
      '<p class="intro">' + sousTitre + "</p>";
  },

  /* --- 1. Accueil --- */
  accueil() {
    const local = Store.mode === "local"
      ? '<div class="bandeau" style="margin-top:1.4rem">⚠️<div>Le partage familial n\'est pas encore configuré : ' +
      "l'application fonctionnera <b>uniquement sur cet appareil</b>. Voir le guide <b>GUIDE-FIREBASE.md</b>.</div></div>"
      : "";
    return this.entete("L'organisation de la maison, à partager en famille.") +
      '<button class="btn principal plein" id="b-creer" style="margin-bottom:.6rem">Créer ma famille</button>' +
      '<button class="btn plein" id="b-rejoindre">Rejoindre une famille</button>' + local;
  },

  /* --- 2. Creation --- */
  creer() {
    const suggere = "MAISON-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    return this.entete("Créons votre tribu. Vous en serez l'administrateur.") +
      '<form id="f-creer">' +
      '<label class="champ"><span>Nom de la famille</span>' +
      '<input type="text" name="nomFamille" placeholder="Famille Martin" required maxlength="40"></label>' +
      '<label class="champ"><span>Code secret de la famille</span>' +
      '<input type="text" name="code" value="' + suggere + '" required maxlength="24"></label>' +
      '<p class="aide" style="margin-top:-.4rem;margin-bottom:1rem">Ce code sert aux autres membres pour vous rejoindre. ' +
      "Choisissez-en un facile à retenir mais pas devinable.</p>" +
      "<hr class=\"sep\">" +
      '<label class="champ"><span>Votre prénom</span>' +
      '<input type="text" name="prenom" placeholder="Amandine" required maxlength="20"></label>' +
      '<label class="champ"><span>Votre avatar</span></label>' +
      '<div class="puces" id="choix-emoji" style="margin:-.5rem 0 1rem">' +
      EMOJIS_MEMBRES.map((e, i) => '<button type="button" class="puce ' + (i === 0 ? "on" : "") +
        '" data-emoji="' + e + '">' + e + "</button>").join("") + "</div>" +
      '<label class="champ"><span>Votre code à 4 chiffres</span>' +
      '<input type="tel" name="pin" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" placeholder="1234" required></label>' +
      '<button class="btn principal plein" type="submit" style="margin-top:.4rem">Créer la famille</button>' +
      '<button class="lien" type="button" id="b-retour" style="display:block;margin:1rem auto 0">Retour</button>' +
      "</form>";
  },

  /* --- 3. Rejoindre --- */
  rejoindre() {
    return this.entete("Entrez le code que vous a donné l'administrateur de la famille.") +
      '<form id="f-rejoindre">' +
      '<label class="champ"><span>Code de la famille</span>' +
      '<input type="text" name="code" placeholder="MAISON-AB12" required autocapitalize="characters"></label>' +
      '<button class="btn principal plein" type="submit">Continuer</button>' +
      '<button class="lien" type="button" id="b-retour" style="display:block;margin:1rem auto 0">Retour</button>' +
      "</form>";
  },

  /* --- 4. Choix du profil --- */
  profils(d) {
    const membres = d.donnees.membres || [];
    return this.entete("Bienvenue chez <b>" + esc(d.donnees.famille.nom) + "</b>.<br>Qui êtes-vous ?") +
      '<div class="grille-profils">' + membres.map((m) =>
        '<button class="profil-carte" data-membre="' + m.id + '">' +
        '<span class="em">' + esc(m.emoji || "🙂") + "</span><b>" + esc(m.prenom) + "</b>" +
        "<small>" + (m.role === "admin" ? "admin" : "membre") + "</small></button>").join("") + "</div>" +
      '<button class="btn plein doux" id="b-nouveau-profil" style="margin-top:1.2rem">Je ne suis pas dans la liste</button>' +
      '<button class="lien" type="button" id="b-retour" style="display:block;margin:1rem auto 0">Retour</button>';
  },

  /* --- 5. Nouveau profil --- */
  nouveauProfil(d) {
    return this.entete("Créons votre profil dans <b>" + esc(d.donnees.famille.nom) + "</b>.") +
      '<form id="f-profil">' +
      '<label class="champ"><span>Votre prénom</span>' +
      '<input type="text" name="prenom" required maxlength="20"></label>' +
      '<label class="champ"><span>Votre avatar</span></label>' +
      '<div class="puces" id="choix-emoji" style="margin:-.5rem 0 1rem">' +
      EMOJIS_MEMBRES.map((e, i) => '<button type="button" class="puce ' + (i === 0 ? "on" : "") +
        '" data-emoji="' + e + '">' + e + "</button>").join("") + "</div>" +
      '<label class="champ"><span>Votre code à 4 chiffres</span>' +
      '<input type="tel" name="pin" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required></label>' +
      '<button class="btn principal plein" type="submit">Rejoindre la famille</button>' +
      '<button class="lien" type="button" id="b-retour" style="display:block;margin:1rem auto 0">Retour</button>' +
      "</form>";
  },

  /* --- 6. Code PIN --- */
  pin(d) {
    return this.entete("Bonjour <b>" + esc(d.membre.prenom) + "</b> " + esc(d.membre.emoji || "") +
      "<br>Entrez votre code à 4 chiffres.") +
      '<div class="pin-points" id="pin-points">' +
      "0123".split("").map(() => '<span class="pin-point"></span>').join("") + "</div>" +
      '<div class="clavier" id="clavier">' +
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => "<button data-n=\"" + n + '">' + n + "</button>").join("") +
      '<button class="vide"></button><button data-n="0">0</button><button data-n="eff">⌫</button></div>' +
      '<button class="lien" type="button" id="b-retour" style="display:block;margin:1.6rem auto 0">Changer de profil</button>';
  },

  /* --- branchements --- */
  brancher(etape, d) {
    const el = document.getElementById("ecran-connexion");
    const retour = el.querySelector("#b-retour");
    if (retour) retour.onclick = () => {
      if (etape === "pin") this.aller("profils", d);
      else if (etape === "nouveauProfil") this.aller("profils", d);
      else this.aller("accueil");
    };

    if (etape === "accueil") {
      el.querySelector("#b-creer").onclick = () => this.aller("creer");
      el.querySelector("#b-rejoindre").onclick = () => this.aller("rejoindre");
    }

    const grilleEmoji = el.querySelector("#choix-emoji");
    if (grilleEmoji) {
      grilleEmoji.onclick = (ev) => {
        const b = ev.target.closest("[data-emoji]");
        if (!b) return;
        grilleEmoji.querySelectorAll(".puce").forEach((p) => p.classList.remove("on"));
        b.classList.add("on");
      };
    }
    const emojiChoisi = () => {
      const on = grilleEmoji && grilleEmoji.querySelector(".puce.on");
      return on ? on.dataset.emoji : "🙂";
    };

    if (etape === "creer") {
      el.querySelector("#f-creer").onsubmit = async (ev) => {
        ev.preventDefault();
        const f = new FormData(ev.target);
        const code = String(f.get("code")).trim().toUpperCase();
        const pin = String(f.get("pin")).trim();
        if (!/^[0-9]{4}$/.test(pin)) { toast("Le code doit faire 4 chiffres"); return; }
        const deja = await Store.charger(code);
        if (deja) { toast("Ce code est déjà utilisé, changez-le"); return; }

        const moiId = id();
        const donnees = etatVide();
        donnees.famille = { nom: String(f.get("nomFamille")).trim(), code: code, creeLe: new Date().toISOString() };
        donnees.membres = [{
          id: moiId, prenom: String(f.get("prenom")).trim(), emoji: emojiChoisi(),
          pin: pin, role: "admin", creeLe: new Date().toISOString()
        }];
        donnees.recettes = (window.RECETTES_DEPART || []).map((r) => Object.assign({ id: id() }, r));
        donnees.taches = tachesDeDepart(moiId);
        donnees.cadeaux = cadeauxDeDepart();
        await Store.creer(code, donnees);
        await entrerDansFamille(code, moiId);
        toast("Bienvenue dans votre tribu 🏡");
      };
    }

    if (etape === "rejoindre") {
      el.querySelector("#f-rejoindre").onsubmit = async (ev) => {
        ev.preventDefault();
        const code = String(new FormData(ev.target).get("code")).trim().toUpperCase();
        const donnees = await Store.charger(code);
        if (!donnees) { toast("Aucune famille avec ce code"); return; }
        this.aller("profils", { code: code, donnees: donnees });
      };
    }

    if (etape === "profils") {
      el.querySelectorAll("[data-membre]").forEach((b) => {
        b.onclick = () => {
          const m = d.donnees.membres.find((x) => x.id === b.dataset.membre);
          this.aller("pin", { code: d.code, donnees: d.donnees, membre: m });
        };
      });
      el.querySelector("#b-nouveau-profil").onclick = () => this.aller("nouveauProfil", d);
    }

    if (etape === "nouveauProfil") {
      el.querySelector("#f-profil").onsubmit = async (ev) => {
        ev.preventDefault();
        const f = new FormData(ev.target);
        const pin = String(f.get("pin")).trim();
        if (!/^[0-9]{4}$/.test(pin)) { toast("Le code doit faire 4 chiffres"); return; }
        const frais = await Store.charger(d.code);      // on relit pour ne rien ecraser
        const nouveau = {
          id: id(), prenom: String(f.get("prenom")).trim(), emoji: emojiChoisi(),
          pin: pin, role: "membre", creeLe: new Date().toISOString()
        };
        appliquerDonnees(frais);
        etat.membres.push(nouveau);
        Store.code = d.code;
        await Store.ecrire(["membres"]);
        await entrerDansFamille(d.code, nouveau.id);
        toast("Bienvenue " + nouveau.prenom + " 👋");
      };
    }

    if (etape === "pin") {
      let saisie = "";
      const points = el.querySelectorAll("#pin-points .pin-point");
      const maj = () => points.forEach((p, i) => p.classList.toggle("on", i < saisie.length));
      el.querySelector("#clavier").onclick = async (ev) => {
        const b = ev.target.closest("[data-n]");
        if (!b) return;
        if (b.dataset.n === "eff") { saisie = saisie.slice(0, -1); maj(); return; }
        if (saisie.length >= 4) return;
        saisie += b.dataset.n;
        maj();
        if (saisie.length === 4) {
          if (saisie === d.membre.pin) {
            await entrerDansFamille(d.code, d.membre.id);
          } else {
            toast("Code incorrect");
            saisie = ""; maj();
          }
        }
      };
    }
  }
};

/* --- contenus proposes au premier lancement --- */
function tachesDeDepart(moiId) {
  const base = [
    ["Vider le lave-vaisselle", "🍽️", "jour", 5],
    ["Sortir les poubelles", "🗑️", "semaine", 10],
    ["Passer l'aspirateur", "🧹", "semaine", 15],
    ["Nettoyer la salle de bain", "🚿", "semaine", 20],
    ["Étendre le linge", "🧺", "semaine", 10],
    ["Faire les courses", "🛒", "semaine", 15],
    ["Nettoyer les vitres", "🪟", "mois", 25],
    ["Grand ménage du frigo", "🧴", "mois", 20]
  ];
  return base.map(([nom, emoji, freq, pts]) => ({
    id: id(), nom: nom, emoji: emoji, frequence: freq, points: pts,
    participants: [moiId], rotation: true, decalage: 0, actif: true,
    creeLe: new Date().toISOString()
  }));
}
function cadeauxDeDepart() {
  const base = [
    ["Choisir le film du soir", "🎬", 40],
    ["Un dessert au choix", "🍦", 50],
    ["Soirée pizza", "🍕", 80],
    ["30 min d'écran en plus", "🎮", 60],
    ["Sortie au parc / piscine", "🏊", 150],
    ["Petit cadeau surprise", "🎁", 300]
  ];
  return base.map(([nom, emoji, cout]) => ({
    id: id(), nom: nom, emoji: emoji, cout: cout, actif: true
  }));
}
