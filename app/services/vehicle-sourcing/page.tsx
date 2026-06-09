import type { Metadata } from "next"
import Link from "next/link"
import { Globe, CheckCircle2 } from "lucide-react"
import { SourcingForm } from "@/components/services/sourcing-form"

export const metadata: Metadata = {
  title: "Vehicle Sourcing",
  description: "Can't find it in stock? We source any make, model, year or colour across Europe and import it directly to Cyprus within two weeks.",
}

const POINTS = [
  { title: "Tell Us What You Want", desc: "Give us the make, model, year, colour and budget — we handle the search from there." },
  { title: "Europe-Wide Network", desc: "Our sourcing network spans the EU, giving access to thousands of vehicles beyond our lot." },
  { title: "Direct Import", desc: "We import the car directly for you, handling logistics and paperwork end to end." },
  { title: "Within Two Weeks", desc: "Most vehicles are located and on their way to Cyprus in under two weeks." },
]

export default function VehicleSourcingPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(227,31,43,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <Globe className="w-9 h-9 text-primary mb-6" strokeWidth={1.5} data-aos="fade-up" />
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">OUR SERVICES</div>
          <h1 data-aos="fade-up" data-aos-delay="80" className="font-display text-6xl md:text-8xl tracking-wide mb-6 max-w-2xl leading-none">
            VEHICLE SOURCING
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-lg font-light leading-relaxed text-base md:text-lg">
            Want a specific make, model, year or colour we don't have in stock? We source it across Europe and import it directly for you within two weeks.
          </p>
        </div>
      </section>

      {/* Points */}
      <section className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            {POINTS.map((p, i) => (
              <div
                key={p.title}
                data-aos="fade-up"
                data-aos-delay={i * 70}
                className="border border-border bg-card p-7 md:p-8 hover:border-primary/40 transition-colors duration-300"
              >
                <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-display text-xl tracking-wide mb-2">{p.title.toUpperCase()}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing request form */}
      <section className="border-t border-border bg-card py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_520px] gap-12 xl:gap-20 items-start">
            <div data-aos="fade-up">
              <div className="text-[10px] tracking-[0.35em] text-primary mb-3 font-semibold">START THE SEARCH</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-6 leading-tight">TELL US WHAT<br />YOU'RE AFTER</h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Fill in as much or as little as you know. The more detail you give us — make, model, year, budget, must-have features — the faster we can match you with the right car from our European network.
              </p>
              <p className="text-sm text-muted-foreground/70 font-light leading-relaxed">
                Prefer to talk it through? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> or message us on WhatsApp and we'll take it from there.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <SourcingForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
