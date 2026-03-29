"use client"

import { User } from "lucide-react"

const team = [
  { 
    name: "Andreas Nikolaou", 
    role: "Founder & CEO", 
    bio: "15+ years in the automotive industry. Started Sambi Top Gear with one simple mission: make buying a used car in Cyprus actually enjoyable." 
  },
  { 
    name: "Maria Stavrou", 
    role: "Head of Sales", 
    bio: "Knows every car on the lot better than anyone. Has matched hundreds of clients with their perfect vehicle over 7 years with Sambi Top Gear." 
  },
  { 
    name: "Kostas Petrou", 
    role: "Chief Inspector", 
    bio: "Former mechanical engineer. Personally oversees every vehicle inspection before it joins our inventory." 
  },
]

const stats = [
  ["2018", "Founded"],
  ["200+", "Cars Sold"],
  ["8yrs", "Experience"],
  ["100%", "Inspected"],
]

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border/50 py-16 md:py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(227,31,43,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-xs tracking-[0.3em] text-primary mb-4 font-semibold">OUR STORY</div>
            <h1 className="font-display text-5xl md:text-6xl tracking-wide leading-none mb-6">
              BUILT ON<br />TRUST &<br />QUALITY
            </h1>
            <div className="text-muted-foreground leading-relaxed font-light space-y-4">
              <p>
                Founded in 2018 in Limassol, Sambi Top Gear Motors was born from frustration with the used car market in Cyprus — inflated prices, hidden issues, zero transparency.
              </p>
              <p>
                We set out to do it differently. Every car we sell is fully inspected, honestly described, and fairly priced. And with our AI pricing engine, you always know the real market value before you buy.
              </p>
              <p>
                {"8 years later, we've sold 200+ vehicles and earned a reputation for being the dealership people actually trust."}
              </p>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(([n, l]) => (
              <div 
                key={l} 
                className="border border-border bg-card p-6 md:p-7 text-center"
              >
                <div className="font-display text-4xl md:text-5xl tracking-wide text-primary mb-2">{n}</div>
                <div className="text-xs text-muted-foreground tracking-widest uppercase">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1100px] mx-auto py-16 md:py-20 px-6">
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.3em] text-primary mb-3 font-semibold">THE PEOPLE BEHIND SAMBI TOP GEAR</div>
          <h2 className="font-display text-4xl tracking-wide">OUR TEAM</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map(m => (
            <div 
              key={m.name} 
              className="border border-border bg-card p-6 md:p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-secondary border-2 border-primary flex items-center justify-center mx-auto mb-5">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl tracking-wide mb-1">{m.name}</h3>
              <div className="text-xs text-primary tracking-widest mb-4 uppercase">{m.role}</div>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
