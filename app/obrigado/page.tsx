"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { saveToken } from "@/lib/actions/tokens"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

function FloatingHeart({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, bottom: "-10%" }}
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        y: [0, -800],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.8],
        x: [0, Math.random() > 0.5 ? 30 : -30, Math.random() > 0.5 ? -20 : 20],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill={Math.random() > 0.5 ? PINK : PURPLE}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  )
}

function ConfettiPiece({ delay, x }: { delay: number; x: number }) {
  const colors = [PINK, PURPLE, "#F472B6", "#C084FC", "#FBBF24", "#34D399"]
  const color = colors[Math.floor(Math.random() * colors.length)]
  const rotation = Math.random() * 360

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: "-5%",
        width: `${6 + Math.random() * 6}px`,
        height: `${6 + Math.random() * 6}px`,
        background: color,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      }}
      initial={{ y: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: [0, 600 + Math.random() * 300],
        opacity: [0, 1, 1, 0],
        rotate: [0, rotation + 360],
        x: [0, (Math.random() - 0.5) * 100],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeIn",
      }}
    />
  )
}

function ObrigadoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"saving" | "success" | "error" | "no-token">("saving")
  const [countdown, setCountdown] = useState(3)

  const processToken = useCallback(async () => {
    if (!token) {
      setStatus("no-token")
      return
    }

    try {
      const saved = await saveToken(token)
      if (saved) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }, [token])

  useEffect(() => {
    processToken()
  }, [processToken])

  useEffect(() => {
    if (status !== "success") return

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          router.push(`/create?token=${token}`)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [status, token, router])

  if (status === "no-token") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#070707" }}>
        <div className="text-center px-6">
          <p className="text-xl font-bold text-white mb-2">Token não encontrado</p>
          <p className="text-sm text-white/50">Verifique se o link está correto.</p>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#070707" }}>
        <div className="text-center px-6">
          <p className="text-xl font-bold text-white mb-2">Algo deu errado</p>
          <p className="text-sm text-white/50 mb-4">Não conseguimos validar seu pagamento.</p>
          <button
            onClick={processToken}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${PINK}, ${PURPLE})` }}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#070707" }}>
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(236,72,153,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 30% 30%, rgba(168,85,247,0.1) 0%, transparent 55%)",
        }}
      />

      {/* Floating hearts */}
      {status === "success" && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <FloatingHeart
              key={`heart-${i}`}
              delay={i * 0.4}
              x={5 + (i * 8)}
              size={14 + Math.floor(Math.random() * 14)}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <ConfettiPiece
              key={`confetti-${i}`}
              delay={i * 0.15}
              x={Math.random() * 100}
            />
          ))}
        </>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-md w-full">
        {/* Success circle */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
            boxShadow: `0 0 80px rgba(236,72,153,0.5), 0 0 160px rgba(168,85,247,0.3)`,
          }}
        >
          <motion.svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Pagamento{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              confirmado!
            </span>
          </h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Tudo certo! Agora é só publicar sua surpresa e enviar para quem você ama. 💕
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full rounded-2xl p-5 text-center"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={PINK}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
            <p className="text-sm font-semibold text-white">Redirecionando em breve...</p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
              }}
              key={countdown}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {countdown}
            </motion.div>
            <p className="text-xs text-white/40">
              {countdown === 0 ? "Redirecionando..." : `segundo${countdown > 1 ? "s" : ""} para continuar`}
            </p>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/35"
        >
          <span>🔒 Pagamento seguro</span>
          <span>•</span>
          <span>✅ Link eterno</span>
          <span>•</span>
          <span>⚡ Liberado na hora</span>
        </motion.div>
      </div>
    </div>
  )
}

export default function ObrigadoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#070707" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full border-2 border-transparent"
            style={{ borderTopColor: PINK, borderRightColor: PURPLE }}
          />
        </div>
      }
    >
      <ObrigadoContent />
    </Suspense>
  )
}
