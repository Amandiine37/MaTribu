/* =========================================================================
   TRIBU — formulaires (les fenetres qui remontent du bas de l'ecran)
   ========================================================================= */

const Formulaires = {};

/* ---------- petits aides de formulaire ---------- */

function grilleEmojis(liste, choisi) {
  return '<div class="puces" data-role="emojis" style="margin-bottom:1rem">' +
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
      const d = new FormData(f);
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

Formulaires.course = function () {
  const html = '<form id="f-course">' +
    '<label class="champ"><span>Article</span>' +
    '<input type="text" name="nom" required maxlength="40" placeholder="Lait"></label>' +
    '<div class="duo"><label class="champ"><span>Quantité (facultatif)</span>' +
    '<input type="text" name="qte" maxlength="20" placeholder="2 briques"></label>' +
    '<label class="champ"><span>Rayon</span>' + selectRayon("Épicerie") + "</label></div>" +
    boutonsFormulaire("Ajouter") + "</form>";

  ouvrirFeuille("Ajouter aux courses", html, (f) => {
    f.querySelector('[name="nom"]').focus();
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(f);
      fermerFeuille();
      Actions.ajouterCourse(String(d.get("nom")), String(d.get("rayon")), String(d.get("qte")));
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
      const d = new FormData(f);
      fermerFeuille();
      const n = genererMenus(ui.semaine, {
        midi: !!d.get("midi"), soir: !!d.get("soir"), remplacer: !!d.get("remplacer"),
        soirLeger: !!d.get("soirLeger"), rapideSemaine: !!d.get("rapide"),
        vege: Number(d.get("vege")) || 0
      });
      if (n) toast(n + " repas proposés 🍽️");
    };
  });
};

/* ================================ INGREDIENTS -> COURSES ================================ */

