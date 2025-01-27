const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Order;
