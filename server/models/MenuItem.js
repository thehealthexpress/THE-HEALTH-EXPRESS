const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
  // Restaurant fixed: No need for nested object, just use fixed values in code
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
