const express = require("express");
const cors = require("cors");
const server1 = express();
require("dotenv").config();
const mongoose = require("mongoose");

// Middleware
server1.use(cors());
server1.use(express.json());

// Request logging
server1.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Routes
server1.use("/api", require("./routes/userroute"));
server1.use("/api", require("./routes/expenseroute"));

// Error handling middleware
server1.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
});

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

server1.get('/', (req, res) => {
    res.send("ExpenseTracker Pro API is running on port 4001");
});

const PORT = process.env.PORT || 4001;
server1.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});