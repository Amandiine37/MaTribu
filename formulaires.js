/* =========================================================================
   TRIBU — formulaires (les fenetres qui remontent du bas de l'ecran)
   ========================================================================= */

const Formulaires = {};

/* ---------- petits aides de formulaire ---------- */

function grilleEmojis(liste, choisi) {
  return '<div class="puces grille-emojis" data-role="emojis">' +
    liste.map((e) => '<button type="button" class="puce ' + (e === choisi ? "on" : "") +
      '" data-emoji="' + e + '">' + e + "</button>").join("") + "</div>";
}
function brancherEmojis(f) {
  const g = f.querySelector('[data-role="emojis"]');
  if (!g) return;
  g.onclick = (ev) => {
    const b = ev.target.closest("[data-emoji]");
    if (!b) return;
    g.querySelectorAll(".puce").forEach((p) => p.classList.remove("on"));
    b.classList.add("on");
  };
}
function emojiChoisi(f, defaut) {
  const on = f.querySelector('[data-role="emojis"] .puce.on');
  return on ? on.dataset.emoji : defaut;
}
function puceMultiple(role, options, choisis) {
  return '<div class="puces" data-role="' + role + '" style="margin-bottom:1rem">' +
    options.map((o) => '<button type="button" class="puce ' + (choisis.includes(o.val) ? "on" : "") +
      '" data-val="' + esc(o.val) + '">' + o.html + "</button>").join("") + "</div>";
}
function brancherMulti(f, role, unique) {
  const g = f.querySelector('[data-role="' + role + '"]');
  if (!g) return;
  g.onclick = (ev) => {
    const b = ev.target.closest("[data-val]");
    if (!b) return;
    if (unique) g.querySelectorAll(".puce").forEach((p) => p.classList.remove("on"));
    b.classList.toggle("on", unique ? true : !b.classList.contains("on"));
  };
}
function valeursMulti(f, role) {
  return Array.from(f.querySelectorAll('[data-role="' + role + '"] .puce.on')).map((b) => b.dataset.val);
}
function selectRayon(valeur) {
  return '<select name="rayon">' + RAYONS.map((r) =>
    '<option value="' + esc(r) + '"' + (r === valeur ? " selected" : "") + ">" + esc(r) + "</option>").join("") + "</select>";
}
function selectUnite(valeur, nom) {
  return '<select name="' + (nom || "unite") + '">' + UNITES.map((u) =>
    '<option value="' + esc(u) + '"' + (u === (valeur || "") ? " selected" : "") + ">" +
    (u || "— sans —") + "</option>").join("") + "</select>";
}
function boutonsFormulaire(labelOk, avecSuppression) {
  return '<div class="rangee-btn" style="margin-top:1.2rem">' +
    (avecSuppression ? '<button type="button" class="btn danger" data-role="suppr">Supprimer</button>' : "") +
    '<button type="button" class="btn" data-action="fermer">Annuler</button>' +
    '<button type="submit" class="btn principal">' + esc(labelOk) + "</button></div>";
}

/* ================================ TACHE ================================ */

Formulaires.tache = function (tid) {
  if (!estAdmin()) return;
  const t = tid ? etat.taches.find((x) => x.id === tid) : null;
  const cour = t || { emoji: "🧹", frequence: "semaine", points: 10, participants: [], rotation: true, actif: true };
  const assigne = t ? membre(assigneDe(t, new Date())) : null;

  const html = "<form id=\"f-tache\">" +
    '<label class="champ"><span>Nom de la tâche</span>' +
    '<input type="text" name="nom" value="' + esc(cour.nom || "") + '" required maxlength="40" placeholder="Passer l\'aspirateur"></label>' +
    '<label class="champ"><span>Icône</span></label>' + grilleEmojis(EMOJIS_TACHES, cour.emoji) +
    '<label class="champ"><span>À refaire</span></label>' +
    puceMultiple("freq", [
      { val: "jour", html: "Chaque jour" },
      { val: "semaine", html: "Chaque semaine" },
      { val: "mois", html: "Chaque mois" }], [cour.frequence]) +
    '<label class="champ"><span>Points gagnés</span>' +
    '<input type="number" name="points" value="' + (cour.points || 10) + '" min="0" max="500" required></label>' +
    '<label class="champ"><span>Qui peut s\'en occuper</span></label>' +
    (etat.membres.length
      ? puceMultiple("part", etat.membres.map((m) => ({ val: m.id, html: esc(m.emoji + " " + m.prenom) })),
        cour.participants || [])
      : '<p class="aide">Ajoutez d\'abord des membres.</p>') +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:flex-start">' +
    '<input type="checkbox" name="rotation" style="width:auto;margin-top:.2rem"' + (cour.rotation !== false ? " checked" : "") + ">" +
    "<span style=\"margin:0\">Chacun son tour<br><small style=\"font-weight:400\">La personne assignée change automatiquement à chaque " +
    "période. Si décoché, c'est toujours la première personne sélectionnée.</small></span></label>" +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:center">' +
    '<input type="checkbox" name="pause" style="width:auto"' + (cour.actif === false ? " checked" : "") + ">" +
    '<span style="margin:0">Mettre en pause</span></label>' +
    (t && assigne
      ? '<div class="bandeau info">👤<div>Actuellement : <b>' + esc(assigne.prenom) + "</b> " +
      libellePeriode(t.frequence) + '. <button type="button" class="lien" data-role="tourner">Passer au suivant</button></div></div>'
      : "") +
    boutonsFormulaire(t ? "Enregistrer" : "Créer la tâche", !!t) +
    "</form>";

  ouvrirFeuille(t ? "Modifier la tâche" : "Nouvelle tâche", html, (f) => {
    brancherEmojis(f);
    brancherMulti(f, "freq", true);
    brancherMulti(f, "part", false);

    const bt = f.querySelector('[data-role="tourner"]');
    if (bt) bt.onclick = () => {
      t.decalage = (t.decalage || 0) + 1;
      sauver("taches");
      fermerFeuille();
      const n = membre(assigneDe(t, new Date()));
      toast(n ? "C'est au tour de " + n.prenom : "Rotation effectuée");
    };

    const bs = f.querySelector('[data-role="suppr"]');
    if (bs) bs.onclick = async () => {
      const ok = await confirmer("Supprimer définitivement la tâche « " + t.nom + " » ?",
        { titre: "Supprimer", ok: "Supprimer", danger: true });
      if (!ok) return;
      etat.taches = etat.taches.filter((x) => x.id !== t.id);
      fermerFeuille();
      sauver("taches");
      toast("Tâche supprimée");
    };

    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);   // ev.target = le <form>, pas la feuille
      const freq = valeursMulti(f, "freq")[0] || "semaine";
      const part = valeursMulti(f, "part");
      if (!part.length) { toast("Choisissez au moins une personne"); return; }

      if (t) {
        t.nom = String(d.get("nom")).trim();
        t.emoji = emojiChoisi(f, "🧹");
        if (t.frequence !== freq) { t.frequence = freq; t.decalage = 0; }
        t.points = Number(d.get("points")) || 0;
        t.participants = part;
        t.rotation = !!d.get("rotation");
        t.actif = !d.get("pause");
      } else {
        const nouvelle = {
          id: id(), nom: String(d.get("nom")).trim(), emoji: emojiChoisi(f, "🧹"),
          frequence: freq, points: Number(d.get("points")) || 0,
          participants: part, rotation: !!d.get("rotation"),
          decalage: 0, actif: !d.get("pause"), creeLe: new Date().toISOString()
        };
        // on cale la rotation pour que la 1re personne choisie commence maintenant
        const n = part.length;
        nouvelle.decalage = ((-indexPeriode(freq, new Date()) % n) + n) % n;
        etat.taches.push(nouvelle);
      }
      fermerFeuille();
      sauver("taches");
      toast(t ? "Tâche enregistrée" : "Tâche créée");
    };
  });
};

/* ================================ COURSE ================================ */

Formulaires.course = function (cid) {
  const c = cid ? etat.courses.find((x) => x.id === cid) : null;
  const cour = c || { nom: "", qte: "", unite: "", rayon: "Épicerie", vrac: false };

  const html = '<form id="f-course">' +
    '<label class="champ"><span>Article</span>' +
    '<input type="text" name="nom" value="' + esc(cour.nom) + '" required maxlength="40" placeholder="Lait"></label>' +
    '<div class="duo"><label class="champ"><span>Quantité</span>' +
    '<input type="text" name="qte" value="' + esc(cour.qte) + '" maxlength="10" inputmode="decimal" placeholder="2"></label>' +
    '<label class="champ"><span>Unité</span>' + selectUnite(cour.unite) + "</label></div>" +
    '<label class="champ"><span>Rayon</span>' + selectRayon(cour.rayon) + "</label>" +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:center">' +
    '<input type="checkbox" name="vrac" style="width:auto"' + (cour.vrac ? " checked" : "") + ">" +
    '<span style="margin:0">🫙 En vrac (prévoir un contenant)</span></label>' +
    boutonsFormulaire(c ? "Enregistrer" : "Ajouter", !!c) + "</form>";

  ouvrirFeuille(c ? "Modifier l'article" : "Ajouter aux courses", html, (f) => {
    if (!c) f.querySelector('[name="nom"]').focus();
    const bs = f.querySelector('[data-role="suppr"]');
    if (bs) bs.onclick = () => { fermerFeuille(); Actions.supprimerCourse(c.id); };
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);   // ev.target = le <form>, pas la feuille
      fermerFeuille();
      if (c) {
        c.nom = String(d.get("nom")).trim();
        c.qte = String(d.get("qte")).trim();
        c.unite = String(d.get("unite"));
        c.rayon = String(d.get("rayon"));
        c.vrac = !!d.get("vrac");
        sauver("courses");
        toast("Article modifié");
      } else {
        Actions.ajouterCourse(String(d.get("nom")), String(d.get("rayon")),
          String(d.get("qte")), String(d.get("unite")), { vrac: !!d.get("vrac") });
      }
    };
  });
};

