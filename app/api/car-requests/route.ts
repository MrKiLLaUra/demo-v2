import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { notifyLead } from "@/lib/notify"

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

    await notifyLead({
      kind: "New Vehicle Sourcing Request",
      fields: [
        { label: "Name", value: name },
        { label: "Phone", value: phone },
        { label: "Email", value: email },
        { label: "Make", value: make },
        { label: "Model", value: model },
        { label: "Year from", value: year },
        { label: "Fuel", value: fuel },
        { label: "Gearbox", value: transmission },
        { label: "Budget (€)", value: budget },
        { label: "Notes", value: notes },
      ],
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[car-requests] POST error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
