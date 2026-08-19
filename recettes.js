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
     lien         adresse web de la recette (a vous de la remplir)
     ingredients  liste { nom, qte, rayon }
   ========================================================================= */

window.RECETTES_DEPART = [
  { nom:"Blanquette de veau", emoji:"🍲", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Veau à blanquette", qte:"800 g", rayon:"Boucherie"},
    {nom:"Carottes", qte:"4", rayon:"Fruits & légumes"},
    {nom:"Champignons de Paris", qte:"250 g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"20 cl", rayon:"Crèmerie"},
    {nom:"Riz", qte:"300 g", rayon:"Épicerie"}]},

  { nom:"Bœuf bourguignon", emoji:"🥘", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Bœuf à mijoter", qte:"800 g", rayon:"Boucherie"},
    {nom:"Lardons", qte:"150 g", rayon:"Boucherie"},
    {nom:"Carottes", qte:"4", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Vin rouge", qte:"50 cl", rayon:"Boissons"},
    {nom:"Pommes de terre", qte:"1 kg", rayon:"Fruits & légumes"}]},

  { nom:"Hachis parmentier", emoji:"🥧", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Bœuf haché", qte:"500 g", rayon:"Boucherie"},
    {nom:"Pommes de terre", qte:"1 kg", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"20 cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100 g", rayon:"Crèmerie"}]},

  { nom:"Lasagnes bolognaise", emoji:"🍝", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Plaques à lasagnes", qte:"1 paquet", rayon:"Épicerie"},
    {nom:"Bœuf haché", qte:"500 g", rayon:"Boucherie"},
    {nom:"Coulis de tomates", qte:"50 cl", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"50 cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"150 g", rayon:"Crèmerie"}]},

  { nom:"Spaghettis bolognaise", emoji:"🍝", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Spaghettis", qte:"400 g", rayon:"Épicerie"},
    {nom:"Bœuf haché", qte:"400 g", rayon:"Boucherie"},
    {nom:"Coulis de tomates", qte:"50 cl", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Parmesan", qte:"50 g", rayon:"Crèmerie"}]},

  { nom:"Risotto aux champignons", emoji:"🍚", type:"consistant", vegetarien:true, rapide:false, lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320 g", rayon:"Épicerie"},
    {nom:"Champignons", qte:"400 g", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1 l", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"80 g", rayon:"Crèmerie"}]},

  { nom:"Risotto au potiron", emoji:"🎃", type:"consistant", vegetarien:true, rapide:false, lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320 g", rayon:"Épicerie"},
    {nom:"Potiron", qte:"600 g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1 l", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"80 g", rayon:"Crèmerie"}]},

  { nom:"Poulet rôti et pommes de terre", emoji:"🍗", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Poulet fermier", qte:"1", rayon:"Boucherie"},
    {nom:"Pommes de terre", qte:"1 kg", rayon:"Fruits & légumes"},
    {nom:"Ail", qte:"1 tête", rayon:"Fruits & légumes"},
    {nom:"Thym", qte:"1 branche", rayon:"Fruits & légumes"}]},

  { nom:"Poulet au curry et riz", emoji:"🍛", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"600 g", rayon:"Boucherie"},
    {nom:"Lait de coco", qte:"40 cl", rayon:"Épicerie"},
    {nom:"Curry en poudre", qte:"2 c. à soupe", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Riz basmati", qte:"300 g", rayon:"Épicerie"}]},

  { nom:"Poulet basquaise", emoji:"🌶️", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"6", rayon:"Boucherie"},
    {nom:"Poivrons", qte:"3", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"4", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300 g", rayon:"Épicerie"}]},

  { nom:"Chili con carne", emoji:"🌶️", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Bœuf haché", qte:"500 g", rayon:"Boucherie"},
    {nom:"Haricots rouges", qte:"1 boîte", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"400 g", rayon:"Épicerie"},
    {nom:"Poivron", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300 g", rayon:"Épicerie"}]},

  { nom:"Curry de pois chiches", emoji:"🥘", type:"consistant", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Pois chiches", qte:"2 boîtes", rayon:"Épicerie"},
    {nom:"Lait de coco", qte:"40 cl", rayon:"Épicerie"},
    {nom:"Épinards", qte:"200 g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Curry en poudre", qte:"2 c. à soupe", rayon:"Épicerie"},
    {nom:"Riz basmati", qte:"300 g", rayon:"Épicerie"}]},

  { nom:"Dahl de lentilles corail", emoji:"🍛", type:"consistant", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Lentilles corail", qte:"300 g", rayon:"Épicerie"},
    {nom:"Lait de coco", qte:"40 cl", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"400 g", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Gingembre", qte:"1 morceau", rayon:"Fruits & légumes"}]},

  { nom:"Gratin dauphinois", emoji:"🥔", type:"consistant", vegetarien:true, rapide:false, lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"1,2 kg", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"40 cl", rayon:"Crèmerie"},
    {nom:"Lait", qte:"20 cl", rayon:"Crèmerie"},
    {nom:"Ail", qte:"2 gousses", rayon:"Fruits & légumes"},
    {nom:"Noix de muscade", qte:"1 pincée", rayon:"Épicerie"}]},

  { nom:"Gratin de courgettes", emoji:"🥒", type:"consistant", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Courgettes", qte:"4", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"20 cl", rayon:"Crèmerie"},
    {nom:"Œufs", qte:"3", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100 g", rayon:"Crèmerie"}]},

  { nom:"Gratin de pâtes au jambon", emoji:"🧀", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Macaronis", qte:"400 g", rayon:"Épicerie"},
    {nom:"Jambon blanc", qte:"4 tranches", rayon:"Boucherie"},
    {nom:"Lait", qte:"50 cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40 g", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"120 g", rayon:"Crèmerie"}]},

  { nom:"Quiche lorraine", emoji:"🥧", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", rayon:"Crèmerie"},
    {nom:"Lardons", qte:"200 g", rayon:"Boucherie"},
    {nom:"Œufs", qte:"3", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20 cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"80 g", rayon:"Crèmerie"}]},

  { nom:"Tarte aux légumes du soleil", emoji:"🍅", type:"leger", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Pâte feuilletée", qte:"1", rayon:"Crèmerie"},
    {nom:"Courgette", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"3", rayon:"Fruits & légumes"},
    {nom:"Aubergine", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"1 c. à soupe", rayon:"Épicerie"},
    {nom:"Chèvre", qte:"1 bûche", rayon:"Crèmerie"}]},

  { nom:"Ratatouille", emoji:"🍆", type:"leger", vegetarien:true, rapide:false, lien:"", ingredients:[
    {nom:"Aubergines", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Courgettes", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Poivrons", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"4", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Herbes de Provence", qte:"1 c. à café", rayon:"Épicerie"}]},

  { nom:"Soupe de légumes maison", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Poireaux", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", rayon:"Fruits & légumes"},
    {nom:"Pommes de terre", qte:"3", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1 l", rayon:"Épicerie"}]},

  { nom:"Velouté de potimarron", emoji:"🎃", type:"leger", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Potimarron", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Pomme de terre", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"10 cl", rayon:"Crèmerie"},
    {nom:"Bouillon de légumes", qte:"75 cl", rayon:"Épicerie"}]},

  { nom:"Soupe à l'oignon gratinée", emoji:"🧅", type:"leger", vegetarien:true, rapide:false, lien:"", ingredients:[
    {nom:"Oignons", qte:"6", rayon:"Fruits & légumes"},
    {nom:"Bouillon de bœuf", qte:"1 l", rayon:"Épicerie"},
    {nom:"Pain de campagne", qte:"4 tranches", rayon:"Boulangerie"},
    {nom:"Gruyère râpé", qte:"100 g", rayon:"Crèmerie"}]},

  { nom:"Velouté de courgettes au fromage", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Courgettes", qte:"4", rayon:"Fruits & légumes"},
    {nom:"Fromage à tartiner", qte:"150 g", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"75 cl", rayon:"Épicerie"}]},

  { nom:"Salade César", emoji:"🥗", type:"leger", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Laitue romaine", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Blancs de poulet", qte:"2", rayon:"Boucherie"},
    {nom:"Parmesan", qte:"60 g", rayon:"Crèmerie"},
    {nom:"Croûtons", qte:"1 paquet", rayon:"Épicerie"},
    {nom:"Sauce César", qte:"1 pot", rayon:"Épicerie"}]},

  { nom:"Salade de quinoa et féta", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Quinoa", qte:"250 g", rayon:"Épicerie"},
    {nom:"Concombre", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Tomates cerises", qte:"250 g", rayon:"Fruits & légumes"},
    {nom:"Féta", qte:"200 g", rayon:"Crèmerie"},
    {nom:"Menthe fraîche", qte:"1 bouquet", rayon:"Fruits & légumes"}]},

  { nom:"Salade niçoise", emoji:"🥗", type:"leger", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Thon en boîte", qte:"2 boîtes", rayon:"Épicerie"},
    {nom:"Œufs", qte:"4", rayon:"Crèmerie"},
    {nom:"Tomates", qte:"3", rayon:"Fruits & légumes"},
    {nom:"Haricots verts", qte:"250 g", rayon:"Fruits & légumes"},
    {nom:"Olives noires", qte:"100 g", rayon:"Épicerie"}]},

  { nom:"Croque-monsieur et salade", emoji:"🥪", type:"leger", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Pain de mie", qte:"8 tranches", rayon:"Boulangerie"},
    {nom:"Jambon blanc", qte:"4 tranches", rayon:"Boucherie"},
    {nom:"Gruyère râpé", qte:"120 g", rayon:"Crèmerie"},
    {nom:"Salade verte", qte:"1", rayon:"Fruits & légumes"}]},

  { nom:"Omelette aux herbes", emoji:"🍳", type:"leger", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Œufs", qte:"8", rayon:"Crèmerie"},
    {nom:"Persil", qte:"1 bouquet", rayon:"Fruits & légumes"},
    {nom:"Ciboulette", qte:"1 bouquet", rayon:"Fruits & légumes"},
    {nom:"Beurre", qte:"20 g", rayon:"Crèmerie"}]},

  { nom:"Quiche aux poireaux", emoji:"🥧", type:"consistant", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", rayon:"Crèmerie"},
    {nom:"Poireaux", qte:"3", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"3", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20 cl", rayon:"Crèmerie"}]},

  { nom:"Saumon à l'oseille et riz", emoji:"🐟", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Pavés de saumon", qte:"4", rayon:"Poissonnerie"},
    {nom:"Crème liquide", qte:"20 cl", rayon:"Crèmerie"},
    {nom:"Oseille ou épinards", qte:"200 g", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300 g", rayon:"Épicerie"}]},

  { nom:"Cabillaud et légumes vapeur", emoji:"🐟", type:"leger", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Dos de cabillaud", qte:"4", rayon:"Poissonnerie"},
    {nom:"Brocoli", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", rayon:"Fruits & légumes"},
    {nom:"Citron", qte:"1", rayon:"Fruits & légumes"}]},

  { nom:"Papillotes de poisson au citron", emoji:"🍋", type:"leger", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"4", rayon:"Poissonnerie"},
    {nom:"Citron", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Courgette", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Aneth", qte:"1 bouquet", rayon:"Fruits & légumes"}]},

  { nom:"Moules marinières et frites", emoji:"🦪", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Moules", qte:"2 kg", rayon:"Poissonnerie"},
    {nom:"Vin blanc", qte:"25 cl", rayon:"Boissons"},
    {nom:"Échalotes", qte:"3", rayon:"Fruits & légumes"},
    {nom:"Frites surgelées", qte:"1 kg", rayon:"Surgelés"},
    {nom:"Persil", qte:"1 bouquet", rayon:"Fruits & légumes"}]},

  { nom:"Couscous poulet-merguez", emoji:"🍛", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"4", rayon:"Boucherie"},
    {nom:"Merguez", qte:"8", rayon:"Boucherie"},
    {nom:"Semoule", qte:"400 g", rayon:"Épicerie"},
    {nom:"Courgettes", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", rayon:"Fruits & légumes"},
    {nom:"Pois chiches", qte:"1 boîte", rayon:"Épicerie"}]},

  { nom:"Tajine de légumes", emoji:"🥘", type:"consistant", vegetarien:true, rapide:false, lien:"", ingredients:[
    {nom:"Courgettes", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", rayon:"Fruits & légumes"},
    {nom:"Pois chiches", qte:"1 boîte", rayon:"Épicerie"},
    {nom:"Abricots secs", qte:"100 g", rayon:"Épicerie"},
    {nom:"Semoule", qte:"300 g", rayon:"Épicerie"},
    {nom:"Ras el-hanout", qte:"2 c. à café", rayon:"Épicerie"}]},

  { nom:"Pizza maison", emoji:"🍕", type:"consistant", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Pâte à pizza", qte:"2", rayon:"Crèmerie"},
    {nom:"Coulis de tomates", qte:"25 cl", rayon:"Épicerie"},
    {nom:"Mozzarella", qte:"250 g", rayon:"Crèmerie"},
    {nom:"Champignons", qte:"200 g", rayon:"Fruits & légumes"},
    {nom:"Origan", qte:"1 c. à café", rayon:"Épicerie"}]},

  { nom:"Galettes de sarrasin", emoji:"🥞", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Farine de sarrasin", qte:"250 g", rayon:"Épicerie"},
    {nom:"Œufs", qte:"6", rayon:"Crèmerie"},
    {nom:"Jambon blanc", qte:"4 tranches", rayon:"Boucherie"},
    {nom:"Gruyère râpé", qte:"120 g", rayon:"Crèmerie"}]},

  { nom:"Tartiflette", emoji:"🧀", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"1,2 kg", rayon:"Fruits & légumes"},
    {nom:"Reblochon", qte:"1", rayon:"Crèmerie"},
    {nom:"Lardons", qte:"200 g", rayon:"Boucherie"},
    {nom:"Oignons", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"10 cl", rayon:"Crèmerie"}]},

  { nom:"Endives au jambon", emoji:"🥬", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Endives", qte:"8", rayon:"Fruits & légumes"},
    {nom:"Jambon blanc", qte:"8 tranches", rayon:"Boucherie"},
    {nom:"Lait", qte:"50 cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40 g", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100 g", rayon:"Crèmerie"}]},

  { nom:"Poêlée de gnocchis aux légumes", emoji:"🥔", type:"consistant", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Gnocchis", qte:"700 g", rayon:"Crèmerie"},
    {nom:"Courgette", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Tomates cerises", qte:"250 g", rayon:"Fruits & légumes"},
    {nom:"Mozzarella", qte:"125 g", rayon:"Crèmerie"},
    {nom:"Basilic", qte:"1 bouquet", rayon:"Fruits & légumes"}]},

  { nom:"Pâtes carbonara", emoji:"🍝", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Tagliatelles", qte:"400 g", rayon:"Épicerie"},
    {nom:"Lardons", qte:"200 g", rayon:"Boucherie"},
    {nom:"Œufs", qte:"3", rayon:"Crèmerie"},
    {nom:"Parmesan", qte:"80 g", rayon:"Crèmerie"}]},

  { nom:"Pâtes au pesto et tomates", emoji:"🌿", type:"leger", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Penne", qte:"400 g", rayon:"Épicerie"},
    {nom:"Pesto", qte:"1 pot", rayon:"Épicerie"},
    {nom:"Tomates cerises", qte:"250 g", rayon:"Fruits & légumes"},
    {nom:"Pignons de pin", qte:"50 g", rayon:"Épicerie"}]},

  { nom:"Rôti de porc et haricots verts", emoji:"🍖", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Rôti de porc", qte:"1 kg", rayon:"Boucherie"},
    {nom:"Haricots verts", qte:"600 g", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"1 c. à soupe", rayon:"Épicerie"}]},

  { nom:"Saucisses et purée maison", emoji:"🌭", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Saucisses", qte:"6", rayon:"Boucherie"},
    {nom:"Pommes de terre", qte:"1 kg", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"20 cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"50 g", rayon:"Crèmerie"}]},

  { nom:"Boulettes de bœuf à la tomate", emoji:"🍖", type:"consistant", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Bœuf haché", qte:"600 g", rayon:"Boucherie"},
    {nom:"Chapelure", qte:"50 g", rayon:"Épicerie"},
    {nom:"Coulis de tomates", qte:"50 cl", rayon:"Épicerie"},
    {nom:"Œuf", qte:"1", rayon:"Crèmerie"},
    {nom:"Spaghettis", qte:"400 g", rayon:"Épicerie"}]},

  { nom:"Wok de légumes et nouilles", emoji:"🥡", type:"leger", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Nouilles chinoises", qte:"300 g", rayon:"Épicerie"},
    {nom:"Carottes", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Poivron", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Pousses de soja", qte:"200 g", rayon:"Fruits & légumes"},
    {nom:"Sauce soja", qte:"5 cl", rayon:"Épicerie"}]},

  { nom:"Croque-tartines chèvre-miel", emoji:"🍯", type:"leger", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Pain de campagne", qte:"8 tranches", rayon:"Boulangerie"},
    {nom:"Chèvre", qte:"2 bûches", rayon:"Crèmerie"},
    {nom:"Miel", qte:"2 c. à soupe", rayon:"Épicerie"},
    {nom:"Salade verte", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Noix", qte:"50 g", rayon:"Épicerie"}]},

  { nom:"Parmentier de poisson", emoji:"🐟", type:"consistant", vegetarien:false, rapide:false, lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"600 g", rayon:"Poissonnerie"},
    {nom:"Pommes de terre", qte:"1 kg", rayon:"Fruits & légumes"},
    {nom:"Poireau", qte:"1", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"20 cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"80 g", rayon:"Crèmerie"}]},

  { nom:"Tarte à la tomate et moutarde", emoji:"🍅", type:"leger", vegetarien:true, rapide:true, lien:"", ingredients:[
    {nom:"Pâte feuilletée", qte:"1", rayon:"Crèmerie"},
    {nom:"Tomates", qte:"5", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"2 c. à soupe", rayon:"Épicerie"},
    {nom:"Gruyère râpé", qte:"80 g", rayon:"Crèmerie"},
    {nom:"Herbes de Provence", qte:"1 c. à café", rayon:"Épicerie"}]},

  { nom:"Bowl poulet-avocat", emoji:"🥑", type:"leger", vegetarien:false, rapide:true, lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"2", rayon:"Boucherie"},
    {nom:"Riz", qte:"250 g", rayon:"Épicerie"},
    {nom:"Avocats", qte:"2", rayon:"Fruits & légumes"},
    {nom:"Maïs", qte:"1 boîte", rayon:"Épicerie"},
    {nom:"Citron vert", qte:"1", rayon:"Fruits & légumes"}]}
];
