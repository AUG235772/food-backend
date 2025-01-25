const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const config = require('../config');

const router = express.Router();

// Add a new admin
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    res.status(201).send(admin);
});

// Admin Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !await bcrypt.compare(password, admin.password)) {
        return res.status(401).send('Invalid credentials');
    }
    if (admin.activeSessions >= 1) {
        return res.status(403).send('Maximum login limit reached');
    }
    admin.activeSessions += 1;
    await admin.save();
    const token = jwt.sign({ adminId: admin._id }, config.jwtSecret);
    res.send({ token });
});

// Admin Logout
router.post('/logout', async (req, res) => {
    const { username } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin && admin.activeSessions > 0) {
        admin.activeSessions -= 1;
        await admin.save();
    }
    res.send('Logged out successfully');
});

module.exports = router;
