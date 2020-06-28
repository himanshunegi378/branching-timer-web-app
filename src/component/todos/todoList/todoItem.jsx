import React, { } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoCompleted } from '../../../slices/todoSlice'
function TodoItem (props) {
  const { todoId } = props
  const todo = useSelector(state => state.todo.todoItem[todoId])
  const dispatch = useDispatch()

  const handleToggle = () => {
    if (todo.done) return // to prevent dispatch if todo is already completed saving cache write
    dispatch(todoCompleted({ todoId: todoId }))
  }

  return (

    <div className='row border align-items-center'>
      <input type='checkbox' className='col-2' onChange={handleToggle} checked={todo.done} />
      <div className='col-10'>{todo.task}</div>
    </div>
  )
}

export default TodoItem
