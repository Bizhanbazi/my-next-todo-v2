import { NextResponse } from "next/server";

let todos = [
  { id: 1, text: "Learn Next.js", done: false },
  { id: 2, text: "Build my first API", done: false },
];

// GET all todos
export async function GET() {
  return NextResponse.json(todos);
}

// POST new todo
export async function POST(req: Request) {
  const body = await req.json();
  const newTodo = { id: Date.now(), ...body };
  todos.push(newTodo);
  return NextResponse.json(newTodo);
}

// PUT toggle done
export async function PUT(req: Request) {
  const { id } = await req.json();
  todos = todos.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  return NextResponse.json({ success: true });
}

// DELETE todo
export async function DELETE(req: Request) {
  const { id } = await req.json();
  todos = todos.filter((t) => t.id !== id);
  return NextResponse.json({ success: true });
}
