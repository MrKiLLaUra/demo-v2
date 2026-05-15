import { CarSkeletonGrid } from "@/components/cars/car-skeleton"

export default function CarsLoading() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="border-b border-border py-10 md:py-14 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="w-20 h-2.5 bg-border/40 animate-pulse rounded mb-3" />
          <div className="w-64 h-10 bg-border/30 animate-pulse rounded mb-3" />
          <div className="w-48 h-4 bg-border/20 animate-pulse rounded" />
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block w-64 shrink-0 space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className="w-16 h-2.5 bg-border/40 animate-pulse rounded mb-2" />
                <div className="w-full h-9 bg-border/20 animate-pulse rounded" />
              </div>
            ))}
          </div>
          {/* Grid */}
          <div className="flex-1">
            <CarSkeletonGrid count={9} />
          </div>
        </div>
      </div>
    </div>
  )
}
