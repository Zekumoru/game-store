import React from 'react';
import getPriceText from '../../utils/getPriceText';
import { useCart } from '../contexts/CartContext';

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <div>
      {getPriceText(item.price)} {item.name}
      <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
    </div>
  );
}

export default CartItem;
