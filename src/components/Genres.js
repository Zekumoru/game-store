import React from 'react';
import genres from '../data/genres.json';
import Categories from './Categories';
import { UrlProvider } from './contexts/UrlContext';

function Platforms() {
  return (
    <UrlProvider
      url={
        'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres='
      }
    >
      <Categories title={'Genres'} categories={genres} />
    </UrlProvider>
  );
}

export default Platforms;
