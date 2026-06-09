"use client"

import { Square, CheckSquare2, RotateCcw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Task, type TaskStatus } from "@/lib/types"

interface TaskCardProps {
  task: Task
  onMove: (id: number, status: TaskStatus) => void
  onDelete: (id: number) => void
}

export function TaskCard({ task, onMove, onDelete }: TaskCardProps) {
  const isDone = task.status === "done"

  return (
    <div className="group flex items-center justify-between gap-3 rounded-lg border bg-background px-3 py-3 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onMove(task.id, isDone ? "todo" : "done")}
          className="shrink-0 cursor-pointer transition-transform hover:scale-110"
          title={isDone ? "Mark as todo" : "Mark as done"}
        >
          {isDone ? (
            <CheckSquare2 className="size-5 text-emerald-500" />
          ) : (
            <Square className="size-5 text-cyan-500" />
          )}
        </button>

        <span
          className={`text-sm mt-0.5 ${
            isDone ? "line-through text-muted-foreground" : "text-foreground"
          }`}
        >
          {task.title}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {isDone && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onMove(task.id, "todo")}
          >
            <RotateCcw className="size-3" />
            <span className="ml-1">Undo</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}