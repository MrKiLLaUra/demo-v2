"use client"

import { Search, FileText, Users, Zap, Shield, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const reasons = [
  { 
    icon: Search, 
    title: "AI-Powered Search", 
    desc: "Our exclusive AI pricing engine gives you instant market estimates and can source any vehicle you want — even if it's not in stock." 
  },
  { 
    icon: FileText, 
    title: "Full Transparency", 
    desc: "Every car comes with documented history and honest condition grading. No hidden surprises. No inflated prices." 
  },
  { 
    icon: Users, 
    title: "We Source For You", 
    desc: "Can't find your dream car in our inventory? Tell us exactly what you want and we'll find it, import it, and give you a competitive price." 
  },
  { 
    icon: Zap, 
    title: "Fast & Easy Process", 
    desc: "Browse online, get an AI quote, book a test drive. The whole process from search to keys can take less than 48 hours." 
  },
  { 
    icon: Shield, 
    title: "Vetted Vehicles Only", 
    desc: "Every car undergoes our 100-point inspection before it hits our lot. If it doesn't pass, it doesn't go up." 
  },
  { 
    icon: MapPin, 
    title: "Local Experts", 
    desc: "Based in Limassol, we know the Cyprus market inside out. We speak your language and we're always reachable." 
  },
]

export function WhyUs() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
    viewport: { once: true },
  }

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }

  return (
    <motion.section className="border-t border-border/50 bg-card/50 py-16 md:py-20 px-6" {...fadeInUp}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-14"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <motion.div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold" variants={staggerItem}>
            THE SAMBI TOP GEAR DIFFERENCE
          </motion.div>
          <motion.h2 className="font-display text-4xl md:text-5xl tracking-wide" variants={staggerItem}>
            WHY CHOOSE US
          </motion.h2>
        </motion.div>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {reasons.map(r => (
            <motion.div
              key={r.title}
              className="border border-border bg-card p-6 md:p-7 transition-colors hover:border-border/80"
              variants={staggerItem}
            >
              <r.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-xl tracking-wide mb-3">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
