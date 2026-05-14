export const dynamic = "force-dynamic"

import { fetchCarById, fetchCars, idFromSlug, carSlug, fmt } from "@/lib/car-data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { CarDetailClient } from "@/components/cars/car-detail-client"

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params
  const id = idFromSlug(slug)
  const car = await fetchCarById(id)
  if (!car) return { title: "Car Not Found" }

  const title = `${car.year} ${car.make} ${car.model}`
  const description = car.description || `${car.year} ${car.make} ${car.model} — ${car.fuel}, ${car.transmission}, ${car.mileage.toLocaleString()} km. Available at Sambi Top Gear Motors, Limassol.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Sambi Top Gear Motors`,
      description,
      images: car.images?.front ? [{ url: car.images.front, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Sambi Top Gear Motors`,
      description,
      images: car.images?.front ? [car.images.front] : [],
    },
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { id: slug } = await params
  const id = idFromSlug(slug)
  const [car, allCars] = await Promise.all([fetchCarById(id), fetchCars()])

  if (!car) notFound()

  const related = allCars
    .filter(c => c.id !== car.id && c.status?.toLowerCase() !== "sold" && (c.make === car.make || Math.abs((c.price ?? 0) - (car.price ?? 0)) < 8000))
    .slice(0, 3)

  return <CarDetailClient car={car} related={related} />
}
