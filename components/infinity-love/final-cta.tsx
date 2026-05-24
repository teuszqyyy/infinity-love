"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

export default function FinalCTA() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(236,72,153,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(168,85,247,0.1) 0%, transparent 55%)",
        }}
      />

      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${[20, 80, 40, 70, 55, 15][i]}%`,
            top: `${[30, 20, 70, 60, 10, 50][i]}%`,
            width: "3px",
            height: "3px",
            background: i % 2 === 0 ? PINK : PURPLE,
            opacity: 0.3,
          }}
          animate={{ y: [0, -22, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-6xl mb-8 select-none"
        >
          ♥
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-6 leading-tight"
        >
          Talvez essa seja a lembrança mais especial que{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            alguém vai receber de você.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Mais de 50 mil pessoas já criaram uma surpresa. A pergunta não é se você vai criar — é{" "}
          <span className="text-foreground font-semibold">se você vai fazer isso hoje</span> ou deixar pra depois.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/create">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 50px rgba(236,72,153,0.65), 0 0 100px rgba(168,85,247,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              className="py-5 px-10 rounded-2xl text-base font-bold text-white uppercase tracking-wide cursor-pointer text-center"
              style={{
                background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`,
                boxShadow: "0 0 30px rgba(236,72,153,0.45)",
              }}
            >
              Criar Minha Página Agora ♥
            </motion.div>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-xs text-muted-foreground"
        >
          Por apenas R$19,90 • Acesso vitalício • Garantia de 7 dias
        </motion.p>
      </div>
    </section>
  )
}
