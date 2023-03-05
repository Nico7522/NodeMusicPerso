const artistRouter = require('express').Router();
const artistController = require('../controllers/artist.controller');
const authJwt = require('../middlewares/auth.jwt.middleware');
const bodyValidation = require('../middlewares/body.validator');
const pagination = require("../middlewares/pagination.middleware");
const artistValidator = require('../validators/artist.validator');
artistRouter.route('/')
    .get(pagination(),artistController.getAll)
    // .post(bodyValidation(artistValidator) ,artistController.create)
    .post(authJwt(["User"]),bodyValidation(artistValidator) ,artistController.create)

artistRouter.route('/:id')
    .get(artistController.getById)
    // .put(bodyValidation(artistValidator) ,artistController.update)
    .put(authJwt(["Admin"]), bodyValidation(artistValidator) ,artistController.update)
    // .delete(artistController.delete)
    .delete(authJwt(["Admin"]), artistController.delete)

module.exports = artistRouter;