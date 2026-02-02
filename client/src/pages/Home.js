import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import Menu from '../components/Menu';

const Home = ({ userCoords, onLocationUpdate, onSearch, cart, setCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [canOrder, setCanOrder] = useState(false);

  useEffect(() => {
    if (userCoords) {
      axios.get(`/api/menu?userLat=${userCoords.lat}&userLng=${userCoords.lng}`)
        .then(res => {
          setMenuItems(res.data);
          setCanOrder(res.data.length > 0); // If items load, user can order
        })
        .catch(() => setCanOrder(false));
    }
  }, [userCoords]);

  return (
    <div>
      <Hero onLocationUpdate={onLocationUpdate} onSearch={onSearch} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Our Healthy Menu at The Health Express</h2>
        {canOrder ? (
          <Menu restaurantId="fixed" cart={cart} setCart={setCart} items={menuItems} />
        ) : (
          <p className="text-center text-gray-600">Please set your location within 6km of Udyog Vihar, Gurugram to order.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
  
