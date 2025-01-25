const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    deviceId: String,
    loginTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);
