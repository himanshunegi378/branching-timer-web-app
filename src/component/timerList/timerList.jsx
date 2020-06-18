import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Timer from '../timer/timer'

function TimerList(props) {
    const timerList = useSelector((state) => {
        if (state.timer.timerCards[props.id]) {
            return state.timer.timerCards[props.id].timerList
        }
        return []
    })
    const timerList_html = timerList.map((timerId, index) => {
        return <Timer key={timerId} id={timerId} active={props.activeTimerId === timerId ? true : false} />
    })
    return (
        <div>
            {timerList_html}
        </div>
    )
}

export default TimerList
