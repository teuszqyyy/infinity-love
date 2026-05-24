"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useFormData } from "../form-context"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

interface StepProps {
  onNext: () => void
  onBack: () => void
}

const AI_TEMPLATES = [
  `Cada vez que olho pra voce, entendo que existe um universo inteiro dentro de um olhar. Voce chegou na minha vida sem avisar e foi ficando, sem pedir licenca, porque voce era exatamente o que eu precisava — mesmo sem saber que precisava. Obrigado por cada momento, cada risada, cada silencio.`,
  `Ha momentos na vida que a gente nao sabe nomear. Mas tem um que eu sei: aquele dia que eu te vi e algo dentro de mim disse "e ela". Nao era perfeito. Nem eu, nem voce. Mas era real. E real e tudo.`,
  `Se eu pudesse guardar um momento pra sempre, seria aquele em que a gente ria junto sem motivo nenhum. Porque e nesses momentos que eu entendo o que e estar em casa. Voce e a minha casa.`,
]

export default function Step5Message({ onNext, onBack }: StepProps) {
  const { data, update } = useFormData()
  const [generating, setGenerating] = useState(false)
  const [templateIndex, setTemplateIndex] = useState(0)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      update({ message: AI_TEMPLATES[templateIndex % AI_TEMPLATES.length] })
      setTemplateIndex((i) => i + 1)
      setGenerating(false)
    }, 1400)
  }

  const charCount = data.message.length
  const maxChars = 600

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
          background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(168,85,247,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md flex flex-col gap-6">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight mb-3"
          >
            As palavras que{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              voce nunca disse
            </span>
          </motion.h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Escreva com o coracao. Ou deixe a IA escrever por voce — e edite o que quiser.
          </p>
        </div>

        {/* AI Generate button */}
        <motion.button
          onClick={handleGenerate}
          disabled={generating}
          whileHover={!generating ? { scale: 1.02, y: -1 } : {}}
          whileTap={!generating ? { scale: 0.98 } : {}}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold cursor-pointer flex items-center justify-center gap-2.5 transition-all"
          style={{
            background: generating
              ? "rgba(255,255,255,0.04)"
              : `linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.15))`,
            border: `1px solid ${generating ? "rgba(255,255,255,0.06)" : "rgba(236,72,153,0.3)"}`,
            color: generating ? undefined : PINK,
          }}
          aria-busy={generating}
        >
          <AnimatePresence mode="wait">
            {generating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: PINK }}
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">Gerando com IA...</span>
              </motion.div>
            ) : (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                Gerar mensagem com IA
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-xs text-muted-foreground">ou escreva voce mesmo</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Textarea */}
        <div className="relative">
          <motion.textarea
            value={data.message}
            onChange={(e) => update({ message: e.target.value.slice(0, maxChars) })}
            placeholder={`Escreva algo especial para ${data.personName || "ela"}...`}
            rows={8}
            className="w-full px-5 py-4 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/40 outline-none resize-none leading-relaxed"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            whileFocus={{ boxShadow: `0 0 0 2px ${PINK}, 0 0 30px rgba(236,72,153,0.15)` }}
            aria-label="Mensagem de amor"
          />
          <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">
            <span style={{ color: charCount > maxChars * 0.9 ? PINK : undefined }}>
              {charCount}
            </span>/{maxChars}
          </div>
        </div>

        {/* Live preview */}
        <AnimatePresence>
          {data.message.length > 20 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}
                />
                Preview — como vai aparecer
              </p>
              <p className="text-sm text-foreground leading-relaxed italic font-serif">
                &ldquo;{data.message.slice(0, 180)}{data.message.length > 180 ? "..." : ""}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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
            {data.message.length > 10 ? "Continuar" : "Pular por agora"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
