import React from 'react';
import '../../styles/components/GameSlide.scss';
import PlatformsIconsList from '../platforms-icons-list/PlatformsIconsList';

function GameSlide({ game }) {
  const { name, price, platforms } = game;

  return (
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
          <div className="price">{price}</div>
          <div className="divider">|</div>
          <PlatformsIconsList platforms={platforms} />
        </div>
      </div>
    </div>
  );
}

export default GameSlide;
