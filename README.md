# 🏡 Tribu — l'organisation de la maison, en famille

> ### 🧪 Version 0.9 — BÊTA
> L'application est utilisable au quotidien, mais elle est encore jeune : des
> bugs sont possibles et la forme des données peut encore changer.
> Un bouton **« Signaler un problème / proposer une idée »** est disponible
> dans *Mon profil* — servez-vous-en sans hésiter.

Application pour téléphone (à installer sur l'écran d'accueil) qui rassemble :

| Onglet | À quoi ça sert |
|---|---|
| 🏡 **Accueil** | Ce qu'il y a à faire aujourd'hui : mes tâches, le menu du jour, les rappels, les courses, le classement. |
| 🧹 **Tâches** | Les tâches ménagères, avec la personne assignée, les points, et la validation. |
| 🛒 **Courses** | Une ou plusieurs listes partagées (semaine, mois, magasin), rangées par rayon. |
| 🍽️ **Menus** | Les repas midi et soir de la semaine, avec un générateur automatique. |
| 🔔 **Rappels** | Les rendez-vous et pense-bêtes à ne pas oublier. |
| 🥫 **Ma réserve** | Votre stock (épicerie, conserves, vrac…) avec les quantités minimum, dans l'onglet Courses. |
| 🌟 **Points & cadeaux** | Le score de chacun et la boutique de récompenses. |

---

## Comment ça marche, en deux minutes

### Les profils

- La première personne qui crée la famille devient **administrateur**.
- Les autres la rejoignent par **invitation** : l'administrateur crée un lien
  depuis *Administration → Créer une invitation* et le lui envoie. Le lien ne
  sert **qu'une fois** et expire au bout de quelques jours.
