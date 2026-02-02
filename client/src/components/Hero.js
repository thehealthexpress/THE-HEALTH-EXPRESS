import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { getUserLocation } from '../utils/distance';

const Hero = ({ onLocationUpdate, onSearch }) => {
  const [location, setLocation] = useState('');

  const handleLocation = async () => {
    try {
      const coords = await getUserLocation();
      onLocationUpdate(coords);
      setLocation('Your Location');
    } catch (err) {
      alert('Location access denied. Enter manually.');
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-100 to-green-200 py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Order from The Health Express</h1>
        <p className="text-green-700 mb-8">Fresh, healthy meals delivered in 30 mins within 6km from Udyog Vihar, Gurugram</p>
        <div className="flex justify-center space-x-4 flex-wrap">
          <button onClick={handleLocation} className="bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700">
            <FaMapMarkerAlt className="mr-2" /> Detect Location
          </button>
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border rounded w-64"
          />
          <button onClick={() => onSearch(location)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
