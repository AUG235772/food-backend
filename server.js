const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const socketIo = require('socket.io');
const config = require('./config');
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurant');
const orderRoutes = require('./routes/order');
const adminRoutes = require('./routes/admin');
const deviceRoutes = require('./routes/device');
const sessionTimeout = require('./middleware/sessionTimeout');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Import models
require('./models/user');
require('./models/restaurant');
require('./models/order');

// Use routes with session timeout middleware
app.use('/auth', authRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/orders', sessionTimeout, orderRoutes);
app.use('/admin', adminRoutes);
app.use('/devices', deviceRoutes);

// Start Server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
