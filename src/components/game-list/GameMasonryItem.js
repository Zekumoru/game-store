import React from 'react';
import { useElement } from '../contexts/ElementContext';

function GameMasonryItem({ data, width }) {
  const element = useElement();

  return (
    <div style={{ width: `${width}px` }}>
      {React.createElement(element, { game: data })}
    </div>
  );
}

export default GameMasonryItem;
