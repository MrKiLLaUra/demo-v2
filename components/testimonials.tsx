"use client"

const TESTIMONIALS = [
  {
    name: "Andreas M.",
    location: "Limassol",
    car: "2021 BMW 320i",
    quote: "Found exactly what I was looking for within a week. The AI pricing tool showed me the car was fairly priced before I even asked — that kind of transparency is rare.",
  },
  {
    name: "Elena P.",
    location: "Nicosia",
    car: "2020 Audi A4",
    quote: "Drove from Nicosia and it was worth every kilometre. The car was exactly as described, no surprises. Kosmas sorted the insurance on the same day.",
  },
  {
    name: "Michalis S.",
    location: "Limassol",
    car: "2019 Mercedes C-Class",
    quote: "Third car I've bought through Sambi. They sourced a specific spec I wanted from Germany in under two weeks. Won't go anywhere else.",
  },
  {
    name: "Natalia V.",
    location: "Paphos",
    car: "2022 Volkswagen Golf",
    quote: "As someone who doesn't know much about cars, I appreciated how everything was explained clearly. No pressure, just honest advice. Highly recommend.",
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 fill-primary" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-16 md:py-20 px-6 border-t border-border/50">
      <div className="max-w-[1100px] mx-auto">
        <div data-aos="fade-up" className="mb-10">
          <div className="text-xs tracking-[0.3em] text-primary mb-2 font-semibold">REAL CUSTOMERS</div>
          <h2 className="font-display text-3xl md:text-4xl tracking-wide">WHAT PEOPLE SAY</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="border border-border bg-card p-6 md:p-7 relative"
            >
              <div className="absolute top-0 left-6 w-8 h-0.5 bg-primary -translate-y-px" />
              <Stars />
              <p className="text-sm text-muted-foreground leading-relaxed font-light mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground/80">{t.name}</div>
                  <div className="text-[10px] tracking-[0.15em] text-muted-foreground/60 uppercase">{t.location}</div>
                </div>
                <div className="text-[10px] tracking-[0.1em] text-primary/60 uppercase text-right">{t.car}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
