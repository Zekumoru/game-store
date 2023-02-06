import React from 'react';
import Icon, { magnifyingGlassIcon } from '../assets/icons';

function SearchBar() {
  return (
    <div className="SearchBar">
      <Icon icon={magnifyingGlassIcon} className="icon" />
      <input type="text" className="text-input" placeholder="Search..." />
    </div>
  );
}

export default SearchBar;
