"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CarCard } from "@/components/car-card"
import { 
  Car, fmt, MAKES, FUELS, TRANSMISSIONS, MILEAGE_RANGES, PRICE_RANGES, YEARS,
  mileageInRange, priceInRange, SortOption, sortCars
} from "@/lib/car-data"
import { 
  Search, SlidersHorizontal, ArrowUpDown, X, ChevronLeft, Calendar,
  Fuel, Settings2, Gauge, Palette, FileText, Phone, Heart, GitCompare,
  Car as CarIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

function SafeImage({
  src,
  alt,
  className,
  fallbackSize = "md",
  onClick,
}: {
  src: string
  alt: string
  className?: string
  fallbackSize?: "sm" | "md" | "lg"
  onClick?: () => void
}) {
  const [errored, setErrored] = useState(false)
  const iconSize = fallbackSize === "lg" ? "w-24 h-24" : fallbackSize === "sm" ? "w-8 h-8" : "w-12 h-12"
  if (!src || errored) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-secondary">
        <CarIcon className={cn(iconSize, "text-muted-foreground/30")} />
      </div>
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      onError={() => setErrored(true)}
      onClick={onClick}
    />
  )
}

interface InventoryPageProps {
  inventory: Car[]
  isLoading?: boolean
  favorites: number[]
  toggleFavorite: (id: number) => void
  compareList: number[]
  toggleCompare: (id: number) => void
}

interface Filters {
  make: string
  model: string
  year: string
  mileage: string
  price: string
  fuel: string
  transmission: string
}

const defaultFilters: Filters = {
  make: "",
  model: "",
  year: "",
  mileage: "",
  price: "",
  fuel: "",
  transmission: "",
}

