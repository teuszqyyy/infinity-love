"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useFormData } from "../form-context"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

interface StepProps {
  onNext: () => void
}

const SUGGESTIONS = ["Ana", "Pedro", "Julia", "Lucas", "Maria", "Thiago", "Beatriz", "Rafael"]

export default function Step1Name({ onNext }: StepProps) {
  const { data, update } = useFormData()
  const [focused, setFocused] = useState(false)

  const canProceed = data.personName.trim().length >= 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(236,72,153,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-8">
        {/* Floating heart */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="url(#heartGrad)" aria-hidden="true">
            <defs>
              <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={PINK} />
                <stop offset="100%" stopColor={PURPLE} />
              </linearGradient>
            </defs>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* Headline */}
        <div className="text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight mb-3">
            Quem faz o seu{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              coração acelerar?
            </span>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Esse nome vai aparecer com destaque na surpresa. Pode ser apelido, nome completo ou qualquer coisa especial.
          </p>
        </div>

        {/* Input */}
        <div className="w-full">
          <motion.div
            animate={
              focused
                ? { boxShadow: `0 0 0 2px ${PINK}, 0 0 30px rgba(236,72,153,0.25)` }
                : { boxShadow: "0 0 0 1px rgba(255,255,255,0.1)" }
            }
            transition={{ duration: 0.25 }}
            className="rounded-2xl overflow-hidden"
          >
            <input
              type="text"
              value={data.personName}
              onChange={(e) => update({ personName: e.target.value })}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && canProceed && onNext()}
              placeholder="Ex: Ana, meu amor..."
              maxLength={40}
              className="w-full px-6 py-5 text-xl font-semibold text-foreground placeholder:text-muted-foreground/50 bg-transparent outline-none text-center"
              style={{ background: "rgba(255,255,255,0.04)" }}
              aria-label="Nome da pessoa"
              autoFocus
            />
          </motion.div>

          {/* Character hint */}
          <p className="text-xs text-muted-foreground text-center mt-2">
            {data.personName.length}/40 caracteres
          </p>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((name) => (
            <motion.button
              key={name}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => update({ personName: name })}
              className="px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer"
              style={{
                background: data.personName === name ? `linear-gradient(135deg, ${PINK}, ${PURPLE})` : "rgba(255,255,255,0.06)",
                color: data.personName === name ? "#fff" : undefined,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              aria-pressed={data.personName === name}
            >
              {name}
            </motion.button>
          ))}
        </div>

        {/* Preview text */}
        {canProceed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl px-6 py-4 text-center w-full"
            style={{
              background: `linear-gradient(135deg, rgba(236,72,153,0.07), rgba(168,85,247,0.07))`,
              border: `1px solid rgba(236,72,153,0.2)`,
            }}
          >
            <p className="text-sm text-muted-foreground mb-1">Uma surpresa especial para</p>
            <p
              className="font-serif text-2xl font-bold"
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {data.personName}
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.button
          onClick={onNext}
          disabled={!canProceed}
          whileHover={canProceed ? { scale: 1.03, boxShadow: `0 0 40px rgba(236,72,153,0.5)` } : {}}
          whileTap={canProceed ? { scale: 0.97 } : {}}
          className="w-full py-4 rounded-2xl text-sm font-bold text-white uppercase tracking-wide cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          style={{
            background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`,
            boxShadow: canProceed ? `0 0 24px rgba(236,72,153,0.35)` : "none",
          }}
          aria-label="Continuar para próximo passo"
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  )
}
