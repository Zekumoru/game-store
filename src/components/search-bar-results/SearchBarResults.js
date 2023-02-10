import React from 'react';
import ResultCard from './ResultCard';
import ResultLoadingCard from './ResultLoadingCard';

function SearchBarResults({ className, games, blurBackground = false }) {
  return (
    <div
      className={`SearchBarResults ${className} ${
        blurBackground ? 'bg-blur' : ''
      }`}
    >
      <h3>Search results</h3>
      {games.length === 0 ? (
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
      )}
    </div>
  );
}

export default SearchBarResults;
