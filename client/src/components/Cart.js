import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-green-800 mb-4">Your Cart</h3>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b pb-2">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p>${item.price}</p>
              </div>
              <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Total: ${total}</p>
        <Link to="/cart" className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition inline-block">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
