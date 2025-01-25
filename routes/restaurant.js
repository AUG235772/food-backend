const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Restaurant = require('../models/restaurant');
const config = require('../config');

const router = express.Router();

// Add a new restaurant
router.post('/', async (req, res) => {
    const { name, username, password, menu } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const restaurant = new Restaurant({ name, username, password: hashedPassword, menu });
    await restaurant.save();
    res.status(201).send(restaurant);
});

// Restaurant Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const restaurant = await Restaurant.findOne({ username });
    if (!restaurant || !await bcrypt.compare(password, restaurant.password)) {
        return res.status(401).send('Invalid credentials');
    }
    if (restaurant.activeSessions >= 2) {
        return res.status(403).send('Maximum login limit reached');
    }
    restaurant.activeSessions += 1;
    await restaurant.save();
    const token = jwt.sign({ restaurantId: restaurant._id }, config.jwtSecret);
    res.send({ token });
});

// Restaurant Logout
router.post('/logout', async (req, res) => {
    const { username } = req.body;
    const restaurant = await Restaurant.findOne({ username });
    if (restaurant && restaurant.activeSessions > 0) {
        restaurant.activeSessions -= 1;
        await restaurant.save();
    }
    res.send('Logged out successfully');
});

module.exports = router;
