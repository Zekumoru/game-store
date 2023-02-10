import React from 'react';
import { useParams } from 'react-router-dom';
import GameMasonryList from '../game-list/GameMasonryList';
import useGames from '../hooks/useGames';

function ExpandCategory({ title, query, categories }) {
  const { id } = useParams();
  const categoryName = categories.find((c) => c.id === Number(id))?.name;
  const { games, handleLoadMore } = useGames({
    key: `${title.toLowerCase()}-${categoryName}-games`,
    url: `https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&${query}=${id}`,
    shouldFetch: categoryName !== undefined,
  });

  return (
    <>
      <div className="container">
        <h1 className="mg-b16">
          {title} / {categoryName}
        </h1>
        <GameMasonryList games={games} onLoadMore={handleLoadMore} />
      </div>
    </>
  );
}

export default ExpandCategory;
