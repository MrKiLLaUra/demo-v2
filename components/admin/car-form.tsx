"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Upload, X } from "lucide-react"
import { getSupabase } from "@/lib/supabase"
import { MAKES, FUELS, TRANSMISSIONS, CONDITIONS, COLORS } from "@/lib/car-data"
import { cn } from "@/lib/utils"

const YEARS = Array.from({ length: 25 }, (_, i) => 2026 - i)
const STATUSES = ["Available", "Sold", "Reserved", "Coming Soon"]

interface CarFormData {
  make: string; model: string; year: string; mileage: string
  fuel: string; transmission: string; price: string; sale_price: string; show_price: boolean
  condition: string; color: string; description: string
  status: string; ai_blurb: string; folder: string; new_stock: boolean
}

const EMPTY: CarFormData = {
  make: "", model: "", year: "2022", mileage: "", fuel: "Petrol",
  transmission: "Automatic", price: "", sale_price: "", show_price: true, condition: "Excellent",
  color: "Black", description: "", status: "Available", ai_blurb: "", folder: "", new_stock: false,
}

interface Props {
  mode: "create" | "edit"
  carId?: number
  initial?: Partial<CarFormData>
}

const inputClass = "w-full bg-[oklch(0.12_0_0)] border-2 border-border px-3 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground/50"
const labelClass = "text-xs tracking-[0.15em] text-muted-foreground font-medium block mb-1.5"

