const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');
const connectRoutes = require('./routes/connectRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use(bodyParser.json());

app.use('/api/properties', propertyRoutes);
app.use('/api/connect', connectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