/* ============================ LISTES DE COURSES ============================ */

Formulaires.liste = function (lid) {
  const l = lid ? listesCourses().find((x) => x.id === lid) : null;
  const cour = l || { nom: "", emoji: "🛒", type: "semaine", magasin: "" };
  const implicite = l && !etat.listesCourses.length;

  const html = '<form id="f-liste">' +
    '<label class="champ"><span>Nom de la liste</span>' +
    '<input type="text" name="nom" value="' + esc(cour.nom) + '" required maxlength="30" ' +
    'placeholder="Courses de la semaine"></label>' +
    '<label class="champ"><span>Icône</span></label>' +
    grilleEmojis(EMOJIS_LISTES, cour.emoji) +
    '<label class="champ"><span>Rythme</span></label>' +
    puceMultiple("type", TYPES_LISTE.map((t) => ({ val: t.val, html: t.emoji + " " + t.nom })),
      [cour.type]) +
    '<p class="aide" style="margin:-.5rem 0 1rem">Une liste <b>mensuelle</b> se remplit au fil ' +
    "de l'eau sans rien réclamer : elle ne compte pas dans les rappels de l'accueil.</p>" +
    '<label class="champ"><span>Magasin (facultatif)</span>' +
    '<input type="text" name="magasin" value="' + esc(cour.magasin || "") + '" maxlength="30" ' +
    'placeholder="Leclerc, marché, biocoop…"></label>' +
    boutonsFormulaire(l ? "Enregistrer" : "Créer la liste",
      !!l && !implicite && listesCourses().length > 1) + "</form>";

  ouvrirFeuille(l ? "Modifier la liste" : "Nouvelle liste de courses", html, (f) => {
    brancherEmojis(f);
    brancherMulti(f, "type", true);
    if (!l) f.querySelector('[name="nom"]').focus();

    const bs = f.querySelector('[data-role="suppr"]');
    if (bs) bs.onclick = () => { fermerFeuille(); Actions.supprimerListe(l.id); };

    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);
      const donnees = {
        nom: String(d.get("nom")).trim(),
        emoji: emojiChoisi(f, "🛒"),
        type: valeursMulti(f, "type")[0] || "semaine",
        magasin: String(d.get("magasin") || "").trim()
      };
      fermerFeuille();
      Actions.enregistrerListe(donnees, l ? l.id : null);
      toast(l ? "Liste enregistrée" : "Liste créée 🛒");
    };
  });
};

/* Déplacer un article vers une autre liste (du mois vers la semaine, etc.) */
Formulaires.deplacerCourse = function (cid) {
  const c = etat.courses.find((x) => x.id === cid);
  if (!c) return;
  const autres = listesCourses().filter((l) => l.id !== listeDe(c));
  if (!autres.length) { toast("Il n'y a qu'une seule liste"); return; }

  ouvrirFeuille("Déplacer « " + c.nom + " »",
    '<div id="f-depl">' + autres.map((l) =>
      '<button class="btn plein" data-liste="' + l.id + '" style="margin-bottom:.5rem">' +
      esc((l.emoji || typeListe(l).emoji) + " " + l.nom) +
      (l.magasin ? " — " + esc(l.magasin) : "") + "</button>").join("") +
      '<button class="btn plein" data-action="fermer" style="margin-top:.5rem">Annuler</button></div>',
    (f) => {
      f.onclick = (ev) => {
        const b = ev.target.closest("[data-liste]");
        if (!b) return;
        fermerFeuille();
        Actions.deplacerCourse(cid, b.dataset.liste);
      };
    });
};

/* ================================ RÉSERVE ================================ */

Formulaires.stock = function (sid) {
  const s = sid ? etat.stock.find((x) => x.id === sid) : null;
  const cour = s || { nom: "", qte: "", unite: "", mini: "", rayon: "Épicerie", vrac: false };

  const html = '<form id="f-stock">' +
    '<label class="champ"><span>Article</span>' +
    '<input type="text" name="nom" value="' + esc(cour.nom) + '" required maxlength="40" ' +
    'placeholder="Pâtes, tomates pelées, lessive…"></label>' +
    '<div class="duo"><label class="champ"><span>J\'en ai</span>' +
    '<input type="text" name="qte" value="' + esc(cour.qte) + '" maxlength="10" inputmode="decimal" placeholder="3"></label>' +
    '<label class="champ"><span>Unité</span>' + selectUnite(cour.unite) + "</label></div>" +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:flex-start">' +
    '<input type="checkbox" name="vrac" style="width:auto;margin-top:.2rem"' + (cour.vrac ? " checked" : "") + ">" +
    '<span style="margin:0">Acheté en vrac<br><small style="font-weight:400">Signalé dans la ' +
    "liste de courses pour ne pas oublier bocaux et sacs réutilisables.</small></span></label>" +
    '<label class="champ"><span>Quantité minimum avant de racheter</span>' +
    '<input type="text" name="mini" value="' + esc(cour.mini) + '" maxlength="10" inputmode="decimal" placeholder="2"></label>' +
    '<p class="aide" style="margin:-.5rem 0 1rem">Laissez vide si vous ne voulez pas être prévenue. ' +
    "Sinon, dès que la quantité passe en dessous, l'article vous est proposé dans les courses.</p>" +
    '<label class="champ"><span>Rayon</span>' + selectRayon(cour.rayon) + "</label>" +
    boutonsFormulaire(s ? "Enregistrer" : "Ajouter à la réserve", !!s) + "</form>";

  ouvrirFeuille(s ? "Modifier " + s.nom : "Nouvel article de réserve", html, (f) => {
    if (!s) f.querySelector('[name="nom"]').focus();
    const bs = f.querySelector('[data-role="suppr"]');
    if (bs) bs.onclick = async () => {
      const ok = await confirmer("Retirer « " + s.nom + " » de la réserve ?",
        { titre: "Supprimer", ok: "Retirer", danger: true });
      if (!ok) return;
      fermerFeuille();
      Actions.supprimerStock(s.id);
      toast("Retiré de la réserve");
    };
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);
      fermerFeuille();
      Actions.enregistrerStock({
        nom: String(d.get("nom")).trim(),
        qte: String(d.get("qte")).trim(),
        unite: String(d.get("unite")),
        mini: String(d.get("mini")).trim(),
        rayon: String(d.get("rayon")),
        vrac: !!d.get("vrac")
      }, s ? s.id : null);
      toast(s ? "Réserve mise à jour" : "Ajouté à la réserve 🥫");
    };
  });
};

/* Vider le panier, en proposant de rentrer les achats dans la réserve. */
Formulaires.viderCourses = function () {
  const cible = listeCourante().id;
  const achetes = etat.courses.filter((c) => c.coche && listeDe(c) === cible);
  if (!achetes.length) { toast("Aucun article coché"); return; }
  const connus = achetes.filter((c) => articleStock(c.nom)).length;

  const html = '<div id="f-vider">' +
    '<p style="margin:.2rem 0 1rem;line-height:1.5;font-size:.92rem">Retirer les ' +
    achetes.length + " article(s) coché(s) de la liste ?</p>" +
    (connus
      ? '<label class="champ" style="display:flex;gap:.6rem;align-items:flex-start">' +
      '<input type="checkbox" id="case-stock" checked style="width:auto;margin-top:.2rem">' +
      '<span style="margin:0">Ajouter à ma réserve<br><small style="font-weight:400">' +
      connus + " de ces articles sont dans votre réserve : leurs quantités seront " +
      "augmentées de ce que vous venez d'acheter.</small></span></label>"
      : "") +
    '<div class="rangee-btn" style="margin-top:1rem">' +
    '<button class="btn" data-action="fermer">Annuler</button>' +
    '<button class="btn principal" data-role="ok">Retirer</button></div></div>';

  ouvrirFeuille("Nettoyer la liste", html, (f) => {
    f.querySelector('[data-role="ok"]').onclick = () => {
      const c = f.querySelector("#case-stock");
      fermerFeuille();
      Actions.viderCoches(!!(c && c.checked), cible);
    };
  });
};

/* ============ REMETTRE À NIVEAU LES RECETTES D'UNE FAMILLE ============ */

