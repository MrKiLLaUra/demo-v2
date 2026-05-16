"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const DURATION = 1.1

const KNOWN_ROUTES = ["/", "/cars", "/services", "/about", "/contact"]

function isKnown(pathname: string) {
  return KNOWN_ROUTES.includes(pathname)
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const [curtainKey, setCurtainKey] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (pathname !== prevPathname.current && isKnown(pathname)) {
      setCurtainKey(pathname)
    }
    prevPathname.current = pathname
  }, [pathname])

  const showCurtain = curtainKey !== null

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showCurtain ? (
          <motion.div
            key={curtainKey + "-curtain"}
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, #3a0a0d 0%, #0d0303 60%, #080101 100%)" }}
            initial={isMobile ? { y: "100%" } : { x: "-100%" }}
            animate={isMobile
              ? { y: ["100%", "0%", "0%", "-100%"] }
              : { x: ["-100%", "0%", "0%", "100%"] }
            }
            transition={{
              duration: DURATION,
              times: [0, 0.38, 0.62, 1],
              ease: [[0.76, 0, 0.24, 1], "linear", [0.76, 0, 0.24, 1]],
            }}
          >
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(227,31,43,0.35) 0%, transparent 70%)", filter: "blur(40px)" }}
              animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.6, 0.6, 1.1, 1.1, 0.8, 0.8] }}
              transition={{ duration: DURATION, times: [0, 0.25, 0.42, 0.58, 0.75, 1], ease: "easeInOut" }}
            />

            <motion.div
              className="relative flex items-center justify-center select-none px-8"
              animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.92, 0.92, 1, 1, 1.04, 1.04] }}
              transition={{ duration: DURATION, times: [0, 0.28, 0.40, 0.60, 0.72, 1], ease: "easeInOut" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sambi-logo.png"
                alt="Sambi Top Gear"
                className="w-72 md:w-96 object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
