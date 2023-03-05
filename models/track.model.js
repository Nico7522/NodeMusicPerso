const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Constructeur du Modele Track
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const Track = sequelize.define(
    "Track",
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [ 1, 100 ]
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          notNull: true,
          min: 0,
          max: 604800
        },
      },
    },
    {
      tableName: "Track", // Pour préciser le nom de la table à Sequelize sinon, par défaut, il prend le nom du modèle et rajoute un s à la fin.
    }
  );

  return Track;
};
