"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const DURATION = 1.1

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

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

      {/* Curtain */}
      <AnimatePresence>
        <motion.div
          key={pathname + "-curtain"}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "0%", "0%", "100%"] }}
          transition={{
            duration: DURATION,
            times: [0, 0.38, 0.62, 1],
            ease: [[0.76, 0, 0.24, 1], "linear", [0.76, 0, 0.24, 1]],
          }}
        >
          {/* Logo inside curtain */}
          <motion.div
            className="flex flex-col items-center leading-none select-none"
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
              scale:   [0.92, 0.92, 1, 1, 1.04, 1.04],
            }}
            transition={{
              duration: DURATION,
              times: [0, 0.28, 0.40, 0.60, 0.72, 1],
              ease: "easeInOut",
            }}
          >
            <span className="font-display text-3xl md:text-4xl tracking-[0.35em] text-foreground">
              SAMBI TOP GEAR
            </span>
            <span className="text-[10px] tracking-[0.45em] text-primary font-semibold mt-1">
              MOTORS · LIMASSOL
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
