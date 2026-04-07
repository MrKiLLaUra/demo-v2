'use client'

import { FormEvent, useState } from 'react'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Welcome to Sambi Top Gear Motors. Looking for a specific car or want to book a test drive?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = input.trim()
    if (!trimmed || isLoading) {
      return
    }

    const userMessage: ChatMessage = { role: 'user', content: trimmed }
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setInput('')
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      const data = (await response.json()) as { reply?: string; error?: string }

      if (!response.ok) {
        if (response.status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content:
                data.error ??
                'Whoa there! Sambi AI is taking a quick breather to prevent spam. Please try again in a minute.',
            },
          ])
          return
        }
        throw new Error(data.error ?? 'Failed to get response from AI concierge.')
      }

      const reply = data.reply?.trim()
      if (!reply) {
        throw new Error('No reply returned from AI concierge.')
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setError('Something went wrong. Please try again in a moment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <div
        className={`pointer-events-auto mb-3 w-[calc(100vw-2rem)] max-w-sm origin-bottom-right overflow-hidden border border-white/15 bg-zinc-950/95 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 ease-out sm:w-[370px] ${
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-5 scale-95 opacity-0'
        }`}
      >
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 px-5 py-4">
          <p className="font-display text-xl tracking-wide text-white">Sambi AI</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-400">Concierge Chat</p>
        </div>

        <div className="border-t border-white/10 px-5 py-5">
          <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] border px-4 py-3 text-sm leading-relaxed shadow-[0_12px_30px_rgba(0,0,0,0.35)] ${
                  message.role === 'assistant'
                    ? 'border-white/10 bg-zinc-900/80 text-zinc-200'
                    : 'ml-auto border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
                }`}
              >
                {message.content}
              </div>
            ))}

            {isLoading ? (
              <div className="max-w-[90%] border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm leading-relaxed text-zinc-300 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                Sambi AI is typing...
              </div>
            ) : null}
          </div>

          {error ? <p className="mt-3 text-xs text-red-300">{error}</p> : null}

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about cars or test drives..."
              className="flex-1 border border-white/15 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-white/30"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close Sambi AI chat' : 'Open Sambi AI chat'}
        className="pointer-events-auto ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-zinc-700 via-zinc-900 to-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:border-white/30 hover:shadow-[0_24px_60px_rgba(0,0,0,0.65)] active:scale-95"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            d="M8 10.5H16M8 14H13M7 20L8.1 16.9C8.17 16.7 8.2 16.6 8.26 16.51C8.31 16.43 8.38 16.36 8.46 16.31C8.55 16.25 8.67 16.22 8.9 16.15C12.66 15.05 15.5 11.88 15.5 8C15.5 3.86 12.14 0.5 8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 10.6 1.82 12.88 3.84 14.22C4.12 14.41 4.26 14.5 4.34 14.6C4.4 14.69 4.44 14.8 4.45 14.91C4.47 15.05 4.43 15.21 4.35 15.55L3.5 19L7 20Z"
            transform="translate(4 2)"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
