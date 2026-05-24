"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Music, Heart, Camera } from "./icons"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

function useLiveCounter(start: Date) {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = Date.now() - start.getTime()
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setElapsed({ days, hours, minutes, seconds })
    }
    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [start])

  return elapsed
}

function MusicPlayer({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Album art */}
      <div
        className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}
      >
        <Music size={18} className="text-white" />
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-foreground text-sm font-semibold truncate">Perfect — Ed Sheeran</p>
        <p className="text-muted-foreground text-xs mt-0.5">Nossa música ♥</p>
        {/* Progress bar */}
        <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})` }}
            animate={isPlaying ? { width: ["30%", "70%"] } : { width: "30%" }}
            transition={isPlaying ? { duration: 12, ease: "linear" } : {}}
          />
        </div>
      </div>

      {/* Play/Pause */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer"
        style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}
        aria-label={isPlaying ? "Pausar" : "Reproduzir"}
      >
        {isPlaying ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="white" aria-hidden="true">
            <rect x="2" y="1" width="3" height="10" rx="1" />
            <rect x="7" y="1" width="3" height="10" rx="1" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="white" aria-hidden="true">
            <path d="M3 1.5L10.5 6 3 10.5V1.5z" />
          </svg>
        )}
      </motion.button>

      {/* Equalizer bars */}
      {isPlaying && (
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
      )}
    </div>
  )
}

const photos = [
  { label: "Primeiro encontro", gradient: `linear-gradient(135deg, #1a1a2e, #16213e)` },
  { label: "Nossa viagem", gradient: `linear-gradient(135deg, #0f3460, #533483)` },
  { label: "Aniversário", gradient: `linear-gradient(135deg, #1a0533, #3d0066)` },
]

export default function LivePreview() {
  const [playing, setPlaying] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const coupleDate = useRef(new Date(Date.now() - 1000 * 60 * 60 * 24 * 487))
  const elapsed = useLiveCounter(coupleDate.current)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 10% 80%, rgba(236,72,153,0.08) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: PINK }}>
            Preview ao vivo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Veja como vai ficar{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              a experiência
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Uma interface cinematográfica que impressiona na primeira tela — estilo Spotify Wrapped, mas feita pra quem você ama.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: product preview card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-96 flex-shrink-0"
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: `0 0 60px rgba(236,72,153,0.12), 0 0 120px rgba(168,85,247,0.08)`,
              }}
            >
              {/* Photo carousel */}
              <div className="relative h-56 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={photoIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: photos[photoIndex].gradient }}
                  >
                    <div className="text-center">
                      <Camera size={40} className="text-white/30 mx-auto mb-2" />
                      <p className="text-white/40 text-sm">{photos[photoIndex].label}</p>
                    </div>
                    {/* Overlay gradient */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to bottom, transparent 50%, #0d0d0d 100%)" }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Photo dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {photos.map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === photoIndex ? "16px" : "6px",
                        height: "6px",
                        background: i === photoIndex ? PINK : "rgba(255,255,255,0.3)",
                      }}
                    />
                  ))}
                </div>

                {/* Heart overlay */}
                <div className="absolute top-3 right-3 z-10">
                  <Heart size={20} style={{ color: PINK, fill: PINK }} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Names */}
                <div className="text-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="font-serif text-xl font-bold text-foreground"
                  >
                    Ana & Pedro
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-0.5">Juntos desde 14 de fevereiro de 2023</p>
                </div>

                {/* Live counter */}
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: `linear-gradient(135deg, rgba(236,72,153,0.08), rgba(168,85,247,0.08))`,
                    border: `1px solid rgba(236,72,153,0.2)`,
                  }}
                >
                  <p className="text-xs text-muted-foreground text-center mb-3 uppercase tracking-wider">Tempo juntos</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: elapsed.days, label: "dias" },
                      { value: elapsed.hours, label: "horas" },
                      { value: elapsed.minutes, label: "min" },
                      { value: elapsed.seconds, label: "seg" },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <motion.p
                          key={item.value}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="font-bold text-lg text-foreground leading-none"
                          style={{ color: PINK }}
                        >
                          {pad(item.value)}
                        </motion.p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Music player */}
                <MusicPlayer isPlaying={playing} onToggle={() => setPlaying((p) => !p)} />

                {/* Message preview */}
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-xs text-muted-foreground mb-2">Mensagem especial</p>
                  <p className="text-sm text-foreground leading-relaxed italic">
                    &ldquo;Cada dia ao seu lado é uma prova de que o amor existe de verdade...&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: feature list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 space-y-5"
          >
            {[
              {
                icon: "🎵",
                title: "Player estilo Spotify",
                desc: "Toque a música que marcou a história do casal diretamente na página, com visualização de equalizer animada.",
              },
              {
                icon: "⏱️",
                title: "Contador em tempo real",
                desc: "Dias, horas, minutos e segundos juntos. Atualiza ao vivo, criando uma experiência viva e emotiva.",
              },
              {
                icon: "📸",
                title: "Galeria cinematográfica",
                desc: "Fotos com transições suaves e efeitos de blur premium — como um mini-filme da história de vocês.",
              },
              {
                icon: "💌",
                title: "Carta de amor personalizada",
                desc: "Palavras que você nunca soube como dizer, apresentadas com tipografia elegante e efeito de digitação.",
              },
              {
                icon: "✨",
                title: "Efeitos e animações premium",
                desc: "Partículas, glows, transições — tudo criado para parecer um produto bilionário feito com amor.",
              },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-2xl flex-shrink-0">{feat.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{feat.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
