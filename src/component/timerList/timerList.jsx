import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Timer from '../timer/timer'

function TimerList(props) {
    const timerList = useSelector((state) => state.timer.timerCards[props.id].timerList)
    const timerList_html = timerList.map((timerId, index) => {
        return <Timer key={timerId} id={timerId} />
    })
    return (
        <div>
            {timerList_html}
        </div>
    )
}

export default TimerList
