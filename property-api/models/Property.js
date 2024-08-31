const mongoose = require('mongoose');

const SplashPageSchema = new mongoose.Schema({
  logo: String,
  backgroundImgs: String,
  title: String,
  description1: String,
});

const WifiDetailsSchema = new mongoose.Schema({
  wifiName: String,
  wifiPassword: String,
});

const LocationSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  zip_code: String,
  country: String,
});

const PropertySchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  backgroundImgs: String,
  location: LocationSchema,
  wifi_details: WifiDetailsSchema,
  price: {
    amount: Number,
    currency: String,
  },
  splash_page: [SplashPageSchema],
});

module.exports = mongoose.model('Property', PropertySchema);
