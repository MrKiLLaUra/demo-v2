"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryImage { key: string; label: string; src?: string }

export function CarGallery({ images, carName }: { images: GalleryImage[]; carName: string }) {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState(false)
  const [broken, setBroken] = useState<Set<string>>(new Set())

  // Only keep images that actually have a source and haven't failed to load.
  // This is what makes a car with no rear-seats photo simply not show a "Rear" slot.
  const visible = useMemo(
    () => images.filter(img => img.src && !broken.has(img.key)),
    [images, broken]
  )

  if (visible.length === 0) return null

  const activeIndex = Math.max(0, visible.findIndex(img => img.key === activeKey))
  const current = visible[activeIndex]
  const markBroken = (key: string) =>
    setBroken(prev => new Set(prev).add(key))
  const step = (dir: number) =>
    setActiveKey(visible[(activeIndex + dir + visible.length) % visible.length].key)

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
            onError={() => markBroken(current.key)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 flex items-center gap-1.5 text-[10px] tracking-widest text-white/70">
          <ZoomIn className="w-3 h-3" />
          ZOOM
        </div>
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 text-[10px] tracking-widest text-white/70">
          {current.label.toUpperCase()} {activeIndex + 1}/{visible.length}
        </div>
      </div>

      {/* Thumbnail strip — columns adapt to however many photos exist */}
      <div
        className="grid gap-2 mt-2"
        style={{ gridTemplateColumns: `repeat(${visible.length}, minmax(0, 1fr))` }}
      >
        {visible.map((img) => (
          <button
            key={img.key}
            onClick={() => setActiveKey(img.key)}
            className={cn(
              "relative h-14 md:h-16 bg-secondary overflow-hidden transition-all",
              current.key === img.key ? "ring-1 ring-primary" : "opacity-60 hover:opacity-90"
            )}
          >
            {img.src && (
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="80px"
                className="object-cover"
                onError={() => markBroken(img.key)}
              />
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
          {visible.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); step(-1) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors text-xl"
              >
                ‹
              </button>
              <button
                onClick={e => { e.stopPropagation(); step(1) }}
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
