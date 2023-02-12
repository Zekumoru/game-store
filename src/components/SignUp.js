import React, { useEffect, useState } from 'react';
import Form from './form/Form';
import LabelInput from './form/LabelInput';
import './styles/SignUp.scss';
import useAsyncOnce from './hooks/useAsyncOnce';
import fetchGames from '../utils/fetchGames';
import { Link } from 'react-router-dom';

function SignUp() {
  const [asyncOnce] = useAsyncOnce();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    asyncOnce(async () => {
      const games = await fetchGames(
        `https://api.rawg.io/api/genres?key=f8c4731c17aa4d39a151c2de730a4e53`,
        {
          includePrices: false,
        }
      );

      const randomIndex = Math.floor(games.length * Math.random());
      setBgImage(games[randomIndex].image_background);
    });
  }, [asyncOnce]);

  return (
    <div className="SignUp">
      <div
        className="background-image fit-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0), rgba(33, 35, 34, 1)),
            url(${bgImage})`,
        }}
      />
      <div className="container">
        <h2>Sign Up</h2>
        <Form className="form">
          <LabelInput
            label="Email"
            type="email"
            className="text-input"
            onChange={(e) => setEmail(e.target.value)}
            requiredMessage="Email is required"
          />
          <LabelInput
            label="Password"
            type="password"
            className="password-input"
            requiredMessage="Password is required"
            onChange={(e) => setPassword(e.target.value)}
            minLength="8"
            maxLength="20"
          />
          <LabelInput
            label="Confirm Password"
            type="password"
            className="password-input"
            requiredMessage="Please confirm your password"
            validate={(confirmPassword) => {
              if (password !== confirmPassword) return 'Passwords do not match';
              return '';
            }}
          />
          <button className="button">Register</button>
        </Form>
        <div className="already-user-text">
          Already a user?{' '}
          <Link to="/login" className="login-text">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
