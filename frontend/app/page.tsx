"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { Column } from "@/components/Column"
import { AddTaskInput } from "@/components/AddTaskInput"
import BoardSkeleton  from "@/components/SkeletonLoader"
import { AlertCircle } from "lucide-react"
import { getErrorMessage } from "@/lib/api"
import { type Task, type TaskStatus } from "@/lib/types"

interface ErrorBannerProps {
  message: string
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <span> {message}</span>
    </div>
  )
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    api.getTasks()
      .then(setTasks)
      .catch(() => setError("Cannot reach the backend. Start the Express server on port 4000."))
      .finally(() => setLoading(false))
  }, [])

  async function handleAdd() {
    const title = input.trim()
    if (!title) return
    setAdding(true)
    setInput("")
    try {
      const task = await api.createTask(title)
      setTasks((prev) => [...prev, task])
      toast.success("Task added")
    } catch (err) {
      const message = getErrorMessage(err, "Failed to add task.")
      toast.error("Couldn't add task", { description: message })
      setInput(title)
    } finally {
      setAdding(false)
    }
  }

  async function handleMove(id: number, status: TaskStatus) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    try {
      await api.updateStatus(id, status)
      toast.success(status === "done" ? "Marked as done" : "Moved back to To do")
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: status === "done" ? "todo" : "done" } : t))
      )
      const message = getErrorMessage(err, "Failed to update task.")
      toast.error("Couldn't update task", { description: message })
    }
  }

  async function handleDelete(id: number) {
    const snapshot = tasks
    setTasks((t) => t.filter((t) => t.id !== id))
    try {
      await api.deleteTask(id)
      toast.success("Task deleted")
    } catch (err) {
      setTasks(snapshot)
      const message = getErrorMessage(err, "Failed to delete task.")
      toast.error("Couldn't delete task", { description: message })
    }
  }

  const todoTasks = tasks.filter((t) => t.status === "todo")
  const doneTasks = tasks.filter((t) => t.status === "done")
  {
    if (loading) {
      return <BoardSkeleton />
    } else { 
      return (
          <div className="min-h-screen bg-muted/40 px-4 py-10">
            <div className="mx-auto max-w-4xl space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Kanban Board</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tasks.length === 0
                    ? "No tasks yet — add one below"
                    : `${tasks.length} task${tasks.length !== 1 ? "s" : ""} · ${doneTasks.length} done`}
                </p>
              </div>

              {error && <ErrorBanner message={error} />}

              <AddTaskInput
                value={input}
                onChange={setInput}
                onAdd={handleAdd}
                loading={adding}
              />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Column title="To do" status="todo" tasks={todoTasks} onMove={handleMove} onDelete={handleDelete} />
                  <Column title="Done" status="done" tasks={doneTasks} onMove={handleMove} onDelete={handleDelete} />
                </div>
            </div>
          </div>
        )
    }
  }
  
}