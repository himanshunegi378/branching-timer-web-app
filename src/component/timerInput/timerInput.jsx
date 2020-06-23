import React, { useState, useRef, useEffect } from 'react'
import { Howl, Howler } from 'howler'
// import UserInput from "./userInput";
import { Overlay, Tooltip, Button } from 'react-bootstrap'
import countdownTimer from '../../core/dataStructure/new_timerTree'
import alarmSound from './alarm.mp3'
import { Modal } from 'react-bootstrap'
var classNames = require('classnames')

function TimerInput (props) {
  const [nextTimer, setNextTimer] = useState()
  const [originalTimer, setOriginalTimer] = useState({})
  const [childTimer, setChildTimer] = useState()
  const [minsLeft, setMinsLeft] = useState('00')
  const [secsLeft, setSecsLeft] = useState('00')
  const [time, setTime] = useState(0)
  const [showNextTimer, setShowNextTimer] = useState(true)
  const [showChildTimer, setShowChildTimer] = useState(true)
  const target = useRef(null)

  // modal related hooks
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    const findTimer = countdownTimer.findTimer(props.id)
    if (findTimer) {
      if (findTimer.parent) {
        const parentid = findTimer.parent.id
        const from = document.getElementById(parentid).getBoundingClientRect()
        const to = document.getElementById(props.id).getBoundingClientRect()
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')

        line.setAttribute('stroke-width', '1px')
        line.setAttribute('stroke', '#000000')
        const x1 = (from.width / 2) + from.x
        const y1 = (from.height) + from.y
        const x2 = (to.width / 2) + to.x
        const y2 = to.y
        line.setAttribute('stroke-width', '1px')
        line.setAttribute('stroke', '#000000')
        line.setAttribute('x1', `${x1}`)
        line.setAttribute('y1', `${y1}`)
        line.setAttribute('x2', `${x2}`)
        line.setAttribute('y2', `${y2}`)
        document.getElementById('mySVG').appendChild(line)
      } else {
        if (findTimer.previous) {
          const previousid = findTimer.previous.id
          const from = document.getElementById(previousid).getBoundingClientRect()
          const to = document.getElementById(props.id).getBoundingClientRect()
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          const x1 = from.width + from.x
          const y1 = (from.height / 2) + from.y
          const x2 = to.x
          const y2 = y1
          line.setAttribute('stroke-width', '1px')
          line.setAttribute('stroke', '#000000')
          line.setAttribute('x1', `${x1}`)
          line.setAttribute('y1', `${y1}`)
          line.setAttribute('x2', `${x2}`)
          line.setAttribute('y2', `${y2}`)
          document.getElementById('mySVG').appendChild(line)
        }
      }
      const nextTimer = findTimer.next
      if (nextTimer) {
        setNextTimer(<TimerInput id={nextTimer.id} />)
      }
      countdownTimer.updateTimer(findTimer.id, { cb: originalTimervalueChange })
      setOriginalTimer(Object.assign({}, findTimer))
    } else {
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
    })
    console.log('timer ended')

    const findTimer = countdownTimer.findTimer(originalTimer.id)
    countdownTimer.updateTimer(findTimer.id, { state: 'completed' })

    const nextTimer = countdownTimer.getNextNode(countdownTimer.findTimer(originalTimer.id))
    if (nextTimer) {
      countdownTimer.updateTimer(nextTimer.id, { state: 'active' })
    } else {
      setShow(true)
    }
    const id = sound.play()
    setTimeout(() => {
      sound.stop(id)
    }, 3000)
  }

  const addNextTimer = () => {
    saveTimer()
    // if (!nextTimer) {
    //     let newTimer = countdownTimer.insertTimerToRight(props.id)
    //     setNextTimer(<TimerInput id={newTimer.id} />)
    // }
    if (nextTimer) {

    } else {
      const findTimer = countdownTimer.findTimer(props.id)
      const nextTimer = findTimer.next
      if (nextTimer) {
        setNextTimer(<TimerInput id={nextTimer.id} row={props.row} col={props.col + 1} />)
      } else {
        const nextTimer = countdownTimer.insertTimerToRight(props.id, { time: 5 })
        setNextTimer(<TimerInput id={nextTimer.id} row={props.row} col={props.col + 1} />)
      }
    }
  }

  const saveTimer = () => {
    countdownTimer.updateTimer(props.id, { time: parseInt(time) })
  }

  const addChildTimer = () => {
    saveTimer()

    const findTimer = countdownTimer.findTimer(props.id)

    const childTimer = findTimer.child
    if (childTimer) {
      setChildTimer(<TimerInput id={childTimer.id} row={props.row + 1} col={props.col} />)
    } else {
      const childTimer = countdownTimer.insertTimerBelow(props.id, { time: 5 })
      setChildTimer(<TimerInput id={childTimer.id} row={props.row + 1} col={props.col} />)
    }
    // console.log(countdownTimer.findTimer('himanshu'))
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    // setOriginalTimer({ time: parseInt(event.target.value), ...originalTimer })
    setTime(event.target.value)
  }

  return < >
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>All Timer finished</Modal.Body>

    </Modal>
    <div ref={target} className='m-2' style={{ gridRow: `${props.row}`, gridColumn: `${props.col}` }}>
      <div style={{ width: '100%' }} >
        <div className={classNames({ 'text-center': true, 'alert-danger': originalTimer.state === 'active', 'alert-secondary': originalTimer.state === 'completed', 'alert-info': originalTimer.state === 'dormant' })}>{originalTimer.message}</div>
        <div id={props.id}>
          <div className='input-group '>
            <input className='form-control'
              onClick={() => {
                setShowNextTimer(!showNextTimer)
                setShowChildTimer(!showChildTimer)
              }}
              style={{ }} type='time' value={time} onChange={handleChange} />
            <div className='input-group-append'><span className="input-group-text" id="basic-addon2">{minsLeft}:{secsLeft}</span></div>
          </div>
        </div>
      </div>

    </div>
    {childTimer || <Button style={{ width: '2em', height: '2em', marginLeft: 'auto', marginRight: 'auto', gridRow: `${props.row + 1}`, gridColumn: `${props.col}` }} size="sm" onClick={() => addChildTimer()}>
            +
    </Button>}
    {nextTimer || <Button style={{ width: '2em', height: '2em', marginTop: 'auto', marginBottom: 'auto', gridRow: `${props.row}`, gridColumn: `${props.col + 1}` }} size="sm" onClick={() => addNextTimer()}>
            +
    </Button>}
  </>
}

export default TimerInput
