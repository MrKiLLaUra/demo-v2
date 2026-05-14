import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const { name, phone, email, make, model, year, fuel, transmission, budget, notes } = await req.json()

    if (!name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { error } = await supabase.from("car_requests").insert({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim().toLowerCase() || null,
      make: make?.trim() || null,
      model: model?.trim() || null,
      year: year ? parseInt(year, 10) : null,
      fuel: fuel?.trim() || null,
      transmission: transmission?.trim() || null,
      budget: budget ? parseFloat(budget) : null,
      notes: notes?.trim() || null,
    })

    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[car-requests] POST error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
