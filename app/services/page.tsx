import type { Metadata } from "next"
import Link from "next/link"
import { Car, Globe, CreditCard, Shield, Bot, Wrench, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Services",
  description: "Used car sales, vehicle sourcing, financing, insurance and more — all under one roof in Limassol.",
}

const SERVICES = [
  {
    Icon: Car,
    title: "Used Car Sales",
    desc: "Hand-picked vehicles from trusted sources across Europe. Every car is inspected, documented, and priced fairly. No surprises.",
    cta: "Browse Cars",
    href: "/cars",
  },
  {
    Icon: Globe,
    title: "Vehicle Sourcing",
    desc: "Want a specific make, model, year or colour we don't have in stock? We source it across Europe and import it directly for you within two weeks.",
    cta: "Contact Us",
    href: "/contact",
  },
  {
    Icon: CreditCard,
    title: "Financing",
    desc: "We work with trusted local banks and financial partners in Cyprus to get you a payment plan that fits your budget. Quick approvals, clear terms.",
    cta: "Get in Touch",
    href: "/contact",
  },
  {
    Icon: Shield,
    title: "Insurance",
    desc: "Drive off the lot fully covered. We partner with leading Cyprus insurance providers to get you competitive rates on the same day.",
    cta: "Get a Quote",
    href: "/contact",
  },
  {
    Icon: Bot,
    title: "AI Price Engine",
    desc: "Our exclusive AI tool gives instant market valuations for any vehicle — even ones not in our stock. Know exactly what you should be paying before you negotiate.",
    cta: "Try It Now",
    href: "/cars",
  },
  {
    Icon: Wrench,
    title: "Pre-Sale Inspection",
    desc: "Every car goes through our rigorous 100-point check before listing. Engine, brakes, electrics, bodywork — nothing gets missed.",
    cta: "Learn More",
    href: "/about",
  },
]

const PROCESS = [
  { n: "01", title: "Browse & Select", desc: "Explore our inventory online or tell us what you want." },
  { n: "02", title: "Test Drive",      desc: "Book a same-day test drive from our Limassol lot." },
  { n: "03", title: "Finance & Cover", desc: "We handle financing and insurance on the same day." },
  { n: "04", title: "Drive Away",      desc: "Pick up your car fully covered and ready to go." },
]

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(227,31,43,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">WHAT WE OFFER</div>
          <h1 data-aos="fade-up" data-aos-delay="80" className="font-display text-6xl md:text-8xl tracking-wide mb-6 max-w-2xl leading-none">
            OUR SERVICES
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-lg font-light leading-relaxed text-base md:text-lg">
            From finding your car to driving away fully covered — we handle everything so you can focus on the drive.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="border border-border bg-card p-7 md:p-8 group hover:border-primary/40 hover:shadow-[0_8px_32px_rgba(227,31,43,0.06)] transition-all duration-300 flex flex-col"
              >
                <s.Icon className="w-9 h-9 text-primary mb-6 shrink-0" strokeWidth={1.5} />
                <h3 className="font-display text-2xl tracking-wide mb-3">{s.title.toUpperCase()}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light flex-1">{s.desc}</p>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors group/link"
                >
                  {s.cta}
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border bg-card py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div data-aos="fade-up" className="mb-14">
            <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">HOW IT WORKS</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide">THE PROCESS</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((step, i) => (
              <div key={step.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="font-display text-5xl text-primary/20 mb-4">{step.n}</div>
                <div className="w-8 h-px bg-primary mb-4" />
                <h3 className="font-display text-xl tracking-wide mb-2">{step.title.toUpperCase()}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-8 text-center">
        <div className="max-w-xl mx-auto">
          <h2 data-aos="fade-up" className="font-display text-4xl md:text-5xl tracking-wide mb-6">READY TO START?</h2>
          <p data-aos="fade-up" data-aos-delay="80" className="text-muted-foreground mb-8 font-light">Browse our current inventory or get in touch to tell us what you need.</p>
          <div data-aos="fade-up" data-aos-delay="160" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-display text-lg tracking-widest transition-colors">BROWSE CARS</Link>
            <Link href="/contact" className="border border-foreground/20 hover:border-foreground/50 px-8 py-4 font-display text-lg tracking-widest transition-colors">CONTACT US</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
