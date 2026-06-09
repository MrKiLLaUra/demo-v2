import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"
import { fetchCars } from "../../../lib/car-data"
import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Rate limiting is optional: only enabled when Upstash Redis credentials are present.
const hasUpstash = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
const ratelimit = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      analytics: true,
    })
  : null

interface ValuationResult {
  low: number
  typical: number
  high: number
  currency: string
  rationale: string
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "Missing ANTHROPIC_API_KEY environment variable." }, { status: 500 })
    }

    if (ratelimit) {
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous"
      try {
        const { success } = await ratelimit.limit(ip)
        if (!success) {
          return NextResponse.json(
            { error: "Whoa there! The price engine is taking a quick breather to prevent spam. Please try again in a minute." },
            { status: 429 },
          )
        }
      } catch (err) {
        // Don't let a rate-limiter outage block valuations.
        console.warn("[valuation] rate limit check skipped:", err)
      }
    }

    const { make, model, year, mileage, fuel, transmission, condition } = await request.json()

    if (!make || !model || !year) {
      return NextResponse.json({ error: "Please provide at least the make, model and year." }, { status: 400 })
    }

    const cars = await fetchCars()
    const inventoryForPrompt = cars
      .map((car) => {
        const price = car.showPrice && car.price !== null ? `EUR ${car.price.toLocaleString("en-US")}` : "Price on request"
        return `- ${car.year} ${car.make} ${car.model} | Fuel: ${car.fuel} | Transmission: ${car.transmission} | Mileage: ${car.mileage.toLocaleString()} km | Condition: ${car.condition} | Price: ${price}`
      })
      .join("\n")

    const target = [
      `Make: ${make}`,
      `Model: ${model}`,
      `Year: ${year}`,
      mileage ? `Mileage: ${mileage} km` : null,
      fuel ? `Fuel: ${fuel}` : null,
      transmission ? `Transmission: ${transmission}` : null,
      condition ? `Condition: ${condition}` : null,
    ].filter(Boolean).join("\n")

    const systemPrompt = `You are the AI Price Engine for Sambi Top Gear Motors, a used car dealership in Limassol, Cyprus. You estimate the fair current market value of a used car in EUR for the Cyprus / European market.

Use the dealership's current inventory below as a reference anchor for comparable cars where relevant, then apply general knowledge of the European used-car market, adjusting for year, mileage, fuel type, transmission and condition.

Respond with ONLY a single valid JSON object, no markdown, no code fences, no extra text, in exactly this shape:
{"low": <integer EUR>, "typical": <integer EUR>, "high": <integer EUR>, "currency": "EUR", "rationale": "<one or two plain sentences explaining the estimate>"}

low < typical < high. Keep the rationale concise, factual and free of markdown.

Current dealership inventory:
${inventoryForPrompt}`

    const completion = await anthropic.messages.create({
      model: "claude-4-sonnet-20250514",
      max_tokens: 400,
      system: systemPrompt,
      messages: [{ role: "user", content: `Estimate the market value of this vehicle:\n${target}` }],
    })

    const raw = completion.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { text: string }).text)
      .join("")
      .trim()

    let parsed: ValuationResult
    try {
      const jsonText = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim()
      parsed = JSON.parse(jsonText)
    } catch {
      console.error("[valuation] could not parse model output:", raw)
      return NextResponse.json({ error: "The price engine returned an unexpected response. Please try again." }, { status: 502 })
    }

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Valuation API error:", error)
    return NextResponse.json({ error: "Failed to generate a valuation." }, { status: 500 })
  }
}
