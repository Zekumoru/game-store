import React from 'react';
import GameItem from '../game-list/GameItem';
import GameLoadingItem from '../game-list/GameLoadingItem';
import './styles/GameCardSlide.scss';

function GameCardSlide({ data: game }) {
  return (
    <div className="GameCardSlide">
      {game === null ? <GameLoadingItem /> : <GameItem game={game} />}
    </div>
  );
}

export default GameCardSlide;
