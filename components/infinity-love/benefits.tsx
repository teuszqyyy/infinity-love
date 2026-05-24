"use client"

import { motion } from "framer-motion"
import { Camera, Music, Heart, Clock, MessageHeart, QrCode, Zap, Check, Sparkles } from "./icons"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

const benefits = [
  { icon: Music, title: "Música personalizada", desc: "Integração com Spotify e YouTube para tocar a música do casal" },
  { icon: Camera, title: "Fotos ilimitadas", desc: "Galeria cinematográfica com transições e efeitos premium" },
  { icon: Sparkles, title: "Cartas com IA", desc: "Mensagens automáticas geradas com inteligência artificial" },
  { icon: Clock, title: "Contador premium", desc: "Dias, horas e segundos juntos atualizando em tempo real" },
  { icon: QrCode, title: "QR Code exclusivo", desc: "Imprima e cole em qualquer lugar para um presente físico especial" },
  { icon: Heart, title: "Link compartilhável", desc: "Um link único, vitalício e acessível de qualquer dispositivo" },
  { icon: Zap, title: "Efeitos cinematográficos", desc: "Partículas, glows e animações premium que impressionam" },
  { icon: Check, title: "Acesso vitalício", desc: "Sua página nunca expira e fica disponível para sempre" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Benefits() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(168,85,247,0.07) 0%, transparent 65%), radial-gradient(ellipse 50% 35% at 90% 10%, rgba(236,72,153,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: PINK }}>
            Recursos premium
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Tudo que você precisa para{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              emocionar de verdade
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Cada detalhe foi pensado para criar uma experiência que parece um produto milionário — mas custa menos do que um buquê.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{
                y: -4,
                borderColor: "rgba(236,72,153,0.35)",
                boxShadow: "0 0 20px rgba(236,72,153,0.08)",
                transition: { duration: 0.2 },
              }}
              className="rounded-2xl p-5 flex flex-col gap-3 cursor-default"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, rgba(236,72,153,0.12), rgba(168,85,247,0.08))`,
                  border: `1px solid rgba(236,72,153,0.2)`,
                }}
              >
                <b.icon size={18} style={{ color: i % 2 === 0 ? PINK : PURPLE }} />
              </div>
              <h3 className="text-sm font-bold text-foreground leading-snug">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
