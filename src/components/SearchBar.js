import React from 'react';
import Icon, { magnifyingGlassIcon } from '../assets/icons';
import '../styles/components/SearchBar.scss';

function SearchBar() {
  return (
    <div className="SearchBar">
      <Icon icon={magnifyingGlassIcon} className="icon" />
      <input type="text" className="text-input" placeholder="Search..." />
    </div>
  );
}

export default SearchBar;
