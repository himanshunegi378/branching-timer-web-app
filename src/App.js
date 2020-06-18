import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerCollectionCardGrid from './component/timerCollectionCardGrid/timerCollectionCardGrid';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createTimerCard } from "./slices/timerSlice";

function App() {
  const dispatch = useDispatch();
  const timerCards = useSelector(state => state.timer.timerCards)//will be passed to timer collection card grid




  return (
    <div className="App container">

      <Button onClick={() => { dispatch(createTimerCard()) }}>Add Timer Card</Button>
      <div className='overflow-scroll'>
        <TimerCollectionCardGrid timerCollectionCards={timerCards} />
      </div>
    </div>
  );
}

export default App;
