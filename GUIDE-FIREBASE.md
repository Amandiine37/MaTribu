# Guide : activer le partage familial (Firebase)

**À quoi ça sert ?**
Sans cette étape, l'application marche très bien… mais chacun a sa liste dans son
téléphone. Personne ne voit les tâches ni les courses des autres.

Firebase est le « carnet commun » posé sur internet : tout le monde écrit dedans
et voit les changements des autres en quelques secondes.

- C'est **gratuit** pour un usage familial (très, très loin des limites payantes).
- Comptez **10 minutes**, une seule fois.
- Il faut un **compte Google personnel** (surtout pas le compte professionnel).

---

## Étape 1 — Créer le projet

1. Allez sur **https://console.firebase.google.com** et connectez-vous avec
   votre compte Google personnel.
2. Cliquez sur **« Créer un projet »**.
3. Nom du projet : `tribu-famille` (ou ce que vous voulez).
4. À l'écran « Google Analytics », **décochez / désactivez** Analytics :
   inutile ici, et ça évite une étape.
5. Cliquez sur **Créer le projet**, puis **Continuer** quand c'est prêt.

---

## Étape 2 — Créer la base de données

1. Dans le menu de gauche, ouvrez **Créer** (ou « Build ») → **Firestore Database**.
2. Cliquez sur **« Créer une base de données »**.
3. Emplacement : choisissez une région **en Europe**, par exemple
   `eur3 (europe-west)`. ⚠️ Ce choix est **définitif**, mais n'importe quelle
   région européenne convient.
4. Choisissez **« Démarrer en mode production »** (on met les bonnes règles juste après).
5. Cliquez sur **Créer**.

---

## Étape 3 — Écrire les règles de sécurité

1. Toujours dans **Firestore Database**, ouvrez l'onglet **« Règles »**.
2. **Effacez tout** ce qui s'y trouve et collez exactement ceci :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /familles/{code} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Cliquez sur **Publier**.

> **Ce que ça veut dire, en clair :** seules les personnes qui passent par
> l'application peuvent lire et écrire, et uniquement dans la partie « familles ».
> Ce qui protège vos données des autres familles, c'est **votre code de famille**,
> qui sert de mot de passe commun. Ne le publiez nulle part.

---

## Étape 4 — Autoriser la connexion anonyme

L'application ne demande pas d'email : elle ouvre une session « anonyme » auprès
de Firebase. Il faut l'autoriser.

1. Menu de gauche → **Créer** → **Authentication**.
2. Cliquez sur **« Commencer »**.
3. Dans la liste des fournisseurs, choisissez **« Anonyme »**.
4. Basculez l'interrupteur sur **Activer**, puis **Enregistrer**.

---

## Étape 5 — Récupérer votre configuration

1. En haut à gauche, cliquez sur la **roue dentée ⚙️** → **Paramètres du projet**.
2. Descendez jusqu'à **« Vos applications »**.
3. Cliquez sur l'icône **`</>`** (application Web).
4. Surnom de l'application : `Tribu`. Ne cochez **pas** « Firebase Hosting ».
5. Cliquez sur **Enregistrer l'application**.
6. Firebase affiche un bloc de texte qui ressemble à ça :

```js
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tribu-famille.firebaseapp.com",
  projectId: "tribu-famille",
  storageBucket: "tribu-famille.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**Gardez cet écran ouvert** (ou copiez le bloc quelque part).

---

## Étape 6 — Coller la configuration dans l'application

1. Ouvrez le fichier **`firebase-config.js`** du projet.
2. Remplacez chaque `"A_REMPLIR"` par la valeur correspondante de votre bloc.
   Attention : gardez bien les guillemets et les virgules.

Résultat attendu :

```js
window.CONFIG_FIREBASE = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tribu-famille.firebaseapp.com",
  projectId: "tribu-famille",
  storageBucket: "tribu-famille.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

3. Enregistrez le fichier, puis redéposez-le sur GitHub (voir le README).

> Ces valeurs ne sont **pas des mots de passe**. Elles sont visibles par tous ceux
> qui ouvrent l'application : c'est normal et prévu par Google. La protection
> vient des règles de l'étape 3 et de votre code de famille.

---

## Étape 7 — Autoriser votre adresse GitHub Pages

1. Dans **Authentication**, ouvrez l'onglet **« Paramètres »** (ou « Settings »).
2. Section **« Domaines autorisés »** → **Ajouter un domaine**.
3. Ajoutez votre adresse GitHub Pages **sans le `https://`**, par exemple :
   `amandiine37.github.io`
4. Enregistrez.

---

## Vérifier que ça marche

Ouvrez l'application sur votre téléphone :

- Si en haut de l'accueil vous voyez encore le bandeau orange
  **« Mode hors partage »** → la configuration n'est pas prise en compte.
- Sinon, appuyez sur votre avatar (en haut à gauche) : vous devez lire
  **« Partagé avec la famille »** avec un point vert. 🎉

**Le test qui ne trompe pas :** créez la famille sur votre téléphone, puis
rejoignez-la depuis un autre téléphone avec le code. Cochez une tâche d'un côté,
elle doit apparaître de l'autre en quelques secondes.

---

## En cas de souci

| Ce que vous voyez | Ce qu'il faut faire |
|---|---|
| Bandeau « Mode hors partage » qui reste | Un `A_REMPLIR` traîne encore dans `firebase-config.js`, ou le fichier n'a pas été redéposé sur GitHub. |
| « Aucune famille avec ce code » alors que le code est bon | Vérifiez que les deux téléphones ouvrent bien **la même adresse** et que le code est écrit pareil (il est mis en majuscules automatiquement). |
| Rien ne se synchronise | Étape 4 (connexion anonyme) probablement oubliée, ou étape 7 (domaine autorisé). |
| « Enregistrement impossible » | Les règles de l'étape 3 ne sont pas publiées. |

Pour voir l'erreur exacte : sur ordinateur, ouvrez l'application, appuyez sur
`F12`, onglet **Console**. Le message est en anglais mais il suffit de me le
recopier.
