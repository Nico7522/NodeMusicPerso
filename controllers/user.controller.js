const userService = require("../services/user.service");
const { Request, Response } = require("express");
// const {userDTO} = require("../dto/user.dto");
// const argon2 = require("argon2");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

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
   * @param { Request} req
   * @param { Response } res
   */

  getById: async (req, res) => {
    const { id } = req.params;
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
