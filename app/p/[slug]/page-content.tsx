"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import type { PageRow } from "@/lib/supabase/types"

const PINK = "#FF6B9D"
const PURPLE = "#C44FD8"
const ROSE = "#FF4F8B"

function useLiveCounter(dateStr: string | null) {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    if (!dateStr) return
    const start = new Date(dateStr).getTime()
    const calc = () => {
      const diff = Date.now() - start
      if (diff < 0) return
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

function FloatingHearts() {
  const hearts = Array.from({ length: 12 })
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + i * 8}%`,
            bottom: "-10%",
            fontSize: `${10 + (i % 4) * 6}px`,
            opacity: 0,
          }}
          animate={{
            y: [0, -(600 + Math.random() * 400)],
            x: [0, (Math.random() - 0.5) * 120],
            opacity: [0, 0.6, 0.4, 0],
            rotate: [0, (Math.random() - 0.5) * 60],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.1,
            ease: "easeOut",
          }}
        >
          {i % 3 === 0 ? "💕" : i % 3 === 1 ? "✨" : "🌸"}
        </motion.div>
      ))}
    </div>
  )
}

function IntroScreen({ name, onEnter }: { name: string; onEnter: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600)
    const t2 = setTimeout(() => setStep(2), 1600)
    const t3 = setTimeout(() => setStep(3), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at center, #1a0a1e 0%, #0a0a0f 60%, #000 100%)",
        zIndex: 100,
      }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <FloatingHearts />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: `radial-gradient(circle, rgba(255,107,157,0.15) 0%, transparent 70%)`, filter: "blur(40px)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: "72px", lineHeight: 1 }}
              >
                💌
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-white/50 text-sm tracking-widest uppercase">Uma surpresa especial para</p>
              <h1 className="font-serif text-5xl sm:text-6xl font-bold"
                style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {name}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              onClick={onEnter}
              whileHover={{ scale: 1.05, boxShadow: `0 0 60px rgba(255,107,157,0.6)` }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-5 rounded-full text-white font-bold text-lg cursor-pointer relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`, boxShadow: `0 0 40px rgba(255,107,157,0.4)` }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative z-10">Abrir presente 💝</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function MusicPlayer({ title, artist, coverUrl, previewUrl }: {
  title: string; artist: string; coverUrl?: string; previewUrl?: string
}) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(30)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!previewUrl) return
    const audio = new Audio(previewUrl)
    audio.loop = true
    audioRef.current = audio
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration))
    audio.addEventListener("timeupdate", () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
    })
    audio.play().then(() => setPlaying(true)).catch(() => {})
    document.addEventListener("click", () => { audio.play().then(() => setPlaying(true)).catch(() => {}) }, { once: true })
    return () => { audio.pause() }
  }, [previewUrl])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play(); setPlaying(true) }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = pct * audioRef.current.duration
  }

  const bars = Array.from({ length: 28 })

  return (
    <div className="relative rounded-3xl overflow-hidden" style={{
      background: "linear-gradient(145deg, rgba(255,107,157,0.08), rgba(196,79,216,0.08))",
      border: "1px solid rgba(255,107,157,0.2)",
      boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}>
      {/* Cover art */}
      <div className="relative h-56 overflow-hidden">
        {coverUrl ? (
          <>
            <div className="absolute inset-0" style={{ backgroundImage: `url(${coverUrl})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(20px) brightness(0.5)", transform: "scale(1.1)" }} />
            <img src={coverUrl} alt={title} className="relative z-10 w-32 h-32 rounded-2xl mx-auto mt-8 object-cover"
              style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }} />
          </>
        ) : (
          <div className="h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${PINK}33, ${PURPLE}33)` }}>
            <span style={{ fontSize: "64px" }}>🎵</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(to top, rgba(10,5,15,0.95), transparent)" }} />
      </div>

      {/* Info */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-white font-bold text-lg leading-tight">{title}</p>
            <p className="text-white/50 text-sm">{artist}</p>
          </div>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <span style={{ fontSize: "24px" }}>❤️</span>
          </motion.div>
        </div>

        {/* Waveform */}
        <div className="flex items-end gap-0.5 h-10 my-4 cursor-pointer" onClick={seek}>
          {bars.map((_, i) => {
            const baseH = [4, 8, 12, 6, 16, 10, 8, 14, 6, 10, 16, 8, 12, 6, 10, 14, 8, 6, 12, 16, 8, 10, 6, 14, 8, 12, 6, 10][i]
            const isPast = (i / bars.length) * 100 <= progress
            return (
              <motion.div
                key={i}
                className="flex-1 rounded-full"
                style={{ background: isPast ? `linear-gradient(to top, ${PINK}, ${PURPLE})` : "rgba(255,255,255,0.15)" }}
                animate={playing && isPast ? { height: [`${baseH}px`, `${baseH + 6}px`, `${baseH}px`] } : { height: `${baseH}px` }}
                transition={{ duration: 0.4 + i * 0.02, repeat: Infinity, delay: i * 0.03 }}
              />
            )
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 pb-4">
          <button onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0 }}
            className="text-white/40 hover:text-white/80 transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
          </button>

          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer relative"
            style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`, boxShadow: `0 0 30px rgba(255,107,157,0.5)` }}
          >
            <motion.div className="absolute inset-0 rounded-full"
              style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`, opacity: 0.4 }}
              animate={playing ? { scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] } : {}}
              transition={{ duration: 2, repeat: Infinity }} />
            {playing ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "3px" }}><path d="M8 5v14l11-7z" /></svg>
            )}
          </motion.button>

          <button className="text-white/40 hover:text-white/80 transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function PhotoCarousel({ photos }: { photos: string[] }) {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length)
  const next = () => setCurrent((c) => (c + 1) % photos.length)

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl" style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <img
              src={photos[current]}
              alt={`Momento ${current + 1}`}
              className="w-full object-cover"
              style={{ maxHeight: "420px", objectPosition: "center" }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)" }} />

        {/* Counter */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-bold"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>
          {current + 1} / {photos.length}
        </div>

        {/* Nav buttons */}
        {photos.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {photos.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {photos.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              animate={{ width: i === current ? "24px" : "8px", opacity: i === current ? 1 : 0.4 }}
              className="h-2 rounded-full cursor-pointer"
              style={{ background: i === current ? `linear-gradient(90deg, ${PINK}, ${PURPLE})` : "white" }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CounterCard({ value, label, delay }: { value: number; label: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const steps = 40
    const increment = value / steps
    let current = 0
    const interval = setInterval(() => {
      current = Math.min(current + increment, value)
      setDisplayed(Math.floor(current))
      if (current >= value) clearInterval(interval)
    }, duration / steps)
    return () => clearInterval(interval)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, type: "spring" }}
      className="relative rounded-2xl p-4 text-center overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,107,157,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
      }}
    >
      <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }} />
      <motion.p
        className="relative font-black text-3xl text-white mb-1"
        style={{ textShadow: `0 0 20px ${PINK}66` }}
      >
        {displayed.toLocaleString()}
      </motion.p>
      <p className="relative text-xs text-white/50 uppercase tracking-widest">{label}</p>
    </motion.div>
  )
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`py-10 px-5 max-w-md mx-auto ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default function PageContent({ data }: { data: PageRow }) {
  const [showIntro, setShowIntro] = useState(true)
  const elapsed = useLiveCounter(data.relationship_start)
  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="min-h-screen relative" style={{ background: "radial-gradient(ellipse at top, #120818 0%, #080810 50%, #000 100%)" }}>
      <AnimatePresence>
        {showIntro && <IntroScreen name={data.person_name} onEnter={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div className="absolute rounded-full"
          style={{ width: "500px", height: "500px", background: PINK, filter: "blur(140px)", opacity: 0.07, top: "-10%", left: "-15%" }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute rounded-full"
          style={{ width: "500px", height: "500px", background: PURPLE, filter: "blur(140px)", opacity: 0.07, bottom: "5%", right: "-15%" }}
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
      </div>

      <FloatingHearts />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Hero */}
        <section className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden pb-20">
          {data.cover_photo_url ? (
            <>
              <div className="absolute inset-0"
                style={{ backgroundImage: `url(${data.cover_photo_url})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(0px) brightness(0.4)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, #000 100%)" }} />
            </>
          ) : (
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(255,107,157,0.2), rgba(196,79,216,0.2))` }} />
          )}

          <div className="relative z-10 text-center px-6">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.2 }}>
              <p className="text-white/60 text-sm tracking-widest uppercase mb-3">Para você,</p>
              <h1 className="font-serif font-black text-white mb-4"
                style={{ fontSize: "clamp(3rem, 15vw, 5rem)", lineHeight: 1.1, textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}>
                {data.person_name}
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-white/30" />
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: "20px" }}>💖</motion.span>
                <div className="h-px w-12 bg-white/30" />
              </div>
            </motion.div>
          </div>

          <motion.div className="absolute bottom-8 z-10" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
          </motion.div>
        </section>

        {/* Timer */}
        {data.relationship_start && (
          <Section>
            <div className="text-center mb-8">
              <motion.p className="text-white/40 text-xs tracking-widest uppercase mb-2">Juntos há</motion.p>
              <h2 className="font-serif text-2xl font-bold text-white">Cada segundo conta</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <CounterCard value={elapsed.days} label="dias" delay={0} />
              <CounterCard value={elapsed.hours} label="horas" delay={0.1} />
              <CounterCard value={elapsed.minutes} label="min" delay={0.2} />
              <CounterCard value={elapsed.seconds} label="seg" delay={0.3} />
            </div>
          </Section>
        )}

        {/* Music Player */}
        {data.song_title && (
          <Section>
            <div className="text-center mb-6">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">A música de vocês</p>
              <h2 className="font-serif text-2xl font-bold text-white">Toca e lembra de tudo</h2>
            </div>
            <MusicPlayer
              title={data.song_title}
              artist={data.song_artist || ""}
              coverUrl={(data as any).song_cover_url}
              previewUrl={(data as any).song_preview_url}
            />
          </Section>
        )}

        {/* Message */}
        {data.message && (
          <Section>
            <div className="relative rounded-3xl p-8 overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(255,107,157,0.06), rgba(196,79,216,0.06))", border: "1px solid rgba(255,107,157,0.15)" }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${PINK}, ${PURPLE}, transparent)` }} />
              <p className="text-white/30 text-6xl font-serif leading-none mb-4">"</p>
              <p className="text-white/90 text-lg leading-relaxed font-serif italic text-center">{data.message}</p>
              <p className="text-white/30 text-6xl font-serif leading-none text-right mt-4">"</p>
            </div>
          </Section>
        )}

        {/* Gallery */}
        {data.gallery_photo_urls && data.gallery_photo_urls.length > 0 && (
          <Section>
            <div className="text-center mb-8">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Memórias</p>
              <h2 className="font-serif text-2xl font-bold text-white">Nossos momentos</h2>
            </div>
            <PhotoCarousel photos={data.gallery_photo_urls} />
          </Section>
        )}

        {/* Footer */}
        <footer className="py-20 text-center px-6">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
            <span style={{ fontSize: "48px" }}>💝</span>
          </motion.div>
          <p className="text-white/30 text-xs mt-4 mb-2">Feito com amor em</p>
          <Link href="/">
            <h3 className="font-serif text-2xl font-bold"
              style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              InfinityLove
            </h3>
          </Link>
          <div className="mt-6">
            <Link href="/create" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`, boxShadow: `0 0 30px rgba(255,107,157,0.3)` }}>
              Criar minha surpresa 💌
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
