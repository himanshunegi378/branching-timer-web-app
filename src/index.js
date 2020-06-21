import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { throttle } from 'lodash';
import Rx, { Observable, interval } from 'rxjs';
import { throttle as rxThrottle } from 'rxjs/operators';

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

function getState$(store) {
  return new Observable.create(function (observer) {
    // emit the current state as first value:
    observer.next(store.getState());
    const unsubscribe = store.subscribe(function () {
      // emit on every new state changes
      observer.next(store.getState());
    });
    // let's return the function that will be called
    // when the Observable is unsubscribed
    return unsubscribe;
  });
}

const state$ = getState$(store);

const subscription = state$.pipe(rxThrottle(ev => interval(1000))).subscribe(function (state) {
  console.log(state);
  saveState(state)
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
