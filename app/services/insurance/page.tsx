import type { Metadata } from "next"
import Link from "next/link"
import { Shield, CheckCircle2 } from "lucide-react"
import { ServiceInquiryForm } from "@/components/services/service-inquiry-form"

export const metadata: Metadata = {
  title: "Insurance",
  description: "Drive off fully covered. We partner with leading Cyprus insurance providers to get you competitive rates on the same day you buy.",
}

const POINTS = [
  { title: "Leading Providers", desc: "We partner with top Cyprus insurers to compare cover and find you the right policy." },
  { title: "Competitive Rates", desc: "We negotiate on your behalf so you get strong cover without overpaying." },
  { title: "Same-Day Cover", desc: "Get insured the same day you buy and drive off the lot fully protected." },
  { title: "Hassle-Free Setup", desc: "We handle the coordination and paperwork so you don't have to chase anyone." },
]

export default function InsurancePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(227,31,43,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <Shield className="w-9 h-9 text-primary mb-6" strokeWidth={1.5} data-aos="fade-up" />
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">OUR SERVICES</div>
          <h1 data-aos="fade-up" data-aos-delay="80" className="font-display text-6xl md:text-8xl tracking-wide mb-6 max-w-2xl leading-none">
            INSURANCE
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-lg font-light leading-relaxed text-base md:text-lg">
            Drive off the lot fully covered. We partner with leading Cyprus insurance providers to get you competitive rates on the same day.
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

      {/* Quote request */}
      <section className="border-t border-border bg-card py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_520px] gap-12 xl:gap-20 items-start">
            <div data-aos="fade-up">
              <div className="text-[10px] tracking-[0.35em] text-primary mb-3 font-semibold">SAME-DAY QUOTE</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-6 leading-tight">REQUEST AN<br />INSURANCE QUOTE</h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Send us your details and the car you're insuring. We'll compare cover from leading Cyprus providers and come back with competitive options — usually the same day.
              </p>
              <p className="text-sm text-muted-foreground/70 font-light leading-relaxed">
                Already buying a car with us? Mention it and we'll line up cover so you can drive away fully protected. Prefer to talk? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <ServiceInquiryForm
                subject="Insurance quote"
                submitLabel="REQUEST QUOTE"
                messagePlaceholder="Which car are you insuring? Add the make, model, year and your driving history if you can."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
