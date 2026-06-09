"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Sparkles, Bot } from "lucide-react"
import { MAKES, FUELS, TRANSMISSIONS, CONDITIONS } from "@/lib/car-data"

const inputClass = "w-full bg-input border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
const labelClass = "text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5"
const fmt = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(n))

interface ValuationResult {
  low: number
  typical: number
  high: number
  currency: string
  rationale: string
}

export function PriceEngine() {
  const [form, setForm] = useState({ make: "", model: "", year: "", mileage: "", fuel: "", transmission: "", condition: "" })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ValuationResult | null>(null)

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.make || !form.model || !form.year) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed")
      setResult(data)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-start">
      {/* Form */}
      <form onSubmit={handleSubmit} data-aos="fade-up" className="border border-border bg-card p-6 md:p-8 space-y-4">
        <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">VALUE ANY CAR</div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>MAKE *</label>
            <select value={form.make} onChange={e => set("make", e.target.value)} required className={inputClass}>
              <option value="">Select make</option>
              {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>MODEL *</label>
            <input type="text" placeholder="e.g. A4, 320i" value={form.model} onChange={e => set("model", e.target.value)} required className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>YEAR *</label>
            <input type="number" placeholder="2019" min={1990} max={2026} value={form.year} onChange={e => set("year", e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>MILEAGE (KM)</label>
            <input type="number" placeholder="65000" min={0} step="any" value={form.mileage} onChange={e => set("mileage", e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>FUEL</label>
            <select value={form.fuel} onChange={e => set("fuel", e.target.value)} className={inputClass}>
              <option value="">Any</option>
              {FUELS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>GEARBOX</label>
            <select value={form.transmission} onChange={e => set("transmission", e.target.value)} className={inputClass}>
              <option value="">Any</option>
              {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>CONDITION</label>
            <select value={form.condition} onChange={e => set("condition", e.target.value)} className={inputClass}>
              <option value="">Any</option>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !form.make || !form.model || !form.year}
          className="w-full flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground py-4 font-display text-lg tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "VALUING..." : (<><Sparkles className="w-4 h-4" />GET VALUATION</>)}
        </button>
        <p className="text-[10px] text-muted-foreground/50 text-center">
          Powered by Sambi AI. Estimates are indicative and not a binding offer.
        </p>
      </form>

      {/* Result */}
      <div data-aos="fade-up" data-aos-delay="100" className="border border-border bg-card p-6 md:p-8 min-h-[320px] flex flex-col justify-center">
        {loading ? (
          <div className="text-center">
            <Bot className="w-9 h-9 text-primary mx-auto mb-4 animate-pulse" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground font-light">Crunching the market data…</p>
          </div>
        ) : result ? (
          <div className="text-center">
            <div className="text-[10px] tracking-[0.25em] text-muted-foreground/70 mb-1">ESTIMATED MARKET VALUE</div>
            <div className="font-display text-6xl md:text-7xl text-primary tracking-wide leading-none mb-1">€{fmt(result.typical)}</div>
            <div className="text-xs text-muted-foreground mb-8">Typical asking price</div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border border-border p-4">
                <div className="text-[9px] tracking-[0.15em] text-muted-foreground/60 mb-1">LOW</div>
                <div className="font-display text-2xl tracking-wide">€{fmt(result.low)}</div>
              </div>
              <div className="border border-border p-4">
                <div className="text-[9px] tracking-[0.15em] text-muted-foreground/60 mb-1">HIGH</div>
                <div className="font-display text-2xl tracking-wide">€{fmt(result.high)}</div>
              </div>
            </div>
            {result.rationale && (
              <p className="text-sm text-muted-foreground font-light leading-relaxed text-left border-t border-border pt-5">{result.rationale}</p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <Bot className="w-9 h-9 text-primary/40 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground font-light">Fill in the details and hit <span className="text-foreground">Get Valuation</span> — Sambi AI returns a fair market price range in seconds.</p>
          </div>
        )}
      </div>
    </div>
  )
}
