import type { Metadata } from "next"

export const metadata: Metadata = { title: "Admin — Sambi Top Gear", robots: { index: false, follow: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[oklch(0.07_0_0)] text-foreground">
      {children}
    </div>
  )
}
