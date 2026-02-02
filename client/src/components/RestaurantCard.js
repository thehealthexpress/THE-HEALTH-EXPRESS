import React from 'react';
import { FaStar, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/menu/${restaurant._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <img src={restaurant.image || '/images/default-rest.jpg'} alt={restaurant.name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-green-800">{restaurant.name}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <FaStar className="text-yellow-500" />
            <span>{restaurant.rating}</span>
            <FaClock className="text-gray-500" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <p className="text-gray-600">Within 6km delivery</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
