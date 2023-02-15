import React, { useContext, useRef } from 'react';
import { CartItemsProvider } from './CartItemsContext';

const CartContext = React.createContext();

function useCart() {
  return useContext(CartContext);
}

function CartProvider({ children }) {
  const cartRef = useRef({});
  return (
    <CartContext.Provider value={cartRef.current}>
      <CartItemsProvider>{children}</CartItemsProvider>
    </CartContext.Provider>
  );
}

export { CartProvider, useCart };
