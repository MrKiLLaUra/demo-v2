import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { fmt } from "@/lib/car-data"
import { Plus, Pencil } from "lucide-react"
import { AdminDeleteButton } from "@/components/admin/delete-button"
import { LogoutButton } from "@/components/admin/logout-button"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const store = await cookies()
  if (store.get("admin_session")?.value !== process.env.ADMIN_PASSWORD) redirect("/admin/login")

  const { data: cars } = await supabase.from("cars").select("*").order("id", { ascending: false })

  const total = cars?.length ?? 0
  const available = cars?.filter(c => c.status?.toLowerCase() !== "sold").length ?? 0
  const sold = total - available

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border px-6 md:px-10 py-4 flex items-center justify-between">
        <div>
          <div className="font-display text-xl tracking-[0.25em]">SAMBI ADMIN</div>
          <div className="text-[9px] tracking-[0.3em] text-primary">DASHBOARD</div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/cars/new"
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-xs tracking-widest transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            ADD CAR
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="px-6 md:px-10 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm">
          {[
            { label: "TOTAL", value: total },
            { label: "AVAILABLE", value: available },
            { label: "SOLD", value: sold },
          ].map(s => (
            <div key={s.label} className="border border-border bg-card p-4 text-center">
              <div className="font-display text-3xl text-primary">{s.value}</div>
              <div className="text-[9px] tracking-[0.2em] text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="text-left px-4 py-3 text-[9px] tracking-[0.2em] text-muted-foreground font-normal">ID</th>
                  <th className="text-left px-4 py-3 text-[9px] tracking-[0.2em] text-muted-foreground font-normal">CAR</th>
                  <th className="text-left px-4 py-3 text-[9px] tracking-[0.2em] text-muted-foreground font-normal">YEAR</th>
                  <th className="text-left px-4 py-3 text-[9px] tracking-[0.2em] text-muted-foreground font-normal">MILEAGE</th>
                  <th className="text-left px-4 py-3 text-[9px] tracking-[0.2em] text-muted-foreground font-normal">PRICE</th>
                  <th className="text-left px-4 py-3 text-[9px] tracking-[0.2em] text-muted-foreground font-normal">STATUS</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {(cars ?? []).map((car, i) => {
                  const isSold = car.status?.toLowerCase() === "sold"
                  return (
                    <tr key={car.id} className={`border-b border-border/50 hover:bg-card/50 transition-colors ${i % 2 === 0 ? "" : "bg-card/20"}`}>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{car.id}</td>
                      <td className="px-4 py-3 font-medium">{car.make} {car.model}</td>
                      <td className="px-4 py-3 text-muted-foreground">{car.year}</td>
                      <td className="px-4 py-3 text-muted-foreground">{car.mileage?.toLocaleString()} km</td>
                      <td className="px-4 py-3">
                        {car.show_price && car.price ? fmt(car.price) : <span className="text-muted-foreground text-xs">POA</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[9px] tracking-widest px-2 py-1 ${isSold ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                          {(car.status || "Available").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <Link
                            href={`/admin/cars/${car.id}/edit`}
                            className="flex items-center gap-1.5 text-[10px] tracking-widest text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-foreground/30 px-2.5 py-1.5"
                          >
                            <Pencil className="w-3 h-3" />
                            EDIT
                          </Link>
                          <AdminDeleteButton carId={car.id} carName={`${car.make} ${car.model}`} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {(cars ?? []).length === 0 && (
              <div className="text-center py-16 text-muted-foreground text-sm">
                No cars yet. <Link href="/admin/cars/new" className="text-primary hover:underline">Add your first car</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
