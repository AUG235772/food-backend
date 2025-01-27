const express = require('express');
const Order = require('../models/order');
const router = express.Router();

// Place an order
router.post('/', async (req, res) => {
    const { userId, restaurantId, items, total } = req.body;
    const order = await Order.create({ userId, restaurantId, items, total });
    res.status(201).send(order);
});

// Fetch all orders
router.get('/', async (req, res) => {
    const orders = await Order.findAll();
    res.send(orders);
});

module.exports = router;
