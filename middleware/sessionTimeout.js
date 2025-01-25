const jwt = require('jsonwebtoken');
const config = require('../config');

const sessionTimeout = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime - decoded.iat > 5400) { // 1.5 hours in seconds
        return res.status(401).send('Session expired. Please log in again.');
    }

    next();
};

module.exports = sessionTimeout;
