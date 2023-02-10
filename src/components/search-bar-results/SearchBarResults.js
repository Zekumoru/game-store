import React from 'react';
import ResultLoadingCard from './ResultLoadingCard';

function SearchBarResults({ className }) {
  return (
    <div className={`SearchBarResults ${className}`}>
      <h3>Search results</h3>
      <ResultLoadingCard />
      <ResultLoadingCard />
      <ResultLoadingCard />
      <ResultLoadingCard />
      <ResultLoadingCard />
    </div>
  );
}

export default SearchBarResults;
