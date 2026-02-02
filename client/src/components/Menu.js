import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Menu = ({ restaurantId, cart, setCart }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`/api/menu/${restaurantId}`).then(res => setItems(res.data));
  }, [restaurantId]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <motion.div
            key={item._id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <img src={item.image || '/images/default-food.jpg'} alt={item.name} className="w-full h-32 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold text-green-800">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-green-700 font-bold">${item.price}</p>
            <button onClick={() => addToCart(item)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
