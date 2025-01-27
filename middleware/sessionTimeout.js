const jwt = require('jsonwebtoken');
const User = require('../models/user');

const sessionTimeout = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).send({ error: 'Please authenticate.' });
        }

        // Add logic for session timeout
        // For instance, check if the user's last activity was more than a certain period ago
        const sessionExpiryTime = 30 * 60 * 1000; // 30 minutes
        if (Date.now() - new Date(user.lastActivity).getTime() > sessionExpiryTime) {
            return res.status(401).send({ error: 'Session timed out. Please log in again.' });
        }

        // Update last activity time
        user.lastActivity = new Date();
        await user.save();

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = sessionTimeout;
