import React, { useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { createTodoAndToDate } from '../../../slices/todoSlice'
import TodoInput from '../todoInput/todoInput'
import TodoList from '../todoList/todoList'
import TodoDateSelector from '../todoDateSelector/todoDataSelector'

export default function TodoLayout (props) {
  console.log('im in todo')
  const dispatch = useDispatch()
  const [currentSelectedDateInString, setCurrentSelectedDateInString] = useState(convertDatetoString(new Date()))
  const store = useStore()

  const handleDateChange = (newDate) => {
    try {
      const newDateInString = convertDatetoString(newDate)
      setCurrentSelectedDateInString(newDateInString)
    } catch (error) {
      console.log(error)
    }
  }

  const memoizedHandleDateChange = React.useCallback(
    handleDateChange,
    [])

  const handleTodoAdded = (todo) => {
    const lastToDoOfTheDay = getLastTodoOfTheDateFromStore(currentSelectedDateInString, store)
    if (lastToDoOfTheDay) {
      if (lastToDoOfTheDay.done) {
        dispatch(createTodoAndToDate({ todo: todo, addToDate: currentSelectedDateInString, timeAddedAt: new Date().getTime() }))
      } else {
        console.log('bro complete this first')
      }
    } else {
      dispatch(createTodoAndToDate({ todo: todo, addToDate: currentSelectedDateInString, timeAddedAt: new Date().getTime() }))
    }
  }

  return (
    <div>
      <TodoDateSelector onDateChange={memoizedHandleDateChange} />
      <TodoInput onTodoAdded={handleTodoAdded} />
      <TodoList showOfDate={currentSelectedDateInString} />
    </div>
  )
}

const getLastTodoOfTheDateFromStore = (dateAsString, store) => {
  try {
    const storeInstance = store.getState()
    if (doesTodoExistInStoreForDate(dateAsString, store)) {
      const todoList = storeInstance.todo.todoItemListByDate[dateAsString].todoList
      const idOfLastTodoAdded = todoList[todoList.length - 1]
      const todo = storeInstance.todo.todoItem[idOfLastTodoAdded]
      return todo
    } else {
      return undefined
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

const doesTodoExistInStoreForDate = (dateAsString, store) => {
  if (store.getState().todo.todoItemListByDate[dateAsString]) {
    return true
  } else {
    return false
  }
}

const convertDatetoString = (date) => {
  if (typeof date.getMonth === 'function') {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dateinString = [day, month, year].join('_')
    return dateinString
  } else {
    throw new Error('date parameter is not an instance of Date object ')
  }
}
