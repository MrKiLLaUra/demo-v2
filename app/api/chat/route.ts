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
        const status = (car.status || (car as any).Status || 'Available') as string;
        return `- ${car.year} ${car.make} ${car.model} | Status: ${status} | Fuel: ${car.fuel} | Transmission: ${car.transmission} | Mileage: ${car.mileage.toLocaleString()} km | Color: ${car.color} | Condition: ${car.condition} | Price: ${price} | Description: ${car.description}`
      })
      .join('\n')

    const systemPrompt = `You are the elite AI concierge for Sambi Top Gear Motors in Limassol. You help users find cars in our inventory and book test drives. Use only the inventory provided below when discussing currently available cars. If a user asks for a car we don't have, politely explain we are actively sourcing cars and direct them to click the red BOOK A TEST DRIVE button to speak with Kosmas directly on WhatsApp.

RULE 1 - PLAIN TEXT ONLY: You must never use markdown formatting of any kind. Do not use asterisks for bold or italic (no ** or *), no headers with #, no bullet points with -, no backticks. Write in plain, natural sentences only.

RULE 2 - SOLD AWARENESS: Every car in the inventory below has a Status field. If a user asks about a specific car whose Status is SOLD, you must clearly tell them that this particular vehicle has already been sold and is no longer available for a test drive. Then offer to help them find a similar available vehicle from the inventory, or direct them to click the red BOOK A TEST DRIVE button to speak with Kosmas on WhatsApp about sourcing one.

RULE 3 - BOOKING TEST DRIVES: You must never ask the user for their phone number or any contact information. You do not have the ability to save leads or send messages. If a user wants to book a test drive or get in touch, enthusiastically tell them to click the red BOOK A TEST DRIVE button located directly below the car details, which will connect them instantly with our specialist Kosmas on WhatsApp.

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
