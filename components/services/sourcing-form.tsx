"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Send } from "lucide-react"
import { MAKES, FUELS, TRANSMISSIONS } from "@/lib/car-data"

const inputClass = "w-full bg-input border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"

export function SourcingForm() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    make: "", model: "", year: "", fuel: "", transmission: "", budget: "", notes: "",
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    try {
      const res = await fetch("/api/car-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      toast.success("Request received! We'll start sourcing and get back to you.")
    } catch {
      toast.error("Something went wrong. Please try WhatsApp instead.")
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="border border-border bg-card p-8 md:p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Send className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display text-2xl tracking-wide mb-2">REQUEST RECEIVED</h3>
        <p className="text-sm text-muted-foreground font-light">We'll search our European network and come back to you, usually within two weeks.</p>
        <button
          onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", make: "", model: "", year: "", fuel: "", transmission: "", budget: "", notes: "" }) }}
          className="mt-6 text-xs tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors"
        >
          SOURCE ANOTHER CAR
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-card p-6 md:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">FULL NAME *</label>
          <input type="text" placeholder="John Smith" value={form.name} onChange={e => set("name", e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">PHONE *</label>
          <input type="tel" placeholder="+357 99 000000" value={form.phone} onChange={e => set("phone", e.target.value)} required className={inputClass} />
        </div>
      </div>

      <div>
        <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">EMAIL</label>
        <input type="email" placeholder="john@email.com" value={form.email} onChange={e => set("email", e.target.value)} className={inputClass} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">MAKE</label>
          <select value={form.make} onChange={e => set("make", e.target.value)} className={inputClass}>
            <option value="">Any make</option>
            {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">MODEL</label>
          <input type="text" placeholder="e.g. A4, 320i" value={form.model} onChange={e => set("model", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">YEAR FROM</label>
          <input type="number" placeholder="2018" min={1990} max={2026} value={form.year} onChange={e => set("year", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">FUEL</label>
          <select value={form.fuel} onChange={e => set("fuel", e.target.value)} className={inputClass}>
            <option value="">Any</option>
            {FUELS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">GEARBOX</label>
          <select value={form.transmission} onChange={e => set("transmission", e.target.value)} className={inputClass}>
            <option value="">Any</option>
            {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">BUDGET (€)</label>
        <input type="number" placeholder="20000" min={0} step="any" value={form.budget} onChange={e => set("budget", e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">NOTES</label>
        <textarea placeholder="Colour, trim, must-have features, anything else..." value={form.notes} onChange={e => set("notes", e.target.value)} rows={4} className={`${inputClass} resize-none`} />
      </div>

      <button
        type="submit"
        disabled={loading || !form.name || !form.phone}
        className="w-full flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground py-4 font-display text-lg tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "SENDING..." : (<><Send className="w-4 h-4" />REQUEST THIS CAR</>)}
      </button>

      <p className="text-[10px] text-muted-foreground/50 text-center">
        No obligation. We'll only reach out with cars that match what you asked for.
      </p>
    </form>
  )
}
