const mongoose = require('mongoose');

const ConnectSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
});

module.exports = mongoose.model('Connect', ConnectSchema);
