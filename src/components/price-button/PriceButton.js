import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './styles/PriceButton.scss';
import MaterialButton from '../material-button/MaterialButton';

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
        <MaterialButton
          onClick={() => {
            addToCart(game);
            setShowAddToCardButton(false);
          }}
          disabled={game.price.text === 'Unavailable'}
        >
          Add to cart
        </MaterialButton>
      ) : (
        <MaterialButton
          type="secondary"
          onClick={() => {
            removeFromCart(game.id);
            setShowAddToCardButton(true);
          }}
          disabled={game.price.text === 'Unavailable'}
        >
          Remove from Cart
        </MaterialButton>
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
