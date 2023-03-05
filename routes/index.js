const albumRouter = require("./album.router");
const artistRouter = require("./artist.router");
const authRouter = require("./auth.router");
const genreRouter = require("./genre.router");
const trackRouter = require("./track.router");
const userRouter = require("./user.router");

const router = require("express").Router();

// Définition des différentes routes 'parents' et lien avec fichiers routing enfants
router.use("/genre", genreRouter);
router.use("/artist", artistRouter);
router.use("/track", trackRouter);
router.use("/album", albumRouter);
router.use("/user", userRouter)
router.use('/auth', authRouter)

module.exports = router;
