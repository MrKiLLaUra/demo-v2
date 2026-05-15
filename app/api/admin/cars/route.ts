import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { supabase } from "@/lib/supabase"

async function isAuthed() {
  const store = await cookies()
  return store.get("admin_session")?.value === process.env.ADMIN_PASSWORD
}

export async function GET() {
  if (!await isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await supabase.from("cars").select("*").order("id", { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  if (!await isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { error, data } = await supabase.from("cars").insert(sanitize(body)).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

function sanitize(b: Record<string, unknown>) {
  return {
    make:         String(b.make || "").trim(),
    model:        String(b.model || "").trim(),
    year:         Number(b.year),
    mileage:      Number(b.mileage),
    fuel:         String(b.fuel || "").trim(),
    transmission: String(b.transmission || "").trim(),
    price:        b.price !== "" && b.price != null ? Number(b.price) : null,
    show_price:   Boolean(b.show_price),
    condition:    String(b.condition || "").trim(),
    color:        String(b.color || "").trim(),
    description:  String(b.description || "").trim(),
    status:       String(b.status || "Available").trim(),
    ai_blurb:     b.ai_blurb ? String(b.ai_blurb).trim() : null,
    images:       b.images ?? null,
    new_stock:    Boolean(b.new_stock),
  }
}
