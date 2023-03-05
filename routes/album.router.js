const albumRouter = require("express").Router();
const albumController = require("../controllers/album.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const albumValidator = require("../validators/album.validator");
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
  // .delete(albumController.delete)
  .delete(authJwt(["Admin"]), albumController.delete);

module.exports = albumRouter;
