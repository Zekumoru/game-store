import React from 'react';
import LabelInput from './form/LabelInput';
import LoginSignUpForm from './LoginSignUpForm';
import { Link } from 'react-router-dom';
import './styles/form-page.scss';

function SignUp() {
  return (
    <div className="form-page container full-screen">
      <LoginSignUpForm title="Login">
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
          minLength="8"
          maxLength="20"
        />
        <button className="button fw-bold">Login</button>
      </LoginSignUpForm>
      <div className="user-prompt-text">
        New user? <Link to="/signup">Create an account</Link>
      </div>
    </div>
  );
}

export default SignUp;
