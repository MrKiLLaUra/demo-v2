"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Send } from "lucide-react"

const inputClass = "w-full bg-input border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"

interface ServiceInquiryFormProps {
  subject: string
  submitLabel?: string
  messagePlaceholder?: string
  /** Optional extra context prepended to the message (e.g. a finance quote). */
  prefillMessage?: string
}

export function ServiceInquiryForm({ subject, submitLabel = "SEND REQUEST", messagePlaceholder = "Tell us a bit about what you need...", prefillMessage = "" }: ServiceInquiryFormProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) return
    setLoading(true)
    try {
      const message = [prefillMessage, form.message].filter(Boolean).join("\n\n") || subject
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject, message }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      toast.success("Request sent! We'll be in touch shortly.")
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
        <p className="text-sm text-muted-foreground font-light">We'll get back to you within the same business day.</p>
        <button
          onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }) }}
          className="mt-6 text-xs tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors"
        >
          SEND ANOTHER REQUEST
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
        <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">EMAIL *</label>
        <input type="email" placeholder="john@email.com" value={form.email} onChange={e => set("email", e.target.value)} required className={inputClass} />
      </div>

      <div>
        <label className="text-[9px] tracking-[0.2em] text-muted-foreground/60 block mb-1.5">MESSAGE</label>
        <textarea placeholder={messagePlaceholder} value={form.message} onChange={e => set("message", e.target.value)} rows={5} className={`${inputClass} resize-none`} />
      </div>

      <button
        type="submit"
        disabled={loading || !form.name || !form.email || !form.phone}
        className="w-full flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground py-4 font-display text-lg tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "SENDING..." : (<><Send className="w-4 h-4" />{submitLabel}</>)}
      </button>

      <p className="text-[10px] text-muted-foreground/50 text-center">
        We respond within 1 business day. For urgent matters, WhatsApp is fastest.
      </p>
    </form>
  )
}
