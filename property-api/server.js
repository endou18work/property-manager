// server.js

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Ensure this points to the correct file
const propertyRoutes = require('./routes/propertyRoutes'); // Ensure this points to the correct file
const connectRoutes = require('./routes/connectRoutes'); // Ensure this points to the correct file
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Secure HTTP headers
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/connect', connectRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
