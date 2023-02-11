import React from 'react';
import { Link } from 'react-router-dom';
import GenresCapsulesList from '../genres-capsules-list/GenresCapsulesList';
import PlatformsIconsList from '../platforms-icons-list/PlatformsIconsList';
import PriceButton from '../price-button/PriceButton';
import './styles/GameItem.scss';

function GameItem({ game }) {
  const gamePageUrl = `/games/${game.id}`;

  return (
    <div className="GameItem">
      <Link to={gamePageUrl}>
        <img
          className="fit-center"
          src={game.background_image}
          alt={game.name}
        />
      </Link>
      <div className="content">
        <div className="game-info">
          <PlatformsIconsList
            platforms={game.platforms}
            iconProps={{ width: '14px', height: '14px' }}
          />
          <Link to={gamePageUrl}>
            <div className="title fw-bold">{game.name}</div>
          </Link>
          <GenresCapsulesList genres={game.genres} />
        </div>
        <PriceButton price={game.price} />
      </div>
    </div>
  );
}

export default GameItem;