- En créant l'invitation, l'administrateur choisit **pour qui** elle est :
  - **➕ Une nouvelle personne** : l'invité crée lui-même son prénom, son avatar
    et son code à 4 chiffres ;
  - **un prénom existant** : pour connecter un profil déjà créé dans
    *Administration*, ou pour ajouter un **deuxième téléphone** à quelqu'un.
    L'invité devra alors saisir le code à 4 chiffres de ce profil.
  (Un profil sans code à 4 chiffres ne peut pas être invité : donnez-lui-en un
  d'abord dans *Administration → Membres*.)
- Chacun choisit son prénom, un avatar et un **code à 4 chiffres** pour entrer.
- Il faut **une invitation par appareil** : c'est ce qui fait que connaître le
  nom de votre tribu ne suffit jamais pour entrer.
- Un administrateur peut : créer/modifier les tâches, valider les tâches faites,
  gérer les cadeaux, ajouter ou modifier des membres, ajuster les points.

> 💡 Nommez **deux administrateurs**. Si le seul administrateur perd l'accès à
> son téléphone, plus personne ne peut valider les tâches ni inviter.

### Les enfants qui n'ont pas de téléphone

Dans *Administration → Membres → Ajouter*, cochez **« Pas de téléphone »**.

L'enfant a alors un profil complet — ses tâches, ses points, son rang au
classement, ses cadeaux — mais il ne se connecte pas :

- il n'apparaît pas dans la liste « Qui êtes-vous ? » et n'a pas de code à
  4 chiffres ;
- ses tâches du moment s'affichent sur **votre** accueil, dans une carte
  **« 🧒 À faire pour les enfants »** ;
- quand vous cochez « C'est fait » pour lui, cela vaut validation : les points
  lui sont crédités immédiatement (à lui, pas à vous) ;
- pour dépenser ses points, ouvrez **Points & cadeaux** : à côté de son nom dans
  le classement, le bouton **🎁** ouvre la boutique en son nom.

Le jour où il a un téléphone, décochez la case, donnez-lui un code à 4 chiffres
et envoyez-lui une invitation : il garde ses points et son historique.

### Les tâches

- Chaque tâche a une **fréquence** : chaque jour, chaque semaine ou chaque mois.
- On coche les personnes qui peuvent s'en occuper. Avec l'option **« Chacun son
  tour »**, la personne assignée **change automatiquement** à chaque période :
  la semaine 1 c'est Paul, la semaine 2 c'est Léa, etc. Rien à gérer à la main.
  (Le bouton « Passer au suivant » permet de décaler le tour si besoin.)
- La personne assignée appuie sur **« C'est fait »** → la tâche passe
  **« à valider »** → un administrateur valide → les **points sont crédités**.
- Une tâche non validée ne rapporte rien : c'est le garde-fou.

### Les points et les cadeaux

- Les points s'accumulent tâche après tâche.
- L'administrateur définit la **boutique** : nom du cadeau, icône, coût en points.
- Un membre demande un cadeau → l'administrateur accorde → les points sont retirés.
- Chacun peut consulter son historique de points.

### La réserve et les courses

L'onglet **Courses** se partage en deux, avec un sélecteur en haut :
**🛒 Mes listes** et **🥫 Ma réserve**.

**🛒 Mes listes** — vous pouvez en avoir plusieurs, chacune avec son rythme et
son magasin :

| Rythme | À quoi ça sert |
|---|---|
| 🛒 **Chaque semaine** | Les courses courantes. Elles comptent dans les rappels de l'accueil. |
| 📅 **Une fois par mois** | La liste qu'on remplit au fil de l'eau sans acheter tout de suite. **Elle ne déclenche aucun rappel** : la pastille orange de l'onglet Courses l'ignore. |
| 📝 **Ponctuelle** | Une sortie précise : la fête, le pique-nique, le bricolage… |

Chaque liste peut porter un **magasin** (Leclerc, le marché, la biocoop…), qui
s'affiche en tête de liste. Le bouton **↔** déplace un article d'une liste à
l'autre — pratique pour faire passer quelque chose du mois vers la semaine
quand ça devient urgent.

Les articles sont rangés par rayon, avec une quantité et une unité (2 l de lait,
500 g de farine…).

**🥫 Ma réserve** — ce que vous gardez en permanence à la maison : épicerie,
conserves, produits d'entretien. Pour chaque article :

- la quantité que vous avez, avec son unité ;
- une **quantité minimum** facultative. Dès que vous passez en dessous,
  l'article est signalé et un bouton l'ajoute à la liste de courses ;
- les boutons **−** et **+** ajustent la quantité en un geste ;
- une case **🫙 Acheté en vrac**. L'article est alors marqué « vrac » partout,
  et quand il arrive dans une liste de courses, un bandeau rappelle en tête de
  liste combien d'articles demandent un contenant : *« 3 articles en vrac :
  pensez aux bocaux et aux sacs réutilisables »*. Le vrac se recopie tout seul
  de la réserve vers les courses, inutile de le recocher.

**Le lien avec les menus, c'est là que ça devient utile :** quand vous appuyez
sur **🛒 Aux courses** depuis l'onglet Menus, l'application calcule pour chaque
ingrédient *besoin de la semaine − ce que vous avez en réserve*. Ce qui est déjà
couvert est décoché automatiquement, et les autres sont proposés avec la
quantité réellement manquante.

> Exemple : la semaine demande 6 pommes et 250 g de farine. Vous avez 2 pommes
> et 1 kg de farine → l'application propose **4 pommes**, et laisse la farine de
> côté. Les kilos et les grammes sont convertis tout seuls (idem ml / cl / l).

### Au magasin : terminer les courses

C'est là que les deux listes se rejoignent. Vous cochez au fur et à mesure dans
les rayons ; les articles cochés descendent dans **Dans le panier**. Un bouton
apparaît alors :

> **✅ Terminer les courses (7)**

En une pression, les articles quittent la liste **et rejoignent votre réserve** :

- ce qui y est **déjà** est réapprovisionné tout seul — *Riz : 1 kg → 3 kg* ;
- ce qui n'y est **pas encore** vous est proposé, à cocher. Le gâteau
  d'anniversaire n'a rien à faire dans une réserve : laissez-le décoché, il
  disparaîtra simplement de la liste ;
- si les unités ne correspondent pas (2 paquets achetés, une réserve en kilos),
  l'application **ne bricole pas un chiffre faux** : elle vous le signale pour
  que vous ajustiez à la main.

Quand il n'y a que des articles déjà connus, **rien ne vous est demandé** : une
pression suffit, et un message résume ce qui est rentré. C'est réglable —
*« ne plus me demander »* dans le récapitulatif, ou le lien **changer** sous le
bouton.

*Les unités qui ne se convertissent pas entre elles (des grammes et des boîtes,
par exemple) ne sont pas mélangées : l'application le signale au lieu de
deviner.*

### Les menus

- Appuyez sur **🎲 Générer** : l'application remplit la semaine en piochant dans
  la bibliothèque de recettes (118 plats fournis). Voir les réglages juste en
  dessous.
- Sous les boutons, une ligne récapitule ce que donne la semaine :
  **🐟 2 · 🍗 3 · 🥦 2**.
- Appuyez sur **🛒 Aux courses** : tous les ingrédients de la semaine sont
  proposés, vous décochez ce que vous avez déjà, et hop, dans la liste.
- **📖 Recettes** : ajoutez vos propres plats. Chaque recette a un champ **lien** :
  collez-y l'adresse de la recette (Cookomix, un blog…) et un bouton l'ouvrira.
  L'application ne stocke que le nom du plat et ses ingrédients — pas le texte
  des recettes, qui appartient à leurs auteurs.

### Les réglages du générateur

La fenêtre **🎲 Générer** est rangée en trois parties. Vos choix sont gardés
sur l'appareil : d'une semaine à l'autre, vous les retrouvez tels quels.

**Quels repas remplir ?** — les midis, les soirs, et faut-il remplacer les
repas déjà prévus (sinon seules les cases vides sont complétées).

**Ce qu'on mange**

- **Régime de la semaine** : *De tout*, *Sans viande (poisson autorisé)* ou
  *Végétarien*. Ce n'est pas une préférence : les plats écartés le sont pour de
  bon, ils ne peuvent pas ressortir faute de mieux.
- **🐟 Poisson**, **🍗 Viande**, **🥦 Repas végétariens** : combien de fois dans
  la semaine. Un nombre indiqué est respecté à la lettre — « 2 fois » donne
  exactement deux poissons, et la catégorie ne réapparaît pas ailleurs.
  *Peu importe* laisse la catégorie entièrement libre. *Aucun* la supprime.

*Comment un plat est classé ?* D'abord par le rayon de ses ingrédients
(Boucherie, Poissonnerie), puis par leur nom — un thon en boîte se range en
épicerie. Un plat qui contient les deux compte comme poisson. Un bouillon de
bœuf ne fait pas un repas de viande.

**Comment choisir les plats**

- **Respecter les saisons** — voir la section suivante.
- **Utiliser d'abord ce que j'ai en réserve** : les plats dont vous avez déjà
  les ingrédients passent devant. Moins de courses, moins de perte. Ça pèse
  lourd sans écraser la saison ni les nombres demandés.
- **Plats plus légers le soir**, **plats rapides du lundi au vendredi**.
- **Privilégier les recettes Thermomix** (53 plats fournis s'y prêtent).
- **Ne pas resservir un plat vu depuis…** 2, 3, 4 ou 6 semaines.

Si vous demandez plus de repas qu'il n'y a de cases à remplir, l'application
place ce qu'elle peut et vous le dit.

### Les saisons

Chaque recette peut porter une ou plusieurs **saisons** — 🌸 printemps, ☀️ été,
🍂 automne, ❄️ hiver. Une recette sans saison cochée convient toute l'année.

Les 50 plats fournis sont déjà renseignés : la ratatouille et le gratin de
courgettes en été, la tartiflette et la soupe à l'oignon en hiver, les lasagnes
toute l'année…

**Le générateur en tient compte.** L'option **« Respecter les saisons »**, cochée
par défaut, écarte les plats hors saison. Concrètement, en janvier il ne vous
proposera pas de gratin de courgettes ; il ira chercher les poireaux, les
endives et le potimarron.

Quand vous créez une recette, le bouton **🔎 Deviner d'après les ingrédients**
propose les saisons à partir d'un calendrier des fruits et légumes : tapez
« courgettes, tomates, basilic » et il coche *Été*. C'est une suggestion, vous
gardez la main.

Enfin, le filtre **☀️ De saison** dans *Mes recettes* n'affiche que ce qui se
cuisine en ce moment.

> Le calendrier reste volontairement simple. Un produit qu'il ne connaît pas est
> considéré comme disponible toute l'année — mieux vaut ne rien dire que dire
> une bêtise.

#### Consulter une recette

Appuyez sur une recette dans la liste : sa fiche s'ouvre avec les **ingrédients**
et le **déroulé numéroté**. Depuis l'onglet Menus, un bouton
**📖 Consulter la recette** ouvre la même fiche pour le plat prévu ce jour-là.

Les 118 plats fournis ont tous leur déroulé (4 à 5 étapes). Il est **écrit pour
l'application** : aucune recette n'est recopiée d'un site. C'est indicatif —
pour les temps exacts ou les vitesses d'un robot, collez le lien de la recette
d'origine dans la fiche, un bouton l'ouvrira.

Le bouton **Modifier** permet d'écrire ou de corriger le déroulé : **une étape
par ligne**, les lignes vides sont ignorées.

#### Les plats fournis

L'application arrive avec **118 plats**, dont **53 marqués 🍲 robot** : veloutés,
risottos, sauces, plats mijotés et one-pot — tout ce que le Thermomix (ou un
autre robot cuiseur) fait bien. Ils sont écrits maison : **aucune recette n'est
recopiée d'un site**, on n'y trouve que le nom du plat et ses ingrédients. À
vous de coller le lien vers la vraie recette dans le champ prévu.

La case **🍲 Robot** existe aussi sur vos propres recettes.

#### Si votre famille existait déjà

Les 50 recettes sont **recopiées dans votre famille le jour de sa création** :
les améliorations apportées ensuite au fichier de recettes ne les atteignent
pas toutes seules. Une famille créée avant l'arrivée des saisons se retrouve
donc avec des recettes sans saison — et le filtre affiche alors tout.

La même chose vaut pour les **nouveaux plats** ajoutés à l'application : ils
n'apparaissent pas d'eux-mêmes dans un cahier déjà créé.

L'application s'en occupe : à la première ouverture par un administrateur, elle
complète ce qui manque et vous prévient (*« Recettes mises à jour : 33 saisons,
242 unités »*). Vous pouvez aussi le déclencher à la main depuis
*Administration → 📖 Recettes → **🔄 Mettre à jour les recettes fournies***.

**Comment savoir qu'il y a du nouveau ?** Une **pastille orange** apparaît sur
votre avatar, en haut à gauche. Appuyez dessus : le menu affiche en tête
*« 🔄 N mises à jour disponibles »*, qui liste ce que l'application propose de
reprendre. Rien ne s'applique sans votre accord, et la pastille disparaît une
fois la mise à jour faite. Elle ne s'affiche que pour les administrateurs — eux
seuls peuvent y donner suite.

La fenêtre *Mettre à jour les recettes* propose en plus d'**ajouter les nouveaux
plats**, avec une case à décocher : ils ne reviennent jamais d'office, au cas où
vous en auriez supprimé exprès.

Cette mise à jour **n'écrase jamais ce que vous avez saisi** : elle ne remplit
que les champs absents. Vos propres recettes restent « toute l'année » tant que
vous ne cochez rien, et une quantité inhabituelle (« 2 briques ») est laissée
telle quelle plutôt que mal découpée.

### Retrouver une recette

Dans **Mes recettes**, la barre de recherche cherche dans les noms de plats
**et dans les ingrédients** (tapez « coco » pour retrouver tout ce qui contient
du lait de coco).

En dessous, quatre filtres se combinent librement :

| Filtre | Ce qu'il garde |
|---|---|
| ☀️ **De saison** | Ce qui se cuisine en ce moment (la saison affichée suit la date) |
| 🍲 **Thermomix** | Les plats qui se prêtent bien au robot cuiseur (53 des 118 fournis) |
| ✍️ **Mes recettes** | Uniquement celles que vous avez créées (pas les 50 fournies) |
| 🌿 **Végé** | Les plats végétariens |
| ⚡ **Rapide** | Moins de 30 minutes |
| 🥗 **Léger** | Les plats marqués « léger » |

### Partager vos recettes avec d'autres familles

Les familles qui utilisent Tribu disposent d'un **catalogue commun**, accessible
depuis *Mes recettes* → **🌍 Recettes partagées par d'autres familles**. Vous
pouvez y feuilleter les plats publiés, les prévisualiser, et en recopier un chez
vous d'un geste.

Pour publier l'un de vos plats : ouvrez-le (✏️) puis **🌍 Partager avec les
autres familles**. Un écran vous rappelle précisément ce qui devient visible :

- ✅ publié : le nom du plat, ses ingrédients, le lien éventuel, et le **nom de
  votre tribu** ;
- ❌ jamais publié : vos prénoms, vos points, vos courses, vos tâches, ni le code
  de votre famille.

Quelques règles :

- seules **vos propres créations** peuvent être partagées — pas les 50 recettes
  fournies (tout le monde les a déjà), ni celles importées d'une autre famille ;
- vous pouvez **retirer** une publication à tout moment, depuis la même fenêtre ;
- une fiche publiée n'est pas modifiable : pour corriger, retirez-la et
  republiez-la.

> ⚠️ Ces recettes sont écrites par d'autres utilisateurs et **ne sont vérifiées
> par personne**. Lisez-les avant de cuisiner. En tant que propriétaire du projet
> Firebase, vous pouvez supprimer n'importe quelle fiche depuis la console
> (collection `recettesPartagees`).

---

## Mettre l'application en ligne (GitHub Pages)

Comme pour l'application *reventes* :

1. Créez un dépôt **public** sur votre compte GitHub personnel, par exemple `tribu`.
2. Déposez-y **tous les fichiers** de ce dossier
   (sauf `serve.py` et `make_icons.py`, qui ne servent qu'en local — les garder
   ne pose aucun problème non plus).
3. Dans le dépôt : **Settings → Pages → Source : `main` / dossier `/ (root)`**.
4. Au bout d'une minute, l'application est à l'adresse
   `https://VOTRE-COMPTE.github.io/tribu/`.
5. Sur le téléphone : ouvrez l'adresse dans Chrome → menu **⋮** →
   **« Ajouter à l'écran d'accueil »**.

**Pour mettre à jour plus tard :** redéposez les fichiers modifiés sur GitHub.
L'application se met à jour toute seule au prochain lancement (le cache est en
« réseau d'abord »).

---

## Activer le partage entre téléphones

Tant que ce n'est pas fait, **chaque téléphone a ses propres données** et un
bandeau orange le rappelle sur l'accueil.

👉 Suivez **[GUIDE-FIREBASE.md](GUIDE-FIREBASE.md)** (10 minutes, une seule fois).

---

## Les fichiers du projet

| Fichier | Rôle |
|---|---|
| `index.html` | La page de l'application (structure). |
| `styles.css` | Toute la mise en forme, mode sombre compris. |
| `app.js` | Le cœur : dates, points, rotation des tâches, stockage, connexion. |
| `vues.js` | Le dessin de chaque écran. |
| `formulaires.js` | Les fenêtres qui remontent du bas (ajouter, modifier…). |
| `recettes.js` | Les 118 plats fournis au démarrage. Modifiable dans l'app. |
| `firebase-config.js` | **Le seul fichier à remplir** pour activer le partage. |
| `firestore.rules` | Les règles de sécurité, **à copier dans Firebase**. Sans elles, rien n'est protégé. |
| `manifest.webmanifest` | Permet d'installer l'app sur l'écran d'accueil. |
| `sw.js` | Rend l'application utilisable sans réseau. |
| `icon-192.png`, `icon-512.png` | Les icônes. |
| `make_icons.py` | Regénère les icônes si vous changez la couleur (local). |
| `serve.py` | Petit serveur pour tester sur ordinateur (local). |

Pour tester sur ordinateur :

```bash
python serve.py
```

puis ouvrir `http://localhost:4174`.

> 🛡️ Sur `localhost`, l'application reste **volontairement en mode local** : vos
> essais n'écrivent jamais dans la vraie base de la famille. Pour tester la
> synchronisation pour de bon, ouvrez `http://localhost:4174/?nuage=1`.

---

## Comment vos données sont protégées

| Protection | Ce que ça veut dire |
|---|---|
| **Accès par appareil** | Seuls les téléphones inscrits dans la famille peuvent la lire. Le repère de la tribu (`MAISON-K4T9`) n'ouvre rien. |
| **Invitations à usage unique** | Un lien, une personne, un appareil. Il expire, et se désactive dès qu'il a servi. |
| **Codes à 4 chiffres chiffrés** | Ils ne sont jamais enregistrés tels quels, seulement sous forme d'empreinte illisible (PBKDF2). Même en ouvrant la base, on ne peut pas les relire. Si quelqu'un l'oublie, un administrateur le réinitialise. |
| **Points en écriture unique** | Chaque gain de points est une ligne qui ne peut plus jamais être modifiée, créée par un administrateur, et dont le montant est vérifié par Firebase lui-même. Impossible de se donner des points en bidouillant l'appli. |
| **Droits par rôle** | Un membre ordinaire ne peut toucher qu'aux courses, repas, rappels et recettes. Les membres, tâches, cadeaux et barèmes sont réservés aux administrateurs. |

Tout cela repose sur le fichier **`firestore.rules`**, à publier dans Firebase
(étape 3 du guide). **Sans lui, aucune de ces protections n'existe.**

### Les limites, dites franchement

- **Tant que Firebase n'est pas configuré**, l'appli tourne en local : les
  données sont dans le téléphone, et quiconque a le téléphone déverrouillé y
  accède. Le chiffrement du code à 4 chiffres marche quand même.
- **Un code à 4 chiffres reste un code à 4 chiffres.** Il empêche le petit frère
  de valider ses tâches tout seul. Ce n'est pas un mot de passe de banque, et il
  ne faut pas y mettre celui de votre carte bancaire.
- **Un administrateur peut tout faire**, y compris s'ajouter des points. C'est
  voulu : c'est le rôle du parent.
- **Entre membres d'une même famille, tout est visible.** L'appli protège des
  gens extérieurs, pas des curiosités entre frères et sœurs.

## Faire essayer l'application à une autre famille

Oui, c'est prévu et ça fonctionne : il suffit de leur donner l'adresse de
l'application. Ils appuient sur **« Créer ma famille »** et repartent de zéro
avec leur propre tribu — leurs membres, leurs tâches, leurs points, les 50
recettes de départ.

**Leurs données sont totalement séparées des vôtres.** Une famille n'est lisible
que par les téléphones qui y ont été inscrits : personne ne peut voir la vôtre,
et vous ne pouvez pas voir la leur depuis l'application.

### Ce qu'il faut leur dire honnêtement

- **Leurs données sont hébergées chez vous.** Tout passe par *votre* projet
  Firebase. Vous pouvez donc tout lire depuis la console Firebase — y compris
  leurs tâches, leurs courses et les prénoms de leurs enfants. Dites-le-leur :
  c'est la moindre des choses, et c'est ce que demande le RGPD dès qu'on héberge
  les données d'autrui.
- **Vous êtes responsable de ces données.** Si vous supprimez le projet Firebase,
  ils perdent tout. Si vous arrêtez le projet, prévenez-les.
- **Conseillez-leur deux administrateurs.** L'accès étant lié à l'appareil, si
  leur unique administrateur perd le sien, plus personne ne peut inviter — et
  seul vous, depuis la console, pourrez les débloquer.
- **Le catalogue de recettes est commun.** Ce qu'ils publient, vous le voyez, et
  réciproquement. Rien d'autre n'est partagé entre familles.
- **Leurs signalements de bugs vous arrivent** dans la collection `retours`.

### Les limites gratuites

L'offre gratuite de Firebase autorise, par jour, de l'ordre de **50 000
lectures** et **20 000 écritures**, pour **1 Go** de stockage. Une famille active
consomme quelques centaines de lectures par jour : vous pouvez héberger
tranquillement une dizaine de familles. Au-delà, surveillez la consommation dans
la console (onglet *Usage*).

### Le repère de famille

Chaque famille a un repère unique (`MAISON-DTUNKE`) qui sert de nom de dossier.
Il est tiré au sort sur 6 caractères : une collision est quasi impossible. Si
malgré tout le repère choisi est déjà pris, l'application le dit et en propose
un autre — il suffit de réessayer.

La vérification passe par une petite collection **`reperes`** qui ne contient
qu'une date de création. Savoir qu'un repère existe n'ouvre aucun accès : cela
sert uniquement à répondre honnêtement « ce nom est déjà pris » avant de créer,
plutôt que de le deviner à partir d'un refus (qui peut avoir d'autres causes).

## Lire les retours des utilisateurs

Le bouton **« Signaler un problème / proposer une idée »** (dans *Mon profil*)
envoie le message dans une collection **`retours`** de votre base Firebase.

Pour les lire : console Firebase → **Firestore Database** → collection
`retours`. Chaque message contient le type (problème / idée / autre), le titre,
le détail, le prénom, le nom de la tribu, la version de l'application et le
modèle de téléphone.

Par sécurité, ces messages **ne sont lisibles que depuis la console** : personne
ne peut les consulter — ni les modifier — depuis l'application.

## Bon à savoir

- **L'onglet ouvert est retenu.** Si vous rechargez la page en consultant vos
  recettes ou votre réserve, vous y revenez — plus de retour brutal à l'accueil.

- **Pas de notification qui sonne.** Une application web ne peut pas envoyer de
  rappel quand elle est fermée. Les rappels s'affichent dans l'app (pastille
  orange sur l'onglet 🔔) mais ne feront pas vibrer le téléphone.
- **Hors connexion**, l'application s'ouvre et s'affiche, mais les modifications
  ne partiront vers la famille qu'au retour du réseau.
- **Changer de téléphone ?** Demandez une nouvelle invitation à un
  administrateur : vous retrouverez votre profil, vos points et votre historique.
