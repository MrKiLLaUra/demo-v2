"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { SITE_INTRO_REVEAL_EVENT } from "@/lib/site-intro"

const MIN_MS = 2000  // always show at least this long, so fast loads don't flash
const MAX_MS = 6000  // never block the site longer than this, even on a slow connection
const EXIT_DURATION = 2.2 // seconds

export function SiteLoadingScreen() {
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const logoBoxRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem("site-loaded")) return

    setMounted(true)
    const raf = requestAnimationFrame(() => setShow(true))

    const start = Date.now()
    const finish = () => {
      const remaining = Math.max(0, MIN_MS - (Date.now() - start))
      setTimeout(runExit, remaining)
    }

    if (document.readyState === "complete") {
      finish()
    } else {
      window.addEventListener("load", finish)
    }
    const hardCap = setTimeout(finish, MAX_MS)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("load", finish)
      clearTimeout(hardCap)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.style.overflow = mounted ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mounted])

  function runExit() {
    sessionStorage.setItem("site-loaded", "1")
    const backdrop = backdropRef.current
    const logoBox = logoBoxRef.current
    if (!backdrop || !logoBox) {
      window.dispatchEvent(new Event(SITE_INTRO_REVEAL_EVENT))
      setMounted(false)
      return
    }

    const navLogo = document.getElementById("site-nav-logo")
    const from = logoBox.getBoundingClientRect()

    // Pin the logo to its current on-screen spot in fixed coordinates so it can be
    // freely translated to the nav bar. logoBox has no transformed ancestor (that
    // would redefine what "fixed" is relative to).
    gsap.set(logoBox, {
      position: "fixed",
      top: from.top,
      left: from.left,
      width: from.width,
      height: from.height,
      margin: 0,
      zIndex: 301,
      transformOrigin: "0 0",
    })

    const tl = gsap.timeline({ onComplete: () => setMounted(false) })

    // Tagline fades out quickly; the logo itself is never faded — only the
    // black backdrop behind it dissolves, while the logo flies to the nav bar
    if (taglineRef.current) {
      tl.to(taglineRef.current, { opacity: 0, duration: 0.5, ease: "power1.out" }, 0)
    }

    tl.to(backdrop, { opacity: 0, duration: EXIT_DURATION, ease: "power2.inOut" }, 0)

    // At ~80% faded, let anything waiting on the intro (the hero video) start revealing
    tl.call(
      () => window.dispatchEvent(new Event(SITE_INTRO_REVEAL_EVENT)),
      [],
      EXIT_DURATION * 0.8
    )

    if (navLogo) {
      const to = navLogo.getBoundingClientRect()
      tl.to(
        logoBox,
        {
          x: to.left - from.left,
          y: to.top - from.top,
          scaleX: to.width / from.width,
          scaleY: to.height / from.height,
          duration: EXIT_DURATION,
          ease: "power3.inOut",
        },
        0
      )
    } else {
      tl.to(logoBox, { opacity: 0, duration: 0.4 }, EXIT_DURATION - 0.4)
    }
  }

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-10 px-8 text-center"
    >
      {/* Backdrop group — black bg, grid, progress bar. This whole group fades
          out on exit; the logo below is not part of it and stays fully opaque. */}
      <div ref={backdropRef} className="absolute inset-0 bg-black">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(227,31,43,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(227,31,43,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04] overflow-hidden">
          <div
            className={`h-full bg-primary origin-left transition-transform ease-out ${
              show ? "duration-[4500ms] scale-x-100" : "duration-0 scale-x-0"
            }`}
          />
        </div>
      </div>

      {/* Logo — no transformed ancestor, so its later position:fixed FLIP move stays viewport-relative */}
      <div
        ref={logoBoxRef}
        className={`relative overflow-hidden transition-opacity duration-[1500ms] ease-out ${
          show ? "opacity-100" : "opacity-0"
        }`}
        style={{ width: 220, height: 48 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sambi-logo.png"
          alt="Sambi Top Gear"
          style={{ position: "absolute", width: 220, top: -75, mixBlendMode: "screen" }}
        />
      </div>

      <div
        ref={taglineRef}
        className={`transition-all duration-[1500ms] delay-150 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="w-8 h-px bg-primary/25 mx-auto mb-5" />
        <p className="text-[10px] tracking-[0.3em] text-white/40 font-light uppercase">
          Limassol · Cyprus
        </p>
      </div>
    </div>
  )
}
