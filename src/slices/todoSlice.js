import { createSlice } from '@reduxjs/toolkit'
const { v1: uuidv1 } = require('uuid')

const newTodo = (opts) => {
  return { id: opts.id || '', task: opts.task || '', done: false, addedOn: opts.addedOn }
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoItemListByDate: {},
    todoItem: {}
  },
  reducers: {
    createTodoAndToDate: (state, action) => {
      const { todo, addToDate: date, timeAddedAt } = action.payload
      const { task } = todo

      const todoId = uuidv1()
      const newTodoItem = newTodo({ id: todoId, task: task, addedOn: timeAddedAt })

      state.todoItem[todoId] = newTodoItem

      if (state.todoItemListByDate[date]) {
        state.todoItemListByDate[date].todoList.push(todoId)
      } else {
        state.todoItemListByDate[date] = { todoList: [todoId], lastTodoAddedOn: '' }
      }
      state.todoItemListByDate[date].lastTodoAddedOn = timeAddedAt
    },
    todoCompleted: (state, action) => {
      const { todoId } = action.payload
      state.todoItem[todoId].done = true
    }
  }
})

export const { createTodoAndToDate, todoCompleted } = todoSlice.actions
export default todoSlice.reducer
