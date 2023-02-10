import React, { useState } from 'react';
import Icon, { magnifyingGlassIcon } from '../assets/icons';
import './styles/SearchBar.scss';
import SearchBarResults from './search-bar-results/SearchBarResults';

function SearchBar({ className }) {
  const [input, setInput] = useState('');

  return (
    <div className={`SearchBar ${className}`}>
      <Icon icon={magnifyingGlassIcon} className="icon" />
      <input
        type="text"
        className="text-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
      />
      {input === '' || <SearchBarResults className="results container" />}
    </div>
  );
}

export default SearchBar;
