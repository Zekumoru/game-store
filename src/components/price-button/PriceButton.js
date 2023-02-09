import './styles/PriceButton.scss';

const shrinkFree = (price) => {
  if (price.includes('Free')) {
    return 'Free';
  }

  return price;
};

function PriceButton({ price, shrink = true }) {
  return (
    <div className="PriceButton">
      <button className="button" disabled={price === 'Unavailable'}>
        Add to cart
      </button>
      <div className={`price ${price === 'Unavailable' ? 'unavailable' : ''}`}>
        {!shrink ? price : shrinkFree(price)}
      </div>
    </div>
  );
}

export default PriceButton;
