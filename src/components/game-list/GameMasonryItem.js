import React from 'react';
import GameItem from './GameItem';

function GameMasonryItem({ data, width }) {
  return (
    <div style={{ width: `${width}px` }}>
      <GameItem game={data} />
    </div>
  );
}

export default GameMasonryItem;
