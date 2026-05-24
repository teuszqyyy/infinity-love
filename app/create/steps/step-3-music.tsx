"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useFormData } from "../form-context"
import type { SongData } from "../form-context"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

interface StepProps {
  onNext: () => void
  onBack: () => void
}

const SUGGESTED_SONGS: SongData[] = [
  { title: "Perfect", artist: "Ed Sheeran" },
  { title: "All of Me", artist: "John Legend" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran" },
  { title: "A Thousand Years", artist: "Christina Perri" },
  { title: "Te Amo", artist: "Rihanna" },
  { title: "Photograph", artist: "Ed Sheeran" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley" },
  { title: "Lover", artist: "Taylor Swift" },
  { title: "Die For You", artist: "The Weeknd" },
  { title: "Gravity", artist: "John Mayer" },
  { title: "Você Me Faz Bem", artist: "Padre Fábio de Melo" },
  { title: "Esperando por Ti", artist: "Gusttavo Lima" },
]

function MusicCard({ song, selected, onSelect }: { song: SongData; selected: boolean; onSelect: () => void }) {
  const initials = song.artist.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  const gradients = [
    "linear-gradient(135deg, #1DB954, #191414)",
    "linear-gradient(135deg, #EC4899, #7C3AED)",
    "linear-gradient(135deg, #F59E0B, #EF4444)",
    "linear-gradient(135deg, #3B82F6, #1E3A8A)",
    "linear-gradient(135deg, #10B981, #065F46)",
    "linear-gradient(135deg, #8B5CF6, #C026D3)",
  ]
  const gradIndex = (song.title.charCodeAt(0) + song.artist.charCodeAt(0)) % gradients.length

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center gap-4 p-3 rounded-2xl text-left cursor-pointer transition-all"
      style={{
        background: selected
          ? `linear-gradient(135deg, rgba(236,72,153,0.12), rgba(168,85,247,0.12))`
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${selected ? "rgba(236,72,153,0.4)" : "rgba(255,255,255,0.07)"}`,
        boxShadow: selected ? `0 0 20px rgba(236,72,153,0.15)` : "none",
      }}
      aria-pressed={selected}
    >
      {/* Cover art */}
      <div
        className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
        style={{ background: gradients[gradIndex] }}
      >
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-foreground text-sm font-semibold truncate">{song.title}</p>
        <p className="text-muted-foreground text-xs mt-0.5 truncate">{song.artist}</p>
      </div>

      {/* Selected indicator */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Equalizer when not selected */}
      {!selected && (
        <div className="flex items-end gap-0.5 h-4 flex-shrink-0">
          {[3, 6, 4, 8, 5].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-sm"
              style={{ height: `${h}px`, background: "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>
      )}
    </motion.button>
  )
}

export default function Step3Music({ onNext, onBack }: StepProps) {
  const { data, update } = useFormData()
  const [query, setQuery] = useState("")

  const filtered = query.trim().length > 0
    ? SUGGESTED_SONGS.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.artist.toLowerCase().includes(query.toLowerCase())
      )
    : SUGGESTED_SONGS

  const handleCustom = () => {
    if (query.trim()) {
      const parts = query.split("-").map((s) => s.trim())
      update({
        song: { title: parts[0] || query, artist: parts[1] || "Artista personalizado" },
      })
    }
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
          background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(29,185,84,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(168,85,247,0.08) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md flex flex-col gap-6">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight mb-3"
          >
            Qual a{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              música de vocês?
            </span>
          </motion.h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Aquela que toca e faz {data.personName || "ela"} lembrar de tudo de uma vez.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar música ou artista..."
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            aria-label="Buscar música"
          />
          {query && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleCustom}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-lg cursor-pointer"
              style={{ background: `rgba(236,72,153,0.15)`, color: PINK }}
            >
              Usar essa
            </motion.button>
          )}
        </div>

        {/* Selected preview */}
        <AnimatePresence>
          {data.song && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-2xl p-4 flex items-center gap-4 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1))`,
                border: `1px solid rgba(236,72,153,0.3)`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                  <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Musica selecionada</p>
                <p className="text-foreground text-sm font-bold truncate">{data.song.title}</p>
                <p className="text-muted-foreground text-xs truncate">{data.song.artist}</p>
              </div>
              {/* Equalizer animation */}
              <div className="flex items-end gap-0.5 h-5 flex-shrink-0">
                {[4, 8, 5, 10, 6].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-sm"
                    style={{ background: i % 2 === 0 ? PINK : PURPLE }}
                    animate={{ height: [`${h}px`, `${h + 6}px`, `${h}px`] }}
                    transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, delay: i * 0.08 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Song list */}
        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-6">Nenhuma musica encontrada. Use o botao &ldquo;Usar essa&rdquo; para adicionar.</p>
          ) : (
            filtered.map((song) => (
              <MusicCard
                key={`${song.title}-${song.artist}`}
                song={song}
                selected={data.song?.title === song.title && data.song?.artist === song.artist}
                onSelect={() => update({ song })}
              />
            ))
          )}
        </div>

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
            {data.song ? "Continuar" : "Pular por agora"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
