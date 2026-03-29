import type { Metadata } from 'next'
import { Bebas_Neue, Barlow } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ChatWidget } from '@/components/chat-widget'
import { ScrollToTop } from '@/components/scroll-to-top-on-route-change'
import './globals.css'

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas'
});
const barlow = Barlow({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-barlow'
});

export const metadata: Metadata = {
  title: 'Sambi Top Gear Motors | Premium Used Cars in Limassol, Cyprus',
  description: 'Sambi Top Gear Motors — premium used car dealership in Limassol, Cyprus. Quality vehicles, transparent pricing, and AI-powered search.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${bebasNeue.variable} ${barlow.variable} font-sans antialiased`}>
        <ScrollToTop>{children}</ScrollToTop>
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
