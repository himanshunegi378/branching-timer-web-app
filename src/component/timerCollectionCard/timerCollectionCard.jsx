import { useSelector, useStore, shallowEqual, useDispatch } from 'react-redux'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import TimerList from '../timerList/timerList'
import { Button, Card } from 'react-bootstrap'
import style from "./style.module.css";
import {
    createTimer,
    toggleCardLoop,
    stopTimer,
    togglePlayPause,
    timerFinished,
    deleteCard,
    TimerCard,
    editCardTitle,
    onCardUnmounting,
    onMounting,
    playCard,
    pauseCard
} from '../../slices/timerSlice'

import { PlayButton } from "./playButton";
import { LoopButton } from "./loopButton";
import StopButton from './stopButton'
import {
    doesCardIdExist,
    createCountDownTimerWithCardId,
    createCountDownTimerWithCardIdWithoutCallBack,
    backgroundCountDownManager
} from '../countDownTimer/newCountDownClock'
import showNotification from '../../utils/notification'
// import Notification from "react-web-notification";
import { useTransition, animated } from 'react-spring'
import { Transition } from 'react-spring/renderprops';


export default function TimerCollectionCard(props) {
    const timerCollectionDetail = useSelector(state => {
        if (state.timer.timerCards[props.id]) {
            return state.timer.timerCards[props.id]
        }
        return { ...TimerCard, title: undefined }
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


    const onCountDownTick = (secs) => {

        const minutes = parseInt(secs / 60)
        const seconds = parseInt(secs % 60)
        setRemainingMin(('0' + minutes).slice(-2))
        setRemainingSec(('0' + seconds).slice(-2))
    }
    const memoTick = useCallback(
        (tick) => {
            onCountDownTick(tick)
        },
        [],
    )

    useEffect(() => {
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault()
            dispatch(pauseCard({ cardId: props.id, mins: remainingMin, secs: remainingSec }))
        });

    }, [dispatch, props.id, remainingMin, remainingSec])

    useEffect(() => {
        if (activeTimerId.id === '') return
        // Let's check if the browser supports notifications


    }, [activeTimerId.id, store, timerCollectionDetail.title])

    useEffect(() => {
        switch (timerCollectionDetail.status) {
            case 'stopped': {
                backgroundCountDownManager.stopCard(props.id)
                setRemainingMin('00')
                setRemainingSec('00')
                break;
            }
            case 'paused': {
                backgroundCountDownManager.pauseCard(props.id)
                break;
            }
            case 'playing': {
                backgroundCountDownManager.playCard(props.id, memoTick)
                return () => {
                    backgroundCountDownManager.playCard(props.id)
                }
            }


            default:
                break;
        }


    }, [dispatch, memoTick, props.id, timerCollectionDetail.activeTimer.mins, timerCollectionDetail.activeTimer.secs, timerCollectionDetail.status])
    const transitions = useTransition(true, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 1 },
        config: { duration: 300, }
    })
    console.log(transitions[0].props)
    const myComponent = <div >

        {/*<Notification key={activeTimerId.id} title={activeTimerId.id}/>*/}
        <Card className={'m-1 shadow-lg '} style={{
            width: '25%',
            minWidth: '265px',
            maxWidth: '265px',
        }}>
            <div className='d-flex flex-row-reverse'>
                <Button size='sm' className='btn btn-danger' onClick={() => {
                    dispatch(deleteCard({ id: props.id }))
                }}>X</Button>
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
                            {editTitle ? <input autoFocus type='text' value={cardTitle}
                                onChange={(e) => setCardTitle(e.target.value)} /> : timerCollectionDetail.title}
                        </Card.Title>
                    </div>
                    <div className='col-2 px-0 user-select-none'>
                        <LoopButton looping={timerCollectionDetail.loop}
                            onChange={() => dispatch(toggleCardLoop({ id: props.id }))} />
                    </div>
                </div>
                <div className='d-flex  user-select-none'>
                    <div className=' mx-2 h-auto my-1' style={{ width: '2rem' }}>
                        <PlayButton isPlaying={timerCollectionDetail.status === 'playing'} onChange={(state) => {
                            const action = state ? playCard({ cardId: props.id }) : pauseCard({
                                cardId: props.id,
                                mins: remainingMin,
                                secs: remainingSec
                            })
                            dispatch(action)
                        }} />
                    </div>
                    <StopButton isStopped={timerCollectionDetail.status === 'stopped'} onChange={(isStopped) => {
                        if (isStopped) dispatch(stopTimer({ cardId: props.id }))
                    }} />
                </div>
                {alarmComponent}
                <TimerList id={props.id} activeTimerId={activeTimer.id} />
                <div className='row'>
                    <div className='col-3'></div>
                    <Button className='col-6' size='sm' onClick={() => {
                        dispatch(createTimer({ id: props.id }))
                    }}>Add Timer</Button>
                    <div className='col-3'></div>
                </div>
            </Card.Body>

        </Card>

    </div>

    return transitions.map(({ item, key, props }) =>
        item && <animated.div key={key} style={props}>{myComponent}</animated.div>
    )
}
