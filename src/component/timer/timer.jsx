import React, { useState, useEffect } from 'react'
import style from './style.module.css'
import { updateTimer, deleteTimer, Timer as timerObj, editTimerTitle } from "../../slices/timerSlice";
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap';

function Timer(props) {
    let TimerDetail = useSelector(state => {
        if (state.timer.timers[props.id]) {
            return state.timer.timers[props.id]
        }
        else {
            return timerObj
        }
    })
    const dispatch = useDispatch()
    const [mins, setMins] = useState(TimerDetail.mins)
    const [secs, setSecs] = useState(TimerDetail.secs)
    const [timerTitle, setTimerTitle] = useState(() => TimerDetail.title)
    const [editTitle, setEditTitle] = useState(() => false)
    const [unsavedChanges, setunsavedChanges] = useState(false)
    const [titleBgColor, setTitleBgColor] = useState('alert-info')

    useEffect(() => {
        if (unsavedChanges) {
            dispatch(updateTimer({ id: TimerDetail.id, title: TimerDetail.title, mins: parseInt(mins), secs: parseInt(secs) }))
            setunsavedChanges(false)
        }

    }, [unsavedChanges])


    useEffect(() => {
        if (props.active) {
            setTitleBgColor('alert-danger')
        }
        else {
            setTitleBgColor('alert-info')
        }

    }, [props.active])

    return (
        <div id={props.id} className={`my-1 ${style.timer}`}>
            <ul className={titleBgColor}>
                <li></li>
                <li onClick={() => setEditTitle(true)} onBlur={() => {
                    setEditTitle(false)
                    dispatch(editTimerTitle({ timerId: props.id, newTitle: timerTitle }))
                }}>
                    {editTitle ? <input autoFocus type='text' value={timerTitle} onChange={(e) => setTimerTitle(e.target.value)} /> : TimerDetail.title}
                </li>
                <li >
                    <Button size='sm' className='btn-danger' onClick={() => {
                        dispatch(deleteTimer({ cardId: props.cardId, timerId: props.id }))
                    }}>x
                </Button>
                </li>
            </ul>
            {/* <div className={messageBgColor}>{TimerDetail.message}</div> */}
            <div className='text-center'>
                <input style={{ width: '3em' }} type='number' placeholder='m' value={mins} onBlur={(e) => {
                    if (e.target.value === '') {
                        setMins('0')
                        setunsavedChanges(true)

                    }
                }}
                    onChange={(e) => {
                        setMins(e.target.value)
                        setunsavedChanges(true)
                    }} />
                <span className='mx-1'>:</span>
                <input style={{ width: '3em' }} type='number' placeholder='s' value={secs} onBlur={(e) => {
                    if (e.target.value === '') {
                        setSecs('0')
                        setunsavedChanges(true)

                    }
                }}
                    onChange={(e) => {
                        setSecs(e.target.value)
                        setunsavedChanges(true)
                    }} />
            </div>
        </div>
    )
}

export default Timer
