import React, { useState, useEffect } from 'react'
import CountDownClock from './countDownClock'

const CountDownClockManager = (props) => {
  const [timeInSeconds, setTimeInSeconds] = useState(() => { return { t: 0 } })
  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(() => { return { t: 0 } })
  useEffect(() => {
    console.log(props.activeTimer)
    if (props.activeTimer) {
      const { mins, secs } = props.activeTimer
      const seconds = (mins ? mins * 60 : 0) + (secs || 0)
      setTimeInSeconds({ t: seconds })
      setRemainingTimeInSeconds({ t: seconds })
    } else {
      setTimeInSeconds({ t: 0 })
      setRemainingTimeInSeconds({ t: 0 })
    }
  }, [props.activeTimer])

  useEffect(() => {
    if (props.state === 'stopped') {
      setTimeInSeconds({ t: 0 })
      setRemainingTimeInSeconds({ t: 0 })
      props.onStopped()
    } else {
      if (props.state === 'paused') {
        if (remainingTimeInSeconds.t > 0) {
          setTimeInSeconds(remainingTimeInSeconds)
        }
      } else {
        if (props.state === 'playing') {
          if (remainingTimeInSeconds.t > 0) {
            setTimeInSeconds(remainingTimeInSeconds)
          }
        }
      }
    }
  }, [props.state])

  const onCountDownFinished = () => {
    props.onFinish()
    // set state of timerFinished to true
  }

  const onCountDownTick = (seconds) => {
    props.onTick(seconds)
    setRemainingTimeInSeconds({ t: seconds })
  }

  return (
    <>
      {props.state === 'playing' ? <CountDownClock time={timeInSeconds} onTick={onCountDownTick} onFinished={onCountDownFinished} /> : null}

    </>
  )
}

export default CountDownClockManager
