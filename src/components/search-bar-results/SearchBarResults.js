import React from 'react';
import ResultCard from './ResultCard';
import ResultLoadingCard from './ResultLoadingCard';

function SearchBarResults({ className, games, blurBackground, notFound }) {
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
