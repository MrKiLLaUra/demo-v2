"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { SlidersHorizontal, ArrowUpDown, X, Search, Car as CarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  Car, fmt, carSlug, sortCars, mileageInRange, priceInRange,
  MAKES, FUELS, TRANSMISSIONS, MILEAGE_RANGES, PRICE_RANGES, YEARS, SortOption
} from "@/lib/car-data"
import { useFavorites } from "@/components/favorites-provider"
import { cn } from "@/lib/utils"
import { Heart, MessageCircle } from "lucide-react"
import { CarLoadingScreen } from "@/components/car-loading-screen"

const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFgABAQEAAAAAAAAAAAAAAAAABQQD/8QAFRABAQAAAAAAAAAAAAAAAAAAAAn/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aqt0AAAAB/9k="

interface Filters {
  make: string; model: string; year: string
  mileage: string; price: string; fuel: string; transmission: string
}

const DEFAULT: Filters = { make:"",model:"",year:"",mileage:"",price:"",fuel:"",transmission:"" }

function CarCardItem({ car, onNavigate }: { car: Car; onNavigate: (car: Car) => void }) {
  const { toggle, isFavorite } = useFavorites()
  const [imgErr, setImgErr] = useState(false)
  const isSold = car.status?.toLowerCase().trim() === "sold"
  const priceVisible = car.showPrice === true && car.price !== null

  return (
    <div className="group border border-border bg-card hover:border-primary/50 hover:shadow-[0_8px_32px_rgba(227,31,43,0.08)] transition-all duration-300 overflow-hidden">
      <button onClick={() => onNavigate(car)} className="block w-full text-left">
        <div className="relative h-44 md:h-48 bg-secondary overflow-hidden">
          {car.images?.preview && !imgErr ? (
            <Image
              src={car.images.preview}
              alt={`${car.year} ${car.make} ${car.model}`}
              fill
              sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
              quality={65}
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <CarIcon className="w-14 h-14 text-muted-foreground/20" />
            </div>
          )}
          {isSold && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="rotate-[-28deg] font-display text-4xl tracking-widest text-primary border-2 border-primary/70 px-4 py-1 bg-black/60">SOLD</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            {priceVisible ? (
              <span className="bg-primary text-primary-foreground px-3 py-1.5 font-display text-sm tracking-wide">{fmt(car.price!)}</span>
            ) : (
              <span className="border border-primary/70 text-primary px-2.5 py-1 text-[10px] tracking-widest bg-background/80 backdrop-blur-sm">POA</span>
            )}
          </div>
        </div>
        <div className="p-4 md:p-5">
          <div className="text-[10px] text-muted-foreground tracking-widest mb-1">{car.year} · {car.condition.toUpperCase()}</div>
          <h3 className="font-display text-xl md:text-2xl tracking-wide mb-3 leading-none">{car.make} {car.model}</h3>
          <div className="flex flex-wrap gap-1.5">
            {[car.fuel, car.transmission, `${car.mileage.toLocaleString()} km`].map(t => (
              <span key={t} className="text-[10px] text-muted-foreground border border-border px-2.5 py-1 tracking-wide">{t}</span>
            ))}
          </div>
        </div>
      </button>
      {/* Quick actions */}
      <div className="flex border-t border-border divide-x divide-border">
        <button
          onClick={() => toggle(car.id)}
          className={cn("flex-1 py-2.5 flex items-center justify-center gap-1.5 text-[10px] tracking-widest transition-colors hover:bg-secondary/50",
            isFavorite(car.id) ? "text-primary" : "text-muted-foreground")}
        >
          <Heart className={cn("w-3.5 h-3.5", isFavorite(car.id) && "fill-current")} />
          {isFavorite(car.id) ? "SAVED" : "SAVE"}
        </button>
        {!isSold && (
          <a
            href={`https://wa.me/35799929323?text=${encodeURIComponent(`Hi, I'm interested in the ${car.year} ${car.make} ${car.model}. Is it still available?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-[10px] tracking-widest text-muted-foreground hover:text-[#25D366] hover:bg-secondary/50 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            ENQUIRE
          </a>
        )}
      </div>
    </div>
  )
}

function FilterPanel({
  filters, setFilters, onSearch, onClear
}: {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  onSearch: () => void
  onClear: () => void
}) {
  const toggle = (key: keyof Filters, value: string) =>
    setFilters(p => ({ ...p, [key]: p[key] === value ? "" : value }))

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">MAKE</label>
        <Select value={filters.make || "all"} onValueChange={v => setFilters(p => ({ ...p, make: v === "all" ? "" : v }))}>
          <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Any make" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any make</SelectItem>
            {MAKES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">MODEL</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input placeholder="e.g. Golf, X5, A4..." value={filters.model} onChange={e => setFilters(p => ({ ...p, model: e.target.value }))} className="bg-input border-border pl-9" />
        </div>
      </div>
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">YEAR</label>
        <Select value={filters.year || "all"} onValueChange={v => setFilters(p => ({ ...p, year: v === "all" ? "" : v }))}>
          <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Any year" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any year</SelectItem>
            {YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">FUEL TYPE</label>
        <div className="flex flex-wrap gap-2">
          {FUELS.map(f => (
            <button key={f} onClick={() => toggle("fuel", f)} className={cn("px-3 py-1.5 text-xs border transition-colors", filters.fuel === f ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:border-muted-foreground")}>{f}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">TRANSMISSION</label>
        <div className="flex flex-wrap gap-2">
          {TRANSMISSIONS.map(t => (
            <button key={t} onClick={() => toggle("transmission", t)} className={cn("px-3 py-1.5 text-xs border transition-colors", filters.transmission === t ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:border-muted-foreground")}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">PRICE RANGE</label>
        <Select value={filters.price || "all"} onValueChange={v => setFilters(p => ({ ...p, price: v === "all" ? "" : v }))}>
          <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Any price" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any price</SelectItem>
            {PRICE_RANGES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">MILEAGE</label>
        <Select value={filters.mileage || "all"} onValueChange={v => setFilters(p => ({ ...p, mileage: v === "all" ? "" : v }))}>
          <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Any mileage" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any mileage</SelectItem>
            {MILEAGE_RANGES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-3 pt-2">
        <Button onClick={onSearch} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest">SEARCH</Button>
        <Button variant="outline" onClick={onClear} className="px-4"><X className="w-4 h-4" /></Button>
      </div>
    </div>
  )
}

export function CarsClient({ initialCars }: { initialCars: Car[] }) {
  const router = useRouter()
  const [filters, setFilters] = useState<Filters>(DEFAULT)
  const [sortBy, setSortBy] = useState<SortOption>("year-new")
  const [results, setResults] = useState<Car[]>(() => sortCars(initialCars, "year-new"))
  const [searched, setSearched] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [reqForm, setReqForm] = useState({ name: "", phone: "", note: "" })
  const [reqSent, setReqSent] = useState(false)
  const [reqLoading, setReqLoading] = useState(false)
  const [loadingCar, setLoadingCar] = useState<Car | null>(null)

  const handleNavigate = useCallback(async (car: Car) => {
    setLoadingCar(car)
    const imageSrcs = [car.images?.front, car.images?.side, car.images?.preview].filter(Boolean) as string[]
    const minWait = new Promise<void>(r => setTimeout(r, 1800))
    const imgLoad = Promise.race([
      Promise.all(imageSrcs.map(src => new Promise<void>(res => {
        const img = new window.Image(); img.onload = img.onerror = () => res(); img.src = src
      }))),
      new Promise<void>(r => setTimeout(r, 4000)),
    ])
    await Promise.all([minWait, imgLoad])
    setLoadingCar(null)
    setTimeout(() => router.push(`/cars/${carSlug(car)}`), 320)
  }, [router])

  const activeFilterCount = Object.values(filters).filter(v => v !== "").length

  const doSearch = useCallback(() => {
    const res = initialCars.filter(c => {
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
    setSearched(true)
    setSheetOpen(false)
  }, [filters, sortBy, initialCars])

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT)
    setResults(sortCars(initialCars, sortBy))
    setSearched(false)
  }, [sortBy, initialCars])

  const handleSortChange = (v: string) => {
    setSortBy(v as SortOption)
    setResults(prev => sortCars(prev, v as SortOption))
  }

  const submitRequest = async () => {
    if (!reqForm.name || !reqForm.phone) return
    setReqLoading(true)
    try {
      await fetch("/api/car-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reqForm, filters }),
      })
      setReqSent(true)
    } catch {
      setReqSent(true)
    } finally {
      setReqLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Page header */}
      <div className="border-b border-border bg-card py-12 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">OUR STOCK</div>
          <h1 className="font-display text-5xl md:text-6xl tracking-wide">FIND YOUR CAR</h1>
          <p className="text-muted-foreground mt-2 font-light">{initialCars.length} vehicles available</p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-10">
        <div className="grid lg:grid-cols-[300px_1fr] gap-10">

          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <div className="border border-border bg-card p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg tracking-wide">FILTERS</h2>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-[10px] tracking-widest text-primary hover:text-primary/70 transition-colors">CLEAR ALL</button>
                )}
              </div>
              <FilterPanel filters={filters} setFilters={setFilters} onSearch={doSearch} onClear={clearFilters} />
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              {/* Mobile: filter button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSheetOpen(true)}
                  className="lg:hidden flex items-center gap-2 border border-border px-4 py-2.5 text-xs tracking-widest hover:border-primary/50 transition-colors relative"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  FILTERS
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-bold">{activeFilterCount}</span>
                  )}
                </button>
                <p className="text-sm text-muted-foreground tracking-wide hidden sm:block">
                  {results.length} VEHICLE{results.length !== 1 ? "S" : ""}
                </p>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[200px] bg-input border-border">
                  <ArrowUpDown className="w-3.5 h-3.5 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year-new">Newest First</SelectItem>
                  <SelectItem value="year-old">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low → High</SelectItem>
                  <SelectItem value="price-high">Price: High → Low</SelectItem>
                  <SelectItem value="mileage-low">Mileage: Low → High</SelectItem>
                  <SelectItem value="mileage-high">Mileage: High → Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {results.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {results.map(car => <CarCardItem key={car.id} car={car} onNavigate={handleNavigate} />)}
              </div>
            ) : (
              <div className="border border-border bg-card p-8 md:p-10 max-w-lg">
                <div className="text-[10px] tracking-[0.3em] text-primary mb-3 font-semibold">NOT IN STOCK</div>
                <h2 className="font-display text-2xl tracking-wide mb-3">WE CAN SOURCE IT</h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-light">
                  {`We don't have that exact car right now — but we source vehicles across Europe. Leave your details and we'll find it.`}
                </p>
                {!reqSent ? (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">YOUR NAME</label>
                        <Input placeholder="John Doe" value={reqForm.name} onChange={e => setReqForm(p => ({ ...p, name: e.target.value }))} className="bg-input border-border" />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">PHONE</label>
                        <Input placeholder="+357 99 000000" value={reqForm.phone} onChange={e => setReqForm(p => ({ ...p, phone: e.target.value }))} className="bg-input border-border" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">EXTRA DETAILS</label>
                        <Input placeholder="Colour, max budget, spec..." value={reqForm.note} onChange={e => setReqForm(p => ({ ...p, note: e.target.value }))} className="bg-input border-border" />
                      </div>
                    </div>
                    <Button onClick={submitRequest} disabled={!reqForm.name || !reqForm.phone || reqLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest">
                      {reqLoading ? "SENDING..." : "REQUEST THIS CAR"}
                    </Button>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    ✓ Request received. We will be in touch shortly.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <CarLoadingScreen car={loadingCar} />

      {/* Mobile filter sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="left" className="w-[300px] bg-background border-border overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="font-display tracking-wide">FILTERS</SheetTitle>
            <SheetDescription className="sr-only">Filter vehicles</SheetDescription>
          </SheetHeader>
          <FilterPanel filters={filters} setFilters={setFilters} onSearch={doSearch} onClear={clearFilters} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
