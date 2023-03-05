const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Constructeur du Modele Album
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const Album = sequelize.define(
    "Album",
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          notContains: "/",
        },
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          // is : /^(\/[^\/]+){0,2}\/?$/
          // Custom validator qui demande que le nom de l'album soit le nom de la photo
          // customValidator() {
          //   if (!this.cover.includes(this.title)) {
          //     throw new Error(
          //       "Le titre doit être contenu dans le nom de la photo."
          //     );
          //   }
          // },
        },
      },
    },

    {
      tableName: "Album", // Pour préciser le nom de la table à Sequelize sinon, par défaut, il prend le nom du modèle et rajoute un s à la fin.
    }
  );

  return Album;
};
