"use client"

import { useState } from "react"
import { X, Plus, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface KnowledgeItem {
  id: string
  title: string
  content: string
  createdAt: Date
}

interface KnowledgePanelProps {
  items: KnowledgeItem[]
  onAdd: (item: Omit<KnowledgeItem, "id" | "createdAt">) => void
  onRemove: (id: string) => void
  collapsed: boolean
  onToggle: () => void
}

export function KnowledgePanel({
  items,
  onAdd,
  onRemove,
  collapsed,
  onToggle,
}: KnowledgePanelProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleAdd = () => {
    if (!content.trim()) return
    onAdd({
      title: title.trim() || `Document ${items.length + 1}`,
      content: content.trim(),
    })
    setTitle("")
    setContent("")
    setIsAdding(false)
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
        collapsed ? "w-12" : "w-80"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-3">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Knowledge Base
            </span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
              {items.length}
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={onToggle}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {collapsed ? null : (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Add Button / Form */}
          {isAdding ? (
            <div className="border-b border-border p-3">
              <input
                type="text"
                placeholder="Title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-2 w-full rounded-md border border-border bg-secondary px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <textarea
                placeholder="Paste your document content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="mb-2 w-full resize-none rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleAdd}
                  disabled={!content.trim()}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsAdding(false)
                    setTitle("")
                    setContent("")
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-b border-border p-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdding(true)}
                className="w-full gap-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Document
              </Button>
            </div>
          )}

          {/* Document List */}
          <div className="flex-1 overflow-y-auto p-2">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="mb-2 h-8 w-8 text-muted-foreground/40" />
                <p className="text-xs text-muted-foreground">
                  No documents yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  Add text to build your knowledge base
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-start gap-2 rounded-lg p-2 transition-colors hover:bg-secondary"
                  >
                    <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {item.content}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="shrink-0 rounded p-0.5 text-muted-foreground/40 opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                      aria-label={`Remove ${item.title}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
