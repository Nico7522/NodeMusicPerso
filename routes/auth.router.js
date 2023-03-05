const authController = require("../controllers/auth.controller");
const bodyValidation = require("../middlewares/body.validator");
const {registerValidator, loginValidator} = require("../validators/auth.validators");


const authRouter = require("express").Router();

authRouter.route("/register")
  .post(bodyValidation(registerValidator), authController.register);

authRouter.route('/login')
  // .post(bodyValidation(loginValidator), authController.login);
  .post(authController.login);

module.exports = authRouter;
