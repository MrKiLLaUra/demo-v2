import { fetchCars } from "@/lib/car-data"
import { CarsClient } from "@/components/cars/cars-client"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Browse Cars",
  description: "Browse our full inventory of hand-picked, pre-inspected used cars in Limassol, Cyprus.",
}

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const [cars, params] = await Promise.all([fetchCars(), searchParams])
  return <CarsClient initialCars={cars} initialBlackFriday={params.blackfriday === "1"} />
}
