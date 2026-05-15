import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { CarForm } from "@/components/admin/car-form"

export const dynamic = "force-dynamic"

interface Props { params: Promise<{ id: string }> }

export default async function EditCarPage({ params }: Props) {
  const { id } = await params
  const { data: car } = await supabase.from("cars").select("*").eq("id", id).single()
  if (!car) notFound()

  const images = car.images && typeof car.images === "object" ? car.images as Record<string, string> : {}

  const initial = {
    make:         car.make ?? "",
    model:        car.model ?? "",
    year:         String(car.year ?? 2022),
    mileage:      String(car.mileage ?? ""),
    fuel:         car.fuel ?? "Petrol",
    transmission: car.transmission ?? "Automatic",
    price:        car.price != null ? String(car.price) : "",
    show_price:   car.show_price ?? false,
    condition:    car.condition ?? "Excellent",
    color:        car.color ?? "Black",
    description:  car.description ?? "",
    status:       car.status ?? "Available",
    ai_blurb:     car.ai_blurb ?? "",
    folder:       images.folder ?? "",
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-border px-6 md:px-10 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div>
          <div className="font-display text-xl tracking-[0.25em]">SAMBI ADMIN</div>
          <div className="text-[9px] tracking-[0.3em] text-primary">EDIT — {car.make} {car.model}</div>
        </div>
      </div>
      <div className="px-6 md:px-10 py-8">
        <CarForm mode="edit" carId={car.id} initial={initial} />
      </div>
    </div>
  )
}
