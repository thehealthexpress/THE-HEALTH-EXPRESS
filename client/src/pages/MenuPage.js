import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../components/Menu';

const MenuPage = ({ cart, setCart }) => {
  const { restaurantId } = useParams();

  return (
    <div>
      <Menu restaurantId={restaurantId} cart={cart} setCart={setCart} />
    </div>
  );
};

export default MenuPage;
