import client from "./client";

// GET all todos
export const getTodosApi = () =>
    client.get("/todos");

// CREATE todo
export const createTodoApi = (data: {
    title: string;
    description: string;
    priority: string;
    dueDate: string | null}) =>
    client.post("/todos", data);

// UPDATE todo
export const updateTodoApi = (id: number, data: { title: string; description?: string }) =>
    client.put(`/todos/${id}`, data);

// TOGGLE complete
export const toggleTodoApi = (id: number) =>
    client.patch(`/todos/${id}/toggle`);

// DELETE todo
export const deleteTodoApi = (id: number) =>
    client.delete(`/todos/${id}`);

