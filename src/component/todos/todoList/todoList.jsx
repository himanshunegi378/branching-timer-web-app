import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './todoItem'
import store from '../../../store/store'

function TodoList (props) {
  const { showOfDate = convertDatetoString(new Date()) } = props
  const todoList = useSelector(state => {
    if (state.todo.todoItemListByDate[showOfDate]) {
      return state.todo.todoItemListByDate[showOfDate].todoList
    } else {
      return null
    }
  })
  const [todoListJsx, setTodoListJsx] = useState([])

  useEffect(() => {
    if (!todoList) {
      setTodoListJsx(<h1>Nothing Added</h1>)
      return
    }
    const todoListJsxTemp = todoList.map(todoId => {
      return <TodoItem key={todoId} todoId={todoId}/>
    })
    setTodoListJsx(todoListJsxTemp)
  }, [todoList])

  return (
    <div>
      {todoListJsx}
    </div>
  )
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

export default TodoList
