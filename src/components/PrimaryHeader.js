import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MaterialButton from './material-button/MaterialButton';
import SearchBar from './SearchBar';
import './styles/PrimaryHeader.scss';

function PrimaryHeader() {
  const location = useLocation('login');
  const hideButtons = /\/(login|signup)/i.test(location.pathname);
  const hideSearchBar = /\/(login|signup|cart)/i.test(location.pathname);

  return (
    <header className="PrimaryHeader">
      <div className="logo">
        <Link to="/">GameStore</Link>
      </div>
      <div className={`buttons ${hideButtons ? 'visibility-hidden' : ''}`}>
        <Link to="/login">
          <MaterialButton type="tertiary" bold={false}>
            Login
          </MaterialButton>
        </Link>
        <Link to="/signup">
          <MaterialButton>Sign Up</MaterialButton>
        </Link>
      </div>
      {hideSearchBar || <SearchBar />}
    </header>
  );
}

export default PrimaryHeader;
