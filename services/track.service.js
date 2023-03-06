const { TrackDTO } = require("../dto/track.dto");
const { Genre, Album, Artist, User } = require("../models");
const db = require("../models");

const trackService = {
  getAll: async (offset, limit) => {
    const { rows, count } = await db.Track.findAndCountAll({
      distinct: true,
      offset: offset,
      limit: limit,
      include: [Genre, Album, Artist, User],
    });

    return {
      tracks: rows.map((track) => new TrackDTO(track)),
      count,
    };
  },
  getById: async (id) => {
    const track = await db.Track.findByPk(id, {
      include: [Genre, Album, Artist],
    });
    return track ? new TrackDTO(track) : null;
  },
  create: async (trackToCreate) => {
    const transaction = await db.sequelize.transaction();
    let track;
    // Sequelize, à partir des relations qu'on lui a fournies et des models qu'on lui a fouri nous a créee 3 méthodes
    // A partir d'un album ou d'un artist -> lui ajouter toutes les tracks qui lui sont liées
    // Album.addTrack()
    // Artist.AddTrack()
    // A partir d'une Track :
    // -> lui ajouter tous les albums qui lui sont liée
    // Track.addAlbum()
    // -> lui ajouter tous les artists qui lui sont liés
    // Track.addArtist()
    try {
      track = await db.Track.create(trackToCreate, { transaction });
      console.log("log 1", track);
      await track.addAlbum(trackToCreate.albums, { transaction });
      console.log("log 2", track);
      for (const artist of trackToCreate.artists) {
        await track.addArtist(artist.id, {
          through: { feat: artist.feat },
          transaction,
        });
      }

      await transaction.commit();
      const addedTrack = await db.Track.findByPk(track.id, {
        include: [Genre, Album, Artist],
      });
      return addedTrack ? new TrackDTO(addedTrack) : null;
    } catch (error) {
      await transaction.rollback();
      return null;
    }
  },

  update: async (id, trackToUpdate) => {
    const trackUpdated = await db.Track.update(trackToUpdate, {
      where: { id },
    });
    return trackUpdated[0] === 1;
  },
  delete: async (id) => {
    return (trackDeleted = await db.Track.destroy({
      where: { id },
    }));

    return trackDeleted[0] === 1;
  },

  like: async (trackId, userId) => {
    const transaction = await db.sequelize.transaction();
    // Récup de la track via son ID
    const track = await db.Track.findByPk(trackId);
    // Récup de l'user via son ID
    const user = await db.User.findByPk(userId);

    let like;

    try {
      console.log(trackId, track);
      console.log("track id", track);
      console.log("USER id", user);
      // Ajout du lien dans la table Many to Many User-track
      like = await track.addUser(user, { transaction });
      console.log("le like :", like);
      await transaction.commit();
      // Renvoie du résultat
      return like;
    } catch (error) {
      await transaction.rollback();
      return null;
    }
  },

  dislike: async (trackId, userId) => {
    const transaction = await db.sequelize.transaction();

    try {
      const track = await db.Track.findByPk(trackId);
      const user = await db.User.findByPk(userId);
      // Vérification si il y a bien un lien entre les deux
      const link = await track.hasUser(user, { transaction });
      if (!link) {
        await transaction.commit();
        return null;
      }
      // Enlever le lien en DB
      const nbRows = await track.removeUser(user, { transaction });
      await transaction.commit()
      return nbRows === 1;
    } catch (error) {
      await transaction.rollback();
      return null;
    }
  },
};

module.exports = trackService;
