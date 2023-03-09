const { Request, Response } = require("express");
const albumService = require("../services/album.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
  LikeResponse,
} = require("../utils/success.response");

const albumController = {
  /**
   * Get ALL
   * @param { Request } req
   * @param { Response } res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;

    const { albums, count } = await albumService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(albums, count));
  },

  /**
   * Get By Id
   * @param { Request } req
   * @param { Response } res
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const album = await albumService.getById(id);
    if (!album) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(album));
  },

  /**
   * Create
   * @param { Request } req
   * @param { Response } res
   */
  create: async (req, res) => {
    const data = req.body;
    console.log(data);
    const album = await albumService.create(data);
    res.location("/album/" + data.id);
    res.status(201).json(new SuccessResponse(album));
  },

  /**
   * Update
   * @param { Request } req
   * @param { Response } res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const album = await albumService.update(id, data);
    if (!album) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(201);
  },
   /**
   * Delete
   * @param { Request } req
   * @param { Response } res
   */
  updateCover: async (req, res) => {
    // res.sendStatus(501);
    // Récupérer l'id de l'album
    const { id } = req.params

    // Récupérer le nom du fichier
    const filename = req.file.filename
    // Appeler le service en lui fournisant l'id et le nom du fichier 
    const isUpdated = await albumService.updateCover(id, filename)

    if (!isUpdated) {
      res.status(404).json(new ErrorResponse("Album not found", 404))
    }
    res.location = ("/album/" + id);
    res.status(201).json(new SuccessResponse("Cover modifiée avec succès", 201))
  },

  /**
   * Delete
   * @param { Request } req
   * @param { Response } res
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const album = await albumService.delete(id);

    if (!album) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};

module.exports = albumController;
