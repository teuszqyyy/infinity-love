"use client"

import { motion } from "framer-motion"
import { Heart } from "./icons"
import Image from "next/image"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(7,7,7,0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
      role="banner"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
          style={{ boxShadow: `0 0 12px rgba(236,72,153,0.5)` }}
        >
          <Image
            src="/images/infinitylove-logo.png"
            alt="InfinityLove logo"
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <span className="font-bold text-foreground text-base tracking-tight">
          Infinity<span style={{ color: PINK }}>Love</span>
        </span>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{
          scale: 1.04,
          boxShadow: "0 0 20px rgba(236,72,153,0.5), 0 0 40px rgba(168,85,247,0.25)",
        }}
        whileTap={{ scale: 0.97 }}
        className="text-xs font-bold text-white py-2.5 px-5 rounded-xl cursor-pointer hidden sm:block"
        style={{
          background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
          boxShadow: "0 0 14px rgba(236,72,153,0.3)",
        }}
      >
        Criar agora — R$19,90
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="text-xs font-bold text-white py-2.5 px-4 rounded-xl cursor-pointer sm:hidden"
        style={{
          background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
          boxShadow: "0 0 12px rgba(236,72,153,0.3)",
        }}
      >
        R$19,90 ♥
      </motion.button>
    </motion.header>
  )
}
