const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Constructeur du Modele Artist
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const Artist = sequelize.define(
    "Artist",
    {
      firstname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          // isAlpha: true,
          notNull: true,
          notEmpty: true,
          len: [1, 100],
        },
      },
      lastname: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          // isAlpha: true,
          notEmpty: true,
          len: [1, 50],
        },
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
      deathdate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true,
          customValidator() {
            if (this.birthdate >= this.deathdate && this.deathdate != null) {
              throw new Error(
                "La date de naissance doit être plus petite que la date de mort"
              );
            }
          },
        },
      },
    },

    {
      tableName: "Artist", // Pour préciser le nom de la table à Sequelize sinon, par défaut, il prend le nom du modèle et rajoute un s à la fin.
    }
  );

  return Artist;
};
