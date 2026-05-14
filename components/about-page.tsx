"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { User } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const team = [
  {
    name: "Kosmas Sambi",
    role: "CEO",
    bio: "5 years in the automotive industry. Has a passion for cars and a love for helping people find the perfect vehicle.",
  },
  {
    name: "Kostas Sambi",
    role: "Founder",
    bio: "Knows every car on the lot better than anyone. Has matched hundreds of clients with their perfect vehicle over 7 years with Sambi Top Gear.",
  },
  {
    name: "Annisa Sambi",
    role: "Sales Manager",
    bio: "Dedicated to making the car-buying process as smooth and enjoyable as possible. Combining market expertise with a friendly, customer-focused approach.",
  },
]

const STATS = [
  { to: 2018, suffix: "", label: "Founded", isYear: true },
  { to: 200, suffix: "+", label: "Cars Sold" },
  { to: 7, suffix: "+", label: "Years Experience" },
  { to: 100, suffix: "%", label: "Inspected" },
]

function AnimatedStatCard({
  to,
  suffix,
  label,
  isYear,
}: {
  to: number
  suffix: string
  label: string
  isYear?: boolean
}) {
  const numRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obj = { val: isYear ? to - 4 : 0 }
    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: to,
          duration: isYear ? 1.2 : 1.8,
          ease: "power2.out",
          onUpdate() {
            if (numRef.current)
              numRef.current.textContent = Math.round(obj.val) + suffix
          },
        })
      },
    })
    return () => trigger.kill()
  }, [to, suffix, isYear])

  return (
    <div
      ref={cardRef}
      className="about-stat border border-border bg-card p-6 md:p-7 text-center"
    >
      <div
        ref={numRef}
        className="font-display text-4xl md:text-5xl tracking-wide text-primary mb-2"
      >
        {isYear ? to - 4 : 0}
        {suffix}
      </div>
      <div className="text-xs text-muted-foreground tracking-widest uppercase">{label}</div>
    </div>
  )
}

export function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero — text side
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 })
      tl.from(".about-eyebrow", { x: -50, autoAlpha: 0, duration: 0.8 }, 0)
      tl.from(".about-title-line", { y: "115%", stagger: 0.12, duration: 1.1 }, 0.15)
      tl.from(".about-body p", {
        y: 24,
        autoAlpha: 0,
        stagger: 0.18,
        duration: 0.75,
        ease: "power2.out",
      }, 0.85)

      // Stats grid stagger
      gsap.from(".about-stat", {
        y: 50,
        opacity: 0,
        scale: 0.95,
        stagger: { each: 0.12, from: "start" },
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-stats-grid", start: "top 85%" },
      })

      // Team section heading
      gsap.from(".team-eyebrow", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-eyebrow", start: "top 88%" },
      })
      gsap.from(".team-title-inner", {
        y: "110%",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".team-title-wrap", start: "top 88%" },
      })

      // Team cards stagger
      gsap.from(".team-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-grid", start: "top 83%" },
      })

      // Team avatars spring in
      gsap.from(".team-avatar", {
        scale: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".team-grid", start: "top 83%" },
        delay: 0.2,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="border-b border-border/50 py-16 md:py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(227,31,43,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="about-eyebrow text-xs tracking-[0.3em] text-primary mb-4 font-semibold">
              OUR STORY
            </div>
            <h1 className="font-display text-5xl md:text-6xl tracking-wide leading-none mb-6">
              <div className="overflow-hidden"><div className="about-title-line">BUILT ON</div></div>
              <div className="overflow-hidden"><div className="about-title-line">TRUST &</div></div>
              <div className="overflow-hidden"><div className="about-title-line">QUALITY</div></div>
            </h1>
            <div className="about-body text-muted-foreground leading-relaxed font-light space-y-4">
              <p>
                Founded in 2018 in Limassol, Sambi Top Gear Motors was born from frustration with the
                used car market in Cyprus — inflated prices, hidden issues, zero transparency.
              </p>
              <p>
                We set out to do it differently. Every car we sell is fully inspected, honestly
                described, and fairly priced. And with our AI pricing engine, you always know the
                real market value before you buy.
              </p>
              <p>
                {"7+ years later, we've sold 200+ vehicles and earned a reputation for being the dealership people actually trust."}
              </p>
            </div>
          </div>

          {/* Animated stats grid */}
          <div className="about-stats-grid grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <AnimatedStatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1100px] mx-auto py-16 md:py-20 px-6">
        <div className="text-center mb-12">
          <div className="team-eyebrow text-xs tracking-[0.3em] text-primary mb-3 font-semibold">
            THE PEOPLE BEHIND SAMBI TOP GEAR
          </div>
          <div className="team-title-wrap overflow-hidden">
            <h2 className="team-title-inner font-display text-4xl tracking-wide">OUR TEAM</h2>
          </div>
        </div>

        <div className="team-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((m) => (
            <div
              key={m.name}
              className="team-card border border-border bg-card p-6 md:p-8 text-center"
            >
              <div className="team-avatar w-16 h-16 rounded-full bg-secondary border-2 border-primary flex items-center justify-center mx-auto mb-5">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl tracking-wide mb-1">{m.name}</h3>
              <div className="text-xs text-primary tracking-widest mb-4 uppercase">{m.role}</div>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
