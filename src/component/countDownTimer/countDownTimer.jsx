import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import store from '../../store/store'
import countDownClock from '../../core/countDownClock'
import { Howl } from 'howler'
import alarmSound from './alarm.mp3'
import Notification from 'react-web-notification'

import { saveTimer, timerFinished } from '../../slices/timerSlice'
function CountDownTimer () {
  const activeTimerId = useSelector(state => state.timer.activeTimer.id)
  const timerState = useSelector(state => state.timer.timerState)
  const [currentTimerId, setCurrentTimerId] = useState('')
  const [countDownClod, setCountDownClod] = useState({})
  const dispatch = useDispatch()

  const onTick = ({ days, hours, minutes, seconds }) => {
  }

  const onStop = () => {
    timerCompleted(activeTimerId)
  }

  const timerCompleted = (timerId) => {
    if (timerId === activeTimerId) {
      dispatch(timerFinished({ id: timerId }))
    }
  }

  useEffect(() => {
    if (activeTimerId) {
      const activeTimer = store.getState().timer.timers[activeTimerId]
      setCurrentTimerId(activeTimerId)
      const countdownclock = countDownClock(onStop, onTick, { mins: activeTimer.mins, secs: activeTimer.secs })
      countdownclock.start()
      setCountDownClod(countdownclock)
      console.log(' play timer', activeTimerId, activeTimer)
    }
  }, [activeTimerId])

  useEffect(() => {
    if (timerState === 'stopped') {
      // countDownClod.stop()
    }
  }, [timerState])
  return (
    <></>
  )
}

export default CountDownTimer
