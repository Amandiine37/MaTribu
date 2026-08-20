/* =========================================================================
   BIBLIOTHEQUE DE RECETTES DE DEPART
   =========================================================================

   Ce sont les plats proposes au premier lancement, pour que le generateur
   de menus ait de quoi piocher tout de suite. Ce ne sont PAS des recettes
   copiees d'un site : uniquement le nom du plat, ses ingredients et un
   champ "lien" laisse vide.

   -> Dans l'app (Menus > Mes recettes), vous pouvez coller dans "lien"
      l'adresse de la recette Cookomix correspondante : un bouton ouvrira
      alors la vraie recette sur leur site.

   -> Vous pouvez aussi ajouter/modifier/supprimer des recettes directement
      dans l'app, sans toucher a ce fichier. Celui-ci ne sert qu'au tout
      premier demarrage d'une famille.

   Champs :
     nom          nom du plat
     emoji        petite icone
     type         "consistant" (plutot le soir/midi copieux) ou "leger"
     vegetarien   true / false
     rapide       true = moins de 30 min
     thermomix    true si le plat se prete bien au robot cuiseur
     saisons      liste parmi "printemps", "ete", "automne", "hiver".
                  Liste vide = le plat convient toute l'annee.
     lien         adresse web de la recette (a vous de la remplir)
     ingredients  liste { nom, qte, unite, rayon }
                  qte = un nombre ecrit en texte ("800", "1,2")
                  unite = "g", "kg", "cl", "l", "boite(s)"... ou "" pour un
                  simple compte (4 carottes)
   ========================================================================= */

