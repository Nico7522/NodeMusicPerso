const userController = require("../controllers/user.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const updateValidator = require("../validators/user.validator");

const userRouter = require("express").Router();
userRouter.route("/")
  // .get(pagination(), userController.getAll)
  .get(authJwt(), pagination(), userController.getAll)

userRouter.route("/:id")
  // .get(userController.getById)
  .get(authJwt(),userController.getById)
  // .put(bodyValidation(updateValidator),userController.update)
  .put(authJwt(),bodyValidation(updateValidator),userController.update)
  // .delete(userController.delete);
  .delete(authJwt(["Admin"]), userController.delete);

module.exports = userRouter;
