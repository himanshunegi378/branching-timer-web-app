import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TimerCollectionCard from '../timerCollectionCard/timerCollectionCard'

function TimerCollectionCardGrid(props) {
    const [timerCollectionCard_html, setTimerCollectionCard_html] = useState([])


    useEffect(() => {
        for (const key in props.timerCollectionCards) {
            if (props.timerCollectionCards.hasOwnProperty(key)) {
                let html = <TimerCollectionCard key={key} id={key} />
                setTimerCollectionCard_html(previousState => [...previousState, html])
            }
        }
    }, [props.timerCollectionCards])

    return (
        <div className='d-flex flex-row flex-shrink-0'>
            {timerCollectionCard_html}
        </div>
    )
}

export default TimerCollectionCardGrid
