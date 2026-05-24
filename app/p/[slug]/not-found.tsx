"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden" style={{ background: "#070707" }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{ background: PINK, filter: "blur(100px)", opacity: 0.1 }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-24 h-24 mb-8">
          <svg viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={PINK} />
                <stop offset="100%" stopColor={PURPLE} />
              </linearGradient>
            </defs>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            <path d="M12 5.67V21.23" />
            <path d="M12 5.67l3 3-3 3 3 3-3 3" />
          </svg>
        </div>
        
        <h1 className="font-serif text-3xl font-bold text-white mb-3">Página não encontrada</h1>
        <p className="text-white/60 mb-8 max-w-sm">Esse link pode ter expirado, ou talvez nunca tenha existido.</p>
        
        <Link href="/create" className="px-8 py-4 rounded-2xl font-bold text-white shadow-lg transition-transform hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`, boxShadow: `0 0 40px rgba(236,72,153,0.3)` }}>
          Criar minha surpresa
        </Link>
      </motion.div>
    </div>
  )
}
