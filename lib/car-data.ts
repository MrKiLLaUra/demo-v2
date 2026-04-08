import { supabase } from "@/lib/supabase"

export interface Car {
  id: number
  make: string
  model: string
  year: number
  mileage: number
  fuel: string
  transmission: string
  price: number | null
  showPrice?: boolean
  condition: string
  color: string
  description: string
  status?: string
  images: {
    preview: string
    front: string
    side: string
    back: string
    interior: string
    frontSeats: string
    rearSeats: string
  }
}

export type Page = "home" | "inventory" | "services" | "about" | "contact"

export type SortOption = "price-low" | "price-high" | "year-new" | "year-old" | "mileage-low" | "mileage-high"

const FAVORITES_KEY = "sambi_favorites"

// Constants
export const MAKES = ["Audi","BMW","Citroën","Fiat","Ford","Honda","Hyundai","Kia","Lexus","Mazda","Mercedes-Benz","Mitsubishi","Nissan","Opel","Peugeot","Porsche","Renault","Seat","Škoda","Subaru","Suzuki","Toyota","Volkswagen","Volvo","Other"]
export const FUELS = ["Petrol","Diesel","Hybrid","Electric","LPG"]
export const TRANSMISSIONS = ["Automatic","Manual","Semi-Auto"]
export const CONDITIONS = ["Excellent","Good","Fair"]
export const COLORS = ["Black","White","Silver","Grey","Blue","Dark Blue","Red","Green","Orange","Brown","Beige","Other"]

export const MILEAGE_RANGES = [
  { label: "Under 1,000 km", value: "0-999" },
  { label: "1,000 – 9,999 km", value: "1000-9999" },
  { label: "10,000 – 29,999 km", value: "10000-29999" },
  { label: "30,000 – 49,999 km", value: "30000-49999" },
  { label: "50,000 – 74,999 km", value: "50000-74999" },
  { label: "75,000 – 99,999 km", value: "75000-99999" },
  { label: "100,000 – 149,999 km", value: "100000-149999" },
  { label: "150,000+ km", value: "150000+" },
]

export const PRICE_RANGES = [
  { label: "Under €5,000", value: "0-4999" },
  { label: "€5,000 – €9,999", value: "5000-9999" },
  { label: "€10,000 – €14,999", value: "10000-14999" },
  { label: "€15,000 – €19,999", value: "15000-19999" },
  { label: "€20,000 – €29,999", value: "20000-29999" },
  { label: "€30,000 – €49,999", value: "30000-49999" },
  { label: "€50,000+", value: "50000+" },
]

export const YEARS = Array.from({ length: 20 }, (_, i) => 2026 - i)

// Utility functions
export const fmt = (n: number) => new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n)

export function mileageInRange(mileage: number, filterRange: string): boolean {
  if (!filterRange) return true
  const [fLow, fHigh] = filterRange.includes("+")
    ? [parseInt(filterRange), Infinity]
    : filterRange.split("-").map(Number)
  return mileage >= fLow && mileage <= fHigh
}

export function priceInRange(price: number | null, filterRange: string): boolean {
  if (!filterRange || price === null) return true
  const [fLow, fHigh] = filterRange.includes("+") 
    ? [parseInt(filterRange), Infinity] 
    : filterRange.split("-").map(Number)
  return price >= fLow && price <= fHigh
}

export function sortCars(cars: Car[], sortBy: SortOption): Car[] {
  return [...cars].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        if (a.price === null) return 1
        if (b.price === null) return -1
        return a.price - b.price
      case "price-high":
        if (a.price === null) return 1
        if (b.price === null) return -1
        return b.price - a.price
      case "year-new":
        return b.year - a.year
      case "year-old":
        return a.year - b.year
      case "mileage-low":
        return a.mileage - b.mileage
      case "mileage-high":
        return b.mileage - a.mileage
      default:
        return 0
    }
  })
}

// Supabase fetch
const STORAGE_BUCKET = "car-images"

function buildImageUrls(raw: unknown): Car["images"] {
  const empty: Car["images"] = {
    preview: "", front: "", side: "", back: "",
    interior: "", frontSeats: "", rearSeats: "",
  }

  let parsed: unknown = raw
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw)
    } catch {
      return empty
    }
  }

  if (!parsed || typeof parsed !== "object") return empty

  const folder = (parsed as Record<string, unknown>).folder
  if (!folder || typeof folder !== "string" || !folder.trim()) return empty

  const url = (suffix: string) =>
    supabase.storage.from(STORAGE_BUCKET).getPublicUrl(`${folder}/${folder}${suffix}`).data.publicUrl

  return {
    preview:    url("-flip.jpg"),
    front:      url("-front.jpg"),
    side:       url("-side.jpg"),
    back:       url("-back.jpg"),
    interior:   url("-interior.jpg"),
    frontSeats: url("-front-seats.jpg"),
    rearSeats:  url("-rear-seats.jpg"),
  }
}

export async function fetchCars(): Promise<Car[]> {
  const { data, error } = await supabase.from("cars").select("*").order("id")
  if (error) throw error
  return (data ?? []).map((row) => ({
    id:           row.id           as number,
    make:         row.make         as string,
    model:        row.model        as string,
    year:         row.year         as number,
    mileage:      row.mileage        as number,
    fuel:         row.fuel         as string,
    transmission: row.transmission as string,
    price:        row.price        as number | null,
    showPrice:    (row.show_price ?? row.showPrice ?? false) as boolean,
    condition:    row.condition    as string,
    color:        row.color        as string,
    description:  row.description  as string,
    status:       ((row.status || row.Status) as string | null) ?? undefined,
    images:       buildImageUrls(row.images),
  }))
}

export function loadFavorites(): number[] {
  if (typeof window === "undefined") return []
  try {
    const r = localStorage.getItem(FAVORITES_KEY)
    return r ? JSON.parse(r) : []
  } catch {
    return []
  }
}

export function saveFavorites(favorites: number[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch {
    // Silent fail
  }
}
