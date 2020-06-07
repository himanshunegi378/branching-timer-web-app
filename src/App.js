import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimerInput } from './component/timerInput';
import { Button } from 'react-bootstrap';
import countdownTimer from "./core/dataStructure/new_timerTree";

function App() {
  const [grid, setGrid] = useState([])
  const [currentTimer, setcurrentTimer] = useState(countdownTimer.HEAD)

  const getNextTimer = () => {
    let nextTimer = countdownTimer.getNextNode(currentTimer)
    if (nextTimer) {
      countdownTimer.updateTimer(nextTimer.id, { message: 'sdfsdf' })
      setcurrentTimer(nextTimer)
    }
    else {
      setcurrentTimer({ time: 'no next Timer found' })
    }
  }

  const startTimer = () => {
    if (countdownTimer.HEAD.child) {
      let timer = countdownTimer.getNextNode(countdownTimer.HEAD)
      countdownTimer.updateTimer(timer.id, { state: 'active' })

    }
    else {
      countdownTimer.updateTimer(countdownTimer.HEAD.id, { state: 'active' })

    }
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="App">
     <div>
        <p> current: <span>{currentTimer.time}</span></p>
        <Button onClick={() => { getNextTimer() }}>Next Timer</Button>
      </div>
      <hr />
      <div>
        <Button onClick={() => { startTimer() }}>Start Timer</Button>
      </div>
      <svg id='mySVG'>

      </svg>
      <div className='timer' style={{ display: 'grid', 'grid-auto-columns': '190px' }}>
        <TimerInput id='himanshu' row={1} col={1} />
      </div>
    </div>
  );
}

export default App;
