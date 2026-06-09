import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function TaskCardSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-background px-3 py-3 shadow-sm">
      {/* Icon circle */}
      <Skeleton className="mt-0.5 size-4 shrink-0 rounded-full" />
      {/* Title bar — vary widths for realism */}
      <div className="flex flex-1 flex-col gap-1.5">
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3 w-2/3 rounded" />
      </div>
      {/* Action buttons placeholder */}
      <div className="flex shrink-0 items-center gap-1">
        <Skeleton className="h-7 w-16 rounded-md" />
        <Skeleton className="h-7 w-7 rounded-md" />
      </div>
    </div>
  )
}

function ColumnSkeleton({ taskCount = 3 }: { taskCount?: number }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="ml-auto h-5 w-6 rounded-full" />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-1 flex-col gap-2 pt-4">
        {Array.from({ length: taskCount }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </CardContent>
    </Card>
  )
}

export default function BoardSkeleton() {
  return (
    <div className="min-h-screen bg-muted/40 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header skeleton */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-7 w-44 rounded" />
          <Skeleton className="h-4 w-56 rounded" />
        </div>

        {/* Input skeleton */}
        <div className="mb-8 flex gap-2">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 w-28 shrink-0 rounded-md" />
        </div>

        {/* Two-column skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ColumnSkeleton taskCount={3} />
          <ColumnSkeleton taskCount={2} />
        </div>
      </div>
    </div>
  )
}
