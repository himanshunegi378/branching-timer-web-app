import React, { useState, useEffect } from 'react'

const CountDownClock = (props) => {
    const [unmounted, setUnmounted] = useState(false)
    const [remainingTime, setRemainingTime] = useState(() => 0) //in seconds
    const [timerId, setTimerId] = useState(() => '')

    useEffect(() => {
        // if invalid time is give
        if (!unmounted) {
            if (props.time <= 0) {
                if (timerId) {
                    clearInterval(timerId)
                    setTimerId('')
                }
                return
            }
            console.log(props.time)
            //to check if timer is running
            if (timerId) {
                clearInterval(timerId) //remove the previous timer
                setTimerId('')
            }
            setRemainingTime(props.time.t)//set initial countdown timer of the timer

            //created a new timer with 
            let timer = setInterval(() => {
                if (!unmounted) {
                    setRemainingTime(remainingTime => {
                        return (remainingTime - 1)
                    })
                }


            }, 1000);
            setTimerId(timer)//store new handler as timerId 
        }

        return () => {
              
        }
    }, [props.time])

    useEffect(() => {
        return () => {
            clearInterval(timerId)
            setTimerId('')
            setUnmounted(true)        }
    }, [])

    useEffect(() => {
        // if timer has finished
        if (remainingTime <= 0 && timerId) {
            props.onFinished()
            clearInterval(timerId)
            setTimerId('')
        }
        props.onTick(remainingTime)

    }, [remainingTime])

    return (
        <></>
    )
}

export default CountDownClock