Formulaires.ingredientsVersCourses = function () {
  const ing = ingredientsDeLaSemaine(ui.semaine);
  if (!ing.length) {
    toast("Aucun plat de la bibliothèque prévu cette semaine");
    return;
  }
  const dejaLa = new Set(etat.courses.filter((c) => !c.coche).map((c) => c.nom.toLowerCase().trim()));

  let html = '<div id="f-ing"><p class="aide" style="margin-bottom:.8rem">Décochez ce que vous avez déjà.</p>';
  let rayonCourant = "";
  ing.forEach((i, k) => {
    if (i.rayon !== rayonCourant) {
      rayonCourant = i.rayon;
      html += '<div class="sous-titre" style="margin:.9rem 0 .3rem"><h3>' + esc(rayonCourant) + "</h3></div>";
    }
    const dedans = dejaLa.has(i.nom.toLowerCase().trim());
    html += '<label class="ligne" style="cursor:pointer">' +
      '<input type="checkbox" data-k="' + k + '" style="width:auto"' + (dedans ? "" : " checked") + ">" +
      '<span class="ligne-corps"><b>' + esc(i.nom) + "</b><small>" +
      esc(i.qte || "") + (dedans ? " • déjà dans la liste" : "") + "</small></span></label>";
  });
  html += '<div class="rangee-btn" style="margin-top:1.2rem">' +
    '<button class="btn" data-action="fermer">Annuler</button>' +
    '<button class="btn principal" data-role="ok">Ajouter aux courses</button></div></div>';

  ouvrirFeuille("Ingrédients de la semaine", html, (f) => {
    f.querySelector('[data-role="ok"]').onclick = () => {
      const choisis = Array.from(f.querySelectorAll('input[type="checkbox"]:checked'))
        .map((c) => ing[Number(c.dataset.k)]);
      fermerFeuille();
      if (!choisis.length) return;
      choisis.reverse().forEach((i) => {
        etat.courses.unshift({
          id: id(), nom: i.nom, qte: i.qte, rayon: i.rayon, coche: false,
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
    '<div class="duo" data-ing="' + k + '" style="margin-bottom:.5rem;align-items:flex-start">' +
    '<input type="text" data-c="nom" value="' + esc(i.nom || "") + '" placeholder="Ingrédient" style="flex:2">' +
    '<input type="text" data-c="qte" value="' + esc(i.qte || "") + '" placeholder="Quantité" style="flex:1">' +
    "<span style=\"flex:1.4\">" + selectRayon(i.rayon || "Épicerie") + "</span>" +
    '<button type="button" class="btn mini" data-role="suppr-ing" style="flex:0 0 auto">🗑️</button></div>';

  const html = '<form id="f-recette">' +
    '<label class="champ"><span>Nom du plat</span>' +
    '<input type="text" name="nom" value="' + esc(cour.nom || "") + '" required maxlength="50"></label>' +
    '<label class="champ"><span>Icône</span></label>' +
    grilleEmojis(["🍽️", "🍲", "🥘", "🍝", "🍚", "🍛", "🥗", "🥣", "🍕", "🥧", "🐟", "🍗",
      "🍖", "🥔", "🧀", "🥞", "🌮", "🥪", "🍳", "🌿"], cour.emoji) +
    '<label class="champ"><span>Type de plat</span></label>' +
    puceMultiple("type", [
      { val: "consistant", html: "Consistant" },
      { val: "leger", html: "Léger" }], [cour.type || "consistant"]) +
    '<div class="puces" style="margin-bottom:1rem">' +
    '<label class="puce"><input type="checkbox" name="vege" style="width:auto"' + (cour.vegetarien ? " checked" : "") + "> Végétarien</label>" +
    '<label class="puce"><input type="checkbox" name="rapide" style="width:auto"' + (cour.rapide ? " checked" : "") + "> Rapide</label>" +
    "</div>" +
    '<label class="champ"><span>Lien vers la recette (Cookomix, blog…)</span>' +
    '<input type="url" name="lien" value="' + esc(cour.lien || "") + '" placeholder="https://…"></label>' +
    (cour.lien ? '<a class="btn plein doux" href="' + esc(cour.lien) + '" target="_blank" rel="noopener" ' +
      'style="margin-bottom:1rem;text-decoration:none">Ouvrir la recette ↗</a>' : "") +
    "<hr class=\"sep\">" +
    '<div class="sous-titre" style="margin-top:0"><h3>Ingrédients</h3></div>' +
    '<div id="zone-ing">' + ings.map(ligneIng).join("") + "</div>" +
    '<button type="button" class="btn plein doux" data-role="ajout-ing" style="margin-top:.4rem">＋ Ajouter un ingrédient</button>' +
    boutonsFormulaire(r ? "Enregistrer" : "Créer la recette", !!r) + "</form>";

  ouvrirFeuille(r ? "Modifier la recette" : "Nouvelle recette", html, (f) => {
    brancherEmojis(f);
    brancherMulti(f, "type", true);
    const zone = f.querySelector("#zone-ing");

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
      const d = new FormData(f);
      const liste = Array.from(zone.querySelectorAll("[data-ing]")).map((row) => ({
        nom: row.querySelector('[data-c="nom"]').value.trim(),
        qte: row.querySelector('[data-c="qte"]').value.trim(),
        rayon: row.querySelector("select").value
      })).filter((i) => i.nom);

      const donnees = {
        nom: String(d.get("nom")).trim(),
        emoji: emojiChoisi(f, "🍽️"),
        type: valeursMulti(f, "type")[0] || "consistant",
        vegetarien: !!d.get("vege"),
        rapide: !!d.get("rapide"),
        lien: String(d.get("lien") || "").trim(),
        ingredients: liste
      };
      if (r) Object.assign(r, donnees);
      else etat.recettes.push(Object.assign({ id: id() }, donnees));
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
      const d = new FormData(f);
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
      const d = new FormData(f);
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
    '<label class="champ"><span>Rôle</span></label>' +
    puceMultiple("role", [
      { val: "membre", html: "Membre" },
      { val: "admin", html: "Administrateur" }], [cour.role]) +
    '<p class="aide" style="margin:-.6rem 0 1rem">Un administrateur valide les tâches, accorde les cadeaux ' +
    "et gère les réglages de la famille.</p>" +
    '<label class="champ"><span>Code à 4 chiffres' + (m ? " (laisser vide pour ne pas changer)" : "") + "</span>" +
    '<input type="tel" name="pin" inputmode="numeric" maxlength="4" placeholder="' + (m ? "••••" : "1234") + '"' +
    (m ? "" : " required") + "></label>" +
    boutonsFormulaire(m ? "Enregistrer" : "Ajouter", !!m && etat.membres.length > 1) + "</form>";

  ouvrirFeuille(m ? "Modifier " + m.prenom : "Nouveau membre", html, (f) => {
    brancherEmojis(f);
    brancherMulti(f, "role", true);
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
      fermerFeuille();
      sauver("membres", "taches", "journal");
      toast("Membre supprimé");
    };
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(f);
      const pin = String(d.get("pin") || "").trim();
      if (pin && !/^[0-9]{4}$/.test(pin)) { toast("Le code doit faire 4 chiffres"); return; }
      const role = valeursMulti(f, "role")[0] || "membre";
      if (m && m.role === "admin" && role !== "admin" && nbAdmins <= 1) {
        toast("Il faut au moins un administrateur"); return;
      }
      if (m) {
        m.prenom = String(d.get("prenom")).trim();
        m.emoji = emojiChoisi(f, "😀");
        m.role = role;
        if (pin) m.pin = pin;
      } else {
        if (!pin) { toast("Choisissez un code à 4 chiffres"); return; }
        etat.membres.push({
          id: id(), prenom: String(d.get("prenom")).trim(), emoji: emojiChoisi(f, "😀"),
          role: role, pin: pin, creeLe: new Date().toISOString()
        });
      }
      fermerFeuille();
      sauver("membres");
      toast(m ? "Profil enregistré" : "Membre ajouté 👋");
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
      const d = new FormData(f);
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

  const html =
    '<div class="ligne" style="padding-top:0">' +
    '<span class="avatar">' + esc(moi.emoji || "🙂") + "</span>" +
    '<div class="ligne-corps"><b>' + esc(moi.prenom) + "</b><small>" +
    (estAdmin() ? "Administrateur" : "Membre") + " • " + esc(etat.famille.nom) + "</small></div>" +
    '<span class="etiquette or">' + pointsDe(moi.id) + " pts</span></div>" +
    '<p style="margin:.6rem 0 1rem">' + etatTexte + "</p>" +
    '<button class="btn plein" data-action="aller" data-vue="points" style="margin-bottom:.5rem">🌟 Points & cadeaux</button>' +
    '<button class="btn plein" data-action="aller" data-vue="recettes" style="margin-bottom:.5rem">📖 Mes recettes</button>' +
    (estAdmin()
      ? '<button class="btn plein" data-action="aller" data-vue="admin" style="margin-bottom:.5rem">⚙️ Administration</button>'
      : "") +
    '<button class="btn plein" data-action="theme" style="margin-bottom:.5rem">🌓 Thème : ' + nomTheme + "</button>" +
    '<button class="btn plein" data-role="mon-profil" style="margin-bottom:.5rem">✏️ Modifier mon profil</button>' +
    "<hr class=\"sep\">" +
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
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(f);
      const pin = String(d.get("pin") || "").trim();
      if (pin && !/^[0-9]{4}$/.test(pin)) { toast("Le code doit faire 4 chiffres"); return; }
      moi.prenom = String(d.get("prenom")).trim();
      moi.emoji = emojiChoisi(f, "😀");
      if (pin) moi.pin = pin;
      fermerFeuille();
      sauver("membres");
      toast("Profil enregistré");
    };
  });
};
