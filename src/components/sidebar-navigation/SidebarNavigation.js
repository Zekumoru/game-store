import React from 'react';
import { cartIcon, homeIcon, pcIcon, swordIcon } from '../../assets/icons';
import SidebarNavItem from './SidebarNavItem';
import './styles/SidebarNavigation.scss';
import platforms from '../../data/platforms.json';
import genres from '../../data/genres.json';

function SidebarNavigation() {
  return (
    <div className="SidebarNavigation container">
      <SidebarNavItem icon={homeIcon} linkTo="/">
        Home
      </SidebarNavItem>
      <SidebarNavItem icon={cartIcon} linkTo="/cart">
        Cart
      </SidebarNavItem>
      <SidebarNavItem subitems={platforms} icon={pcIcon} linkTo="/platforms">
        Platforms
      </SidebarNavItem>
      <SidebarNavItem subitems={genres} icon={swordIcon} linkTo="/genres">
        Genres
      </SidebarNavItem>
    </div>
  );
}

export default SidebarNavigation;
