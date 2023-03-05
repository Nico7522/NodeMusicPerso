const { ArtistDTO }  = require("../dto/artist.dto");
const db = require("../models");

const ArtistService = {
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Artist.findAndCountAll({
      distinct: true,
      offset: offset,
      limit: limit,
    });
    return {
      artists: rows.map((artist) => new ArtistDTO(artist)),
      count,
    };
  },

  getById: async (id) => {
    const artist = await db.Artist.findByPk(id);
    return artist ? new ArtistDTO(artist) : null;
  },

  create: async (artistToCreate) => {
    const artist = await db.Artist.create(artistToCreate);
    return artist ? new ArtistDTO(artist) : null;
  },

  update: async (id, artistToUpdate) => {
    const artistUpdated = await db.Artist.update(artistToUpdate, {
      where: { id },
    });
    return artistUpdated[0] === 1;
  },

  delete: async (id) => {
    const artistDeleted = await db.Artist.destroy({
      where: { id },
    });
    return artistDeleted[0] === 1;
  },
};

module.exports = ArtistService;
