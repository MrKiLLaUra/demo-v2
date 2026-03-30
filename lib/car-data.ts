export interface Car {
  id: number
  make: string
  model: string
  year: number
  mileageRange: string
  fuel: string
  transmission: string
  price: number | null
  showPrice: boolean
  condition: string
  color: string
  description: string
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

export type Page = "home" | "inventory" | "services" | "about" | "contact" | "admin"

export type SortOption = "price-low" | "price-high" | "year-new" | "year-old" | "mileage-low" | "mileage-high"

const FAVORITES_KEY = "sambi_favorites"
const INVENTORY_KEY = "sambi_cars"

// Default inventory with placeholder car images
export const defaultInventory: Car[] = [
  { id: 1, make: "Porsche", model: "911 Turbo S", year: 2024, mileageRange: "0-999", fuel: "Petrol", transmission: "Automatic", price: 245000, showPrice: true, condition: "Excellent", color: "Other", description: "", images: { preview: "https://picsum.photos/seed/porsche-911-preview/1200/800", front: "https://picsum.photos/seed/porsche-911-front/1200/800", side: "https://picsum.photos/seed/porsche-911-side/1200/800", back: "https://picsum.photos/seed/porsche-911-back/1200/800", interior: "https://picsum.photos/seed/porsche-911-interior/1200/800", frontSeats: "https://picsum.photos/seed/porsche-911-front-seats/1200/800", rearSeats: "https://picsum.photos/seed/porsche-911-rear-seats/1200/800" } },
  { id: 2, make: "Audi", model: "SQ5", year: 2023, mileageRange: "10000-29999", fuel: "Petrol", transmission: "Automatic", price: 65000, showPrice: true, condition: "Excellent", color: "Other", description: "", images: { preview: "https://picsum.photos/seed/audi-sq5-preview/1200/800", front: "https://picsum.photos/seed/audi-sq5-front/1200/800", side: "https://picsum.photos/seed/audi-sq5-side/1200/800", back: "https://picsum.photos/seed/audi-sq5-back/1200/800", interior: "https://picsum.photos/seed/audi-sq5-interior/1200/800", frontSeats: "https://picsum.photos/seed/audi-sq5-front-seats/1200/800", rearSeats: "https://picsum.photos/seed/audi-sq5-rear-seats/1200/800" } },
  { id: 3, make: "Porsche", model: "Panamera", year: 2022, mileageRange: "30000-49999", fuel: "Hybrid", transmission: "Automatic", price: 95000, showPrice: true, condition: "Excellent", color: "Other", description: "", images: { preview: "https://picsum.photos/seed/porsche-panamera-preview/1200/800", front: "https://picsum.photos/seed/porsche-panamera-front/1200/800", side: "https://picsum.photos/seed/porsche-panamera-side/1200/800", back: "https://picsum.photos/seed/porsche-panamera-back/1200/800", interior: "https://picsum.photos/seed/porsche-panamera-interior/1200/800", frontSeats: "https://picsum.photos/seed/porsche-panamera-front-seats/1200/800", rearSeats: "https://picsum.photos/seed/porsche-panamera-rear-seats/1200/800" } },
  { id: 4, make: "BMW", model: "M4 Competition", year: 2023, mileageRange: "10000-29999", fuel: "Petrol", transmission: "Automatic", price: 85000, showPrice: true, condition: "Excellent", color: "Other", description: "", images: { preview: "https://picsum.photos/seed/bmw-m4-preview/1200/800", front: "https://picsum.photos/seed/bmw-m4-front/1200/800", side: "https://picsum.photos/seed/bmw-m4-side/1200/800", back: "https://picsum.photos/seed/bmw-m4-back/1200/800", interior: "https://picsum.photos/seed/bmw-m4-interior/1200/800", frontSeats: "https://picsum.photos/seed/bmw-m4-front-seats/1200/800", rearSeats: "https://picsum.photos/seed/bmw-m4-rear-seats/1200/800" } },
]

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

export function mileageInRange(carRange: string, filterRange: string): boolean {
  if (!filterRange) return true
  const [cLow] = carRange.split("-").map(Number)
  const [fLow, fHigh] = filterRange.includes("+") 
    ? [parseInt(filterRange), Infinity] 
    : filterRange.split("-").map(Number)
  return cLow >= fLow && cLow <= fHigh
}

export function priceInRange(price: number | null, filterRange: string): boolean {
  if (!filterRange || price === null) return true
  const [fLow, fHigh] = filterRange.includes("+") 
    ? [parseInt(filterRange), Infinity] 
    : filterRange.split("-").map(Number)
  return price >= fLow && price <= fHigh
}

export function getMileageNumeric(range: string): number {
  const [low] = range.split("-").map(s => parseInt(s.replace("+", "")))
  return low
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
        return getMileageNumeric(a.mileageRange) - getMileageNumeric(b.mileageRange)
      case "mileage-high":
        return getMileageNumeric(b.mileageRange) - getMileageNumeric(a.mileageRange)
      default:
        return 0
    }
  })
}

// Storage functions
export async function loadInventory(): Promise<Car[]> {
  if (typeof window === "undefined") return defaultInventory
  try {
    const raw = localStorage.getItem(INVENTORY_KEY)
    if (!raw) return defaultInventory
    const parsed = JSON.parse(raw) as (Car & { imageUrl?: string; images?: Partial<Car["images"]> & { seats?: string } })[]
    if (!Array.isArray(parsed)) return defaultInventory
    return parsed.map((car) => {
      const fallbackImage = car.imageUrl || ""
      const imageSet = car.images
      if (imageSet) {
        return {
          ...car,
          images: {
            preview: imageSet.preview || fallbackImage,
            front: imageSet.front || fallbackImage,
            side: imageSet.side || fallbackImage,
            back: imageSet.back || fallbackImage,
            interior: imageSet.interior || fallbackImage,
            frontSeats: imageSet.frontSeats || imageSet.seats || fallbackImage,
            rearSeats: imageSet.rearSeats || fallbackImage,
          },
        }
      }
      return {
        ...car,
        images: {
          preview: fallbackImage,
          front: fallbackImage,
          side: fallbackImage,
          back: fallbackImage,
          interior: fallbackImage,
          frontSeats: fallbackImage,
          rearSeats: fallbackImage,
        },
      }
    })
  } catch {
    return defaultInventory
  }
}

export async function saveInventory(inv: Car[]): Promise<void> {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inv))
  } catch {
    // Silent fail
  }
}

export async function addCar(car: Omit<Car, "id">): Promise<Car> {
  const inventory = await loadInventory()
  const nextId = inventory.length > 0 ? Math.max(...inventory.map((c) => c.id)) + 1 : 1
  const newCar: Car = { id: nextId, ...car }
  await saveInventory([...inventory, newCar])
  return newCar
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

export function getMileageLabel(value: string): string {
  return MILEAGE_RANGES.find(m => m.value === value)?.label || value
}
