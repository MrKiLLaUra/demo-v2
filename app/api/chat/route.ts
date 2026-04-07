import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { fetchCars } from '../../../lib/car-data'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
})

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Missing ANTHROPIC_API_KEY environment variable.' },
        { status: 500 },
      )
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous'
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      return NextResponse.json(
        { error: 'Whoa there! Sambi AI is taking a quick breather to prevent spam. Please try again in a minute.' },
        { status: 429 },
      )
    }

    const body = (await request.json()) as { messages?: ChatMessage[] }
    const inputMessages = body.messages ?? []

    if (!Array.isArray(inputMessages) || inputMessages.length === 0) {
      return NextResponse.json({ error: 'At least one message is required.' }, { status: 400 })
    }

    const messages = inputMessages
      .filter(
        (message) =>
          (message.role === 'user' || message.role === 'assistant') &&
          typeof message.content === 'string' &&
          message.content.trim().length > 0,
      )
      .map((message) => ({
        role: message.role,
        content: message.content.trim(),
      }))

    if (messages.length === 0) {
      return NextResponse.json({ error: 'No valid messages were provided.' }, { status: 400 })
    }

    const cars = await fetchCars()
    const inventoryForPrompt = cars
      .map((car) => {
        const price = car.showPrice && car.price !== null ? `EUR ${car.price.toLocaleString('en-US')}` : 'Price on request'
        return `- ${car.year} ${car.make} ${car.model} | Fuel: ${car.fuel} | Transmission: ${car.transmission} | Mileage: ${car.mileage.toLocaleString()} km | Color: ${car.color} | Condition: ${car.condition} | Price: ${price} | Description: ${car.description}`
      })
      .join('\n')

    const systemPrompt = `You are the elite AI concierge for Sambi Top Gear Motors in Limassol. You help users find cars in our inventory and book test drives. Use only the inventory provided below when discussing currently available cars. If a user asks for a car we don't have, politely explain we are actively sourcing cars and ask for their phone number so Kosmas can find it for them.

Current inventory:
${inventoryForPrompt}`

    const completion = await anthropic.messages.create({
      model: 'claude-4-sonnet-20250514',
      max_tokens: 600,
      system: systemPrompt,
      messages,
    })

    const reply = completion.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()

    if (!reply) {
      return NextResponse.json({ error: 'No text response from model.' }, { status: 502 })
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Failed to generate response.' }, { status: 500 })
  }
}
