const express = require('express');
const Restaurant = require('../models/restaurant');
const router = express.Router();

// Create a restaurant
router.post('/', async (req, res) => {
    const { name, username, password, menu } = req.body;
    const restaurant = await Restaurant.create({ name, username, password, menu });
    res.status(201).send(restaurant);
});

// Fetch all restaurants
router.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.send(restaurants);
});

module.exports = router;
