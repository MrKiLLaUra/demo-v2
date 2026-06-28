import type { ReactNode } from "react"

interface LegalPageProps {
  eyebrow: string
  title: string
  intro: string
  lastUpdated: string
  children: ReactNode
}

/**
 * Shared shell for the legal pages (Privacy, Terms, Cookies).
 * Matches the site's hero + section typography. Wrap body copy in
 * <LegalSection> blocks.
 */
export function LegalPage({ eyebrow, title, intro, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(227,31,43,0.06)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[820px] mx-auto relative z-10">
          <div className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">{eyebrow}</div>
          <h1 className="font-display text-5xl md:text-7xl tracking-wide mb-6 leading-none">{title}</h1>
          <p className="text-muted-foreground max-w-lg font-light leading-relaxed text-base md:text-lg">{intro}</p>
          <p className="text-xs tracking-widest text-muted-foreground/50 mt-6">LAST UPDATED · {lastUpdated}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-[820px] mx-auto space-y-12">{children}</div>
      </section>
    </div>
  )
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl tracking-wide mb-4">{heading}</h2>
      <div className="space-y-4 text-sm md:text-base text-muted-foreground font-light leading-relaxed [&_a]:text-primary [&_a:hover]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-foreground [&_strong]:font-medium">
        {children}
      </div>
    </div>
  )
}
