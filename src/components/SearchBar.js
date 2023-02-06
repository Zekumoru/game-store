import React from 'react';
import Icon, { magnifyingGlassIcon } from '../assets/icons';

function SearchBar() {
  return (
    <div>
      <Icon icon={magnifyingGlassIcon} className="icon" />
      <input type="text" placeholder="Search..." />
    </div>
  );
}

export default SearchBar;
