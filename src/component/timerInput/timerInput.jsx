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
        if (originalTimer.active) {
            countdownTimer.startTimer(originalTimer, onTimerFinished)
        }

    }, [originalTimer])

    const onTimerFinished = () => {
        var sound = new Howl({
            src: [alarmSound]
        });
        console.log('timer ended')

        let findTimer = countdownTimer.findTimer(originalTimer.id)
        countdownTimer.updateTimer(findTimer.id, { active: false })

        let nextTimer = countdownTimer.getNextNode(countdownTimer.findTimer(originalTimer.id))
        if (nextTimer) {
            countdownTimer.updateTimer(nextTimer.id, { active: true })

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
                setNextTimer(<TimerInput id={nextTimer.id} />)
            } else {
                let nextTimer = countdownTimer.insertTimerToRight(props.id, { time: 5 })
                setNextTimer(<TimerInput id={nextTimer.id} />)
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
            setChildTimer(<TimerInput id={childTimer.id} />)
        } else {
            let childTimer = countdownTimer.insertTimerBelow(props.id, { time: 5 })
            setChildTimer(<TimerInput id={childTimer.id} />)
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

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>All Timer finished</Modal.Body>
        
        </Modal>
        <div className={classNames({ 'alert-primary': originalTimer.active })}>
            {originalTimer.message}
            <div>
                <input ref={target}
                    onClick={() => {
                        setShowNextTimer(!showNextTimer)
                        setShowChildTimer(!showChildTimer)
                    }}
                    type='number' value={time} onChange={handleChange} />
                {nextTimer !== undefined ? null : <Overlay target={target.current} show={showNextTimer} placement="right">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            <Button size="sm" onClick={() => addNextTimer()}>
                                +
                        </Button>
                        </Tooltip>
                    )}
                </Overlay>}
                {childTimer !== undefined ? null : <Overlay target={target.current} show={showChildTimer} placement="bottom">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            <Button size="sm" onClick={() => addChildTimer()}>
                                +
                        </Button>
                        </Tooltip>
                    )}
                </Overlay>}


            </div>

            {childTimer ? <Overlay target={target.current} show={showChildTimer} placement="bottom">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        {childTimer}
                    </Tooltip>
                )}
            </Overlay> : null}

        </div>

        {/* <UserInput ref={target} onClick={() => setShow(!show)} /> */}

        {nextTimer ? <Overlay target={target.current} show={showNextTimer} placement="right">
            {(props) => (
                <Tooltip id="overlay-example" {...props}>
                    {nextTimer}
                </Tooltip>
            )}
        </Overlay> : null}
    </>;
}


export default TimerInput;
