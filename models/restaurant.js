const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Restaurant = sequelize.define('Restaurant', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    menu: {
        type: DataTypes.JSON,
        allowNull: true
    },
    activeSessions: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Restaurant;
