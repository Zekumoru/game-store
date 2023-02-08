import React from 'react';
import './styles/GenreCapsule.scss';

function GenreCapsule({ genre }) {
  return <li className="GenreCapsule">{genre.name}</li>;
}

export default GenreCapsule;
