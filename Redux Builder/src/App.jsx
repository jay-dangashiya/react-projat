import TaskList from './components/TaskList'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header>
        <p className="tag">Redux Builder App Flow in React.js</p>
        <h1>Task Builder Application</h1>
        <p className="subtitle">
          UI → Dispatch Action → Reducer (Builder Pattern) → Store Update → UI Re-render
        </p>
      </header>

      <TaskList />
    </main>
  )
}

export default App
