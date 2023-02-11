import React from 'react';
import { Link } from 'react-router-dom';
import ResultCard from './ResultCard';
import ResultLoadingCard from './ResultLoadingCard';

function SearchBarResults({
  className,
  games,
  search,
  blurBackground,
  notFound,
}) {
  const cards =
    games.length === 0 ? (
      <>
        <ResultLoadingCard />
        <ResultLoadingCard />
        <ResultLoadingCard />
      </>
    ) : (
      <>
        {games.map((game) => (
          <ResultCard key={game.id} game={game} />
        ))}
        <Link to={`/search/${search}`}>
          <div className="underlined">View more results</div>
        </Link>
      </>
    );

  return (
    <div
      className={`SearchBarResults ${className} ${
        blurBackground ? 'bg-blur' : ''
      }`}
    >
      <h2>Search results</h2>
      {!notFound ? cards : <p>No results...</p>}
    </div>
  );
}

export default SearchBarResults;
