"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

const COOKIE_KEY = "sambi_cookie_consent"
const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

/**
 * Microsoft Clarity — heatmaps + session recordings.
 * Loads ONLY after the visitor accepts cookies (same consent gate as GA),
 * keeping the site compliant with the EU ePrivacy Directive / GDPR.
 * Set NEXT_PUBLIC_CLARITY_PROJECT_ID to enable it.
 */
export function Clarity() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const sync = () => setEnabled(localStorage.getItem(COOKIE_KEY) === "accepted")
    sync()
    window.addEventListener("cookie-consent-changed", sync)
    return () => window.removeEventListener("cookie-consent-changed", sync)
  }, [])

  if (!enabled || !PROJECT_ID) return null

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${PROJECT_ID}");
      `}
    </Script>
  )
}
