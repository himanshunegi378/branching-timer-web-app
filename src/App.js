import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimerInput } from './component/timerInput';
import Timer from './component/timer/timer';
import TimerCollectionCardGrid from './component/timerCollectionCardGrid/timerCollectionCardGrid';
import { Button } from 'react-bootstrap';
import countdownTimer from "./core/dataStructure/new_timerTree";
import { useSelector, useDispatch, useStore } from 'react-redux';
import { createNextTimer } from './slices/timerSlice';
import { createTimerCard, playTimer,timerFinished } from "./slices/timerSlice";
import CountDownTimer from './component/countDownTimer/countDownTimer';
import AlarmSound from './component/alarmSound/alarmSound';
import Notification from './component/notification/notification';
import CountDownClockManager from './component/countDownTimer/countDownClockManager';

function App() {
  const dispatch = useDispatch();
  const store = useStore()
  const timerCards = useSelector(state => state.timer.timerCards)//will be passed to timer collection card grid
  const timerState = useSelector(state => state.timer.timerState)//will be passed to clock manager
  const activeTimerId = useSelector(state => state.timer.activeTimer.id)// used to get activeTimer object
  const [activeTimer, setActiveTimer] = useState('') //will be passed to clock manager
  useEffect(() => {
    if (activeTimerId) {
      setActiveTimer(ps => store.getState().timer.timers[activeTimerId])
    }
  }, [activeTimerId])

  const onCountDownFinished = () => {
    dispatch(timerFinished())
    //set state of timerFinished to true
  }

  const onCountDownTick = (seconds) => {
    console.log(seconds)
  }

  return (
    <div className="App container">

      {/* <svg id='mySVG'>
      </svg> */}
      {/* <AlarmSound /> */}
      <Button onClick={() => { dispatch(createTimerCard({ id: 'himanshu' })) }}>Add Timer Card</Button>
      <Button onClick={() => { dispatch(playTimer()) }}>Play</Button>
      <div className='overflow-scroll'>
        <TimerCollectionCardGrid timerCollectionCards={timerCards} />
      </div>
      <CountDownClockManager activeTimer={activeTimer} state={timerState} onFinish={onCountDownFinished} onTick={onCountDownTick} />
      {/* <CountDownTimer /> */}
      {/* <Notification /> */}

      {/* <div className='timer' style={{ display: 'grid', 'grid-auto-columns': '170px' }}>
        <TimerInput id='himanshu' row={1} col={1} />
      </div> */}
    </div>
  );
}

export default App;
