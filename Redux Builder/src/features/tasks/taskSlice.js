import { createAction, createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [
    { id: nanoid(), title: 'Read Redux Toolkit docs', completed: false },
    { id: nanoid(), title: 'Build task feature with builder pattern', completed: true },
  ],
  filter: 'all',
}

export const addTask = createAction('tasks/addTask', (title) => ({
  payload: {
    id: nanoid(),
    title: title.trim(),
    completed: false,
  },
}))

export const deleteTask = createAction('tasks/deleteTask')
export const toggleTask = createAction('tasks/toggleTask')
export const clearCompleted = createAction('tasks/clearCompleted')
export const setFilter = createAction('tasks/setFilter')

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask, (state, action) => {
        if (!action.payload.title) return
        state.items.unshift(action.payload)
      })
      .addCase(deleteTask, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload)
      })
      .addCase(toggleTask, (state, action) => {
        const task = state.items.find((item) => item.id === action.payload)
        if (task) {
          task.completed = !task.completed
        }
      })
      .addCase(clearCompleted, (state) => {
        state.items = state.items.filter((task) => !task.completed)
      })
      .addCase(setFilter, (state, action) => {
        state.filter = action.payload
      })
  },
})

export default taskSlice.reducer
