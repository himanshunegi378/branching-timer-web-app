import React, { useState, useEffect } from 'react'
import style from './style.module.css'
import { saveTimer } from "../../slices/timerSlice";
import { useSelector, useDispatch } from 'react-redux'

function Timer(props) {
    let TimerDetail = useSelector(state => state.timer.timers[props.id])
    const dispatch = useDispatch()
    const [mins, setMins] = useState(TimerDetail.mins)
    const [secs, setSecs] = useState(TimerDetail.secs)
    const [unsavedChanges, setunsavedChanges] = useState(false)
    const [messageBgColor, setMessageBgColor] = useState('alert-info')

    useEffect(() => {
        if (unsavedChanges) {
            dispatch(saveTimer({ id: TimerDetail.id, message: TimerDetail.message, mins: parseInt(mins), secs: parseInt(secs) }))
            setunsavedChanges(false)
        }

    }, [unsavedChanges])


    useEffect(() => {
        if(TimerDetail.status === 'active'){
            setMessageBgColor('alert-danger')
        }
        else{
            setMessageBgColor('alert-info')
        }
       
    }, [TimerDetail])

    return (
        <div id={props.id} className={`my-1 ${style.timer}`}>
            <div className={messageBgColor}>{TimerDetail.message}</div>

            <input style={{ width: '3em' }} type='number' placeholder='m' value={mins} onChange={(e) => {
                setMins(e.target.value)
                setunsavedChanges(true)
            }} />
            <span className='mx-1'>:</span>
            <input style={{ width: '3em' }} type='number' placeholder='s' value={secs} onChange={(e) => {
                setSecs(e.target.value)
                setunsavedChanges(true)
            }} />
        </div>
    )
}

export default Timer
