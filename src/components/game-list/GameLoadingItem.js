import React from 'react';
import './styles/GameItem.scss';
import './styles/GameLoadingItem.scss';

function GameLoadingItem() {
  return (
    <div className="GameItem GameLoadingItem">
      <div className="image skeleton-loading" />
      <div className="boxes content">
        <div className="box box-1 skeleton-loading" />
        <div className="box box-2 skeleton-loading" />
        <div className="box box-3 skeleton-loading" />
      </div>
    </div>
  );
}

export default GameLoadingItem;
