import React from 'react';
import PlatformsIconsList from '../platforms-icons-list/PlatformsIconsList';
import './styles/SearchBarResultCard.scss';

function SearchBarResultCard() {
  const platforms = JSON.parse(
    `[{"platform":{"id":4,"name":"PC","slug":"pc"}},{"platform":{"id":5,"name":"macOS","slug":"macos"}}]`
  );

  return (
    <div className="SearchBarResultCard">
      <img
        className="fit-center"
        src="https://media.rawg.io/media/screenshots/d7f/d7f630befee17f8d263a5d5396839c5a.jpg"
        alt="search bar result"
      />
      <h2 className="title">OneShot</h2>
      <div className="info">
        <div className="price">9,99€</div>
        <PlatformsIconsList platforms={platforms} />
      </div>
    </div>
  );
}

export default SearchBarResultCard;
