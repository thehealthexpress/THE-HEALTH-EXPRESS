import React from 'react';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';

const CartPage = ({ cart, setCart }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Cart cart={cart} setCart={setCart} />
      {cart.length > 0 && <OrderForm cart={cart} setCart={setCart} />}
    </div>
  );
};

export default CartPage;
