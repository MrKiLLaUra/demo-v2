export const dynamic = "force-dynamic"

import { fetchCars, fmt, carSlug } from "@/lib/car-data"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { HeroSection } from "@/components/home/hero-section"
import { Testimonials } from "@/components/testimonials"
import { WhyUs } from "@/components/why-us"

const WHY_ITEMS = [
  { label: "Inspected", desc: "Every car passes our 100-point check before listing." },
  { label: "Honest Pricing", desc: "No hidden fees. Price shown is price paid." },
  { label: "Fast Sourcing", desc: "We find any car across Europe in under 2 weeks." },
  { label: "Same-Day Cover", desc: "Drive away fully insured on the same day." },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Sambi Top Gear Motors",
  "description": "Premium used car dealership in Limassol, Cyprus. Hand-picked vehicles, transparent pricing, and AI-powered search.",
  "url": "https://sambitopgearmotors.com",
  "telephone": "+35799929323",
  "email": "sambitopgearmotors@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Limassol",
    "addressCountry": "CY"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ],
  "priceRange": "€€",
  "sameAs": ["https://wa.me/35799929323"]
}

export default async function HomePage() {
  const allCars = await fetchCars()
  const featured = allCars
    .filter(c => c.status?.toLowerCase() !== "sold")
    // Newest additions first: sort by created_at, falling back to id (highest =
    // most recently added) so ties — e.g. the initial backfill — still surface
    // the last-added cars.
    .sort((a, b) => {
      const ta = a.created_at ? Date.parse(a.created_at) : 0
      const tb = b.created_at ? Date.parse(b.created_at) : 0
      return tb - ta || b.id - a.id
    })
    .slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />

      {/* ── Featured Cars ── */}
      <section className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div
            data-aos="fade-up"
            className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10 md:mb-12"
          >
            <div>
              <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">HAND-PICKED</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide">FEATURED CARS</h2>
            </div>
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
            >
              VIEW ALL INVENTORY
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No cars available right now.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((car, i) => {
                const priceVisible = car.showPrice === true && car.price !== null
                return (
                  <Link
                    key={car.id}
                    href={`/cars/${carSlug(car)}`}
                    data-aos="fade-up"
                    data-aos-delay={i * 60}
                    className="group border border-border bg-card hover:border-primary/50 hover:shadow-[0_8px_32px_rgba(227,31,43,0.1)] transition-all duration-300 overflow-hidden block"
                  >
                    <div className="relative h-48 md:h-52 bg-secondary overflow-hidden">
                      {car.images?.preview && (
                        <Image
                          src={car.images.preview}
                          alt={`${car.year} ${car.make} ${car.model}`}
                          fill
                          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                          quality={70}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          priority={i < 2}
                        />
                      )}
                      <div className="absolute top-3 right-3">
                        {priceVisible ? (
                          <span className="bg-primary text-primary-foreground px-3 py-1.5 font-display text-base tracking-wide">
                            {fmt(car.price!)}
                          </span>
                        ) : (
                          <span className="border border-primary/70 text-primary px-2.5 py-1 text-[10px] tracking-widest bg-background/80 backdrop-blur-sm">
                            POA
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] text-muted-foreground tracking-widest mb-1">
                        {car.year} · {car.condition.toUpperCase()}
                      </div>
                      <h3 className="font-display text-2xl tracking-wide mb-3 leading-none">
                        {car.make} {car.model}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {[car.fuel, car.transmission, `${car.mileage.toLocaleString()} km`].map(t => (
                          <span key={t} className="text-[10px] text-muted-foreground border border-border px-2.5 py-1 tracking-wide">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          <div data-aos="fade-up" className="text-center mt-10">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 border border-border hover:border-primary text-sm tracking-[0.2em] px-8 py-4 transition-all hover:text-primary group"
            >
              BROWSE FULL INVENTORY
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="border-y border-border bg-card py-12 md:py-14">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-border">
            {[
              { n: "200+", label: "Cars Sold" },
              { n: "7+",   label: "Years Experience" },
              { n: "100%", label: "Transparent Pricing" },
              { n: "24/7", label: "AI Assistant" },
            ].map((s, i) => (
              <div key={s.label} data-aos="fade-up" data-aos-delay={i * 80} className="text-center md:px-8">
                <div className="font-display text-4xl md:text-5xl tracking-wide text-primary mb-1">{s.n}</div>
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div data-aos="fade-up" className="mb-12">
            <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">OUR PROMISE</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide max-w-md">WHY BUY FROM US</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <div key={item.label} data-aos="fade-up" data-aos-delay={i * 70} className="border border-border p-6 bg-card group hover:border-primary/40 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                <div className="font-display text-xl tracking-wide mb-2">{item.label.toUpperCase()}</div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ── CTA Strip ── */}
      <section className="relative py-20 md:py-28 px-6 md:px-8 border-t border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,31,43,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto text-center relative z-10">
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">READY TO DRIVE?</div>
          <h2 data-aos="fade-up" data-aos-delay="80" className="font-display text-5xl md:text-7xl tracking-wide mb-6">FIND YOUR<br />NEXT CAR</h2>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-md mx-auto mb-10 font-light">
            Browse our curated inventory or tell us what you want — we will source it from across Europe.
          </p>
          <div data-aos="fade-up" data-aos-delay="240" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cars"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 font-display text-lg tracking-[0.15em] transition-colors"
            >
              BROWSE INVENTORY
            </Link>
            <a
              href="https://wa.me/35799929323"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground/20 hover:border-foreground/50 px-10 py-4 font-display text-lg tracking-[0.15em] transition-colors"
            >
              WHATSAPP US
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
