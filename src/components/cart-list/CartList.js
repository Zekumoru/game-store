import React from 'react';
import CartItem from './CartItem';
import './styles/CartList.scss';

function CartList({ items }) {
  return (
    <div className="CartList">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CartList;
