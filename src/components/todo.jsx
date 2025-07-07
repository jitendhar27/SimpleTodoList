import { useState, useEffect } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) =>
    filter === "Active" ? !todo.completed :
    filter === "Completed" ? todo.completed :
    true
  );

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <h1>My Todo App</h1>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h2>TODO List</h2>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newTodo.trim() !== "") {
              setTodos([...todos, { text: newTodo, completed: false }]);
              setNewTodo("");
            }
          }}
          placeholder="Enter task"
        />

        <button onClick={() => {
          if (newTodo.trim() !== "") {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo("");
          }
        }} disabled={newTodo.trim() === ""}>
          Add
        </button>
      </div>

      <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
      <button onClick={() => setTodos(todos.filter(t => !t.completed))}
        disabled={todos.filter(t => t.completed).length === 0}>
        Clear Completed
      </button>

      <div>
        {["All", "Active", "Completed"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredTodos.map((todo, i) => (
        <div className="task-item" key={i}>
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                setTodos(todos.map((t, j) =>
                  j === i ? { ...t, completed: !t.completed } : t
                ))
              }
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                marginLeft: "10px",
              }}
            >
              {todo.text}
            </span>
          </div>
          <button className="remove-btn" onClick={() =>
            setTodos(todos.filter((_, j) => j !== i))
          }>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
