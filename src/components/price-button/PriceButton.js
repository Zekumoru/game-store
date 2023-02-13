import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './styles/PriceButton.scss';

const shrinkFreeString = (price) => {
  if (price.includes('Free')) {
    return 'Free';
  }

  return price;
};

function PriceButton({ game, freeStringToShrink = true }) {
  const { addToCart, removeFromCart, inTheCart } = useCart();
  const [showAddToCartButton, setShowAddToCardButton] = useState(
    () => !inTheCart(game.id)
  );

  return (
    <div className="PriceButton">
      {showAddToCartButton ? (
        <button
          onClick={() => {
            addToCart(game);
            setShowAddToCardButton(false);
          }}
          className="button"
          disabled={game.price === 'Unavailable'}
        >
          Add to cart
        </button>
      ) : (
        <button
          className="button secondary-button"
          onClick={() => {
            removeFromCart(game.id);
            setShowAddToCardButton(true);
          }}
        >
          Remove from Cart
        </button>
      )}
      <div
        className={`price ${game.price === 'Unavailable' ? 'unavailable' : ''}`}
      >
        {!freeStringToShrink ? game.price : shrinkFreeString(game.price)}
      </div>
    </div>
  );
}

export default PriceButton;
