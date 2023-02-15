import React from 'react';
import Icon from '../../assets/icons';
import './styles/SidebarNavItem.scss';

function SidebarNavItem({ children, icon }) {
  return (
    <div className="SidebarNavItem">
      <Icon className="icon" icon={icon} />
      <div className="label fw-bold">{children}</div>
    </div>
  );
}

export default SidebarNavItem;
