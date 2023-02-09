import React from 'react';
import Icon from '../../assets/icons';
import './styles/PrimaryNavItem.scss';

function PrimaryNavItem({ children, icon }) {
  return (
    <div className="PrimaryNavItem">
      <Icon icon={icon} />
      <div className="label">{children}</div>
    </div>
  );
}

export default PrimaryNavItem;
