"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

const GA_ID = "G-LDX6KWVTN9"
const COOKIE_KEY = "sambi_cookie_consent"

/**
 * Loads Google Analytics ONLY after the visitor has accepted cookies.
 * Listens for the "cookie-consent-changed" event so GA starts the moment
 * the user clicks Accept, without needing a page reload. This keeps the
 * site compliant with the EU ePrivacy Directive / GDPR (prior opt-in).
 */
export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const sync = () => setEnabled(localStorage.getItem(COOKIE_KEY) === "accepted")
    sync()
    window.addEventListener("cookie-consent-changed", sync)
    return () => window.removeEventListener("cookie-consent-changed", sync)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
