import React, { useState, useEffect } from 'react'
import { useSelector, useStore, shallowEqual } from 'react-redux'
import TimerList from '../timerList/timerList'
import { Button, Card } from 'react-bootstrap'
import { createTimer, toggleCardLoop, stopTimer, togglePlayPause, timerFinished, deleteCard, TimerCard, Timer } from '../../slices/timerSlice'
import { useDispatch } from "react-redux";
import repeatIcon from './repeat.svg';
import CountDownClockManager from "../countDownTimer/countDownClockManager";
import AlarmSound from '../alarmSound/alarmSound'
const { v1: uuidv1 } = require('uuid');



function TimerCollectionCard(props) {
    const timerCollectionDetail = useSelector(state => {
        if (state.timer.timerCards[props.id]) {
            return state.timer.timerCards[props.id]
        }
        return TimerCard
    })
    const activeTimerId = useSelector(state => {
        if (timerCollectionDetail) {
            return timerCollectionDetail.activeTimer
        }
        else {
            return { id: '', index: -1 }
        }
    }, shallowEqual)
    const [alarmComponent, setAlarmComponent] = useState('')
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
            let timer = store.getState().timer.timers[activeTimerId.id]
            setActiveTimer(Object.assign({}, timer))
        }
        else{
            setActiveTimer('')
        }

    }, [activeTimerId])

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
        setRemainingMin(("0" + minutes).slice(-2))
        setRemainingSec(("0" + seconds).slice(-2))
    }

    return (
        <Card className='m-1' style={{ width: '25%', minWidth: '250px' }}>
            <div className='d-flex flex-row-reverse'>
                <div onClick={() => { dispatch(deleteCard({ id: props.id })) }} >Close</div>
            </div>
            <Card.Body>
                <div className='h1'>
                    {remainingMin}:{remainingSec}
                </div>
                <div className='row'>
                    <div className='col-10 align-content-center'>
                        <Card.Title>{timerCollectionDetail.message}</Card.Title>
                    </div>
                    <div className='col-2 px-0 user-select-none' onClick={(e) => {
                        dispatch(toggleCardLoop({ id: props.id }))
                    }}>
                        {timerCollectionDetail.loop ? <svg className='w-100 h-auto' id="Layer" enable-background="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m19 25h9c1.104 0 2-.896 2-2s-.896-2-2-2h-9c-6.065 0-11 4.935-11 11s4.935 11 11 11h4.172l-1.586 1.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l5-5c.781-.781.781-2.047 0-2.828l-5-5c-.781-.781-2.047-.781-2.828 0s-.781 2.047 0 2.828l1.586 1.586h-4.172c-3.859 0-7-3.141-7-7 0-3.86 3.141-7 7-7z" /><path d="m45 21h-4.172l1.586-1.586c.781-.781.781-2.047 0-2.828s-2.047-.781-2.828 0l-5 5c-.781.781-.781 2.047 0 2.828l5 5c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-1.586-1.586h4.172c3.859 0 7 3.14 7 7 0 3.859-3.141 7-7 7h-9c-1.104 0-2 .896-2 2s.896 2 2 2h9c6.065 0 11-4.935 11-11s-4.935-11-11-11z" /></svg> : <svg className='w-100 h-auto' style={{ fill: ' #dadada' }} id="Layer" enable-background="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m19 25h9c1.104 0 2-.896 2-2s-.896-2-2-2h-9c-6.065 0-11 4.935-11 11s4.935 11 11 11h4.172l-1.586 1.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l5-5c.781-.781.781-2.047 0-2.828l-5-5c-.781-.781-2.047-.781-2.828 0s-.781 2.047 0 2.828l1.586 1.586h-4.172c-3.859 0-7-3.141-7-7 0-3.86 3.141-7 7-7z" /><path d="m45 21h-4.172l1.586-1.586c.781-.781.781-2.047 0-2.828s-2.047-.781-2.828 0l-5 5c-.781.781-.781 2.047 0 2.828l5 5c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-1.586-1.586h4.172c3.859 0 7 3.14 7 7 0 3.859-3.141 7-7 7h-9c-1.104 0-2 .896-2 2s.896 2 2 2h9c6.065 0 11-4.935 11-11s-4.935-11-11-11z" /></svg>}
                    </div>
                </div>
                <div className='row'>
                    <Button className='w-100 col-12' style={{ height: '2rem' }} onClick={() => { dispatch(togglePlayPause({ cardId: props.id })) }}>{timerCollectionDetail.status === 'playing' ? `pause card` : `play card`}</Button>
                    {timerCollectionDetail.status === 'stopped' ? null : <Button className='w-100 col-12' style={{ height: '2rem' }} onClick={() => { dispatch(stopTimer({ cardId: props.id })) }}>Stop card</Button>}
                </div>
                <CountDownClockManager activeTimer={activeTimer} state={timerState} onFinish={onCountDownFinished} onTick={onCountDownTick} onStopped={() => { onCountDownStopped() }} />
                {alarmComponent}
                <TimerList id={props.id} activeTimerId={activeTimer.id} />
                <Button size='sm' onClick={() => { dispatch(createTimer({ id: props.id })) }}>Add Timer</Button>
            </Card.Body>


        </Card>
    )
}

export default TimerCollectionCard
