import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { notifyLead } from "@/lib/notify"

export async function POST(req: Request) {
  try {
    const { car_id, car_name, name, phone, email, date } = await req.json()

    if (!name || !phone || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { error } = await supabase.from("test_drive_bookings").insert({
      car_id: car_id ?? null,
      car_name: car_name?.trim() || null,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim().toLowerCase() || null,
      preferred_date: date,
    })

    if (error) throw error

    await notifyLead({
      kind: "New Test Drive Booking",
      fields: [
        { label: "Car", value: car_name },
        { label: "Name", value: name },
        { label: "Phone", value: phone },
        { label: "Email", value: email },
        { label: "Preferred date", value: date },
      ],
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[bookings] POST error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
