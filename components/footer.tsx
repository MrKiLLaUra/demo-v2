"use client"

import { Page } from "@/lib/car-data"

interface FooterProps {
  setPage: (page: Page) => void
}

const navLinks = [
  { label: "Home", page: "home" as Page },
  { label: "Cars", page: "inventory" as Page },
  { label: "Services", page: "services" as Page },
  { label: "About", page: "about" as Page },
  { label: "Contact", page: "contact" as Page },
]

const serviceLinks = ["Used Cars", "Car Sourcing", "Financing", "Insurance"]

const contactLinks = ["+35799929323", "sambitopgearmotors@gmail.com", "Limassol, Cyprus"]

export function Footer({ setPage }: FooterProps) {
  return (
    <footer className="border-t border-border/50 py-12 md:py-14 px-6 relative z-10">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-display text-xl tracking-widest mb-3">SAMBI TOP GEAR MOTORS</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-[260px]">
              Premium used car dealership in Limassol, Cyprus. Quality vehicles, transparent pricing, and AI-powered search.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] tracking-widest text-primary mb-4">NAVIGATION</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => setPage(link.page)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] tracking-widest text-primary mb-4">SERVICES</h4>
            <div className="flex flex-col gap-2">
              {serviceLinks.map(link => (
                <span key={link} className="text-sm text-muted-foreground">
                  {link}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-widest text-primary mb-4">CONTACT</h4>
            <div className="flex flex-col gap-2">
              {contactLinks.map(link => (
                <span key={link} className="text-sm text-muted-foreground">
                  {link}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-muted-foreground/50 tracking-wide">
          2026 SAMBI TOP GEAR MOTORS · ALL RIGHTS RESERVED
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
            <button
              onClick={() => setPage("admin")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest"
            >
              Admin Panel
            </button>
            <p className="text-xs text-primary tracking-widest">
              POWERED BY SAMBI AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
