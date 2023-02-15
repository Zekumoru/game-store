import React from 'react';
import { cartIcon, homeIcon, pcIcon, swordIcon } from '../../assets/icons';
import SidebarNavItem from './SidebarNavItem';
import './styles/SidebarNavigation.scss';
import platforms from '../../data/platforms.json';
import genres from '../../data/genres.json';

function SidebarNavigation() {
  return (
    <div className="SidebarNavigation">
      <SidebarNavItem icon={homeIcon}>Home</SidebarNavItem>
      <SidebarNavItem icon={cartIcon}>Cart</SidebarNavItem>
      <SidebarNavItem subitems={platforms} icon={pcIcon}>
        Platforms
      </SidebarNavItem>
      <SidebarNavItem subitems={genres} icon={swordIcon}>
        Genres
      </SidebarNavItem>
    </div>
  );
}

export default SidebarNavigation;
