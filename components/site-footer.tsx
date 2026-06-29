"use client"

import Link from "next/link"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"

const NAV = [
  { href: "/",         label: "Home" },
  { href: "/cars",     label: "Browse Cars" },
  { href: "/services", label: "Services" },
  { href: "/about",    label: "About Us" },
  { href: "/contact",  label: "Contact" },
]

const SERVICES = [
  { label: "Used Car Sales",      href: "/services/used-car-sales" },
  { label: "Vehicle Sourcing",    href: "/services/vehicle-sourcing" },
  { label: "Financing",           href: "/services/financing" },
  { label: "Warranty & After-Sale", href: "/services/warranty" },
  { label: "Pre-Sale Inspection", href: "/services/pre-sale-inspection" },
  { label: "AI Price Engine",     href: "/services/ai-price-engine" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="relative overflow-hidden mb-5" style={{ width: 200, height: 44 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sambi-logo.png" alt="Sambi Top Gear" style={{ position: "absolute", width: 200, top: -68, mixBlendMode: "screen" }} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-[240px]">
              Premium used car dealership in Limassol, Cyprus. Hand-picked vehicles, transparent pricing, AI-powered search.
            </p>
            <a
              href="https://wa.me/35799929323"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 text-xs tracking-widest font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              CHAT ON WHATSAPP
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] text-primary mb-5 font-semibold">NAVIGATION</h4>
            <ul className="flex flex-col gap-2.5">
              {NAV.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] text-primary mb-5 font-semibold">SERVICES</h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map(s => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] text-primary mb-5 font-semibold">CONTACT</h4>
            <ul className="flex flex-col gap-4">
              {[
                { Icon: Phone, text: "+357 99 929 323", href: "tel:+35799929323" },
                { Icon: Mail, text: "sambitopgearmotors@gmail.com", href: "mailto:sambitopgearmotors@gmail.com" },
                { Icon: MapPin, text: "Petrombei Mavromichali 3, Agios Athanasios 4102, Limassol", href: "https://maps.google.com/maps?q=Petrombei%20Mavromichali%203%2C%20Agios%20Athanasios%204102%2C%20Cyprus" },
              ].map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {href ? (
                    <a href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{text}</a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-border mt-12 pt-8 flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-muted-foreground/60 hover:text-foreground tracking-wide transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
            className="text-xs text-muted-foreground/60 hover:text-foreground tracking-wide transition-colors"
          >
            Cookie Settings
          </button>
        </div>

        <div className="mt-6 pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-muted-foreground/50 tracking-wide">
            © 2026 SAMBI TOP GEAR MOTORS · ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-primary/70 tracking-widest">POWERED BY SAMBI AI</p>
            <span className="text-muted-foreground/30">·</span>
            <a
              href="https://limen-studios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/40 hover:text-muted-foreground/70 tracking-widest transition-colors"
            >
              BUILT BY LIMEN STUDIO
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
