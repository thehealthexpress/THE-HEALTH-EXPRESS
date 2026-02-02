const express = require('express');
const MenuItem = require('../models/MenuItem');
const { calculateDistance } = require('../utils/distance');

const router = express.Router();

// Updated restaurant details
const restaurant = {
  name: "The Health Express",
  lat: 28.5025, // Gurugram Udyog Vihar lat
  lng: 77.0814, // Gurugram Udyog Vihar lng
  rating: 4.5,
  deliveryTime: "25-30 mins"
};

router.get('/', async (req, res) => {
  const { userLat, userLng } = req.query;
  if (!userLat || !userLng) return res.json([]); // No location, no menu

  const dist = calculateDistance(userLat, userLng, restaurant.lat, restaurant.lng);
  if (dist > 6) return res.json([]); // Outside 6km, no delivery

  const items = await MenuItem.find();
  // Add restaurant details to each item
  const itemsWithRest = items.map(item => ({ ...item.toObject(), restaurant }));
  res.json(itemsWithRest);
});

module.exports = router;
