import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TimerCollectionCardGrid from './component/timerCollectionCardGrid/timerCollectionCardGrid'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { createTimerCard } from './slices/timerSlice'
import TodoLayout from './component/todos/todoLayout/todoLayout'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import useTimerCard from './hooks/useTimerCards'


function App(props) {
    const dispatch = useDispatch()
    const timerCards = useSelector(state => state.timer.timerCards)// will be passed to timer collection card grid
    const [tabIndex, setTabIndex] = useState(0)
    const card = useRef(null)
    useEffect(() => {
        document.body.classList.remove('page-loading')
        document.body.classList.add('page-loaded')
    }, [])
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (!card.current) return
            card.current.style.height = `${window.innerHeight - card.current.offsetTop}px`
        })
    }, [])

    useEffect(() => {

        if (tabIndex === 0) {
            card.current.style.height = `${window.innerHeight - card.current.offsetTop}px`
        }

    }, [tabIndex])
    const cardId = useRef(null)
    const { createCard, addTimerToCard, deleteTimerFromCard, getCard, deleteCard, updateTimer, getTimer } = useTimerCard()
    return (
        <>
            <button onClick={() => {
                const card = createCard('himanshu')
                console.log(card)
                cardId.current = card.id
            }}>Add card</button>

            <button onClick={() => {
                addTimerToCard(cardId.current, 'timer', 60)
            }}>AddTimer to card</button>

            <button onClick={() => console.log(getCard(cardId.current))}>Get Timers List</button>
            <Tabs selectedIndex={tabIndex} onSelect={(index, previousIndex, event) => setTabIndex(index)}>
                <TabList>
                    <Tab>Timer</Tab>
                    <Tab>Todo</Tab>
                </TabList>
                <TabPanel>
                    <Button onClick={() => {
                        dispatch(createTimerCard())
                    }}>Add Timer Card</Button>
                    <div ref={card} className='overflow-auto'>
                        <TimerCollectionCardGrid timerCollectionCards={timerCards} />
                    </div>
                </TabPanel>
                <TabPanel>
                    <TodoLayout />
                </TabPanel>
            </Tabs>
        </>
    )
}

export default App
