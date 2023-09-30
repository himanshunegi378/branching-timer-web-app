import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './style.css';
import { TimerCardsProvider } from './contexts/TimerCards';
import { BrowserRouter as Router } from 'react-router-dom';
import { SpeechProvider } from './contexts/Speech';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <SpeechProvider>
      <TimerCardsProvider>
        <Router>
          <App />
        </Router>
      </TimerCardsProvider>
    </SpeechProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
