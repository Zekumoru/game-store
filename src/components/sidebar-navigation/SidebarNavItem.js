import React from 'react';
import Icon from '../../assets/icons';
import './styles/SidebarNavItem.scss';

function SidebarNavItem({ children, subitems, icon }) {
  return (
    <div className="SidebarNavItem">
      <div className="title">
        <Icon className="icon" icon={icon} />
        <div className="label fw-bold">{children}</div>
      </div>
      {subitems && (
        <ul>
          {subitems.map((subitem) => (
            <li key={subitem.id}>{subitem.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SidebarNavItem;
