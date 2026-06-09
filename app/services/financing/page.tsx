import type { Metadata } from "next"
import { CreditCard, CheckCircle2 } from "lucide-react"
import { FinanceCalculator } from "@/components/services/finance-calculator"

export const metadata: Metadata = {
  title: "Financing",
  description: "Flexible car financing in Cyprus. We work with trusted local banks to get you a payment plan that fits your budget — quick approvals, clear terms.",
}

const POINTS = [
  { title: "Trusted Local Partners", desc: "We work with established banks and financial partners across Cyprus to find your best rate." },
  { title: "Plans That Fit", desc: "Payment plans tailored to your budget and timeline, not a one-size-fits-all package." },
  { title: "Quick Approvals", desc: "Fast turnaround so you're not left waiting — often approved the same day you apply." },
  { title: "Clear Terms", desc: "No hidden charges or fine-print surprises. You'll know exactly what you're paying." },
]

export default function FinancingPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(227,31,43,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <CreditCard className="w-9 h-9 text-primary mb-6" strokeWidth={1.5} data-aos="fade-up" />
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">OUR SERVICES</div>
          <h1 data-aos="fade-up" data-aos-delay="80" className="font-display text-6xl md:text-8xl tracking-wide mb-6 max-w-2xl leading-none">
            FINANCING
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-lg font-light leading-relaxed text-base md:text-lg">
            We work with trusted local banks and financial partners in Cyprus to get you a payment plan that fits your budget. Quick approvals, clear terms.
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

      {/* Calculator + application */}
      <section className="border-t border-border bg-card py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div data-aos="fade-up" className="mb-12">
            <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">ESTIMATE YOUR REPAYMENTS</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide">WORK OUT THE NUMBERS</h2>
          </div>
          <FinanceCalculator />
        </div>
      </section>
    </div>
  )
}
