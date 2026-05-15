export default function CarDetailLoading() {
  return (
    <div className="pt-16 min-h-screen animate-pulse">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card px-6 md:px-8 py-4">
        <div className="max-w-[1320px] mx-auto flex items-center gap-3">
          <div className="h-2.5 w-8 bg-border/40 rounded" />
          <div className="h-2.5 w-2 bg-border/30 rounded" />
          <div className="h-2.5 w-8 bg-border/40 rounded" />
          <div className="h-2.5 w-2 bg-border/30 rounded" />
          <div className="h-2.5 w-32 bg-border/30 rounded" />
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-10 md:py-14">
        <div className="h-3 w-32 bg-border/30 rounded mb-8" />

        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 xl:gap-14">
          {/* Left: Gallery skeleton */}
          <div>
            <div className="h-64 md:h-80 lg:h-[420px] bg-secondary rounded-sm" />
            <div className="grid grid-cols-6 gap-2 mt-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-14 md:h-16 bg-secondary rounded-sm" />
              ))}
            </div>
            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-border p-3 bg-card">
                  <div className="h-2 w-12 bg-border/40 rounded mb-2" />
                  <div className="h-3.5 w-20 bg-border/30 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info skeleton */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="h-2.5 w-36 bg-border/30 rounded mb-3" />
              <div className="h-10 w-48 bg-border/40 rounded mb-1" />
              <div className="h-10 w-36 bg-border/30 rounded mb-4" />
              <div className="h-12 w-32 bg-primary/20 rounded-sm" />
            </div>
            <div className="border-t border-border pt-5 space-y-2">
              <div className="h-3 w-full bg-border/25 rounded" />
              <div className="h-3 w-5/6 bg-border/25 rounded" />
              <div className="h-3 w-4/6 bg-border/20 rounded" />
            </div>
            <div className="h-14 w-full bg-primary/20 rounded-sm" />
            <div className="border border-border bg-card p-5 space-y-3">
              <div className="h-2.5 w-28 bg-border/30 rounded" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 bg-secondary rounded-sm" />
                ))}
                <div className="col-span-2 h-10 bg-secondary rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
