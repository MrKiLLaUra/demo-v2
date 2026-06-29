"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Heart, Car as CarIcon, MessageCircle } from "lucide-react"
import { Car, fmt } from "@/lib/car-data"
import { cn } from "@/lib/utils"

const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QANRAAAgEDAwIDAQEBAAAAAAAAAQIRAwQABRIhMQYTQVEiYXGBBxQjkaGxwQgVJDLR/9oACAEBAAA/APUA/9k="

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
  const cardRef = useRef<HTMLDivElement>(null)
  const ml = `${car.mileage.toLocaleString()} km`
  const isSold = car.status?.toLowerCase().trim() === "sold"
  const priceVisible = car.showPrice === true && car.price !== null

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    gsap.set(card, { transformPerspective: 700, transformStyle: "preserve-3d" })

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(card, {
        rotationY: x * 14,
        rotationX: -y * 9,
        y: -6,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    const handleLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      })
    }

    card.addEventListener("mousemove", handleMove)
    card.addEventListener("mouseleave", handleLeave)

    return () => {
      card.removeEventListener("mousemove", handleMove)
      card.removeEventListener("mouseleave", handleLeave)
      gsap.set(card, { clearProps: "all" })
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group border border-border bg-card overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_8px_28px_rgba(227,31,43,0.12)]"
    >
      {/* Image — 4:3 on phones (so photos don't crop), fixed height on larger screens */}
      <div className="relative aspect-[4/3] sm:aspect-auto sm:h-44 bg-secondary overflow-hidden" onClick={onClick}>
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

        {/* Favorite + WhatsApp buttons */}
        <div className="absolute top-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
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
          {!isSold && (
            <a
              href={`https://wa.me/35799929323?text=${encodeURIComponent(`Hi, I'm interested in the ${car.year} ${car.make} ${car.model}. Is it still available?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 bg-background/80 backdrop-blur-sm hover:bg-background flex items-center justify-center transition-colors"
              title="Ask on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </a>
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
