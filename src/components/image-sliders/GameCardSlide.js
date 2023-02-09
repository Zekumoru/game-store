import React from 'react';
import GameItem from '../game-list/GameItem';
import './styles/GameCardSlide.scss';

function GameCardSlide({ data: game }) {
  return (
    <div className="GameCardSlide">
      <GameItem game={game} />
    </div>
  );
}

export default GameCardSlide;
