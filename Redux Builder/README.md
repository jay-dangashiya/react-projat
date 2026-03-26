# Redux Builder App Flow in React.js

## 1. Project Title
Task Builder Application using React.js and Redux Toolkit

## 2. Project Description
The Redux Builder App is a React-based application that demonstrates global state management using Redux Toolkit. The application allows users to perform actions such as adding, viewing, toggling, and deleting tasks while maintaining a predictable and centralized state.

## 3. Objectives
- To understand Redux architecture and data flow
- To manage global state efficiently in React
- To implement Redux Toolkit using the builder pattern
- To separate UI logic from business logic

## 4. Technologies Used
- React.js
- Redux Toolkit
- React Redux
- JavaScript (ES6+)
- HTML & CSS

## 5. System Architecture
Core Components:
- UI Components – Handle user interaction
- Redux Store – Holds global application state
- Actions – Describe what happened
- Reducers – Update the state based on actions

## 6. Redux Builder App Flow
Flow Explanation:
1. User interacts with the UI (button click, checkbox toggle, or form submit)
2. Component dispatches an action
3. Reducer (builder pattern) handles the action
4. Redux store updates the state
5. UI re-renders automatically using updated state

One-Line Flow:
UI → Dispatch Action → Reducer → Store Update → UI Re-render

## 7. Folder Structure
```
src/
│
├── app/
│   └── store.js
│
├── features/
│   └── tasks/
│       └── taskSlice.js
│
├── components/
│   └── TaskList.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## 8. Redux Store Configuration
The Redux store is configured in `src/app/store.js` and combines the task reducer:

```js
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/taskSlice'

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
	},
})
```

## 9. Redux Slice (Builder Pattern)
The slice uses `createAction` + `extraReducers(builder => ...)` to handle task operations:
- `addTask`
- `deleteTask`
- `toggleTask`
- `clearCompleted`
- `setFilter`

This keeps reducers predictable and demonstrates the builder pattern clearly.

## 10. UI Component Interaction
`TaskList.jsx` handles:
- Add task via form submit
- Filter tasks (`all`, `active`, `completed`)
- Toggle completion via checkbox
- Delete specific task
- Clear completed tasks
- Live task statistics (total, completed, pending)

All interactions dispatch Redux actions, and the UI updates from store state via `useSelector`.

## 11. Conclusion
This project successfully demonstrates how Redux Toolkit manages global state in a React application using a clean and predictable builder flow. The architecture ensures maintainability, scalability, and improved code quality.

## Run the Project
```bash
npm install
npm run dev
```
