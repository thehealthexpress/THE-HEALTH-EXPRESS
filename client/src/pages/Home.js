import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import RestaurantCard from '../components/RestaurantCard';

const Home = ({ userCoords, onLocationUpdate, onSearch, cart, setCart }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (userCoords) {
      axios.get(`/api/menu?userLat=${userCoords.lat}&userLng=${userCoords.lng}`)
        .then(res => {
          const uniqueRests = res.data.reduce((acc, item) => {
            if (!acc.find(r => r.name === item.restaurant.name)) {
              acc.push(item.restaurant);
            }
            return acc;
          }, []);
          setRestaurants(uniqueRests);
        });
    }
  }, [userCoords]);

  return (
    <div>
      <Hero onLocationUpdate={onLocationUpdate} onSearch={onSearch} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Restaurants Near You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(rest => (
            <RestaurantCard key={rest.name} restaurant={rest} />
          ))}
        </div>
        {restaurants.length === 0 && userCoords && <p className="text-center text-gray-600">No restaurants within 6km.</p>}
      </div>
    </div>
  );
};

export default Home;
