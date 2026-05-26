"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFormData } from "../form-context"
import { publishPage } from "@/lib/actions/publish"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

type PublishPhase = "idle" | "uploading" | "saving" | "generating" | "done" | "error"

interface StepProps {
  onBack: () => void
}

function useLiveCounter(dateStr: string) {
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

function PublishingOverlay({ phase }: { phase: PublishPhase }) {
  const phases = [
    { key: "uploading", icon: "📸", label: "Enviando suas fotos..." },
    { key: "saving", icon: "💕", label: "Criando sua página emocional..." },
    { key: "generating", icon: "✨", label: "Gerando link único..." },
  ]
  const currentIndex = phases.findIndex((p) => p.key === phase)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(236,72,153,0.15) 0%, transparent 70%)` }} />
      {[...Array(8)].map((_, i) => (
        <motion.div key={i} className="pointer-events-none absolute rounded-full"
          style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 25}%`, width: `${3 + (i % 3)}px`, height: `${3 + (i % 3)}px`, background: i % 2 === 0 ? PINK : PURPLE }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="relative">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(from 0deg, ${PINK}, ${PURPLE}, ${PINK})`, padding: "3px" }}>
            <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: "#0a0a0a" }}>
              <motion.svg width="28" height="28" viewBox="0 0 24 24" fill={PINK} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
            </div>
          </div>
        </motion.div>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          {phases.map((p, i) => {
            const isActive = p.key === phase
            const isDone = currentIndex > i
            return (
              <motion.div key={p.key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: isDone || isActive ? 1 : 0.3, x: 0 }} transition={{ delay: i * 0.2, duration: 0.4 }} className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <AnimatePresence mode="wait">
                    {isDone ? (
                      <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      </motion.div>
                    ) : isActive ? (
                      <motion.div key="active" animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-6 h-6 rounded-full border-2 border-transparent" style={{ borderTopColor: PINK, borderRightColor: PURPLE }} />
                    ) : (
                      <div key="pending" className="w-6 h-6 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-sm font-medium" style={{ color: isActive ? "#fff" : isDone ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)" }}>
                  {p.icon} {p.label}
                </span>
              </motion.div>
            )
          })}
        </div>
        <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-xs text-muted-foreground text-center">
          Isso pode levar alguns segundos...
        </motion.p>
      </div>
    </motion.div>
  )
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: "320px" }}>
      <div className="rounded-[3rem] overflow-hidden relative" style={{ background: "#0a0a0a", border: "2px solid rgba(255,255,255,0.12)", boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 60px rgba(236,72,153,0.15), 0 0 120px rgba(168,85,247,0.1), 0 40px 80px rgba(0,0,0,0.6)` }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-b-2xl z-50" style={{ background: "#0a0a0a" }}>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ background: "#1a1a1a" }} />
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: "620px", scrollbarWidth: "none" }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function PreviewContent() {
  const { data } = useFormData()
  const elapsed = useLiveCounter(data.relationshipStart)
  const [playing, setPlaying] = useState(true)
  const pad = (n: number) => String(n).padStart(2, "0")
  const allPhotos = data.galleryPhotoUrls.length > 0 ? data.galleryPhotoUrls : null
  const coverPhoto = data.coverPhotoUrl || null

  return (
    <div style={{ background: "#070707", minHeight: "620px" }}>
      <div className="relative h-72 overflow-hidden">
        {coverPhoto ? (
          <>
            <div className="absolute inset-0 scale-110" style={{ backgroundImage: `url(${coverPhoto})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(16px) brightness(0.4)" }} />
            <img src={coverPhoto} alt="Foto de capa" className="relative z-10 w-full h-full object-contain" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3))` }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill={PINK} opacity={0.5}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-28 z-20" style={{ background: "linear-gradient(to top, #070707, transparent)" }} />
        <div className="absolute bottom-4 left-4 z-30">
          <p className="font-serif text-2xl font-bold text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>{data.personName || "Sua pessoa"}</p>
          <p className="text-xs text-white/60 mt-0.5">Uma surpresa especial feita so para voce</p>
        </div>
        <div className="absolute top-10 right-4 z-30">
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={PINK}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </motion.div>
        </div>
      </div>
      <div className="px-4 pb-8 space-y-4">
        {data.relationshipStart && (
          <div className="rounded-2xl p-4" style={{ background: `linear-gradient(135deg, rgba(236,72,153,0.08), rgba(168,85,247,0.08))`, border: `1px solid rgba(236,72,153,0.2)` }}>
            <p className="text-xs text-muted-foreground text-center mb-3 uppercase tracking-wider">Tempo juntos</p>
            <div className="grid grid-cols-4 gap-2">
              {[{ v: elapsed.days, l: "dias" }, { v: elapsed.hours, l: "horas" }, { v: elapsed.minutes, l: "min" }, { v: elapsed.seconds, l: "seg" }].map((item) => (
                <div key={item.l} className="text-center">
                  <motion.p key={item.v} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="font-bold text-base" style={{ color: PINK }}>{item.l === "dias" ? item.v : pad(item.v)}</motion.p>
                  <p className="text-xs text-muted-foreground">{item.l}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.song && (
          <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden" style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}>
              {data.song.coverUrl ? (
                <img src={data.song.coverUrl} alt="capa" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-foreground text-xs font-semibold truncate">{data.song.title}</p>
              <p className="text-muted-foreground text-xs truncate">{data.song.artist}</p>
              <div className="mt-1.5 h-0.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})` }}
                  animate={playing ? { width: ["30%", "65%"] } : { width: "30%" }}
                  transition={playing ? { duration: 14, ease: "linear" } : {}}
                />
              </div>
            </div>
            <button onClick={() => setPlaying((p) => !p)} className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer" style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}>
              {playing ? (
                <svg width="8" height="8" viewBox="0 0 12 12" fill="white"><rect x="2" y="1" width="3" height="10" rx="1" /><rect x="7" y="1" width="3" height="10" rx="1" /></svg>
              ) : (
                <svg width="8" height="8" viewBox="0 0 12 12" fill="white"><path d="M3 1.5L10.5 6 3 10.5V1.5z" /></svg>
              )}
            </button>
          </div>
        )}
        {data.message && (
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs text-muted-foreground mb-2">Mensagem especial</p>
            <p className="text-sm text-foreground leading-relaxed italic font-serif">&ldquo;{data.message.slice(0, 140)}{data.message.length > 140 ? "..." : ""}&rdquo;</p>
          </div>
        )}
        {allPhotos && allPhotos.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Galeria de momentos</p>
            <div className="grid grid-cols-3 gap-1.5">
              {allPhotos.slice(0, 6).map((url, i) => (
                <div key={url} className="aspect-square rounded-xl overflow-hidden">
                  <img src={url} alt={`Momento ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">Feito com amor em</p>
          <p className="text-xs font-bold mt-0.5" style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>InfinityLove</p>
        </div>
      </div>
    </div>
  )
}

function SuccessState({ slug, personName }: { slug: string; personName: string }) {
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const pageUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/p/${slug}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`💕 ${personName}, fiz algo especial pra você!\n\nAbre esse link:\n${pageUrl}`)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const input = document.createElement("input")
      input.value = pageUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-5">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
        style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`, boxShadow: `0 0 60px rgba(236,72,153,0.5), 0 0 120px rgba(168,85,247,0.3)` }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl p-5 text-center"
        style={{ background: `linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1))`, border: `1px solid rgba(236,72,153,0.3)` }}>
        <p className="text-sm font-bold text-foreground mb-3">Link da sua página</p>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.06)" }}>
          <span className="text-xs text-muted-foreground flex-1 truncate text-left">{pageUrl}</span>
          <button onClick={handleCopy} className="text-xs font-semibold cursor-pointer flex-shrink-0 px-2 py-1 rounded-lg transition-colors"
            style={{ color: copied ? "#fff" : PINK, background: copied ? `linear-gradient(135deg, ${PINK}, ${PURPLE})` : "transparent" }}>
            {copied ? "✓ Copiado!" : "Copiar"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Envie esse link para {personName || "ela"} pelo WhatsApp, Instagram ou onde quiser.</p>
      </motion.div>
      <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className="w-full py-5 rounded-2xl text-base font-bold text-white text-center flex items-center justify-center gap-3"
        style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", boxShadow: "0 0 30px rgba(37,211,102,0.35)" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        Compartilhar via WhatsApp
      </motion.a>
      <motion.button onClick={() => router.push(`/p/${slug}`)}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className="w-full py-5 rounded-2xl text-base font-bold text-white cursor-pointer"
        style={{ background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`, boxShadow: `0 0 30px rgba(236,72,153,0.4)` }}>
        Ver minha página
      </motion.button>
      <motion.button onClick={handleCopy}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 rounded-2xl text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {copied ? "✓ Link copiado!" : "Copiar link"}
      </motion.button>
    </motion.div>
  )
}

export default function Step7Preview({ onBack }: StepProps) {
  const { data } = useFormData()
  const [phase, setPhase] = useState<PublishPhase>("idle")
  const [slug, setSlug] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handlePublish = async () => {
    setPhase("uploading")
    setErrorMsg("")

    try {
      const fd = new FormData()
      fd.append("personName", data.personName)

      if (data.song) {
        fd.append("songTitle", data.song.title)
        fd.append("songArtist", data.song.artist)
        if (data.song.previewUrl) fd.append("songPreviewUrl", data.song.previewUrl)
        if (data.song.coverUrl) fd.append("songCoverUrl", data.song.coverUrl)
      }
      if (data.relationshipStart) fd.append("relationshipStart", data.relationshipStart)
      if (data.message) fd.append("message", data.message)
      if (data.coverPhoto) fd.append("coverPhoto", data.coverPhoto)

      data.galleryPhotos.forEach((file, i) => {
        fd.append(`gallery-${i}`, file)
      })

      await new Promise((r) => setTimeout(r, 1200))
      setPhase("saving")
      await new Promise((r) => setTimeout(r, 800))
      setPhase("generating")

      const result = await publishPage(fd)

      if (!result.success || !result.slug) {
        setPhase("error")
        setErrorMsg(result.error || "Erro desconhecido.")
        return
      }

      await new Promise((r) => setTimeout(r, 600))
      setSlug(result.slug)
      setPhase("done")
    } catch (err) {
      console.error("Publish failed:", err)
      setPhase("error")
      setErrorMsg("Erro de conexão. Verifique sua internet e tente novamente.")
    }
  }

  const completeness = [data.personName, data.coverPhotoUrl, data.song, data.relationshipStart, data.message, data.galleryPhotoUrls.length > 0].filter(Boolean).length
  const pct = Math.round((completeness / 6) * 100)

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center min-h-[80vh] px-4 py-8">
      <AnimatePresence>
        {(phase === "uploading" || phase === "saving" || phase === "generating") && <PublishingOverlay phase={phase} />}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(236,72,153,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(168,85,247,0.1) 0%, transparent 55%)" }} />

      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="pointer-events-none absolute rounded-full"
          style={{ left: `${[10, 85, 25, 78, 50, 5][i]}%`, top: `${[20, 15, 75, 65, 8, 50][i]}%`, width: "3px", height: "3px", background: i % 2 === 0 ? PINK : PURPLE, opacity: 0.35 }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 3.5 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <div className="relative z-10 w-full max-w-md flex flex-col gap-8">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`, boxShadow: `0 0 40px rgba(236,72,153,0.4)` }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              {phase === "done" ? <polyline points="20 6 9 17 4 12" /> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
            </svg>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight mb-3">
            {phase === "done" ? <>Sua surpresa esta{" "}<span style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pronta!</span></> : <>Preview da{" "}<span style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>sua pagina</span></>}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-sm leading-relaxed">
            {phase === "done" ? `Em segundos ${data.personName || "ela"} vai receber isso e nunca mais vai esquecer.` : "Exatamente como vai aparecer quando voce compartilhar."}
          </motion.p>
        </div>

        {phase === "idle" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground">Completude da pagina</span>
              <span className="text-xs font-bold" style={{ color: pct >= 80 ? PINK : undefined }}>{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})` }} />
            </div>
          </motion.div>
        )}

        {phase !== "done" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <PhoneFrame><PreviewContent /></PhoneFrame>
          </motion.div>
        )}

        <AnimatePresence>
          {phase === "done" && slug && <SuccessState slug={slug} personName={data.personName} />}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "error" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="rounded-2xl p-5 text-center" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
              <p className="text-sm font-bold text-red-400 mb-2">Ops! Algo deu errado</p>
              <p className="text-xs text-muted-foreground mb-4">{errorMsg}</p>
              <motion.button onClick={handlePublish} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer text-white"
                style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}>
                Tentar novamente
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "idle" && (
          <div className="flex flex-col gap-3">
            <motion.button onClick={handlePublish} whileHover={{ scale: 1.03, boxShadow: `0 0 50px rgba(236,72,153,0.6)` }} whileTap={{ scale: 0.97 }}
              className="w-full py-5 rounded-2xl text-base font-bold text-white cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`, boxShadow: `0 0 30px rgba(236,72,153,0.45)` }}>
              Publicar e Compartilhar
            </motion.button>
            <motion.button onClick={onBack} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-2xl text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              Voltar e editar
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
