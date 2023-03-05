const { Request, Response } = require("express");
const authService = require('../services/auth.service');
const {ErrorResponse} = require("../utils/error.response");
const { SuccessResponse } = require("../utils/success.response");
//Import de notre utils
const jwt = require('../utils/jwt.utils')
const authController = {
  /**
   * Register
   * @param { Request } req
   * @param { Response } res
   */
  register: async (req, res) => {
    // On récupère le user à ajouter dans le body
    const data = req.body;
    const user = await authService.register(data);

    if (!user) {
      res.sendStatus(400); // Bad request : les données ne sont pas bonnes
      return;
    }
    //Si l'user a correctement été crée on crée le token
    const token = await jwt.generate(user)
    res.status(201).json(new SuccessResponse({token ,user}, 201));
  },
  /**
   * Login
   * @param { Request } req
   * @param { Response } res
   */
  login: async (req, res) => {
    // On récupère du body, les deux infos qui nous intéressent
    const { email, password } = req.body;
    console.log("ccccc", req.body);

    // Appel du service
    const user = await authService.login(email, password);

    // Si pas de user -> erreur de login
    if (!user) {
        res.sendStatus(400).json(new ErrorResponse("Bad credentials")); // Bad request -> plus spécifiquement un bad crequendials pour indiquer que les données de connection ne sont pas bonne
        return;
    }
    // Si user, génération du token
    const token = await jwt.generate(user)
    res.status(200).json(new SuccessResponse({token,user}))
  },
};

module.exports = authController;
