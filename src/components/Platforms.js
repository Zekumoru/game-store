import React from 'react';
import platforms from '../data/platforms.json';
import Categories from './Categories';
import { UrlProvider } from './contexts/UrlContext';

function Platforms() {
  return (
    <UrlProvider url={'/games?parent_platforms='}>
      <Categories title="Platforms" slug="platforms" categories={platforms} />
    </UrlProvider>
  );
}

export default Platforms;
