"use client"

import Image from "next/image"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitCompare, X, Car as CarIcon, Check, Minus } from "lucide-react"
import { Car, fmt } from "@/lib/car-data"

interface CompareDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cars: Car[]
  onRemove: (id: number) => void
  onClear: () => void
}

export function CompareDrawer({ 
  open, 
  onOpenChange, 
  cars, 
  onRemove,
  onClear 
}: CompareDrawerProps) {
  const specs = [
    { 
      label: "Price", 
      getValue: (car: Car) => car.showPrice && car.price ? fmt(car.price) : "Contact",
      compare: (cars: Car[]) => {
        const prices = cars.filter(c => c.showPrice && c.price).map(c => c.price!)
        if (prices.length < 2) return null
        return Math.min(...prices)
      },
      isBest: (car: Car, best: number | null) => best !== null && car.price === best
    },
    { 
      label: "Year", 
      getValue: (car: Car) => car.year.toString(),
      compare: (cars: Car[]) => Math.max(...cars.map(c => c.year)),
      isBest: (car: Car, best: number | null) => best !== null && car.year === best
    },
    { 
      label: "Mileage", 
      getValue: (car: Car) => `${car.mileage.toLocaleString()} km`,
      compare: (cars: Car[]) => Math.min(...cars.map(c => c.mileage)),
      isBest: (car: Car, best: number | null) => best !== null && car.mileage === best
    },
    { 
      label: "Fuel", 
      getValue: (car: Car) => car.fuel,
      compare: () => null,
      isBest: () => false
    },
    { 
      label: "Transmission", 
      getValue: (car: Car) => car.transmission,
      compare: () => null,
      isBest: () => false
    },
    { 
      label: "Condition", 
      getValue: (car: Car) => car.condition,
      compare: (cars: Car[]) => {
        const order = ["Excellent", "Good", "Fair"]
        const best = Math.min(...cars.map(c => order.indexOf(c.condition)))
        return best
      },
      isBest: (car: Car, best: number | null) => {
        const order = ["Excellent", "Good", "Fair"]
        return best !== null && order.indexOf(car.condition) === best
      }
    },
    { 
      label: "Color", 
      getValue: (car: Car) => car.color,
      compare: () => null,
      isBest: () => false
    },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[85vh] sm:h-[80vh] bg-background border-border"
      >
        <SheetHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 font-display text-xl tracking-wide">
              <GitCompare className="w-5 h-5 text-primary" />
              COMPARE VEHICLES
              <span className="text-sm text-muted-foreground font-sans font-normal">
                ({cars.length}/3)
              </span>
            </SheetTitle>
            {cars.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onClear}
                className="text-xs text-muted-foreground"
              >
                Clear All
              </Button>
            )}
          </div>
          <SheetDescription className="sr-only">
            Compare up to three vehicles side by side.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100%-80px)] mt-4">
          {cars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <GitCompare className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-2">No cars to compare</p>
              <p className="text-sm text-muted-foreground/70">
                Click the compare icon on up to 3 cars to compare them side by side
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                {/* Header with car images */}
                <thead>
                  <tr>
                    <th className="w-32 p-2 text-left text-xs text-muted-foreground tracking-wider font-normal">
                      SPECIFICATION
                    </th>
                    {cars.map(car => (
                      <th key={car.id} className="p-2 text-left">
                        <div className="border border-border bg-card p-3">
                          <div className="relative h-28 bg-secondary mb-3 overflow-hidden">
                            {car.images?.preview ? (
                              <Image
                                src={car.images.preview}
                                alt={`${car.year} ${car.make} ${car.model}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <CarIcon className="w-10 h-10 text-muted-foreground/30" />
                              </div>
                            )}
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute top-2 right-2 w-6 h-6 bg-background/80"
                              onClick={() => onRemove(car.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-[10px] text-muted-foreground tracking-wider mb-0.5 font-normal">
                            {car.year}
                          </div>
                          <div className="font-display text-base tracking-wide">
                            {car.make} {car.model}
                          </div>
                        </div>
                      </th>
                    ))}
                    {/* Empty slots */}
                    {Array.from({ length: 3 - cars.length }).map((_, i) => (
                      <th key={`empty-${i}`} className="p-2 text-left">
                        <div className="border border-dashed border-border bg-card/50 p-3 h-[170px] flex items-center justify-center">
                          <p className="text-xs text-muted-foreground/50 text-center">
                            Add a car<br />to compare
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Spec rows */}
                <tbody>
                  {specs.map(spec => {
                    const bestValue = spec.compare(cars)
                    return (
                      <tr key={spec.label} className="border-t border-border">
                        <td className="p-3 text-xs text-muted-foreground tracking-wider">
                          {spec.label.toUpperCase()}
                        </td>
                        {cars.map(car => {
                          const isBest = spec.isBest(car, bestValue)
                          return (
                            <td 
                              key={car.id} 
                              className={`p-3 text-sm ${isBest ? "text-primary font-semibold" : "text-foreground"}`}
                            >
                              <div className="flex items-center gap-2">
                                {spec.getValue(car)}
                                {isBest && cars.length > 1 && (
                                  <Check className="w-4 h-4 text-primary" />
                                )}
                              </div>
                            </td>
                          )
                        })}
                        {Array.from({ length: 3 - cars.length }).map((_, i) => (
                          <td key={`empty-${i}`} className="p-3">
                            <Minus className="w-4 h-4 text-muted-foreground/30" />
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