export function InventoryPage({ 
  inventory,
  isLoading = false,
  favorites, 
  toggleFavorite,
  compareList,
  toggleCompare 
}: InventoryPageProps) {
  const scrollReveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }

  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [results, setResults] = useState<Car[]>(inventory)
  const [sortBy, setSortBy] = useState<SortOption>("year-new")
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [detailVisible, setDetailVisible] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const detailGalleryEntries = selectedCar
    ? [
        { key: "front",     label: "Front",      src: selectedCar.images?.front },
        { key: "side",      label: "Side",       src: selectedCar.images?.side },
        { key: "back",      label: "Back",       src: selectedCar.images?.back },
        { key: "interior",  label: "Interior",   src: selectedCar.images?.interior },
        { key: "frontSeats",label: "Seats",      src: selectedCar.images?.frontSeats },
        { key: "rearSeats", label: "Rear Seats", src: selectedCar.images?.rearSeats },
      ]
    : []
  const [activeGalleryImage, setActiveGalleryImage] = useState<keyof Car["images"]>("front")
  
  // Booking state
  const [bookingCar, setBookingCar] = useState<Car | null>(null)
  const [bookForm, setBookForm] = useState({ name: "", phone: "", email: "", date: "" })
  const [bookSent, setBookSent] = useState(false)

  // Source request state
  const [reqForm, setReqForm] = useState({ name: "", phone: "", note: "" })
  const [reqSent, setReqSent] = useState(false)

  const toggleFilter = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? "" : value }))
  }

  const doSearch = () => {
    const res = inventory.filter(c => {
      if (filters.make && c.make !== filters.make) return false
      if (filters.model && !c.model.toLowerCase().includes(filters.model.toLowerCase())) return false
      if (filters.year && c.year !== Number(filters.year)) return false
      if (filters.fuel && c.fuel !== filters.fuel) return false
      if (filters.transmission && c.transmission !== filters.transmission) return false
      if (filters.mileage && !mileageInRange(c.mileage, filters.mileage)) return false
      if (filters.price && c.showPrice && !priceInRange(c.price, filters.price)) return false
      return true
    })
    setResults(sortCars(res, sortBy))
    setShowFilters(false)
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
    setResults(sortCars(inventory, sortBy))
  }

  useEffect(() => {
    setResults(sortCars(inventory, sortBy))
  }, [inventory, sortBy])

  useEffect(() => {
    if (selectedCar) {
      setActiveGalleryImage("front")
    }
  }, [selectedCar])

  useEffect(() => {
    if (!selectedCar) setDetailVisible(false)
  }, [selectedCar])

  useEffect(() => {
    if (!isZoomed) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsZoomed(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isZoomed])

  const hasActiveFilters = Object.values(filters).some(v => v !== "")

  // Booking view
  if (bookingCar) {
    return (
      <div className="max-w-lg mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <Button 
          variant="ghost" 
          onClick={() => { setBookingCar(null); setBookSent(false); setBookForm({ name: "", phone: "", email: "", date: "" }) }}
          className="mb-6 text-muted-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          BACK
        </Button>

        {!bookSent ? (
          <>
            <h1 className="font-display text-3xl md:text-4xl tracking-wide mb-1">BOOK TEST DRIVE</h1>
            <p className="text-primary text-sm tracking-widest mb-8">
              {bookingCar.year} {bookingCar.make} {bookingCar.model}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">FULL NAME</label>
                <Input 
                  placeholder="John Doe" 
                  value={bookForm.name}
                  onChange={e => setBookForm(p => ({ ...p, name: e.target.value }))}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">PHONE</label>
                <Input 
                  placeholder="+357 99 000000"
                  value={bookForm.phone}
                  onChange={e => setBookForm(p => ({ ...p, phone: e.target.value }))}
                  className="bg-input border-border"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">EMAIL (OPTIONAL)</label>
                <Input 
                  placeholder="john@email.com"
                  value={bookForm.email}
                  onChange={e => setBookForm(p => ({ ...p, email: e.target.value }))}
                  className="bg-input border-border"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">PREFERRED DATE</label>
                <Input 
                  type="date"
                  value={bookForm.date}
                  onChange={e => setBookForm(p => ({ ...p, date: e.target.value }))}
                  className="bg-input border-border [color-scheme:dark]"
                />
              </div>
            </div>

            <Button 
              onClick={() => setBookSent(true)}
              disabled={!bookForm.name || !bookForm.phone || !bookForm.date}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest"
            >
              CONFIRM BOOKING
            </Button>
          </>
        ) : (
          <div className="text-center py-12 animate-in fade-in duration-500">
            <h2 className="font-display text-4xl tracking-wide text-primary mb-4">CONFIRMED</h2>
            <p className="text-muted-foreground mb-8">
              {"We've received your test drive request for the"} {bookingCar.year} {bookingCar.make} {bookingCar.model}. 
              {"We'll contact you shortly to confirm the details."}
            </p>
            <Button 
              variant="outline"
              onClick={() => { setBookingCar(null); setBookSent(false) }}
            >
              BACK TO INVENTORY
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Car detail view
  if (selectedCar) {
    return (
      <>
      <motion.div
        className="max-w-[1100px] mx-auto py-12 px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={detailVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        onAnimationComplete={() => {
          if (!detailVisible) setSelectedCar(null)
        }}
      >
        <Button 
          variant="ghost" 
          onClick={() => setDetailVisible(false)}
          className="mb-6 text-muted-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          BACK TO RESULTS
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column - Image and details */}
          <div>
            <div className="border border-border bg-card h-60 md:h-72 flex items-center justify-center mb-5 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCar.images?.[activeGalleryImage] || "gallery-fallback"}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <SafeImage
                    src={selectedCar.images?.[activeGalleryImage] ?? ""}
                    alt={`${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`}
                    className="object-cover cursor-pointer"
                    fallbackSize="lg"
                    onClick={() => setIsZoomed(true)}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-4 right-4">
                {selectedCar.showPrice ? (
                  <div className="bg-primary text-primary-foreground px-4 py-2 font-display text-xl tracking-wide">
                    {fmt(selectedCar.price!)}
                  </div>
                ) : (
                  <div className="border border-primary text-primary px-3 py-1.5 text-xs tracking-widest bg-background/80">
                    CONTACT FOR PRICE
                  </div>
                )}
              </div>

              {/* Favorite & Compare buttons */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className={cn(
                    "w-9 h-9 bg-background/80 backdrop-blur-sm hover:bg-background",
                    favorites.includes(selectedCar.id) && "text-primary"
                  )}
                  onClick={() => toggleFavorite(selectedCar.id)}
                >
                  <Heart className={cn("w-4 h-4", favorites.includes(selectedCar.id) && "fill-current")} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className={cn(
                    "w-9 h-9 bg-background/80 backdrop-blur-sm hover:bg-background",
                    compareList.includes(selectedCar.id) && "text-primary"
                  )}
                  disabled={compareList.length >= 3 && !compareList.includes(selectedCar.id)}
                  onClick={() => toggleCompare(selectedCar.id)}
                >
                  <GitCompare className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
              {detailGalleryEntries.map((image) => (
                <button
                  key={image.key}
                  type="button"
                  onClick={() => setActiveGalleryImage(image.key as keyof Car["images"])}
                  className={cn(
                    "text-left border bg-card overflow-hidden transition-colors",
                    activeGalleryImage === image.key ? "border-primary/60" : "border-border hover:border-primary/40"
                  )}
                >
                  <div className="relative h-28">
                    <SafeImage
                      src={image.src ?? ""}
                      alt={`${selectedCar.year} ${selectedCar.make} ${selectedCar.model} ${image.label}`}
                      className="object-cover"
                      fallbackSize="sm"
                    />
                  </div>
                  <div className="px-2.5 py-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground border-t border-border">
                    {image.label}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-xs text-muted-foreground tracking-widest mb-2">
              {selectedCar.year} · {selectedCar.color} · {selectedCar.condition}
            </div>
            <h1 className="font-display text-4xl md:text-5xl tracking-wide leading-none mb-4">
              {selectedCar.make}<br />{selectedCar.model}
            </h1>
            <div className="flex flex-wrap gap-2 mb-5">
              {[selectedCar.fuel, selectedCar.transmission, `${selectedCar.mileage.toLocaleString()} km`].map((t, index) => (
                <span key={index} className="text-xs text-muted-foreground border border-border px-3 py-1.5 tracking-wide">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed font-light">
              {selectedCar.description}
            </p>
          </div>

          {/* Right column - Actions */}
          <div className="flex flex-col gap-4">
            <div className="border border-border p-5 md:p-6 bg-primary/[0.02] relative flex-1">
              <div className="absolute top-0 left-6 w-10 h-0.5 bg-primary -translate-y-px" />
              <div className="text-[10px] text-primary tracking-[0.2em] mb-3">SAMBI AI SAYS</div>
              <p className="text-muted-foreground leading-relaxed">
                This {selectedCar.year} {selectedCar.make} {selectedCar.model} is a {selectedCar.condition.toLowerCase()} condition vehicle 
                with {selectedCar.mileage.toLocaleString()} km on the odometer. 
                {selectedCar.showPrice && selectedCar.price && ` Priced at ${fmt(selectedCar.price)}, it offers solid value in its class.`}
                {" Perfect for those seeking reliability and style."}
              </p>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedCar.status?.toLowerCase() === "sold"}
              onClick={() => {
                setBookingCar(selectedCar)
                setSelectedCar(null)
                setDetailVisible(false)
              }}
            >
              {selectedCar.status?.toLowerCase() === "sold" ? "VEHICLE SOLD" : "BOOK A TEST DRIVE"}
            </Button>

            {!selectedCar.showPrice && (
              <div className="border border-border p-5 bg-card">
                <p className="text-sm text-muted-foreground mb-2">Interested in the price?</p>
                <p className="text-xl text-primary font-semibold">+357 99 000 000</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {isZoomed && selectedCar.images?.[activeGalleryImage] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl mx-4 aspect-video"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedCar.images[activeGalleryImage]}
                alt={`${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </>
    )
  }

  // Main inventory view
  return (
    <div className="max-w-[1100px] mx-auto py-12 px-6">
      <motion.div className="mb-8" {...scrollReveal}>
        <div className="text-xs tracking-[0.3em] text-primary mb-2 font-semibold">OUR STOCK</div>
        <h1 className="font-display text-4xl md:text-5xl tracking-wide">FIND YOUR CAR</h1>
      </motion.div>

      {/* Mobile Filter Button + Sort */}
      <motion.div className="flex gap-3 mb-6 lg:hidden" {...scrollReveal}>
        <Sheet open={showFilters} onOpenChange={setShowFilters}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex-1 justify-start gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-auto bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {Object.values(filters).filter(v => v !== "").length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-background border-border overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="font-display tracking-wide">FILTERS</SheetTitle>
              <SheetDescription className="sr-only">
                Filter vehicles by make, model, year, fuel type, transmission, price, and mileage.
              </SheetDescription>
            </SheetHeader>
            <FilterControls 
              filters={filters} 
              setFilters={setFilters} 
              toggleFilter={toggleFilter}
              onSearch={doSearch}
              onClear={clearFilters}
            />
          </SheetContent>
        </Sheet>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
          <SelectTrigger className="w-[180px] bg-input border-border">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year-new">Newest First</SelectItem>
            <SelectItem value="year-old">Oldest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="mileage-low">Mileage: Low to High</SelectItem>
            <SelectItem value="mileage-high">Mileage: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div className="grid lg:grid-cols-[280px_1fr] gap-8" {...scrollReveal}>
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block">
          <div className="border border-border bg-card p-6 sticky top-24">
            <h2 className="font-display text-lg tracking-wide mb-6">FILTERS</h2>
            <FilterControls 
              filters={filters} 
              setFilters={setFilters}
              toggleFilter={toggleFilter} 
              onSearch={doSearch}
              onClear={clearFilters}
            />
          </div>
        </div>

        {/* Results */}
        <div>
          {/* Desktop Sort */}
          <motion.div className="hidden lg:flex items-center justify-between mb-6" {...scrollReveal}>
            <p className="text-sm text-muted-foreground tracking-wider">
              {results.length} VEHICLE{results.length !== 1 ? "S" : ""} FOUND
            </p>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[200px] bg-input border-border">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year-new">Newest First</SelectItem>
                <SelectItem value="year-old">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="mileage-low">Mileage: Low to High</SelectItem>
                <SelectItem value="mileage-high">Mileage: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="border border-border bg-card overflow-hidden">
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
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in duration-300">
              {results.map((car, index) => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  onClick={() => {
                    setSelectedCar(car)
                    setDetailVisible(true)
                  }}
                  isFavorite={favorites.includes(car.id)}
                  onToggleFavorite={() => toggleFavorite(car.id)}
                  isComparing={compareList.includes(car.id)}
                  onToggleCompare={() => toggleCompare(car.id)}
                  compareDisabled={compareList.length >= 3 && !compareList.includes(car.id)}
                  priority={index < 2}
                />
              ))}
            </div>
          ) : (
            <motion.div className="border border-border p-8 md:p-10 bg-card max-w-lg" {...scrollReveal}>
              <h2 className="font-display text-2xl tracking-wide text-primary mb-3">NOT IN STOCK</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {"We don't have that exact vehicle right now — but we can source it. Leave your details and we'll find it for you."}
              </p>

              {!reqSent ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">YOUR NAME</label>
                      <Input 
                        placeholder="John Doe"
                        value={reqForm.name}
                        onChange={e => setReqForm(p => ({ ...p, name: e.target.value }))}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">PHONE</label>
                      <Input 
                        placeholder="+357 99 000000"
                        value={reqForm.phone}
                        onChange={e => setReqForm(p => ({ ...p, phone: e.target.value }))}
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">ANY EXTRA DETAILS?</label>
                      <Input 
                        placeholder="Colour, max budget, trim level..."
                        value={reqForm.note}
                        onChange={e => setReqForm(p => ({ ...p, note: e.target.value }))}
                        className="bg-input border-border"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={() => setReqSent(true)}
                    disabled={!reqForm.name || !reqForm.phone}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest"
                  >
                    REQUEST THIS CAR
                  </Button>
                </>
              ) : (
                <p className="text-muted-foreground animate-in fade-in duration-300">
                  {"Thanks! We've received your request and will be in touch shortly to discuss sourcing your ideal vehicle."}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// Filter controls component
function FilterControls({ 
  filters, 
  setFilters,
  toggleFilter, 
  onSearch, 
  onClear 
}: {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  toggleFilter: (key: keyof Filters, value: string) => void
  onSearch: () => void
  onClear: () => void
}) {
  return (
    <div className="flex flex-col gap-5 mt-4 lg:mt-0">
      {/* Make */}
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">MAKE</label>
        <Select value={filters.make || "all"} onValueChange={v => setFilters(p => ({ ...p, make: v === "all" ? "" : v }))}>
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder="Any make" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any make</SelectItem>
            {MAKES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Model */}
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">MODEL</label>
        <Input 
          placeholder="e.g. Golf, A4, 320i..."
          value={filters.model}
          onChange={e => setFilters(p => ({ ...p, model: e.target.value }))}
          className="bg-input border-border"
        />
      </div>

      {/* Year */}
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">YEAR</label>
        <Select value={filters.year || "all"} onValueChange={v => setFilters(p => ({ ...p, year: v === "all" ? "" : v }))}>
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder="Any year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any year</SelectItem>
            {YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">FUEL TYPE</label>
        <div className="flex flex-wrap gap-2">
          {FUELS.map(f => (
            <button
              key={f}
              onClick={() => toggleFilter("fuel", f)}
              className={cn(
                "px-3 py-1.5 text-xs border transition-colors",
                filters.fuel === f 
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:border-muted-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">TRANSMISSION</label>
        <div className="flex flex-wrap gap-2">
          {TRANSMISSIONS.map(t => (
            <button
              key={t}
              onClick={() => toggleFilter("transmission", t)}
              className={cn(
                "px-3 py-1.5 text-xs border transition-colors",
                filters.transmission === t 
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:border-muted-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">PRICE RANGE</label>
        <Select value={filters.price || "all"} onValueChange={v => setFilters(p => ({ ...p, price: v === "all" ? "" : v }))}>
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder="Any price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any price</SelectItem>
            {PRICE_RANGES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Mileage */}
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">MILEAGE</label>
        <Select value={filters.mileage || "all"} onValueChange={v => setFilters(p => ({ ...p, mileage: v === "all" ? "" : v }))}>
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder="Any mileage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any mileage</SelectItem>
            {MILEAGE_RANGES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <Button 
          onClick={onSearch}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest"
        >
          SEARCH
        </Button>
        <Button 
          variant="outline"
          onClick={onClear}
          className="px-4"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
