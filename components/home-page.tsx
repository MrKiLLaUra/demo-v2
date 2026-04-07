"use client"

import { Button } from "@/components/ui/button"
import { CarCard } from "@/components/car-card"
import { WhyUs } from "@/components/why-us"
import { Car, Page } from "@/lib/car-data"
import { motion } from "framer-motion"

interface HomePageProps {
  setPage: (page: Page) => void
  inventory: Car[]
  isLoading?: boolean
  favorites: number[]
  toggleFavorite: (id: number) => void
  compareList: number[]
  toggleCompare: (id: number) => void
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

export function HomePage({ 
  setPage, 
  inventory,
  isLoading = false,
  favorites, 
  toggleFavorite,
  compareList,
  toggleCompare 
}: HomePageProps) {
  const featured = inventory.slice(0, 3)
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
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
    viewport: { once: true },
  }

  const staggerItem = {
    initial: { opacity: 0, x: -24, y: 14 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }

  return (
    <div>
      {/* Hero */}
      <motion.section
        className="min-h-[92vh] flex items-center justify-center relative overflow-hidden border-b border-border/50"
        {...fadeInUp}
      >
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(227,31,43,0.07)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Big background text */}
        <div className="absolute font-display text-[18vw] md:text-[22vw] tracking-[-0.02em] text-foreground/[0.015] select-none whitespace-nowrap leading-none">
          SAMBI TOP GEAR MOTORS
        </div>
        
        <motion.div
          className="text-center relative z-10 px-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <motion.div
            className="text-xs md:text-sm tracking-[0.4em] text-primary mb-5 font-semibold"
            variants={staggerItem}
          >
            LIMASSOL · CYPRUS · EST. 2019
          </motion.div>
          <motion.h1
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[110px] tracking-[0.05em] leading-[0.9] mb-7"
            variants={staggerItem}
          >
            SAMBI TOP GEAR<br />
            <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">MOTORS</span><br />
            LIMASSOL
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed font-light"
            variants={staggerItem}
          >
            We are the premier dealership in Limassol, with hand-picked vehicles, instant AI pricing estimates, and easy test-drive booking in one place.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={staggerItem}>
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
          </motion.div>
          
          {/* Stats row */}
          <motion.div className="flex flex-wrap gap-8 md:gap-12 justify-center mt-16 md:mt-20" variants={staggerItem}>
            {[
              ["200+", "Cars Sold"],
              ["7+", "Years Experience"],
              ["100%", "Transparent Pricing"],
              ["24/7", "AI Assistant"],
            ].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="font-display text-3xl md:text-4xl tracking-wide text-primary">{n}</div>
                <div className="text-[10px] md:text-xs text-muted-foreground tracking-[0.15em] mt-1 uppercase">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

    

      {/* Featured Cars */}
      <motion.section className="py-16 md:py-20 px-6" {...fadeInUp}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div variants={staggerItem}>
              <div className="text-xs tracking-[0.3em] text-primary mb-2 font-semibold">HAND-PICKED</div>
              <h2 className="font-display text-3xl md:text-4xl tracking-wide">FEATURED CARS</h2>
            </motion.div>
            <motion.div variants={staggerItem}>
              <Button 
              variant="ghost" 
              onClick={() => setPage("inventory")}
              className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground w-fit"
            >
              VIEW ALL
            </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {isLoading
              ? [0, 1, 2].map((i) => (
                  <motion.div key={i} variants={staggerItem}>
                    <CarCardSkeleton />
                  </motion.div>
                ))
              : featured.map((car, index) => (
                  <motion.div key={car.id} variants={staggerItem}>
                    <CarCard 
                      car={car} 
                      onClick={() => setPage("inventory")}
                      isFavorite={favorites.includes(car.id)}
                      onToggleFavorite={() => toggleFavorite(car.id)}
                      isComparing={compareList.includes(car.id)}
                      onToggleCompare={() => toggleCompare(car.id)}
                      compareDisabled={compareList.length >= 3 && !compareList.includes(car.id)}
                      priority={index < 2}
                    />
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </motion.section>

      <WhyUs />
    </div>
  )
}
