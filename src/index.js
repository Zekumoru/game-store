import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import 'normalize.css';
import './styles/custom-fonts.css';
import './styles/utility-classes.css';
import './index.css';
import App from './components/App';
import './registerSwiper';

axios.defaults.baseURL = 'http://194.163.190.50:3010/game-store-api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