Formulaires.majRecettes = function () {
  const sansSaison = etat.recettes.filter((r) => r.saisons === undefined).length;
  const sansUnite = etat.recettes.reduce((n, r) =>
    n + (r.ingredients || []).filter((i) => i.unite === undefined || i.unite === null).length, 0);

  if (!sansSaison && !sansUnite) {
    ouvrirFeuille("Recettes à jour",
      '<div class="bandeau info">✅<div>Vos recettes sont déjà complètes : saisons ' +
      "renseignées et unités séparées.</div></div>" +
      '<button class="btn plein" data-action="fermer">Fermer</button>');
    return;
  }

  ouvrirFeuille("Mettre à jour les recettes",
    '<p style="margin:.2rem 0 1rem;line-height:1.5;font-size:.92rem">Vos recettes datent ' +
    "d'une version précédente de l'application. Cette mise à jour complète ce qui manque, " +
    "<b>sans jamais écraser ce que vous avez saisi</b>.</p>" +
    '<div class="carte">' +
    '<div class="ligne"><span class="etape">1</span><div class="ligne-corps">' +
    "<b>" + sansSaison + " recette(s) sans saison</b><small>Les saisons des plats fournis " +
    "seront rétablies. Vos propres recettes resteront « toute l'année ».</small></div></div>" +
    '<div class="ligne"><span class="etape">2</span><div class="ligne-corps">' +
    "<b>" + sansUnite + " ingrédient(s) sans unité</b><small>« 800 g » redeviendra " +
    "800 + g, pour que le calcul avec la réserve fonctionne.</small></div></div></div>" +
    '<div class="rangee-btn" style="margin-top:1rem">' +
    '<button class="btn" data-action="fermer">Plus tard</button>' +
    '<button class="btn principal" data-role="ok">Mettre à jour</button></div>',
    (f) => {
      f.querySelector('[data-role="ok"]').onclick = async () => {
        const bilan = reparerRecettes();
        fermerFeuille();
        sauver("recettes");
        toast(bilan.saisons + " saisons et " + bilan.unites + " unités rétablies ✅");
      };
    });
};

/* ==================== CATALOGUE PARTAGÉ ENTRE FAMILLES ==================== */

Formulaires.catalogue = function () {
  if (Store.mode !== "nuage") {
    ouvrirFeuille("Recettes partagées",
      '<div class="bandeau">⚠️<div>Le catalogue commun demande la connexion familiale ' +
      "(Firebase). Tant qu'elle n'est pas configurée, vos recettes restent sur cet " +
      "appareil.</div></div>" +
      '<button class="btn plein" data-action="fermer">Fermer</button>');
    return;
  }

  ouvrirFeuille("Recettes partagées",
    '<div id="f-cat"><p class="aide">Chargement du catalogue…</p></div>', async (f) => {
      const zone = f.querySelector("#f-cat");
      const fiches = await Store.listerRecettesPartagees();

      if (fiches === null) {
        zone.innerHTML = '<div class="bandeau">⚠️<div>Catalogue inaccessible. Les règles de ' +
          "sécurité Firebase ne sont peut-être pas à jour.</div></div>" +
          '<button class="btn plein" data-action="fermer">Fermer</button>';
        return;
      }
      if (!fiches.length) {
        zone.innerHTML = rienDu("🌍",
          "Le catalogue est vide pour le moment.<br>Publiez une de vos recettes " +
          "pour l'ouvrir aux autres familles !") +
          '<button class="btn plein" data-action="fermer">Fermer</button>';
        return;
      }

      const dessiner = (q) => {
        const l = fiches.filter((x) => !q ||
          x.nom.toLowerCase().includes(q) ||
          String(x.parFamille || "").toLowerCase().includes(q));
        const dejaLa = new Set(etat.recettes.map((r) => r.nom.toLowerCase().trim()));

        return l.length
          ? l.map((x) => {
            const possede = dejaLa.has(String(x.nom).toLowerCase().trim());
            const aMoi = x.familleRef === etat.famille.code;
            return '<div class="ligne"><span style="font-size:1.4rem">' + esc(x.emoji || "🍽️") + "</span>" +
              '<div class="ligne-corps"><b>' + esc(x.nom) + "</b><small>" +
              esc(x.parFamille || "?") + " • " + (x.ingredients || []).length + " ingrédients</small>" +
              '<span class="etiquettes">' +
              (x.vegetarien ? '<span class="etiquette vert">végé</span>' : "") +
              (x.rapide ? '<span class="etiquette">rapide</span>' : "") +
              (aMoi ? '<span class="etiquette chaud">votre publication</span>' : "") +
              "</span></div>" +
              '<button class="btn mini" data-voir="' + esc(x.id) + '">👁️</button>' +
              (possede
                ? '<span class="etiquette vert">déjà chez vous</span>'
                : '<button class="btn mini principal" data-prendre="' + esc(x.id) + '">Ajouter</button>') +
              "</div>";
          }).join("")
          : '<p class="aide">Aucun plat ne correspond.</p>';
      };

      zone.innerHTML =
        '<input type="text" id="rech-cat" placeholder="Rechercher un plat ou une famille…" ' +
        'autocomplete="off" style="margin-bottom:.8rem">' +
        '<div id="liste-cat" style="max-height:52dvh;overflow-y:auto">' + dessiner("") + "</div>" +
        '<p class="aide" style="margin-top:.8rem">Ces recettes sont publiées par d\'autres ' +
        "familles utilisant Tribu. Elles n'ont pas été vérifiées : lisez-les avant de cuisiner.</p>" +
        '<button class="btn plein" data-action="fermer" style="margin-top:.8rem">Fermer</button>';

      const liste = zone.querySelector("#liste-cat");
      zone.querySelector("#rech-cat").oninput = (ev) => {
        liste.innerHTML = dessiner(ev.target.value.toLowerCase().trim());
      };

      liste.onclick = (ev) => {
        const bVoir = ev.target.closest("[data-voir]");
        if (bVoir) {
          const x = fiches.find((y) => y.id === bVoir.dataset.voir);
          Formulaires.apercuRecette(x);
          return;
        }
        const bPrendre = ev.target.closest("[data-prendre]");
        if (!bPrendre) return;
        const x = fiches.find((y) => y.id === bPrendre.dataset.prendre);
        if (Partage.importer(x)) {
          fermerFeuille();
          toast("« " + x.nom + " » ajoutée à vos recettes 📖");
        }
      };
    });
};

/* Aperçu d'une recette du catalogue avant de la prendre. */
Formulaires.apercuRecette = function (x) {
  if (!x) return;
  const ing = (x.ingredients || []).map((i) =>
    '<div class="ligne"><div class="ligne-corps"><b>' + esc(i.nom) + "</b>" +
    "<small>" + esc(formaterQte(i.qte, i.unite) || "—") + " • " + esc(i.rayon || "") + "</small></div></div>"
  ).join("");

  ouvrirFeuille(x.emoji + " " + x.nom,
    '<p class="aide" style="margin-bottom:.8rem">Publiée par <b>' + esc(x.parFamille || "?") + "</b></p>" +
    '<div class="puces" style="margin-bottom:1rem">' +
    (x.vegetarien ? '<span class="etiquette vert">végé</span> ' : "") +
    (x.rapide ? '<span class="etiquette">rapide</span> ' : "") +
    '<span class="etiquette">' + (x.type === "leger" ? "léger" : "consistant") + "</span></div>" +
    '<div class="carte">' + (ing || '<p class="aide">Aucun ingrédient.</p>') + "</div>" +
    (x.lien ? '<a class="btn plein doux" href="' + esc(x.lien) + '" target="_blank" rel="noopener" ' +
      'style="text-decoration:none;margin-bottom:.5rem">Ouvrir la recette ↗</a>' : "") +
    '<button class="btn plein principal" data-role="prendre">Ajouter à mes recettes</button>' +
    '<button class="btn plein" data-action="fermer" style="margin-top:.5rem">Fermer</button>',
    (f) => {
      f.querySelector('[data-role="prendre"]').onclick = () => {
        if (Partage.importer(x)) {
          fermerFeuille();
          toast("« " + x.nom + " » ajoutée à vos recettes 📖");
        }
      };
    });
};

/* Publier une de ses recettes dans le catalogue commun. */
Formulaires.publierRecette = function (rid) {
  const r = etat.recettes.find((x) => x.id === rid);
  if (!r) return;

  if (r.partageId) {
    ouvrirFeuille("Recette partagée",
      '<p style="margin:.2rem 0 1rem;line-height:1.5;font-size:.92rem">« ' + esc(r.nom) +
      " » est visible par les autres familles de Tribu.</p>" +
      '<button class="btn plein danger" data-role="retirer" style="margin-bottom:.5rem">' +
      "Retirer du catalogue</button>" +
      '<button class="btn plein" data-action="fermer">Fermer</button>',
      (f) => {
        f.querySelector('[data-role="retirer"]').onclick = async () => {
          const ok = await Partage.retirer(r.id);
          fermerFeuille();
          if (ok) toast("Retirée du catalogue");
        };
      });
    return;
  }

  ouvrirFeuille("Partager cette recette",
    '<p style="margin:.2rem 0 1rem;line-height:1.5;font-size:.92rem">' +
    "Publier « <b>" + esc(r.nom) + "</b> » la rendra visible par <b>toutes les familles</b> " +
    "qui utilisent Tribu. Chacune pourra la recopier dans sa propre liste.</p>" +
    '<div class="bandeau">👀<div>Sont publiés : le nom du plat, ses ingrédients, le lien ' +
    "éventuel, et le <b>nom de votre tribu</b> (« " + esc(etat.famille.nom) + " »).<br>" +
    "Ne sont jamais publiés : vos prénoms, vos points, vos courses, ni le code de votre famille.</div></div>" +
    '<p class="aide" style="margin-bottom:1rem">Vous pourrez la retirer à tout moment.</p>' +
    '<div class="rangee-btn">' +
    '<button class="btn" data-action="fermer">Annuler</button>' +
    '<button class="btn principal" data-role="publier">Publier</button></div>',
    (f) => {
      const b = f.querySelector('[data-role="publier"]');
      b.onclick = async () => {
        b.disabled = true;
        const ok = await Partage.publier(r.id);
        fermerFeuille();
        if (ok) toast("Publiée ! Merci pour les autres familles 🌍");
      };
    });
};

