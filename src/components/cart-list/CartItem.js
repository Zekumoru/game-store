import React from 'react';
import getPriceText from '../../utils/getPriceText';
import { useCart } from '../contexts/CartContext';
import useCurrency from '../hooks/useCurrency';
import './styles/CartItem.scss';

function CartItem({ item }) {
  const { removeFromCart } = useCart();
  const currency = useCurrency();

  return (
    <div className="CartItem">
      <img className="fit-center" src={item.background_image} alt={item.name} />
      <div className="game-details">
        <h2 className="text-ellipsis">{item.name}</h2>
        <div className="genres text-ellipsis">
          {item.genres.map((genre) => genre.name).join(', ')}
        </div>
      </div>
      <div className="price">
        {getPriceText({
          text: currency.sample_text,
          value: item.price.value,
          currency: {
            symbol: currency.symbol,
            placement: currency.placement,
          },
        })}
      </div>
      <button
        className="button secondary-button fw-bold"
        onClick={() => removeFromCart(item.id)}
      >
        Remove from Cart
      </button>
    </div>
  );
}

export default CartItem;
