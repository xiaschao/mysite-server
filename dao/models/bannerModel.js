const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

module.exports = sequelize.define(
  "banner",
  {
    midImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bigImg: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  }
);
