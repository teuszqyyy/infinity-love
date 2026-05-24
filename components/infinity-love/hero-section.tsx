"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Heart, Star } from "./icons"
import PhoneMockup from "./phone-mockup"
import Link from "next/link"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function CountdownTimer() {
  const [time, setTime] = useState({ h: 2, m: 47, s: 13 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) return { h: 2, m: 59, s: 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="flex items-center gap-2">
      {[{ label: "h", value: pad(time.h) }, { label: "m", value: pad(time.m) }, { label: "s", value: pad(time.s) }].map(
        (item, i) => (
          <span key={item.label} className="flex items-center gap-1">
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg font-bold text-lg text-white"
              style={{ background: "rgba(236,72,153,0.2)", border: "1px solid rgba(236,72,153,0.4)" }}
            >
              {item.value}
            </span>
            <span className="text-xs text-muted-foreground uppercase">{item.label}</span>
            {i < 2 && <span className="font-bold" style={{ color: PINK }}>:</span>}
          </span>
        )
      )}
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16">
      {/* Background radial glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(236,72,153,0.2) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 80%, rgba(168,85,247,0.15) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 15% 70%, rgba(236,72,153,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full select-none"
          style={{
            left: `${[8, 88, 20, 75, 50, 35, 62, 12][i]}%`,
            top: `${[15, 25, 70, 60, 10, 85, 45, 50][i]}%`,
            width: `${[4, 3, 5, 3, 4, 3, 5, 4][i]}px`,
            height: `${[4, 3, 5, 3, 4, 3, 5, 4][i]}px`,
            background: i % 2 === 0 ? PINK : PURPLE,
            opacity: 0.4,
          }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* Floating hearts */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`h${i}`}
          className="pointer-events-none absolute select-none"
          style={{
            left: `${[10, 85, 22, 78, 50][i]}%`,
            top: `${[18, 28, 72, 62, 12][i]}%`,
            fontSize: `${[20, 14, 28, 16, 12][i]}px`,
            color: i % 2 === 0 ? PINK : PURPLE,
            opacity: 0.15,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.6 }}
        >
          ♥
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{
                background: "linear-gradient(90deg, rgba(236,72,153,0.12), rgba(168,85,247,0.12))",
                border: "1px solid rgba(236,72,153,0.3)",
                color: PINK,
              }}
            >
              <Heart size={12} className="fill-current" /> Mais de 127.000 casais surpreendidos
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground mb-6"
          >
            Não entregue apenas{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              um presente.
            </span>{" "}
            Entregue uma memória impossível de esquecer.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mb-8"
          >
            Crie em minutos uma experiência romântica personalizada com fotos, música e mensagens que fazem qualquer pessoa se emocionar.
          </motion.p>

          {/* Stars */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-2 mb-6"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">4.9/5</span> — mais de 8.300 avaliações
            </span>
          </motion.div>

          {/* Price Box */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full max-w-sm mb-6 rounded-2xl p-5"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid rgba(236,72,153,0.2)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 30px rgba(236,72,153,0.07)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: "rgba(236,72,153,0.15)", color: PINK, border: "1px solid rgba(236,72,153,0.3)" }}
              >
                77% OFF hoje
              </span>
              <span className="text-sm text-muted-foreground line-through">De R$87,90</span>
            </div>
            <div className="flex items-end gap-3 mb-1">
              <span className="text-4xl font-bold text-foreground">R$19,90</span>
              <span className="text-muted-foreground text-sm mb-1">pagamento único</span>
            </div>
            <p className="text-xs text-muted-foreground">Acesso vitalício • Entrega em segundos</p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col items-center lg:items-start gap-2 mb-8"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Oferta por tempo limitado — termina em:</p>
            <CountdownTimer />
          </motion.div>

          {/* CTA */}
          <motion.div
            custom={6}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
          >
            <Link href="/create" className="flex-1">
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 40px rgba(236,72,153,0.6), 0 0 80px rgba(168,85,247,0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white uppercase tracking-wide text-center cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`,
                  boxShadow: "0 0 24px rgba(236,72,153,0.45)",
                }}
              >
                Criar Minha Surpresa ♥
              </motion.div>
            </Link>
          </motion.div>

          <motion.p
            custom={7}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-xs text-muted-foreground mt-4"
          >
            Garantia de 7 dias • Pagamento 100% seguro • Sem mensalidades
          </motion.p>
        </div>

        {/* Right — Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-shrink-0 hidden lg:flex"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  )
}
