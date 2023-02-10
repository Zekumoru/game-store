import React from 'react';
import platforms from '../data/platforms.json';
import Categories from './Categories';
import { UrlProvider } from './contexts/UrlContext';

function Platforms() {
  return (
    <UrlProvider
      url={
        'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms='
      }
    >
      <Categories title={'Platforms'} categories={platforms} />
    </UrlProvider>
  );
}

export default Platforms;
