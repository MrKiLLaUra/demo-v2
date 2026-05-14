import { fetchCars } from "@/lib/car-data"
import { CarsClient } from "@/components/cars/cars-client"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Browse Cars",
  description: "Browse our full inventory of hand-picked, pre-inspected used cars in Limassol, Cyprus.",
}

export default async function CarsPage() {
  const cars = await fetchCars()
  return <CarsClient initialCars={cars} />
}
