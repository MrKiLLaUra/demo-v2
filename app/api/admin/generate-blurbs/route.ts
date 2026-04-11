import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are an elite automotive copywriter for Sambi Motors. Write a 2-3 sentence premium overview for this car. Start with a punchy 2-5 word hook. Then list the specs (mileage, fuel, color, transmission). End with the price and availability. Base the tone exactly on this example: 'The heavy hitter. 74,203 km on the clock, Petrol, Automatic, finished in Black. It's currently listed as Sold for €185,000.' Strictly return plain text only. No markdown, no asterisks, no intros.`

type CarRow = {
  id: number
  make: string
  model: string
  year: number
  mileage: number
  fuel: string
  transmission: string
  color: string
  price: number | null
  show_price?: boolean
  status?: string
}

type BlurbResult =
  | { id: number; status: 'updated' }
  | { id: number; status: 'error'; error: string }

function buildUserPrompt(car: CarRow): string {
  const price =
    car.show_price && car.price !== null
      ? `€${car.price.toLocaleString('en-EU')}`
      : 'Price on request'

  const status = car.status ?? 'Available'
  const mileage = `${car.mileage.toLocaleString('en-EU')} km`

  return (
    `Car: ${car.year} ${car.make} ${car.model}\n` +
    `Mileage: ${mileage}\n` +
    `Fuel: ${car.fuel}\n` +
    `Transmission: ${car.transmission}\n` +
    `Color: ${car.color}\n` +
    `Price: ${price}\n` +
    `Status: ${status}`
  )
}

export async function GET() {
  // Validate required env vars
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const anthropicKey = process.env.ANTHROPIC_API_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Missing Supabase environment variables.' },
      { status: 500 },
    )
  }

  if (!anthropicKey) {
    return NextResponse.json(
      { error: 'Missing ANTHROPIC_API_KEY environment variable.' },
      { status: 500 },
    )
  }

  // Use service role key when available so RLS doesn't block the UPDATE
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' }) },
  })

  const anthropic = new Anthropic({ apiKey: anthropicKey })

  // 1. Fetch cars that need a blurb
  const { data: cars, error: fetchError } = await supabase
    .from('cars')
    .select('id, make, model, year, mileage, fuel, transmission, color, price, show_price, status')
    .or('ai_blurb.is.null,ai_blurb.eq.')

  if (fetchError) {
    console.error('[generate-blurbs] Supabase fetch error:', fetchError)
    return NextResponse.json(
      { error: 'Failed to fetch cars from Supabase.', details: fetchError.message },
      { status: 500 },
    )
  }

  if (!cars || cars.length === 0) {
    return NextResponse.json({ message: 'All cars already have blurbs.', updated: 0 })
  }

  console.log(`[generate-blurbs] Processing ${cars.length} car(s)…`)

  // 2. Generate & update blurbs one at a time to avoid hammering the API
  const results: BlurbResult[] = []

  for (const car of cars as CarRow[]) {
    try {
      const completion = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 200,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildUserPrompt(car) }],
      })

      const blurb = completion.content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join(' ')
        .trim()

      if (!blurb) {
        throw new Error('Claude returned an empty response.')
      }

      // 3. Write the blurb back to Supabase
      const { error: updateError } = await supabase
        .from('cars')
        .update({ ai_blurb: blurb })
        .eq('id', car.id)

      if (updateError) {
        throw new Error(`Supabase update failed: ${updateError.message}`)
      }

      console.log(`[generate-blurbs] ✓ Car ${car.id} (${car.year} ${car.make} ${car.model})`)
      results.push({ id: car.id, status: 'updated' })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`[generate-blurbs] ✗ Car ${car.id}:`, message)
      results.push({ id: car.id, status: 'error', error: message })
    }
  }

  const updatedCount = results.filter((r) => r.status === 'updated').length
  const errorCount = results.filter((r) => r.status === 'error').length

  return NextResponse.json({
    message: `Blurb generation complete. ${updatedCount} updated, ${errorCount} failed.`,
    updated: updatedCount,
    failed: errorCount,
    results,
  })
}
