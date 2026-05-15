"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const COOKIE_KEY = "sambi_cookie_consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[999] border-t border-border bg-background/95 backdrop-blur-md px-6 py-5 md:py-4"
        >
          <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs text-muted-foreground font-light leading-relaxed flex-1">
              We use cookies to improve your experience and analyse site traffic.
              By continuing you agree to our use of cookies.{" "}
              <Link href="/privacy" className="text-primary hover:underline">Learn more</Link>
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={decline}
                className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors px-4 py-2 border border-border hover:border-foreground/30"
              >
                DECLINE
              </button>
              <button
                onClick={accept}
                className="text-xs tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 transition-colors"
              >
                ACCEPT
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
