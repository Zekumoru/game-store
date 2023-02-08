import React from 'react';
import GenresCapsulesList from '../genres-capsules-list/GenresCapsulesList';
import PlatformsIconsList from '../platforms-icons-list/PlatformsIconsList';
import './styles/GameItem.scss';

function GameItem({ game }) {
  return (
    <li className="GameItem">
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
          <div className="price">{game.price}</div>
        </div>
      </div>
    </li>
  );
}

export default GameItem;
