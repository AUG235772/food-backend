const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/user');
const Restaurant = require('./models/restaurant');
const Order = require('./models/order');
const Admin = require('./models/admin');
const Device = require('./models/device');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const deviceRoutes = require('./routes/device');
const restaurantRoutes = require('./routes/restaurant');
const orderRoutes = require('./routes/order');
const sessionTimeout = require('./middleware/sessionTimeout');

const app = express();

app.use(express.json());

// Sync database
sequelize.sync().then(() => {
    console.log('Database synced');
});

// Use routes with session timeout middleware
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/devices', deviceRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/orders', sessionTimeout, orderRoutes);

// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
