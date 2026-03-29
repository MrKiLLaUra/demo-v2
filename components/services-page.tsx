"use client"

import { Button } from "@/components/ui/button"
import { WhyUs } from "@/components/why-us"
import { Page } from "@/lib/car-data"
import { Car, Globe, CreditCard, Shield, Bot, Wrench } from "lucide-react"

interface ServicesPageProps {
  setPage: (page: Page) => void
}

const services = [
  { 
    icon: Car, 
    title: "Used Car Sales", 
    desc: "Hand-picked vehicles from trusted sources. Every car is inspected, documented, and priced fairly. What you see is what you get.", 
    cta: "Browse Cars",
    action: "inventory" as Page
  },
  { 
    icon: Globe, 
    title: "Vehicle Sourcing", 
    desc: "Want a specific make, model, year, or colour we don't have in stock? We'll find it across Europe and import it directly for you.", 
    cta: "Contact Us",
    action: "contact" as Page
  },
  { 
    icon: CreditCard, 
    title: "Financing", 
    desc: "We work with trusted local banks and financial partners to get you a payment plan that fits your budget. Quick approvals, clear terms.", 
    cta: "Learn More",
    action: "contact" as Page
  },
  { 
    icon: Shield, 
    title: "Insurance", 
    desc: "Drive off the lot fully covered. We partner with leading insurance providers to get you competitive rates on the same day.", 
    cta: "Get Quote",
    action: "contact" as Page
  },
  { 
    icon: Bot, 
    title: "AI Price Engine", 
    desc: "Our exclusive AI tool gives instant market valuations for any vehicle — even ones not in our stock. Know exactly what you should be paying.", 
    cta: "Try It",
    action: "inventory" as Page
  },
  { 
    icon: Wrench, 
    title: "Pre-Sale Inspection", 
    desc: "Every car goes through our 100-point check before listing. Engine, brakes, electrics, bodywork — nothing gets missed.", 
    cta: "Learn More",
    action: "about" as Page
  },
]

export function ServicesPage({ setPage }: ServicesPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border/50 py-16 md:py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,31,43,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="text-xs tracking-[0.3em] text-primary mb-4 font-semibold">WHAT WE OFFER</div>
        <h1 className="font-display text-5xl md:text-6xl tracking-wide leading-none mb-5">OUR SERVICES</h1>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed font-light">
          From finding your car to driving away fully covered — we handle everything.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-[1100px] mx-auto py-16 md:py-20 px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(s => (
            <div 
              key={s.title} 
              className="border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-primary hover:-translate-y-1"
            >
              <s.icon className="w-9 h-9 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-xl tracking-wide mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 font-light">{s.desc}</p>
              <Button 
                variant="ghost"
                onClick={() => setPage(s.action)}
                className="text-xs tracking-[0.15em] text-muted-foreground hover:text-primary p-0 h-auto"
              >
                {s.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <WhyUs />
    </div>
  )
}
