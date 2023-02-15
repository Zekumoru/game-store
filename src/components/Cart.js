import React from 'react';
import getPriceText from '../utils/getPriceText';
import CartList from './cart-list/CartList';
import { useCartItems } from './contexts/CartItemsContext';
import useCurrency from './hooks/useCurrency';
import './styles/Cart.scss';

function Cart() {
  const items = useCartItems();
  const currency = useCurrency();

  return (
    <div className="Cart container">
      <h1 className="mg-b4">Cart</h1>
      <div>
        {items.length} item{items.length !== 1 ? 's' : ''}
      </div>
      <div className="horizontal-divider" />
      <CartList items={items} />
      <div className="horizontal-divider" />
      <div className="subtotal | flex-space-between">
        <div>Subtotal</div>
        <div className="price">
          {getPriceText({
            text: currency.sample_text,
            value: items.reduce(
              (subtotal, item) => subtotal + item.price.value,
              0
            ),
            currency: {
              symbol: currency.symbol,
              placement: currency.placement,
            },
          })}
        </div>
      </div>
      <button className="button fw-bold">Checkout</button>
    </div>
  );
}

export default Cart;