export function CarForm({ mode, carId, initial }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<CarFormData>({ ...EMPTY, ...initial })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imageFiles, setImageFiles] = useState<Record<string, File | null>>({
    front: null, side: null, back: null, interior: null, frontSeats: null, rearSeats: null,
  })

  const set = (k: keyof CarFormData, v: string | boolean) =>
    setForm(p => ({ ...p, [k]: v }))

  const uploadImages = async (folder: string): Promise<boolean> => {
    const client = getSupabase()
    if (!client) { toast.error("Supabase not configured"); return false }

    const slots: Array<{ key: string; suffix: string }> = [
      { key: "front",      suffix: "-front.jpg" },
      { key: "side",       suffix: "-side.jpg" },
      { key: "back",       suffix: "-back.jpg" },
      { key: "interior",   suffix: "-interior.jpg" },
      { key: "frontSeats", suffix: "-front-seats.jpg" },
      { key: "rearSeats",  suffix: "-rear-seats.jpg" },
    ]

    const toUpload = slots.filter(s => imageFiles[s.key])
    if (toUpload.length === 0) return true

    setUploading(true)
    for (const slot of toUpload) {
      const file = imageFiles[slot.key]!
      const path = `${folder}/${folder}${slot.suffix}`
      const { error } = await client.storage.from("car-images").upload(path, file, { upsert: true })
      if (error) {
        toast.error(`Failed to upload ${slot.key}: ${error.message}`)
        setUploading(false)
        return false
      }
    }

    // Also upload flip (preview) as copy of front if front was uploaded
    if (imageFiles.front) {
      const path = `${folder}/${folder}-flip.jpg`
      const { error } = await client.storage.from("car-images").upload(path, imageFiles.front, { upsert: true })
      if (error) toast.error(`Preview upload failed: ${error.message}`)
    }

    setUploading(false)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.make || !form.model || !form.mileage) {
      toast.error("Make, model and mileage are required")
      return
    }

    setLoading(true)

    const folder = form.folder.trim()
    if (folder) {
      const ok = await uploadImages(folder)
      if (!ok) { setLoading(false); return }
    }

    const body = {
      ...form,
      images: folder ? { folder } : null,
    }

    const url = mode === "edit" ? `/api/admin/cars/${carId}` : "/api/admin/cars"
    const method = mode === "edit" ? "PATCH" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      toast.success(mode === "edit" ? "Car updated!" : "Car added!")
      router.push("/admin")
      router.refresh()
    } else {
      const err = await res.json()
      toast.error(err.error || "Something went wrong")
    }

    setLoading(false)
  }

  const imageSlots = [
    { key: "front",      label: "Front" },
    { key: "side",       label: "Side" },
    { key: "back",       label: "Back" },
    { key: "interior",   label: "Interior" },
    { key: "frontSeats", label: "Front Seats" },
    { key: "rearSeats",  label: "Rear Seats" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">

      {/* Basic info */}
      <div className="border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm tracking-[0.25em] text-primary font-semibold">BASIC INFO</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>MAKE *</label>
            <select value={form.make} onChange={e => set("make", e.target.value)} className={inputClass} required>
              <option value="">Select make</option>
              {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>MODEL *</label>
            <input type="text" value={form.model} onChange={e => set("model", e.target.value)} className={inputClass} placeholder="e.g. C 200" required />
          </div>
          <div>
            <label className={labelClass}>YEAR</label>
            <select value={form.year} onChange={e => set("year", e.target.value)} className={inputClass}>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>MILEAGE (km) *</label>
            <input type="number" value={form.mileage} onChange={e => set("mileage", e.target.value)} className={inputClass} placeholder="e.g. 45000" required />
          </div>
          <div>
            <label className={labelClass}>FUEL</label>
            <select value={form.fuel} onChange={e => set("fuel", e.target.value)} className={inputClass}>
              {FUELS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>TRANSMISSION</label>
            <select value={form.transmission} onChange={e => set("transmission", e.target.value)} className={inputClass}>
              {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>COLOUR</label>
            <select value={form.color} onChange={e => set("color", e.target.value)} className={inputClass}>
              {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>CONDITION</label>
            <select value={form.condition} onChange={e => set("condition", e.target.value)} className={inputClass}>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>STATUS</label>
            <select value={form.status} onChange={e => set("status", e.target.value)} className={inputClass}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm tracking-[0.25em] text-primary font-semibold">PRICING</h2>
        <div className="grid grid-cols-2 gap-4 items-end">
          <div>
            <label className={labelClass}>PRICE (€)</label>
            <input type="number" value={form.price} onChange={e => set("price", e.target.value)} className={inputClass} placeholder="Leave blank for POA" />
          </div>
          <div>
            <label className={labelClass}>SALE PRICE (€) <span className="text-muted-foreground normal-case tracking-normal font-normal">— shows strikethrough on original</span></label>
            <input type="number" value={form.sale_price} onChange={e => set("sale_price", e.target.value)} className={inputClass} placeholder="Leave blank for no discount" />
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer pb-2.5">
            <div
              onClick={() => set("show_price", !form.show_price)}
              className={cn("w-10 h-5 rounded-full transition-colors relative cursor-pointer", form.show_price ? "bg-primary" : "bg-border")}
            >
              <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform", form.show_price ? "translate-x-5" : "translate-x-0.5")} />
            </div>
            <span className="text-xs text-muted-foreground">Show price publicly</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer pb-2.5">
            <div
              onClick={() => set("new_stock", !form.new_stock)}
              className={cn("w-10 h-5 rounded-full transition-colors relative cursor-pointer", form.new_stock ? "bg-primary" : "bg-border")}
            >
              <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform", form.new_stock ? "translate-x-5" : "translate-x-0.5")} />
            </div>
            <span className="text-xs text-muted-foreground">Show "NEW" badge</span>
          </label>
        </div>
      </div>

      {/* Description */}
      <div className="border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm tracking-[0.25em] text-primary font-semibold">DESCRIPTION</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>DESCRIPTION</label>
            <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={4} className={`${inputClass} resize-none`} placeholder="Describe the car..." />
          </div>
          <div>
            <label className={labelClass}>AI BLURB (optional — shown in SAMBI AI SAYS box)</label>
            <textarea value={form.ai_blurb} onChange={e => set("ai_blurb", e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Market insight or buying tip..." />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm tracking-[0.25em] text-primary font-semibold">IMAGES</h2>
        <div>
          <label className={labelClass}>IMAGE FOLDER NAME (used for Supabase storage path)</label>
          <input
            type="text"
            value={form.folder}
            onChange={e => set("folder", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            className={inputClass}
            placeholder="e.g. 2022-mercedes-c200"
          />
          <p className="text-xs text-muted-foreground/60 mt-1.5">
            Files will be uploaded as: <span className="text-muted-foreground">{form.folder || "folder"}/{form.folder || "folder"}-front.jpg</span> etc.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
          {imageSlots.map(slot => (
            <div key={slot.key}>
              <label className={labelClass}>{slot.label.toUpperCase()}</label>
              {imageFiles[slot.key] ? (
                <div className="relative border border-primary/40 bg-primary/5 px-3 py-2.5 flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground truncate">{imageFiles[slot.key]!.name}</span>
                  <button type="button" onClick={() => setImageFiles(p => ({ ...p, [slot.key]: null }))}>
                    <X className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center gap-2 border border-dashed border-border hover:border-primary/40 px-3 py-2.5 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5 text-muted-foreground/50" />
                  <span className="text-xs text-muted-foreground/50">Choose file</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0] ?? null
                      setImageFiles(p => ({ ...p, [slot.key]: file }))
                    }}
                  />
                </label>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading || uploading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-display text-lg tracking-widest transition-colors disabled:opacity-50"
        >
          {uploading ? "UPLOADING..." : loading ? "SAVING..." : mode === "edit" ? "SAVE CHANGES" : "ADD CAR"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          CANCEL
        </button>
      </div>
    </form>
  )
}
