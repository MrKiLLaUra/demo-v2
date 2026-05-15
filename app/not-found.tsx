import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="font-display text-[10rem] md:text-[14rem] leading-none text-primary/10 select-none mb-0">
          404
        </div>
        <div className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold -mt-4">PAGE NOT FOUND</div>
        <h1 className="font-display text-4xl md:text-5xl tracking-wide mb-4 leading-none">
          THIS ROAD LEADS NOWHERE
        </h1>
        <p className="text-muted-foreground font-light leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-display text-lg tracking-widest transition-colors"
          >
            GO HOME
          </Link>
          <Link
            href="/cars"
            className="inline-flex items-center justify-center gap-2 border border-foreground/20 hover:border-foreground/50 px-8 py-4 font-display text-lg tracking-widest transition-colors group"
          >
            BROWSE CARS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
