const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    menu: [{ name: String, price: Number }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
