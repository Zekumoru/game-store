import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/components/PrimaryHeader.scss';

function PrimaryHeader() {
  return (
    <header className="PrimaryHeader">
      <div className="container">
        <div className="logo">
          <Link to="/">GameStore</Link>
        </div>
        <div className="buttons">
          <button className="button secondary-button box-shadow-none border-none">
            Login
          </button>
          <button className="button primary-button fw-bold">Sign Up</button>
        </div>
        <SearchBar />
      </div>
    </header>
  );
}

export default PrimaryHeader;
