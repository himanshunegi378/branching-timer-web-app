import React, { useState, useRef, useEffect } from "react";
// import UserInput from "./userInput";
import { Overlay, Tooltip, Button } from "react-bootstrap";
import countdownTimer from "../../core/dataStructure/new_timerTree";

function TimerInput(props) {
    const [nextTimer, setNextTimer] = useState()
    const [orignalTimer, setOriginalTimer] = useState({})
    const [copyTimer, setCopyTimer] = useState({})
    const [childTimer, setChildTimer] = useState()

    const [showNextTimer, setShowNextTimer] = useState(true);
    const [showChildTimer, setShowChildTimer] = useState(true);
    const target = useRef(null);

    useEffect(() => {

        let findTimer = countdownTimer.findTimer(props.id)
        if (findTimer) {
            // let nextTimer = findTimer.next
            // if (nextTimer) {
            //     setNextTimer(<TimerInput id={nextTimer.id} />)

            // }
            setOriginalTimer(Object.assign({}, findTimer))
        }
        else {
            console.log('nothing found')
        }
    }, [props.id])

    useEffect(() => {

        setCopyTimer(Object.assign({}, orignalTimer)
        )
    }, [orignalTimer])

    const addNextTimer = () => {
        // saveTimer()
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
                console.log('if',nextTimer)
                setNextTimer(<TimerInput id={nextTimer.id} />)
            } else {
                let nextTimer = countdownTimer.insertTimerToRight(props.id)
                console.log('else',nextTimer)
                setNextTimer(<TimerInput id={nextTimer.id} />)
            }


        }



    }

    const saveTimer = () => {
        let findTimer = countdownTimer.findTimer(props.id)
        if (findTimer) {
            findTimer.time = copyTimer.time
        }
    }


    const addChildTimer = () => {
        // saveTimer()

        let findTimer = countdownTimer.findTimer(props.id)

        let childTimer = findTimer.child
        if (childTimer) {
            setChildTimer(<TimerInput id={childTimer.id} />)
        } else {
            let childTimer = countdownTimer.insertTimerBelow(props.id)
            setChildTimer(<TimerInput id={childTimer.id} />)
        }
        // console.log(countdownTimer.findTimer('himanshu'))

    }

    const handleChange = (event) => {
        Object.assign(copyTimer, { time: event.target.value })
        setCopyTimer({ time: event.target.value, ...copyTimer })

    }


    return <>
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
