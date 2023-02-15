import React from 'react';
import getPriceText from '../utils/getPriceText';
import CartList from './cart-list/CartList';
import { useCartItems } from './contexts/CartItemsContext';
import useCurrency from './hooks/useCurrency';

function Cart() {
  const items = useCartItems();
  const currency = useCurrency();

  return (
    <div>
      <div className="container">
        <h1 className="mg-b4">Cart</h1>
        <div>
          {items.length} item{items.length !== 1 ? 's' : ''}
        </div>
        <div className="horizontal-divider" />
        <CartList items={items} />
        <div className="horizontal-divider" />
        <div className="container flex-space-between">
          <div>Subtotal</div>
          <div>
            {getPriceText({
              text: currency.sample_text,
              value: items
                .reduce((subtotal, item) => subtotal + item.price.value, 0)
                .toFixed(2),
              currency: {
                symbol: currency.symbol,
                placement: currency.placement,
              },
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
