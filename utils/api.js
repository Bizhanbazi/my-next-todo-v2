import axios from "axios";

const API = axios.create({
  baseURL: "https://my-next-todo-fullstack-1.onrender.com/api",
});

export const getTodos = () => API.get("/todos");
export const addTodo = (text) => API.post("/todos", { text });
export const toggleTodo = (id) => API.put(`/todos/${id}`);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
