import React from 'react';
import ReactDOM from 'react-dom/client';
import 'font-awesome/css/font-awesome.min.css';
import './assets/index.css';
import App from './App';

import Theme from './assets/Theme';
import GlobalStyle from './assets/GlobalStyle';
import Fonts from './assets/Fonts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Fonts />
    <Theme>
      <GlobalStyle />
      <App />
    </Theme>
  </React.StrictMode>
);