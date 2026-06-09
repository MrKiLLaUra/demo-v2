"use client"

import { useState, useMemo } from "react"
import { ServiceInquiryForm } from "@/components/services/service-inquiry-form"

const fmt = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(n))

const RATE = 7.5 // indicative APR %

export function FinanceCalculator() {
  const [price, setPrice] = useState(20000)
  const [deposit, setDeposit] = useState(3000)
  const [term, setTerm] = useState(48) // months

  const { monthly, financed, totalPayable, totalInterest } = useMemo(() => {
    const principal = Math.max(0, price - deposit)
    const r = RATE / 100 / 12
    const m = r === 0 ? principal / term : (principal * r) / (1 - Math.pow(1 + r, -term))
    const total = m * term
    return { monthly: m, financed: principal, totalPayable: total, totalInterest: total - principal }
  }, [price, deposit, term])

  const quote = `Finance enquiry — indicative quote
Vehicle price: €${fmt(price)}
Deposit: €${fmt(deposit)}
Amount financed: €${fmt(financed)}
Term: ${term} months
Indicative rate: ${RATE}% APR
Estimated monthly payment: €${fmt(monthly)}
(Indicative only, subject to lender approval.)`

  const rangeClass = "w-full accent-primary cursor-pointer"
  const labelClass = "flex items-center justify-between text-[10px] tracking-[0.2em] text-muted-foreground/70 mb-2"

  return (
    <div className="grid lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-start">
      {/* Calculator */}
      <div data-aos="fade-up" className="border border-border bg-card p-6 md:p-8">
        <div className="text-[10px] tracking-[0.35em] text-primary mb-6 font-semibold">PAYMENT CALCULATOR</div>

        <div className="space-y-7">
          <div>
            <div className={labelClass}><span>VEHICLE PRICE</span><span className="text-foreground text-sm font-medium">€{fmt(price)}</span></div>
            <input type="range" min={3000} max={120000} step={500} value={price} onChange={e => setPrice(+e.target.value)} className={rangeClass} />
          </div>
          <div>
            <div className={labelClass}><span>DEPOSIT</span><span className="text-foreground text-sm font-medium">€{fmt(Math.min(deposit, price))}</span></div>
            <input type="range" min={0} max={price} step={500} value={Math.min(deposit, price)} onChange={e => setDeposit(+e.target.value)} className={rangeClass} />
          </div>
          <div>
            <div className={labelClass}><span>TERM</span><span className="text-foreground text-sm font-medium">{term} months</span></div>
            <input type="range" min={12} max={84} step={6} value={term} onChange={e => setTerm(+e.target.value)} className={rangeClass} />
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <div className="text-[10px] tracking-[0.25em] text-muted-foreground/70 mb-1">ESTIMATED MONTHLY PAYMENT</div>
          <div className="font-display text-6xl md:text-7xl text-primary tracking-wide leading-none">€{fmt(monthly)}</div>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { label: "FINANCED", value: `€${fmt(financed)}` },
              { label: "INTEREST", value: `€${fmt(totalInterest)}` },
              { label: "TOTAL PAYABLE", value: `€${fmt(totalPayable)}` },
            ].map(s => (
              <div key={s.label} className="border border-border p-3">
                <div className="text-[9px] tracking-[0.15em] text-muted-foreground/60 mb-1">{s.label}</div>
                <div className="text-sm font-medium">{s.value}</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/50 mt-5 leading-relaxed">
            Indicative figures at {RATE}% APR for illustration only. Actual rate and terms depend on the lender and your circumstances.
          </p>
        </div>
      </div>

      {/* Application — prefilled with the quote */}
      <div data-aos="fade-up" data-aos-delay="100">
        <div className="text-[10px] tracking-[0.35em] text-primary mb-6 font-semibold">APPLY / ASK A QUESTION</div>
        <ServiceInquiryForm
          subject="Financing enquiry"
          submitLabel="REQUEST FINANCE"
          messagePlaceholder="Anything else we should know? (optional)"
          prefillMessage={quote}
        />
      </div>
    </div>
  )
}
