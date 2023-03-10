import React from 'react';
import { Link } from 'react-router-dom';
import getPriceText from '../../utils/getPriceText';
import { useCart } from '../contexts/CartContext';
import useCurrency from '../hooks/useCurrency';
import MaterialButton from '../material-button/MaterialButton';
import './styles/CartItem.scss';

function CartItem({ item }) {
  const { removeFromCart } = useCart();
  const currency = useCurrency();

  return (
    <div className="CartItem">
      <Link className="image-container" to={`/games/${item.id}`}>
        <img
          className="fit-center"
          src={item.background_image}
          alt={item.name}
        />
      </Link>
      <div className="game-details">
        <Link to={`/games/${item.id}`}>
          <h2 className="text-ellipsis">{item.name}</h2>
        </Link>
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
      <MaterialButton type="secondary" onClick={() => removeFromCart(item.id)}>
        Remove from Cart
      </MaterialButton>
    </div>
  );
}

export default CartItem;
