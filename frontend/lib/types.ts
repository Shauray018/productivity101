export type TaskStatus = "todo" | "done"

export interface Task {
  id: number
  title: string
  status: TaskStatus
}
export interface ColumnProps {
  title: string
  tasks: Task[]
  status: TaskStatus
  onMove: (id: number, status: TaskStatus) => void
  onDelete: (id: number) => void
}

export interface AddTaskInputProps {
  value: string
  onChange: (value: string) => void
  onAdd: () => void
  loading: boolean
}