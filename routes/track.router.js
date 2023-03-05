const trackRouter = require('express').Router();
const trackController = require('../controllers/track.controller');
const bodyValidation = require('../middlewares/body.validator');
const pagination = require("../middlewares/pagination.middleware");
const authJwt = require("../middlewares/auth.jwt.middleware");
const {createTrackValidator, updateTrackValidator} = require('../validators/track.validator');

trackRouter.route('/')
    .get(pagination(),trackController.getAll)
    // .post(bodyValidation(createTrackValidator),trackController.create)
    .post(authJwt(["User"]), bodyValidation(createTrackValidator),trackController.create)

trackRouter.route('/:id')
    .get(trackController.getById)
    // .put(bodyValidation(updateTrackValidator) ,trackController.update)
    .put(authJwt(["Admin"]), bodyValidation(updateTrackValidator) ,trackController.update)
    // .delete(trackController.delete)
    .delete(authJwt(["Admin"]), trackController.delete)

trackRouter.route('/:id/like')
    .post(authJwt(),trackController.like)
module.exports = trackRouter;