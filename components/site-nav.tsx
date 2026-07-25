"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Menu, X, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFavorites } from "@/components/favorites-provider"

const LINKS = [
  { href: "/",         label: "Home" },
  { href: "/cars",     label: "Cars" },
  { href: "/services", label: "Services" },
  { href: "/about",    label: "About" },
  { href: "/contact",  label: "Contact" },
]

export function SiteNav() {
  const pathname = usePathname()
  const { favorites, setDrawerOpen } = useFavorites()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const solid = scrolled || !isHome || mobileOpen

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          solid
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 h-16 md:h-18 flex items-center justify-between">
          {/* Logo */}
          <Link id="site-nav-logo" href="/" className="block relative overflow-hidden shrink-0" style={{ width: 200, height: 44 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sambi-logo.png"
              alt="Sambi Top Gear"
              style={{ position: "absolute", width: 200, top: -68, mixBlendMode: "screen" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map(link => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[11px] tracking-[0.22em] transition-colors font-medium",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label.toUpperCase()}
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/35799929323"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-[11px] tracking-[0.18em] font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WHATSAPP
            </a>

            <button
              onClick={() => setDrawerOpen(true)}
              className="relative w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Favourites"
            >
              <Heart className="w-4.5 h-4.5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background flex flex-col pt-16 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
          mobileOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col px-8 pt-10 gap-1">
          {LINKS.map((link, i) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-display text-5xl tracking-wide py-3 border-b border-border/50 transition-all duration-500",
                  active ? "text-primary" : "text-foreground/70 hover:text-foreground",
                  mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                )}
                style={{ transitionDelay: mobileOpen ? `${120 + i * 60}ms` : "0ms" }}
              >
                {link.label.toUpperCase()}
              </Link>
            )
          })}
        </nav>
        <div
          className={cn(
            "px-8 mt-10 transition-all duration-500",
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: mobileOpen ? "440ms" : "0ms" }}
        >
          <a
            href="https://wa.me/35799929323"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 font-display text-xl tracking-widest"
          >
            <MessageCircle className="w-5 h-5" />
            WHATSAPP US
          </a>
        </div>
      </div>
    </>
  )
}
