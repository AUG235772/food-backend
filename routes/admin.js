const express = require('express');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const router = express.Router();

// Admin Registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword });

    res.status(201).send(admin);
});

// Admin Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ where: { username } });
    if (!admin || !await bcrypt.compare(password, admin.password)) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ adminId: admin.id }, config.jwtSecret, { expiresIn: '1h' });
    res.send({ token });
});

module.exports = router;
