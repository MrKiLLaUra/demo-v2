export function CarSkeleton() {
  return (
    <div className="border border-border bg-card overflow-hidden animate-pulse">
      <div className="h-44 md:h-48 bg-secondary" />
      <div className="p-4 md:p-5">
        <div className="h-2.5 w-24 bg-secondary rounded mb-3" />
        <div className="h-6 w-40 bg-secondary rounded mb-4" />
        <div className="flex gap-1.5">
          <div className="h-5 w-16 bg-secondary rounded" />
          <div className="h-5 w-20 bg-secondary rounded" />
          <div className="h-5 w-24 bg-secondary rounded" />
        </div>
      </div>
      <div className="flex border-t border-border divide-x divide-border">
        <div className="flex-1 py-2.5 flex items-center justify-center">
          <div className="h-2.5 w-12 bg-secondary rounded" />
        </div>
        <div className="flex-1 py-2.5 flex items-center justify-center">
          <div className="h-2.5 w-16 bg-secondary rounded" />
        </div>
      </div>
    </div>
  )
}

export function CarSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CarSkeleton key={i} />
      ))}
    </div>
  )
}