/* ============================ SIGNALER / PROPOSER ============================ */

Formulaires.retour = function () {
  const html = '<form id="f-retour">' +
    '<p class="aide" style="margin-bottom:1rem">L\'application est en version <b>bêta</b> : ' +
    "vos remarques servent vraiment. Décrivez ce qui s'est passé ou ce que vous aimeriez.</p>" +
    '<label class="champ"><span>De quoi s\'agit-il ?</span></label>' +
    puceMultiple("genre", [
      { val: "bug", html: "🐞 Un problème" },
      { val: "idee", html: "💡 Une idée" },
      { val: "autre", html: "💬 Autre" }], ["bug"]) +
    '<label class="champ"><span>En une phrase</span>' +
    '<input type="text" name="titre" required maxlength="80" ' +
    'placeholder="Le bouton Valider ne fait rien"></label>' +
    '<label class="champ"><span>Détails (que faisiez-vous ? qu\'attendiez-vous ?)</span>' +
    '<textarea name="detail" maxlength="1500" required ' +
    'placeholder="J\'étais dans l\'onglet Tâches, j\'ai appuyé sur…"></textarea></label>' +
    '<p class="aide">Sont joints automatiquement : votre prénom, le nom de la tribu, ' +
    "la version de l'application et le type de téléphone. Rien d'autre.</p>" +
    '<div class="rangee-btn" style="margin-top:1.2rem">' +
    '<button type="button" class="btn" data-action="fermer">Annuler</button>' +
    '<button type="submit" class="btn principal">Envoyer</button></div></form>';

  ouvrirFeuille("Signaler ou proposer", html, (f) => {
    brancherMulti(f, "genre", true);
    f.onsubmit = async (ev) => {
      ev.preventDefault();
      const bouton = ev.target.querySelector('button[type="submit"]');
      bouton.disabled = true;
      const d = new FormData(ev.target);
      const retour = {
        id: id(),
        genre: valeursMulti(f, "genre")[0] || "autre",
        titre: String(d.get("titre")).trim(),
        detail: String(d.get("detail")).trim(),
        deQui: moi ? moi.prenom : "?",
        famille: etat.famille.code || "?",
        nomFamille: etat.famille.nom || "",
        version: VERSION,
        appareil: navigator.userAgent.slice(0, 200),
        envoyeLe: new Date().toISOString()
      };
      const ok = await Store.envoyerRetour(retour);
      fermerFeuille();
      if (ok && Store.mode === "nuage") {
        toast("Merci ! Votre message est parti 💌");
      } else if (ok) {
        toast("Enregistré sur cet appareil (pas de connexion au partage)");
      } else {
        toast("Envoi impossible — réessayez plus tard");
      }
    };
  });
};

/* ================================ REPAS ================================ */

Formulaires.repas = function (jour, moment) {
  const cle = jour + "-" + moment;
  const actuel = (etat.repas[ui.semaine] || {})[cle] || null;
  const liste = etat.recettes.slice().sort((a, b) => a.nom.localeCompare(b.nom));

  const html = '<div id="f-repas">' +
    '<input type="text" id="rech-repas" placeholder="Rechercher un plat…" autocomplete="off" style="margin-bottom:.8rem">' +
    '<div id="liste-repas" style="max-height:44dvh;overflow-y:auto;margin-bottom:.9rem"></div>' +
    "<hr class=\"sep\">" +
    '<label class="champ"><span>Ou écrire librement</span>' +
    '<input type="text" id="repas-libre" maxlength="60" placeholder="Restes du frigo, resto…" value="' +
    esc(actuel && actuel.texte ? actuel.texte : "") + '"></label>' +
    '<div class="rangee-btn">' +
    (actuel ? '<button class="btn danger" data-role="vider">Vider</button>' : "") +
    '<button class="btn" data-action="fermer">Annuler</button>' +
    '<button class="btn principal" data-role="ok-libre">Valider</button></div></div>';

  ouvrirFeuille(jour.charAt(0).toUpperCase() + jour.slice(1) + " " + (moment === "midi" ? "midi" : "soir"),
    html, (f) => {
      const zone = f.querySelector("#liste-repas");
      const rech = f.querySelector("#rech-repas");
      const dessiner = () => {
        const q = rech.value.toLowerCase().trim();
        const l = liste.filter((r) => !q || r.nom.toLowerCase().includes(q));
        zone.innerHTML = l.length
          ? l.map((r) => '<button class="ligne" data-recette="' + r.id + '" ' +
            'style="width:100%;background:none;border:none;border-top:1px solid var(--border);text-align:left">' +
            '<span style="font-size:1.3rem">' + esc(r.emoji || "🍽️") + "</span>" +
            '<span class="ligne-corps"><b>' + esc(r.nom) + "</b><small>" +
            (r.vegetarien ? "végé • " : "") + (r.rapide ? "rapide • " : "") +
            (r.ingredients || []).length + " ingrédients</small></span>" +
            (actuel && actuel.recetteId === r.id ? '<span class="etiquette vert">choisi</span>' : "") +
            "</button>").join("")
          : '<p class="aide">Aucun plat ne correspond.</p>';
      };
      dessiner();
      rech.oninput = dessiner;
      zone.onclick = (ev) => {
        const b = ev.target.closest("[data-recette]");
        if (!b) return;
        fermerFeuille();
        Actions.definirRepas(ui.semaine, jour, moment, { recetteId: b.dataset.recette, texte: "" });
      };
      const bv = f.querySelector('[data-role="vider"]');
      if (bv) bv.onclick = () => { fermerFeuille(); Actions.definirRepas(ui.semaine, jour, moment, null); };
      f.querySelector('[data-role="ok-libre"]').onclick = () => {
        const txt = f.querySelector("#repas-libre").value.trim();
        fermerFeuille();
        Actions.definirRepas(ui.semaine, jour, moment, txt ? { recetteId: null, texte: txt } : null);
      };
    });
};

/* ================================ GENERATEUR DE MENUS ================================ */

Formulaires.generateur = function () {
  const html = '<form id="f-gen">' +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:center">' +
    '<input type="checkbox" name="midi" checked style="width:auto"><span style="margin:0">Remplir les midis</span></label>' +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:center">' +
    '<input type="checkbox" name="soir" checked style="width:auto"><span style="margin:0">Remplir les soirs</span></label>' +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:center">' +
    '<input type="checkbox" name="remplacer" style="width:auto"><span style="margin:0">Remplacer les repas déjà prévus</span></label>' +
    "<hr class=\"sep\">" +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:flex-start">' +
    '<input type="checkbox" name="saisons" checked style="width:auto;margin-top:.2rem">' +
    '<span style="margin:0">Respecter les saisons<br><small style="font-weight:400">' +
    "Nous sommes en " + infoSaison(saisonActuelle()).emoji + " " +
    infoSaison(saisonActuelle()).nom.toLowerCase() +
    " : les plats des autres saisons seront écartés.</small></span></label>" +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:center">' +
    '<input type="checkbox" name="soirLeger" checked style="width:auto"><span style="margin:0">Plats plus légers le soir</span></label>' +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:center">' +
    '<input type="checkbox" name="rapide" checked style="width:auto"><span style="margin:0">Plats rapides en semaine</span></label>' +
    '<label class="champ"><span>Au moins combien de repas végétariens ?</span>' +
    '<input type="number" name="vege" value="3" min="0" max="14"></label>' +
    '<p class="aide">Le générateur évite les plats déjà servis lors des 3 dernières semaines.</p>' +
    '<div class="rangee-btn" style="margin-top:1.2rem">' +
    '<button type="button" class="btn" data-action="fermer">Annuler</button>' +
    '<button type="submit" class="btn principal">🎲 Générer</button></div></form>';

  ouvrirFeuille("Générer les menus de la semaine", html, (f) => {
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);   // ev.target = le <form>, pas la feuille
      fermerFeuille();
      const n = genererMenus(ui.semaine, {
        midi: !!d.get("midi"), soir: !!d.get("soir"), remplacer: !!d.get("remplacer"),
        soirLeger: !!d.get("soirLeger"), rapideSemaine: !!d.get("rapide"),
        saisons: !!d.get("saisons"),
        vege: Number(d.get("vege")) || 0
      });
      if (n) toast(n + " repas proposés 🍽️");
    };
  });
};

