const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Device = sequelize.define('Device', {
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deviceId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Device;
