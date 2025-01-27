const express = require('express');
const Device = require('../models/device');

const router = express.Router();

// Fetch all logged-in devices
router.get('/', async (req, res) => {
    const devices = await Device.findAll();
    res.send(devices);
});

// Add a new device
router.post('/', async (req, res) => {
    const { restaurantId, deviceId } = req.body;
    const device = await Device.create({ restaurantId, deviceId });
    res.status(201).send(device);
});

// Remove a device (logout)
router.delete('/:id', async (req, res) => {
    await Device.destroy({ where: { id: req.params.id } });
    res.send('Device logged out');
});

module.exports = router;