/* ================================ INGREDIENTS -> COURSES ================================ */

/* Les ingrédients de la semaine, moins ce que vous avez déjà en réserve.
   C'est le lien entre les menus et le stock. */
Formulaires.ingredientsVersCourses = function () {
  const ing = ingredientsDeLaSemaine(ui.semaine);
  if (!ing.length) {
    toast("Aucun plat de la bibliothèque prévu cette semaine");
    return;
  }
  const dejaLa = new Set(etat.courses.filter((c) => !c.coche).map((c) => c.nom.toLowerCase().trim()));

  /* Pour chaque ingrédient : besoin, stock, reste à acheter. */
  const lignes = ing.map((i) => {
    const m = manquePour(i.nom, i.qte, i.unite);
    return {
      nom: i.nom, rayon: i.rayon, unite: i.unite,
      besoin: i.besoinTexte,
      enStock: m.enStock,
      manque: m.manque,
      connu: m.connu,
      couvert: m.connu && m.manque !== null && m.manque <= 0,
      dejaListe: dejaLa.has(i.nom.toLowerCase().trim())
    };
  });

  const couverts = lignes.filter((l) => l.couvert).length;
  const aCocher = (l) => !l.couvert && !l.dejaListe;

  const listes = listesCourses();
  let html = '<div id="f-ing">' +
    '<p class="aide" style="margin-bottom:.8rem">Les quantités tiennent compte de votre réserve. ' +
    "Décochez ce que vous ne voulez pas acheter.</p>" +
    (listes.length > 1
      ? '<label class="champ"><span>Dans quelle liste ?</span>' +
        '<select id="choix-liste">' + listes.map((l) =>
          '<option value="' + l.id + '"' + (l.id === listeCourante().id ? " selected" : "") + ">" +
          esc((l.emoji || typeListe(l).emoji) + " " + l.nom) +
          (l.magasin ? " — " + esc(l.magasin) : "") + "</option>").join("") + "</select></label>"
      : "");

  if (couverts) {
    html += '<div class="bandeau info">🥫<div><b>' + couverts + " ingrédient(s)</b> sont déjà " +
      "couverts par votre réserve : ils sont décochés.</div></div>";
  }

  let rayonCourant = "";
  lignes.forEach((l, k) => {
    if (l.rayon !== rayonCourant) {
      rayonCourant = l.rayon;
      html += '<div class="sous-titre" style="margin:.9rem 0 .3rem"><h3>' + esc(rayonCourant) + "</h3></div>";
    }
    const details = [];
    details.push("besoin " + esc(l.besoin || "?"));
    if (l.enStock !== null) details.push("en réserve " + esc(l.enStock));
    if (l.couvert) details.push("✅ rien à acheter");
    else if (l.connu && l.manque !== null && l.enStock !== null) {
      details.push("<b>à acheter " + esc(formaterQte(l.manque, l.unite)) + "</b>");
    }
    if (l.dejaListe) details.push("déjà dans la liste");
    if (!l.connu) details.push("⚠️ unités différentes, à vérifier");

    html += '<label class="ligne" style="cursor:pointer">' +
      '<input type="checkbox" data-k="' + k + '" style="width:auto"' + (aCocher(l) ? " checked" : "") + ">" +
      '<span class="ligne-corps"><b>' + esc(l.nom) + "</b><small>" +
      details.join(" • ") + "</small></span></label>";
  });

  html += '<div class="rangee-btn" style="margin-top:1.2rem">' +
    '<button class="btn" data-action="fermer">Annuler</button>' +
    '<button class="btn principal" data-role="ok">Ajouter aux courses</button></div></div>';

  ouvrirFeuille("Ingrédients de la semaine", html, (f) => {
    f.querySelector('[data-role="ok"]').onclick = () => {
      const choisis = Array.from(f.querySelectorAll('input[type="checkbox"]:checked'))
        .map((c) => lignes[Number(c.dataset.k)]);
      fermerFeuille();
      if (!choisis.length) return;
      const champListe = f.querySelector("#choix-liste");
      const cible = champListe ? champListe.value : listeCourante().id;
      choisis.slice().reverse().forEach((l) => {
        /* On achète ce qui manque vraiment ; si le calcul est impossible,
           on reprend le besoin complet plutôt que d'inventer un chiffre. */
        const qte = (l.connu && l.manque !== null && l.enStock !== null)
          ? texteNombre(l.manque)
          : (nombre(l.besoin) !== null ? texteNombre(nombre(l.besoin)) : l.besoin);
        const enReserve = articleStock(l.nom);
        etat.courses.unshift({
          id: id(), nom: l.nom, qte: qte, unite: l.unite, rayon: l.rayon,
          coche: false, listeId: cible, vrac: !!(enReserve && enReserve.vrac),
          parQui: moi && moi.id, creeLe: new Date().toISOString()
        });
      });
      sauver("courses");
      toast(choisis.length + " article(s) ajouté(s) 🛒");
    };
  });
};

/* ================================ RECETTE ================================ */

Formulaires.recette = function (rid) {
  const r = rid ? etat.recettes.find((x) => x.id === rid) : null;
  const cour = r || { emoji: "🍽️", type: "consistant", vegetarien: false, rapide: false, lien: "", ingredients: [] };
  const ings = (cour.ingredients || []).slice();

  const ligneIng = (i, k) =>
    '<div data-ing="' + k + '" style="margin-bottom:.7rem;padding-bottom:.7rem;border-bottom:1px solid var(--border)">' +
    '<div style="display:flex;gap:.5rem;margin-bottom:.4rem">' +
    '<input type="text" data-c="nom" value="' + esc(i.nom || "") + '" placeholder="Ingrédient" style="flex:1">' +
    '<button type="button" class="btn mini" data-role="suppr-ing" style="flex:0 0 auto">🗑️</button></div>' +
    '<div class="duo">' +
    '<input type="text" data-c="qte" value="' + esc(i.qte || "") + '" placeholder="Quantité" ' +
    'inputmode="decimal" maxlength="10" style="flex:.8">' +
    '<span style="flex:1.1">' + selectUnite(i.unite, "unite-ing") + "</span>" +
    '<span style="flex:1.4">' + selectRayon(i.rayon || "Épicerie") + "</span>" +
    "</div></div>";

  const html = '<form id="f-recette">' +
    '<label class="champ"><span>Nom du plat</span>' +
    '<input type="text" name="nom" value="' + esc(cour.nom || "") + '" required maxlength="50"></label>' +
    '<label class="champ"><span>Icône</span></label>' +
    grilleEmojis(EMOJIS_RECETTES, cour.emoji) +
    '<label class="champ"><span>Type de plat</span></label>' +
    puceMultiple("type", [
      { val: "consistant", html: "Consistant" },
      { val: "leger", html: "Léger" }], [cour.type || "consistant"]) +
    '<div class="puces" style="margin-bottom:1rem">' +
    '<label class="puce"><input type="checkbox" name="vege" style="width:auto"' + (cour.vegetarien ? " checked" : "") + "> Végétarien</label>" +
    '<label class="puce"><input type="checkbox" name="rapide" style="width:auto"' + (cour.rapide ? " checked" : "") + "> Rapide</label>" +
    "</div>" +
    '<label class="champ"><span>Saisons</span></label>' +
    puceMultiple("saisons", SAISONS.map((x) => ({ val: x.val, html: x.emoji + " " + x.nom })),
      cour.saisons || []) +
    '<p class="aide" style="margin:-.5rem 0 .6rem">Aucune saison cochée = le plat convient ' +
    "toute l'année. Sinon, le générateur de menus l'évitera hors saison.</p>" +
    '<button type="button" class="btn plein doux" data-role="deviner" style="margin-bottom:1rem">' +
    "🔎 Deviner d'après les ingrédients</button>" +
    '<label class="champ"><span>Lien vers la recette (Cookomix, blog…)</span>' +
    '<input type="url" name="lien" value="' + esc(cour.lien || "") + '" placeholder="https://…"></label>' +
    (cour.lien ? '<a class="btn plein doux" href="' + esc(cour.lien) + '" target="_blank" rel="noopener" ' +
      'style="margin-bottom:1rem;text-decoration:none">Ouvrir la recette ↗</a>' : "") +
    (r && estRecettePerso(r)
      ? '<button type="button" class="btn plein ' + (r.partageId ? "doux" : "") +
      '" data-role="partager" style="margin-bottom:1rem">' +
      (r.partageId ? "🌍 Partagée avec les autres familles" : "🌍 Partager avec les autres familles") +
      "</button>"
      : "") +
    "<hr class=\"sep\">" +
    '<div class="sous-titre" style="margin-top:0"><h3>Ingrédients</h3></div>' +
    '<div id="zone-ing">' + ings.map(ligneIng).join("") + "</div>" +
    '<button type="button" class="btn plein doux" data-role="ajout-ing" style="margin-top:.4rem">＋ Ajouter un ingrédient</button>' +
    boutonsFormulaire(r ? "Enregistrer" : "Créer la recette", !!r) + "</form>";

  ouvrirFeuille(r ? "Modifier la recette" : "Nouvelle recette", html, (f) => {
    brancherEmojis(f);
    brancherMulti(f, "type", true);
    brancherMulti(f, "saisons", false);
    const zone = f.querySelector("#zone-ing");

    f.querySelector('[data-role="deviner"]').onclick = () => {
      const liste = Array.from(zone.querySelectorAll("[data-ing]")).map((row) => ({
        nom: row.querySelector('[data-c="nom"]').value.trim()
      })).filter((i) => i.nom);
      const trouvees = devinerSaisons(liste);
      const g = f.querySelector('[data-role="saisons"]');
      g.querySelectorAll(".puce").forEach((p) => {
        p.classList.toggle("on", trouvees.indexOf(p.dataset.val) !== -1);
      });
      toast(trouvees.length
        ? "Proposé : " + trouvees.map((v) => infoSaison(v).nom).join(", ")
        : "Ces ingrédients se trouvent toute l'année");
    };

    const bp = f.querySelector('[data-role="partager"]');
    if (bp) bp.onclick = () => Formulaires.publierRecette(r.id);

    f.querySelector('[data-role="ajout-ing"]').onclick = () => {
      const div = document.createElement("div");
      div.innerHTML = ligneIng({ nom: "", qte: "", rayon: "Épicerie" }, zone.children.length);
      zone.appendChild(div.firstChild);
      zone.lastChild.querySelector("input").focus();
    };
    zone.onclick = (ev) => {
      const b = ev.target.closest('[data-role="suppr-ing"]');
      if (b) b.closest("[data-ing]").remove();
    };

    const bs = f.querySelector('[data-role="suppr"]');
    if (bs) bs.onclick = async () => {
      const ok = await confirmer("Supprimer la recette « " + r.nom + " » ?",
        { titre: "Supprimer", ok: "Supprimer", danger: true });
      if (!ok) return;
      etat.recettes = etat.recettes.filter((x) => x.id !== r.id);
      fermerFeuille();
      sauver("recettes");
      toast("Recette supprimée");
    };

    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);   // ev.target = le <form>, pas la feuille
      const liste = Array.from(zone.querySelectorAll("[data-ing]")).map((row) => ({
        nom: row.querySelector('[data-c="nom"]').value.trim(),
        qte: row.querySelector('[data-c="qte"]').value.trim(),
        unite: row.querySelector('[name="unite-ing"]').value,
        rayon: row.querySelector('[name="rayon"]').value
      })).filter((i) => i.nom);

      const donnees = {
        nom: String(d.get("nom")).trim(),
        emoji: emojiChoisi(f, "🍽️"),
        type: valeursMulti(f, "type")[0] || "consistant",
        vegetarien: !!d.get("vege"),
        rapide: !!d.get("rapide"),
        lien: String(d.get("lien") || "").trim(),
        saisons: valeursMulti(f, "saisons"),
        ingredients: liste
      };
      if (r) Object.assign(r, donnees);
      else etat.recettes.push(Object.assign({ id: id(), origine: "perso" }, donnees));
      fermerFeuille();
      sauver("recettes");
      toast(r ? "Recette enregistrée" : "Recette ajoutée");
    };
  });
};

