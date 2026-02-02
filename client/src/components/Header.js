import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = ({ cartCount }) => {
  return (
    <header className="bg-green-100 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-800">FoodieHub</Link>
        <nav className="flex space-x-6">
          <Link to="/" className="text-green-700 hover:text-green-900 transition">Home</Link>
          <Link to="/cart" className="text-green-700 hover:text-green-900 transition flex items-center">
            <FaShoppingCart className="mr-1" /> Cart ({cartCount})
          </Link>
          <Link to="/login" className="text-green-700 hover:text-green-900 transition flex items-center">
            <FaUser className="mr-1" /> Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
