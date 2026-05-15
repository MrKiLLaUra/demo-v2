"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

export function AdminDeleteButton({ carId, carName }: { carId: number; carName: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/cars/${carId}`, { method: "DELETE" })
    if (res.ok) {
      toast.success(`${carName} deleted`)
      router.refresh()
    } else {
      toast.error("Failed to delete")
    }
    setLoading(false)
    setConfirming(false)
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-[10px] tracking-widest text-primary border border-primary/50 px-2.5 py-1.5 hover:bg-primary/10 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "CONFIRM"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[10px] tracking-widest text-muted-foreground border border-border px-2.5 py-1.5 hover:border-foreground/30 transition-colors"
        >
          CANCEL
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-1.5 text-[10px] tracking-widest text-muted-foreground hover:text-primary transition-colors border border-border hover:border-primary/40 px-2.5 py-1.5"
    >
      <Trash2 className="w-3 h-3" />
      DELETE
    </button>
  )
}
