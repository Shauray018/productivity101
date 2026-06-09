import { Square, CheckSquare2, ClipboardList } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TaskCard } from "./TaskCard"
import { ColumnProps } from "@/lib/types"

export function Column({ title, tasks, status, onMove, onDelete }: ColumnProps) {
  const isDoneCol = status === "done"

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          {isDoneCol ? (
            <CheckSquare2 className="size-4 text-emerald-500" />
          ) : (
            <Square className="size-4 text-cyan-500" />
          )}
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          <Badge variant={isDoneCol ? "secondary" : "destructive"} className="ml-auto">
            {tasks.length}
          </Badge>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-1 flex-col gap-2 pt-2">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
            <ClipboardList className="size-8 opacity-30" />
            <p className="text-xs">
              {isDoneCol ? "Nothing completed yet" : "No tasks here"}
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onMove={onMove} onDelete={onDelete} />
          ))
        )}
      </CardContent>
    </Card>
  )
}