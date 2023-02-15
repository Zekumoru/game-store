import React from 'react';
import CartItem from './CartItem';

function CartList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CartList;
