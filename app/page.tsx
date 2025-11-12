"use client";

import { useEffect, useState } from "react";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "../utils/api";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!text) return;
    await addTodo(text);
    setText("");
    fetchTodos();
  };

  const handleToggle = async (id: number) => {
    await toggleTodo(id);
    fetchTodos();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">My Full-Stack ToDo</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New Task"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul>
        {todos.map((t) => (
          <li key={t.id} className="mb-2">
            <span
              onClick={() => handleToggle(t.id)}
              className={`cursor-pointer ${t.done ? "line-through" : ""}`}
            >
              {t.text}
            </span>
            <button
              className="ml-4 bg-red-500 text-white px-2 py-1"
              onClick={() => handleDelete(t.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
