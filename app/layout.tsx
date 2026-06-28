import type { Metadata } from 'next'
import { Bebas_Neue, Barlow } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@/components/google-analytics'
import { Clarity } from '@/components/clarity'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { LenisProvider } from '@/components/lenis-provider'
import { FavoritesProvider } from '@/components/favorites-provider'
import { AosInit } from '@/components/aos-init'
import { ChatWidget } from '@/components/chat-widget'
import { FavoritesDrawerGlobal } from '@/components/favorites-drawer-global'
import { Toaster } from '@/components/ui/sonner'
import { PageTransition } from '@/components/page-transition'
import { CookieBanner } from '@/components/cookie-banner'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
})

const siteName = 'Sambi Top Gear Motors'
const siteDescription = 'Premium used car dealership in Limassol, Cyprus. Hand-picked vehicles, transparent pricing, and AI-powered search.'
const siteUrl = 'https://sambitopgearmotors.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Premium Used Cars in Limassol, Cyprus`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ['used cars', 'cars for sale', 'Limassol', 'Cyprus', 'car dealership', 'premium cars', 'Sambi Top Gear Motors'],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  openGraph: {
    type: 'website',
    locale: 'en_CY',
    url: siteUrl,
    siteName,
    title: `${siteName} | Premium Used Cars in Limassol, Cyprus`,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Premium Used Cars in Limassol`,
    description: siteDescription,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${bebasNeue.variable} ${barlow.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <FavoritesProvider>
          <LenisProvider>
            <AosInit />
            <SiteNav />
            <PageTransition>
              {children}
            </PageTransition>
            <SiteFooter />
            <FavoritesDrawerGlobal />
            <ChatWidget />
            <CookieBanner />
            <Toaster position="bottom-right" theme="dark" />
            <Analytics />
            <GoogleAnalytics />
            <Clarity />
          </LenisProvider>
        </FavoritesProvider>
      </body>
    </html>
  )
}
