import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import axios from 'axios';
import 'normalize.css';
import './styles/custom-fonts.css';
import './styles/utility-classes.css';
import './index.css';
import App from './components/App';
import './registerSwiper';

axios.defaults.baseURL = 'https://www.zekumoru.com/game-store-api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>
);
