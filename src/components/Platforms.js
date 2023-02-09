import React, { useEffect } from 'react';
import platforms from '../data/platforms.json';

function Platforms() {
  useEffect(() => {
    console.log(platforms);
  }, []);

  return (
    <div className="Platforms container">
      <h1>Platforms</h1>
    </div>
  );
}

export default Platforms;
