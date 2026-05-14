"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Search, FileText, Users, Zap, Shield, MapPin } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    icon: Search,
    title: "AI-Powered Search",
    desc: "Our exclusive AI pricing engine gives you instant market estimates and can source any vehicle you want — even if it's not in stock.",
  },
  {
    icon: FileText,
    title: "Full Transparency",
    desc: "Every car comes with documented history and honest condition grading. No hidden surprises. No inflated prices.",
  },
  {
    icon: Users,
    title: "We Source For You",
    desc: "Can't find your dream car in our inventory? Tell us exactly what you want and we'll find it, import it, and give you a competitive price.",
  },
  {
    icon: Zap,
    title: "Fast & Easy Process",
    desc: "Browse online, get an AI quote, book a test drive. The whole process from search to keys can take less than 48 hours.",
  },
  {
    icon: Shield,
    title: "Vetted Vehicles Only",
    desc: "Every car undergoes our 100-point inspection before it hits our lot. If it doesn't pass, it doesn't go up.",
  },
  {
    icon: MapPin,
    title: "Local Experts",
    desc: "Based in Limassol, we know the Cyprus market inside out. We speak your language and we're always reachable.",
  },
]

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow slides in from left
      gsap.from(".why-eyebrow", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".why-eyebrow", start: "top 88%" },
      })

      // Title masked slide-up
      gsap.from(".why-title-inner", {
        y: "110%",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".why-title-wrap", start: "top 88%" },
      })

      // Cards stagger with scale
      gsap.from(".why-card", {
        y: 70,
        opacity: 0,
        scale: 0.96,
        stagger: { each: 0.1, from: "start" },
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: ".why-grid", start: "top 82%" },
      })

      // Icons spring in slightly after cards
      gsap.from(".why-icon", {
        scale: 0,
        rotation: -20,
        stagger: { each: 0.08, from: "start" },
        duration: 0.55,
        ease: "back.out(2.5)",
        scrollTrigger: { trigger: ".why-grid", start: "top 82%" },
        delay: 0.25,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="border-t border-border/50 bg-card/50 py-16 md:py-20 px-6"
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12 md:mb-14">
          <div className="why-eyebrow text-xs tracking-[0.3em] text-primary mb-3 font-semibold">
            THE SAMBI TOP GEAR DIFFERENCE
          </div>
          <div className="why-title-wrap overflow-hidden">
            <h2 className="why-title-inner font-display text-4xl md:text-5xl tracking-wide">
              WHY CHOOSE US
            </h2>
          </div>
        </div>

        <div className="why-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="why-card border border-border bg-card p-6 md:p-7 transition-colors hover:border-primary/50"
            >
              <r.icon className="why-icon w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-xl tracking-wide mb-3">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
