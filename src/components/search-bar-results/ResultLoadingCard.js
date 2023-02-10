import React from 'react';
import './styles/ResultCard.scss';
import './styles/ResultLoadingCard.scss';

function ResultLoadingCard() {
  return (
    <div className="ResultCard ResultLoadingCard">
      <div className="skeleton-loading image" />
      <div className="box box-1 skeleton-loading" />
      <div className="box box-2 skeleton-loading" />
    </div>
  );
}

export default ResultLoadingCard;
