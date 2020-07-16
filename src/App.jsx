import React, {useState, useEffect, useRef} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TimerCollectionCardGrid from './component/timerCollectionCardGrid/timerCollectionCardGrid'
import {Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {createTimerCard} from './slices/timerSlice'
import TodoLayout from './component/todos/todoLayout/todoLayout'
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'


function App(props) {
    const dispatch = useDispatch()
    const timerCards = useSelector(state => state.timer.timerCards)// will be passed to timer collection card grid
    const [tabIndex, setTabIndex] = useState(0)
    const card = useRef(null)

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

    return (
        <>
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
                        <TimerCollectionCardGrid timerCollectionCards={timerCards}/>
                    </div>
                </TabPanel>
                <TabPanel>
                    <TodoLayout/>
                </TabPanel>
            </Tabs>
        </>
    )
}

export default App
