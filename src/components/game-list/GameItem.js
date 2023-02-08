import React from 'react';
import GenresCapsulesList from '../genres-capsules-list/GenresCapsulesList';
import PlatformsIconsList from '../platforms-icons-list/PlatformsIconsList';
import './styles/GameItem.scss';

const getPrice = (price) => {
  if (price.includes('Free')) {
    return 'Free';
  }

  return price;
};

function GameItem({ data: game, width }) {
  return (
    <div className="GameItem" style={{ width: `${width}px` }}>
      <img src={game.background_image} alt={game.name} />
      <div className="content">
        <div className="game-info">
          <PlatformsIconsList
            platforms={game.platforms}
            iconProps={{ width: '14px', height: '14px' }}
          />
          <div className="title fw-bold">{game.name}</div>
          <GenresCapsulesList genres={game.genres} />
        </div>
        <div className="price-button">
          <button className="button">Add to cart</button>
          <div className="price">{getPrice(game.price)}</div>
        </div>
      </div>
    </div>
  );
}

export default GameItem;
