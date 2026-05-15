import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { CarForm } from "@/components/admin/car-form"

export default function NewCarPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border px-6 md:px-10 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div>
          <div className="font-display text-xl tracking-[0.25em]">SAMBI ADMIN</div>
          <div className="text-[9px] tracking-[0.3em] text-primary">ADD NEW CAR</div>
        </div>
      </div>
      <div className="px-6 md:px-10 py-8">
        <CarForm mode="create" />
      </div>
    </div>
  )
}
