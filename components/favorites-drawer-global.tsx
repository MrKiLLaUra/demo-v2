"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Heart, Car as CarIcon } from "lucide-react"
import { useFavorites } from "@/components/favorites-provider"
import { fetchCars, fmt, Car } from "@/lib/car-data"
import { cn } from "@/lib/utils"
import { carSlug } from "@/lib/car-data"

export function FavoritesDrawerGlobal() {
  const { favorites, toggle, isFavorite, drawerOpen, setDrawerOpen } = useFavorites()
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    fetchCars().then(setCars).catch(() => {})
  }, [])

  const favCars = cars.filter(c => favorites.includes(c.id))

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [drawerOpen])

  if (!drawerOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => setDrawerOpen(false)}
      />
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-card border-l border-border flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <div className="font-display text-xl tracking-wide">SAVED CARS</div>
            <div className="text-xs text-muted-foreground">{favCars.length} vehicle{favCars.length !== 1 ? 's' : ''}</div>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {favCars.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <Heart className="w-12 h-12 text-border mb-4" />
              <p className="font-display text-xl tracking-wide mb-2">NO SAVED CARS</p>
              <p className="text-sm text-muted-foreground">Click the heart icon on any car to save it here.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {favCars.map(car => (
                <li key={car.id} className="flex gap-4 p-4 hover:bg-secondary/40 transition-colors">
                  <Link
                    href={`/cars/${carSlug(car)}`}
                    onClick={() => setDrawerOpen(false)}
                    className="relative w-20 h-16 shrink-0 bg-secondary overflow-hidden"
                  >
                    {car.images?.preview ? (
                      <Image src={car.images.preview} alt={`${car.year} ${car.make} ${car.model}`} fill className="object-cover" sizes="80px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CarIcon className="w-8 h-8 text-muted-foreground/30" />
                      </div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-muted-foreground tracking-widest mb-0.5">{car.year}</div>
                    <Link
                      href={`/cars/${carSlug(car)}`}
                      onClick={() => setDrawerOpen(false)}
                      className="font-display text-lg tracking-wide leading-none hover:text-primary transition-colors block truncate"
                    >
                      {car.make} {car.model}
                    </Link>
                    {car.showPrice && car.price !== null && (
                      <div className="text-sm text-primary mt-1">{fmt(car.price)}</div>
                    )}
                  </div>
                  <button
                    onClick={() => toggle(car.id)}
                    className={cn("shrink-0 w-8 h-8 flex items-center justify-center transition-colors", isFavorite(car.id) ? "text-primary" : "text-muted-foreground hover:text-foreground")}
                  >
                    <Heart className={cn("w-4 h-4", isFavorite(car.id) && "fill-current")} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {favCars.length > 0 && (
          <div className="p-4 border-t border-border">
            <Link
              href="/cars"
              onClick={() => setDrawerOpen(false)}
              className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-display tracking-widest text-sm transition-colors"
            >
              BROWSE ALL CARS
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
