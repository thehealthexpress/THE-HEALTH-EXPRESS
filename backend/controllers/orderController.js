const Order = require('../models/Order');
const distance = require('../utils/distance');

// The Health Express office coordinates
const restaurantLocation = { lat: 28.4862, lon: 77.0915 }; // Plot 250, Udyog Vihar, Sec 18, Gurugram

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { customerName, address, items, total, lat, lon } = req.body;

    // Validation
    if(!customerName || !address || !items || items.length === 0 || !total || !lat || !lon){
      return res.status(400).json({ error: "All fields (name, address, items, total, lat, lon) are required" });
    }

    // Delivery radius check
    const dist = distance(restaurantLocation.lat, restaurantLocation.lon, lat, lon);
    if(dist > 6){
      return res.status(400).json({ error: Sorry, delivery is only available within 6km radius. Your distance: ${dist.toFixed(2)} km });
    }

    const order = new Order({ customerName, address, items, total });
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
