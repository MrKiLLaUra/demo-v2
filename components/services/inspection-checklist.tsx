"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { CheckCircle2 } from "lucide-react"

const CATEGORIES = [
  {
    title: "Engine & Drivetrain",
    points: ["Cold start behaviour", "Idle stability", "Oil & coolant condition", "Belts & hoses", "Turbo / boost", "Clutch wear", "Gearbox shift quality", "Driveshaft & CV joints", "Exhaust & emissions", "Leak inspection"],
  },
  {
    title: "Brakes & Suspension",
    points: ["Disc & pad wear", "Brake fluid", "ABS operation", "Handbrake hold", "Shock absorbers", "Springs & mounts", "Wheel bearings", "Steering play", "Alignment check"],
  },
  {
    title: "Electrics & Electronics",
    points: ["Battery health", "Alternator output", "Warning lights / OBD scan", "Infotainment & screens", "Cameras & sensors", "Climate control", "Windows & mirrors", "Central locking", "Lighting all-round"],
  },
  {
    title: "Tyres & Wheels",
    points: ["Tread depth (all four)", "Even wear pattern", "Tyre age & matching", "Wheel & rim condition", "Spare / repair kit", "Correct pressures"],
  },
  {
    title: "Bodywork & Interior",
    points: ["Panel gaps & alignment", "Paint thickness / respray check", "Rust & corrosion", "Glass & windscreen", "Underbody condition", "Seat & trim wear", "Damp / odour check", "Boot & seals"],
  },
  {
    title: "Documents & History",
    points: ["Service history", "Ownership records", "Mileage verification", "Outstanding finance check", "Accident / damage history", "Keys & manuals", "MOT / roadworthiness"],
  },
]

export function InspectionChecklist() {
  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="border border-border bg-card divide-y divide-border">
      {CATEGORIES.map((cat, i) => (
        <AccordionItem key={cat.title} value={`item-${i}`} className="px-6 md:px-8">
          <AccordionTrigger className="font-display text-lg md:text-xl tracking-wide hover:no-underline">
            <span className="flex items-center gap-3">
              <span className="text-primary/30 font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
              {cat.title.toUpperCase()}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 pb-2">
              {cat.points.map(p => (
                <div key={p} className="flex items-center gap-2.5 text-sm text-muted-foreground font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
