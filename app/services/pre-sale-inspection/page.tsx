import type { Metadata } from "next"
import Link from "next/link"
import { Wrench, CheckCircle2 } from "lucide-react"
import { InspectionChecklist } from "@/components/services/inspection-checklist"
import { ServiceInquiryForm } from "@/components/services/service-inquiry-form"

export const metadata: Metadata = {
  title: "Pre-Sale Inspection",
  description: "Every car goes through our rigorous 100-point check before listing — engine, brakes, electrics and bodywork. Nothing gets missed.",
}

const POINTS = [
  { title: "100-Point Check", desc: "A rigorous inspection covering every major system before a car is ever listed." },
  { title: "Mechanical & Electrical", desc: "Engine, brakes, transmission and electrics are all tested and verified." },
  { title: "Bodywork & Interior", desc: "We assess paint, panels and cabin condition so there are no nasty surprises." },
  { title: "Nothing Gets Missed", desc: "If something isn't right, we fix it or flag it — you always get the full picture." },
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
            Every car goes through our rigorous 100-point check before listing. Engine, brakes, electrics, bodywork — nothing gets missed.
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

      {/* The checklist */}
      <section className="border-t border-border bg-card py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div data-aos="fade-up" className="mb-12">
            <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">WHAT WE CHECK</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide">THE 100-POINT CHECK</h2>
            <p className="text-muted-foreground font-light mt-4 max-w-xl">Tap any category to see what our technicians go through before a car is listed.</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <InspectionChecklist />
          </div>
        </div>
      </section>

      {/* Request a report */}
      <section className="border-t border-border py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_520px] gap-12 xl:gap-20 items-start">
            <div data-aos="fade-up">
              <div className="text-[10px] tracking-[0.35em] text-primary mb-3 font-semibold">FULL TRANSPARENCY</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-6 leading-tight">REQUEST AN<br />INSPECTION REPORT</h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Interested in a specific car? Ask us for its full inspection report and we'll send the detailed results over so you know exactly what you're buying — before you commit.
              </p>
              <p className="text-sm text-muted-foreground/70 font-light leading-relaxed">
                Every car on our lot has already passed the check. <Link href="/cars" className="text-primary hover:underline">Browse the inventory</Link> and tell us which one you'd like the report for.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <ServiceInquiryForm
                subject="Inspection report request"
                submitLabel="REQUEST REPORT"
                messagePlaceholder="Which car would you like the inspection report for? Add the make, model and year."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
