const express = require('express');
const MenuItem = require('../models/MenuItem');
const { calculateDistance } = require('../utils/distance');

const router = express.Router();

router.get('/', async (req, res) => {
  const { userLat, userLng } = req.query;
  const items = await MenuItem.find();
  const filteredItems = items.filter(item => {
    const dist = calculateDistance(userLat, userLng, item.restaurant.lat, item.restaurant.lng);
    return dist <= 6;
  });
  res.json(filteredItems);
});

router.get('/:restaurantId', async (req, res) => {
  const items = await MenuItem.find({ 'restaurant._id': req.params.restaurantId });
  res.json(items);
});

module.exports = router;
