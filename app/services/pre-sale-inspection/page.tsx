import type { Metadata } from "next"
import Link from "next/link"
import { Wrench, CheckCircle2 } from "lucide-react"
import { ServiceInquiryForm } from "@/components/services/service-inquiry-form"

export const metadata: Metadata = {
  title: "Pre-Sale Inspection",
  description: "Buy with confidence. You're welcome to have any of our cars independently inspected by a mechanic or garage of your choice before you commit.",
}

const POINTS = [
  { title: "Independent Checks Welcome", desc: "Have any car inspected by a mechanic or garage you trust, before you buy. We've got nothing to hide." },
  { title: "Full History & Documents", desc: "We share the paperwork and service history we hold on every vehicle, so you know what you're buying." },
  { title: "No Pressure", desc: "Take your time. Inspect it, test drive it, ask questions — then decide when you're ready." },
  { title: "Straight Answers", desc: "Ask us anything about a car's condition and you'll get an honest answer, not a sales pitch." },
]

export default function PreSaleInspectionPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(227,31,43,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <Wrench className="w-9 h-9 text-primary mb-6" strokeWidth={1.5} data-aos="fade-up" />
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">OUR SERVICES</div>
          <h1 data-aos="fade-up" data-aos-delay="80" className="font-display text-6xl md:text-8xl tracking-wide mb-6 max-w-2xl leading-none">
            PRE-SALE INSPECTION
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-lg font-light leading-relaxed text-base md:text-lg">
            Want a car checked before you buy? We encourage it. You&rsquo;re welcome to have any of our vehicles
            independently inspected by a mechanic or garage of your choice — no pressure, no hidden surprises.
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

      {/* Arrange an inspection */}
      <section className="border-t border-border py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_520px] gap-12 xl:gap-20 items-start">
            <div data-aos="fade-up">
              <div className="text-[10px] tracking-[0.35em] text-primary mb-3 font-semibold">FULL TRANSPARENCY</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-6 leading-tight">ARRANGE AN<br />INSPECTION</h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Found a car you like? Tell us which one and we&rsquo;ll arrange a time for you — or your own mechanic — to
                come and inspect it, and share the documents and history we have on it.
              </p>
              <p className="text-sm text-muted-foreground/70 font-light leading-relaxed">
                <Link href="/cars" className="text-primary hover:underline">Browse the inventory</Link> and tell us which
                car you&rsquo;d like to check over.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <ServiceInquiryForm
                subject="Inspection request"
                submitLabel="REQUEST INSPECTION"
                messagePlaceholder="Which car would you like to inspect? Add the make, model and year."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
