import { Masonry, useInfiniteLoader } from 'masonic';
import React from 'react';
import LoadingCircle from '../loading-circle/LoadingCircle';
import GameMasonryItem from './GameMasonryItem';
import './styles/GameList.scss';

function GameMasonryList({ games = [], onLoadMore }) {
  const maybeLoadMore = useInfiniteLoader(
    async () => {
      onLoadMore();
    },
    {
      isItemLoaded: (index, items) => !!items[index],
      minimumBatchSize: 6,
      threshold: 4,
    }
  );

  const options = {};
  if (typeof onLoadMore === 'function') {
    options.onRender = maybeLoadMore;
  }

  return (
    <div className="GameList">
      <Masonry
        items={games}
        columnGutter={16}
        columnWidth={260}
        render={GameMasonryItem}
        {...options}
      />
      {typeof onLoadMore === 'function' && (
        <div className="loading">
          Loading <LoadingCircle />
        </div>
      )}
    </div>
  );
}

export default GameMasonryList;
