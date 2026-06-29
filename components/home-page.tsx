"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { CarCard } from "@/components/car-card"
import { WhyUs } from "@/components/why-us"
import { Car, Page } from "@/lib/car-data"

gsap.registerPlugin(ScrollTrigger)

interface HomePageProps {
  setPage: (page: Page) => void
  inventory: Car[]
  isLoading?: boolean
  favorites: number[]
  toggleFavorite: (id: number) => void
}

function CarCardSkeleton() {
  return (
    <div className="border border-border bg-card overflow-hidden">
      <div className="h-40 md:h-44 bg-border/20 animate-pulse" />
      <div className="p-4 md:p-5 flex flex-col gap-3">
        <div className="w-24 h-2.5 bg-border/30 animate-pulse rounded" />
        <div className="w-40 h-6 bg-border/40 animate-pulse rounded" />
        <div className="flex gap-1.5">
          <div className="w-14 h-5 bg-border/25 animate-pulse rounded" />
          <div className="w-20 h-5 bg-border/25 animate-pulse rounded" />
          <div className="w-24 h-5 bg-border/25 animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}

const STATS = [
  { to: 200, suffix: "+", label: "Cars Sold" },
  { to: 7, suffix: "+", label: "Years Experience" },
  { to: 100, suffix: "%", label: "Transparent Pricing" },
  { to: 24, suffix: "/7", label: "AI Assistant" },
]

function AnimatedCounter({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obj = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: to,
          duration: 1.8,
          ease: "power2.out",
          onUpdate() {
            if (numRef.current) numRef.current.textContent = Math.round(obj.val) + suffix
          },
        })
      },
    })
    return () => trigger.kill()
  }, [to, suffix])

  return (
    <div ref={wrapRef} className="text-center">
      <div ref={numRef} className="font-display text-3xl md:text-4xl tracking-wide text-primary">
        0{suffix}
      </div>
      <div className="text-[10px] md:text-xs text-muted-foreground tracking-[0.15em] mt-1 uppercase">
        {label}
      </div>
    </div>
  )
}

export function HomePage({
  setPage,
  inventory,
  isLoading = false,
  favorites,
  toggleFavorite,
}: HomePageProps) {
  const featured = inventory.slice(0, 3)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── HERO ENTRANCE ──
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.05 })

      tl.from(eyebrowRef.current, { x: -60, autoAlpha: 0, duration: 0.9 }, 0)
      // title lines slide up from inside overflow:hidden wrappers (masked reveal)
      tl.from(".hero-line", { y: "115%", stagger: 0.13, duration: 1.15 }, 0.1)
      tl.from(subtitleRef.current, { y: 30, autoAlpha: 0, duration: 0.8, ease: "power2.out" }, 0.85)
      tl.from(ctaRef.current,      { y: 24, autoAlpha: 0, duration: 0.7, ease: "power2.out" }, 1.02)
      tl.from(statsRef.current,    { y: 24, autoAlpha: 0, duration: 0.7, ease: "power2.out" }, 1.14)

      // ── PARALLAX BG TEXT ──
      gsap.to(bgTextRef.current, {
        y: "-22%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      })

      // ── FEATURED HEADER ──
      gsap.from(".featured-header", {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".featured-header", start: "top 86%" },
      })

      // ── FEATURED CARDS stagger ──
      gsap.from(".featured-card", {
        y: 90,
        autoAlpha: 0,
        stagger: { each: 0.16, from: "start" },
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: ".featured-grid", start: "top 83%" },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Refresh when loading finishes so ScrollTrigger sees final card positions
  useEffect(() => {
    if (!isLoading) ScrollTrigger.refresh()
  }, [isLoading])

  return (
    <div ref={containerRef}>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="min-h-[92vh] flex items-center justify-center relative overflow-hidden border-b border-border/50"
      >
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(227,31,43,0.07)_0%,transparent_70%)] pointer-events-none" />

        {/* Parallax background text */}
        <div
          ref={bgTextRef}
          className="absolute font-display text-[18vw] md:text-[22vw] tracking-[-0.02em] text-foreground/[0.015] select-none whitespace-nowrap leading-none"
        >
          SAMBI TOP GEAR MOTORS
        </div>

        <div className="text-center relative z-10 px-6">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="text-xs md:text-sm tracking-[0.4em] text-primary mb-5 font-semibold"
          >
            LIMASSOL · CYPRUS · EST. 2019
          </div>

          {/* Title — each line in overflow:hidden for the masked slide-up reveal */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[110px] tracking-[0.05em] leading-[0.9] mb-7">
            <div className="overflow-hidden">
              <div className="hero-line">SAMBI TOP GEAR</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">
                MOTORS
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line">LIMASSOL</div>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-base md:text-lg text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed font-light"
          >
            We are the premier dealership in Limassol, with hand-picked vehicles, instant AI pricing
            estimates, and easy test-drive booking in one place.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setPage("inventory")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-base tracking-[0.15em] px-9 py-6"
            >
              BROWSE INVENTORY
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage("services")}
              className="border-foreground/20 hover:bg-foreground hover:text-background font-display text-base tracking-[0.15em] px-9 py-6"
            >
              OUR SERVICES
            </Button>
          </div>

          {/* Animated stat counters */}
          <div
            ref={statsRef}
            className="flex flex-wrap gap-8 md:gap-12 justify-center mt-16 md:mt-20"
          >
            {STATS.map((s) => (
              <AnimatedCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CARS ── */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="featured-header flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10">
            <div>
              <div className="text-xs tracking-[0.3em] text-primary mb-2 font-semibold">HAND-PICKED</div>
              <h2 className="font-display text-3xl md:text-4xl tracking-wide">FEATURED CARS</h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => setPage("inventory")}
              className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground w-fit"
            >
              VIEW ALL
            </Button>
          </div>

          <div className="featured-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {isLoading
              ? [0, 1, 2].map((i) => (
                  <div key={i} className="featured-card">
                    <CarCardSkeleton />
                  </div>
                ))
              : featured.map((car, index) => (
                  <div key={car.id} className="featured-card">
                    <CarCard
                      car={car}
                      onClick={() => setPage("inventory")}
                      isFavorite={favorites.includes(car.id)}
                      onToggleFavorite={() => toggleFavorite(car.id)}
                      priority={index < 2}
                    />
                  </div>
                ))}
          </div>
        </div>
      </section>

      <WhyUs />
    </div>
  )
}
