import type { Metadata } from "next"
import Link from "next/link"
import { Shield, CheckCircle2 } from "lucide-react"
import { ServiceInquiryForm } from "@/components/services/service-inquiry-form"

export const metadata: Metadata = {
  title: "Warranty & After-Sale",
  description: "Every car comes with a 1-year warranty on the engine and gearbox. We deal only in A-grade cars — we know they're flawless, and we back them.",
}

const POINTS = [
  { title: "1-Year Warranty", desc: "Every car comes with a full year's warranty on the engine and gearbox — the parts that matter most." },
  { title: "A-Grade Cars Only", desc: "We hand-pick only A-grade vehicles. We're confident they're flawless — that's exactly why we back them." },
  { title: "We Stand Behind It", desc: "If something isn't right after you buy, talk to us. We sold it, we'll sort it — no runaround." },
  { title: "Here After You Buy", desc: "Servicing questions, paperwork, honest advice — we're a message away long after the sale." },
]

export default function WarrantyPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(227,31,43,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <Shield className="w-9 h-9 text-primary mb-6" strokeWidth={1.5} data-aos="fade-up" />
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">OUR SERVICES</div>
          <h1 data-aos="fade-up" data-aos-delay="80" className="font-display text-5xl md:text-7xl tracking-wide mb-6 max-w-3xl leading-none">
            WARRANTY &amp; AFTER-SALE
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-lg font-light leading-relaxed text-base md:text-lg">
            Every car we sell comes with a <span className="text-foreground">1-year warranty on the engine and gearbox</span>.
            We deal only in A-grade cars — we know they&rsquo;re flawless, and that&rsquo;s exactly why we stand behind them,
            long after you drive away.
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

      {/* Support request */}
      <section className="border-t border-border bg-card py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_520px] gap-12 xl:gap-20 items-start">
            <div data-aos="fade-up">
              <div className="text-[10px] tracking-[0.35em] text-primary mb-3 font-semibold">AFTER-SALE SUPPORT</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-6 leading-tight">GET IN TOUCH<br />ABOUT YOUR CAR</h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Bought a car from us, or got a question about your warranty? Send us a message with the details and
                we&rsquo;ll sort it — no chasing call centres, just the people who sold you the car.
              </p>
              <p className="text-sm text-muted-foreground/70 font-light leading-relaxed">
                Prefer to talk it through? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> or
                message us on WhatsApp.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <ServiceInquiryForm
                subject="Warranty / after-sale"
                submitLabel="GET IN TOUCH"
                messagePlaceholder="Tell us about your car and what you need — warranty, servicing, or a question after your purchase."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
