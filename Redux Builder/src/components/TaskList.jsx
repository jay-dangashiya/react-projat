import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTask,
  clearCompleted,
  deleteTask,
  setFilter,
  toggleTask,
} from '../features/tasks/taskSlice'

const filters = ['all', 'active', 'completed']

function TaskList() {
  const dispatch = useDispatch()
  const { items, filter } = useSelector((state) => state.tasks)
  const [taskTitle, setTaskTitle] = useState('')

  const visibleTasks = useMemo(() => {
    if (filter === 'active') return items.filter((task) => !task.completed)
    if (filter === 'completed') return items.filter((task) => task.completed)
    return items
  }, [items, filter])

  const completedCount = items.filter((task) => task.completed).length

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!taskTitle.trim()) return
    dispatch(addTask(taskTitle))
    setTaskTitle('')
  }

  return (
    <section className="task-board">
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
          placeholder="Add a task and press Enter"
          aria-label="Task title"
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-toolbar">
        <div className="filter-group" role="tablist" aria-label="Task filters">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? 'active' : ''}
              onClick={() => dispatch(setFilter(item))}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="ghost"
          onClick={() => dispatch(clearCompleted())}
          disabled={!completedCount}
        >
          Clear Completed
        </button>
      </div>

      <ul className="task-list">
        {visibleTasks.length ? (
          visibleTasks.map((task) => (
            <li key={task.id} className={task.completed ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTask(task.id))}
                />
                <span>{task.title}</span>
              </label>
              <button
                type="button"
                className="danger"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="empty">No tasks in this view. Add one above.</li>
        )}
      </ul>

      <footer className="task-footer">
        <p>Total: {items.length}</p>
        <p>Completed: {completedCount}</p>
        <p>Pending: {items.length - completedCount}</p>
      </footer>
    </section>
  )
}

export default TaskList
