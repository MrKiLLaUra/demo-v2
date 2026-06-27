"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export function AosInit() {
  useEffect(() => {
    // AOS mutates the DOM directly, adding `aos-init`/`aos-animate` classes to
    // every `data-aos` element. This component lives in the root layout (outside
    // the page's <Suspense> boundary), so its effect can fire before the page
    // content has hydrated — React then sees the extra classes and reports a
    // hydration mismatch. Deferring init with a double rAF guarantees AOS runs
    // only after hydration has committed (works for initial load and client nav).
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        AOS.init({
          once: true,
          duration: 700,
          easing: "ease-out-cubic",
          offset: 60,
        })
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])
  return null
}
