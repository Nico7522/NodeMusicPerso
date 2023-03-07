const genreRouter = require("express").Router();
const genreController = require("../controllers/genre.controller");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const genreValidator = require("../validators/genre.validator");
const authJwt = require("../middlewares/auth.jwt.middleware");

// Méthode 1, on décrit toutes les méthodes possibles sur le router mais on peut voir que les routes se répètent.
// genreRouter.get('/', () => {})
// genreRouter.get('/:id', () => {})
// genreRouter.post('/', () => {})
// genreRouter.put('/:id', () => {})
// genreRouter.delete('/:id', () => {})

// Méthode 2, on décrit toutes les routes possibles, puis sur les routes, les méthodes
genreRouter
  .route("/")
  // Pour utiliser un middleware
  .get(pagination(), genreController.getAll)
  // .post(bodyValidation(genreValidator) ,genreController.create);
  .post(bodyValidation(genreValidator) ,genreController.create);

genreRouter
  .route("/:id")
  .get(genreController.getById)
  .put(bodyValidation(genreValidator) ,genreController.update)
  // .put(authJwt(["Admin"]), bodyValidation(genreValidator) ,genreController.update)
  .delete(genreController.delete);
  // .delete(authJwt(["Admin"]), genreController.delete);

module.exports = genreRouter;
