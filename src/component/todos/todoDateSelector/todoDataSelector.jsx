import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'react-bootstrap'

function TodoDateSelector (props) {
  const { onDateChange = () => {}, className = '' } = props

  const todayDate = useRef(new Date())
  const [currentSelectedDate, setCurrentSelectedDate] = useState(todayDate.current)

  useEffect(() => {
    onDateChange(currentSelectedDate)
  }, [currentSelectedDate, onDateChange])

  const nextDate = (currentDate) => {
    const tomorrow = new Date(currentDate)

    tomorrow.setDate(tomorrow.getDate() + 1)
    setCurrentSelectedDate(tomorrow)
  }
  const previousDate = (currentDate) => {
    const yesterday = new Date(currentDate)

    yesterday.setDate(yesterday.getDate() - 1)
    setCurrentSelectedDate(yesterday)
  }

  return (
    <div className={className}>
      <div className='row'>
        <div className='col-4 text-center'>
          <Button onClick={() => { previousDate(currentSelectedDate) }}>{'<'}</Button>
        </div>
        <div className='col-4 text-center'>{currentSelectedDate.toDateString()}</div>
        <div className='col-4 text-center'>
          <Button onClick={() => { nextDate(currentSelectedDate) }}>{'>'}</Button>

        </div>

      </div>
    </div>
  )
}

export default TodoDateSelector
