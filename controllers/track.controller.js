const { Request, Response } = require("express");
const db = require("../models");
const trackService = require("../services/track.service");
const userService = require("../services/user.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
  LikeResponse,
} = require("../utils/success.response");
const trackController = {
  /**
   * Get ALL
   * @param { Request } req
   * @param { Response } res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { tracks, count } = await trackService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(tracks, count));
  },

  /**
   * Get By Id
   * @param { Request } req
   * @param { Response } res
   */
  getById: async (req, res) => {
    const { id } = req.params;

    const track = await trackService.getById(id);

    if (!track) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(track));
  },

  /**
   *
   * @param {Request} req
   * @param { Response} res
   */
  create: async (req, res) => {
    const data = req.body;

    const track = await trackService.create(data);

    res.location("/track/" + track.id);
    res.status(201).json(new SuccessResponse(track, 201));
  },

  /**
   * Update
   * @param { Request } req
   * @param { Response } res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const isUpdated = await trackService.update(id, data);

    if (!isUpdated) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  },

  /**
   * Delete
   * @param { Request } req
   * @param { Response } res
   */
  delete: async (req, res) => {
    const { id } = req.params;

    const isDeleted = await trackService.delete(id);

    if (!isDeleted) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  },

  /**
   * Like
   * @param { Request } req
   * @param { Response } res
   */
  like: async (req, res) => {
    // res.sendStatus(501)

    const trackId = req.params.id;
    const userId = req.user.id;
    const like = await trackService.like(trackId, userId);

    if (!like) {
      res.sendStatus(404);
      return;
    }
    // res.location("/track/" + trackId + "/like");
    res.status(201).json(new LikeResponse("Le titre a bien été like !", 201));
  },

  /**
   * Like
   * @param { Request } req
   * @param { Response } res
   */
  dislike: async (req, res) => {
    const trackId = req.params.id;
    const userId = req.user.id;
    const dislike = await trackService.dislike(trackId, userId);
    if (!dislike) {
      res
        .status(404)
        .json(
          new ErrorResponse(
            "TrackId or UserId not found or link is not present",
            404
          )
        );
    }
    res.sendStatus(204);
  },
};

module.exports = trackController;
