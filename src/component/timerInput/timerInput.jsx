import React, { useState, useRef, useEffect } from "react";
import { Howl, Howler } from 'howler';
// import UserInput from "./userInput";
import { Overlay, Tooltip, Button } from "react-bootstrap";
import countdownTimer from "../../core/dataStructure/new_timerTree";
import alarmSound from './alarm.mp3'
import { Modal } from "react-bootstrap";
var classNames = require('classnames');

function TimerInput(props) {
    const [nextTimer, setNextTimer] = useState()
    const [originalTimer, setOriginalTimer] = useState({})
    const [childTimer, setChildTimer] = useState()
    const [minsLeft, setMinsLeft] = useState('00')
    const [secsLeft, setSecsLeft] = useState('00')
    const [time, setTime] = useState(0)
    const [showNextTimer, setShowNextTimer] = useState(true);
    const [showChildTimer, setShowChildTimer] = useState(true);
    const target = useRef(null);

    //modal related hooks
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {

        let findTimer = countdownTimer.findTimer(props.id)
        if (findTimer) {
            let nextTimer = findTimer.next
            if (nextTimer) {
                setNextTimer(<TimerInput id={nextTimer.id} />)

            }
            countdownTimer.updateTimer(findTimer.id, { cb: originalTimervalueChange })
            setOriginalTimer(Object.assign({}, findTimer))
        }
        else {
            console.log('nothing found')
        }
    }, [props.id])

    const originalTimervalueChange = (updatedTimer) => {
        console.log(updatedTimer)
        setOriginalTimer({ ...updatedTimer })
    }


    useEffect(() => {
        setTime(originalTimer.time)

        console.log(originalTimer)
        if (originalTimer.state === 'active') {
            countdownTimer.startTimer(originalTimer, onTimerFinished, onTick)
        }

    }, [originalTimer])

    const onTick = ({ days, hours, minutes, seconds }) => {
        setMinsLeft(minutes)
        setSecsLeft(seconds)
    }

    const onTimerFinished = () => {
        var sound = new Howl({
            src: [alarmSound]
        });
        console.log('timer ended')

        let findTimer = countdownTimer.findTimer(originalTimer.id)
        countdownTimer.updateTimer(findTimer.id, { state: 'completed' })

        let nextTimer = countdownTimer.getNextNode(countdownTimer.findTimer(originalTimer.id))
        if (nextTimer) {
            countdownTimer.updateTimer(nextTimer.id, { state: 'active' })

        } else {
            setShow(true)
        }
        let id = sound.play();
        setTimeout(() => {
            sound.stop(id)
        }, 3000);
    }


    const addNextTimer = () => {
        saveTimer()
        // if (!nextTimer) {
        //     let newTimer = countdownTimer.insertTimerToRight(props.id)
        //     setNextTimer(<TimerInput id={newTimer.id} />)
        // }
        if (nextTimer) {

        }
        else {
            let findTimer = countdownTimer.findTimer(props.id)
            let nextTimer = findTimer.next
            if (nextTimer) {
                setNextTimer(<TimerInput id={nextTimer.id} row={props.row} col={props.col + 1} />)
            } else {
                let nextTimer = countdownTimer.insertTimerToRight(props.id, { time: 5 })
                setNextTimer(<TimerInput id={nextTimer.id} row={props.row} col={props.col + 1} />)
            }


        }



    }

    const saveTimer = () => {
        countdownTimer.updateTimer(props.id, { time: parseInt(time) })
    }


    const addChildTimer = () => {
        saveTimer()

        let findTimer = countdownTimer.findTimer(props.id)

        let childTimer = findTimer.child
        if (childTimer) {
            setChildTimer(<TimerInput id={childTimer.id} row={props.row + 1} col={props.col} />)
        } else {
            let childTimer = countdownTimer.insertTimerBelow(props.id, { time: 5 })
            setChildTimer(<TimerInput id={childTimer.id} row={props.row + 1} col={props.col} />)
        }
        // console.log(countdownTimer.findTimer('himanshu'))

    }

    const handleChange = (event) => {
        console.log(event.target.value)
        console.log(originalTimer)
        // setOriginalTimer({ time: parseInt(event.target.value), ...originalTimer })
        setTime(event.target.value)
        console.log(originalTimer)

    }

    return < >
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>All Timer finished</Modal.Body>

        </Modal>
        <div ref={target} className='m-2' style={{ gridRow: `${props.row}`, gridColumn: `${props.col}` }}>
            <div >
                <div className={classNames({ 'text-center': true, 'alert-danger': originalTimer.state === 'active', 'alert-secondary': originalTimer.state === 'completed', 'alert-info': originalTimer.state === 'dormant' })}>{originalTimer.message}</div>
                <div>
                    <div className='input-group '>
                        <input className='form-control'
                            onClick={() => {
                                setShowNextTimer(!showNextTimer)
                                setShowChildTimer(!showChildTimer)
                            }}
                            style={{ width: '4em' }} type='number' value={time} onChange={handleChange} />
                        <div className='input-group-append'><span className="input-group-text" id="basic-addon2">{minsLeft}:{secsLeft}</span></div>
                    </div>
                </div>
            </div>



        </div>
        {childTimer ? childTimer : <Button style={{width: '25%', marginLeft: 'auto', marginRight: 'auto', gridRow: `${props.row + 1}`, gridColumn: `${props.col}` }} size="sm" onClick={() => addChildTimer()}>
            +
            </Button>}
        {nextTimer ? nextTimer : <Button style={{ width: '25%', height: '50%', marginTop: 'auto', marginBottom: 'auto', gridRow: `${props.row}`, gridColumn: `${props.col + 1}` }} size="sm" onClick={() => addNextTimer()}>
            +
        </Button>}
    </>;
}


export default TimerInput;
