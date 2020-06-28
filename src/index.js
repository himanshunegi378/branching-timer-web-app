import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { persistStoreCreator } from './store/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import {
  BrowserRouter as Router, Switch, Route

} from 'react-router-dom'
const { store, persistor } = persistStoreCreator()
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/branching-timer-web-app'>
            <App />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
