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
[
  {
    "name": "Veggie Salad Bowl",
    "description": "Fresh mixed veggies with healthy dressing",
    "price": 12,
    "category": "Salads",
    "image": "/images/salad.jpg"
  },
  {
    "name": "Green Smoothie",
    "description": "Spinach, banana, and almond milk blend",
    "price": 8,
    "category": "Drinks",
    "image": "/images/smoothie.jpg"
  },
  {
    "name": "Quinoa Bowl",
    "description": "Protein-rich quinoa with veggies",
    "price": 15,
    "category": "Main Course",
    "image": "/images/quinoa.jpg"
  }
]
