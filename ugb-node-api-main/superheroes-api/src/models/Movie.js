const { DataTypes } = require("sequelize")
const sequelize = require("../database/database.js");
const Movie = sequelize.define("Movie", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Movie;