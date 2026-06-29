import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Award, Users, Globe, Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Sambi Top Gear Motors — a family-run dealership in Limassol, Cyprus with over 8 years of experience and 1,000+ cars sold.",
}

const TEAM = [
  {
    name: "Kosmas Sambi",
    role: "CEO",
    bio: "8+ years in the automotive industry with a passion for matching people with the right car at the right price. Kosmas oversees every deal personally.",
  },
  {
    name: "Kostas Sambi",
    role: "Founder",
    bio: "8 years building Sambi Top Gear from the ground up. Kostas has an encyclopaedic knowledge of every car on the lot and the worldwide import market.",
  },
  {
    name: "Annisa Sambi",
    role: "Sales Manager",
    bio: "Dedicated to making the buying experience as smooth as possible. Annisa handles financing, paperwork, and after-sale support.",
  },
]

const VALUES = [
  {
    Icon: Award,
    title: "Transparency",
    desc: "Every car comes with full documentation. What you see is what you get — no hidden fees, no surprises.",
  },
  {
    Icon: Users,
    title: "People First",
    desc: "We're a family business. We treat every customer the way we'd want a family member treated when buying a car.",
  },
  {
    Icon: Globe,
    title: "Worldwide Network",
    desc: "Our sourcing network spans Europe and beyond — we can locate and import vehicles from around the world on your behalf.",
  },
  {
    Icon: Wrench,
    title: "Quality First",
    desc: "We hand-pick every car, and you're welcome to have any of them independently inspected before you buy. We only sell cars we'd put our own family in.",
  },
]

const MILESTONES = [
  { year: "2018", event: "Sambi Top Gear Motors founded in Limassol, Cyprus." },
  { year: "2021", event: "Sourcing network expands worldwide — importing cars from across the globe." },
  { year: "2023", event: "In-house payment plans launched — financing direct from us, no banks." },
  { year: "2024", event: "Introduced our AI price engine for instant market valuations." },
  { year: "2026", event: "Over 1,000 cars sold — and counting." },
]

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(227,31,43,0.06)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">OUR STORY</div>
          <h1 data-aos="fade-up" data-aos-delay="80" className="font-display text-6xl md:text-8xl tracking-wide mb-6 max-w-2xl leading-none">
            ABOUT US
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-lg font-light leading-relaxed text-base md:text-lg">
            A family-run dealership built on honesty, deep automotive knowledge, and a genuine love for getting people into the right car.
          </p>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div data-aos="fade-up">
              <div className="text-[10px] tracking-[0.35em] text-primary mb-3 font-semibold">WHO WE ARE</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-6 leading-tight">
                BUILT ON TRUST,<br />DRIVEN BY PASSION
              </h2>
              <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
                <p>
                  Sambi Top Gear Motors was founded in Limassol in 2018 with a single goal: to create a car-buying experience that feels honest, personal, and genuinely helpful — something rare in the used car market.
                </p>
                <p>
                  We source hand-picked vehicles from across Europe and around the world, check every one carefully, and price them fairly. No inflated tags, no pushy sales tactics. Just good cars and straight answers.
                </p>
                <p>
                  Over 1,000 cars sold and 8 years later, we've grown our team, our network, and our services — but the family values that started us haven't changed.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm tracking-[0.15em] text-foreground hover:text-primary transition-colors group"
                >
                  GET IN TOUCH
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div data-aos="fade-up" data-aos-delay="100" className="grid grid-cols-2 gap-4">
              {[
                { num: "8+",     label: "Years in Business" },
                { num: "1000+",  label: "Cars Sold" },
                { num: "2H",     label: "Avg. Sourcing Time" },
                { num: "100%",   label: "Hand-Picked" },
              ].map(s => (
                <div key={s.label} className="border border-border bg-card p-6 md:p-8">
                  <div className="font-display text-5xl md:text-6xl text-primary tracking-wide mb-2">{s.num}</div>
                  <div className="text-xs tracking-[0.15em] text-muted-foreground">{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-card py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div data-aos="fade-up" className="mb-14">
            <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">WHAT DRIVES US</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide">OUR VALUES</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                data-aos="fade-up"
                data-aos-delay={i * 70}
                className="border border-border bg-background p-6 md:p-8 hover:border-primary/40 transition-colors duration-300"
              >
                <v.Icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="font-display text-xl tracking-wide mb-3">{v.title.toUpperCase()}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div data-aos="fade-up" className="mb-14">
            <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">THE PEOPLE</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide">MEET THE TEAM</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="border border-border bg-card p-7 md:p-8 group hover:border-primary/40 transition-colors duration-300"
              >
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <span className="font-display text-xl text-primary">{member.name.charAt(0)}</span>
                </div>
                <div className="text-[10px] tracking-[0.25em] text-primary mb-1 font-semibold">{member.role.toUpperCase()}</div>
                <h3 className="font-display text-2xl tracking-wide mb-3">{member.name.toUpperCase()}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border bg-card py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div data-aos="fade-up" className="mb-14">
            <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">SINCE 2018</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide">OUR JOURNEY</h2>
          </div>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-[7px] hidden sm:block" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={m.year} data-aos="fade-up" data-aos-delay={i * 60} className="sm:pl-10 relative">
                  <div className="hidden sm:block absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background" />
                  <div className="text-[10px] tracking-[0.3em] text-primary mb-1 font-semibold">{m.year}</div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-8 text-center">
        <div className="max-w-xl mx-auto">
          <h2 data-aos="fade-up" className="font-display text-4xl md:text-5xl tracking-wide mb-6">COME SAY HELLO</h2>
          <p data-aos="fade-up" data-aos-delay="80" className="text-muted-foreground mb-8 font-light">
            Visit us in Limassol, drop us a message, or browse our current inventory online.
          </p>
          <div data-aos="fade-up" data-aos-delay="160" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-display text-lg tracking-widest transition-colors">BROWSE CARS</Link>
            <Link href="/contact" className="border border-foreground/20 hover:border-foreground/50 px-8 py-4 font-display text-lg tracking-widest transition-colors">CONTACT US</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
