import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function PrimaryHeader() {
  return (
    <header>
      <div>
        <Link to="/">GameStore</Link>
      </div>
      <div className="buttons">
        <button className="button secondary-button borders-none">Login</button>
        <button className="button primary-button">Sign Up</button>
      </div>
      <SearchBar />
    </header>
  );
}

export default PrimaryHeader;
