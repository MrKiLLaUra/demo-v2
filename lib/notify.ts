// Lead notifications: email (Resend) + WhatsApp (Twilio), both via REST (no SDK deps).
// Every sender is guarded by its env vars and never throws — a failed notification
// must never break the request that saved the lead.

export interface LeadField {
  label: string
  value: string | number | null | undefined
}

export interface LeadNotification {
  /** e.g. "New Vehicle Sourcing Request" */
  kind: string
  fields: LeadField[]
}

function cleanFields(fields: LeadField[]): LeadField[] {
  return fields.filter(f => f.value !== null && f.value !== undefined && String(f.value).trim() !== "")
}

function toPlainText(lead: LeadNotification): string {
  const lines = cleanFields(lead.fields).map(f => `${f.label}: ${f.value}`)
  return `${lead.kind}\n\n${lines.join("\n")}\n\n— Sambi Top Gear Motors website`
}

function toHtml(lead: LeadNotification): string {
  const rows = cleanFields(lead.fields)
    .map(
      f =>
        `<tr><td style="padding:6px 14px 6px 0;color:#888;font-size:13px;white-space:nowrap;vertical-align:top">${f.label}</td><td style="padding:6px 0;font-size:14px;color:#111">${String(f.value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
    <h2 style="color:#e31f2b;margin:0 0 4px">${lead.kind}</h2>
    <p style="color:#888;font-size:12px;margin:0 0 16px">Sambi Top Gear Motors — website lead</p>
    <table style="border-collapse:collapse;width:100%">${rows}</table>
  </div>`
}

async function sendEmail(lead: LeadNotification): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ALERT_EMAIL_TO
  const from = process.env.ALERT_EMAIL_FROM || "Sambi Leads <onboarding@resend.dev>"
  if (!apiKey || !to) {
    console.warn("[notify] email skipped — RESEND_API_KEY or ALERT_EMAIL_TO not set")
    return
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map(s => s.trim()),
        subject: `🚗 ${lead.kind}`,
        html: toHtml(lead),
        text: toPlainText(lead),
      }),
    })
    if (!res.ok) console.error("[notify] Resend error:", res.status, await res.text())
  } catch (err) {
    console.error("[notify] email failed:", err)
  }
}

async function sendWhatsApp(lead: LeadNotification): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_WHATSAPP_FROM // e.g. "whatsapp:+14155238886"
  const to = process.env.ALERT_WHATSAPP_TO // e.g. "whatsapp:+35799929323"
  if (!sid || !token || !from || !to) {
    console.warn("[notify] whatsapp skipped — Twilio env vars not all set")
    return
  }
  try {
    const body = new URLSearchParams({
      From: from.startsWith("whatsapp:") ? from : `whatsapp:${from}`,
      To: to.startsWith("whatsapp:") ? to : `whatsapp:${to}`,
      Body: toPlainText(lead),
    })
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    })
    if (!res.ok) console.error("[notify] Twilio error:", res.status, await res.text())
  } catch (err) {
    console.error("[notify] whatsapp failed:", err)
  }
}

/** Fire email + WhatsApp in parallel. Never throws. */
export async function notifyLead(lead: LeadNotification): Promise<void> {
  await Promise.allSettled([sendEmail(lead), sendWhatsApp(lead)])
}
