import type { Metadata } from "next"
import { Bot, CheckCircle2 } from "lucide-react"
import { PriceEngine } from "@/components/services/price-engine"

export const metadata: Metadata = {
  title: "AI Price Engine",
  description: "Our exclusive AI tool gives instant market valuations for any vehicle — even ones not in our stock. Know what you should be paying before you negotiate.",
}

const POINTS = [
  { title: "Instant Valuations", desc: "Get a market-accurate price for any vehicle in seconds, not days." },
  { title: "Any Vehicle", desc: "It works on cars in our stock and ones that aren't — bring any make or model." },
  { title: "Market-Driven", desc: "Valuations are based on real market data, so you know the number is fair." },
  { title: "Negotiate Smarter", desc: "Walk into any deal knowing exactly what you should be paying." },
]

export default function AiPriceEnginePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(227,31,43,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <Bot className="w-9 h-9 text-primary mb-6" strokeWidth={1.5} data-aos="fade-up" />
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">OUR SERVICES</div>
          <h1 data-aos="fade-up" data-aos-delay="80" className="font-display text-6xl md:text-8xl tracking-wide mb-6 max-w-2xl leading-none">
            AI PRICE ENGINE
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-lg font-light leading-relaxed text-base md:text-lg">
            Our exclusive AI tool gives instant market valuations for any vehicle — even ones not in our stock. Know exactly what you should be paying before you negotiate.
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

      {/* Live price engine */}
      <section className="border-t border-border bg-card py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div data-aos="fade-up" className="mb-12">
            <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">TRY IT NOW</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide">VALUE A CAR INSTANTLY</h2>
          </div>
          <PriceEngine />
        </div>
      </section>
    </div>
  )
}
