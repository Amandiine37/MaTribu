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

Enfin, quand vous cochez vos achats et videz le panier, l'application vous
propose de **rentrer les achats dans la réserve**. La boucle est bouclée.

*Les unités qui ne se convertissent pas entre elles (des grammes et des boîtes,
par exemple) ne sont pas mélangées : l'application le signale au lieu de
deviner.*

### Les menus

- Appuyez sur **🎲 Générer** : l'application remplit la semaine en piochant dans
  la bibliothèque de recettes, en évitant les plats servis les 3 dernières
  semaines, en mettant des plats plus légers le soir et le nombre de repas
  végétariens que vous demandez.
- Appuyez sur **🛒 Aux courses** : tous les ingrédients de la semaine sont
  proposés, vous décochez ce que vous avez déjà, et hop, dans la liste.
- **📖 Recettes** : ajoutez vos propres plats. Chaque recette a un champ **lien** :
  collez-y l'adresse de la recette (Cookomix, un blog…) et un bouton l'ouvrira.
  L'application ne stocke que le nom du plat et ses ingrédients — pas le texte
  des recettes, qui appartient à leurs auteurs.

### Retrouver une recette

Dans **Mes recettes**, la barre de recherche cherche dans les noms de plats
**et dans les ingrédients** (tapez « coco » pour retrouver tout ce qui contient
du lait de coco).

En dessous, quatre filtres se combinent librement :

| Filtre | Ce qu'il garde |
|---|---|
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
| `recettes.js` | Les 50 plats fournis au démarrage. Modifiable dans l'app. |
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

- **Pas de notification qui sonne.** Une application web ne peut pas envoyer de
  rappel quand elle est fermée. Les rappels s'affichent dans l'app (pastille
  orange sur l'onglet 🔔) mais ne feront pas vibrer le téléphone.
- **Hors connexion**, l'application s'ouvre et s'affiche, mais les modifications
  ne partiront vers la famille qu'au retour du réseau.
- **Changer de téléphone ?** Demandez une nouvelle invitation à un
  administrateur : vous retrouverez votre profil, vos points et votre historique.
