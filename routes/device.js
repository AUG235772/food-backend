const express = require('express');
const Device = require('../models/device');
const router = express.Router();

// Fetch all logged-in devices
router.get('/', async (req, res) => {
    const devices = await Device.find().populate('restaurantId');
    res.send(devices);
});

// Add a new device
router.post('/', async (req, res) => {
    const { restaurantId, deviceId } = req.body;
    const device = new Device({ restaurantId, deviceId });
    await device.save();
    res.status(201).send(device);
});

// Remove a device (logout)
router.delete('/:id', async (req, res) => {
    await Device.findByIdAndDelete(req.params.id);
    res.send('Device logged out');
});

module.exports = router;
