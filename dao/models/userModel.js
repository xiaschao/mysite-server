const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

module.exports = sequelize.define(
  "user",
  {
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);
