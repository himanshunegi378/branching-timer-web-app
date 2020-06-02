import React, { useState, useRef, useEffect } from "react";
// import UserInput from "./userInput";
import { Overlay, Tooltip, Button } from "react-bootstrap";
import countdownTimer from "../../core/dataStructure/new_timerTree";

function TimerInput(props) {
    const [nextTimer, setNextTimer] = useState()
    const [orignalTimer, setOriginalTimer] = useState({})
    const [copyTimer, setCopyTimer] = useState({})
    const [childTimer, setChildTimer] = useState()

    const [showNextTimer, setShowNextTimer] = useState(false);
    const [showChildTimer, setShowChildTimer] = useState(false);
    const target = useRef(null);

    useEffect(() => {

        console.log('id')
        let findTimer = countdownTimer.findTimer(props.id)
        if (findTimer) {
            let nextTimer = findTimer.next
            if (nextTimer) {
                setNextTimer(<TimerInput id={nextTimer.id} />)

            }
            setOriginalTimer(Object.assign({}, findTimer))
        }
    }, [props.id])

    useEffect(() => {
        console.log('original')

        setCopyTimer(Object.assign({}, orignalTimer)
        )
    }, [orignalTimer])

    const addNextTimer = () => {
        saveTimer()
        if (!nextTimer) {
            let newTimer = countdownTimer.insertTimerToRight(props.id)
            setNextTimer(<TimerInput id={newTimer.id} />)
        }
    }

    const saveTimer = () => {
        let findTimer = countdownTimer.findTimer(props.id)
        if (findTimer) {
            findTimer.time = copyTimer.time
        }
    }


    const addChildTimer = () => {
        saveTimer()
        let childTimer = orignalTimer.child
        if (childTimer) {
            setChildTimer(<TimerInput id={childTimer.id} />)
        } else {
            let childTimer = countdownTimer.insertTimerBelow(props.id)
            setChildTimer(<TimerInput id={childTimer.id} />)
        }
    }

    const handleChange = (event) => {
        Object.assign(copyTimer, { time: event.target.value })
        setCopyTimer({ time: event.target.value, ...copyTimer })

    }


    return <>
        {console.log('render')}
        <div className=''>
            <div>
                <input ref={target}
                    onClick={() => {
                        setShowNextTimer(!showNextTimer)
                        setShowChildTimer(!showChildTimer)
                    }}
                    type='number' value={copyTimer.time} onChange={handleChange} />
                {nextTimer !== undefined ? null : <Overlay target={target.current} show={showNextTimer} placement="right">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            <Button onClick={() => addNextTimer()}>
                                +
                        </Button>
                        </Tooltip>
                    )}
                </Overlay>}
                {childTimer !== undefined ? null : <Overlay target={target.current} show={showChildTimer} placement="bottom">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            <Button onClick={() => addChildTimer()}>
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
