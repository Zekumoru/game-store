import React from 'react';
import Icon from '../../assets/icons';
import './styles/PrimaryNavItem.scss';

function PrimaryNavItem({ children, icon, iconOverlayElement }) {
  return (
    <div className="PrimaryNavItem">
      <div className="icon-container">
        <Icon className="icon" icon={icon} />
        {iconOverlayElement && iconOverlayElement}
      </div>
      <div className="label | fw-bold uppercased flex-align-center">
        {children}
      </div>
    </div>
  );
}

export default PrimaryNavItem;
