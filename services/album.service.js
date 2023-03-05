const {AlbumDTO}  = require("../dto/album.dto");
const db = require("../models");

const albumService = {
    getAll: async (offset, limit) => {
      const { rows, count } = await db.Album.findAndCountAll({
        distinct : true,
        offset: offset,
        limit: limit,
      })

      return {
        albums: rows.map(album => new AlbumDTO(album)),
        count, 
       
      }
    },

    getById: async (id) => {
        const album = await db.Album.findByPk(id);
        return album ? new AlbumDTO(album) : null;
    },

    create: async (albumToCreate) => {
        const album = await db.Album.create(albumToCreate)
        return album ? new AlbumDTO(album) : null;

    },

    update: async (id, albumToUpdate) => {
        const isUpdatedRow = await db.Album.update( albumToUpdate,{
            where: { id }
        });

        return isUpdatedRow[0] === 1;
    },

    delete: async (id) => {
        const isDeleted = await db.Album.destroy({
            where: { id }
        });
        return isDeleted[0] === 1;
    }

} 

module.exports = albumService;