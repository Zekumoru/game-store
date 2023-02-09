import React from 'react';
import { cartIcon, homeIcon, pcIcon, swordIcon } from '../../assets/icons';
import PrimaryNavItem from './PrimaryNavItem';
import './styles/PrimaryNavigation.scss';

function PrimaryNavigation() {
  return (
    <nav className="PrimaryNavigation">
      <PrimaryNavItem icon={homeIcon}>Home</PrimaryNavItem>
      <PrimaryNavItem icon={pcIcon}>Platforms</PrimaryNavItem>
      <PrimaryNavItem icon={swordIcon}>Genres</PrimaryNavItem>
      <PrimaryNavItem icon={cartIcon}>Cart</PrimaryNavItem>
    </nav>
  );
}

export default PrimaryNavigation;
