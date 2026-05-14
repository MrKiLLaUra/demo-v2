"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Heart, Share2, Car as CarIcon, MessageCircle } from "lucide-react"
import { Car, fmt, carSlug } from "@/lib/car-data"
import { useFavorites } from "@/components/favorites-provider"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { CarGallery } from "@/components/cars/car-gallery"

interface Props { car: Car; related: Car[] }

export function CarDetailClient({ car, related }: Props) {
  const { toggle, isFavorite } = useFavorites()
  const isSold = car.status?.toLowerCase().trim() === "sold"
  const priceVisible = car.showPrice === true && car.price !== null
  const fav = isFavorite(car.id)

  const [bookForm, setBookForm] = useState({ name: "", phone: "", email: "", date: "" })
  const [bookSent, setBookSent] = useState(false)
  const [bookLoading, setBookLoading] = useState(false)

  const handleShare = useCallback(async () => {
    const url = window.location.href
    const text = `Check out this ${car.year} ${car.make} ${car.model} at Sambi Top Gear Motors`
    if (navigator.share) {
      try { await navigator.share({ title: text, url }) } catch {}
    } else {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard")
    }
  }, [car])

  const handleBook = async () => {
    if (!bookForm.name || !bookForm.phone || !bookForm.date) return
    setBookLoading(true)
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ car_id: car.id, car_name: `${car.year} ${car.make} ${car.model}`, ...bookForm }),
      })
      setBookSent(true)
      toast.success("Test drive booked! We'll confirm shortly.")
    } catch {
      toast.error("Something went wrong. Please try WhatsApp instead.")
    } finally {
      setBookLoading(false)
    }
  }

  const galleryImages = [
    { key: "front",      label: "Front",      src: car.images?.front },
    { key: "side",       label: "Side",       src: car.images?.side },
    { key: "back",       label: "Back",       src: car.images?.back },
    { key: "interior",   label: "Interior",   src: car.images?.interior },
    { key: "frontSeats", label: "Seats",      src: car.images?.frontSeats },
    { key: "rearSeats",  label: "Rear",       src: car.images?.rearSeats },
  ].filter(img => img.src)

  return (
    <div className="pt-16 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-4 flex items-center gap-3 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cars" className="hover:text-foreground transition-colors">Cars</Link>
          <span>/</span>
          <span className="text-foreground">{car.year} {car.make} {car.model}</span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-10 md:py-14">
        <Link href="/cars" className="inline-flex items-center gap-2 text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8 group">
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          BACK TO INVENTORY
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 xl:gap-14">
          {/* Left: Gallery */}
          <div>
            <CarGallery images={galleryImages} carName={`${car.year} ${car.make} ${car.model}`} />

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {[
                { label: "Year",         value: car.year },
                { label: "Make",         value: car.make },
                { label: "Model",        value: car.model },
                { label: "Fuel",         value: car.fuel },
                { label: "Transmission", value: car.transmission },
                { label: "Mileage",      value: `${car.mileage.toLocaleString()} km` },
                { label: "Colour",       value: car.color },
                { label: "Condition",    value: car.condition },
                { label: "Status",       value: car.status ?? "Available" },
              ].map(spec => (
                <div key={spec.label} className="border border-border p-3 bg-card">
                  <div className="text-[9px] tracking-[0.2em] text-muted-foreground/60 mb-1">{spec.label.toUpperCase()}</div>
                  <div className="text-sm font-medium">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info + Actions */}
          <div className="flex flex-col gap-5">
            {/* Title + price */}
            <div>
              <div className="text-[10px] text-muted-foreground tracking-widest mb-2">
                {car.year} · {car.color} · {car.condition}
              </div>
              <h1 className="font-display text-4xl md:text-5xl tracking-wide leading-none mb-3">
                {car.make}<br />{car.model}
              </h1>
              <div className="flex items-center gap-4">
                {priceVisible ? (
                  <div className="bg-primary text-primary-foreground px-5 py-2.5 font-display text-2xl tracking-wide">
                    {fmt(car.price!)}
                  </div>
                ) : (
                  <div className="border border-primary text-primary px-4 py-2 text-xs tracking-widest">
                    PRICE ON APPLICATION
                  </div>
                )}
                {/* Fav + Share */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => toggle(car.id)}
                    className={cn("w-10 h-10 border border-border flex items-center justify-center transition-colors hover:border-primary/50", fav && "text-primary border-primary/50")}
                    title={fav ? "Remove from saved" : "Save car"}
                  >
                    <Heart className={cn("w-4 h-4", fav && "fill-current")} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 border border-border flex items-center justify-center transition-colors hover:border-primary/50"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed font-light border-t border-border pt-5">
              {car.description}
            </p>

            {/* AI Blurb */}
            {car.ai_blurb && (
              <div className="border border-border p-5 bg-card relative">
                <div className="absolute top-0 left-5 w-8 h-0.5 bg-primary -translate-y-px" />
                <div className="text-[10px] text-primary tracking-[0.2em] mb-2">SAMBI AI SAYS</div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{car.ai_blurb}</p>
              </div>
            )}

            {/* CTA */}
            {isSold ? (
              <div className="bg-secondary text-muted-foreground text-center py-4 font-display text-xl tracking-widest">
                VEHICLE SOLD
              </div>
            ) : (
              <a
                href={`https://wa.me/35799929323?text=${encodeURIComponent(`Hi Kosmas, I'm interested in the ${car.year} ${car.make} ${car.model}. Is it available for a test drive?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 font-display text-lg tracking-widest transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                BOOK A TEST DRIVE
              </a>
            )}

            {/* Book form */}
            {!isSold && (
              <div className="border border-border p-5 bg-card">
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground mb-4">OR SCHEDULE BELOW</div>
                {!bookSent ? (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "name",  placeholder: "Full name",     type: "text",  span: false },
                      { key: "phone", placeholder: "+357 99 000000", type: "tel",   span: false },
                      { key: "email", placeholder: "Email (opt.)",  type: "email", span: false },
                      { key: "date",  placeholder: "Preferred date", type: "date",  span: false },
                    ].map(f => (
                      <input
                        key={f.key}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={bookForm[f.key as keyof typeof bookForm]}
                        onChange={e => setBookForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className="bg-input border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors [color-scheme:dark]"
                      />
                    ))}
                    <button
                      onClick={handleBook}
                      disabled={!bookForm.name || !bookForm.phone || !bookForm.date || bookLoading}
                      className="col-span-2 bg-secondary hover:bg-secondary/80 text-foreground py-3 text-xs font-semibold tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {bookLoading ? "BOOKING..." : "CONFIRM BOOKING"}
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-primary">✓ Booking received. We will confirm shortly.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related cars */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <div data-aos="fade-up" className="mb-8">
              <div className="text-[10px] tracking-[0.3em] text-primary mb-2 font-semibold">YOU MIGHT ALSO LIKE</div>
              <h2 className="font-display text-3xl tracking-wide">SIMILAR CARS</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rc, i) => (
                <Link
                  key={rc.id}
                  href={`/cars/${carSlug(rc)}`}
                  data-aos="fade-up"
                  data-aos-delay={i * 70}
                  className="group border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden block"
                >
                  <div className="relative h-40 bg-secondary overflow-hidden">
                    {rc.images?.preview ? (
                      <Image src={rc.images.preview} alt={`${rc.year} ${rc.make} ${rc.model}`} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CarIcon className="w-10 h-10 text-muted-foreground/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-[10px] text-muted-foreground tracking-widest mb-1">{rc.year}</div>
                    <div className="font-display text-xl tracking-wide leading-none mb-2">{rc.make} {rc.model}</div>
                    {rc.showPrice && rc.price !== null && (
                      <div className="text-primary text-sm font-medium">{fmt(rc.price)}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
