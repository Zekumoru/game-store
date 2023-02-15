import React from 'react';
import { cartIcon, homeIcon, pcIcon, swordIcon } from '../../assets/icons';
import SidebarNavItem from './SidebarNavItem';
import './styles/SidebarNavigation.scss';

function SidebarNavigation() {
  return (
    <div className="SidebarNavigation">
      <SidebarNavItem icon={homeIcon}>Home</SidebarNavItem>
      <SidebarNavItem icon={cartIcon}>Cart</SidebarNavItem>
      <SidebarNavItem icon={pcIcon}>Platforms</SidebarNavItem>
      <SidebarNavItem icon={swordIcon}>Genres</SidebarNavItem>
    </div>
  );
}

export default SidebarNavigation;
