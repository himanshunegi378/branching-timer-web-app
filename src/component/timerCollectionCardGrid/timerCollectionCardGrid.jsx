import React, { useEffect, useState } from 'react'
import TimerCollectionCard from '../timerCollectionCard/timerCollectionCard'
import { Link, Route, Switch } from "react-router-dom";
import TodoLayout from '../todos/todoLayout/todoLayout'

function TimerCollectionCardGrid(props) {
  const [timerCollectionCard_html, setTimerCollectionCard_html] = useState(() => [])

  useEffect(() => {
    const htmls = []
    for (const key in props.timerCollectionCards) {
      if (props.timerCollectionCards.hasOwnProperty(key)) {
        const html = <TimerCollectionCard key={key} id={key} />
        htmls.push(html)
      }
    }
    setTimerCollectionCard_html(htmls)
  }, [props.timerCollectionCards])

  return (

    <div className='d-flex flex-row ' style={{ alignItems: 'flex-start' }}>

      {timerCollectionCard_html}
    </div>

  )
}

export default TimerCollectionCardGrid
