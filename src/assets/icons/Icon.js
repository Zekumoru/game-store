import React from 'react';

function Icon(initialProps) {
  const { icon, ...props } = initialProps;
  return React.createElement(icon, props);
}

export default Icon;
