const userService = require("../services/user.service");
const { Request, Response } = require("express");
// const {userDTO} = require("../dto/user.dto");
// const argon2 = require("argon2");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");
const { ErrorResponse } = require("../utils/error.response");

const userController = {
  /**
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { users, count } = await userService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(users, count));
  },

  /**
   *
   * @param { Request } req
   * @param { Response } res
   */

  getById: async (req, res) => {
    const { id } = req.params;

    // Vérification sur les autorisations de l'utilisateur
    // Le rôle admin
    // On va le chercher dans le token : req.user.role
      const connectedUserRole = req.user.role
    // Les id -> dans le token : req.user.id
      const connectedUserId = req.user.id;

      // Si il n'est pas adm et si il les id ne correspondent pas, on renvoie une erreur 
      if (connectedUserRole !== "Admin" && connectedUserId !== parseInt(id)) {
        res.status(403).json(new ErrorResponse("Accès intedit, vous n'êtes ni admin, ni l'utilisateur lié au profil", 403));
        return;
      }
    const user = await userService.getById(id);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(new SuccessResponse(user));
  },

  /**
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const user = await userService.update(id, data);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
/**
   * @param {Request} req
   * @param {Response} res
   */
  updateAvatar: async (req, res) => {
    const userId = req.user.id
    // console.log('req ID', req.params.id);
    // console.log('user ID', userId);
    if ((parseInt(req.params.id) !== userId) && req.user.role !== "Admin") {
      res.status(404).json(new ErrorResponse("Vous ne pouvez pas modifier cet avatar", 404));
    }
   
    const filename = req.file.filename
    const isUpdated = await userService.updateAvatar(userId, filename)

    if (!isUpdated) {
      res.status(404).json(new ErrorResponse("Impossible de modifier l'avatar", 404));
      
    }
    res.location = ("/user/" + userId);
    res.status(201).json(new SuccessResponse("Avatar modifié", 201))
  },
  /**
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;

    const user = await userService.delete(id);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  },
};

module.exports = userController;
