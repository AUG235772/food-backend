const express = require('express');
const Order = require('../models/order');
const router = express.Router();

// Place Order
router.post('/', async (req, res) => {
    const { tableNumber, items, restaurantId } = req.body;
    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);
    const order = new Order({ tableNumber, items, status: 'Preparing', restaurantId, totalAmount });
    await order.save();
    res.status(201).send('Order placed');
});

// Fetch Orders
router.get('/', async (req, res) => {
    const orders = await Order.find().populate('restaurantId');
    res.send(orders);
});

module.exports = router;
