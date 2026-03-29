"use client"

import { type ReactNode, useEffect } from "react"
import { usePathname } from "next/navigation"

interface ScrollToTopProps {
  children: ReactNode
}

export function ScrollToTop({ children }: ScrollToTopProps) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })

    const mainScrollable =
      document.getElementById("main-content") ??
      document.querySelector<HTMLElement>("main") ??
      document.querySelector<HTMLElement>("[data-scroll-container]") ??
      document.querySelector<HTMLElement>(".overflow-y-auto")

    if (mainScrollable) {
      mainScrollable.scrollTop = 0
    }
  }, [pathname])

  return <>{children}</>
}
