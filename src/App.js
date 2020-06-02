import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimerInput } from './component/timerInput';

function App() {

  return (
    <div className="App">
      <div className='d-flex flex-row p-5'>
        <TimerInput id='himanshu' />
      </div>
    </div>
  );
}

export default App;
