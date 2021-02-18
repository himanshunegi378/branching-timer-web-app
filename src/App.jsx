import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import 'react-tabs/style/react-tabs.css'
import { v1 as uuidv1 } from 'uuid';
import TimerCard from './component/timerCard/TimerCard'


function App(props) {
    const [timerCardsList, setTimerCardsList] = useState([])
    useEffect(()  => {
        const savedTimerCardList = localStorage.getItem('timerCardList')
        if (savedTimerCardList) {
            setTimerCardsList(JSON.parse(savedTimerCardList))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('timerCardList', JSON.stringify(timerCardsList))

    }, [timerCardsList])

    useEffect(() => {
        document.body.classList.remove('page-loading')
        document.body.classList.add('page-loaded')
    }, [])




    return (
        <>
            <Button onClick={() => {
                setTimerCardsList(prevTimerCardList => [...prevTimerCardList, uuidv1()])
            }}>Add Timer Card</Button>
            <div className='overflow-auto'>
                <div className='d-flex flex-row ' style={{ alignItems: 'flex-start' }}>
                    {timerCardsList.map(timerCardId => <TimerCard key={timerCardId} timerCardId={timerCardId} onDelete={(id) => {
                        setTimerCardsList(timerCardsList => timerCardsList.filter(timerId => timerId !== id))
                    }} />)}

                </div>
            </div>
        </>
    )
}

export default App
