import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { notifyLead } from "@/lib/notify"

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { error } = await supabase.from("inquiries").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      subject: subject?.trim() || null,
      message: message.trim(),
    })

    if (error) throw error

    await notifyLead({
      kind: subject?.trim() ? `New Inquiry — ${subject.trim()}` : "New Website Inquiry",
      fields: [
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
        { label: "Subject", value: subject },
        { label: "Message", value: message },
      ],
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[inquiries] POST error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