window.RECETTES_DEPART = [
  { nom:"Blanquette de veau", emoji:"🍲", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Veau à blanquette", qte:"800", unite:"g", rayon:"Boucherie"},
    {nom:"Carottes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Champignons de Paris", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Bœuf bourguignon", emoji:"🥘", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Bœuf à mijoter", qte:"800", unite:"g", rayon:"Boucherie"},
    {nom:"Lardons", qte:"150", unite:"g", rayon:"Boucherie"},
    {nom:"Carottes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Vin rouge", qte:"50", unite:"cl", rayon:"Boissons"},
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"}]},

  { nom:"Hachis parmentier", emoji:"🥧", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Bœuf haché", qte:"500", unite:"g", rayon:"Boucherie"},
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Lasagnes bolognaise", emoji:"🍝", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Plaques à lasagnes", qte:"1", unite:"paquet(s)", rayon:"Épicerie"},
    {nom:"Bœuf haché", qte:"500", unite:"g", rayon:"Boucherie"},
    {nom:"Coulis de tomates", qte:"50", unite:"cl", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"150", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Spaghettis bolognaise", emoji:"🍝", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Spaghettis", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Bœuf haché", qte:"400", unite:"g", rayon:"Boucherie"},
    {nom:"Coulis de tomates", qte:"50", unite:"cl", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Parmesan", qte:"50", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Risotto aux champignons", emoji:"🍚", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Champignons", qte:"400", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Risotto au potiron", emoji:"🎃", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Potiron", qte:"600", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Poulet rôti et pommes de terre", emoji:"🍗", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Poulet fermier", qte:"1", unite:"", rayon:"Boucherie"},
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Ail", qte:"1", unite:"tête(s)", rayon:"Fruits & légumes"},
    {nom:"Thym", qte:"1", unite:"branche(s)", rayon:"Fruits & légumes"}]},

  { nom:"Poulet au curry et riz", emoji:"🍛", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Curry en poudre", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Poulet basquaise", emoji:"🌶️", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["ete", "automne"], lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"6", unite:"", rayon:"Boucherie"},
    {nom:"Poivrons", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Chili con carne", emoji:"🌶️", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Bœuf haché", qte:"500", unite:"g", rayon:"Boucherie"},
    {nom:"Haricots rouges", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Poivron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Curry de pois chiches", emoji:"🥘", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Pois chiches", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Épinards", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Curry en poudre", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Dahl de lentilles corail", emoji:"🍛", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Lentilles corail", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"}]},

  { nom:"Gratin dauphinois", emoji:"🥔", type:"consistant", vegetarien:true, rapide:false, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"1,2", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"40", unite:"cl", rayon:"Crèmerie"},
    {nom:"Lait", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Ail", qte:"2", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Noix de muscade", qte:"1", unite:"pincée(s)", rayon:"Épicerie"}]},

  { nom:"Gratin de courgettes", emoji:"🥒", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Courgettes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Gratin de pâtes au jambon", emoji:"🧀", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Macaronis", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Jambon blanc", qte:"4", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"120", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Quiche lorraine", emoji:"🥧", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Lardons", qte:"200", unite:"g", rayon:"Boucherie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Tarte aux légumes du soleil", emoji:"🍅", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Pâte feuilletée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Courgette", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Aubergine", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"1", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Chèvre", qte:"1", unite:"bûche(s)", rayon:"Crèmerie"}]},

  { nom:"Ratatouille", emoji:"🍆", type:"leger", vegetarien:true, rapide:false, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Aubergines", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Courgettes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Poivrons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Herbes de Provence", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Soupe de légumes maison", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Poireaux", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pommes de terre", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"}]},

  { nom:"Velouté de potimarron", emoji:"🎃", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Potimarron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pomme de terre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"10", unite:"cl", rayon:"Crèmerie"},
    {nom:"Bouillon de légumes", qte:"75", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Soupe à l'oignon gratinée", emoji:"🧅", type:"leger", vegetarien:true, rapide:false, thermomix:true, saisons:["hiver"], lien:"", ingredients:[
    {nom:"Oignons", qte:"6", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de bœuf", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Pain de campagne", qte:"4", unite:"tranche(s)", rayon:"Boulangerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Velouté de courgettes au fromage", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Courgettes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Fromage à tartiner", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"75", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Salade César", emoji:"🥗", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["printemps", "ete"], lien:"", ingredients:[
    {nom:"Laitue romaine", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Blancs de poulet", qte:"2", unite:"", rayon:"Boucherie"},
    {nom:"Parmesan", qte:"60", unite:"g", rayon:"Crèmerie"},
    {nom:"Croûtons", qte:"1", unite:"paquet(s)", rayon:"Épicerie"},
    {nom:"Sauce César", qte:"1", unite:"pot(s)", rayon:"Épicerie"}]},

  { nom:"Salade de quinoa et féta", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Quinoa", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates cerises", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Féta", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Menthe fraîche", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Salade niçoise", emoji:"🥗", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Thon en boîte", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Œufs", qte:"4", unite:"", rayon:"Crèmerie"},
    {nom:"Tomates", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Haricots verts", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Olives noires", qte:"100", unite:"g", rayon:"Épicerie"}]},

  { nom:"Croque-monsieur et salade", emoji:"🥪", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Pain de mie", qte:"8", unite:"tranche(s)", rayon:"Boulangerie"},
    {nom:"Jambon blanc", qte:"4", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Gruyère râpé", qte:"120", unite:"g", rayon:"Crèmerie"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Omelette aux herbes", emoji:"🍳", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Œufs", qte:"8", unite:"", rayon:"Crèmerie"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Ciboulette", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Beurre", qte:"20", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Quiche aux poireaux", emoji:"🥧", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Poireaux", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Saumon à l'oseille et riz", emoji:"🐟", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["printemps", "ete"], lien:"", ingredients:[
    {nom:"Pavés de saumon", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Crème liquide", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Oseille ou épinards", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Cabillaud et légumes vapeur", emoji:"🐟", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Dos de cabillaud", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Brocoli", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Papillotes de poisson au citron", emoji:"🍋", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["printemps", "ete"], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Citron", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Courgette", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Aneth", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Moules marinières et frites", emoji:"🦪", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["ete", "automne"], lien:"", ingredients:[
    {nom:"Moules", qte:"2", unite:"kg", rayon:"Poissonnerie"},
    {nom:"Vin blanc", qte:"25", unite:"cl", rayon:"Boissons"},
    {nom:"Échalotes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Frites surgelées", qte:"1", unite:"kg", rayon:"Surgelés"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Couscous poulet-merguez", emoji:"🍛", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"4", unite:"", rayon:"Boucherie"},
    {nom:"Merguez", qte:"8", unite:"", rayon:"Boucherie"},
    {nom:"Semoule", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Courgettes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pois chiches", qte:"1", unite:"boîte(s)", rayon:"Épicerie"}]},

  { nom:"Tajine de légumes", emoji:"🥘", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Courgettes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pois chiches", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Abricots secs", qte:"100", unite:"g", rayon:"Épicerie"},
    {nom:"Semoule", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Ras el-hanout", qte:"2", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Pizza maison", emoji:"🍕", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Pâte à pizza", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Coulis de tomates", qte:"25", unite:"cl", rayon:"Épicerie"},
    {nom:"Mozzarella", qte:"250", unite:"g", rayon:"Crèmerie"},
    {nom:"Champignons", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Origan", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Galettes de sarrasin", emoji:"🥞", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Farine de sarrasin", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Œufs", qte:"6", unite:"", rayon:"Crèmerie"},
    {nom:"Jambon blanc", qte:"4", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Gruyère râpé", qte:"120", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Tartiflette", emoji:"🧀", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["hiver"], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"1,2", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Reblochon", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Lardons", qte:"200", unite:"g", rayon:"Boucherie"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"10", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Endives au jambon", emoji:"🥬", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Endives", qte:"8", unite:"", rayon:"Fruits & légumes"},
    {nom:"Jambon blanc", qte:"8", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Poêlée de gnocchis aux légumes", emoji:"🥔", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Gnocchis", qte:"700", unite:"g", rayon:"Crèmerie"},
    {nom:"Courgette", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates cerises", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Mozzarella", qte:"125", unite:"g", rayon:"Crèmerie"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Pâtes carbonara", emoji:"🍝", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Tagliatelles", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Lardons", qte:"200", unite:"g", rayon:"Boucherie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Pâtes au pesto et tomates", emoji:"🌿", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Penne", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Pesto", qte:"1", unite:"pot(s)", rayon:"Épicerie"},
    {nom:"Tomates cerises", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Pignons de pin", qte:"50", unite:"g", rayon:"Épicerie"}]},

  { nom:"Rôti de porc et haricots verts", emoji:"🍖", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["ete", "automne"], lien:"", ingredients:[
    {nom:"Rôti de porc", qte:"1", unite:"kg", rayon:"Boucherie"},
    {nom:"Haricots verts", qte:"600", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"1", unite:"c. à soupe", rayon:"Épicerie"}]},

  { nom:"Saucisses et purée maison", emoji:"🌭", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Saucisses", qte:"6", unite:"", rayon:"Boucherie"},
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"50", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Boulettes de bœuf à la tomate", emoji:"🍖", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Bœuf haché", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Chapelure", qte:"50", unite:"g", rayon:"Épicerie"},
    {nom:"Coulis de tomates", qte:"50", unite:"cl", rayon:"Épicerie"},
    {nom:"Œuf", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Spaghettis", qte:"400", unite:"g", rayon:"Épicerie"}]},

  { nom:"Wok de légumes et nouilles", emoji:"🥡", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Nouilles chinoises", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Poivron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pousses de soja", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Sauce soja", qte:"5", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Croque-tartines chèvre-miel", emoji:"🍯", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Pain de campagne", qte:"8", unite:"tranche(s)", rayon:"Boulangerie"},
    {nom:"Chèvre", qte:"2", unite:"bûche(s)", rayon:"Crèmerie"},
    {nom:"Miel", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Noix", qte:"50", unite:"g", rayon:"Épicerie"}]},

  { nom:"Parmentier de poisson", emoji:"🐟", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"600", unite:"g", rayon:"Poissonnerie"},
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Poireau", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Tarte à la tomate et moutarde", emoji:"🍅", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Pâte feuilletée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Tomates", qte:"5", unite:"", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Gruyère râpé", qte:"80", unite:"g", rayon:"Crèmerie"},
    {nom:"Herbes de Provence", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Bowl poulet-avocat", emoji:"🥑", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"2", unite:"", rayon:"Boucherie"},
    {nom:"Riz", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Avocats", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Maïs", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Citron vert", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  /* ---------------- Soupes et veloutés (le robot excelle ici) ---------------- */

  { nom:"Velouté de carottes au cumin", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Carottes", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Pomme de terre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Cumin", qte:"1", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Bouillon de légumes", qte:"75", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Soupe de tomates au basilic", emoji:"🍅", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Tomates", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Ail", qte:"2", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"10", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Velouté de brocoli", emoji:"🥦", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Brocoli", qte:"600", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Pomme de terre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"70", unite:"cl", rayon:"Épicerie"},
    {nom:"Crème liquide", qte:"10", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Velouté de champignons", emoji:"🍄", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne"], lien:"", ingredients:[
    {nom:"Champignons de Paris", qte:"500", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de volaille", qte:"60", unite:"cl", rayon:"Épicerie"},
    {nom:"Crème fraîche", qte:"15", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Gaspacho andalou", emoji:"🥒", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Tomates", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Poivron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Ail", qte:"1", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Huile d'olive", qte:"5", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Velouté de petits pois à la menthe", emoji:"🌱", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["printemps"], lien:"", ingredients:[
    {nom:"Petits pois", qte:"600", unite:"g", rayon:"Surgelés"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Menthe fraîche", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"60", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Soupe de lentilles corail et carottes", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Lentilles corail", qte:"200", unite:"g", rayon:"Épicerie"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait de coco", qte:"20", unite:"cl", rayon:"Épicerie"},
    {nom:"Curry en poudre", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Soupe de courgettes au curry", emoji:"🥒", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Courgettes", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Curry en poudre", qte:"1", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Bouillon de légumes", qte:"50", unite:"cl", rayon:"Épicerie"}]},

  /* ---------------- Risottos et plats mijotés au robot ---------------- */

  { nom:"Risotto aux asperges", emoji:"🍚", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["printemps"], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Asperges vertes", qte:"500", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Risotto tomate-mozzarella", emoji:"🍚", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Tomates cerises", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Mozzarella", qte:"250", unite:"g", rayon:"Crèmerie"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Risotto aux épinards", emoji:"🍚", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["printemps"], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Épinards", qte:"400", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"60", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Risotto aux crevettes", emoji:"🍤", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Crevettes décortiquées", qte:"300", unite:"g", rayon:"Poissonnerie"},
    {nom:"Échalote", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Vin blanc", qte:"10", unite:"cl", rayon:"Boissons"},
    {nom:"Bouillon de poisson", qte:"1", unite:"l", rayon:"Épicerie"}]},

  { nom:"One-pot pâtes tomate-mozzarella", emoji:"🍝", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Penne", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Tomates cerises", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Mozzarella", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Ail", qte:"2", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Bœuf Stroganoff", emoji:"🥘", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Bœuf à mijoter", qte:"700", unite:"g", rayon:"Boucherie"},
    {nom:"Champignons de Paris", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Moutarde", qte:"1", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Tagliatelles", qte:"400", unite:"g", rayon:"Épicerie"}]},

  { nom:"Poulet tikka masala", emoji:"🍛", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"700", unite:"g", rayon:"Boucherie"},
    {nom:"Tomates concassées", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Yaourt nature", qte:"2", unite:"pot(s)", rayon:"Crèmerie"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"},
    {nom:"Garam masala", qte:"2", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Curry de légumes au lait de coco", emoji:"🥘", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Chou-fleur", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pâte de curry", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Gratin de chou-fleur béchamel", emoji:"🧀", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Chou-fleur", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"},
    {nom:"Farine", qte:"40", unite:"g", rayon:"Épicerie"},
    {nom:"Gruyère râpé", qte:"120", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Houmous et légumes croquants", emoji:"🫘", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Pois chiches", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Tahini", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pain pita", qte:"4", unite:"", rayon:"Boulangerie"}]},

  /* ---------------- Viandes ---------------- */

  { nom:"Poulet au citron et olives", emoji:"🍗", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"6", unite:"", rayon:"Boucherie"},
    {nom:"Citron", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Olives vertes", qte:"150", unite:"g", rayon:"Épicerie"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Semoule", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Poulet à la moutarde", emoji:"🍗", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Moutarde", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Escalopes à la crème et champignons", emoji:"🍖", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Escalopes de dinde", qte:"4", unite:"", rayon:"Boucherie"},
    {nom:"Champignons de Paris", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Tagliatelles", qte:"400", unite:"g", rayon:"Épicerie"}]},

  { nom:"Sauté de veau aux olives", emoji:"🥘", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Sauté de veau", qte:"800", unite:"g", rayon:"Boucherie"},
    {nom:"Olives noires", qte:"120", unite:"g", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Filet mignon aux pommes", emoji:"🍖", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne"], lien:"", ingredients:[
    {nom:"Filet mignon de porc", qte:"800", unite:"g", rayon:"Boucherie"},
    {nom:"Pommes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"15", unite:"cl", rayon:"Crèmerie"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"}]},

  { nom:"Brochettes de poulet mariné", emoji:"🍢", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Poivrons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Courgette", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Semoule", qte:"250", unite:"g", rayon:"Épicerie"}]},

  { nom:"Burgers maison", emoji:"🍔", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Steaks hachés", qte:"4", unite:"", rayon:"Boucherie"},
    {nom:"Pains à burger", qte:"4", unite:"", rayon:"Boulangerie"},
    {nom:"Cheddar", qte:"4", unite:"tranche(s)", rayon:"Crèmerie"},
    {nom:"Tomate", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Frites surgelées", qte:"800", unite:"g", rayon:"Surgelés"}]},

  { nom:"Rôti de bœuf et gratin de chou-fleur", emoji:"🥩", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["hiver"], lien:"", ingredients:[
    {nom:"Rôti de bœuf", qte:"1", unite:"kg", rayon:"Boucherie"},
    {nom:"Chou-fleur", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Nouilles sautées au bœuf", emoji:"🥡", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Bœuf émincé", qte:"500", unite:"g", rayon:"Boucherie"},
    {nom:"Nouilles chinoises", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Poivron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Sauce soja", qte:"5", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Riz cantonais", emoji:"🍚", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Jambon blanc", qte:"3", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Petits pois", qte:"200", unite:"g", rayon:"Surgelés"},
    {nom:"Sauce soja", qte:"3", unite:"c. à soupe", rayon:"Épicerie"}]},

  { nom:"Pad thaï aux crevettes", emoji:"🍜", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Nouilles de riz", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Crevettes décortiquées", qte:"300", unite:"g", rayon:"Poissonnerie"},
    {nom:"Œufs", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Pousses de soja", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Cacahuètes", qte:"60", unite:"g", rayon:"Épicerie"},
    {nom:"Citron vert", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Paella express", emoji:"🥘", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Riz rond", qte:"350", unite:"g", rayon:"Épicerie"},
    {nom:"Cuisses de poulet", qte:"4", unite:"", rayon:"Boucherie"},
    {nom:"Fruits de mer surgelés", qte:"400", unite:"g", rayon:"Surgelés"},
    {nom:"Poivrons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Petits pois", qte:"150", unite:"g", rayon:"Surgelés"},
    {nom:"Safran", qte:"1", unite:"sachet(s)", rayon:"Épicerie"}]},

  /* ---------------- Poissons ---------------- */

  { nom:"Dos de cabillaud sauce citron", emoji:"🐟", type:"leger", vegetarien:false, rapide:true, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Dos de cabillaud", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Citron", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Beurre", qte:"60", unite:"g", rayon:"Crèmerie"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Gratin de poisson aux poireaux", emoji:"🐟", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"600", unite:"g", rayon:"Poissonnerie"},
    {nom:"Poireaux", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"40", unite:"cl", rayon:"Crèmerie"},
    {nom:"Farine", qte:"30", unite:"g", rayon:"Épicerie"},
    {nom:"Gruyère râpé", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Tartare de saumon à l'aneth", emoji:"🍣", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["printemps", "ete"], lien:"", ingredients:[
    {nom:"Saumon très frais", qte:"500", unite:"g", rayon:"Poissonnerie"},
    {nom:"Aneth", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Citron vert", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pain de campagne", qte:"4", unite:"tranche(s)", rayon:"Boulangerie"}]},

  { nom:"Sardines grillées et salade", emoji:"🐟", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Sardines", qte:"12", unite:"", rayon:"Poissonnerie"},
    {nom:"Tomates", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Laitue", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pain de campagne", qte:"4", unite:"tranche(s)", rayon:"Boulangerie"}]},

  { nom:"Truite aux amandes", emoji:"🐟", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["printemps"], lien:"", ingredients:[
    {nom:"Truites", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Amandes effilées", qte:"80", unite:"g", rayon:"Épicerie"},
    {nom:"Beurre", qte:"60", unite:"g", rayon:"Crèmerie"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"}]},

  { nom:"Spaghettis aux fruits de mer", emoji:"🍝", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Spaghettis", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Fruits de mer surgelés", qte:"500", unite:"g", rayon:"Surgelés"},
    {nom:"Ail", qte:"2", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Vin blanc", qte:"10", unite:"cl", rayon:"Boissons"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  /* ---------------- Végétarien ---------------- */

  { nom:"Chili sin carne", emoji:"🌶️", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Haricots rouges", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Poivron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Maïs", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Galettes de lentilles", emoji:"🫘", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Lentilles vertes", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Carotte", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Chapelure", qte:"60", unite:"g", rayon:"Épicerie"},
    {nom:"Œuf", qte:"1", unite:"", rayon:"Crèmerie"}]},

  { nom:"Buddha bowl aux falafels", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Pois chiches", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Boulgour", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates cerises", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Yaourt nature", qte:"1", unite:"pot(s)", rayon:"Crèmerie"},
    {nom:"Menthe fraîche", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Lasagnes aux légumes", emoji:"🍝", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Plaques à lasagnes", qte:"1", unite:"paquet(s)", rayon:"Épicerie"},
    {nom:"Courgettes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Aubergine", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Coulis de tomates", qte:"50", unite:"cl", rayon:"Épicerie"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"150", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Aubergines farcies", emoji:"🍆", type:"consistant", vegetarien:true, rapide:false, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Aubergines", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"200", unite:"g", rayon:"Épicerie"},
    {nom:"Tomates", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Féta", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Pignons de pin", qte:"40", unite:"g", rayon:"Épicerie"}]},

  { nom:"Quinoa aux légumes rôtis", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["automne"], lien:"", ingredients:[
    {nom:"Quinoa", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Potimarron", qte:"600", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon rouge", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Féta", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Noix", qte:"50", unite:"g", rayon:"Épicerie"}]},

  { nom:"Tortilla espagnole", emoji:"🍳", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"700", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"6", unite:"", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Huile d'olive", qte:"5", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Galettes de pommes de terre", emoji:"🥔", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Farine", qte:"50", unite:"g", rayon:"Épicerie"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Tarte fine aux oignons", emoji:"🧅", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Pâte feuilletée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Oignons", qte:"5", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"10", unite:"cl", rayon:"Crèmerie"},
    {nom:"Thym", qte:"1", unite:"branche(s)", rayon:"Fruits & légumes"}]},

  { nom:"Tarte rustique aux champignons", emoji:"🍄", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["automne"], lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Champignons de Paris", qte:"400", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"15", unite:"cl", rayon:"Crèmerie"},
    {nom:"Échalote", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Salade de lentilles et féta", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["printemps"], lien:"", ingredients:[
    {nom:"Lentilles vertes", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Féta", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Radis", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Gratin de blettes", emoji:"🥬", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["printemps", "automne"], lien:"", ingredients:[
    {nom:"Blettes", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"},
    {nom:"Farine", qte:"40", unite:"g", rayon:"Épicerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Soupe au pistou", emoji:"🥣", type:"leger", vegetarien:true, rapide:false, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Haricots verts", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Courgette", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Coquillettes", qte:"150", unite:"g", rayon:"Épicerie"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Parmesan", qte:"60", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Pommes de terre farcies au fromage", emoji:"🥔", type:"consistant", vegetarien:true, rapide:false, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Grosses pommes de terre", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Fromage à raclette", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"10", unite:"cl", rayon:"Crèmerie"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Poêlée de légumes d'hiver", emoji:"🥕", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["hiver"], lien:"", ingredients:[
    {nom:"Panais", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Navets", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pommes de terre", qte:"500", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Lardons", qte:"150", unite:"g", rayon:"Boucherie"}]},

  { nom:"Salade de chou croquante", emoji:"🥬", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Chou blanc", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Raisins secs", qte:"60", unite:"g", rayon:"Épicerie"},
    {nom:"Yaourt nature", qte:"1", unite:"pot(s)", rayon:"Crèmerie"},
    {nom:"Moutarde", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Crêpes salées complètes", emoji:"🥞", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Farine", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Jambon blanc", qte:"4", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Gruyère râpé", qte:"120", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Clafoutis de tomates cerises", emoji:"🍅", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], lien:"", ingredients:[
    {nom:"Tomates cerises", qte:"400", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Lait", qte:"25", unite:"cl", rayon:"Crèmerie"},
    {nom:"Farine", qte:"80", unite:"g", rayon:"Épicerie"},
    {nom:"Chèvre", qte:"1", unite:"bûche(s)", rayon:"Crèmerie"}]},

  { nom:"Soupe thaï au poulet", emoji:"🍜", type:"leger", vegetarien:false, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"400", unite:"g", rayon:"Boucherie"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Nouilles de riz", qte:"200", unite:"g", rayon:"Épicerie"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"},
    {nom:"Citron vert", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Coriandre", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Boulettes de poulet à l'indienne", emoji:"🍖", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Poulet haché", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Chapelure", qte:"50", unite:"g", rayon:"Épicerie"},
    {nom:"Lait de coco", qte:"25", unite:"cl", rayon:"Épicerie"},
    {nom:"Curry en poudre", qte:"2", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Gratin de ravioles aux épinards", emoji:"🧀", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["printemps"], lien:"", ingredients:[
    {nom:"Ravioles", qte:"6", unite:"paquet(s)", rayon:"Crèmerie"},
    {nom:"Épinards", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"25", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Cari de poisson créole", emoji:"🐟", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"600", unite:"g", rayon:"Poissonnerie"},
    {nom:"Tomates", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Curcuma", qte:"1", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Salade de pâtes au thon", emoji:"🥗", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Farfalle", qte:"350", unite:"g", rayon:"Épicerie"},
    {nom:"Thon en boîte", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Tomates cerises", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Maïs", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Olives noires", qte:"80", unite:"g", rayon:"Épicerie"}]},

  { nom:"Quiche au saumon et poireaux", emoji:"🥧", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Saumon fumé", qte:"150", unite:"g", rayon:"Poissonnerie"},
    {nom:"Poireaux", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Chakchouka", emoji:"🍳", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], lien:"", ingredients:[
    {nom:"Poivrons", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"5", unite:"", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"4", unite:"", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Cumin", qte:"1", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Pain de campagne", qte:"4", unite:"tranche(s)", rayon:"Boulangerie"}]},

  { nom:"Poulet rôti aux herbes et légumes racines", emoji:"🍗", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Poulet fermier", qte:"1", unite:"", rayon:"Boucherie"},
    {nom:"Panais", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Navets", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Romarin", qte:"2", unite:"branche(s)", rayon:"Fruits & légumes"}]},

  { nom:"Velouté de butternut au lard", emoji:"🎃", type:"leger", vegetarien:false, rapide:true, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Courge butternut", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lardons", qte:"150", unite:"g", rayon:"Boucherie"},
    {nom:"Bouillon de volaille", qte:"70", unite:"cl", rayon:"Épicerie"},
    {nom:"Crème liquide", qte:"10", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Pizza blanche chèvre-miel", emoji:"🍕", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:[], lien:"", ingredients:[
    {nom:"Pâte à pizza", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Chèvre", qte:"2", unite:"bûche(s)", rayon:"Crèmerie"},
    {nom:"Miel", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Noix", qte:"50", unite:"g", rayon:"Épicerie"}]},

  { nom:"Blanquette de poisson", emoji:"🐟", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"700", unite:"g", rayon:"Poissonnerie"},
    {nom:"Poireaux", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Wraps poulet-crudités", emoji:"🌯", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:[], lien:"", ingredients:[
    {nom:"Tortillas", qte:"4", unite:"", rayon:"Boulangerie"},
    {nom:"Blancs de poulet", qte:"400", unite:"g", rayon:"Boucherie"},
    {nom:"Laitue", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomate", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Yaourt nature", qte:"1", unite:"pot(s)", rayon:"Crèmerie"}]},

  { nom:"Poêlée de pommes de terre et saucisse fumée", emoji:"🥔", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Saucisse fumée", qte:"400", unite:"g", rayon:"Boucherie"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Rôti de porc aux pruneaux", emoji:"🍖", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], lien:"", ingredients:[
    {nom:"Rôti de porc", qte:"1", unite:"kg", rayon:"Boucherie"},
    {nom:"Pruneaux", qte:"200", unite:"g", rayon:"Épicerie"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"15", unite:"cl", rayon:"Crèmerie"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"}]}
];
