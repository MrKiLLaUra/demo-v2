"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Car, MAKES, FUELS, TRANSMISSIONS, CONDITIONS, COLORS, MILEAGE_RANGES, YEARS, fmt, getMileageLabel
} from "@/lib/car-data"
import { ChevronLeft, Plus, Pencil, Trash2, Lock, Shield, LogOut } from "lucide-react"

interface AdminPageProps {
  inventory: Car[]
  updateInventory: (inv: Car[]) => void
  auth: boolean
  setAuth: (auth: boolean) => void
  goHome: () => void
}

const emptyCar: Omit<Car, "id"> = {
  make: "BMW",
  model: "",
  year: 2022,
  mileageRange: "10000-29999",
  fuel: "Petrol",
  transmission: "Automatic",
  price: null,
  showPrice: true,
  condition: "Good",
  color: "Black",
  description: "",
  images: {
    preview: "",
    front: "",
    side: "",
    back: "",
    interior: "",
    frontSeats: "",
    rearSeats: "",
  },
}

export function AdminPage({ inventory, updateInventory, auth, setAuth, goHome }: AdminPageProps) {
  const [adminPass, setAdminPass] = useState("")
  const [activeId, setActiveId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const activeCar = useMemo(() => {
    if (activeId === null) return null
    return inventory.find(c => c.id === activeId) ?? null
  }, [activeId, inventory])

  const isEditing = activeCar !== null

  const formTitle = isEditing ? "Edit Vehicle" : "Add New Vehicle"
  const formInitial: Car = useMemo(() => {
    if (activeCar) return { ...activeCar }
    return { ...emptyCar, id: 0 } as Car
  }, [activeCar])

  // Clear admin session whenever this page unmounts or becomes inactive.
  useEffect(() => {
    const clearSession = () => {
      setAuth(false)
      setAdminPass("")
      setActiveId(null)
      setDeleteId(null)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") clearSession()
    }

    const onPageHide = () => clearSession()
    const onBeforeUnload = () => clearSession()

    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("pagehide", onPageHide)
    window.addEventListener("beforeunload", onBeforeUnload)

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("pagehide", onPageHide)
      window.removeEventListener("beforeunload", onBeforeUnload)
      clearSession()
    }
  }, [setAuth])

  // Login screen
  if (!auth) {
    return (
      <div className="relative min-h-[82vh] px-6 py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-[680px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative max-w-[520px] mx-auto">
          <div className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-8 md:p-10 border-b border-border/60 bg-gradient-to-b from-background/30 to-transparent">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.35em] text-primary">SECURE AREA</div>
                  <h1 className="font-display text-2xl tracking-wide leading-tight">Admin Panel</h1>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enter your password to manage inventory. Your session clears automatically when you leave this page.
              </p>
            </div>
            <div className="p-8 md:p-10">
              <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">PASSWORD</label>
              <Input
                type="password"
                placeholder="Enter password"
                value={adminPass}
                onChange={e => setAdminPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && adminPass === "SAMBI2026" && setAuth(true)}
                className="mb-4 tracking-widest bg-input/60 border-border/70"
              />
              <div className="flex gap-3">
                <Button 
                  onClick={() => adminPass === "SAMBI2026" ? setAuth(true) : alert("Incorrect.")}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Unlock
                </Button>
                <Button 
                  variant="outline"
                  onClick={goHome}
                  className="border-border/70"
                >
                  Back
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground/50 mt-6">demo: SAMBI2026</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative max-w-[1200px] mx-auto py-10 px-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-72 w-[900px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 -left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-8">
        <div>
          <div className="text-[10px] text-primary tracking-[0.35em] mb-2">ADMIN PANEL</div>
          <h1 className="font-display text-3xl md:text-4xl tracking-wide">Inventory Manager</h1>
          <p className="text-sm text-muted-foreground tracking-wider mt-2">
            {inventory.length} vehicles · Changes save instantly
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setAuth(false)
              setAdminPass("")
              setActiveId(null)
              setDeleteId(null)
            }}
            className="border-border/70"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
          <Button variant="ghost" onClick={goHome} className="text-muted-foreground">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Site
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-6">
        {/* Active Inventory */}
        <section className="rounded-2xl border border-border/70 bg-card/50 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden">
          <div className="px-6 py-5 border-b border-border/60 bg-gradient-to-b from-background/20 to-transparent">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] tracking-[0.35em] text-primary">ACTIVE INVENTORY</div>
                <div className="text-sm text-muted-foreground mt-1">Click a card to edit. Delete requires confirmation.</div>
              </div>
              <Button
                onClick={() => setActiveId(null)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {inventory.map(car => (
                <button
                  key={car.id}
                  onClick={() => setActiveId(car.id)}
                  className={`text-left rounded-xl border bg-background/20 backdrop-blur-sm hover:bg-background/30 transition-colors p-4 ${
                    activeId === car.id ? "border-primary/50 ring-1 ring-primary/30" : "border-border/70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-base tracking-wide leading-tight">
                        {car.year} {car.make}
                      </div>
                      <div className="text-sm text-muted-foreground">{car.model}</div>
                    </div>
                    <div className={`text-[10px] px-2 py-1 rounded-full border tracking-wide ${
                      car.showPrice ? "border-green-500/30 text-green-500" : "border-yellow-500/30 text-yellow-500"
                    }`}>
                      {car.showPrice ? fmt(car.price!) : "Contact"}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {[car.fuel, car.transmission, getMileageLabel(car.mileageRange), car.condition].map(t => (
                      <span
                        key={t}
                        className="text-[10px] text-muted-foreground border border-border/70 bg-background/30 px-2 py-0.5 rounded-md tracking-wide"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">{car.color}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border/70"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setActiveId(car.id)
                        }}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>

                      {deleteId === car.id ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              updateInventory(inventory.filter(c => c.id !== car.id))
                              if (activeId === car.id) setActiveId(null)
                              setDeleteId(null)
                            }}
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border/70"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setDeleteId(null)
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border/70 text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDeleteId(car.id)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Add/Edit */}
        <section className="rounded-2xl border border-border/70 bg-card/50 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden lg:sticky lg:top-24">
          <div className="px-6 py-5 border-b border-border/60 bg-gradient-to-b from-background/20 to-transparent">
            <div className="text-[10px] tracking-[0.35em] text-primary">
              {isEditing ? "EDIT VEHICLE" : "ADD NEW VEHICLE"}
            </div>
            <div className="font-display text-xl tracking-wide mt-1">{formTitle}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Fuel, transmission, mileage, and condition are enforced via dropdown options.
            </div>
          </div>
          <div className="p-6">
            <AdminForm
              key={activeId ?? "new"}
              car={formInitial}
              onSave={(form) => {
                if (activeCar) {
                  updateInventory(inventory.map(c => c.id === activeCar.id ? { ...form, id: activeCar.id, price: form.showPrice && form.price ? Number(form.price) : null } : c))
                } else {
                  updateInventory([...inventory, { ...form, id: Date.now(), price: form.showPrice && form.price ? Number(form.price) : null }])
                }
                setActiveId(null)
              }}
              onCancel={() => {
                setActiveId(null)
                setDeleteId(null)
              }}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

// Admin form component
function AdminForm({ 
  car, 
  onSave, 
  onCancel 
}: { 
  car: Car
  onSave: (form: Car) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState(car)

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* Make */}
        <div>
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">MAKE</label>
          <Select value={form.make} onValueChange={v => setForm(p => ({ ...p, make: v }))}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MAKES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Model */}
        <div>
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">MODEL</label>
          <Input 
            placeholder="e.g. Golf, A4..."
            value={form.model}
            onChange={e => setForm(p => ({ ...p, model: e.target.value }))}
            className="bg-input border-border"
          />
        </div>

        {/* Year */}
        <div>
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">YEAR</label>
          <Select value={form.year.toString()} onValueChange={v => setForm(p => ({ ...p, year: Number(v) }))}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Color */}
        <div>
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">COLOR</label>
          <Select value={form.color} onValueChange={v => setForm(p => ({ ...p, color: v }))}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COLORS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Fuel */}
        <div>
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">FUEL</label>
          <Select value={form.fuel} onValueChange={v => setForm(p => ({ ...p, fuel: v }))}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FUELS.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div>
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">TRANSMISSION</label>
          <Select value={form.transmission} onValueChange={v => setForm(p => ({ ...p, transmission: v }))}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRANSMISSIONS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Condition */}
        <div>
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">CONDITION</label>
          <Select value={form.condition} onValueChange={v => setForm(p => ({ ...p, condition: v }))}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CONDITIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Mileage */}
        <div>
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">MILEAGE RANGE</label>
          <Select value={form.mileageRange} onValueChange={v => setForm(p => ({ ...p, mileageRange: v }))}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MILEAGE_RANGES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Image gallery URLs */}
        <div className="sm:col-span-2">
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">PREVIEW IMAGE URL</label>
          <Input 
            placeholder="https://example.com/car-preview.jpg"
            value={form.images.preview}
            onChange={e => setForm(p => ({ ...p, images: { ...p.images, preview: e.target.value } }))}
            className="bg-input border-border"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">FRONT IMAGE URL</label>
          <Input
            placeholder="https://example.com/car-front.jpg"
            value={form.images.front}
            onChange={e => setForm(p => ({ ...p, images: { ...p.images, front: e.target.value } }))}
            className="bg-input border-border"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">SIDE IMAGE URL</label>
          <Input
            placeholder="https://example.com/car-side.jpg"
            value={form.images.side}
            onChange={e => setForm(p => ({ ...p, images: { ...p.images, side: e.target.value } }))}
            className="bg-input border-border"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">BACK IMAGE URL</label>
          <Input
            placeholder="https://example.com/car-back.jpg"
            value={form.images.back}
            onChange={e => setForm(p => ({ ...p, images: { ...p.images, back: e.target.value } }))}
            className="bg-input border-border"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">INTERIOR IMAGE URL</label>
          <Input
            placeholder="https://example.com/car-interior.jpg"
            value={form.images.interior}
            onChange={e => setForm(p => ({ ...p, images: { ...p.images, interior: e.target.value } }))}
            className="bg-input border-border"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">FRONT SEATS IMAGE URL</label>
          <Input
            placeholder="https://example.com/car-front-seats.jpg"
            value={form.images.frontSeats}
            onChange={e => setForm(p => ({ ...p, images: { ...p.images, frontSeats: e.target.value } }))}
            className="bg-input border-border"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">REAR SEATS IMAGE URL</label>
          <Input
            placeholder="https://example.com/car-rear-seats.jpg"
            value={form.images.rearSeats}
            onChange={e => setForm(p => ({ ...p, images: { ...p.images, rearSeats: e.target.value } }))}
            className="bg-input border-border"
          />
        </div>
      </div>

      {/* Price section */}
      <div className="rounded-xl border border-border/70 p-5 bg-background/20 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Checkbox 
            id="showPrice"
            checked={form.showPrice}
            onCheckedChange={(checked) => setForm(p => ({ ...p, showPrice: !!checked }))}
          />
          <label htmlFor="showPrice" className="text-sm text-foreground/80 cursor-pointer">
            Show price publicly
          </label>
        </div>
        {form.showPrice ? (
          <div>
            <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">PRICE (EUR)</label>
            <Input 
              type="number"
              placeholder="e.g. 18500"
              value={form.price || ""}
              onChange={e => setForm(p => ({ ...p, price: e.target.value ? Number(e.target.value) : null }))}
              className="bg-input border-border max-w-[220px]"
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{"Customers will see \"Contact for Price\""}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-8">
        <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">DESCRIPTION / NOTES</label>
        <Textarea 
          placeholder="Service history, extras, condition notes..."
          rows={3}
          value={form.description}
          onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          className="bg-input border-border resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          onClick={() => onSave(form)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest"
        >
          SAVE
        </Button>
        <Button variant="outline" onClick={onCancel}>
          CANCEL
        </Button>
      </div>
    </div>
  )
}
