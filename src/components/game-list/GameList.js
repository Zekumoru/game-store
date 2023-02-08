import { Masonry } from 'masonic';
import React from 'react';
import GameItem from './GameItem';

function GameList({ games = [] }) {
  return (
    <Masonry
      items={games}
      columnGutter={16}
      columnWidth={260}
      render={GameItem}
    />
  );
}

export default GameList;
