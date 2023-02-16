import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/GameSlide.scss';
import PlatformsIconsList from '../platforms-icons-list/PlatformsIconsList';

function GameSlide({ data: game }) {
  const { name, price, platforms } = game;

  return game.id === undefined ? (
    <div className="GameSlide skeleton-loading"></div>
  ) : (
    <Link to={`/games/${game.id}`}>
      <div
        className="GameSlide"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0), rgba(33, 35, 34, 1)),
          url(${game.background_image})`,
        }}
      >
        <div className="info">
          <div className="title">{name}</div>
          <div className="content">
            <div className="price">{price.text}</div>
            <div className="divider">|</div>
            <PlatformsIconsList platforms={platforms} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameSlide;
