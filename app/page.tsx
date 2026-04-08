"use client"
// Main website: Sambi Top Gear Motors
// Hero text: Welcome to Sambi Top Gear Motors, based in Limassol

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HomePage } from "@/components/home-page"
import { InventoryPage } from "@/components/inventory-page"
import { ServicesPage } from "@/components/services-page"
import { AboutPage } from "@/components/about-page"
import { ContactPage } from "@/components/contact-page"
import { Footer } from "@/components/footer"
import { CompareDrawer } from "@/components/compare-drawer"
import { FavoritesDrawer } from "@/components/favorites-drawer"
import { Car, Page, fetchCars, loadFavorites, saveFavorites } from "@/lib/car-data"

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [inventory, setInventory] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<number[]>([])
  const [compareList, setCompareList] = useState<number[]>([])
  const [showCompare, setShowCompare] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    const initInventory = async () => {
      try {
        const inv = await fetchCars()
        console.log('RAW SUPABASE DATA:', inv)
        setInventory(inv)
      } finally {
        setIsLoading(false)
      }
    }

    void initInventory()
    setFavorites(loadFavorites())
  }, [])

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(f => f !== id)
      : [...favorites, id]
    setFavorites(newFavorites)
    saveFavorites(newFavorites)
  }

  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(c => c !== id))
    } else if (compareList.length < 3) {
      setCompareList([...compareList, id])
    }
  }

  const favoriteCars = inventory.filter(car => favorites.includes(car.id))
  const compareCars = inventory.filter(car => compareList.includes(car.id))

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(227,31,43,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(227,31,43,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <Navigation 
        page={page} 
        setPage={setPage} 
        favoritesCount={favorites.length}
        compareCount={compareList.length}
        onShowFavorites={() => setShowFavorites(true)}
        onShowCompare={() => setShowCompare(true)}
      />

      <main id="main-content" className="relative z-10">
        {page === "home" && (
          <HomePage 
            setPage={setPage} 
            inventory={inventory}
            isLoading={isLoading}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            compareList={compareList}
            toggleCompare={toggleCompare}
          />
        )}
        {page === "inventory" && (
          <InventoryPage 
            inventory={inventory}
            isLoading={isLoading}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            compareList={compareList}
            toggleCompare={toggleCompare}
          />
        )}
        {page === "services" && <ServicesPage setPage={setPage} />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage />}
      </main>

      <Footer setPage={setPage} />

      <CompareDrawer 
        open={showCompare}
        onOpenChange={setShowCompare}
        cars={compareCars}
        onRemove={toggleCompare}
        onClear={() => setCompareList([])}
      />

      <FavoritesDrawer 
        open={showFavorites}
        onOpenChange={setShowFavorites}
        cars={favoriteCars}
        onRemove={toggleFavorite}
        onViewCar={() => {
          setShowFavorites(false)
          setPage("inventory")
        }}
      />
    </div>
  )
}
