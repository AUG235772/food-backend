const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { name, mobileNumber, tableNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, mobileNumber, tableNumber, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
});

// User Login
router.post('/login', async (req, res) => {
    const { mobileNumber, password } = req.body;
    const user = await User.findOne({ mobileNumber });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, config.jwtSecret);
    res.send({ token });
});

module.exports = router;
