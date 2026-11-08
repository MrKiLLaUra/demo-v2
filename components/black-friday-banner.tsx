import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function BlackFridayBanner() {
  return (
    <Link
      href="/cars?blackfriday=1"
      className="group h-8 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 text-[10px] md:text-[11px] tracking-[0.22em] font-semibold"
    >
      <span className="font-display text-sm md:text-base tracking-[0.18em]">BLACK FRIDAY</span>
      <span className="hidden sm:inline opacity-80">·</span>
      <span className="hidden sm:inline">SPECIAL PRICES ON SELECTED CARS</span>
      <span className="inline-flex items-center gap-1 underline underline-offset-4">
        SHOP THE DEALS
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  )
}
