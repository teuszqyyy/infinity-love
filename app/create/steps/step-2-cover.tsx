"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCallback, useRef, useState } from "react"
import { useFormData } from "../form-context"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

interface StepProps {
  onNext: () => void
  onBack: () => void
}

export default function Step2Cover({ onNext, onBack }: StepProps) {
  const { data, update } = useFormData()
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return
      const url = URL.createObjectURL(file)
      update({ coverPhoto: file, coverPhotoUrl: url })
    },
    [update]
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(168,85,247,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-7">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight mb-3"
          >
            A foto que vai{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              parar tudo
            </span>
          </motion.h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Escolha a foto principal — aquela que, quando {data.personName || "ela"} abrir, vai sentir o coração apertar.
          </p>
        </div>

        {/* Drop zone / preview */}
        <motion.div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          animate={dragging ? { scale: 1.02, borderColor: PINK } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className="w-full aspect-[4/5] rounded-3xl overflow-hidden relative cursor-pointer group"
          style={{
            border: `2px dashed ${data.coverPhotoUrl ? "transparent" : dragging ? PINK : "rgba(255,255,255,0.15)"}`,
            background: data.coverPhotoUrl ? "transparent" : "rgba(255,255,255,0.03)",
          }}
          role="button"
          aria-label="Selecionar foto de capa"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        >
          <AnimatePresence mode="wait">
            {data.coverPhotoUrl ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* Blurred background */}
                <div
                  className="absolute inset-0 scale-110"
                  style={{
                    backgroundImage: `url(${data.coverPhotoUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(20px) brightness(0.4)",
                  }}
                />
                {/* Sharp main image */}
                <img
                  src={data.coverPhotoUrl}
                  alt="Foto de capa"
                  className="relative z-10 w-full h-full object-contain"
                />
                {/* Overlay gradient bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 h-32 z-20"
                  style={{ background: "linear-gradient(to top, rgba(9,9,9,0.9), transparent)" }}
                />
                {/* Change photo overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 z-30 flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.55)" }}
                >
                  <div className="text-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="mx-auto mb-2" aria-hidden="true">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <p className="text-white text-sm font-semibold">Trocar foto</p>
                  </div>
                </motion.div>

                {/* Name badge */}
                <div className="absolute bottom-5 left-5 z-30">
                  <p
                    className="font-serif text-xl font-bold text-white"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                  >
                    {data.personName}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8"
              >
                <motion.div
                  animate={dragging ? { scale: 1.15 } : { scale: 1 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.15))`,
                    border: `1px solid rgba(236,72,153,0.3)`,
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" aria-hidden="true">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </motion.div>
                <div className="text-center">
                  <p className="text-foreground text-sm font-semibold mb-1">
                    {dragging ? "Solte aqui" : "Arraste ou clique para escolher"}
                  </p>
                  <p className="text-muted-foreground text-xs">JPG, PNG, WEBP — recomendado vertical</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onInputChange}
          aria-label="Upload de foto"
        />

        {/* Tip */}
        {!data.coverPhotoUrl && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-muted-foreground text-center max-w-xs"
          >
            Dica: uma foto dos dois juntos, olhando um para o outro, funciona perfeitamente.
          </motion.p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-4 rounded-2xl text-sm font-semibold text-muted-foreground cursor-pointer transition-colors hover:text-foreground"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            Voltar
          </motion.button>
          <motion.button
            onClick={onNext}
            disabled={!data.coverPhotoUrl}
            whileHover={data.coverPhotoUrl ? { scale: 1.03, boxShadow: `0 0 40px rgba(236,72,153,0.5)` } : {}}
            whileTap={data.coverPhotoUrl ? { scale: 0.97 } : {}}
            className="flex-[2] py-4 rounded-2xl text-sm font-bold text-white uppercase tracking-wide cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`,
              boxShadow: data.coverPhotoUrl ? `0 0 24px rgba(236,72,153,0.35)` : "none",
            }}
          >
            {data.coverPhotoUrl ? "Perfeita! Continuar" : "Escolher foto"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
