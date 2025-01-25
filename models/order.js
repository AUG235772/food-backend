const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    tableNumber: Number,
    items: [{ name: String, price: Number, restaurant: String }],
    status: String,
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    totalAmount: Number
});

module.exports = mongoose.model('Order', orderSchema);
