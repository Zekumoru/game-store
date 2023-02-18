import React from 'react';
import genres from '../data/genres.json';
import Categories from './Categories';
import { UrlProvider } from './contexts/UrlContext';

function Platforms() {
  return (
    <UrlProvider url={'/games?genres='}>
      <Categories title="Genres" slug="genres" categories={genres} />
    </UrlProvider>
  );
}

export default Platforms;
