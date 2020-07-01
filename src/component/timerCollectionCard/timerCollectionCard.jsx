import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useStore, shallowEqual, useDispatch } from 'react-redux'
import TimerList from '../timerList/timerList'
import { Button, Card } from 'react-bootstrap'
import { createTimer, toggleCardLoop, stopTimer, togglePlayPause, timerFinished, deleteCard, TimerCard, editCardTitle, onCardUnmounting, onMounting, playCard, pauseCard } from '../../slices/timerSlice'

import CountDownClockManager from '../countDownTimer/countDownClockManager'
import AlarmSound from '../alarmSound/alarmSound'
import PropTypes from 'prop-types'
import { PlayButton } from "./playButton";
import { LoopButton } from "./loopButton";
import StopButton from './stopButton'
import { Link, Route, Switch } from "react-router-dom";
import { doesCardIdExist, createCountDownTimerWithCardId, createCountDownTimerWithCardIdWithoutCallBack } from '../countDownTimer/newCountDownClock'

const { v1: uuidv1 } = require('uuid')

export default function TimerCollectionCard(props) {
  const timerCollectionDetail = useSelector(state => {
    if (state.timer.timerCards[props.id]) {
      return state.timer.timerCards[props.id]
    }
    return TimerCard
  })
  const activeTimerId = useSelector(state => {
    if (timerCollectionDetail) {
      return timerCollectionDetail.activeTimer
    } else {
      return { id: '', index: -1 }
    }
  }, shallowEqual)
  const [alarmComponent, setAlarmComponent] = useState('')
  const [cardTitle, setCardTitle] = useState(() => timerCollectionDetail.title)
  const [editTitle, setEditTitle] = useState(() => false)
  const [activeTimer, setActiveTimer] = useState('')
  const [remainingMin, setRemainingMin] = useState(() => '00')
  const [remainingSec, setRemainingSec] = useState(() => '00')
  const timerState = useSelector(state => {
    if (timerCollectionDetail) {
      return timerCollectionDetail.status
    }
  })
  const dispatch = useDispatch()
  const store = useStore()


  useEffect(() => {
    if (activeTimerId.id) {
      const timer = store.getState().timer.timers[activeTimerId.id]
      setActiveTimer(Object.assign({}, timer))
    } else {
      setActiveTimer('')
    }
  }, [activeTimerId, store])

  useEffect(() => {

    return () => {
      console.log('card unmounting')
    }
  }, [])

  const onCountDownStopped = () => {
    setRemainingMin('00')
    setRemainingSec('00')
  }

  const memofinished = useCallback(() => {
    setAlarmComponent(<AlarmSound key={uuidv1()} />)
    dispatch(timerFinished({ id: props.id }))
  }, [dispatch, props.id])

  const onCountDownTick = (secs) => {

    const minutes = parseInt(secs / 60)
    const seconds = parseInt(secs % 60)
    setRemainingMin(('0' + minutes).slice(-2))
    setRemainingSec(('0' + seconds).slice(-2))
  }

  const memostop = useCallback(
    () => {
      onCountDownStopped()
    },
    [],
  )

  const memoTick = useCallback(
    (tick) => {
      onCountDownTick(tick)
    },
    [],
  )

  useEffect(() => {
    if (timerCollectionDetail.status === 'stopped' || timerCollectionDetail.status === 'paused') {
      const data = doesCardIdExist(props.id)
      if (data) {
        clearInterval(data.handle)
        if (timerCollectionDetail.status === 'stopped') {
          dispatch(stopTimer({ cardId: props.id }))
          data.destroy()
        }
      }
    } else {
      if (timerCollectionDetail.status === 'playing') {
        createCountDownTimerWithCardId(props.id, memoTick)
        // return () => {
        //   const data = doesCardIdExist(props.id)
        //   if (data) {
        //     createCountDownTimerWithCardIdWithoutCallBack(props.id)
        //   }
        // }
      }

    }

  }, [dispatch, memoTick, props.id, timerCollectionDetail.status])

  return (
    <>
      {/* <CountDownClockManager cardId={props.id} activeTimer={activeTimer} state={timerState} onFinish={memofinished} onTick={memoTick} onStopped={memostop} /> */}


      <Card className='m-1 shadow-lg' style={{ width: '25%', minWidth: '265px', maxWidth: '265px' }}>
        <div className='d-flex flex-row-reverse'>
          <Button size='sm' className='btn btn-danger' onClick={() => { dispatch(deleteCard({ id: props.id })) }} >X</Button>
        </div>
        <Card.Body>
          <div className='h1 text-center'>
            {remainingMin}:{remainingSec}
          </div>
          <div className='row'>

            <div className='col-10 text-center'>
              <Card.Title onClick={() => setEditTitle(true)} onBlur={() => {
                setEditTitle(false)
                dispatch(editCardTitle({ cardId: props.id, newTitle: cardTitle }))
              }}>
                {editTitle ? <input autoFocus type='text' value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} /> : timerCollectionDetail.title}
              </Card.Title>
            </div>
            <div className='col-2 px-0 user-select-none'>
              <LoopButton looping={timerCollectionDetail.loop} onChange={() => dispatch(toggleCardLoop({ id: props.id }))} />
            </div>
          </div>
          <div className='d-flex  user-select-none'>
            <div className=' mx-2 h-auto my-1' style={{ width: '2rem' }}>
              <PlayButton isPlaying={timerCollectionDetail.status === 'playing'} onChange={(state) => {
                const action = state ? playCard({ cardId: props.id }) : pauseCard({ cardId: props.id })
                dispatch(action)
              }} />
            </div>
            <StopButton isStopped={timerCollectionDetail.status === 'stopped'} onChange={(isStopped) => { if (isStopped) dispatch(stopTimer({ cardId: props.id })) }} />
          </div>
          {alarmComponent}
          <TimerList id={props.id} activeTimerId={activeTimer.id} />
          <div className='row'>
            <div className='col-3'></div>
            <Button className='col-6' size='sm' onClick={() => { dispatch(createTimer({ id: props.id })) }}>Add Timer</Button>
            <div className='col-3'></div>
          </div>
        </Card.Body>

      </Card>

    </>
  )
}



