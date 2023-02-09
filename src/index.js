import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import './styles/custom-fonts.css';
import './styles/utility-classes.css';
import './index.css';
import App from './components/App';
import './registerSwiper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
