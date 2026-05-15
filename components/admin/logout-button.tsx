"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 border border-border hover:border-foreground/30 px-3 py-2 text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors"
    >
      <LogOut className="w-3.5 h-3.5" />
      LOGOUT
    </button>
  )
}
