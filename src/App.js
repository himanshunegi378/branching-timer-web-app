import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TimerCollectionCardGrid from './component/timerCollectionCardGrid/timerCollectionCardGrid'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { createTimerCard } from './slices/timerSlice'
import TodoLayout from './component/todos/todoLayout/todoLayout'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

function App (props) {
  const dispatch = useDispatch()
  const timerCards = useSelector(state => state.timer.timerCards)// will be passed to timer collection card grid

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Timer</Tab>
          <Tab>Todo</Tab>
        </TabList>
        <TabPanel>
          <Button onClick={() => { dispatch(createTimerCard()) }}>Add Timer Card</Button>
          <div className='overflow-auto' style={{ height: '80vh' }}>
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
