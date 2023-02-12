import React, { useState } from 'react';
import Form from './form/Form';
import LabelInput from './form/LabelInput';
import './styles/SignUp.scss';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="SignUp">
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
          Already a user? <span className="login-text">Login</span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
