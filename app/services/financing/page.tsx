import type { Metadata } from "next"
import { CreditCard, CheckCircle2 } from "lucide-react"
import { FinanceCalculator } from "@/components/services/finance-calculator"

export const metadata: Metadata = {
  title: "Financing",
  description: "Simple in-house car financing in Cyprus — no banks, no lengthy approvals. Pay a deposit and spread the balance over up to 12 months on our own vehicles.",
}

const POINTS = [
  { title: "Straight From Us", desc: "Financing handled directly by us — no banks, no third parties, no drawn-out approvals." },
  { title: "Simple Terms", desc: "A deposit of around 50% and the balance spread over up to 12 months, on our own cars." },
  { title: "Fast & Personal", desc: "We sort the plan with you face to face. Decide today, sort the paperwork the same day." },
  { title: "Clear, No Surprises", desc: "You'll know the deposit, the monthly amount and the end date up front. No hidden charges." },
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
            We keep financing simple — no banks, no paperwork marathons. Pay a deposit of around 50% and spread the rest
            over up to 12 months, directly with us, on our own vehicles.
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
