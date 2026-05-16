"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryImage { key: string; label: string; src?: string }

export function CarGallery({ images, carName }: { images: GalleryImage[]; carName: string }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (images.length === 0) return null

  const current = images[active]

  return (
    <>
      {/* Main image */}
      <div
        className="relative h-64 md:h-80 lg:h-[420px] bg-secondary overflow-hidden cursor-zoom-in group"
        onClick={() => setLightbox(true)}
      >
        {current.src && (
          <Image
            src={current.src}
            alt={`${carName} - ${current.label}`}
            fill
            sizes="(max-width:1024px) 100vw, 60vw"
            quality={80}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 flex items-center gap-1.5 text-[10px] tracking-widest text-white/70">
          <ZoomIn className="w-3 h-3" />
          ZOOM
        </div>
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 text-[10px] tracking-widest text-white/70">
          {current.label.toUpperCase()} {active + 1}/{images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="grid grid-cols-6 gap-2 mt-2">
        {images.map((img, i) => (
          <button
            key={img.key}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-14 md:h-16 bg-secondary overflow-hidden transition-all",
              active === i ? "ring-1 ring-primary" : "opacity-60 hover:opacity-90"
            )}
          >
            {img.src && (
              <Image src={img.src} alt={img.label} fill sizes="80px" className="object-cover" />
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && current.src && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <div className="relative w-[95vw] h-[88vh]" onClick={e => e.stopPropagation()}>
            <Image src={current.src} alt={`${carName} - ${current.label}`} fill className="object-contain" sizes="100vw" quality={90} />
          </div>
          {/* Nav */}
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); setActive(i => (i - 1 + images.length) % images.length) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors text-xl"
              >
                ‹
              </button>
              <button
                onClick={e => { e.stopPropagation(); setActive(i => (i + 1) % images.length) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors text-xl"
              >
                ›
              </button>
            </>
          )}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  )
}
