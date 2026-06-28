import { NextRequest, NextResponse } from "next/server"

// 30-minute test-drive slots within opening hours (Mon–Sat 10:00–18:00).
const SLOTS = ["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"]
const SLOT_MINUTES = 30

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

// Returns the 30-min slots still free on a given date. Asks the Google Apps
// Script (server-to-server, so the token stays private and there's no CORS) for
// busy blocks across both calendars, then drops any slot that overlaps one.
// If Apps Script isn't configured or fails, all slots are returned so booking
// is never blocked by an outage.
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date")
  if (!date) return NextResponse.json({ available: SLOTS })

  const url = process.env.APPS_SCRIPT_URL
  const token = process.env.APPS_SCRIPT_TOKEN
  if (!url || !token) return NextResponse.json({ available: SLOTS })

  try {
    const res = await fetch(
      `${url}?token=${encodeURIComponent(token)}&date=${encodeURIComponent(date)}`,
      { redirect: "follow", cache: "no-store" },
    )
    if (!res.ok) return NextResponse.json({ available: SLOTS })

    const data = (await res.json()) as { busy?: { start: string; end: string }[] }
    const busy = (data.busy ?? []).map(b => [toMin(b.start), toMin(b.end)] as const)

    const available = SLOTS.filter(slot => {
      const start = toMin(slot)
      const end = start + SLOT_MINUTES
      return !busy.some(([bStart, bEnd]) => start < bEnd && end > bStart)
    })

    return NextResponse.json({ available })
  } catch {
    return NextResponse.json({ available: SLOTS })
  }
}
