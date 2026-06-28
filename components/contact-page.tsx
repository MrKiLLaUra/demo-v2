"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactInfo = [
  { icon: MapPin, label: "Address",          value: "Limassol, Cyprus" },
  { icon: Phone,  label: "Phone / WhatsApp", value: "+35799929323" },
  { icon: Mail,   label: "Email",            value: "sambitopgearmotors@gmail.com" },
  { icon: Clock,  label: "Hours",            value: "Mon–Sat: 10:00 – 18:00 · Sun: Closed" },
]

export function ContactPage() {
  const [form, setForm]         = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [sent, setSent]         = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError]       = useState("")

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setError("Contact form is not configured yet. Please add your Web3Forms access key.")
      return
    }

    setIsSending(true)
    setError("")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: "Sambi Top Gear Motors Website",
          subject: form.subject || "New lead from website contact form",
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setSent(true)
        setForm({ name: "", email: "", phone: "", subject: "", message: "" })
      } else {
        setError("We could not send your message right now. Please try again.")
      }
    } catch {
      setError("Network error. Please try again in a moment.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border/50 py-16 md:py-20 px-6 text-center">
        <div
          data-aos="fade-up"
          className="text-xs tracking-[0.3em] text-primary mb-4 font-semibold"
        >
          GET IN TOUCH
        </div>
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="font-display text-5xl md:text-6xl tracking-wide mb-4"
        >
          CONTACT US
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-muted-foreground max-w-sm mx-auto leading-relaxed font-light"
        >
          Questions about a car? Want us to source something? Just say hi. We respond fast.
        </p>
      </section>

      {/* Map */}
      <section
        data-aos="fade-in"
        className="w-full h-[260px] md:h-[320px] border-b border-border/50 overflow-hidden"
      >
        <iframe
          title="Sambi Top Gear Motors – Limassol"
          src="https://maps.google.com/maps?q=Limassol%2C+Cyprus&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full grayscale opacity-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* Content */}
      <section className="max-w-[1100px] mx-auto py-12 md:py-16 px-6 grid md:grid-cols-2 gap-12 md:gap-16">

        {/* ── Contact Info ── */}
        <div data-aos="fade-right">
          <h2 className="font-display text-2xl tracking-wide mb-8">REACH US</h2>

          {contactInfo.map((item, i) => (
            <div
              key={item.label}
              data-aos="fade-right"
              data-aos-delay={i * 100}
              className="flex gap-4 items-start mb-6 pb-6 border-b border-border last:border-0"
            >
              <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="text-[10px] text-muted-foreground tracking-widest mb-1">
                  {item.label.toUpperCase()}
                </div>
                <div className="text-foreground/80">{item.value}</div>
              </div>
            </div>
          ))}

          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="border border-border p-5 bg-primary/[0.02] relative mt-8"
          >
            <div className="absolute top-0 left-5 w-8 h-0.5 bg-primary -translate-y-px" />
            <div className="text-[10px] text-primary tracking-widest mb-2">PRO TIP</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"WhatsApp is the fastest way to reach us. Send us the make and model you want and we'll reply within the hour."}
            </p>
          </div>
        </div>

        {/* ── Form ── */}
        <div data-aos="fade-left" data-aos-delay="100">
          {!sent ? (
            <>
              <h2 className="font-display text-2xl tracking-wide mb-8">SEND A MESSAGE</h2>
              <form onSubmit={handleSend}>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">NAME</label>
                    <Input
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">EMAIL</label>
                    <Input
                      type="email"
                      placeholder="john@email.com"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">PHONE (OPTIONAL)</label>
                    <Input
                      placeholder="+357 99 000000"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">SUBJECT</label>
                    <Input
                      placeholder="Interested in a car..."
                      value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] tracking-[0.2em] text-muted-foreground block mb-2">MESSAGE</label>
                    <Textarea
                      placeholder="Tell us what you're looking for..."
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="bg-input border-border resize-none"
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                <Button
                  type="submit"
                  disabled={!form.name || !form.email || !form.message || isSending}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest"
                >
                  {isSending ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </form>
            </>
          ) : (
            <div data-aos="zoom-in" className="text-center py-12">
              <h2 className="font-display text-4xl tracking-wide text-primary mb-4">MESSAGE SENT</h2>
              <div className="border border-border p-6 bg-primary/[0.02] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-primary -translate-y-px" />
                <p className="text-muted-foreground leading-relaxed">
                  {"Thank you for reaching out! We've received your message and will get back to you as soon as possible."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
