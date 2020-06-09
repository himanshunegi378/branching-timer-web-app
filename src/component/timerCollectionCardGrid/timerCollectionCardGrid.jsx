import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import TimerCollectionCard from '../timerCollectionCard/timerCollectionCard'

function TimerCollectionCardGrid() {
    const timerCollectionCard = useSelector(state => state.timer.timerCards)
    
    let timerCollectionCard_html = []
    for (const key in timerCollectionCard) {
        if (timerCollectionCard.hasOwnProperty(key)) {
            let html = <TimerCollectionCard key={key} id={key} />
            timerCollectionCard_html.push(html)
        }
    }
  
    return (
        <div className='d-flex flex-row flex-shrink-0'>
            {timerCollectionCard_html}
        </div>
    )
}

export default TimerCollectionCardGrid
