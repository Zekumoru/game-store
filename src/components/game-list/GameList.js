import React from 'react';
import GameItem from './GameItem';
import './styles/GameList.scss';

function GameList({ games = [] }) {
  return (
    <ul className="GameList default">
      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </ul>
  );
}

export default GameList;
