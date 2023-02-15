import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../assets/icons';
import './styles/SidebarNavItem.scss';

function SidebarNavItem({ children, linkTo, subitems, icon }) {
  return (
    <div className="SidebarNavItem">
      <Link to={linkTo}>
        <div className="title">
          <Icon className="icon" icon={icon} />
          <div className="label fw-bold">{children}</div>
        </div>
      </Link>
      {subitems && (
        <ul>
          {subitems.map((subitem) => (
            <Link key={subitem.id} to={`${linkTo}/${subitem.id}`}>
              <li>{subitem.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SidebarNavItem;
