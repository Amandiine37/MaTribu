# 🏡 Tribu — l'organisation de la maison, en famille

Application pour téléphone (à installer sur l'écran d'accueil) qui rassemble :

| Onglet | À quoi ça sert |
|---|---|
| 🏡 **Accueil** | Ce qu'il y a à faire aujourd'hui : mes tâches, le menu du jour, les rappels, les courses, le classement. |
| 🧹 **Tâches** | Les tâches ménagères, avec la personne assignée, les points, et la validation. |
| 🛒 **Courses** | La liste de courses partagée, rangée par rayon. |
| 🍽️ **Menus** | Les repas midi et soir de la semaine, avec un générateur automatique. |
| 🔔 **Rappels** | Les rendez-vous et pense-bêtes à ne pas oublier. |
| 🌟 **Points & cadeaux** | Le score de chacun et la boutique de récompenses. |

---

## Comment ça marche, en deux minutes

### Les profils

- La première personne qui crée la famille devient **administrateur**.
- Elle choisit un **code de famille** (ex. `MAISON-K4T9`) qu'elle donne aux autres.
- Chacun choisit son prénom, un avatar et un **code à 4 chiffres** pour entrer.
- Un administrateur peut : créer/modifier les tâches, valider les tâches faites,
  gérer les cadeaux, ajouter ou modifier des membres, ajuster les points.

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

---

## Bon à savoir

- **Les codes à 4 chiffres ne sont pas du chiffrement.** Ils évitent que le petit
  frère valide les tâches à votre place — pas plus. Ne réutilisez pas un code de
  carte bancaire.
- **Le code de famille est la vraie clé.** Toute personne qui le connaît peut
  rejoindre la tribu. Ne le publiez pas.
- **Pas de notification qui sonne.** Une application web ne peut pas envoyer de
  rappel quand elle est fermée. Les rappels s'affichent dans l'app (pastille
  orange sur l'onglet 🔔) mais ne feront pas vibrer le téléphone.
- **Hors connexion**, l'application s'ouvre et s'affiche, mais les modifications
  ne partiront vers la famille qu'au retour du réseau.
