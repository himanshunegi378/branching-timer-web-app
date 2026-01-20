import React, { Fragment, useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';
import { AudioManagementView } from './views/audioManagement/AudioManagement.view';
import { TimerCards } from './views/timerCards/TimerCards.view';

function App(props) {
  useEffect(() => {
    document.body.classList.remove('page-loading');
    document.body.classList.add('page-loaded');
    document.body.classList.add('bg-gray-50');
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route exact path='/'>
          <TimerCards />
        </Route>
        <Route path='/audio'>
          <AudioManagementView />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
