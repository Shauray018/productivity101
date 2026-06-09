import axios from "axios"
import { type Task, type TaskStatus } from "./types"

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

const client = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
})

export function getErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    if (err.response?.data?.error) {
      return err.response.data.error        
    }
    if (!err.response) {
      return "Cannot reach the server. Is it running?"  
    }
  }
  return fallback
}

export const api = {
  getTasks: () =>
    client.get<Task[]>("/tasks").then((res) => res.data),

  createTask: (title: string) =>
    client.post<Task>("/tasks", { title }).then((res) => res.data),

  updateStatus: (id: number, status: TaskStatus) =>
    client.put<Task>(`/tasks/${id}`, { status }).then((res) => res.data),

  deleteTask: (id: number) =>
    client.delete<null>(`/tasks/${id}`).then(() => null),
}