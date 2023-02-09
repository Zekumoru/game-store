import React from 'react';
import './styles/GameLoading.scss';

function GameLoading() {
  return (
    <div className="GameLoading container">
      <div className="box box-1 skeleton-loading" />
      <div className="box box-2 skeleton-loading" />
      <div className="box box-3 skeleton-loading" />
    </div>
  );
}

export default GameLoading;
