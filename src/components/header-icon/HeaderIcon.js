import React from 'react';
import Icon from '../../assets/icons';
import '../../styles/components/HeaderIcon.scss';

function HeaderIcon({ children = [], type, icon }) {
  return React.createElement(
    type,
    {
      className: 'HeaderIcon',
    },
    children,
    icon == null ? null : (
      <Icon className="icon" icon={icon} data-testid="icon" />
    )
  );
}

export default HeaderIcon;
