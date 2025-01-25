const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    activeSessions: { type: Number, default: 0 }
});

module.exports = mongoose.model('Admin', adminSchema);
