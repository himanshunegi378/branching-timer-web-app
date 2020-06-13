import React, { useState, useEffect } from 'react'
import CountDownClock from './countDownClock'
import { useDispatch } from 'react-redux'

const CountDownClockManager = (props) => {
    const [timeInSeconds, setTimeInSeconds] = useState({t:0})
    const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState({t:0})
    useEffect(() => {
        console.log(props.activeTimer)
        if (props.activeTimer) {
            const { mins, secs } = props.activeTimer
            let seconds = (mins ? mins * 60 : 0) + (secs ? secs : 0)
            setTimeInSeconds({t:seconds})
            setRemainingTimeInSeconds({t:seconds})

        }
        else {
            setTimeInSeconds({t:0})
            setRemainingTimeInSeconds({t:0})
        }

    }, [props.activeTimer])

    useEffect(() => {
        if (props.state === 'stopped') {
            setTimeInSeconds({t:0})
            setRemainingTimeInSeconds({t:0})
        } else {
            if (props.state === 'paused') {
                if (remainingTimeInSeconds.t > 0) {
                    setTimeInSeconds(remainingTimeInSeconds.t)
                }
            }
        }

    }, [props.state])

    const onCountDownFinished = () => {
        props.onFinish()
        //set state of timerFinished to true
    }

    const onCountDownTick = (seconds) => {
        props.onTick(seconds)
        if (props.state === 'playing') {
            setRemainingTimeInSeconds({t:seconds})
        }
    }

    return (
        <>
            {props.state === 'playing' ? <CountDownClock time={timeInSeconds} onTick={onCountDownTick} onFinished={onCountDownFinished} /> : null}

        </>
    )
}

export default CountDownClockManager
