"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

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
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Curtain overlay */}
      <AnimatePresence>
        <motion.div
          key={pathname + "-curtain"}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0], originX: ["0%", "0%", "100%", "100%"] }}
          transition={{ duration: 0.55, times: [0, 0.4, 0.6, 1], ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-background pointer-events-none"
        />
      </AnimatePresence>
    </>
  )
}
