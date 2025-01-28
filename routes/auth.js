const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { name, mobileNumber, password, tableNumber } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, mobileNumber, password: hashedPassword, tableNumber, lastActivity: new Date() });

    res.status(201).send(user);
});

// Login
router.post('/login', async (req, res) => {
    const { mobileNumber, password } = req.body;

    const user = await User.findOne(mobileNumber);
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });
    await User.updateLastActivity(user.id);

    res.send({ token });
});

module.exports = router;
