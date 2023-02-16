import React from 'react';
import { cartIcon, homeIcon, pcIcon, swordIcon } from '../../assets/icons';
import SidebarNavItem from './SidebarNavItem';
import './styles/SidebarNavigation.scss';
import platforms from '../../data/platforms.json';
import genres from '../../data/genres.json';
import { useCartItems } from '../contexts/CartItemsContext';

function SidebarNavigation() {
  const items = useCartItems();

  return (
    <div className="SidebarNavigation container">
      <SidebarNavItem icon={homeIcon} linkTo="/">
        Home
      </SidebarNavItem>
      <SidebarNavItem icon={cartIcon} linkTo="/cart">
        Cart{' '}
        <div className="cart-items-count">
          {items.length > 99 ? '99+' : items.length}
        </div>
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
