"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useFormData } from "../form-context"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

interface StepProps {
  onNext: () => void
  onBack: () => void
}

function useLiveCounter(dateStr: string) {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    if (!dateStr) return
    const start = new Date(dateStr).getTime()
    const calc = () => {
      const diff = Date.now() - start
      if (diff < 0) { setElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setElapsed({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [dateStr])

  return elapsed
}

const MILESTONES = [
  { days: 30, label: "1 mes juntos" },
  { days: 100, label: "100 dias juntos" },
  { days: 365, label: "1 ano juntos" },
  { days: 730, label: "2 anos juntos" },
  { days: 1825, label: "5 anos juntos" },
]

function getEmotionalText(days: number, name: string): string {
  if (days <= 0) return "Cada segundo conta..."
  if (days < 30) return `${days} dias que ${name || "ela"} chegou e mudou tudo.`
  if (days < 100) return `${days} dias construindo algo que vai durar pra sempre.`
  if (days < 365) return `${days} dias juntos. Cada um vale mais que o anterior.`
  if (days < 730) return `Mais de um ano, ${days} dias — e a saudade ainda dói igual no primeiro dia.`
  return `${days} dias. Uma vida inteira nesse numero.`
}

export default function Step4Timer({ onNext, onBack }: StepProps) {
  const { data, update } = useFormData()
  const elapsed = useLiveCounter(data.relationshipStart)
  const pad = (n: number) => String(n).padStart(2, "0")

  const nextMilestone = MILESTONES.find((m) => m.days > elapsed.days)
  const daysToNext = nextMilestone ? nextMilestone.days - elapsed.days : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center min-h-[80vh] px-4 py-8"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(236,72,153,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md flex flex-col gap-7">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight mb-3"
          >
            Desde quando{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              tudo mudou?
            </span>
          </motion.h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A data que marcou o inicio de tudo. O contador vai rodar ao vivo na pagina de {data.personName || "voces"}.
          </p>
        </div>

        {/* Date picker */}
        <div>
          <label className="block text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider" htmlFor="relationship-date">
            Data do inicio do relacionamento
          </label>
          <motion.input
            id="relationship-date"
            type="date"
            value={data.relationshipStart}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => update({ relationshipStart: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl text-sm text-foreground outline-none cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              colorScheme: "dark",
            }}
            whileFocus={{ boxShadow: `0 0 0 2px ${PINK}, 0 0 30px rgba(236,72,153,0.2)` }}
          />
        </div>

        {/* Live counter */}
        <AnimatePresence>
          {data.relationshipStart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: "auto" }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className="rounded-3xl p-6"
                style={{
                  background: `linear-gradient(135deg, rgba(236,72,153,0.08), rgba(168,85,247,0.08))`,
                  border: `1px solid rgba(236,72,153,0.2)`,
                  boxShadow: `0 0 40px rgba(236,72,153,0.08)`,
                }}
              >
                <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-wider">
                  Tempo juntos — ao vivo
                </p>

                {/* Counter grid */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { value: elapsed.days, label: "dias" },
                    { value: elapsed.hours, label: "horas" },
                    { value: elapsed.minutes, label: "min" },
                    { value: elapsed.seconds, label: "seg" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <div
                        className="w-full py-3 rounded-2xl flex items-center justify-center mb-1.5"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <motion.span
                          key={item.value}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="font-bold text-xl"
                          style={{
                            background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {item.label === "dias" ? item.value : pad(item.value)}
                        </motion.span>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Emotional text */}
                <motion.p
                  key={elapsed.days}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-foreground font-medium italic"
                >
                  &ldquo;{getEmotionalText(elapsed.days, data.personName)}&rdquo;
                </motion.p>

                {/* Next milestone */}
                {nextMilestone && daysToNext !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/5 text-center"
                  >
                    <p className="text-xs text-muted-foreground">
                      Faltam{" "}
                      <span style={{ color: PINK }} className="font-bold">{daysToNext}</span>
                      {" "}dias para{" "}
                      <span className="text-foreground font-medium">{nextMilestone.label}</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint */}
        {!data.relationshipStart && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-muted-foreground text-center"
          >
            Pode ser o dia do primeiro encontro, do primeiro beijo, ou quando oficializaram.
          </motion.p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-4 rounded-2xl text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            Voltar
          </motion.button>
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.03, boxShadow: `0 0 40px rgba(236,72,153,0.5)` }}
            whileTap={{ scale: 0.97 }}
            className="flex-[2] py-4 rounded-2xl text-sm font-bold text-white uppercase tracking-wide cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`, boxShadow: `0 0 24px rgba(236,72,153,0.35)` }}
          >
            {data.relationshipStart ? "Continuar" : "Pular por agora"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