/* ================================ RAPPEL ================================ */

Formulaires.note = function (nid) {
  const n = nid ? etat.notes.find((x) => x.id === nid) : null;
  const cour = n || { date: isoDate(new Date()), concernes: [], repetition: "aucune" };

  const html = '<form id="f-note">' +
    '<label class="champ"><span>Quoi ?</span>' +
    '<input type="text" name="titre" value="' + esc(cour.titre || "") + '" required maxlength="60" ' +
    'placeholder="Rendez-vous dentiste"></label>' +
    '<div class="duo"><label class="champ"><span>Date</span>' +
    '<input type="date" name="date" value="' + esc(cour.date || "") + '"></label>' +
    '<label class="champ"><span>Heure</span>' +
    '<input type="time" name="heure" value="' + esc(cour.heure || "") + '"></label></div>' +
    '<label class="champ"><span>Qui est concerné ? (personne = toute la famille)</span></label>' +
    puceMultiple("qui", etat.membres.map((m) => ({ val: m.id, html: esc(m.emoji + " " + m.prenom) })),
      cour.concernes || []) +
    '<label class="champ"><span>Répétition</span>' +
    '<select name="repetition">' +
    [["aucune", "Aucune"], ["hebdo", "Chaque semaine"], ["mensuel", "Chaque mois"], ["annuel", "Chaque année"]]
      .map(([v, l]) => '<option value="' + v + '"' + (cour.repetition === v ? " selected" : "") + ">" + l + "</option>").join("") +
    "</select></label>" +
    '<label class="champ"><span>Note (facultatif)</span>' +
    '<textarea name="note" maxlength="400">' + esc(cour.note || "") + "</textarea></label>" +
    boutonsFormulaire(n ? "Enregistrer" : "Ajouter", !!n) + "</form>";

  ouvrirFeuille(n ? "Modifier le rappel" : "Nouveau rappel", html, (f) => {
    brancherMulti(f, "qui", false);
    const bs = f.querySelector('[data-role="suppr"]');
    if (bs) bs.onclick = async () => {
      const ok = await confirmer("Supprimer ce rappel ?", { titre: "Supprimer", ok: "Supprimer", danger: true });
      if (!ok) return;
      fermerFeuille();
      Actions.supprimerNote(n.id);
      toast("Rappel supprimé");
    };
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);   // ev.target = le <form>, pas la feuille
      const donnees = {
        titre: String(d.get("titre")).trim(),
        date: String(d.get("date") || ""),
        heure: String(d.get("heure") || ""),
        note: String(d.get("note") || "").trim(),
        concernes: valeursMulti(f, "qui"),
        repetition: String(d.get("repetition") || "aucune")
      };
      if (n) Object.assign(n, donnees);
      else etat.notes.push(Object.assign({ id: id(), fait: false, creeLe: new Date().toISOString() }, donnees));
      fermerFeuille();
      sauver("notes");
      toast(n ? "Rappel enregistré" : "Rappel ajouté 🔔");
    };
  });
};

/* ================================ CADEAU ================================ */

Formulaires.cadeau = function (cid) {
  if (!estAdmin()) return;
  const c = cid ? etat.cadeaux.find((x) => x.id === cid) : null;
  const cour = c || { emoji: "🎁", cout: 50, actif: true };

  const html = '<form id="f-cadeau">' +
    '<label class="champ"><span>Nom du cadeau</span>' +
    '<input type="text" name="nom" value="' + esc(cour.nom || "") + '" required maxlength="40" ' +
    'placeholder="Choisir le film du soir"></label>' +
    '<label class="champ"><span>Icône</span></label>' + grilleEmojis(EMOJIS_CADEAUX, cour.emoji) +
    '<label class="champ"><span>Coût en points</span>' +
    '<input type="number" name="cout" value="' + (cour.cout || 50) + '" min="1" max="100000" required></label>' +
    '<label class="champ" style="display:flex;gap:.6rem;align-items:center">' +
    '<input type="checkbox" name="retire" style="width:auto"' + (cour.actif === false ? " checked" : "") + ">" +
    '<span style="margin:0">Retirer de la boutique</span></label>' +
    boutonsFormulaire(c ? "Enregistrer" : "Créer le cadeau", !!c) + "</form>";

  ouvrirFeuille(c ? "Modifier le cadeau" : "Nouveau cadeau", html, (f) => {
    brancherEmojis(f);
    const bs = f.querySelector('[data-role="suppr"]');
    if (bs) bs.onclick = async () => {
      const ok = await confirmer("Supprimer le cadeau « " + c.nom + " » ?",
        { titre: "Supprimer", ok: "Supprimer", danger: true });
      if (!ok) return;
      etat.cadeaux = etat.cadeaux.filter((x) => x.id !== c.id);
      fermerFeuille();
      sauver("cadeaux");
      toast("Cadeau supprimé");
    };
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);   // ev.target = le <form>, pas la feuille
      const donnees = {
        nom: String(d.get("nom")).trim(), emoji: emojiChoisi(f, "🎁"),
        cout: Number(d.get("cout")) || 1, actif: !d.get("retire")
      };
      if (c) Object.assign(c, donnees);
      else etat.cadeaux.push(Object.assign({ id: id() }, donnees));
      fermerFeuille();
      sauver("cadeaux");
      toast(c ? "Cadeau enregistré" : "Cadeau ajouté 🎁");
    };
  });
};

/* ================================ MEMBRE ================================ */

