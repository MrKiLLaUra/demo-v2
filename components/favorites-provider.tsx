"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { loadFavorites, saveFavorites } from "@/lib/car-data"

interface FavoritesContextValue {
  favorites: number[]
  toggle: (id: number) => void
  isFavorite: (id: number) => boolean
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: [],
  toggle: () => {},
  isFavorite: () => false,
  drawerOpen: false,
  setDrawerOpen: () => {},
})

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setFavorites(loadFavorites())
  }, [])

  const toggle = useCallback((id: number) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      saveFavorites(next)
      return next
    })
  }, [])

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites])

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite, drawerOpen, setDrawerOpen }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
