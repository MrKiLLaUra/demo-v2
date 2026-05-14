import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Sambi Top Gear Motors. Visit us in Limassol, call, WhatsApp, or send a message — we respond fast.",
}

const INFO = [
  { Icon: MapPin, label: "Address",          value: "Limassol, Cyprus" },
  { Icon: Phone,  label: "Phone / WhatsApp", value: "+357 99 929323",   href: "tel:+35799929323" },
  { Icon: Mail,   label: "Email",            value: "sambitopgearmotors@gmail.com", href: "mailto:sambitopgearmotors@gmail.com" },
  { Icon: Clock,  label: "Hours",            value: "Mon – Sat: 9:00 – 19:00" },
]

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(227,31,43,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <div data-aos="fade-up" className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">REACH OUT</div>
          <h1 data-aos="fade-up" data-aos-delay="80" className="font-display text-6xl md:text-8xl tracking-wide mb-6 max-w-xl leading-none">
            CONTACT US
          </h1>
          <p data-aos="fade-up" data-aos-delay="160" className="text-muted-foreground max-w-md font-light leading-relaxed text-base md:text-lg">
            We're based in Limassol and available six days a week. Drop us a message and we'll respond the same day.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_480px] gap-12 xl:gap-20">

            {/* Left: Info + Map */}
            <div data-aos="fade-up" className="space-y-10">
              {/* Contact info */}
              <div>
                <div className="text-[10px] tracking-[0.35em] text-primary mb-6 font-semibold">FIND US</div>
                <div className="space-y-4">
                  {INFO.map(({ Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4 border border-border bg-card p-4">
                      <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-[9px] tracking-[0.2em] text-muted-foreground/60 mb-0.5">{label.toUpperCase()}</div>
                        {href ? (
                          <a href={href} className="text-sm hover:text-primary transition-colors">{value}</a>
                        ) : (
                          <span className="text-sm">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div>
                <div className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">FASTEST RESPONSE</div>
                <a
                  href="https://wa.me/35799929323?text=Hi%20Sambi%20Top%20Gear%2C%20I%20have%20a%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 px-5 py-4 transition-colors group"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Message us on WhatsApp</div>
                    <div className="text-xs text-muted-foreground mt-0.5">We typically reply within minutes</div>
                  </div>
                </a>
              </div>

              {/* Map */}
              <div>
                <div className="text-[10px] tracking-[0.35em] text-primary mb-4 font-semibold">LOCATION</div>
                <div className="border border-border overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=Limassol%2C+Cyprus&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="280"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale opacity-75 block"
                    title="Sambi Top Gear Motors – Limassol, Cyprus"
                  />
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="text-[10px] tracking-[0.35em] text-primary mb-6 font-semibold">SEND A MESSAGE</div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
