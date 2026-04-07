export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav skeleton */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <div className="w-6 h-0.5 bg-border animate-pulse rounded" />
              <div className="w-4 h-0.5 bg-border animate-pulse rounded" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-40 h-4 bg-border/60 animate-pulse rounded" />
              <div className="w-24 h-2.5 bg-border/40 animate-pulse rounded" />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            {[80, 56, 72, 56, 72].map((w, i) => (
              <div
                key={i}
                className="h-3 bg-border/40 animate-pulse rounded"
                style={{ width: w }}
              />
            ))}
            <div className="w-28 h-9 bg-primary/20 animate-pulse rounded-sm ml-2" />
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="min-h-[92vh] flex items-center justify-center px-6 border-b border-border/50">
        <div className="text-center w-full max-w-3xl flex flex-col items-center gap-6">
          <div className="w-48 h-3 bg-border/40 animate-pulse rounded" />
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="w-full max-w-xl h-14 bg-border/30 animate-pulse rounded" />
            <div className="w-full max-w-md h-14 bg-border/20 animate-pulse rounded" />
          </div>
          <div className="w-72 h-4 bg-border/30 animate-pulse rounded" />
          <div className="w-56 h-4 bg-border/20 animate-pulse rounded" />
          <div className="flex gap-4 mt-2">
            <div className="w-40 h-12 bg-primary/25 animate-pulse rounded-sm" />
            <div className="w-36 h-12 bg-border/30 animate-pulse rounded-sm" />
          </div>
        </div>
      </div>

      {/* Featured cars skeleton */}
      <div className="py-16 md:py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div className="flex flex-col gap-2">
              <div className="w-24 h-2.5 bg-primary/30 animate-pulse rounded" />
              <div className="w-44 h-7 bg-border/40 animate-pulse rounded" />
            </div>
            <div className="w-20 h-4 bg-border/30 animate-pulse rounded" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[0, 1, 2].map((i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CarCardSkeleton() {
  return (
    <div className="border border-border bg-card overflow-hidden">
      <div className="h-40 md:h-44 bg-border/20 animate-pulse" />
      <div className="p-4 md:p-5 flex flex-col gap-3">
        <div className="w-24 h-2.5 bg-border/30 animate-pulse rounded" />
        <div className="w-40 h-6 bg-border/40 animate-pulse rounded" />
        <div className="flex gap-1.5">
          <div className="w-14 h-5 bg-border/25 animate-pulse rounded" />
          <div className="w-20 h-5 bg-border/25 animate-pulse rounded" />
          <div className="w-24 h-5 bg-border/25 animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}
