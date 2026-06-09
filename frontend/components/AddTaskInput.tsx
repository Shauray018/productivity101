"use client"

import { useRef } from "react"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AddTaskInputProps } from "@/lib/types"

export function AddTaskInput({ value, onChange, onAdd, loading }: AddTaskInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") onAdd()
  }

  return (
    <div className="flex gap-2">
      <Input
        ref={inputRef}
        placeholder="What needs to be done?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-background"
        disabled={loading}
      />
      <Button onClick={onAdd} disabled={loading || !value.trim()} className="shrink-0">
        {loading ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
        Add task
      </Button>
    </div>
  )
}