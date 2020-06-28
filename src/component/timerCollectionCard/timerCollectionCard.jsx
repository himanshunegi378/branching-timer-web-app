import React, { useState, useEffect } from 'react'
import { useSelector, useStore, shallowEqual, useDispatch } from 'react-redux'
import TimerList from '../timerList/timerList'
import { Button, Card } from 'react-bootstrap'
import { createTimer, toggleCardLoop, stopTimer, togglePlayPause, timerFinished, deleteCard, TimerCard, editCardTitle } from '../../slices/timerSlice'

import CountDownClockManager from '../countDownTimer/countDownClockManager'
import AlarmSound from '../alarmSound/alarmSound'
import PropTypes from 'prop-types'

const { v1: uuidv1 } = require('uuid')

function TimerCollectionCard (props) {
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
  }, [activeTimerId])

  useEffect(() => {
    if (timerCollectionDetail.status === 'playing') {
      dispatch(stopTimer({ cardId: props.id }))
    }
  }
  , [])

  const onCountDownStopped = () => {
    setRemainingMin('00')
    setRemainingSec('00')
  }

  const onCountDownFinished = () => {
    setAlarmComponent(<AlarmSound key={uuidv1()} />)
    dispatch(timerFinished({ id: props.id }))
  }

  const onCountDownTick = (secs) => {
    const minutes = parseInt(secs / 60)
    const seconds = secs % 60
    setRemainingMin(('0' + minutes).slice(-2))
    setRemainingSec(('0' + seconds).slice(-2))
  }

  return (
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
          <div className='col-2 px-0 user-select-none' onClick={(e) => {
            dispatch(toggleCardLoop({ id: props.id }))
          }}>
            {timerCollectionDetail.loop ? <svg className='w-100 h-auto' style={{ fill: '#007bff' }} id="Layer" enableBackground="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m19 25h9c1.104 0 2-.896 2-2s-.896-2-2-2h-9c-6.065 0-11 4.935-11 11s4.935 11 11 11h4.172l-1.586 1.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l5-5c.781-.781.781-2.047 0-2.828l-5-5c-.781-.781-2.047-.781-2.828 0s-.781 2.047 0 2.828l1.586 1.586h-4.172c-3.859 0-7-3.141-7-7 0-3.86 3.141-7 7-7z" /><path d="m45 21h-4.172l1.586-1.586c.781-.781.781-2.047 0-2.828s-2.047-.781-2.828 0l-5 5c-.781.781-.781 2.047 0 2.828l5 5c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-1.586-1.586h4.172c3.859 0 7 3.14 7 7 0 3.859-3.141 7-7 7h-9c-1.104 0-2 .896-2 2s.896 2 2 2h9c6.065 0 11-4.935 11-11s-4.935-11-11-11z" /></svg> : <svg className='w-100 h-auto' style={{ fill: ' #dadada' }} id="Layer" enableBackground="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m19 25h9c1.104 0 2-.896 2-2s-.896-2-2-2h-9c-6.065 0-11 4.935-11 11s4.935 11 11 11h4.172l-1.586 1.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l5-5c.781-.781.781-2.047 0-2.828l-5-5c-.781-.781-2.047-.781-2.828 0s-.781 2.047 0 2.828l1.586 1.586h-4.172c-3.859 0-7-3.141-7-7 0-3.86 3.141-7 7-7z" /><path d="m45 21h-4.172l1.586-1.586c.781-.781.781-2.047 0-2.828s-2.047-.781-2.828 0l-5 5c-.781.781-.781 2.047 0 2.828l5 5c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-1.586-1.586h4.172c3.859 0 7 3.14 7 7 0 3.859-3.141 7-7 7h-9c-1.104 0-2 .896-2 2s.896 2 2 2h9c6.065 0 11-4.935 11-11s-4.935-11-11-11z" /></svg>}
          </div>
        </div>
        <div className='d-flex  user-select-none'>
          <div className=' mx-2 h-auto my-1' style={{ width: '2rem' }} onClick={() => { dispatch(togglePlayPause({ cardId: props.id })) }}>{timerCollectionDetail.status === 'playing'
            ? <svg style={{ fill: '#007bff' }} className='w-100 h-auto' height="512" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 477.867 477.867" >
              <g>
                <g>
                  <path d="M187.733,0H51.2c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533
			c9.426,0,17.067-7.641,17.067-17.067V17.067C204.8,7.641,197.159,0,187.733,0z M170.667,443.733h-102.4v-409.6h102.4V443.733z"/>
                </g>
              </g>
              <g>
                <g>
                  <path d="M426.667,0H290.133c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533
			c9.426,0,17.067-7.641,17.067-17.067V17.067C443.733,7.641,436.092,0,426.667,0z M409.6,443.733H307.2v-409.6h102.4V443.733z"/>
                </g>
              </g>
            </svg>
            : <svg style={{ fill: '#007bff' }} className='w-100 h-auto' height="512" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 477.886 477.886">
              <g>
                <g>
                  <path d="M476.091,231.332c-1.654-3.318-4.343-6.008-7.662-7.662L24.695,1.804C16.264-2.41,6.013,1.01,1.8,9.442
			c-1.185,2.371-1.801,4.986-1.8,7.637v443.733c-0.004,9.426,7.633,17.07,17.059,17.075c2.651,0.001,5.266-0.615,7.637-1.8
			L468.429,254.22C476.865,250.015,480.295,239.768,476.091,231.332z M34.133,433.198V44.692l388.506,194.253L34.133,433.198z"/>
                </g>
              </g>
            </svg>
          }
          </div>
          {timerCollectionDetail.status === 'stopped'
            ? <div className='mx-2 h-auto my-1' style={{ width: '2rem' }}>
              <svg style={{ fill: '#dadada' }} className='w-100 h-auto' id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm115 356c0 8.284-6.716 15-15 15h-200c-8.284 0-15-6.716-15-15v-200c0-8.284 6.716-15 15-15h200c8.284 0 15 6.716 15 15z" /><path d="m171 171h170v170h-170z" /></g></svg>
            </div>
            : <div className='mx-2 h-auto my-1' style={{ width: '2rem' }} onClick={() => { dispatch(stopTimer({ cardId: props.id })) }}>
              <svg className='w-100 h-auto' style={{ fill: '#007bff' }} id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm115 356c0 8.284-6.716 15-15 15h-200c-8.284 0-15-6.716-15-15v-200c0-8.284 6.716-15 15-15h200c8.284 0 15 6.716 15 15z" /><path d="m171 171h170v170h-170z" /></g></svg>
            </div>}
        </div>
        <CountDownClockManager activeTimer={activeTimer} state={timerState} onFinish={onCountDownFinished} onTick={onCountDownTick} onStopped={() => { onCountDownStopped() }} />
        {alarmComponent}
        <TimerList id={props.id} activeTimerId={activeTimer.id} />
        <div className='row'>
          <div className='col-3'></div>
          <Button className='col-6' size='sm' onClick={() => { dispatch(createTimer({ id: props.id })) }}>Add Timer</Button>
          <div className='col-3'></div>
        </div>
      </Card.Body>

    </Card>
  )
}

TimerCollectionCard.propTypes = {
  id: PropTypes.any
}

export default TimerCollectionCard
