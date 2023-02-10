import React from 'react';
import SearchBarResultCard from './SearchBarResultCard';

function SearchBarResults({ className }) {
  return (
    <div className={`SearchBarResults ${className}`}>
      <h3>Search results</h3>
      <SearchBarResultCard />
      <SearchBarResultCard />
      <SearchBarResultCard />
      <SearchBarResultCard />
    </div>
  );
}

export default SearchBarResults;
