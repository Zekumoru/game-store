import React, { useEffect } from 'react';
import genres from '../data/genres.json';

function Genres() {
  useEffect(() => {
    console.log(genres);
  }, []);
  return <div className="Genres"></div>;
}

export default Genres;
