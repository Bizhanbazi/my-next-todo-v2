// utils/api.js
import axios from "axios";

// ساخت یک instance از axios با baseURL جدید
const API = axios.create({
  baseURL: "https://my-next-todo-fullstack-3.onrender.com/api",
});

// گرفتن همه‌ی تسک‌ها
export const getTodos = () => API.get("/todos");

// اضافه کردن یک تسک جدید
export const addTodo = (text) => API.post("/todos", { text });

// تغییر وضعیت انجام شده/نشده یک تسک
export const toggleTodo = (id) => API.put(`/todos/${id}`);

// حذف یک تسک
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
