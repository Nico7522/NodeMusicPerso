# Recap étapes

## Initialisation du projet
- créer un fichier app.js
- npm init → créer le package.json avec les infos projet + dépendances

## Ajout des premières dépendances (lib)
### Outils de dev
- nodemon
### WebServer Express
- express
- express-async-errors
### Gestion des variables d'environnement
- dotenv
### DB (Sql Server)
- sequelize
- tedious

## Créer le fichier gitignore
- ignorer node_modules + fichiers env
- si extension gitignore installée → Ctrl + Maj + P (F1) → add gitignore -> node

## Ajouter dans les scripts :
- "dev" : "nodemon app.js"
## Créer l'architecture de base du projet + Créer le fichier .env
ExpressAPIMusic  <br>
├── controllers/  <br> 
├── dto/  <br> 
├── middlewares/  <br> 
├── models/  <br> 
├── routes/  <br> 
├── services/  <br> 
├── .env  <br> 
├── .gitignore  <br>
├── app.js  <br> 
├── package-lock.json  <br> 
├── package.json  <br> 

## Mise en place des controllers et des routers
ExpressAPIMusic  <br> 
├── controllers/  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── album.controller.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── artist.controller.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── genre.controller.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── track.controller.js  <br> 
├── dto/  <br> 
├── middlewares/  <br> 
├── models/  <br> 
├── routes/  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── album.router.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── artist.router.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── genre.router.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── index.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── track.router.js  <br> 
├── services/  <br> 
├── .env  <br> 
├── .gitignore  <br> 
├── app.js  <br> 
├── package-lock.json  <br> 
├── package.json  <br> 

## Ajout du router dans l'app

## Création de la DB sur SSMS + Attribution des droits à notre User

## Ajouter dans le .env les infos DB

## Setup DB
- Création du index.js avec instance de sequelize et objet db + liaison modèle + relations
- Création de tous les modèles
- Nouvelle arborescence
ExpressAPIMusic  <br> 
├── controllers/  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── album.controller.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── artist.controller.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── genre.controller.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── track.controller.js  <br> 
├── dto/  <br> 
├── middlewares/  <br> 
├── models/  <br>
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── album.model.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── artist.model.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── genre.model.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── index.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── track.model.js  <br>
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── mm_artist_track.model.js  <br> 
├── routes/  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── album.router.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── artist.router.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── genre.router.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── index.js  <br> 
&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── track.router.js  <br> 
├── services/  <br> 
├── .env  <br> 
├── .gitignore  <br> 
├── app.js  <br> 
├── package-lock.json  <br> 
├── package.json  <br> 

- Connection db + synchro dans app.js
