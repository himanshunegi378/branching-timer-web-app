import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimerInput } from './component/timerInput';
import { Button } from 'react-bootstrap';
import countdownTimer from "./core/dataStructure/new_timerTree";

function App() {
  const [currentTimer, setcurrentTimer] = useState(countdownTimer.HEAD)

  const getNextTimer = () => {
    let nextTimer = countdownTimer.getNextNode(currentTimer)
    if(nextTimer){
      setcurrentTimer(nextTimer)
    }
    else{
      setcurrentTimer({time:'no next Timer found'})
    }
  }
  
  return (
    <div className="App">
    <div>
     <p> current: <span>{currentTimer.time}</span></p>
      <Button onClick={()=>{getNextTimer()}}>Next Timer</Button>
    </div>
      <div className='d-flex flex-row p-5'>
        <TimerInput id='himanshu' />
      </div>
    </div>
  );
}

export default App;
