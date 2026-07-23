"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 })
      tl.from(eyebrowRef.current, { x: -40, opacity: 0, duration: 0.8 }, 0)
      tl.from([line1Ref.current, line2Ref.current, line3Ref.current], { y: "110%", stagger: 0.1, duration: 1.1 }, 0.15)
      tl.from(subtitleRef.current, { y: 24, opacity: 0, duration: 0.8, ease: "power2.out" }, 0.85)
      tl.from(ctaRef.current, { y: 20, opacity: 0, duration: 0.7, ease: "power2.out" }, 1.0)
      tl.from(scrollRef.current, { opacity: 0, duration: 0.6 }, 1.4)
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-16 overflow-hidden border-b border-border">
      {/* Background video — fades in from black once it can play */}
      <video
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-out ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/placeholder.jpg"
        onCanPlay={() => setVideoReady(true)}
      />
      {/* Darken video for text legibility — stronger on the left where the text sits */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
      {/* Fade video to black at the bottom so it blends into the stats bar */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(227,31,43,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(227,31,43,0.025)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(227,31,43,0.06)_0%,transparent_65%)] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-16 w-full">
          <div ref={eyebrowRef} className="text-[10px] md:text-xs tracking-[0.45em] text-primary mb-8 font-semibold flex items-center gap-3">
            <span className="w-8 h-px bg-primary inline-block" />
            LIMASSOL · CYPRUS · EST. 2019
          </div>

          <h1 className="font-display leading-[0.88] mb-8 md:mb-10">
            <div className="overflow-hidden">
              <div ref={line1Ref} className="text-[clamp(4.5rem,13vw,11rem)] tracking-[0.03em]">
                SAMBI
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={line2Ref} className="text-[clamp(4.5rem,13vw,11rem)] tracking-[0.03em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.18)]">
                TOP GEAR
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={line3Ref} className="text-[clamp(4.5rem,13vw,11rem)] tracking-[0.03em]">
                MOTORS
              </div>
            </div>
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <p ref={subtitleRef} className="text-base md:text-lg text-muted-foreground max-w-[420px] font-light leading-relaxed">
              The premier car dealership in Limassol. Hand-picked vehicles sourced across Europe — every one inspected, priced honestly, ready to drive.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
              <Link
                href="/cars"
                className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-display text-lg tracking-[0.15em] transition-colors group"
              >
                BROWSE CARS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/35799929323"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border-2 border-foreground bg-background/80 backdrop-blur-sm hover:bg-foreground hover:text-background px-8 py-4 font-display text-lg tracking-[0.15em] transition-colors"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { n: "200+", label: "Cars Sold" },
              { n: "7+",   label: "Years in Business" },
              { n: "2 wks", label: "Avg. Sourcing Time" },
              { n: "24/7", label: "AI Concierge" },
            ].map((s) => (
              <div key={s.label} className="py-5 px-6 md:px-8 text-center">
                <div className="font-display text-2xl md:text-3xl tracking-wide text-primary">{s.n}</div>
                <div className="text-[9px] md:text-[10px] tracking-[0.18em] text-muted-foreground mt-0.5 uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={scrollRef} className="absolute bottom-20 md:bottom-24 right-8 hidden md:flex flex-col items-center gap-2 text-muted-foreground/40">
        <div className="text-[9px] tracking-[0.3em] rotate-90 origin-center mb-2">SCROLL</div>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </div>
    </section>
  )
}
