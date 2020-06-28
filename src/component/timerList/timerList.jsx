import React, { } from 'react'
import { useSelector } from 'react-redux'
import Timer from '../timer/timer'
import PropTypes from 'prop-types'

function TimerList (props) {
  const timerList = useSelector((state) => {
    if (state.timer.timerCards[props.id]) {
      return state.timer.timerCards[props.id].timerList
    }
    return []
  })
  const timerList_html = timerList.map((timerId, index) => {
    return <Timer key={timerId} id={timerId} cardId={props.id} active={props.activeTimerId === timerId} />
  })
  return (
    <div>
      {timerList_html}
    </div>
  )
}

TimerList.propTypes = {

}

export default TimerList
