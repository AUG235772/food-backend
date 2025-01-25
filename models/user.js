const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    mobileNumber: String,
    tableNumber: Number,
    password: String
});

module.exports = mongoose.model('User', userSchema);
