const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('food1', 'laptop', 'password123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
