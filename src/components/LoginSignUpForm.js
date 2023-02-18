import React, { useEffect, useState } from 'react';
import fetchGames from '../utils/fetchGames';
import Form from './form/Form';
import useAsyncOnce from './hooks/useAsyncOnce';

function LoginSignUpForm({ children, title }) {
  const [asyncOnce] = useAsyncOnce();
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    asyncOnce(async () => {
      const games = await fetchGames(`/genres`, {
        includePrices: false,
      });

      const randomIndex = Math.floor(games.length * Math.random());
      setBgImage(games[randomIndex].image_background);
    });
  }, [asyncOnce]);

  return (
    <>
      <div
        className="background-image fit-center"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0), rgba(33, 35, 34, 1)),
          url(${bgImage})`,
        }}
      />
      <h2>{title}</h2>
      <Form className="form">{children}</Form>
    </>
  );
}

export default LoginSignUpForm;
