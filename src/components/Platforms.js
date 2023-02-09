import React from 'react';
import platforms from '../data/platforms.json';
import Platform from './platform/Platform';

function Platforms() {
  return (
    <div className="Platforms">
      <div className="container mg-b8">
        <h1>Platforms</h1>
      </div>
      {platforms.map((platform) => (
        <Platform key={platform.id} platform={platform} />
      ))}
    </div>
  );
}

export default Platforms;
