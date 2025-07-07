import { useState, useEffect } from "react";

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    // Safe initialization from localStorage
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [newTodo, setNewTodo] = useState("");

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="App">
      <h1>TODO List</h1>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newTodo.trim() !== "") {
              addTodo();
            }
          }}
          placeholder="Enter task"
        />

        <button onClick={addTodo} disabled={newTodo.trim() === ""}>
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
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
              <button onClick={() => removeTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
