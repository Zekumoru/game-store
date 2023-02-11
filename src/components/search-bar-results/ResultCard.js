import React from 'react';
import { Link } from 'react-router-dom';
import PlatformsIconsList from '../platforms-icons-list/PlatformsIconsList';
import './styles/ResultCard.scss';

function ResultCard({ game }) {
  return (
    <Link to={`/games/${game.id}`}>
      <div className="ResultCard">
        <img
          className="fit-center"
          src={game.background_image}
          alt={game.name}
        />
        <h2 className="title text-ellipsis">{game.name}</h2>
        <div className="info">
          <div className="price">{game.price}</div>
          <div className="divider">|</div>
          <PlatformsIconsList platforms={game.platforms} />
        </div>
      </div>
    </Link>
  );
}

export default ResultCard;
