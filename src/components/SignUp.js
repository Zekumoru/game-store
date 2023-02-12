import React, { useState } from 'react';
import LabelInput from './form/LabelInput';
import LoginSignUpForm from './LoginSignUpForm';
import { Link } from 'react-router-dom';
import './styles/form-page.scss';

function SignUp() {
  const [password, setPassword] = useState('');

  return (
    <div className="form-page container">
      <LoginSignUpForm title="Sign Up">
        <LabelInput
          label="Email"
          type="email"
          className="text-input"
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
      </LoginSignUpForm>
      <div className="already-user-text">
        Already a user?{' '}
        <Link to="/login" className="login-text">
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
