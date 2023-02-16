import React from 'react';
import { Link } from 'react-router-dom';
import { cartIcon, homeIcon, pcIcon, swordIcon } from '../../assets/icons';
import CartItemsCount from '../cart-items-count/CartItemsCount';
import PrimaryNavItem from './PrimaryNavItem';
import './styles/PrimaryNavigation.scss';

function PrimaryNavigation() {
  return (
    <nav className="PrimaryNavigation">
      <Link className="nav-item" to="/">
        <PrimaryNavItem icon={homeIcon}>Home</PrimaryNavItem>
      </Link>
      <Link className="nav-item" to="/platforms">
        <PrimaryNavItem icon={pcIcon}>Platforms</PrimaryNavItem>
      </Link>
      <Link className="nav-item" to="/genres">
        <PrimaryNavItem icon={swordIcon}>Genres</PrimaryNavItem>
      </Link>
      <Link className="nav-item" to="/cart">
        <PrimaryNavItem icon={cartIcon} iconOverlayElement={<CartItemsCount />}>
          Cart
        </PrimaryNavItem>
      </Link>
    </nav>
  );
}

export default PrimaryNavigation;
