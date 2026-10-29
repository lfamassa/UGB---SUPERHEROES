const { DataTypes } = require("sequelize");

const sequelize = require("../database/database.js");

const Hero = sequelize.define("Hero", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    universe: {
        type: DataTypes.STRING,
        allowNull: false
    },

    power: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Hero;