Formulaires.membre = function (mid) {
  if (!estAdmin()) return;
  const m = mid ? membre(mid) : null;
  const cour = m || { emoji: "😀", role: "membre", pin: "" };
  const nbAdmins = etat.membres.filter((x) => x.role === "admin").length;

  const html = '<form id="f-membre">' +
    '<label class="champ"><span>Prénom</span>' +
    '<input type="text" name="prenom" value="' + esc(cour.prenom || "") + '" required maxlength="20"></label>' +
    '<label class="champ"><span>Avatar</span></label>' + grilleEmojis(EMOJIS_MEMBRES, cour.emoji) +

    '<label class="champ" style="display:flex;gap:.6rem;align-items:flex-start">' +
    '<input type="checkbox" name="sansAppareil" id="case-sans-appareil" style="width:auto;margin-top:.2rem"' +
    (cour.sansAppareil ? " checked" : "") + ">" +
    '<span style="margin:0">Pas de téléphone<br><small style="font-weight:400">Profil géré par les parents. ' +
    "L'enfant a ses tâches, ses points et ses cadeaux, mais ne se connecte pas : " +
    "c'est vous qui cochez pour lui.</small></span></label>" +

    '<div id="bloc-connexion">' +
    '<label class="champ"><span>Rôle</span></label>' +
    puceMultiple("role", [
      { val: "membre", html: "Membre" },
      { val: "admin", html: "Administrateur" }], [cour.role]) +
    '<p class="aide" style="margin:-.6rem 0 1rem">Un administrateur valide les tâches, accorde les cadeaux ' +
    "et gère les réglages de la famille.</p>" +
    '<label class="champ"><span>Code à 4 chiffres' + (m ? " (laisser vide pour ne pas changer)" : "") + "</span>" +
    '<input type="tel" name="pin" inputmode="numeric" maxlength="4" placeholder="' + (m ? "••••" : "1234") + '">' +
    "</label></div>" +

    boutonsFormulaire(m ? "Enregistrer" : "Ajouter", !!m && etat.membres.length > 1) + "</form>";

  ouvrirFeuille(m ? "Modifier " + m.prenom : "Nouveau membre", html, (f) => {
    brancherEmojis(f);
    brancherMulti(f, "role", true);

    /* Un profil sans téléphone n'a besoin ni de rôle ni de code. */
    const caseSans = f.querySelector("#case-sans-appareil");
    const blocConnexion = f.querySelector("#bloc-connexion");
    const majBloc = () => { blocConnexion.hidden = caseSans.checked; };
    caseSans.onchange = majBloc;
    majBloc();

    const bs = f.querySelector('[data-role="suppr"]');
    if (bs) bs.onclick = async () => {
      if (m.id === moi.id) { toast("Vous ne pouvez pas vous supprimer vous-même"); return; }
      if (m.role === "admin" && nbAdmins <= 1) { toast("Il faut au moins un administrateur"); return; }
      const ok = await confirmer("Supprimer " + m.prenom + " de la famille ? Ses points et son historique seront perdus.",
        { titre: "Supprimer le membre", ok: "Supprimer", danger: true });
      if (!ok) return;
      etat.membres = etat.membres.filter((x) => x.id !== m.id);
      etat.taches.forEach((t) => { t.participants = (t.participants || []).filter((p) => p !== m.id); });
      etat.journal = etat.journal.filter((e) => e.membreId !== m.id);
      /* Ses appareils perdent l'accès en même temps que son profil. Il faut
         les retirer des DEUX endroits : le registre et la liste des appareils
         autorisés — sinon le filet anti-verrouillage, qui conserve les
         appareils qu'il n'arrive pas à rattacher, les remettrait. */
      const sesAppareils = Object.keys(etat.appareils || {})
        .filter((u) => etat.appareils[u] === m.id)
        .concat(m.uids || []);
      sesAppareils.forEach((u) => { delete etat.appareils[u]; });
      etat.membresUid = (etat.membresUid || []).filter((u) => sesAppareils.indexOf(u) === -1);
      etat.adminsUid = (etat.adminsUid || []).filter((u) => sesAppareils.indexOf(u) === -1);
      fermerFeuille();
      sauver("membres", "taches", "journal");
      await Store.retirerAppareils(sesAppareils);
      toast("Membre supprimé");
    };
    f.onsubmit = async (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);   // ev.target = le <form>, pas la feuille
      const sansAppareil = !!d.get("sansAppareil");
      const pin = String(d.get("pin") || "").trim();
      if (!sansAppareil && pin && !/^[0-9]{4}$/.test(pin)) {
        toast("Le code doit faire 4 chiffres"); return;
      }
      const role = sansAppareil ? "membre" : (valeursMulti(f, "role")[0] || "membre");
      if (m && m.role === "admin" && role !== "admin" && nbAdmins <= 1) {
        toast("Il faut au moins un administrateur"); return;
      }
      if (sansAppareil && m && (m.uids || []).length) {
        toast("Retirez d'abord ses appareils : ce profil est déjà connecté quelque part");
        return;
      }

      if (m) {
        m.prenom = String(d.get("prenom")).trim();
        m.emoji = emojiChoisi(f, "😀");
        m.role = role;
        m.sansAppareil = sansAppareil;
        if (!sansAppareil && pin) Object.assign(m, await champsPin(pin));
        if (sansAppareil) { m.pin = null; m.pinHash = null; m.pinSel = null; }
      } else {
        if (!sansAppareil && !pin) { toast("Choisissez un code à 4 chiffres"); return; }
        const nouveau = {
          id: id(), prenom: String(d.get("prenom")).trim(), emoji: emojiChoisi(f, "😀"),
          role: role, uids: [], sansAppareil: sansAppareil, creeLe: new Date().toISOString()
        };
        if (!sansAppareil) Object.assign(nouveau, await champsPin(pin));
        etat.membres.push(nouveau);
      }

      fermerFeuille();
      sauver("membres");
      if (!m && !sansAppareil) Formulaires.invitation();     // il lui faut un accès
      else if (!m) toast("Profil créé — à vous de cocher ses tâches 🧒");
      else toast("Profil enregistré");
    };
  });
};

/* ================================ INVITATION ================================ */

Formulaires.invitation = function () {
  if (!estAdmin()) { toast("Seul un administrateur peut inviter"); return; }

  /* Les profils qui peuvent recevoir une invitation : ceux qui se connectent
     (les enfants « sans téléphone » n'en ont pas besoin). */
  const cibles = etat.membres.filter((m) => !m.sansAppareil);

  const html = '<div id="f-invit">' +
    '<p class="aide" style="margin-bottom:1rem">L\'invitation est un lien <b>à usage unique</b>. ' +
    "Envoyez-le à la personne (SMS, message…) : en l'ouvrant, son téléphone sera autorisé " +
    "à accéder à la famille.</p>" +
    '<label class="champ"><span>Pour qui ?</span></label>' +
    puceMultiple("pour", [{ val: "nouveau", html: "➕ Une nouvelle personne" }].concat(
      cibles.map((m) => ({
        val: m.id,
        html: esc((m.emoji || "🙂") + " " + m.prenom) +
          (aUnAppareil(m) ? "" : " (jamais connecté)")
      }))), ["nouveau"]) +
    '<p class="aide" style="margin:-.5rem 0 1rem">Choisissez un prénom existant pour ' +
    "ajouter un <b>deuxième téléphone</b> à quelqu'un, ou pour connecter un profil " +
    "que vous avez créé dans Administration.</p>" +
    '<label class="champ"><span>Valable pendant</span></label>' +
    puceMultiple("duree", [
      { val: "1", html: "24 heures" },
      { val: "7", html: "7 jours" },
      { val: "30", html: "30 jours" }], ["7"]) +
    '<button class="btn principal plein" data-role="creer">Créer l\'invitation</button>' +
    '<div id="resultat-invit" style="margin-top:1rem"></div>' +
    '<button class="btn plein" data-action="fermer" style="margin-top:1rem">Fermer</button></div>';

  ouvrirFeuille("Inviter dans la famille", html, (f) => {
    brancherMulti(f, "duree", true);
    brancherMulti(f, "pour", true);
    const zone = f.querySelector("#resultat-invit");
    const bouton = f.querySelector('[data-role="creer"]');

    bouton.onclick = async () => {
      const pour = valeursMulti(f, "pour")[0] || "nouveau";
      const cible = pour === "nouveau" ? null : membre(pour);
      if (cible && !cible.pinHash && !cible.pin) {
        toast("Donnez d'abord un code à 4 chiffres à " + cible.prenom);
        return;
      }
      bouton.disabled = true;
      const jours = Number(valeursMulti(f, "duree")[0] || 7);
      const inv = await Invitations.creer(jours, cible ? cible.id : null);
      bouton.disabled = false;
      if (!inv) { toast("Création impossible"); return; }
      const lien = Invitations.lien(inv.jeton);
      const fin = new Date(inv.expireLe).toLocaleDateString("fr-FR",
        { day: "numeric", month: "long", year: "numeric" });

      zone.innerHTML = '<div class="bandeau info">✅<div>Invitation créée pour <b>' +
        esc(inv.profil ? inv.profil.prenom : "une nouvelle personne") +
        "</b>, valable jusqu'au " + esc(fin) +
        (inv.profil ? ".<br>Cette personne devra saisir son code à 4 chiffres." : ".") +
        "</div></div>" +
        '<div class="code-famille" style="font-size:.72rem;word-break:break-all;letter-spacing:0">' +
        esc(lien) + "</div>" +
        '<div class="rangee-btn" style="margin-top:.7rem">' +
        '<button class="btn doux" data-action="copier" data-texte="' + esc(lien) + '">Copier le lien</button>' +
        '<button class="btn principal" data-role="partager">Partager</button></div>' +
        '<p class="aide" style="margin-top:.6rem">Une fois utilisée, elle ne fonctionnera plus. ' +
        "Créez-en une nouvelle pour chaque personne et chaque appareil.</p>";

      const bp = zone.querySelector('[data-role="partager"]');
      bp.onclick = () => {
        if (navigator.share) {
          navigator.share({
            title: "Rejoindre " + etat.famille.nom + " sur Tribu",
            text: "Voici ton invitation pour rejoindre notre organisation familiale :",
            url: lien
          }).catch(() => { });
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(lien).then(() => toast("Lien copié"));
        } else {
          toast("Copiez le lien ci-dessus");
        }
      };
    };
  });
};

