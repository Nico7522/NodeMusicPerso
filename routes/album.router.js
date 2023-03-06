const albumRouter = require("express").Router();
const albumController = require("../controllers/album.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const {albumValidator, albumCoverValidator} = require("../validators/album.validator");

// ----- Config de multer -----
// Import de multer
const multer = require("multer");

// Import de uuid

const uuid = require('uuid')

// Basique
// On choisit juste la destination, et multer se charge du nom de fichier etc
// const upload = multer({dest : "public/images/covers"});

// Pimpé
// On choisit la destination, et on se charge du nom du fichier etc
const storage = multer.diskStorage({
  // Configuration de la destionation
  destination: (req, file, callback) => {
    callback(null, "public/images/covers");
  },

  // Configuration du nom du fichier
  filename: (req, file, callback) => {
    // Création du nom de fichier 
      // Généré un uuid
    const name = uuid.v4();

    // Récupération de l'extension
      // On découpe le nom du fichier, ex : sopico.jpg via les . avec split
      // On récupère la dernière case du tableau qui contient l'extension 
    const ext = file.originalname.split('.').at(-1)
    // Renvoie du nom du fichier ainsi créé 
    callback(null, name + '.' + ext)
  },
});

const upload = multer({ storage });

// ----- Fin config multer ------

albumRouter
  .route("/")
  .get(pagination(), albumController.getAll)
  // .post(bodyValidation(albumValidator),albumController.create)
  .post(
    authJwt(["User"]),
    bodyValidation(albumValidator),
    albumController.create
  );

albumRouter
  .route("/:id")
  .get(albumController.getById)
  // .put(bodyValidation(albumValidator),albumController.update)
  .put(
    authJwt(["Admin"]),
    bodyValidation(albumValidator),
    albumController.update
  )
  .patch( bodyValidation(albumCoverValidator),upload.single("cover"), albumController.updateCover)
  // .delete(albumController.delete)
  .delete(authJwt(["Admin"]), albumController.delete);

module.exports = albumRouter;
