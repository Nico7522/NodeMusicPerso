const userController = require("../controllers/user.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const updateValidator = require("../validators/user.validator");
const userRouter = require("express").Router();

const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/avatars")
  },
  filename: (req, file, callback) => {
    const name = uuid.v4();
    const ext = file.originalname.split('.').at(-1);
    callback(null, name + "." + ext);
  }
})

const upload = multer({ storage });


userRouter.route("/")
  // .get(pagination(), userController.getAll)
  .get(authJwt(), pagination(), userController.getAll)

userRouter.route("/:id")
  // .get(userController.getById)
  .get(authJwt(),userController.getById)
  // .put(bodyValidation(updateValidator),userController.update)
  .put(authJwt(),bodyValidation(updateValidator),userController.update)
  // .delete(userController.delete);
  .patch(authJwt(["User", "Admin"]) ,upload.single('avatar') ,userController.updateAvatar)
  .delete(authJwt(["Admin"]), userController.delete);

module.exports = userRouter;
