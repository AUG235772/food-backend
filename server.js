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
// Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    mobileNumber: String,
    tableNumber: Number,
    password: String
});

const User = mongoose.model('User', userSchema);

// Define Restaurant Schema
const restaurantSchema = new mongoose.Schema({
    name: String,
    menu: [{ name: String, price: Number }]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// Define Order Schema
const orderSchema = new mongoose.Schema({
    tableNumber: Number,
    items: [{ name: String, price: Number, restaurant: String }],
    status: String
});

const Order = mongoose.model('Order', orderSchema);

// User Registration
app.post('/register', async (req, res) => {
    const { name, mobileNumber, tableNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, mobileNumber, tableNumber, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
});

// User Login
app.post('/login', async (req, res) => {
    const { mobileNumber, password } = req.body;
    const user = await User.findOne({ mobileNumber });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, config.jwtSecret);
    res.send({ token });
});

// Get Restaurants
app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find();
    res.send(restaurants);
});

// Place Order
app.post('/order', async (req, res) => {
    const { tableNumber, items } = req.body;
    const order = new Order({ tableNumber, items, status: 'Preparing' });
    await order.save();
    io.emit('orderPlaced', order);
    res.status(201).send('Order placed');
});

// Update Order Status
app.put('/order/:id', async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    io.emit('orderUpdated', order);
    res.send(order);
});

// Confirm Payment
app.put('/order/:id/confirm', async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.send('Order confirmed and removed');
});

// Start Server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
