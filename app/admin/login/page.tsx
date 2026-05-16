"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/admin")
      router.refresh()
    } else {
      setError("Incorrect password.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="relative overflow-hidden mx-auto mb-2" style={{ width: 200, height: 44 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sambi-logo.png" alt="Sambi Top Gear" style={{ position: "absolute", width: 200, top: -68, mixBlendMode: "screen" }} />
          </div>
          <div className="text-[10px] tracking-[0.4em] text-primary">ADMIN PANEL</div>
        </div>

        <form onSubmit={handleSubmit} className="border border-border bg-card p-8 space-y-4">
          <div>
            <label className="text-xs tracking-[0.15em] text-foreground font-bold block mb-1.5">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-input border-2 border-border px-4 py-3 text-sm outline-none focus:border-primary/60 transition-colors"
              placeholder="Enter admin password"
            />
          </div>

          {error && <p className="text-xs text-primary">{error}</p>}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-display text-lg tracking-widest transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "ENTER"}
          </button>
        </form>
      </div>
    </div>
  )
}
