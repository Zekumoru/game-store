import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/components/PrimaryHeader.scss';

function PrimaryHeader() {
  const location = useLocation('login');
  const hideButtonsAndSearchBar = /\/(login|signup)/i.test(location.pathname);

  return (
    <header className="PrimaryHeader">
      <div className="logo-buttons container">
        <div className="logo">
          <Link to="/">GameStore</Link>
        </div>
        <div
          className={`buttons ${
            hideButtonsAndSearchBar ? 'visibility-hidden' : ''
          }`}
        >
          <Link to="/login">
            <button className="button secondary-button box-shadow-none border-none">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="button primary-button fw-bold">Sign Up</button>
          </Link>
        </div>
      </div>
      {hideButtonsAndSearchBar || <SearchBar className="container" />}
    </header>
  );
}

export default PrimaryHeader;
