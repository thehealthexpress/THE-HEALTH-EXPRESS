const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
  restaurant: {
    name: String,
    lat: Number,
    lng: Number,
    rating: Number,
    deliveryTime: String
  }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
