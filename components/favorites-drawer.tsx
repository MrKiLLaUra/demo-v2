"use client"

import Image from "next/image"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, X, Car as CarIcon, ExternalLink } from "lucide-react"
import { Car, fmt } from "@/lib/car-data"

interface FavoritesDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cars: Car[]
  onRemove: (id: number) => void
  onViewCar: () => void
}

export function FavoritesDrawer({ 
  open, 
  onOpenChange, 
  cars, 
  onRemove,
  onViewCar 
}: FavoritesDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-background border-border">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 font-display text-xl tracking-wide">
            <Heart className="w-5 h-5 text-primary" />
            YOUR FAVORITES
            <span className="text-sm text-muted-foreground font-sans font-normal">({cars.length})</span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            View, remove, and open your favorited vehicles.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-4">
          {cars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Heart className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-2">No favorites yet</p>
              <p className="text-sm text-muted-foreground/70">
                Click the heart icon on any car to add it to your favorites
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pr-4">
              {cars.map(car => (
                <div 
                  key={car.id}
                  className="border border-border bg-card p-3 flex gap-3"
                >
                  {/* Image */}
                  <div className="w-24 h-20 bg-secondary shrink-0 relative overflow-hidden">
                    {car.images?.preview ? (
                      <Image
                        src={car.images.preview}
                        alt={`${car.year} ${car.make} ${car.model}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CarIcon className="w-8 h-8 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-muted-foreground tracking-wider mb-0.5">
                      {car.year} · {car.condition}
                    </div>
                    <h4 className="font-display text-base tracking-wide leading-tight truncate">
                      {car.make} {car.model}
                    </h4>
                    <div className="text-sm text-primary font-semibold mt-1">
                      {car.showPrice && car.price ? fmt(car.price) : "Contact for price"}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-7 h-7 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemove(car.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-7 h-7 text-muted-foreground hover:text-primary"
                      onClick={onViewCar}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {cars.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest"
              onClick={onViewCar}
            >
              VIEW IN INVENTORY
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
