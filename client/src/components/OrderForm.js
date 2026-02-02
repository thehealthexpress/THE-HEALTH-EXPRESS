import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ cart, setCart }) => {
  const [address, setAddress] = useState('');

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    await axios.post('/api/orders', { items: cart, address }, { headers: { Authorization: token } });
    setCart([]);
    alert('Order placed!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Checkout</h2>
      <input
        type="text"
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <button onClick={placeOrder} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Place Order
      </button>
    </div>
  );
};

export default OrderForm;
