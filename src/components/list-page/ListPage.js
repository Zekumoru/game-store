import React from 'react';
import GameMasonryList from '../game-list/GameMasonryList';

function ListPage({ title, games, onLoadMore }) {
  return (
    <div className="container">
      <h1 className="mg-b16">{title}</h1>
      <GameMasonryList games={games} onLoadMore={onLoadMore} />
    </div>
  );
}

export default ListPage;
