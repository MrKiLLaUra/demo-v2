export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Car, CheckCircle2, ArrowRight } from "lucide-react"
import { fetchCars, fmt, carSlug } from "@/lib/car-data"

export const metadata: Metadata = {
  title: "Used Car Sales",
  description: "Hand-picked used cars in Limassol — inspected, documented and fairly priced. What you see is what you get, no surprises.",
}

const POINTS = [
  { title: "Hand-Picked Stock", desc: "Every car is sourced from trusted suppliers across the globe and chosen for condition and value." },
  { title: "Fully Documented", desc: "Complete service history and paperwork on every vehicle. No hidden past, no guesswork." },
  { title: "Fair, Honest Pricing", desc: "The price on the tag is the price you pay. No inflated numbers, no pushy add-ons." },
  { title: "Inspected & Ready", desc: "Each car passes our 100-point check before it reaches the lot and your driveway." },
]

export default async function UsedCarSalesPage() {
  const allCars = await fetchCars()
  const available = allCars.filter(c => c.status?.toLowerCase() !== "sold").slice(0, 6)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(227,31,43,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <Car className="w-9 h-9 text-primary mb-6" strokeWidth={1.5} data-aos="fade-up" />
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">OUR SERVICES</div>
          <h1 data-aos="fade-up" data-aos-delay="80" className="font-display text-6xl md:text-8xl tracking-wide mb-6 max-w-2xl leading-none">
            USED CAR SALES
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-lg font-light leading-relaxed text-base md:text-lg">
            Hand-picked vehicles from trusted sources across the globe. Every car is inspected, documented, and priced fairly — what you see is what you get.
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

      {/* Live inventory */}
      <section className="border-t border-border bg-card py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div data-aos="fade-up" className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10 md:mb-12">
            <div>
              <div className="text-[10px] tracking-[0.35em] text-primary mb-2 font-semibold">AVAILABLE NOW</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-wide">IN STOCK</h2>
            </div>
            <Link href="/cars" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group">
              VIEW ALL INVENTORY
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {available.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No cars available right now — check back soon or contact us.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {available.map((car, i) => {
                const priceVisible = car.showPrice === true && car.price !== null
                return (
                  <Link
                    key={car.id}
                    href={`/cars/${carSlug(car)}`}
                    data-aos="fade-up"
                    data-aos-delay={i * 60}
                    className="group border border-border bg-background hover:border-primary/50 hover:shadow-[0_8px_32px_rgba(227,31,43,0.1)] transition-all duration-300 overflow-hidden block"
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
                        />
                      )}
                      <div className="absolute top-3 right-3">
                        {priceVisible ? (
                          <span className="bg-primary text-primary-foreground px-3 py-1.5 font-display text-base tracking-wide">{fmt(car.price!)}</span>
                        ) : (
                          <span className="border border-primary/70 text-primary px-2.5 py-1 text-[10px] tracking-widest bg-background/80 backdrop-blur-sm">POA</span>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] text-muted-foreground tracking-widest mb-1">{car.year} · {car.condition.toUpperCase()}</div>
                      <h3 className="font-display text-2xl tracking-wide mb-3 leading-none">{car.make} {car.model}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {[car.fuel, car.transmission, `${car.mileage.toLocaleString()} km`].map(t => (
                          <span key={t} className="text-[10px] text-muted-foreground border border-border px-2.5 py-1 tracking-wide">{t}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20 px-6 md:px-8 text-center">
        <div className="max-w-xl mx-auto">
          <h2 data-aos="fade-up" className="font-display text-4xl md:text-5xl tracking-wide mb-6">FIND YOUR NEXT CAR</h2>
          <p data-aos="fade-up" data-aos-delay="80" className="text-muted-foreground mb-8 font-light">Browse our full inventory or get in touch to tell us what you need.</p>
          <div data-aos="fade-up" data-aos-delay="160" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-display text-lg tracking-widest transition-colors">BROWSE CARS</Link>
            <Link href="/contact" className="border border-foreground/20 hover:border-foreground/50 px-8 py-4 font-display text-lg tracking-widest transition-colors">CONTACT US</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
