import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import Timer from '../timer/Timer'


import { PlayButton } from "./playButton";
import { LoopButton } from "./loopButton";
import StopButton from './stopButton'

import useTimerCard from '../../hooks/useTimerCards';


export default function TimerCard(props) {
    const { onDelete, timerCardId } = props
    const { ...timerCard } = useTimerCard(props.timerCardId)
    const [editTitle, setEditTitle] = useState(() => false)


    return <div >

        <Card className={'m-1 shadow-lg '} style={{
            width: '25%',
            minWidth: '265px',
            maxWidth: '265px',
        }}>
            <div className='d-flex flex-row-reverse'>
                <Button size='sm' className='btn btn-danger' onClick={() => {
                    timerCard.deleteTimerGroup()
                    onDelete(timerCardId)
                }}>X</Button>
            </div>
            <Card.Body>
                <div className='h1 text-center'>
                    {parseInt(timerCard.runningTimer.remainingTime / 60)}:{timerCard.runningTimer.remainingTime % 60}
                </div>
                <div className='row'>

                    <div className='col-10 text-center'>
                        <Card.Title onClick={() => setEditTitle(true)} >
                            {editTitle ? <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    const title = event.currentTarget.title.value
                                    if (title) {
                                        timerCard.changeGroupName(title)
                                    }
                                    setEditTitle(false)
                                }}
                                onBlur={(event) => {
                                    event.preventDefault()
                                    const title = event.currentTarget.title.value
                                    if (title) {
                                        timerCard.changeGroupName(title)
                                    }
                                    setEditTitle(false)
                                }}>
                                <input autoFocus type='text' name='title'
                                />
                            </form> : timerCard.timerGroupStore.name}
                        </Card.Title>
                    </div>
                    <div className='col-2 px-0 user-select-none'>
                        <LoopButton looping={timerCard.timerCardData.looping}
                            onChange={() => timerCard.toggleLooping()} />
                    </div>
                </div>
                <div className='d-flex  user-select-none'>
                    <div className=' mx-2 h-auto my-1' style={{ width: '2rem' }}>
                        <PlayButton isPlaying={timerCard.timerCardData.status === 'playing'} onChange={(state) => {
                            const action = state ? timerCard.playCard : timerCard.pausecard
                            action()
                        }} />
                    </div>
                    <StopButton isStopped={timerCard.timerCardData.status === 'stopped'} onChange={(isStopped) => {
                        if (isStopped) timerCard.stopCard()
                    }} />
                </div>
                {timerCard.timerGroupStore.timers.map(timerId => {
                    const timer = timerCard.timerStore[timerId]
                    return <Timer key={timer.id} id={timer.id} active={timerCard.runningTimer?.currentTimerId === timer?.id}
                        onDelete={(timerId) => {
                            timerCard.deleteTimerFromGroup(timerId)
                        }}
                        onNameChange={newName => timerCard.updateTimer(timerId, { name: newName })}
                        onTimeChange={newTime => timerCard.updateTimer(timerId, { time: newTime })}
                        name={timer.name}
                        time={timer.time} />
                })}
                <div className='row'>
                    <div className='col-3'></div>
                    <Button className='col-6' size='sm' onClick={() => {
                        timerCard.addTimerInGroup('unaname', 300)
                    }}>Add Timer</Button>
                    <div className='col-3'></div>
                </div>
            </Card.Body>

        </Card>

    </div>

}
