import React from 'react';
import { useCartItems } from '../contexts/CartItemsContext';
import './styles/CartItemsCount.scss';

function CartItemsCount() {
  const items = useCartItems();

  return items.length === 0 ? (
    <></>
  ) : (
    <div className="CartItemsCount">
      {items.length > 99 ? '99+' : items.length}
    </div>
  );
}

export default CartItemsCount;