/* ================ BOUTIQUE POUR UN ENFANT SANS TÉLÉPHONE ================ */

Formulaires.cadeauPour = function (mid) {
  if (!estAdmin()) return;
  const m = membre(mid);
  if (!m) return;
  const pts = pointsDe(mid);
  const dispo = etat.cadeaux.filter((c) => c.actif !== false).sort((a, b) => a.cout - b.cout);

  const html = '<div id="f-cadeau-pour">' +
    '<p class="aide" style="margin-bottom:1rem">' + esc(m.prenom) + " a <b>" + pts + " points</b>. " +
    "Choisissez ce qu'il ou elle souhaite échanger.</p>" +
    (dispo.length
      ? '<div class="grille-cadeaux">' + dispo.map((c) => {
        const assez = pts >= c.cout;
        return '<div class="cadeau"><span class="em">' + esc(c.emoji || "🎁") + "</span>" +
          "<b>" + esc(c.nom) + "</b>" +
          '<span class="etiquette or">' + c.cout + " pts</span>" +
          '<button class="btn mini ' + (assez ? "principal" : "") + '" data-cadeau="' + c.id + '"' +
          (assez ? "" : " disabled") + ">" + (assez ? "Échanger" : "Trop cher") + "</button></div>";
      }).join("") + "</div>"
      : '<p class="aide">Aucun cadeau dans la boutique.</p>') +
    '<button class="btn plein" data-action="fermer" style="margin-top:1rem">Fermer</button></div>';

  ouvrirFeuille("Cadeaux de " + m.prenom, html, (f) => {
    f.onclick = (ev) => {
      const b = ev.target.closest("[data-cadeau]");
      if (!b) return;
      fermerFeuille();
      Actions.accorderCadeauPour(mid, b.dataset.cadeau);
    };
  });
};

/* ================================ POINTS ================================ */

Formulaires.ajustementPoints = function (mid) {
  if (!estAdmin()) return;
  const m = membre(mid);
  if (!m) return;
  const html = '<form id="f-pts">' +
    '<p class="aide" style="margin-bottom:1rem">' + esc(m.prenom) + " a actuellement <b>" +
    pointsDe(m.id) + " points</b>.</p>" +
    '<div class="puces" data-role="rapide" style="margin-bottom:1rem">' +
    [-50, -20, -10, 10, 20, 50].map((n) =>
      '<button type="button" class="puce" data-n="' + n + '">' + (n > 0 ? "+" : "") + n + "</button>").join("") +
    "</div>" +
    '<label class="champ"><span>Nombre de points (négatif pour retirer)</span>' +
    '<input type="number" name="delta" value="10" required></label>' +
    '<label class="champ"><span>Motif</span>' +
    '<input type="text" name="motif" maxlength="60" placeholder="Coup de main exceptionnel"></label>' +
    '<div class="rangee-btn" style="margin-top:1.2rem">' +
    '<button type="button" class="btn" data-action="fermer">Annuler</button>' +
    '<button type="submit" class="btn principal">Appliquer</button></div></form>';

  ouvrirFeuille("Ajuster les points de " + m.prenom, html, (f) => {
    f.querySelector('[data-role="rapide"]').onclick = (ev) => {
      const b = ev.target.closest("[data-n]");
      if (b) f.querySelector('[name="delta"]').value = b.dataset.n;
    };
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);   // ev.target = le <form>, pas la feuille
      const delta = Number(d.get("delta"));
      if (!delta) { fermerFeuille(); return; }
      fermerFeuille();
      Actions.ajusterPoints(m.id, delta, String(d.get("motif") || "").trim() || "Ajustement");
    };
  });
};

Formulaires.historique = function () {
  const mien = etat.journal.filter((e) => e.membreId === moi.id).slice(0, 60);
  const html = mien.length
    ? mien.map((e) =>
      '<div class="ligne"><div class="ligne-corps"><b>' + esc(e.motif) + "</b><small>" +
      new Date(e.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) +
      "</small></div><span class=\"etiquette " + (e.delta > 0 ? "vert" : "rouge") + '">' +
      (e.delta > 0 ? "+" : "") + e.delta + "</span></div>").join("")
    : '<p class="aide">Aucun mouvement de points pour l\'instant.</p>';
  ouvrirFeuille("Mon historique de points",
    html + '<button class="btn plein" data-action="fermer" style="margin-top:1.2rem">Fermer</button>');
};

/* ================================ MENU PROFIL ================================ */

Formulaires.menuProfil = function () {
  const th = localStorage.getItem("tribu:theme") || "auto";
  const nomTheme = th === "light" ? "clair" : th === "dark" ? "sombre" : "automatique";
  const etatTexte = Store.mode === "nuage"
    ? '<span class="etat-connexion en-ligne"><i></i>Partagé avec la famille</span>'
    : '<span class="etat-connexion local"><i></i>Sur cet appareil uniquement</span>';
  const alerteCrypto = CRYPTO_DISPO ? "" :
    '<div class="bandeau">⚠️<div>' +
    "Cette page n'est pas servie en <b>https</b> : les codes à 4 chiffres ne peuvent pas " +
    "être chiffrés. À n'utiliser que pour des essais.</div></div>";

  const html =
    '<div class="ligne" style="padding-top:0">' +
    '<span class="avatar">' + esc(moi.emoji || "🙂") + "</span>" +
    '<div class="ligne-corps"><b>' + esc(moi.prenom) + "</b><small>" +
    (estAdmin() ? "Administrateur" : "Membre") + " • " + esc(etat.famille.nom) + "</small></div>" +
    '<span class="etiquette or">' + pointsDe(moi.id) + " pts</span></div>" +
    '<p style="margin:.6rem 0 1rem">' + etatTexte + "</p>" + alerteCrypto +
    '<button class="btn plein" data-action="aller" data-vue="points" style="margin-bottom:.5rem">🌟 Points & cadeaux</button>' +
    '<button class="btn plein" data-action="aller" data-vue="recettes" style="margin-bottom:.5rem">📖 Mes recettes</button>' +
    (estAdmin()
      ? '<button class="btn plein" data-action="aller" data-vue="admin" style="margin-bottom:.5rem">⚙️ Administration</button>'
      : "") +
    '<button class="btn plein" data-action="theme" style="margin-bottom:.5rem">🌓 Thème : ' + nomTheme + "</button>" +
    '<button class="btn plein" data-role="mon-profil" style="margin-bottom:.5rem">✏️ Modifier mon profil</button>' +
    "<hr class=\"sep\">" +
    '<button class="btn plein doux" data-action="retour" style="margin-bottom:.5rem">' +
    "🐞 Signaler un problème / proposer une idée</button>" +
    '<p class="aide centre" style="margin-bottom:.8rem">Version ' + esc(VERSION) +
    " — merci de vos retours !</p>" +
    '<button class="btn plein danger" data-action="deconnexion">Changer de membre / se déconnecter</button>';

  ouvrirFeuille("Mon profil", html, (f) => {
    f.querySelector('[data-role="mon-profil"]').onclick = () => {
      if (estAdmin()) { Formulaires.membre(moi.id); return; }
      Formulaires.monProfilSimple();
    };
    f.querySelectorAll('[data-action="aller"]').forEach((b) => {
      b.addEventListener("click", fermerFeuille);
    });
  });
};

/* Un membre non-admin peut changer son prenom, son avatar et son code. */
Formulaires.monProfilSimple = function () {
  const html = '<form id="f-moi">' +
    '<label class="champ"><span>Prénom</span>' +
    '<input type="text" name="prenom" value="' + esc(moi.prenom) + '" required maxlength="20"></label>' +
    '<label class="champ"><span>Avatar</span></label>' + grilleEmojis(EMOJIS_MEMBRES, moi.emoji) +
    '<label class="champ"><span>Nouveau code à 4 chiffres (facultatif)</span>' +
    '<input type="tel" name="pin" inputmode="numeric" maxlength="4" placeholder="••••"></label>' +
    '<div class="rangee-btn" style="margin-top:1.2rem">' +
    '<button type="button" class="btn" data-action="fermer">Annuler</button>' +
    '<button type="submit" class="btn principal">Enregistrer</button></div></form>';

  ouvrirFeuille("Mon profil", html, (f) => {
    brancherEmojis(f);
    f.onsubmit = async (ev) => {
      ev.preventDefault();
      const d = new FormData(ev.target);   // ev.target = le <form>, pas la feuille
      const pin = String(d.get("pin") || "").trim();
      if (pin && !/^[0-9]{4}$/.test(pin)) { toast("Le code doit faire 4 chiffres"); return; }
      moi.prenom = String(d.get("prenom")).trim();
      moi.emoji = emojiChoisi(f, "😀");
      if (pin) Object.assign(moi, await champsPin(pin));
      fermerFeuille();
      sauver("membres");
      toast("Profil enregistré");
    };
  });
};
