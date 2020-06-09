import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import store from "../../store/store";
import countDownClock from "../../core/countDownClock";
import { saveTimer,timerFinished } from '../../slices/timerSlice';
function CountDownTimer() {
    const activeTimerId = useSelector(state => state.timer.activeTimer.id)
    const [currentTimerId, setCurrentTimerId] = useState('')
    const dispatch = useDispatch()

    const onTick = ({ days, hours, minutes, seconds }) => {
    }

    const onStop=()=>{
        console.log('countdown finished')
        dispatch(timerFinished({id:activeTimerId}))
    }
    useEffect(() => {
        if (activeTimerId !== currentTimerId && activeTimerId) {
            let activeTimer = store.getState().timer.timers[activeTimerId]
            countDownClock(onStop,onTick,{mins:activeTimer.mins,secs:activeTimer.secs})
            console.log(' play timer', activeTimerId, activeTimer)
        }
    }, [activeTimerId])
    return (
        <></>
    )
}

export default CountDownTimer
