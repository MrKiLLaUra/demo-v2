"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { gsap } from "gsap"
import { Car as CarIcon } from "lucide-react"
import { Car } from "@/lib/car-data"

const TIPS = [
  "Loading your future car...",
  "Good things come to those who wait — especially great cars.",
  "Every great journey starts with the right vehicle.",
  "Your next chapter is almost ready to drive off.",
  "Life's too short for the wrong car.",
  "The best rides are worth a few seconds of your time.",
  "Sambi sources only the finest — hang tight.",
  "Your future is loading at full speed.",
  "Behind the wheel of the right car, everything changes.",
  "Make space in the garage — your new car is almost here.",
]

const R    = 52
const CIRC = 2 * Math.PI * R // ≈ 326.7

export function CarLoadingScreen({ car }: { car: Car | null }) {
  // React state drives ALL show/hide — GSAP never touches text/content visibility
  const [mounted,     setMounted]     = useState(false)
  const [show,        setShow]        = useState(false)
  const [displayCar,  setDisplayCar]  = useState<Car | null>(null)
  const [tip,         setTip]         = useState(TIPS[0])
  const [isBrowser,   setIsBrowser]   = useState(false)

  // Portal needs to know we're on the client (document.body exists)
  useEffect(() => { setIsBrowser(true) }, [])

  // GSAP targets only the non-text decorative elements
  const circleRef  = useRef<SVGCircleElement>(null)
  const iconRef    = useRef<HTMLDivElement>(null)
  const fillRef    = useRef<HTMLDivElement>(null)
  const progTween  = useRef<gsap.core.Tween | null>(null)
  const iconPulse  = useRef<gsap.core.Tween | null>(null)
  const exitTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── mount / unmount driven by car prop ──
  useEffect(() => {
    if (car) {
      if (exitTimer.current) clearTimeout(exitTimer.current)
      setDisplayCar(car)
      setTip(TIPS[Math.floor(Math.random() * TIPS.length)])
      setMounted(true)
      // double-rAF: let the DOM paint with mounted=true before triggering the CSS transition
      const r1 = requestAnimationFrame(() => {
        const r2 = requestAnimationFrame(() => setShow(true))
        return () => cancelAnimationFrame(r2)
      })
      return () => cancelAnimationFrame(r1)
    } else {
      setShow(false)
      // wait for CSS fade-out (300ms) before removing from DOM
      exitTimer.current = setTimeout(() => {
        setMounted(false)
        setDisplayCar(null)
      }, 380)
    }
  }, [car])

  // ── GSAP: ring + progress bar + icon pulse ONLY ──
  useEffect(() => {
    if (!mounted) return
    const circle = circleRef.current
    const icon   = iconRef.current
    const fill   = fillRef.current
    if (!fill) return

    if (show) {
      gsap.killTweensOf([circle, icon, fill])
      progTween.current?.kill()
      iconPulse.current?.kill()

      gsap.set(fill, { scaleX: 0 })
      if (circle) gsap.set(circle, { strokeDashoffset: CIRC })

      // ring draws clockwise to 78 %
      if (circle) {
        gsap.to(circle, {
          strokeDashoffset: CIRC * 0.22,
          duration: 2.0,
          ease: "power2.inOut",
          delay: 0.4,
        })
      }

      // progress bar crawls to 80 %
      progTween.current = gsap.to(fill, {
        scaleX: 0.8,
        duration: 2.2,
        ease: "power1.inOut",
        delay: 0.4,
      })

      // icon breathes forever
      if (icon) {
        iconPulse.current = gsap.to(icon, {
          scale: 1.12,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          duration: 0.9,
          delay: 0.9,
        })
      }
    } else {
      // snap to complete on exit
      progTween.current?.kill()
      iconPulse.current?.kill()
      if (icon) { gsap.killTweensOf(icon); gsap.set(icon, { scale: 1 }) }
      if (circle) gsap.to(circle, { strokeDashoffset: 0, duration: 0.22, ease: "power2.out" })
      if (fill)   gsap.to(fill,   { scaleX: 1,         duration: 0.18, ease: "power1.out" })
    }
  }, [show, mounted])

  if (!mounted || !isBrowser) return null

  // Portal renders directly into <body> so parent transforms (GSAP page
  // transition on <main>) can never break position:fixed
  return createPortal(
    <div
      className={`fixed inset-0 z-[200] bg-black flex items-center justify-center
        transition-opacity duration-300
        ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* Subtle red grid */}
      <div className="absolute inset-0 pointer-events-none
        bg-[linear-gradient(rgba(227,31,43,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(227,31,43,0.03)_1px,transparent_1px)]
        bg-[size:48px_48px]" />

      {/* Content block — CSS transition slides it up, no GSAP */}
      <div className={`relative flex flex-col items-center text-center px-8 max-w-xs
        transition-all duration-500 delay-75
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Branding */}
        <div className="flex flex-col items-center gap-[5px] mb-10">
          <div className="flex gap-1.5">
            <div className="w-8 h-[2px] bg-primary" />
            <div className="w-3 h-[2px] bg-primary/40" />
          </div>
          <div className="font-display text-xl tracking-[0.42em] text-white mt-2">
            SAMBI TOP GEAR
          </div>
          <div className="text-[10px] tracking-[0.3em] text-primary font-semibold">
            MOTORS · LIMASSOL
          </div>
        </div>

        {/* Animated ring + icon */}
        <div className="relative mb-8" style={{ width: 140, height: 140 }}>
          {/* ghost ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 140" fill="none">
            <circle cx="70" cy="70" r={R} stroke="rgba(227,31,43,0.12)" strokeWidth="1.5" />
          </svg>
          {/* progress ring — starts at 12 o'clock */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 140 140"
            fill="none"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              ref={circleRef}
              cx="70" cy="70" r={R}
              stroke="#e31f2b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRC}
            />
          </svg>
          {/* soft glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-primary/5" />
          </div>
          {/* car icon — GSAP only scales this, never hides it */}
          <div ref={iconRef} className="absolute inset-0 flex items-center justify-center">
            <CarIcon className="w-11 h-11 text-primary" strokeWidth={1} />
          </div>
        </div>

        {/* Car identity */}
        {displayCar ? (
          <>
            <div className="font-display text-2xl md:text-3xl tracking-widest text-white leading-none mb-1">
              {displayCar.make} {displayCar.model}
            </div>
            <div className="text-[10px] tracking-[0.28em] text-primary/70 uppercase mb-8">
              {displayCar.year} · {displayCar.condition}
            </div>
          </>
        ) : (
          <div className="mb-8" />
        )}

        {/* Tip */}
        <div className="w-8 h-px bg-primary/25 mx-auto mb-5" />
        <p className="text-xs text-white/40 font-light leading-relaxed tracking-wide max-w-[240px]">
          {tip}
        </p>
      </div>

      {/* Progress bar — GSAP managed, no React style prop so re-renders can't reset it */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04]">
        <div ref={fillRef} className="h-full bg-primary origin-left" />
      </div>
    </div>,
    document.body
  )
}
