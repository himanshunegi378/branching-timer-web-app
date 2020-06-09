import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimerInput } from './component/timerInput';
import Timer from './component/timer/timer';
import TimerCollectionCardGrid from './component/timerCollectionCardGrid/timerCollectionCardGrid';
import { Button } from 'react-bootstrap';
import countdownTimer from "./core/dataStructure/new_timerTree";
import { useSelector, useDispatch } from 'react-redux';
import { createNextTimer } from './slices/timerSlice';
import { createTimerCard, playTimer } from "./slices/timerSlice";
import CountDownTimer from './component/countDownTimer/countDownTimer';
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

  const dispatch = useDispatch();


  return (
    <div className="App container">
      {/* <svg id='mySVG'>
      </svg> */}
      <Button onClick={() => { dispatch(createTimerCard({ id: 'himanshu' })) }}>Add Timer Card</Button>
      <Button onClick={() => { dispatch(playTimer()) }}>Play</Button>
      <div className='overflow-scroll'>
        <TimerCollectionCardGrid />
      </div>
      <CountDownTimer/>

      {/* <div className='timer' style={{ display: 'grid', 'grid-auto-columns': '170px' }}>
        <TimerInput id='himanshu' row={1} col={1} />
      </div> */}
    </div>
  );
}

export default App;
