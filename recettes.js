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
     etapes       le deroule, une consigne par ligne. Ecrit pour l'appli :
                  aucune recette n'est recopiee d'un site.
     lien         adresse web de la recette (a vous de la remplir)
     ingredients  liste { nom, qte, unite, rayon }
                  qte = un nombre ecrit en texte ("800", "1,2")
                  unite = "g", "kg", "cl", "l", "boite(s)"... ou "" pour un
                  simple compte (4 carottes)
   ========================================================================= */

window.RECETTES_DEPART = [
  { nom:"Blanquette de veau", emoji:"🍲", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites revenir la viande dans un peu de beurre sans la colorer, puis couvrez d'eau à hauteur.", "Ajoutez les carottes en rondelles, l'oignon piqué et un peu de thym. Laissez mijoter 1 h à feu doux.", "Faites revenir les champignons émincés à part, ajoutez-les en fin de cuisson.", "Prélevez un peu de bouillon, liez-le avec la crème et versez sur la viande.", "Servez avec le riz cuit à l'eau salée."], lien:"", ingredients:[
    {nom:"Veau à blanquette", qte:"800", unite:"g", rayon:"Boucherie"},
    {nom:"Carottes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Champignons de Paris", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Bœuf bourguignon", emoji:"🥘", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Faites dorer les lardons puis la viande en morceaux dans une cocotte.", "Ajoutez les oignons et les carottes en rondelles, laissez colorer 5 minutes.", "Versez le vin rouge, complétez d'eau à hauteur, salez, poivrez, ajoutez du thym.", "Couvrez et laissez mijoter 2 h 30 à feu très doux : la viande doit s'effilocher.", "Servez avec les pommes de terre cuites à l'eau ou à la vapeur."], lien:"", ingredients:[
    {nom:"Bœuf à mijoter", qte:"800", unite:"g", rayon:"Boucherie"},
    {nom:"Lardons", qte:"150", unite:"g", rayon:"Boucherie"},
    {nom:"Carottes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Vin rouge", qte:"50", unite:"cl", rayon:"Boissons"},
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"}]},

  { nom:"Hachis parmentier", emoji:"🥧", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Cuisez les pommes de terre à l'eau salée, écrasez-les avec le lait et un peu de beurre.", "Faites revenir l'oignon haché, ajoutez la viande hachée et laissez cuire 10 minutes.", "Étalez la viande au fond d'un plat, recouvrez de purée, lissez à la fourchette.", "Parsemez de gruyère et enfournez 25 minutes à 200 °C jusqu'à belle coloration."], lien:"", ingredients:[
    {nom:"Bœuf haché", qte:"500", unite:"g", rayon:"Boucherie"},
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Lasagnes bolognaise", emoji:"🍝", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], etapes:["Faites revenir l'oignon haché, ajoutez la viande puis le coulis de tomates. Mijotez 20 minutes.", "Préparez une béchamel avec le lait, un peu de beurre et de farine, jusqu'à épaississement.", "Alternez dans un plat : sauce, plaques, béchamel. Terminez par la béchamel.", "Couvrez de gruyère et enfournez 35 minutes à 180 °C."], lien:"", ingredients:[
    {nom:"Plaques à lasagnes", qte:"1", unite:"paquet(s)", rayon:"Épicerie"},
    {nom:"Bœuf haché", qte:"500", unite:"g", rayon:"Boucherie"},
    {nom:"Coulis de tomates", qte:"50", unite:"cl", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"150", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Spaghettis bolognaise", emoji:"🍝", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Faites revenir l'oignon haché dans un peu d'huile.", "Ajoutez la viande, laissez colorer, versez le coulis de tomates.", "Salez, poivrez, laissez mijoter 20 minutes à découvert.", "Cuisez les spaghettis al dente, mélangez à la sauce et servez avec le parmesan."], lien:"", ingredients:[
    {nom:"Spaghettis", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Bœuf haché", qte:"400", unite:"g", rayon:"Boucherie"},
    {nom:"Coulis de tomates", qte:"50", unite:"cl", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Parmesan", qte:"50", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Risotto aux champignons", emoji:"🍚", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites chauffer le bouillon et gardez-le au chaud.", "Faites suer l'échalote hachée, ajoutez le riz et remuez jusqu'à ce qu'il devienne translucide.", "Versez le bouillon louche par louche en remuant, en attendant chaque absorption.", "Ajoutez les champignons émincés à mi-cuisson. Comptez 18 minutes en tout.", "Hors du feu, incorporez le parmesan et laissez reposer 2 minutes."], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Champignons", qte:"400", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Risotto au potiron", emoji:"🎃", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Coupez le potiron en petits cubes et faites-le revenir avec l'oignon haché.", "Ajoutez le riz, remuez, puis versez le bouillon chaud progressivement.", "Remuez régulièrement pendant 18 minutes : le potiron va fondre dans le riz.", "Terminez avec le parmesan hors du feu."], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Potiron", qte:"600", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Poulet rôti et pommes de terre", emoji:"🍗", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], etapes:["Frottez le poulet de sel, poivre et thym, glissez l'ail dans la cavité.", "Enfournez à 200 °C pendant 1 h 15, en arrosant de jus toutes les 20 minutes.", "Ajoutez les pommes de terre coupées en quartiers autour du poulet à mi-cuisson.", "Laissez reposer 10 minutes avant de découper."], lien:"", ingredients:[
    {nom:"Poulet fermier", qte:"1", unite:"", rayon:"Boucherie"},
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Ail", qte:"1", unite:"tête(s)", rayon:"Fruits & légumes"},
    {nom:"Thym", qte:"1", unite:"branche(s)", rayon:"Fruits & légumes"}]},

  { nom:"Poulet au curry et riz", emoji:"🍛", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Coupez le poulet en morceaux et faites-le dorer dans une sauteuse.", "Ajoutez l'oignon émincé, puis le curry, et remuez pour enrober.", "Versez le lait de coco, laissez mijoter 20 minutes à feu doux.", "Servez sur le riz basmati cuit à part."], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Curry en poudre", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Poulet basquaise", emoji:"🌶️", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["ete", "automne"], etapes:["Faites dorer les cuisses de poulet de tous côtés, réservez.", "Faites revenir les oignons et les poivrons en lanières 10 minutes.", "Ajoutez les tomates concassées, remettez le poulet, couvrez.", "Laissez mijoter 40 minutes à feu doux. Servez avec le riz."], lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"6", unite:"", rayon:"Boucherie"},
    {nom:"Poivrons", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Chili con carne", emoji:"🌶️", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Faites revenir l'oignon et le poivron en dés.", "Ajoutez la viande hachée, laissez colorer, puis les tomates concassées.", "Incorporez les haricots rouges égouttés, épicez à votre goût.", "Laissez mijoter 30 minutes à découvert. Servez avec le riz."], lien:"", ingredients:[
    {nom:"Bœuf haché", qte:"500", unite:"g", rayon:"Boucherie"},
    {nom:"Haricots rouges", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Poivron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Curry de pois chiches", emoji:"🥘", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:[], etapes:["Faites revenir l'oignon haché avec le curry pour libérer les arômes.", "Ajoutez les pois chiches égouttés et le lait de coco.", "Laissez mijoter 15 minutes, puis incorporez les épinards jusqu'à ce qu'ils tombent.", "Servez avec le riz basmati."], lien:"", ingredients:[
    {nom:"Pois chiches", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Épinards", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Curry en poudre", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Dahl de lentilles corail", emoji:"🍛", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites revenir l'oignon et le gingembre râpé.", "Ajoutez les lentilles rincées, les tomates et le lait de coco.", "Complétez d'eau à hauteur et laissez cuire 20 minutes en remuant de temps en temps.", "Les lentilles doivent se défaire : rectifiez le sel et servez."], lien:"", ingredients:[
    {nom:"Lentilles corail", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"}]},

  { nom:"Gratin dauphinois", emoji:"🥔", type:"consistant", vegetarien:true, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Frottez un plat avec une gousse d'ail, beurrez-le.", "Coupez les pommes de terre en fines rondelles, sans les rincer.", "Disposez-les en couches, salez, poivrez, muscadez, versez le mélange lait-crème.", "Enfournez 1 h 15 à 160 °C : la lame d'un couteau doit s'enfoncer sans effort."], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"1,2", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"40", unite:"cl", rayon:"Crèmerie"},
    {nom:"Lait", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Ail", qte:"2", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Noix de muscade", qte:"1", unite:"pincée(s)", rayon:"Épicerie"}]},

  { nom:"Gratin de courgettes", emoji:"🥒", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Coupez les courgettes en rondelles et faites-les revenir 10 minutes pour les dessécher.", "Battez les œufs avec la crème, salez, poivrez.", "Disposez les courgettes dans un plat, versez l'appareil, parsemez de gruyère.", "Enfournez 30 minutes à 180 °C."], lien:"", ingredients:[
    {nom:"Courgettes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Gratin de pâtes au jambon", emoji:"🧀", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:[], etapes:["Cuisez les macaronis al dente, égouttez.", "Préparez une béchamel : beurre, farine, lait, en fouettant jusqu'à épaississement.", "Mélangez les pâtes, la béchamel et le jambon coupé en lanières.", "Versez dans un plat, couvrez de gruyère, enfournez 20 minutes à 200 °C."], lien:"", ingredients:[
    {nom:"Macaronis", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Jambon blanc", qte:"4", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"120", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Quiche lorraine", emoji:"🥧", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Étalez la pâte dans un moule, piquez-la à la fourchette.", "Faites revenir les lardons à sec, égouttez-les et répartissez-les sur la pâte.", "Battez les œufs avec la crème, salez peu, poivrez, muscadez.", "Versez, parsemez de gruyère et enfournez 35 minutes à 180 °C."], lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Lardons", qte:"200", unite:"g", rayon:"Boucherie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Tarte aux légumes du soleil", emoji:"🍅", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Étalez la pâte, badigeonnez-la de moutarde.", "Coupez la courgette, l'aubergine et les tomates en fines rondelles.", "Disposez-les en rosace en alternant les couleurs, salez, poivrez, ajoutez des herbes.", "Émiettez le chèvre par-dessus et enfournez 35 minutes à 190 °C."], lien:"", ingredients:[
    {nom:"Pâte feuilletée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Courgette", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Aubergine", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"1", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Chèvre", qte:"1", unite:"bûche(s)", rayon:"Crèmerie"}]},

  { nom:"Ratatouille", emoji:"🍆", type:"leger", vegetarien:true, rapide:false, thermomix:true, saisons:["ete"], etapes:["Coupez tous les légumes en cubes réguliers.", "Faites revenir séparément l'aubergine, la courgette et le poivron : chacun garde ainsi sa tenue.", "Faites suer l'oignon, ajoutez les tomates concassées et les herbes.", "Réunissez le tout et laissez mijoter 40 minutes à feu doux, à découvert."], lien:"", ingredients:[
    {nom:"Aubergines", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Courgettes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Poivrons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Herbes de Provence", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Soupe de légumes maison", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Épluchez et coupez grossièrement les poireaux, carottes et pommes de terre.", "Couvrez de bouillon et laissez cuire 25 minutes à petits bouillons.", "Mixez jusqu'à obtenir une texture lisse, allongez d'eau si c'est trop épais.", "Rectifiez le sel et servez bien chaud."], lien:"", ingredients:[
    {nom:"Poireaux", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pommes de terre", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"}]},

  { nom:"Velouté de potimarron", emoji:"🎃", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Coupez le potimarron en cubes — la peau se mange, inutile de l'éplucher.", "Ajoutez la pomme de terre en morceaux et couvrez de bouillon.", "Laissez cuire 20 minutes, jusqu'à ce que la lame d'un couteau s'enfonce sans résistance.", "Mixez finement, incorporez la crème hors du feu."], lien:"", ingredients:[
    {nom:"Potimarron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pomme de terre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"10", unite:"cl", rayon:"Crèmerie"},
    {nom:"Bouillon de légumes", qte:"75", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Soupe à l'oignon gratinée", emoji:"🧅", type:"leger", vegetarien:true, rapide:false, thermomix:true, saisons:["hiver"], etapes:["Émincez les oignons très finement et faites-les fondre 25 minutes à feu doux : ils doivent blondir sans brûler.", "Versez le bouillon chaud et laissez frémir 20 minutes.", "Répartissez dans des bols, posez une tranche de pain sur chacun.", "Couvrez de gruyère et passez sous le gril jusqu'à ce que le fromage dore."], lien:"", ingredients:[
    {nom:"Oignons", qte:"6", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de bœuf", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Pain de campagne", qte:"4", unite:"tranche(s)", rayon:"Boulangerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Velouté de courgettes au fromage", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], etapes:["Coupez les courgettes en rondelles sans les éplucher, émincez l'oignon.", "Couvrez de bouillon et laissez cuire 20 minutes.", "Ajoutez le fromage à tartiner et mixez longuement pour un résultat velouté.", "Poivrez généreusement avant de servir."], lien:"", ingredients:[
    {nom:"Courgettes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Fromage à tartiner", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"75", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Salade César", emoji:"🥗", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["printemps", "ete"], etapes:["Faites griller les blancs de poulet, laissez tiédir puis émincez-les.", "Lavez et essorez la romaine, coupez-la en larges lanières.", "Mélangez la salade avec la sauce, ajoutez le poulet et les croûtons.", "Terminez par de larges copeaux de parmesan."], lien:"", ingredients:[
    {nom:"Laitue romaine", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Blancs de poulet", qte:"2", unite:"", rayon:"Boucherie"},
    {nom:"Parmesan", qte:"60", unite:"g", rayon:"Crèmerie"},
    {nom:"Croûtons", qte:"1", unite:"paquet(s)", rayon:"Épicerie"},
    {nom:"Sauce César", qte:"1", unite:"pot(s)", rayon:"Épicerie"}]},

  { nom:"Salade de quinoa et féta", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Rincez le quinoa et cuisez-le 12 minutes à l'eau salée, égouttez et laissez refroidir.", "Coupez le concombre en dés et les tomates cerises en deux.", "Mélangez le tout, émiettez la féta par-dessus.", "Ajoutez la menthe ciselée, un filet d'huile d'olive et du citron."], lien:"", ingredients:[
    {nom:"Quinoa", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates cerises", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Féta", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Menthe fraîche", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Salade niçoise", emoji:"🥗", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], etapes:["Faites durcir les œufs 9 minutes, rafraîchissez-les et écalez-les.", "Cuisez les haricots verts 8 minutes à l'eau bouillante salée, gardez-les croquants.", "Coupez les tomates en quartiers, disposez tous les éléments dans un plat.", "Ajoutez le thon émietté et les olives, arrosez de vinaigrette."], lien:"", ingredients:[
    {nom:"Thon en boîte", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Œufs", qte:"4", unite:"", rayon:"Crèmerie"},
    {nom:"Tomates", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Haricots verts", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Olives noires", qte:"100", unite:"g", rayon:"Épicerie"}]},

  { nom:"Croque-monsieur et salade", emoji:"🥪", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Beurrez légèrement les tranches de pain de mie sur la face extérieure.", "Garnissez de jambon et de gruyère, refermez.", "Faites dorer à la poêle ou au four 10 minutes à 200 °C.", "Servez avec la salade verte assaisonnée."], lien:"", ingredients:[
    {nom:"Pain de mie", qte:"8", unite:"tranche(s)", rayon:"Boulangerie"},
    {nom:"Jambon blanc", qte:"4", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Gruyère râpé", qte:"120", unite:"g", rayon:"Crèmerie"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Omelette aux herbes", emoji:"🍳", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:[], etapes:["Battez les œufs à la fourchette sans excès, salez et poivrez.", "Ciselez finement le persil et la ciboulette, incorporez-les.", "Faites chauffer le beurre dans une poêle, versez les œufs.", "Ramenez les bords vers le centre pendant 3 minutes, pliez et servez baveuse."], lien:"", ingredients:[
    {nom:"Œufs", qte:"8", unite:"", rayon:"Crèmerie"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Ciboulette", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Beurre", qte:"20", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Quiche aux poireaux", emoji:"🥧", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Émincez les poireaux et faites-les fondre 15 minutes à couvert avec un peu de beurre.", "Étalez la pâte dans un moule et répartissez les poireaux.", "Battez les œufs avec la crème, salez, poivrez, versez sur les poireaux.", "Enfournez 35 minutes à 180 °C."], lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Poireaux", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Saumon à l'oseille et riz", emoji:"🐟", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["printemps", "ete"], etapes:["Faites cuire les pavés de saumon 6 minutes à la poêle, côté peau d'abord.", "Dans une autre poêle, faites tomber l'oseille avec un peu de beurre.", "Ajoutez la crème, laissez réduire 3 minutes.", "Nappez le saumon de sauce et servez avec le riz."], lien:"", ingredients:[
    {nom:"Pavés de saumon", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Crème liquide", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Oseille ou épinards", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Cabillaud et légumes vapeur", emoji:"🐟", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Détaillez le brocoli en bouquets et les carottes en bâtonnets.", "Faites cuire les légumes 12 minutes à la vapeur.", "Ajoutez les dos de cabillaud dans le panier pour les 8 dernières minutes.", "Servez avec un filet de citron, du sel et un tour de moulin."], lien:"", ingredients:[
    {nom:"Dos de cabillaud", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Brocoli", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Papillotes de poisson au citron", emoji:"🍋", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["printemps", "ete"], etapes:["Découpez quatre grands carrés de papier cuisson.", "Posez un filet de poisson sur chacun, ajoutez des rondelles de courgette et de citron.", "Salez, poivrez, ajoutez l'aneth, fermez hermétiquement les papillotes.", "Enfournez 18 minutes à 190 °C et ouvrez à table."], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Citron", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Courgette", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Aneth", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Moules marinières et frites", emoji:"🦪", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["ete", "automne"], etapes:["Grattez et rincez les moules à grande eau, jetez celles qui restent ouvertes.", "Faites suer les échalotes hachées, versez le vin blanc et portez à ébullition.", "Ajoutez les moules, couvrez et secouez la casserole 5 minutes : elles doivent toutes s'ouvrir.", "Parsemez de persil et servez avec les frites."], lien:"", ingredients:[
    {nom:"Moules", qte:"2", unite:"kg", rayon:"Poissonnerie"},
    {nom:"Vin blanc", qte:"25", unite:"cl", rayon:"Boissons"},
    {nom:"Échalotes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Frites surgelées", qte:"1", unite:"kg", rayon:"Surgelés"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Couscous poulet-merguez", emoji:"🍛", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], etapes:["Faites dorer les cuisses de poulet, réservez. Faites griller les merguez à part.", "Faites revenir les légumes coupés en gros morceaux, couvrez d'eau, salez, épicez.", "Remettez le poulet, ajoutez les pois chiches, laissez mijoter 40 minutes.", "Préparez la semoule en la couvrant d'eau bouillante salée, égrenez à la fourchette.", "Servez la semoule, les légumes et les viandes séparément."], lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"4", unite:"", rayon:"Boucherie"},
    {nom:"Merguez", qte:"8", unite:"", rayon:"Boucherie"},
    {nom:"Semoule", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Courgettes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pois chiches", qte:"1", unite:"boîte(s)", rayon:"Épicerie"}]},

  { nom:"Tajine de légumes", emoji:"🥘", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:[], etapes:["Faites revenir l'oignon avec le ras el-hanout.", "Ajoutez les carottes et les courgettes en gros tronçons, couvrez d'eau à mi-hauteur.", "Ajoutez les pois chiches et les abricots secs, couvrez et laissez mijoter 35 minutes.", "Servez sur la semoule préparée à part."], lien:"", ingredients:[
    {nom:"Courgettes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pois chiches", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Abricots secs", qte:"100", unite:"g", rayon:"Épicerie"},
    {nom:"Semoule", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Ras el-hanout", qte:"2", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Pizza maison", emoji:"🍕", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:[], etapes:["Étalez la pâte sur une plaque, étalez le coulis de tomates jusqu'aux bords.", "Répartissez les champignons émincés et la mozzarella en morceaux.", "Saupoudrez d'origan, arrosez d'un filet d'huile d'olive.", "Enfournez 12 minutes dans un four très chaud, à 250 °C."], lien:"", ingredients:[
    {nom:"Pâte à pizza", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Coulis de tomates", qte:"25", unite:"cl", rayon:"Épicerie"},
    {nom:"Mozzarella", qte:"250", unite:"g", rayon:"Crèmerie"},
    {nom:"Champignons", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Origan", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Galettes de sarrasin", emoji:"🥞", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Mélangez la farine, un œuf, de l'eau et une pincée de sel jusqu'à obtenir une pâte fluide. Laissez reposer 1 h.", "Faites cuire les galettes une par une dans une poêle très chaude.", "Garnissez chacune d'un œuf, de jambon et de gruyère.", "Repliez les quatre côtés et laissez fondre le fromage à couvert."], lien:"", ingredients:[
    {nom:"Farine de sarrasin", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Œufs", qte:"6", unite:"", rayon:"Crèmerie"},
    {nom:"Jambon blanc", qte:"4", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Gruyère râpé", qte:"120", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Tartiflette", emoji:"🧀", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["hiver"], etapes:["Cuisez les pommes de terre 20 minutes à l'eau, laissez tiédir et coupez-les en rondelles.", "Faites revenir les lardons et les oignons émincés.", "Alternez pommes de terre et lardons dans un plat, versez la crème.", "Posez le reblochon coupé en deux, croûte vers le haut. Enfournez 30 minutes à 200 °C."], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"1,2", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Reblochon", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Lardons", qte:"200", unite:"g", rayon:"Boucherie"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"10", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Endives au jambon", emoji:"🥬", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites cuire les endives 20 minutes à la vapeur, puis pressez-les pour ôter l'eau : c'est ce qui évite l'amertume.", "Enroulez chaque endive dans une tranche de jambon.", "Préparez une béchamel avec le beurre, la farine et le lait.", "Nappez, couvrez de gruyère et gratinez 25 minutes à 200 °C."], lien:"", ingredients:[
    {nom:"Endives", qte:"8", unite:"", rayon:"Fruits & légumes"},
    {nom:"Jambon blanc", qte:"8", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Poêlée de gnocchis aux légumes", emoji:"🥔", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Faites revenir les gnocchis à sec dans une poêle chaude jusqu'à ce qu'ils dorent.", "Ajoutez la courgette en dés et les tomates cerises coupées en deux.", "Laissez cuire 8 minutes en remuant.", "Hors du feu, ajoutez la mozzarella en morceaux et le basilic ciselé."], lien:"", ingredients:[
    {nom:"Gnocchis", qte:"700", unite:"g", rayon:"Crèmerie"},
    {nom:"Courgette", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates cerises", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Mozzarella", qte:"125", unite:"g", rayon:"Crèmerie"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Pâtes carbonara", emoji:"🍝", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Faites rissoler les lardons à sec, sans matière grasse.", "Battez les œufs avec le parmesan râpé et beaucoup de poivre.", "Cuisez les tagliatelles al dente, gardez une louche d'eau de cuisson.", "Hors du feu, mélangez pâtes, lardons et œufs : la chaleur suffit à lier. Détendez avec l'eau réservée."], lien:"", ingredients:[
    {nom:"Tagliatelles", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Lardons", qte:"200", unite:"g", rayon:"Boucherie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Pâtes au pesto et tomates", emoji:"🌿", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], etapes:["Faites torréfier les pignons à sec quelques minutes.", "Cuisez les penne al dente.", "Coupez les tomates cerises en deux et faites-les revenir 3 minutes.", "Mélangez les pâtes au pesto hors du feu, ajoutez les tomates et les pignons."], lien:"", ingredients:[
    {nom:"Penne", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Pesto", qte:"1", unite:"pot(s)", rayon:"Épicerie"},
    {nom:"Tomates cerises", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Pignons de pin", qte:"50", unite:"g", rayon:"Épicerie"}]},

  { nom:"Rôti de porc et haricots verts", emoji:"🍖", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["ete", "automne"], etapes:["Badigeonnez le rôti de moutarde, salez, poivrez.", "Enfournez 1 h à 180 °C avec les oignons émincés autour, en arrosant régulièrement.", "Cuisez les haricots verts 10 minutes à l'eau bouillante salée.", "Laissez reposer la viande 10 minutes avant de trancher."], lien:"", ingredients:[
    {nom:"Rôti de porc", qte:"1", unite:"kg", rayon:"Boucherie"},
    {nom:"Haricots verts", qte:"600", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"1", unite:"c. à soupe", rayon:"Épicerie"}]},

  { nom:"Saucisses et purée maison", emoji:"🌭", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Cuisez les pommes de terre 25 minutes à l'eau salée.", "Écrasez-les au presse-purée avec le beurre puis le lait chaud, petit à petit.", "Faites griller les saucisses 15 minutes à feu moyen en les retournant.", "Servez la purée bien lisse avec les saucisses."], lien:"", ingredients:[
    {nom:"Saucisses", qte:"6", unite:"", rayon:"Boucherie"},
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"50", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Boulettes de bœuf à la tomate", emoji:"🍖", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:[], etapes:["Mélangez la viande, la chapelure et l'œuf, salez, poivrez. Formez des boulettes.", "Faites-les dorer de tous côtés dans une sauteuse.", "Versez le coulis de tomates, couvrez et laissez mijoter 20 minutes.", "Servez sur les spaghettis cuits al dente."], lien:"", ingredients:[
    {nom:"Bœuf haché", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Chapelure", qte:"50", unite:"g", rayon:"Épicerie"},
    {nom:"Coulis de tomates", qte:"50", unite:"cl", rayon:"Épicerie"},
    {nom:"Œuf", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Spaghettis", qte:"400", unite:"g", rayon:"Épicerie"}]},

  { nom:"Wok de légumes et nouilles", emoji:"🥡", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:[], etapes:["Coupez les carottes et le poivron en fines lanières.", "Faites chauffer un wok très fort, saisissez les légumes 5 minutes en remuant sans cesse.", "Ajoutez les pousses de soja et la sauce soja.", "Incorporez les nouilles cuites, mélangez 2 minutes et servez aussitôt."], lien:"", ingredients:[
    {nom:"Nouilles chinoises", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Poivron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pousses de soja", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Sauce soja", qte:"5", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Croque-tartines chèvre-miel", emoji:"🍯", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Faites griller les tranches de pain.", "Répartissez le chèvre en rondelles, arrosez d'un filet de miel.", "Passez 5 minutes sous le gril, jusqu'à ce que le fromage soit fondant.", "Parsemez de noix concassées et servez avec la salade."], lien:"", ingredients:[
    {nom:"Pain de campagne", qte:"8", unite:"tranche(s)", rayon:"Boulangerie"},
    {nom:"Chèvre", qte:"2", unite:"bûche(s)", rayon:"Crèmerie"},
    {nom:"Miel", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Noix", qte:"50", unite:"g", rayon:"Épicerie"}]},

  { nom:"Parmentier de poisson", emoji:"🐟", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Cuisez les pommes de terre et écrasez-les avec un peu de crème.", "Faites fondre le poireau émincé 10 minutes à couvert.", "Pochez le poisson 6 minutes dans l'eau frémissante, égouttez et émiettez-le.", "Alternez poisson, poireau et purée dans un plat, couvrez de gruyère.", "Enfournez 25 minutes à 200 °C."], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"600", unite:"g", rayon:"Poissonnerie"},
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Poireau", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Tarte à la tomate et moutarde", emoji:"🍅", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Étalez la pâte, piquez-la et badigeonnez-la de moutarde.", "Coupez les tomates en rondelles et laissez-les dégorger 10 minutes sur du papier absorbant.", "Disposez-les en rosace, salez, poivrez, ajoutez les herbes.", "Parsemez de gruyère et enfournez 30 minutes à 190 °C."], lien:"", ingredients:[
    {nom:"Pâte feuilletée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Tomates", qte:"5", unite:"", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Gruyère râpé", qte:"80", unite:"g", rayon:"Crèmerie"},
    {nom:"Herbes de Provence", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Bowl poulet-avocat", emoji:"🥑", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], etapes:["Cuisez le riz et laissez-le tiédir.", "Faites griller les blancs de poulet, laissez reposer puis émincez-les.", "Coupez les avocats en lamelles, arrosez-les de citron vert pour qu'ils ne noircissent pas.", "Composez les bols : riz, poulet, avocat, maïs égoutté."], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"2", unite:"", rayon:"Boucherie"},
    {nom:"Riz", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Avocats", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Maïs", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Citron vert", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  /* ---------------- Soupes et veloutés (le robot excelle ici) ---------------- */

  { nom:"Velouté de carottes au cumin", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Épluchez et coupez les carottes et la pomme de terre en rondelles.", "Faites suer l'oignon, ajoutez les légumes et le cumin.", "Couvrez de bouillon et laissez cuire 25 minutes.", "Mixez finement : le cumin se révèle après le mixage."], lien:"", ingredients:[
    {nom:"Carottes", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Pomme de terre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Cumin", qte:"1", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Bouillon de légumes", qte:"75", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Soupe de tomates au basilic", emoji:"🍅", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], etapes:["Faites revenir l'oignon et l'ail hachés sans les colorer.", "Ajoutez les tomates coupées en quartiers, laissez compoter 20 minutes.", "Mixez, puis passez au chinois si vous voulez ôter les peaux.", "Incorporez la crème et le basilic ciselé au dernier moment."], lien:"", ingredients:[
    {nom:"Tomates", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Ail", qte:"2", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"10", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Velouté de brocoli", emoji:"🥦", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Détaillez le brocoli en bouquets, coupez la pomme de terre en morceaux.", "Couvrez de bouillon et laissez cuire 15 minutes : n'allez pas au-delà, le brocoli perdrait sa couleur.", "Mixez longuement pour un résultat très lisse.", "Ajoutez la crème hors du feu."], lien:"", ingredients:[
    {nom:"Brocoli", qte:"600", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Pomme de terre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"70", unite:"cl", rayon:"Épicerie"},
    {nom:"Crème liquide", qte:"10", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Velouté de champignons", emoji:"🍄", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne"], etapes:["Nettoyez les champignons sans les laver, émincez-les.", "Faites-les revenir à feu vif avec les échalotes jusqu'à évaporation de l'eau.", "Versez le bouillon, laissez frémir 15 minutes.", "Mixez et incorporez la crème."], lien:"", ingredients:[
    {nom:"Champignons de Paris", qte:"500", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de volaille", qte:"60", unite:"cl", rayon:"Épicerie"},
    {nom:"Crème fraîche", qte:"15", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Gaspacho andalou", emoji:"🥒", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], etapes:["Coupez grossièrement les tomates, le concombre et le poivron.", "Mixez le tout avec l'ail et l'huile d'olive jusqu'à obtenir une texture bien lisse.", "Salez, poivrez, ajoutez un trait de vinaigre.", "Placez au moins 2 h au réfrigérateur : le gaspacho se sert très frais."], lien:"", ingredients:[
    {nom:"Tomates", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Poivron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Ail", qte:"1", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Huile d'olive", qte:"5", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Velouté de petits pois à la menthe", emoji:"🌱", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["printemps"], etapes:["Faites suer l'oignon émincé.", "Ajoutez les petits pois et le bouillon, laissez cuire 10 minutes seulement.", "Mixez avec les feuilles de menthe.", "Servez chaud, ou bien frais l'été."], lien:"", ingredients:[
    {nom:"Petits pois", qte:"600", unite:"g", rayon:"Surgelés"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Menthe fraîche", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"60", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Soupe de lentilles corail et carottes", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites revenir l'oignon avec le curry.", "Ajoutez les carottes en rondelles et les lentilles rincées.", "Versez le lait de coco et de l'eau à hauteur, laissez cuire 20 minutes.", "Mixez ou laissez tel quel, selon l'envie."], lien:"", ingredients:[
    {nom:"Lentilles corail", qte:"200", unite:"g", rayon:"Épicerie"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait de coco", qte:"20", unite:"cl", rayon:"Épicerie"},
    {nom:"Curry en poudre", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Soupe de courgettes au curry", emoji:"🥒", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], etapes:["Coupez les courgettes en rondelles sans les éplucher.", "Faites revenir l'oignon avec le curry, ajoutez les courgettes.", "Couvrez de bouillon et laissez cuire 15 minutes.", "Mixez finement et rectifiez l'assaisonnement."], lien:"", ingredients:[
    {nom:"Courgettes", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Curry en poudre", qte:"1", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Bouillon de légumes", qte:"50", unite:"cl", rayon:"Épicerie"}]},

  /* ---------------- Risottos et plats mijotés au robot ---------------- */

  { nom:"Risotto aux asperges", emoji:"🍚", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["printemps"], etapes:["Coupez les asperges en tronçons, réservez les pointes à part.", "Faites suer l'échalote, nacrez le riz, versez le bouillon chaud louche par louche.", "Ajoutez les tronçons d'asperge à mi-cuisson, les pointes 5 minutes avant la fin.", "Terminez au parmesan, hors du feu."], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Asperges vertes", qte:"500", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Risotto tomate-mozzarella", emoji:"🍚", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["ete"], etapes:["Nacrez le riz avec un peu d'huile, puis versez le bouillon progressivement.", "Ajoutez les tomates cerises coupées en deux à mi-cuisson.", "Après 18 minutes, coupez le feu et ajoutez la mozzarella en dés.", "Couvrez 2 minutes : elle doit filer. Parsemez de basilic."], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Tomates cerises", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Mozzarella", qte:"250", unite:"g", rayon:"Crèmerie"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Risotto aux épinards", emoji:"🍚", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["printemps"], etapes:["Faites suer l'oignon, nacrez le riz, mouillez au bouillon chaud petit à petit.", "À 15 minutes, ajoutez les épinards : ils réduisent énormément.", "Poursuivez 3 minutes en remuant.", "Incorporez le parmesan hors du feu."], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Épinards", qte:"400", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"60", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Risotto aux crevettes", emoji:"🍤", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:[], etapes:["Faites suer l'échalote, nacrez le riz, déglacez au vin blanc.", "Versez le bouillon chaud louche par louche pendant 18 minutes.", "Ajoutez les crevettes les 4 dernières minutes : au-delà elles durcissent.", "Poivrez et servez sans attendre."], lien:"", ingredients:[
    {nom:"Riz arborio", qte:"320", unite:"g", rayon:"Épicerie"},
    {nom:"Crevettes décortiquées", qte:"300", unite:"g", rayon:"Poissonnerie"},
    {nom:"Échalote", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Vin blanc", qte:"10", unite:"cl", rayon:"Boissons"},
    {nom:"Bouillon de poisson", qte:"1", unite:"l", rayon:"Épicerie"}]},

  { nom:"One-pot pâtes tomate-mozzarella", emoji:"🍝", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], etapes:["Mettez dans une grande casserole les pâtes crues, les tomates cerises, l'ail émincé.", "Couvrez d'eau juste à hauteur, salez.", "Portez à ébullition et laissez cuire 12 minutes en remuant : l'eau devient une sauce.", "Hors du feu, ajoutez la mozzarella et le basilic."], lien:"", ingredients:[
    {nom:"Penne", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Tomates cerises", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Mozzarella", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Ail", qte:"2", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Bœuf Stroganoff", emoji:"🥘", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites saisir la viande émincée à feu vif, réservez.", "Faites revenir les oignons puis les champignons dans la même poêle.", "Ajoutez la moutarde et la crème, laissez épaissir 5 minutes.", "Remettez la viande juste pour la réchauffer. Servez sur les tagliatelles."], lien:"", ingredients:[
    {nom:"Bœuf à mijoter", qte:"700", unite:"g", rayon:"Boucherie"},
    {nom:"Champignons de Paris", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Moutarde", qte:"1", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Tagliatelles", qte:"400", unite:"g", rayon:"Épicerie"}]},

  { nom:"Poulet tikka masala", emoji:"🍛", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:[], etapes:["Faites mariner le poulet en morceaux dans le yaourt et les épices, 30 minutes si possible.", "Faites-le dorer à feu vif, réservez.", "Faites revenir le gingembre râpé, ajoutez les tomates, laissez réduire 10 minutes.", "Remettez le poulet, mijotez 15 minutes. Servez avec le riz basmati."], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"700", unite:"g", rayon:"Boucherie"},
    {nom:"Tomates concassées", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Yaourt nature", qte:"2", unite:"pot(s)", rayon:"Crèmerie"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"},
    {nom:"Garam masala", qte:"2", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Curry de légumes au lait de coco", emoji:"🥘", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:[], etapes:["Faites revenir l'oignon avec la pâte de curry.", "Ajoutez les carottes en rondelles et le chou-fleur en bouquets.", "Versez le lait de coco, couvrez et laissez cuire 20 minutes.", "Servez avec le riz basmati."], lien:"", ingredients:[
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Chou-fleur", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pâte de curry", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Gratin de chou-fleur béchamel", emoji:"🧀", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Détaillez le chou-fleur en bouquets, cuisez-les 10 minutes à l'eau bouillante salée.", "Préparez la béchamel : faites fondre le beurre, ajoutez la farine, puis le lait en fouettant.", "Disposez le chou-fleur égoutté dans un plat, nappez de béchamel.", "Couvrez de gruyère et gratinez 25 minutes à 200 °C."], lien:"", ingredients:[
    {nom:"Chou-fleur", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"},
    {nom:"Farine", qte:"40", unite:"g", rayon:"Épicerie"},
    {nom:"Gruyère râpé", qte:"120", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Houmous et légumes croquants", emoji:"🫘", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:[], etapes:["Égouttez et rincez les pois chiches.", "Mixez-les avec le tahini, le jus de citron, un peu d'eau et de l'huile d'olive.", "Mixez longuement : c'est ce qui rend le houmous crémeux. Salez.", "Servez avec les carottes et le concombre en bâtonnets, et le pain pita tiède."], lien:"", ingredients:[
    {nom:"Pois chiches", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Tahini", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pain pita", qte:"4", unite:"", rayon:"Boulangerie"}]},

  /* ---------------- Viandes ---------------- */

  { nom:"Poulet au citron et olives", emoji:"🍗", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], etapes:["Faites dorer les cuisses de poulet, réservez.", "Faites fondre les oignons émincés 10 minutes.", "Remettez le poulet, ajoutez les citrons en quartiers et les olives, couvrez d'eau à mi-hauteur.", "Laissez mijoter 40 minutes à couvert. Servez avec la semoule."], lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"6", unite:"", rayon:"Boucherie"},
    {nom:"Citron", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Olives vertes", qte:"150", unite:"g", rayon:"Épicerie"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Semoule", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Poulet à la moutarde", emoji:"🍗", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Coupez le poulet en morceaux et faites-le dorer.", "Ajoutez la moutarde et remuez pour enrober.", "Versez la crème, laissez mijoter 15 minutes à feu doux sans faire bouillir.", "Servez avec le riz."], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Moutarde", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Escalopes à la crème et champignons", emoji:"🍖", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Faites dorer les escalopes 3 minutes de chaque côté, réservez au chaud.", "Faites revenir les champignons émincés jusqu'à évaporation de leur eau.", "Versez la crème, laissez réduire 5 minutes, remettez les escalopes.", "Servez avec les tagliatelles."], lien:"", ingredients:[
    {nom:"Escalopes de dinde", qte:"4", unite:"", rayon:"Boucherie"},
    {nom:"Champignons de Paris", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Tagliatelles", qte:"400", unite:"g", rayon:"Épicerie"}]},

  { nom:"Sauté de veau aux olives", emoji:"🥘", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Faites dorer les morceaux de veau de tous côtés.", "Ajoutez les oignons émincés, puis les tomates concassées.", "Couvrez et laissez mijoter 1 h à feu doux.", "Ajoutez les olives 10 minutes avant la fin. Servez avec le riz."], lien:"", ingredients:[
    {nom:"Sauté de veau", qte:"800", unite:"g", rayon:"Boucherie"},
    {nom:"Olives noires", qte:"120", unite:"g", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Filet mignon aux pommes", emoji:"🍖", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne"], etapes:["Faites dorer le filet mignon de tous côtés dans une cocotte.", "Ajoutez les pommes coupées en quartiers, couvrez.", "Laissez cuire 30 minutes à feu doux.", "Retirez la viande, ajoutez la crème au jus, laissez réduire, nappez.", "Servez avec les pommes de terre vapeur."], lien:"", ingredients:[
    {nom:"Filet mignon de porc", qte:"800", unite:"g", rayon:"Boucherie"},
    {nom:"Pommes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"15", unite:"cl", rayon:"Crèmerie"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"}]},

  { nom:"Brochettes de poulet mariné", emoji:"🍢", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], etapes:["Coupez le poulet en cubes, faites-le mariner avec le citron, l'huile et des herbes 30 minutes.", "Coupez les poivrons et la courgette en morceaux de même taille.", "Montez les brochettes en alternant viande et légumes.", "Faites griller 12 minutes en les retournant. Servez avec la semoule."], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Poivrons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Courgette", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Semoule", qte:"250", unite:"g", rayon:"Épicerie"}]},

  { nom:"Burgers maison", emoji:"🍔", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Faites griller les steaks 3 minutes de chaque côté, posez le cheddar dessus en fin de cuisson.", "Faites toaster les pains coupés en deux.", "Montez : sauce, salade, steak, tomate.", "Servez aussitôt avec les frites cuites au four."], lien:"", ingredients:[
    {nom:"Steaks hachés", qte:"4", unite:"", rayon:"Boucherie"},
    {nom:"Pains à burger", qte:"4", unite:"", rayon:"Boulangerie"},
    {nom:"Cheddar", qte:"4", unite:"tranche(s)", rayon:"Crèmerie"},
    {nom:"Tomate", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Frites surgelées", qte:"800", unite:"g", rayon:"Surgelés"}]},

  { nom:"Rôti de bœuf et gratin de chou-fleur", emoji:"🥩", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["hiver"], etapes:["Sortez la viande 1 h avant : elle cuit bien mieux à température ambiante.", "Saisissez le rôti puis enfournez 20 minutes à 210 °C pour une viande rosée.", "Cuisez le chou-fleur 10 minutes, disposez-le dans un plat avec la crème et le gruyère.", "Gratinez 20 minutes. Laissez reposer la viande avant de trancher."], lien:"", ingredients:[
    {nom:"Rôti de bœuf", qte:"1", unite:"kg", rayon:"Boucherie"},
    {nom:"Chou-fleur", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Nouilles sautées au bœuf", emoji:"🥡", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Émincez le bœuf très finement et faites-le mariner 10 minutes dans la sauce soja.", "Saisissez-le à feu très vif 2 minutes, réservez.", "Faites sauter les carottes et le poivron en lanières.", "Ajoutez les nouilles cuites et la viande, mélangez 2 minutes."], lien:"", ingredients:[
    {nom:"Bœuf émincé", qte:"500", unite:"g", rayon:"Boucherie"},
    {nom:"Nouilles chinoises", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Poivron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Sauce soja", qte:"5", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Riz cantonais", emoji:"🍚", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Utilisez du riz cuit la veille : il tient mieux à la poêle.", "Faites une omelette fine, roulez-la et coupez-la en lanières.", "Faites sauter le riz à feu vif, ajoutez le jambon en dés et les petits pois.", "Incorporez l'omelette et la sauce soja, mélangez et servez."], lien:"", ingredients:[
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Jambon blanc", qte:"3", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Petits pois", qte:"200", unite:"g", rayon:"Surgelés"},
    {nom:"Sauce soja", qte:"3", unite:"c. à soupe", rayon:"Épicerie"}]},

  { nom:"Pad thaï aux crevettes", emoji:"🍜", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Faites tremper les nouilles de riz 10 minutes dans l'eau chaude.", "Saisissez les crevettes 2 minutes, réservez.", "Brouillez les œufs dans le wok, ajoutez les nouilles égouttées et la sauce.", "Remettez les crevettes, ajoutez les pousses de soja.", "Servez avec les cacahuètes concassées et le citron vert."], lien:"", ingredients:[
    {nom:"Nouilles de riz", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Crevettes décortiquées", qte:"300", unite:"g", rayon:"Poissonnerie"},
    {nom:"Œufs", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Pousses de soja", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Cacahuètes", qte:"60", unite:"g", rayon:"Épicerie"},
    {nom:"Citron vert", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Paella express", emoji:"🥘", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["ete"], etapes:["Faites dorer les morceaux de poulet dans une grande poêle.", "Ajoutez les poivrons en lanières, puis le riz, remuez pour l'enrober.", "Versez deux fois son volume d'eau chaude avec le safran, laissez cuire 15 minutes sans remuer.", "Ajoutez les fruits de mer et les petits pois, poursuivez 5 minutes.", "Laissez reposer 5 minutes hors du feu avant de servir."], lien:"", ingredients:[
    {nom:"Riz rond", qte:"350", unite:"g", rayon:"Épicerie"},
    {nom:"Cuisses de poulet", qte:"4", unite:"", rayon:"Boucherie"},
    {nom:"Fruits de mer surgelés", qte:"400", unite:"g", rayon:"Surgelés"},
    {nom:"Poivrons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Petits pois", qte:"150", unite:"g", rayon:"Surgelés"},
    {nom:"Safran", qte:"1", unite:"sachet(s)", rayon:"Épicerie"}]},

  /* ---------------- Poissons ---------------- */

  { nom:"Dos de cabillaud sauce citron", emoji:"🐟", type:"leger", vegetarien:false, rapide:true, thermomix:true, saisons:[], etapes:["Faites cuire les dos de cabillaud 8 minutes à la vapeur ou à la poêle.", "Faites fondre le beurre à feu doux, ajoutez le jus des citrons.", "Fouettez sans faire bouillir : la sauce doit rester lisse.", "Nappez le poisson et servez avec le riz."], lien:"", ingredients:[
    {nom:"Dos de cabillaud", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Citron", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Beurre", qte:"60", unite:"g", rayon:"Crèmerie"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Gratin de poisson aux poireaux", emoji:"🐟", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Émincez les poireaux et faites-les fondre 15 minutes à couvert.", "Préparez une béchamel légère avec le lait et la farine.", "Disposez le poisson en morceaux et les poireaux dans un plat, nappez.", "Couvrez de gruyère et enfournez 25 minutes à 200 °C."], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"600", unite:"g", rayon:"Poissonnerie"},
    {nom:"Poireaux", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"40", unite:"cl", rayon:"Crèmerie"},
    {nom:"Farine", qte:"30", unite:"g", rayon:"Épicerie"},
    {nom:"Gruyère râpé", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Tartare de saumon à l'aneth", emoji:"🍣", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["printemps", "ete"], etapes:["Coupez le saumon au couteau en petits dés — surtout pas au mixeur.", "Ciselez l'échalote et l'aneth très finement.", "Mélangez avec le jus de citron vert, salez, poivrez.", "Laissez reposer 20 minutes au frais et servez avec le pain grillé."], lien:"", ingredients:[
    {nom:"Saumon très frais", qte:"500", unite:"g", rayon:"Poissonnerie"},
    {nom:"Aneth", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Citron vert", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pain de campagne", qte:"4", unite:"tranche(s)", rayon:"Boulangerie"}]},

  { nom:"Sardines grillées et salade", emoji:"🐟", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], etapes:["Videz et rincez les sardines, épongez-les.", "Faites-les griller 3 minutes de chaque côté à feu vif.", "Préparez la salade avec les tomates en quartiers.", "Servez les sardines très chaudes avec du citron et le pain grillé."], lien:"", ingredients:[
    {nom:"Sardines", qte:"12", unite:"", rayon:"Poissonnerie"},
    {nom:"Tomates", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Laitue", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pain de campagne", qte:"4", unite:"tranche(s)", rayon:"Boulangerie"}]},

  { nom:"Truite aux amandes", emoji:"🐟", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["printemps"], etapes:["Farinez légèrement les truites et faites-les cuire 5 minutes de chaque côté au beurre.", "Réservez-les au chaud.", "Faites blondir les amandes dans le beurre de cuisson.", "Versez sur les truites et servez avec les pommes de terre vapeur."], lien:"", ingredients:[
    {nom:"Truites", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Amandes effilées", qte:"80", unite:"g", rayon:"Épicerie"},
    {nom:"Beurre", qte:"60", unite:"g", rayon:"Crèmerie"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"}]},

  { nom:"Spaghettis aux fruits de mer", emoji:"🍝", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Faites revenir l'ail haché dans l'huile sans le brûler.", "Ajoutez les fruits de mer, déglacez au vin blanc, laissez évaporer 5 minutes.", "Cuisez les spaghettis al dente, gardez un peu d'eau de cuisson.", "Mélangez le tout, ajoutez le persil et un peu d'eau de cuisson pour lier."], lien:"", ingredients:[
    {nom:"Spaghettis", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Fruits de mer surgelés", qte:"500", unite:"g", rayon:"Surgelés"},
    {nom:"Ail", qte:"2", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Vin blanc", qte:"10", unite:"cl", rayon:"Boissons"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  /* ---------------- Végétarien ---------------- */

  { nom:"Chili sin carne", emoji:"🌶️", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites revenir l'oignon et le poivron en dés.", "Ajoutez les tomates concassées, les haricots rouges et le maïs égouttés.", "Épicez généreusement et laissez mijoter 25 minutes.", "Servez avec le riz."], lien:"", ingredients:[
    {nom:"Haricots rouges", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Poivron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Maïs", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Galettes de lentilles", emoji:"🫘", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Cuisez les lentilles 25 minutes à l'eau, égouttez-les bien.", "Râpez la carotte, hachez l'oignon.", "Écrasez grossièrement les lentilles, mélangez avec les légumes, l'œuf et la chapelure.", "Formez des galettes et faites-les dorer 4 minutes de chaque côté."], lien:"", ingredients:[
    {nom:"Lentilles vertes", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Carotte", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Chapelure", qte:"60", unite:"g", rayon:"Épicerie"},
    {nom:"Œuf", qte:"1", unite:"", rayon:"Crèmerie"}]},

  { nom:"Buddha bowl aux falafels", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], etapes:["Mixez les pois chiches avec des herbes et des épices, formez des boulettes.", "Faites-les dorer à la poêle 8 minutes en les retournant.", "Cuisez le boulgour, laissez tiédir.", "Composez les bols : boulgour, concombre, tomates, falafels.", "Mélangez le yaourt avec la menthe ciselée pour la sauce."], lien:"", ingredients:[
    {nom:"Pois chiches", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Boulgour", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates cerises", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Yaourt nature", qte:"1", unite:"pot(s)", rayon:"Crèmerie"},
    {nom:"Menthe fraîche", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Lasagnes aux légumes", emoji:"🍝", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["ete"], etapes:["Coupez courgettes et aubergine en fines tranches, faites-les griller à la poêle.", "Préparez une béchamel avec le lait.", "Alternez coulis, plaques, légumes et béchamel dans un plat.", "Couvrez de gruyère et enfournez 40 minutes à 180 °C."], lien:"", ingredients:[
    {nom:"Plaques à lasagnes", qte:"1", unite:"paquet(s)", rayon:"Épicerie"},
    {nom:"Courgettes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Aubergine", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Coulis de tomates", qte:"50", unite:"cl", rayon:"Épicerie"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"150", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Aubergines farcies", emoji:"🍆", type:"consistant", vegetarien:true, rapide:false, thermomix:false, saisons:["ete"], etapes:["Coupez les aubergines en deux, quadrillez la chair et enfournez 25 minutes à 200 °C.", "Creusez-les, hachez la chair récupérée.", "Mélangez avec le riz cuit, les tomates en dés et les pignons.", "Garnissez les demi-aubergines, émiettez la féta, repassez 15 minutes au four."], lien:"", ingredients:[
    {nom:"Aubergines", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"200", unite:"g", rayon:"Épicerie"},
    {nom:"Tomates", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Féta", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Pignons de pin", qte:"40", unite:"g", rayon:"Épicerie"}]},

  { nom:"Quinoa aux légumes rôtis", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["automne"], etapes:["Coupez le potimarron en cubes et l'oignon rouge en quartiers.", "Enfournez-les 30 minutes à 200 °C avec un filet d'huile.", "Cuisez le quinoa 12 minutes à l'eau salée.", "Mélangez, ajoutez la féta émiettée et les noix concassées."], lien:"", ingredients:[
    {nom:"Quinoa", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Potimarron", qte:"600", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignon rouge", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Féta", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Noix", qte:"50", unite:"g", rayon:"Épicerie"}]},

  { nom:"Tortilla espagnole", emoji:"🍳", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:[], etapes:["Coupez les pommes de terre en fines rondelles et l'oignon en lamelles.", "Faites-les cuire doucement dans l'huile 20 minutes, sans les colorer. Égouttez.", "Battez les œufs, mélangez-y les pommes de terre, laissez reposer 10 minutes.", "Cuisez à feu doux 8 minutes, retournez à l'aide d'une assiette, 5 minutes de plus."], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"700", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"6", unite:"", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Huile d'olive", qte:"5", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Galettes de pommes de terre", emoji:"🥔", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:[], etapes:["Râpez les pommes de terre et pressez-les fort pour ôter l'eau : c'est la clé du croustillant.", "Mélangez avec l'oignon râpé, les œufs et la farine.", "Formez des galettes fines dans une poêle bien chaude.", "Faites dorer 4 minutes de chaque côté. Servez avec la salade."], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Farine", qte:"50", unite:"g", rayon:"Épicerie"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Tarte fine aux oignons", emoji:"🧅", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Émincez les oignons et faites-les fondre 30 minutes à feu très doux : ils doivent confire.", "Étalez la pâte, piquez-la.", "Répartissez les oignons, ajoutez la crème et le thym.", "Enfournez 25 minutes à 200 °C."], lien:"", ingredients:[
    {nom:"Pâte feuilletée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Oignons", qte:"5", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"10", unite:"cl", rayon:"Crèmerie"},
    {nom:"Thym", qte:"1", unite:"branche(s)", rayon:"Fruits & légumes"}]},

  { nom:"Tarte rustique aux champignons", emoji:"🍄", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["automne"], etapes:["Faites revenir les échalotes puis les champignons émincés jusqu'à évaporation de l'eau.", "Ajoutez la crème et le persil, laissez épaissir.", "Étalez la pâte, garnissez le centre, repliez grossièrement les bords.", "Enfournez 30 minutes à 190 °C."], lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Champignons de Paris", qte:"400", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"15", unite:"cl", rayon:"Crèmerie"},
    {nom:"Échalote", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Salade de lentilles et féta", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["printemps"], etapes:["Cuisez les lentilles 25 minutes à l'eau non salée, salez en fin de cuisson.", "Rincez-les à l'eau froide et égouttez.", "Coupez les radis en rondelles, ciselez l'échalote et le persil.", "Mélangez, émiettez la féta, assaisonnez d'huile et de vinaigre."], lien:"", ingredients:[
    {nom:"Lentilles vertes", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Féta", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Radis", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Échalote", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Gratin de blettes", emoji:"🥬", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["printemps", "automne"], etapes:["Séparez le vert des côtes. Cuisez les côtes 15 minutes à l'eau, le vert 5 minutes.", "Pressez le vert pour ôter l'eau.", "Préparez une béchamel avec le beurre, la farine et le lait.", "Disposez les blettes dans un plat, nappez, couvrez de gruyère, gratinez 25 minutes."], lien:"", ingredients:[
    {nom:"Blettes", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"},
    {nom:"Farine", qte:"40", unite:"g", rayon:"Épicerie"},
    {nom:"Gruyère râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Soupe au pistou", emoji:"🥣", type:"leger", vegetarien:true, rapide:false, thermomix:true, saisons:["ete"], etapes:["Coupez les légumes en petits dés, couvrez d'eau salée.", "Laissez cuire 25 minutes, ajoutez les coquillettes les 10 dernières minutes.", "Pilez le basilic avec l'ail, l'huile d'olive et le parmesan pour faire le pistou.", "Servez la soupe et ajoutez une cuillère de pistou dans chaque assiette."], lien:"", ingredients:[
    {nom:"Haricots verts", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Courgette", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Coquillettes", qte:"150", unite:"g", rayon:"Épicerie"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Parmesan", qte:"60", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Pommes de terre farcies au fromage", emoji:"🥔", type:"consistant", vegetarien:true, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Enfournez les pommes de terre entières 1 h à 200 °C, jusqu'à ce qu'elles soient tendres.", "Coupez un chapeau, creusez-les délicatement.", "Mélangez la chair avec la crème et le fromage coupé en dés.", "Regarnissez et repassez 15 minutes au four. Servez avec la salade."], lien:"", ingredients:[
    {nom:"Grosses pommes de terre", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Fromage à raclette", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"10", unite:"cl", rayon:"Crèmerie"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Poêlée de légumes d'hiver", emoji:"🥕", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["hiver"], etapes:["Épluchez et coupez tous les légumes en cubes réguliers.", "Faites rissoler les lardons, réservez-les.", "Faites revenir les légumes 25 minutes à feu moyen, en remuant de temps en temps.", "Remettez les lardons en fin de cuisson."], lien:"", ingredients:[
    {nom:"Panais", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Navets", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pommes de terre", qte:"500", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Lardons", qte:"150", unite:"g", rayon:"Boucherie"}]},

  { nom:"Salade de chou croquante", emoji:"🥬", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Émincez le chou le plus finement possible, râpez les carottes.", "Mélangez le yaourt et la moutarde pour la sauce.", "Ajoutez les raisins secs.", "Mélangez et laissez reposer 30 minutes au frais avant de servir."], lien:"", ingredients:[
    {nom:"Chou blanc", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Raisins secs", qte:"60", unite:"g", rayon:"Épicerie"},
    {nom:"Yaourt nature", qte:"1", unite:"pot(s)", rayon:"Crèmerie"},
    {nom:"Moutarde", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Crêpes salées complètes", emoji:"🥞", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:[], etapes:["Mélangez la farine, les œufs et le lait sans grumeaux. Laissez reposer 30 minutes.", "Faites cuire les crêpes une à une dans une poêle chaude.", "Garnissez chacune de jambon et de gruyère.", "Repliez et laissez fondre le fromage à couvert."], lien:"", ingredients:[
    {nom:"Farine", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Jambon blanc", qte:"4", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Gruyère râpé", qte:"120", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Clafoutis de tomates cerises", emoji:"🍅", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], etapes:["Battez les œufs avec la farine puis le lait, jusqu'à obtenir une pâte lisse.", "Salez, poivrez.", "Disposez les tomates cerises entières dans un plat beurré, versez l'appareil.", "Émiettez le chèvre par-dessus et enfournez 35 minutes à 180 °C."], lien:"", ingredients:[
    {nom:"Tomates cerises", qte:"400", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Lait", qte:"25", unite:"cl", rayon:"Crèmerie"},
    {nom:"Farine", qte:"80", unite:"g", rayon:"Épicerie"},
    {nom:"Chèvre", qte:"1", unite:"bûche(s)", rayon:"Crèmerie"}]},

  { nom:"Soupe thaï au poulet", emoji:"🍜", type:"leger", vegetarien:false, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites revenir le gingembre râpé, ajoutez le poulet en lanières.", "Versez le lait de coco et autant d'eau, laissez frémir 10 minutes.", "Ajoutez les nouilles de riz, poursuivez 4 minutes.", "Hors du feu, ajoutez le jus de citron vert et la coriandre."], lien:"", ingredients:[
    {nom:"Blancs de poulet", qte:"400", unite:"g", rayon:"Boucherie"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Nouilles de riz", qte:"200", unite:"g", rayon:"Épicerie"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"},
    {nom:"Citron vert", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Coriandre", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Boulettes de poulet à l'indienne", emoji:"🍖", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:[], etapes:["Mélangez le poulet haché, la chapelure et le curry, formez des boulettes.", "Faites-les dorer de tous côtés.", "Versez le lait de coco, laissez mijoter 15 minutes à feu doux.", "Servez avec le riz basmati."], lien:"", ingredients:[
    {nom:"Poulet haché", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Chapelure", qte:"50", unite:"g", rayon:"Épicerie"},
    {nom:"Lait de coco", qte:"25", unite:"cl", rayon:"Épicerie"},
    {nom:"Curry en poudre", qte:"2", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Gratin de ravioles aux épinards", emoji:"🧀", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["printemps"], etapes:["Faites tomber les épinards 3 minutes à la poêle, pressez-les.", "Disposez les ravioles et les épinards en couches dans un plat.", "Versez la crème, salez, poivrez.", "Parsemez de gruyère et enfournez 20 minutes à 200 °C."], lien:"", ingredients:[
    {nom:"Ravioles", qte:"6", unite:"paquet(s)", rayon:"Crèmerie"},
    {nom:"Épinards", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Crème liquide", qte:"25", unite:"cl", rayon:"Crèmerie"},
    {nom:"Gruyère râpé", qte:"80", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Cari de poisson créole", emoji:"🐟", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Faites revenir les oignons avec le curcuma et le gingembre râpé.", "Ajoutez les tomates coupées en morceaux, laissez compoter 10 minutes.", "Posez les filets de poisson dessus, couvrez, laissez cuire 10 minutes à feu doux.", "Servez avec le riz."], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"600", unite:"g", rayon:"Poissonnerie"},
    {nom:"Tomates", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Curcuma", qte:"1", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Salade de pâtes au thon", emoji:"🥗", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], etapes:["Cuisez les farfalle al dente, rincez-les à l'eau froide.", "Coupez les tomates cerises en deux, égouttez le maïs et le thon.", "Mélangez le tout avec les olives.", "Assaisonnez et laissez reposer 30 minutes au frais."], lien:"", ingredients:[
    {nom:"Farfalle", qte:"350", unite:"g", rayon:"Épicerie"},
    {nom:"Thon en boîte", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Tomates cerises", qte:"250", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Maïs", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Olives noires", qte:"80", unite:"g", rayon:"Épicerie"}]},

  { nom:"Quiche au saumon et poireaux", emoji:"🥧", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Émincez les poireaux et faites-les fondre 15 minutes à couvert.", "Étalez la pâte, répartissez les poireaux puis le saumon en lanières.", "Battez les œufs avec la crème, poivrez, salez très peu — le saumon l'est déjà.", "Versez et enfournez 35 minutes à 180 °C."], lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Saumon fumé", qte:"150", unite:"g", rayon:"Poissonnerie"},
    {nom:"Poireaux", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Chakchouka", emoji:"🍳", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Faites revenir l'oignon et les poivrons en lanières 15 minutes.", "Ajoutez les tomates en morceaux et le cumin, laissez réduire 15 minutes.", "Creusez quatre puits, cassez un œuf dans chacun.", "Couvrez et laissez cuire 6 minutes : le blanc doit être pris, le jaune coulant.", "Servez à la poêle avec le pain."], lien:"", ingredients:[
    {nom:"Poivrons", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"5", unite:"", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"4", unite:"", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Cumin", qte:"1", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Pain de campagne", qte:"4", unite:"tranche(s)", rayon:"Boulangerie"}]},

  { nom:"Poulet rôti aux herbes et légumes racines", emoji:"🍗", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Frottez le poulet de sel, poivre et romarin.", "Coupez les légumes racines en gros morceaux et disposez-les dans le plat.", "Enfournez 1 h 15 à 190 °C en arrosant régulièrement.", "Laissez reposer 10 minutes avant de découper."], lien:"", ingredients:[
    {nom:"Poulet fermier", qte:"1", unite:"", rayon:"Boucherie"},
    {nom:"Panais", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Navets", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Romarin", qte:"2", unite:"branche(s)", rayon:"Fruits & légumes"}]},

  { nom:"Velouté de butternut au lard", emoji:"🎃", type:"leger", vegetarien:false, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Épluchez la courge et coupez-la en cubes.", "Faites suer l'oignon, ajoutez la courge et le bouillon, laissez cuire 25 minutes.", "Faites rissoler les lardons à part jusqu'à ce qu'ils soient croustillants.", "Mixez le velouté, ajoutez la crème, parsemez de lardons au moment de servir."], lien:"", ingredients:[
    {nom:"Courge butternut", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Lardons", qte:"150", unite:"g", rayon:"Boucherie"},
    {nom:"Bouillon de volaille", qte:"70", unite:"cl", rayon:"Épicerie"},
    {nom:"Crème liquide", qte:"10", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Pizza blanche chèvre-miel", emoji:"🍕", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:[], etapes:["Étalez la pâte, tartinez-la de crème fraîche.", "Répartissez le chèvre en rondelles.", "Enfournez 12 minutes à 250 °C.", "À la sortie, arrosez de miel et parsemez de noix concassées."], lien:"", ingredients:[
    {nom:"Pâte à pizza", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Chèvre", qte:"2", unite:"bûche(s)", rayon:"Crèmerie"},
    {nom:"Miel", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Noix", qte:"50", unite:"g", rayon:"Épicerie"}]},

  { nom:"Blanquette de poisson", emoji:"🐟", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites fondre les poireaux et les carottes en rondelles 15 minutes.", "Couvrez d'eau, laissez cuire 10 minutes.", "Ajoutez le poisson en morceaux et pochez 6 minutes à frémissement.", "Retirez le poisson, liez le bouillon avec la crème, nappez. Servez avec le riz."], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"700", unite:"g", rayon:"Poissonnerie"},
    {nom:"Poireaux", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Wraps poulet-crudités", emoji:"🌯", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Faites griller le poulet, laissez tiédir et émincez-le.", "Mélangez le yaourt avec des herbes pour la sauce.", "Tartinez les tortillas, garnissez de salade, tomate et poulet.", "Roulez serré, coupez en deux en biais."], lien:"", ingredients:[
    {nom:"Tortillas", qte:"4", unite:"", rayon:"Boulangerie"},
    {nom:"Blancs de poulet", qte:"400", unite:"g", rayon:"Boucherie"},
    {nom:"Laitue", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomate", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Yaourt nature", qte:"1", unite:"pot(s)", rayon:"Crèmerie"}]},

  { nom:"Poêlée de pommes de terre et saucisse fumée", emoji:"🥔", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Cuisez les pommes de terre 15 minutes à l'eau, laissez tiédir et coupez-les en rondelles.", "Faites revenir les oignons émincés.", "Ajoutez les pommes de terre et laissez-les bien dorer sans trop remuer.", "Ajoutez la saucisse en rondelles, réchauffez 5 minutes, parsemez de persil."], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Saucisse fumée", qte:"400", unite:"g", rayon:"Boucherie"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Rôti de porc aux pruneaux", emoji:"🍖", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Faites dorer le rôti de tous côtés dans une cocotte.", "Ajoutez les oignons émincés et un verre d'eau, couvrez.", "Laissez mijoter 1 h à feu doux, ajoutez les pruneaux à mi-cuisson.", "Retirez la viande, ajoutez la crème au jus, laissez réduire et nappez.", "Servez avec les pommes de terre."], lien:"", ingredients:[
    {nom:"Rôti de porc", qte:"1", unite:"kg", rayon:"Boucherie"},
    {nom:"Pruneaux", qte:"200", unite:"g", rayon:"Épicerie"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"15", unite:"cl", rayon:"Crèmerie"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"}]},

  { nom:"Curry de crevettes au lait de coco", emoji:"🍤", type:"consistant", vegetarien:false, rapide:true, thermomix:true, saisons:[], etapes:["Faites revenir l'oignon émincé et l'ail dans un peu d'huile.", "Ajoutez la pâte de curry et remuez 1 minute pour la réveiller.", "Versez le lait de coco et laissez frémir 5 minutes.", "Ajoutez les crevettes et comptez 3 minutes : au-delà, elles durcissent.", "Servez avec le riz et un peu de coriandre."], lien:"", ingredients:[
    {nom:"Crevettes décortiquées", qte:"400", unite:"g", rayon:"Poissonnerie"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Pâte de curry", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Coriandre", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Brandade de morue", emoji:"🐟", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["hiver"], etapes:["Dessalez la morue la veille en changeant l'eau trois fois.", "Pochez-la 10 minutes à petits frémissements, puis émiettez-la en retirant arêtes et peau.", "Écrasez les pommes de terre cuites avec l'huile d'olive et l'ail.", "Mélangez le poisson et la purée, allongez avec un peu de lait chaud.", "Versez dans un plat, parsemez de chapelure et dorez 15 minutes au four."], lien:"", ingredients:[
    {nom:"Morue salée", qte:"600", unite:"g", rayon:"Poissonnerie"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Ail", qte:"3", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Huile d'olive", qte:"10", unite:"cl", rayon:"Épicerie"},
    {nom:"Lait", qte:"15", unite:"cl", rayon:"Crèmerie"}]},

  { nom:"Poisson pané maison et purée", emoji:"🐟", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Coupez les filets en gros bâtonnets.", "Passez-les dans la farine, puis dans l'œuf battu, puis dans la chapelure.", "Faites-les dorer 3 minutes de chaque côté à la poêle, dans un peu d'huile.", "Écrasez les pommes de terre cuites avec le lait chaud et une noix de beurre.", "Servez avec un quartier de citron."], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"600", unite:"g", rayon:"Poissonnerie"},
    {nom:"Chapelure", qte:"150", unite:"g", rayon:"Épicerie"},
    {nom:"Œufs", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Lait", qte:"15", unite:"cl", rayon:"Crèmerie"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Saint-jacques poêlées aux poireaux", emoji:"🐚", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["hiver"], etapes:["Émincez les poireaux en fines rondelles et faites-les fondre 15 minutes au beurre, à couvert.", "Ajoutez la crème et laissez épaissir doucement.", "Séchez les noix de saint-jacques dans du papier absorbant : c'est ce qui les fera dorer.", "Saisissez-les 1 minute par face à feu vif, pas plus.", "Dressez la fondue de poireaux, posez les noix dessus."], lien:"", ingredients:[
    {nom:"Noix de saint-jacques", qte:"12", unite:"", rayon:"Poissonnerie"},
    {nom:"Poireaux", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"15", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Croquettes de thon", emoji:"🥫", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Écrasez les pommes de terre cuites à la fourchette.", "Mélangez avec le thon égoutté, l'œuf, la moutarde et le persil haché.", "Formez des galettes avec les mains humides.", "Faites-les dorer 4 minutes par face dans un peu d'huile.", "Servez avec une salade verte."], lien:"", ingredients:[
    {nom:"Thon en boîte", qte:"3", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Pommes de terre", qte:"500", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Moutarde", qte:"1", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Bar au four et fenouil", emoji:"🐟", type:"leger", vegetarien:false, rapide:false, thermomix:false, saisons:["ete", "automne"], etapes:["Émincez les fenouils et disposez-les dans un plat avec l'huile d'olive.", "Posez le poisson vidé dessus, glissez des rondelles de citron dans le ventre.", "Arrosez de vin blanc et salez.", "Enfournez 30 minutes à 190 °C en arrosant une fois à mi-cuisson.", "La chair se détache toute seule de l'arête quand c'est prêt."], lien:"", ingredients:[
    {nom:"Bar", qte:"2", unite:"", rayon:"Poissonnerie"},
    {nom:"Fenouil", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Citron", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Vin blanc", qte:"15", unite:"cl", rayon:"Boissons"},
    {nom:"Huile d'olive", qte:"4", unite:"c. à soupe", rayon:"Épicerie"}]},

  { nom:"Soupe de poisson express", emoji:"🍲", type:"leger", vegetarien:false, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites revenir l'oignon, le poireau et l'ail.", "Ajoutez les tomates concassées, le safran et un litre d'eau.", "Laissez frémir 15 minutes.", "Ajoutez les morceaux de poisson et comptez 8 minutes.", "Mixez ou laissez en morceaux, selon l'envie, et servez avec du pain grillé."], lien:"", ingredients:[
    {nom:"Filets de poisson blanc", qte:"500", unite:"g", rayon:"Poissonnerie"},
    {nom:"Tomates concassées", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Poireaux", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Safran", qte:"1", unite:"pincée(s)", rayon:"Épicerie"},
    {nom:"Pain", qte:"1", unite:"", rayon:"Boulangerie"}]},

  { nom:"Moules au curry", emoji:"🦪", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Grattez et rincez les moules, jetez celles qui restent ouvertes.", "Faites suer l'échalote, ajoutez le curry et la crème.", "Versez les moules, couvrez et laissez 6 minutes à feu vif en secouant la casserole.", "Elles sont prêtes quand elles sont toutes ouvertes.", "Parsemez de persil et servez avec des frites ou du pain."], lien:"", ingredients:[
    {nom:"Moules", qte:"2", unite:"kg", rayon:"Poissonnerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Curry", qte:"1", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Échalotes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Tarte au thon et tomates", emoji:"🥧", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], etapes:["Étalez la pâte dans un moule et piquez-la à la fourchette.", "Tartinez-la de moutarde : c'est ce qui empêche le fond de détremper.", "Répartissez le thon égoutté, puis les rondelles de tomates.", "Couvrez de fromage râpé et d'herbes de Provence.", "Enfournez 30 minutes à 200 °C."], lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Thon en boîte", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Tomates", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Fromage râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Filets de sole meunière", emoji:"🐟", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Farinez légèrement les filets et tapotez pour retirer l'excédent.", "Faites chauffer le beurre jusqu'à ce qu'il mousse, sans le laisser noircir.", "Déposez les filets et comptez 2 minutes par face.", "Retirez-les, ajoutez le jus de citron dans la poêle et laissez grésiller.", "Nappez les filets de ce beurre citronné, parsemez de persil."], lien:"", ingredients:[
    {nom:"Filets de sole", qte:"600", unite:"g", rayon:"Poissonnerie"},
    {nom:"Beurre", qte:"80", unite:"g", rayon:"Crèmerie"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Farine", qte:"50", unite:"g", rayon:"Épicerie"},
    {nom:"Persil", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Wok de crevettes aux légumes", emoji:"🍤", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Coupez tous les légumes en fines lanières avant d'allumer le feu : après, tout va très vite.", "Saisissez les crevettes 2 minutes à feu vif, réservez-les.", "Faites sauter les légumes 5 minutes : ils doivent rester croquants.", "Remettez les crevettes, ajoutez la sauce soja et le gingembre râpé.", "Servez aussitôt sur des nouilles."], lien:"", ingredients:[
    {nom:"Crevettes décortiquées", qte:"400", unite:"g", rayon:"Poissonnerie"},
    {nom:"Poivrons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Nouilles chinoises", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Sauce soja", qte:"4", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"}]},

  { nom:"Cabillaud à la crème de poireaux", emoji:"🐟", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Émincez les poireaux et faites-les fondre 20 minutes à couvert, à feu doux.", "Ajoutez la crème, salez, poivrez et laissez épaissir.", "Posez les dos de cabillaud sur ce lit de poireaux.", "Couvrez et laissez cuire 10 minutes à feu très doux.", "Le poisson est cuit quand il se sépare en gros pétales."], lien:"", ingredients:[
    {nom:"Dos de cabillaud", qte:"4", unite:"", rayon:"Poissonnerie"},
    {nom:"Poireaux", qte:"5", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"30", unite:"g", rayon:"Crèmerie"},
    {nom:"Riz", qte:"250", unite:"g", rayon:"Épicerie"}]},

  { nom:"Poulet chasseur", emoji:"🍗", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne"], etapes:["Faites dorer les morceaux de poulet de tous côtés dans une cocotte.", "Réservez-les, faites revenir les échalotes et les champignons dans le même gras.", "Déglacez au vin blanc et laissez réduire de moitié.", "Ajoutez les tomates concassées, l'estragon et le poulet.", "Couvrez et laissez mijoter 40 minutes à feu doux."], lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"6", unite:"", rayon:"Boucherie"},
    {nom:"Champignons de Paris", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Tomates concassées", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Vin blanc", qte:"20", unite:"cl", rayon:"Boissons"},
    {nom:"Échalotes", qte:"3", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Cordon bleu maison", emoji:"🍗", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Ouvrez les escalopes en portefeuille sans les séparer complètement.", "Glissez une tranche de jambon et une de fromage à l'intérieur, refermez.", "Passez dans la farine, puis l'œuf battu, puis la chapelure.", "Faites dorer 5 minutes par face à feu moyen : le fromage doit fondre avant que la panure ne brûle.", "Servez avec des haricots verts ou une purée."], lien:"", ingredients:[
    {nom:"Escalopes de dinde", qte:"4", unite:"", rayon:"Boucherie"},
    {nom:"Jambon blanc", qte:"4", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Emmental", qte:"4", unite:"tranche(s)", rayon:"Crèmerie"},
    {nom:"Chapelure", qte:"150", unite:"g", rayon:"Épicerie"},
    {nom:"Œufs", qte:"2", unite:"", rayon:"Crèmerie"}]},

  { nom:"Osso buco de veau", emoji:"🥩", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Farinez les tranches de veau et faites-les dorer dans l'huile d'olive.", "Ajoutez l'oignon, la carotte et le céleri en petits dés.", "Déglacez au vin blanc, laissez évaporer, puis versez les tomates.", "Couvrez et laissez mijoter 1 h 30 à tout petit feu.", "Terminez avec le zeste de citron et le persil hachés ensemble."], lien:"", ingredients:[
    {nom:"Jarret de veau", qte:"4", unite:"tranche(s)", rayon:"Boucherie"},
    {nom:"Tomates concassées", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Céleri", qte:"2", unite:"branche(s)", rayon:"Fruits & légumes"},
    {nom:"Vin blanc", qte:"20", unite:"cl", rayon:"Boissons"},
    {nom:"Citron", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Navarin d'agneau", emoji:"🐑", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["printemps"], etapes:["Faites dorer les morceaux d'agneau, saupoudrez de farine et remuez 2 minutes.", "Mouillez à hauteur, ajoutez l'ail et le thym, laissez mijoter 45 minutes.", "Ajoutez les navets et les carottes taillés en gros morceaux.", "Poursuivez 30 minutes, puis ajoutez les petits pois en fin de cuisson.", "La viande doit se défaire à la cuillère."], lien:"", ingredients:[
    {nom:"Épaule d'agneau", qte:"1", unite:"kg", rayon:"Boucherie"},
    {nom:"Navets", qte:"6", unite:"", rayon:"Fruits & légumes"},
    {nom:"Carottes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Petits pois", qte:"300", unite:"g", rayon:"Surgelés"},
    {nom:"Ail", qte:"3", unite:"gousse(s)", rayon:"Fruits & légumes"}]},

  { nom:"Poulet yassa", emoji:"🍗", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], etapes:["Faites mariner le poulet au moins 2 heures avec le jus de citron, l'oignon émincé et l'huile.", "Égouttez les morceaux et faites-les dorer à la poêle.", "Faites confire les oignons de la marinade 20 minutes à feu doux : ils doivent fondre.", "Remettez le poulet, ajoutez la moutarde et un verre d'eau.", "Laissez mijoter 30 minutes et servez avec du riz."], lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"6", unite:"", rayon:"Boucherie"},
    {nom:"Oignons", qte:"6", unite:"", rayon:"Fruits & légumes"},
    {nom:"Citron", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Moutarde", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Keftas d'agneau et boulgour", emoji:"🍢", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], etapes:["Mélangez la viande hachée avec l'oignon râpé, le cumin, la menthe et un peu de sel.", "Formez des boudins autour de piques, ou de simples boulettes allongées.", "Faites-les griller 4 minutes par face.", "Faites gonfler le boulgour dans le double d'eau bouillante, à couvert.", "Servez avec du yaourt et un filet de citron."], lien:"", ingredients:[
    {nom:"Agneau haché", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Boulgour", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Menthe", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Yaourt nature", qte:"2", unite:"pot(s)", rayon:"Crèmerie"},
    {nom:"Cumin", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Porc au caramel", emoji:"🥢", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Coupez le porc en cubes réguliers.", "Faites un caramel à sec avec le sucre, puis stoppez-le avec la sauce soja — attention aux projections.", "Ajoutez la viande et enrobez-la bien.", "Versez un verre d'eau, le gingembre râpé, et laissez réduire 20 minutes à feu doux.", "La sauce doit napper la viande. Servez avec du riz."], lien:"", ingredients:[
    {nom:"Filet mignon de porc", qte:"700", unite:"g", rayon:"Boucherie"},
    {nom:"Sucre", qte:"4", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Sauce soja", qte:"6", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Petit salé aux lentilles", emoji:"🥓", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Faites dessaler la viande 1 heure dans l'eau froide, puis égouttez.", "Mettez-la dans une cocotte avec l'oignon piqué de clous de girofle et la carotte.", "Couvrez d'eau et laissez cuire 1 heure à petits bouillons.", "Ajoutez les lentilles et poursuivez 30 minutes.", "Retirez l'oignon, tranchez la viande et servez sur les lentilles."], lien:"", ingredients:[
    {nom:"Petit salé", qte:"800", unite:"g", rayon:"Boucherie"},
    {nom:"Saucisses fumées", qte:"4", unite:"", rayon:"Boucherie"},
    {nom:"Lentilles vertes", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Carottes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Magret de canard aux pommes", emoji:"🦆", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Quadrillez le gras du magret au couteau, sans entamer la chair.", "Posez-le côté gras dans une poêle froide, puis allumez : 8 minutes suffisent à le faire fondre et dorer.", "Retournez et comptez 4 minutes de plus pour une chair rosée.", "Laissez reposer 5 minutes sous une feuille d'aluminium avant de trancher.", "Faites poêler les quartiers de pommes dans un peu de graisse rendue, avec le miel."], lien:"", ingredients:[
    {nom:"Magret de canard", qte:"2", unite:"", rayon:"Boucherie"},
    {nom:"Pommes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Miel", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"}]},

  { nom:"Bavette à l'échalote", emoji:"🥩", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:[], etapes:["Sortez la viande du réfrigérateur 30 minutes avant : elle cuira plus régulièrement.", "Saisissez les bavettes 2 minutes par face à feu très vif, réservez au chaud.", "Faites fondre les échalotes ciselées dans la même poêle, à feu doux.", "Déglacez au vinaigre puis au vin rouge, laissez réduire.", "Montez la sauce avec une noix de beurre et nappez la viande."], lien:"", ingredients:[
    {nom:"Bavette de bœuf", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Échalotes", qte:"6", unite:"", rayon:"Fruits & légumes"},
    {nom:"Vin rouge", qte:"15", unite:"cl", rayon:"Boissons"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"}]},

  { nom:"Poulet tandoori et riz", emoji:"🍗", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], etapes:["Mélangez le yaourt, les épices tandoori, l'ail et le jus de citron.", "Entaillez les morceaux de poulet et enrobez-les de cette marinade.", "Laissez reposer au frais au moins 2 heures, une nuit si vous pouvez.", "Enfournez 35 minutes à 200 °C en retournant à mi-cuisson.", "Servez avec du riz basmati et du concombre au yaourt."], lien:"", ingredients:[
    {nom:"Cuisses de poulet", qte:"6", unite:"", rayon:"Boucherie"},
    {nom:"Yaourt nature", qte:"2", unite:"pot(s)", rayon:"Crèmerie"},
    {nom:"Épices tandoori", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Riz basmati", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Boulettes suédoises", emoji:"🍽️", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Trempez la chapelure dans le lait, puis mélangez-la à la viande, l'œuf et l'oignon râpé.", "Assaisonnez de muscade et formez des boulettes de la taille d'une noix.", "Faites-les dorer à la poêle en les roulant, réservez.", "Dans la même poêle, faites un roux avec le beurre et la farine, mouillez de bouillon puis de crème.", "Remettez les boulettes 10 minutes dans la sauce. Servez avec une purée."], lien:"", ingredients:[
    {nom:"Bœuf haché", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Chapelure", qte:"60", unite:"g", rayon:"Épicerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pommes de terre", qte:"800", unite:"g", rayon:"Fruits & légumes"}]},

  { nom:"Émincé de dinde à la crème", emoji:"🦃", type:"consistant", vegetarien:false, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Coupez les escalopes en lanières.", "Saisissez-les 3 minutes à feu vif, réservez : trop cuites, elles deviennent sèches.", "Faites suer les champignons émincés jusqu'à ce que leur eau s'évapore.", "Ajoutez la crème, la moutarde, laissez épaissir 5 minutes.", "Remettez la viande juste pour la réchauffer. Servez avec des tagliatelles."], lien:"", ingredients:[
    {nom:"Escalopes de dinde", qte:"600", unite:"g", rayon:"Boucherie"},
    {nom:"Champignons de Paris", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Moutarde", qte:"1", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Tagliatelles", qte:"400", unite:"g", rayon:"Épicerie"}]},

  { nom:"Bo bun au bœuf", emoji:"🥗", type:"leger", vegetarien:false, rapide:true, thermomix:false, saisons:["ete"], etapes:["Faites tremper les vermicelles de riz dans l'eau bouillante, puis rincez-les à l'eau froide.", "Faites mariner le bœuf émincé avec la sauce soja, l'ail et un peu de sucre.", "Saisissez-le 2 minutes à feu très vif.", "Dressez dans un grand bol : vermicelles, carotte râpée, concombre, salade, viande.", "Arrosez de sauce nuoc-mâm allongée d'eau et de citron, parsemez de cacahuètes."], lien:"", ingredients:[
    {nom:"Bœuf à griller", qte:"500", unite:"g", rayon:"Boucherie"},
    {nom:"Vermicelles de riz", qte:"300", unite:"g", rayon:"Épicerie"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Cacahuètes", qte:"80", unite:"g", rayon:"Épicerie"},
    {nom:"Menthe", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Veau Marengo", emoji:"🍲", type:"consistant", vegetarien:false, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites dorer les morceaux de veau, saupoudrez de farine et remuez.", "Ajoutez l'oignon, l'ail et les tomates concassées.", "Mouillez au vin blanc, ajoutez le bouquet garni.", "Couvrez et laissez mijoter 1 h 15 à feu doux.", "Ajoutez les champignons 20 minutes avant la fin."], lien:"", ingredients:[
    {nom:"Épaule de veau", qte:"1", unite:"kg", rayon:"Boucherie"},
    {nom:"Tomates concassées", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Champignons de Paris", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Vin blanc", qte:"20", unite:"cl", rayon:"Boissons"},
    {nom:"Oignon", qte:"2", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Rougail saucisse", emoji:"🌶️", type:"consistant", vegetarien:false, rapide:false, thermomix:false, saisons:[], etapes:["Faites bouillir les saucisses 10 minutes pour les dessaler, puis coupez-les en tronçons.", "Faites-les dorer à la poêle, réservez.", "Faites revenir les oignons, l'ail, le gingembre et le curcuma.", "Ajoutez les tomates, laissez compoter 10 minutes.", "Remettez les saucisses, couvrez et laissez mijoter 25 minutes. Servez avec du riz."], lien:"", ingredients:[
    {nom:"Saucisses fumées", qte:"6", unite:"", rayon:"Boucherie"},
    {nom:"Tomates", qte:"6", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"},
    {nom:"Curcuma", qte:"1", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Tian de légumes provençal", emoji:"🍆", type:"leger", vegetarien:true, rapide:false, thermomix:false, saisons:["ete"], etapes:["Faites fondre les oignons émincés au fond d'un plat à gratin.", "Coupez courgettes, aubergines et tomates en rondelles de même épaisseur.", "Rangez-les debout en les alternant, bien serrées.", "Arrosez d'huile d'olive, salez, parsemez de thym et d'ail haché.", "Enfournez 1 heure à 180 °C : les légumes doivent confire, pas bouillir."], lien:"", ingredients:[
    {nom:"Courgettes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Aubergines", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"5", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignons", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Huile d'olive", qte:"6", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Thym", qte:"2", unite:"branche(s)", rayon:"Fruits & légumes"}]},

  { nom:"Gnocchis au gorgonzola", emoji:"🧀", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Faites chauffer la crème à feu doux avec le gorgonzola coupé en morceaux.", "Remuez jusqu'à obtenir une sauce lisse, poivrez généreusement.", "Plongez les gnocchis dans l'eau bouillante salée : ils sont cuits quand ils remontent.", "Égouttez-les et versez-les dans la sauce.", "Parsemez de noix concassées et servez tout de suite."], lien:"", ingredients:[
    {nom:"Gnocchis", qte:"800", unite:"g", rayon:"Crèmerie"},
    {nom:"Gorgonzola", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Noix", qte:"80", unite:"g", rayon:"Épicerie"}]},

  { nom:"Boulettes de courgettes à la féta", emoji:"🥒", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Râpez les courgettes, salez-les et laissez dégorger 15 minutes.", "Pressez-les fortement entre vos mains : c'est l'étape qui fait tenir les boulettes.", "Mélangez avec la féta émiettée, l'œuf, la farine et la menthe.", "Formez des galettes et faites-les dorer 4 minutes par face.", "Servez avec du yaourt citronné."], lien:"", ingredients:[
    {nom:"Courgettes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Féta", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Œufs", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Farine", qte:"80", unite:"g", rayon:"Épicerie"},
    {nom:"Menthe", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Curry de patate douce", emoji:"🍠", type:"consistant", vegetarien:true, rapide:false, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites revenir l'oignon, l'ail et le gingembre.", "Ajoutez le curry et remuez 1 minute.", "Versez les patates douces en cubes, le lait de coco et un verre d'eau.", "Laissez mijoter 25 minutes à couvert.", "Ajoutez les épinards en fin de cuisson, juste le temps qu'ils tombent."], lien:"", ingredients:[
    {nom:"Patates douces", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Lait de coco", qte:"40", unite:"cl", rayon:"Épicerie"},
    {nom:"Épinards", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Curry", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Gingembre", qte:"1", unite:"morceau(x)", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Soupe de nouilles au miso", emoji:"🍜", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Portez un litre d'eau à frémissement — surtout pas à ébullition.", "Délayez le miso dans une louche d'eau chaude avant de l'incorporer.", "Ajoutez les champignons émincés et le tofu en dés, laissez 5 minutes.", "Faites cuire les nouilles à part et répartissez-les dans les bols.", "Versez le bouillon dessus, parsemez d'oignons nouveaux."], lien:"", ingredients:[
    {nom:"Pâte de miso", qte:"3", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Nouilles chinoises", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Tofu", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Champignons de Paris", qte:"200", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Oignons nouveaux", qte:"3", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Riz sauté aux légumes et œuf", emoji:"🍚", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:[], etapes:["Utilisez du riz cuit la veille : froid, il ne colle pas.", "Faites sauter les légumes en petits dés 5 minutes à feu vif.", "Poussez-les sur le côté, versez les œufs battus et brouillez-les rapidement.", "Ajoutez le riz, mélangez tout et laissez-le grésiller sans trop remuer.", "Assaisonnez de sauce soja et servez aussitôt."], lien:"", ingredients:[
    {nom:"Riz", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Petits pois", qte:"200", unite:"g", rayon:"Surgelés"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Sauce soja", qte:"4", unite:"c. à soupe", rayon:"Épicerie"}]},

  { nom:"Œufs cocotte aux épinards", emoji:"🥚", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["printemps", "automne"], etapes:["Faites tomber les épinards à la poêle avec une noix de beurre.", "Répartissez-les au fond de petits ramequins beurrés.", "Ajoutez une cuillère de crème, puis cassez un œuf dans chacun.", "Salez, poivrez, parsemez de fromage râpé.", "Enfournez 12 minutes à 180 °C au bain-marie : le blanc pris, le jaune coulant."], lien:"", ingredients:[
    {nom:"Œufs", qte:"4", unite:"", rayon:"Crèmerie"},
    {nom:"Épinards", qte:"300", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"10", unite:"cl", rayon:"Crèmerie"},
    {nom:"Fromage râpé", qte:"60", unite:"g", rayon:"Crèmerie"},
    {nom:"Pain", qte:"1", unite:"", rayon:"Boulangerie"}]},

  { nom:"Tarte aux épinards et ricotta", emoji:"🥧", type:"consistant", vegetarien:true, rapide:false, thermomix:false, saisons:["printemps", "automne"], etapes:["Faites tomber les épinards, puis pressez-les pour retirer toute l'eau.", "Mélangez-les avec la ricotta, les œufs et la muscade.", "Étalez la pâte dans le moule et versez l'appareil.", "Parsemez de parmesan.", "Enfournez 35 minutes à 190 °C, jusqu'à ce que le dessus soit doré."], lien:"", ingredients:[
    {nom:"Pâte brisée", qte:"1", unite:"", rayon:"Crèmerie"},
    {nom:"Épinards", qte:"600", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Ricotta", qte:"250", unite:"g", rayon:"Crèmerie"},
    {nom:"Œufs", qte:"3", unite:"", rayon:"Crèmerie"},
    {nom:"Parmesan", qte:"60", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Frittata aux courgettes", emoji:"🍳", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Faites revenir les courgettes en rondelles 10 minutes, jusqu'à ce qu'elles dorent.", "Battez les œufs avec le parmesan, du sel et du poivre.", "Versez-les sur les courgettes et baissez le feu au minimum.", "Laissez prendre 10 minutes à couvert, sans remuer.", "Terminez 3 minutes sous le gril pour dorer le dessus."], lien:"", ingredients:[
    {nom:"Œufs", qte:"8", unite:"", rayon:"Crèmerie"},
    {nom:"Courgettes", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Salade de betteraves et chèvre", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Coupez les betteraves cuites en cubes.", "Préparez une vinaigrette avec le vinaigre balsamique, l'huile et une pointe de miel.", "Mélangez les betteraves à la roquette au dernier moment, sinon elle rosit.", "Émiettez le chèvre par-dessus.", "Parsemez de noix concassées."], lien:"", ingredients:[
    {nom:"Betteraves cuites", qte:"500", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Fromage de chèvre", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Roquette", qte:"100", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Noix", qte:"80", unite:"g", rayon:"Épicerie"},
    {nom:"Vinaigre balsamique", qte:"2", unite:"c. à soupe", rayon:"Épicerie"}]},

  { nom:"Taboulé libanais", emoji:"🌿", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Faites gonfler le boulgour 15 minutes dans un peu d'eau tiède.", "Hachez le persil très finement : dans ce taboulé-là, c'est l'ingrédient principal.", "Coupez les tomates en tout petits dés et ciselez les oignons nouveaux.", "Mélangez le tout avec le jus de citron et l'huile d'olive.", "Laissez reposer 1 heure au frais avant de servir."], lien:"", ingredients:[
    {nom:"Boulgour", qte:"150", unite:"g", rayon:"Épicerie"},
    {nom:"Persil", qte:"3", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Oignons nouveaux", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Citron", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Menthe", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Salade grecque", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Coupez les tomates en quartiers généreux et le concombre en demi-rondelles épaisses.", "Émincez l'oignon rouge très finement.", "Ajoutez les olives et la féta en gros cubes — surtout pas émiettée.", "Arrosez d'huile d'olive et d'origan, ne salez qu'à peine : la féta l'est déjà.", "Servez sans laisser attendre, avec du pain."], lien:"", ingredients:[
    {nom:"Tomates", qte:"5", unite:"", rayon:"Fruits & légumes"},
    {nom:"Concombre", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Féta", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Olives noires", qte:"100", unite:"g", rayon:"Épicerie"},
    {nom:"Oignon rouge", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Huile d'olive", qte:"4", unite:"c. à soupe", rayon:"Épicerie"}]},

  { nom:"Soupe de chou-fleur au curcuma", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Détaillez le chou-fleur en bouquets.", "Faites revenir l'oignon avec le curcuma pour le réveiller.", "Ajoutez le chou-fleur, la pomme de terre et couvrez de bouillon.", "Laissez cuire 20 minutes, jusqu'à ce que la lame d'un couteau s'enfonce sans effort.", "Mixez longuement, ajoutez la crème hors du feu."], lien:"", ingredients:[
    {nom:"Chou-fleur", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pommes de terre", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Curcuma", qte:"1", unite:"c. à café", rayon:"Épicerie"},
    {nom:"Crème fraîche", qte:"10", unite:"cl", rayon:"Crèmerie"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"}]},

  { nom:"Pâtes aux brocolis et amandes", emoji:"🥦", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Faites cuire les brocolis 8 minutes dans l'eau des pâtes, puis récupérez-les.", "Faites cuire les pâtes dans la même eau.", "Pendant ce temps, faites blondir l'ail et les amandes effilées dans l'huile d'olive.", "Écrasez grossièrement les brocolis à la fourchette dans la poêle.", "Mélangez aux pâtes avec un peu d'eau de cuisson et du parmesan."], lien:"", ingredients:[
    {nom:"Pâtes", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Brocoli", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Amandes effilées", qte:"60", unite:"g", rayon:"Épicerie"},
    {nom:"Ail", qte:"2", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Parmesan", qte:"60", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Pâtes à la crème de courgettes", emoji:"🍝", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:["ete"], etapes:["Faites revenir les courgettes en rondelles avec l'oignon, 15 minutes à couvert.", "Mixez avec la ricotta et un peu d'eau de cuisson des pâtes.", "Faites cuire les pâtes al dente.", "Mélangez-les à la crème de courgettes hors du feu.", "Parsemez de basilic et de parmesan."], lien:"", ingredients:[
    {nom:"Pâtes", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Courgettes", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Ricotta", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Polenta crémeuse aux champignons", emoji:"🌽", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Portez le lait et l'eau à frémissement, salez.", "Versez la polenta en pluie en fouettant sans arrêt pour éviter les grumeaux.", "Remuez 5 à 10 minutes, jusqu'à ce qu'elle épaississe, puis incorporez le beurre et le parmesan.", "Faites sauter les champignons à feu vif avec l'ail et le persil.", "Servez la polenta bien crémeuse, les champignons dessus."], lien:"", ingredients:[
    {nom:"Polenta", qte:"250", unite:"g", rayon:"Épicerie"},
    {nom:"Champignons de Paris", qte:"400", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"},
    {nom:"Lait", qte:"50", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Gratin de patates douces", emoji:"🍠", type:"consistant", vegetarien:true, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Coupez les patates douces en fines rondelles, à la mandoline si vous en avez une.", "Frottez le plat avec une gousse d'ail.", "Rangez les rondelles en couches, salez et poivrez entre chacune.", "Versez la crème mélangée au lait, jusqu'à affleurer.", "Enfournez 50 minutes à 180 °C, couvert les 30 premières minutes."], lien:"", ingredients:[
    {nom:"Patates douces", qte:"1", unite:"kg", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"25", unite:"cl", rayon:"Crèmerie"},
    {nom:"Lait", qte:"20", unite:"cl", rayon:"Crèmerie"},
    {nom:"Ail", qte:"1", unite:"gousse(s)", rayon:"Fruits & légumes"},
    {nom:"Fromage râpé", qte:"100", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Curry de chou-fleur et pois chiches", emoji:"🍛", type:"consistant", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites revenir l'oignon avec les épices jusqu'à ce que ça sente bon.", "Ajoutez le chou-fleur en bouquets et enrobez-le bien.", "Versez les tomates et les pois chiches égouttés.", "Laissez mijoter 25 minutes à couvert.", "Terminez avec un filet de citron et de la coriandre."], lien:"", ingredients:[
    {nom:"Chou-fleur", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Pois chiches", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Tomates concassées", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Curry", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Coriandre", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Riz", qte:"300", unite:"g", rayon:"Épicerie"}]},

  { nom:"Caponata sicilienne", emoji:"🍆", type:"leger", vegetarien:true, rapide:false, thermomix:false, saisons:["ete"], etapes:["Faites revenir les aubergines en cubes dans l'huile d'olive, en plusieurs fois.", "Faites suer le céleri et l'oignon à part, ajoutez les tomates.", "Réunissez le tout, ajoutez les olives et les câpres.", "Versez le vinaigre et le sucre : c'est l'aigre-doux qui fait la caponata.", "Laissez compoter 20 minutes. Elle est meilleure tiède, ou le lendemain."], lien:"", ingredients:[
    {nom:"Aubergines", qte:"3", unite:"", rayon:"Fruits & légumes"},
    {nom:"Céleri", qte:"3", unite:"branche(s)", rayon:"Fruits & légumes"},
    {nom:"Tomates", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Olives vertes", qte:"100", unite:"g", rayon:"Épicerie"},
    {nom:"Câpres", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Vinaigre de vin", qte:"3", unite:"c. à soupe", rayon:"Épicerie"}]},

  { nom:"Aubergines à la parmigiana", emoji:"🍆", type:"consistant", vegetarien:true, rapide:false, thermomix:false, saisons:["ete"], etapes:["Coupez les aubergines en tranches, salez-les et laissez dégorger 30 minutes.", "Épongez-les et faites-les griller à la poêle, sans les noyer d'huile.", "Préparez une sauce tomate avec l'ail et le basilic, laissez réduire 20 minutes.", "Alternez dans un plat : aubergines, sauce, mozzarella, parmesan.", "Enfournez 35 minutes à 180 °C et laissez reposer 10 minutes avant de servir."], lien:"", ingredients:[
    {nom:"Aubergines", qte:"4", unite:"", rayon:"Fruits & légumes"},
    {nom:"Coulis de tomate", qte:"70", unite:"cl", rayon:"Épicerie"},
    {nom:"Mozzarella", qte:"250", unite:"g", rayon:"Crèmerie"},
    {nom:"Parmesan", qte:"80", unite:"g", rayon:"Crèmerie"},
    {nom:"Basilic", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Courge farcie au quinoa", emoji:"🎃", type:"consistant", vegetarien:true, rapide:false, thermomix:false, saisons:["automne", "hiver"], etapes:["Coupez les courges en deux, retirez les graines et enfournez-les 30 minutes à 180 °C.", "Faites cuire le quinoa dans le double d'eau, 15 minutes.", "Mélangez-le avec l'oignon revenu, les noix, les cranberries et la féta.", "Creusez un peu la chair des courges et incorporez-la à la farce.", "Remplissez, remettez 15 minutes au four."], lien:"", ingredients:[
    {nom:"Courge butternut", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Quinoa", qte:"200", unite:"g", rayon:"Épicerie"},
    {nom:"Féta", qte:"150", unite:"g", rayon:"Crèmerie"},
    {nom:"Noix", qte:"80", unite:"g", rayon:"Épicerie"},
    {nom:"Oignon", qte:"1", unite:"", rayon:"Fruits & légumes"}]},

  { nom:"Endives braisées au fromage", emoji:"🥬", type:"leger", vegetarien:true, rapide:false, thermomix:false, saisons:["hiver"], etapes:["Retirez le cône amer à la base des endives avec la pointe d'un couteau.", "Faites-les colorer au beurre, puis ajoutez le sucre et un fond d'eau.", "Couvrez et laissez braiser 25 minutes : elles doivent devenir fondantes.", "Rangez-les dans un plat, nappez de crème et couvrez de fromage.", "Passez 15 minutes au four à 200 °C."], lien:"", ingredients:[
    {nom:"Endives", qte:"8", unite:"", rayon:"Fruits & légumes"},
    {nom:"Fromage râpé", qte:"120", unite:"g", rayon:"Crèmerie"},
    {nom:"Crème fraîche", qte:"15", unite:"cl", rayon:"Crèmerie"},
    {nom:"Beurre", qte:"40", unite:"g", rayon:"Crèmerie"},
    {nom:"Sucre", qte:"1", unite:"c. à café", rayon:"Épicerie"}]},

  { nom:"Poireaux vinaigrette et œuf dur", emoji:"🥚", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["printemps", "hiver"], etapes:["Fendez les poireaux en deux dans la longueur et rincez-les bien entre les feuilles.", "Faites-les cuire 15 minutes à l'eau bouillante salée, puis égouttez-les longuement.", "Faites durcir les œufs 9 minutes, écalez-les et écrasez-les à la fourchette.", "Préparez une vinaigrette bien moutardée.", "Nappez les poireaux tièdes, parsemez d'œuf et de ciboulette."], lien:"", ingredients:[
    {nom:"Poireaux", qte:"6", unite:"", rayon:"Fruits & légumes"},
    {nom:"Œufs", qte:"4", unite:"", rayon:"Crèmerie"},
    {nom:"Moutarde", qte:"1", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Vinaigre de vin", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Ciboulette", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"}]},

  { nom:"Soupe de haricots blancs", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["automne", "hiver"], etapes:["Faites revenir l'oignon, la carotte et le céleri en petits dés.", "Ajoutez les haricots égouttés, la tomate et le bouillon.", "Laissez frémir 20 minutes.", "Mixez la moitié de la soupe seulement : on garde ainsi de la mâche.", "Servez avec un filet d'huile d'olive et du romarin."], lien:"", ingredients:[
    {nom:"Haricots blancs", qte:"2", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Carottes", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Céleri", qte:"2", unite:"branche(s)", rayon:"Fruits & légumes"},
    {nom:"Tomates concassées", qte:"1", unite:"boîte(s)", rayon:"Épicerie"},
    {nom:"Bouillon de légumes", qte:"75", unite:"cl", rayon:"Épicerie"}]},

  { nom:"Croquettes de riz au fromage", emoji:"🧀", type:"consistant", vegetarien:true, rapide:true, thermomix:false, saisons:[], etapes:["Mélangez le riz cuit refroidi avec les œufs et le parmesan.", "Prenez une cuillerée dans la main, glissez un dé de mozzarella au centre et refermez en boule.", "Roulez les boules dans la chapelure.", "Faites-les dorer à la poêle dans un peu d'huile, en les tournant régulièrement.", "Servez avec une sauce tomate et de la salade."], lien:"", ingredients:[
    {nom:"Riz", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Mozzarella", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Œufs", qte:"2", unite:"", rayon:"Crèmerie"},
    {nom:"Chapelure", qte:"150", unite:"g", rayon:"Épicerie"},
    {nom:"Parmesan", qte:"60", unite:"g", rayon:"Crèmerie"}]},

  { nom:"Salade de pâtes au pesto et tomates séchées", emoji:"🥗", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["ete"], etapes:["Faites cuire les pâtes, rincez-les à l'eau froide et égouttez-les bien.", "Mélangez-les au pesto tant qu'elles sont encore un peu tièdes : il s'accroche mieux.", "Ajoutez les tomates séchées coupées en lanières et les pignons grillés à sec.", "Incorporez la mozzarella en billes et la roquette au dernier moment.", "Servez frais, mais pas glacé."], lien:"", ingredients:[
    {nom:"Pâtes", qte:"400", unite:"g", rayon:"Épicerie"},
    {nom:"Pesto", qte:"1", unite:"pot(s)", rayon:"Épicerie"},
    {nom:"Tomates séchées", qte:"150", unite:"g", rayon:"Épicerie"},
    {nom:"Mozzarella", qte:"200", unite:"g", rayon:"Crèmerie"},
    {nom:"Pignons de pin", qte:"50", unite:"g", rayon:"Épicerie"},
    {nom:"Roquette", qte:"80", unite:"g", rayon:"Fruits & légumes"}]},

  { nom:"Velouté de topinambours", emoji:"🥣", type:"leger", vegetarien:true, rapide:true, thermomix:true, saisons:["hiver"], etapes:["Épluchez les topinambours et coupez-les en morceaux — plongez-les aussitôt dans l'eau citronnée, ils noircissent vite.", "Faites revenir l'oignon, ajoutez les topinambours et la pomme de terre.", "Couvrez de bouillon et laissez cuire 25 minutes.", "Mixez très finement.", "Ajoutez la crème hors du feu et parsemez de noisettes concassées."], lien:"", ingredients:[
    {nom:"Topinambours", qte:"800", unite:"g", rayon:"Fruits & légumes"},
    {nom:"Pommes de terre", qte:"2", unite:"", rayon:"Fruits & légumes"},
    {nom:"Crème fraîche", qte:"10", unite:"cl", rayon:"Crèmerie"},
    {nom:"Noisettes", qte:"50", unite:"g", rayon:"Épicerie"},
    {nom:"Bouillon de légumes", qte:"1", unite:"l", rayon:"Épicerie"}]},

  { nom:"Salade de chèvre chaud", emoji:"🧀", type:"leger", vegetarien:true, rapide:true, thermomix:false, saisons:["automne", "hiver"], etapes:["Coupez le fromage de chèvre en rondelles et posez-les sur des tranches de pain.", "Arrosez d'un filet de miel.", "Passez 5 minutes sous le gril, jusqu'à ce que le fromage blondisse.", "Préparez une vinaigrette au vinaigre balsamique.", "Dressez la salade, les toasts chauds dessus, et les noix."], lien:"", ingredients:[
    {nom:"Fromage de chèvre", qte:"2", unite:"bûche(s)", rayon:"Crèmerie"},
    {nom:"Pain", qte:"1", unite:"", rayon:"Boulangerie"},
    {nom:"Salade verte", qte:"1", unite:"", rayon:"Fruits & légumes"},
    {nom:"Miel", qte:"2", unite:"c. à soupe", rayon:"Épicerie"},
    {nom:"Noix", qte:"60", unite:"g", rayon:"Épicerie"}]},

  { nom:"Pommes de terre au four et fromage blanc", emoji:"🥔", type:"leger", vegetarien:true, rapide:false, thermomix:false, saisons:[], etapes:["Lavez les pommes de terre sans les éplucher et piquez-les à la fourchette.", "Enveloppez-les dans du papier aluminium.", "Enfournez 1 heure à 200 °C : elles sont prêtes quand un couteau entre sans résistance.", "Mélangez le fromage blanc avec la ciboulette, l'échalote et du poivre.", "Fendez les pommes de terre en croix et garnissez généreusement."], lien:"", ingredients:[
    {nom:"Pommes de terre", qte:"8", unite:"", rayon:"Fruits & légumes"},
    {nom:"Fromage blanc", qte:"500", unite:"g", rayon:"Crèmerie"},
    {nom:"Ciboulette", qte:"1", unite:"bouquet(s)", rayon:"Fruits & légumes"},
    {nom:"Échalotes", qte:"2", unite:"", rayon:"Fruits & légumes"}]}
];
