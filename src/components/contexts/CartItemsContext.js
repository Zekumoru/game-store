import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useCart } from './CartContext';

const CartItemsContext = React.createContext();

function useCartItems() {
  return useContext(CartItemsContext);
}

function CartItemsProvider({ children }) {
  const [items, setItems] = useLocalStorage('cart-items', []);
  const cart = useCart();

  cart.addToCart = (item) => {
    setItems((items) => [...items, item]);
  };

  cart.removeFromCart = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  cart.inTheCart = (id) => {
    return items.findIndex((item) => item.id === id) !== -1;
  };

  return (
    <CartItemsContext.Provider value={items}>
      {children}
    </CartItemsContext.Provider>
  );
}

export { CartItemsProvider, useCartItems };
