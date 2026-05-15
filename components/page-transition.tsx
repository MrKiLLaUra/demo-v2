"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const DURATION = 1.1

const KNOWN_ROUTES = ["/", "/cars", "/services", "/about", "/contact"]

function isKnown(pathname: string) {
  return KNOWN_ROUTES.includes(pathname) || pathname.startsWith("/cars/")
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showCurtain = isKnown(pathname)

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
            key={pathname + "-curtain"}
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, #3a0a0d 0%, #0d0303 60%, #080101 100%)" }}
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "0%", "0%", "100%"] }}
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
              className="relative flex flex-col items-center leading-none select-none"
              animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.92, 0.92, 1, 1, 1.04, 1.04] }}
              transition={{ duration: DURATION, times: [0, 0.28, 0.40, 0.60, 0.72, 1], ease: "easeInOut" }}
            >
              <div className="w-8 h-px bg-primary mb-3" />
              <span className="font-display text-3xl md:text-4xl tracking-[0.35em] text-foreground">SAMBI TOP GEAR</span>
              <span className="text-[10px] tracking-[0.45em] text-primary font-semibold mt-1.5">MOTORS · LIMASSOL</span>
              <div className="w-8 h-px bg-primary mt-3" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
