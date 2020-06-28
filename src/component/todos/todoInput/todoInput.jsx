import React, { useRef } from 'react'

function TodoInput (props) {
  const { onTodoAdded = () => { }, className = '' } = props
  const todoInput = useRef('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const task = todoInput.current.value
    if (task) {
      onTodoAdded({ task: task })
    } else {
      console.warn('No task defined')
    }
  }
  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <input ref={todoInput} type='text'/>
        <input type='submit' value='-->'/>
      </form>
    </div>
  )
}

const isEnterKeyPressed = (event) => {
  return event.keyCode === 13
}

export default TodoInput
export { TodoInput }
