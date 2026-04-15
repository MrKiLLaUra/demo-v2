"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Car as CarIcon } from "lucide-react"
import { Car, fmt } from "@/lib/car-data"
import { cn } from "@/lib/utils"

// Tiny gray JPEG used as an instant blur placeholder while images load
const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="

interface CarCardProps {
  car: Car
  onClick: () => void
  isFavorite?: boolean
  onToggleFavorite?: () => void
  priority?: boolean
}

function PreviewImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
}) {
  const [errored, setErrored] = useState(false)
  if (!src || errored) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CarIcon className="w-16 h-16 text-muted-foreground/30" />
      </div>
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      quality={65}
      placeholder="blur"
      blurDataURL={BLUR_PLACEHOLDER}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setErrored(true)}
    />
  )
}

export function CarCard({ 
  car, 
  onClick, 
  isFavorite = false,
  onToggleFavorite,
  priority = false,
}: CarCardProps) {
  const ml = `${car.mileage.toLocaleString()} km`
  const isSold = car.status?.toLowerCase().trim() === "sold"
  const priceVisible = car.showPrice === true && car.price !== null

  return (
    <div 
      className="group border border-border bg-card overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(227,31,43,0.12)]"
    >
      {/* Image */}
      <div className="relative h-40 md:h-44 bg-secondary overflow-hidden" onClick={onClick}>
        <PreviewImage
          src={car.images?.preview ?? ""}
          alt={`${car.year} ${car.make} ${car.model}`}
          priority={priority}
        />

        {isSold && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
            <span className="rotate-[-30deg] font-display text-4xl tracking-[0.18em] text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] select-none border-2 border-primary/70 px-4 py-1 bg-black/60 backdrop-blur-sm">
              SOLD
            </span>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute top-3 right-3">
          {priceVisible ? (
            <div className="bg-primary text-primary-foreground px-3 py-1.5 font-display text-base tracking-wide">
              {fmt(car.price!)}
            </div>
          ) : (
            <div className="border border-primary text-primary px-2.5 py-1 text-[10px] tracking-widest bg-background/80 backdrop-blur-sm">
              CONTACT
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onToggleFavorite && (
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "w-8 h-8 bg-background/80 backdrop-blur-sm hover:bg-background",
                isFavorite && "text-primary"
              )}
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite()
              }}
            >
              <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5" onClick={onClick}>
        <div className="text-[10px] text-muted-foreground tracking-widest mb-1">
          {car.year} · {car.condition.toUpperCase()}
        </div>
        <h3 className="font-display text-xl md:text-2xl tracking-wide mb-3 leading-none">
          {car.make} {car.model}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {[car.fuel, car.transmission, ml].filter(Boolean).map((t, index) => (
            <span 
              key={index} 
              className="text-[10px] text-muted-foreground border border-border px-2 py-1 tracking-wide"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
