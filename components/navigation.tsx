"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Heart, GitCompare, X } from "lucide-react"
import { Page } from "@/lib/car-data"
import { AnimatePresence, motion } from "framer-motion"

interface NavigationProps {
  page: Page
  setPage: (page: Page) => void
  favoritesCount: number
  compareCount: number
  onShowFavorites: () => void
  onShowCompare: () => void
}

const navItems: { key: Page; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "inventory", label: "Cars" },
  { key: "services", label: "Services" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
]

const mobileMenuVariants = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      mass: 0.9,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    y: -24,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
} as const

const mobileMenuItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.16, ease: "easeIn" } },
} as const

export function Navigation({ 
  page, 
  setPage, 
  favoritesCount, 
  compareCount,
  onShowFavorites,
  onShowCompare,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  
  const navigateWithScrollReset = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })

    const mainScrollable =
      document.getElementById("main-content") ??
      document.querySelector<HTMLElement>("main") ??
      document.querySelector<HTMLElement>("[data-scroll-container]") ??
      document.querySelector<HTMLElement>(".overflow-y-auto")

    if (mainScrollable) {
      mainScrollable.scrollTop = 0
    }
  }

  const handleNavClick = (p: Page) => {
    navigateWithScrollReset(p)
    setMobileOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <button 
          onClick={() => navigateWithScrollReset("home")}
          className="flex items-center gap-3 select-none group"
        >
          <div className="flex flex-col gap-1">
            <div className="w-6 h-0.5 bg-primary transition-all group-hover:w-8" />
            <div className="w-4 h-0.5 bg-primary/40 transition-all group-hover:w-6" />
          </div>
          <div>
            <div className="font-display text-lg md:text-xl tracking-[0.35em] leading-none">SAMBI TOP GEAR</div>
            <div className="text-[10px] tracking-[0.3em] text-primary font-semibold">MOTORS · LIMASSOL</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => navigateWithScrollReset(item.key)}
              className={`text-xs tracking-[0.2em] uppercase transition-colors ${
                page === item.key 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onShowFavorites}
              className="relative"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onShowCompare}
              className="relative"
            >
              <GitCompare className="w-4 h-4" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Button>
            
            <Button 
              onClick={() => navigateWithScrollReset("inventory")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs tracking-widest px-5 ml-2"
            >
              VIEW CARS
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onShowFavorites}
            className="relative"
          >
            <Heart className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onShowCompare}
            className="relative"
          >
            <GitCompare className="w-4 h-4" />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black h-screen w-screen flex flex-col items-center justify-center space-y-8"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
              aria-label="Close mobile menu"
            >
              <X className="w-8 h-8" />
            </button>

            {navItems.map(item => (
              <motion.button
                key={item.key}
                variants={mobileMenuItemVariants}
                onClick={() => handleNavClick(item.key)}
                className={`text-white text-3xl font-semibold text-center transition-colors hover:text-primary ${
                  page === item.key ? "text-primary" : "text-white"
                }`}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.div variants={mobileMenuItemVariants}>
              <Button
                onClick={() => handleNavClick("inventory")}
                className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm tracking-[0.2em] px-8 py-6"
              >
                VIEW CARS
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
