"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [text, setText] = useState("");

  // Fetch todos
  const loadTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!text.trim()) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, done: false }),
    });
    setText("");
    loadTodos();
  };

  // Toggle done
  const toggleDone = async (id: number) => {
    await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadTodos();
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadTodos();
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-5 text-center">
        📝 My To-Do App
      </h1>

      {/* Add form */}
      <div className="flex gap-2 mb-5">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* List */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border rounded p-2"
          >
            <span
              onClick={() => toggleDone(todo.id)}
              className={`cursor-pointer ${
                todo.done ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-600 hover:text-red-800"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
