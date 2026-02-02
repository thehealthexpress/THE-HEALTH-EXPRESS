const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { items, address } = req.body;
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const order = new Order({ user: req.user.id, items, address, total });
  await order.save();
  res.status(201).json({ message: 'Order placed' });
});

router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

module.exports = router;
