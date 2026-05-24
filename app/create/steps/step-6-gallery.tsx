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

export default function Step6Gallery({ onNext, onBack }: StepProps) {
  const { data, update } = useFormData()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const addFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return
      const valid = Array.from(files).filter((f) => f.type.startsWith("image/"))
      if (!valid.length) return
      const newUrls = valid.map((f) => URL.createObjectURL(f))
      update({
        galleryPhotos: [...data.galleryPhotos, ...valid].slice(0, 10),
        galleryPhotoUrls: [...data.galleryPhotoUrls, ...newUrls].slice(0, 10),
      })
    },
    [data.galleryPhotos, data.galleryPhotoUrls, update]
  )

  const removePhoto = (index: number) => {
    const photos = data.galleryPhotos.filter((_, i) => i !== index)
    const urls = data.galleryPhotoUrls.filter((_, i) => i !== index)
    update({ galleryPhotos: photos, galleryPhotoUrls: urls })
  }

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
          background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(236,72,153,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md flex flex-col gap-6">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight mb-3"
          >
            Os momentos que{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              precisam ficar
            </span>
          </motion.h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Adicione ate 10 fotos. Vao aparecer em galeria cinematografica na pagina de {data.personName || "voces"}.
          </p>
        </div>

        {/* Drop zone */}
        <motion.div
          onClick={() => data.galleryPhotoUrls.length < 10 && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
          animate={dragging ? { borderColor: PINK, scale: 1.01 } : {}}
          className="w-full py-8 rounded-2xl flex flex-col items-center gap-3 cursor-pointer transition-colors"
          style={{
            border: `2px dashed ${dragging ? PINK : "rgba(255,255,255,0.12)"}`,
            background: dragging ? "rgba(236,72,153,0.05)" : "rgba(255,255,255,0.03)",
          }}
          role="button"
          aria-label="Adicionar fotos"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        >
          <motion.div
            animate={dragging ? { scale: 1.1 } : { scale: 1 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, rgba(236,72,153,0.12), rgba(168,85,247,0.12))`,
              border: `1px solid rgba(236,72,153,0.25)`,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.div>
          <div className="text-center">
            <p className="text-foreground text-sm font-semibold">
              {dragging ? "Solte as fotos aqui" : "Arraste ou clique para adicionar"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {data.galleryPhotoUrls.length}/10 fotos adicionadas
            </p>
          </div>
        </motion.div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
          aria-label="Upload de fotos da galeria"
        />

        {/* Gallery grid */}
        <AnimatePresence>
          {data.galleryPhotoUrls.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-3 gap-2"
            >
              {data.galleryPhotoUrls.map((url, i) => (
                <motion.div
                  key={url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  <img
                    src={url}
                    alt={`Foto ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.6)" }}
                  >
                    <motion.button
                      onClick={(e) => { e.stopPropagation(); removePhoto(i) }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                      style={{ background: "rgba(239,68,68,0.8)" }}
                      aria-label={`Remover foto ${i + 1}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </motion.button>
                  </motion.div>

                  {/* Order badge */}
                  <div
                    className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}
                  >
                    {i + 1}
                  </div>
                </motion.div>
              ))}

              {/* Add more slot */}
              {data.galleryPhotoUrls.length < 10 && (
                <motion.button
                  onClick={() => inputRef.current?.click()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="aspect-square rounded-xl flex items-center justify-center cursor-pointer"
                  style={{ border: `2px dashed rgba(255,255,255,0.12)`, background: "rgba(255,255,255,0.03)" }}
                  aria-label="Adicionar mais fotos"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip */}
        {data.galleryPhotoUrls.length > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            Dica: quanto mais fotos, mais rica e emocionante fica a galeria.
          </p>
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
            {data.galleryPhotoUrls.length > 0 ? `Ver preview (${data.galleryPhotoUrls.length} fotos)` : "Pular por agora"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
