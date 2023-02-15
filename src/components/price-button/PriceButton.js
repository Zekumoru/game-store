import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './styles/PriceButton.scss';

const shrinkFreeString = (priceText) => {
  if (priceText.includes('Free')) {
    return 'Free';
  }

  return priceText;
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
          disabled={game.price.text === 'Unavailable'}
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
        className={`price ${
          game.price.text === 'Unavailable' ? 'unavailable' : ''
        }`}
      >
        {!freeStringToShrink
          ? game.price.text
          : shrinkFreeString(game.price.text)}
      </div>
    </div>
  );
}

export default PriceButton;
