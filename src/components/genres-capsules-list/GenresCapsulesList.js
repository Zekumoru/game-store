import React from 'react';
import GenreCapsule from './GenreCapsule';
import './styles/GenresCapsulesList.scss';

function GenresCapsulesList({ genres = [] }) {
  return (
    <ul className="GenresCapsulesList">
      {genres.map((genre) => (
        <GenreCapsule key={genre.id} genre={genre} />
      ))}
    </ul>
  );
}

export default GenresCapsulesList;
