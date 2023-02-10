import { Masonry, useInfiniteLoader } from 'masonic';
import React from 'react';
import { ElementProvider } from '../contexts/ElementContext';
import LoadingCircle from '../loading-circle/LoadingCircle';
import GameItem from './GameItem';
import GameLoadingItem from './GameLoadingItem';
import GameMasonryItem from './GameMasonryItem';
import './styles/GameList.scss';
import './styles/GameMasonryList.scss';

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
    <div className="GameList GameMasonryList">
      <ElementProvider
        element={games.length !== 0 ? GameItem : GameLoadingItem}
      >
        <Masonry
          items={games.length !== 0 ? games : [{}, {}, {}, {}, {}]}
          columnGutter={16}
          columnWidth={260}
          render={GameMasonryItem}
          {...options}
        />
      </ElementProvider>
      {typeof onLoadMore === 'function' && games.length !== 0 && (
        <div className="loading">
          Loading <LoadingCircle />
        </div>
      )}
    </div>
  );
}

export default GameMasonryList;
