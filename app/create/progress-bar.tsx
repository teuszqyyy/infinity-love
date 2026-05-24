"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

const STEP_LABELS = [
  "Quem é",
  "Foto de capa",
  "Música",
  "Data",
  "Mensagem",
  "Galeria",
  "Preview",
]

interface ProgressBarProps {
  step: number // 1-indexed
  total: number
}

export default function ProgressBar({ step, total }: ProgressBarProps) {
  const pct = ((step - 1) / (total - 1)) * 100

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4" style={{ background: "rgba(9,9,9,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Voltar para a home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline">Voltar</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <span
              className="text-xs font-bold"
              style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              InfinityLove
            </span>
          </div>

          <span className="text-xs text-muted-foreground">
            <span className="text-foreground font-semibold">{step}</span>/{total}
          </span>
        </div>

        {/* Progress track */}
        <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})` }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        {/* Step label */}
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-muted-foreground text-center"
        >
          Passo {step} de {total} — <span className="text-foreground">{STEP_LABELS[step - 1]}</span>
        </motion.p>
      </div>
    </header>
  )
}
