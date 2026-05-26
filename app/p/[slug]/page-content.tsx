"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import type { PageRow } from "@/lib/supabase/types"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

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

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`py-12 px-6 max-w-md mx-auto ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default function PageContent({ data }: { data: PageRow }) {
  const elapsed = useLiveCounter(data.relationship_start)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const pad = (n: number) => String(n).padStart(2, "0")

  useEffect(() => {
    const previewUrl = (data as any).song_preview_url
    if (!previewUrl) return
    const audio = new Audio(previewUrl)
    audio.loop = true
    audioRef.current = audio
    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
    tryPlay()
    document.addEventListener("click", tryPlay, { once: true })
    return () => {
      audio.pause()
      document.removeEventListener("click", tryPlay)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#070707" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div className="absolute w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full"
          style={{ background: PINK, filter: "blur(120px)", opacity: 0.08, top: "-10%", left: "-20%" }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full"
          style={{ background: PURPLE, filter: "blur(120px)", opacity: 0.08, bottom: "10%", right: "-20%" }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
      </div>

      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ left: `${[10,25,50,75,85,15,60,40][i]}%`, top: `${[20,60,10,80,30,70,50,15][i]}%`, width: `${3 + (i % 3)}px`, height: `${3 + (i % 3)}px`, background: i % 2 === 0 ? PINK : PURPLE, opacity: 0.4 }}
            animate={{ y: [0, -100, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.5 }} />
        ))}
      </div>

      <div className="relative" style={{ zIndex: 10 }}>
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
          {data.cover_photo_url ? (
            <>
              <div className="absolute inset-0 scale-110"
                style={{ backgroundImage: `url(${data.cover_photo_url})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(24px) brightness(0.3)" }} />
              <img src={data.cover_photo_url} alt="Foto de capa" className="relative z-10 w-full h-[60vh] object-contain" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, rgba(236,72,153,0.2), rgba(168,85,247,0.2))` }} />
          )}
          <div className="absolute inset-x-0 bottom-0 h-64 z-20" style={{ background: "linear-gradient(to top, #070707 20%, transparent)" }} />
          <div className="absolute bottom-16 left-0 right-0 z-30 px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-3" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.8)" }}>
                {data.person_name}
              </h1>
              <p className="text-sm text-white/80 tracking-wide font-light">Uma surpresa especial feita só para você</p>
            </motion.div>
          </div>
          <motion.div className="absolute bottom-6 z-30" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity={0.5}><polyline points="6 9 12 15 18 9" /></svg>
          </motion.div>
        </section>

        {data.relationship_start && (
          <Section>
            <div className="text-center mb-8">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill={PINK}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              </motion.div>
              <h2 className="font-serif text-2xl font-bold text-white">Tempo juntos</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[{ v: elapsed.days, l: "dias" }, { v: elapsed.hours, l: "horas" }, { v: elapsed.minutes, l: "min" }, { v: elapsed.seconds, l: "seg" }].map((item) => (
                <div key={item.l} className="relative rounded-2xl p-4 text-center overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }} />
                  <p className="relative font-bold text-2xl md:text-3xl text-white mb-1">{item.l === "dias" ? item.v : pad(item.v)}</p>
                  <p className="relative text-xs text-white/50 uppercase tracking-wider">{item.l}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.song_title && (
          <Section>
            <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: `0 20px 40px rgba(0,0,0,0.4)` }}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`, opacity: 0.5 }} />
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl flex-shrink-0 overflow-hidden" style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}>
                  {(data as any).song_cover_url ? (
                    <img src={(data as any).song_cover_url} alt="capa" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-lg font-bold truncate">{data.song_title}</p>
                  <p className="text-white/60 text-sm truncate">{data.song_artist}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <button onClick={togglePlay} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer" style={{ background: "white" }}>
                      {playing ? (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="#070707"><rect x="2" y="1" width="3" height="10" rx="1" /><rect x="7" y="1" width="3" height="10" rx="1" /></svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="#070707" style={{ marginLeft: "2px" }}><path d="M3 1.5L10.5 6 3 10.5V1.5z" /></svg>
                      )}
                    </button>
                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})` }}
                        animate={playing ? { width: ["10%", "100%"] } : { width: "10%" }}
                        transition={playing ? { duration: 30, ease: "linear", repeat: Infinity } : {}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        )}

        {data.message && (
          <Section>
            <div className="relative py-10 px-8 text-center">
              <svg className="absolute top-0 left-4 w-12 h-12 opacity-10" viewBox="0 0 24 24" fill="white"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <p className="relative z-10 text-xl md:text-2xl text-white/90 leading-relaxed font-serif italic text-balance">"{data.message}"</p>
              <svg className="absolute bottom-0 right-4 w-12 h-12 opacity-10 rotate-180" viewBox="0 0 24 24" fill="white"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            </div>
          </Section>
        )}

        {data.gallery_photo_urls && data.gallery_photo_urls.length > 0 && (
          <Section>
            <h2 className="font-serif text-3xl font-bold text-white text-center mb-8">Nossos momentos</h2>
            <div className="columns-2 gap-4 space-y-4">
              {data.gallery_photo_urls.map((url, i) => (
                <motion.div key={url} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} className="break-inside-avoid rounded-2xl overflow-hidden relative group">
                  <img src={url} alt={`Momento ${i + 1}`} className="w-full h-auto" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        <footer className="py-16 text-center">
          <p className="text-white/40 text-sm mb-4">Feito com ❤️ em</p>
          <Link href="/">
            <h3 className="font-serif text-2xl font-bold mb-6" style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>InfinityLove</h3>
          </Link>
          <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-transform hover:scale-105" style={{ background: "rgba(255,255,255,0.1)" }}>
            Criar minha surpresa
          </Link>
        </footer>
      </div>
    </div>
  )
}
