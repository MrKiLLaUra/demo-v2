import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { supabase } from "@/lib/supabase"

async function isAuthed() {
  const store = await cookies()
  return store.get("admin_session")?.value === process.env.ADMIN_PASSWORD
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const { data, error } = await supabase.from("cars").select("*").eq("id", id).single()
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()

  const { error, data } = await supabase
    .from("cars")
    .update({
      make:         String(body.make || "").trim(),
      model:        String(body.model || "").trim(),
      year:         Number(body.year),
      mileage:      Number(body.mileage),
      fuel:         String(body.fuel || "").trim(),
      transmission: String(body.transmission || "").trim(),
      price:        body.price !== "" && body.price != null ? Number(body.price) : null,
      show_price:   Boolean(body.show_price),
      condition:    String(body.condition || "").trim(),
      color:        String(body.color || "").trim(),
      description:  String(body.description || "").trim(),
      status:       String(body.status || "Available").trim(),
      ai_blurb:     body.ai_blurb ? String(body.ai_blurb).trim() : null,
      images:       body.images ?? null,
      new_stock:    Boolean(body.new_stock),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const { error } = await supabase.from("cars").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
