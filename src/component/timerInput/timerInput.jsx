import React, { useState, useRef, useEffect } from "react";
// import UserInput from "./userInput";
import { Overlay, Tooltip, Button } from "react-bootstrap";
import countdownTimer from "../../core/dataStructure/new_timerTree";

function TimerInput(props) {
    const [nextTimer, setNextTimer] = useState('')
    const [orignalTimer, setOriginalTimer] = useState({})
    const [copyTimer, setCopyTimer] = useState({})

    const [show, setShow] = useState(false);
    const target = useRef(null);

    useEffect(() => {
        let findTimer = countdownTimer.findTimer(props.id)
        if (findTimer) {
            setOriginalTimer(Object.assign({}, findTimer))
        }
    }, [props.id])

    useEffect(() => {
        setCopyTimer(Object.assign({}, orignalTimer)
        )
    }, [orignalTimer])


    const addTimerInput = () => {
        if (orignalTimer !== copyTimer) {
            countdownTimer.updateTimer(props.id, Object.assign({}, copyTimer))
        }
        let newTimer = countdownTimer.insertTimerToRight(props.id)
        setNextTimer(<TimerInput id={newTimer.id} />)
    }

    const handleChange = (event) => {
        Object.assign(copyTimer, { time: event.target.value })
        setCopyTimer({ time: event.target.value, ...copyTimer })

    }


    return <div>
        <input ref={target} onBlur={() => setShow(false)} onClick={() => setShow(!show)} type='number' value={copyTimer.time} onChange={handleChange} />
        {/* <UserInput ref={target} onClick={() => setShow(!show)} /> */}
        <Overlay target={target.current} show={show} placement="right">
            {(props) => (
                <Tooltip id="overlay-example" {...props}>
                    <Button onClick={() => addTimerInput()}>
                        +
      </Button>
                </Tooltip>
            )}
        </Overlay>
        {nextTimer}
    </div>;
}


export default TimerInput;
