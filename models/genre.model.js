const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 * Constructeur du Modele Genre
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const Genre = sequelize.define(
    "Genre",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: "UK_Genre_Name", // Attention, unique peut aussi recevoir un boolean, dans ce cas, la clef sera autogénérée et compliquée à manipuler, si vous mettez un nom de clef à la place, c'est d'office true avec précision du nom de la clef.
        validate: {
          notNull: true,
          len: [1, 50],
          notEmpty: true,
        },
      },
    },
    {
      tableName: "Genre", // Pour préciser le nom de la table à Sequelize sinon, par défaut, il prend le nom du modèle et rajoute un s à la fin.
      timestamps: false, // PAr défaut à true, crée deux colonnes created_at et updated_at pour stocker la date de création et date de dernière modification.
    }
  );

  return Genre;
};
