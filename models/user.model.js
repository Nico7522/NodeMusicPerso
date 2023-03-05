const { Sequelize, ModelStatic, DataTypes } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: false,
          // isAlpha: true,
          notEmpty: true,
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          // isAlpha: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "UK_User_Email",
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          notNull: true,
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "User",
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [["User", "Admin"]],
        },
      },
    },
    {
      tableName: "User",
    }
  );
  return User;
};
