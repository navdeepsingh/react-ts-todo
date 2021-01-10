import React from 'react'
import './App.css'

interface ITodo {
  id: number
  text: undefined | string
  done: boolean
}

const Todo = () => {
  const [todos, setTodos] = React.useState<ITodo[]>([])
  const todoRef = React.useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    
    const newTodos = todos.slice() // Copy
    newTodos.push({
      id: newTodos.length + 1,
      text: todoRef.current?.value,
      done: false,
    })

    setTodos(newTodos)
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedId = parseInt(
      e.target.id.substr(e.target.id.indexOf('-') + 1),
    )

    const updatedTodos = todos.map(todo => {
      if (todo.id === selectedId) {
        return {id: todo.id, text: todo.text, done: !todo.done}
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  const handleClearAll = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    const updateddTodos = todos.map(todo => {
      return {id: todo.id, text: todo.text, done: true}
    })

    setTodos(updateddTodos)
  }

  return (
    <>
      <h1>Todos List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="todo" ref={todoRef} />
      </form>
      <button onClick={handleClearAll}>Clear all todos</button>
      <ul>
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                onChange={handleToggle}
                checked={todo.done}
                required
              />
              <label
                htmlFor={`todo-${todo.id}`}
                style={{textDecoration: todo.done ? 'line-through' : undefined}}
              >
                {todo.text}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  )
}

export default App
