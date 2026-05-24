"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

const lines = [
  { text: "Algumas mensagens são lidas.", delay: 0 },
  { text: "Outras…", delay: 0.4, muted: true },
  { text: "são sentidas.", delay: 0.8, accent: true },
]

export default function CopyBlack() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Full cinematic dark background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(236,72,153,0.07) 0%, transparent 55%)",
        }}
      />

      {/* Subtle animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${[15, 75, 30, 85, 50, 10][i]}%`,
            top: `${[20, 40, 70, 15, 85, 55][i]}%`,
            width: "3px",
            height: "3px",
            background: i % 2 === 0 ? PINK : PURPLE,
            opacity: 0.3,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Cinematic quote block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex flex-col items-center gap-3 mb-10">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: line.delay }}
                className={`font-serif font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight ${line.muted ? "text-muted-foreground" : ""}`}
                style={
                  line.accent
                    ? {
                        background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : undefined
                }
              >
                {line.text}
              </motion.p>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="h-px w-24 mx-auto mb-10"
            style={{ background: `linear-gradient(90deg, transparent, ${PINK}, ${PURPLE}, transparent)` }}
          />
        </motion.div>

        {/* Emotional body copy */}
        <div className="space-y-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed"
          >
            A nostalgia é cruel. Ela te mostra, com detalhes perfeitos,{" "}
            <span className="text-foreground font-semibold">aquele momento que você não guardou direito.</span>{" "}
            Aquele dia que passou rápido demais. Aquela noite que você queria ter fotografado. Aquele sentimento que ficou
            preso na garganta e nunca virou palavras.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed"
          >
            Existe uma diferença brutal entre pessoas que{" "}
            <span className="text-foreground font-semibold">demonstram o que sentem</span> e as que guardam tudo dentro.
            As primeiras constroem histórias. As segundas... acumulam arrependimentos.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-foreground font-semibold text-lg sm:text-xl leading-relaxed"
          >
            Imagine ela abrindo uma página feita só pra ela — com as fotos dos momentos que mais importaram, a música que
            marcou o começo de tudo, e as palavras que você nunca soube como dizer. Ela vai chorar. E vai saber que é amada
            de verdade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="inline-block rounded-2xl px-8 py-6"
            style={{
              background: `linear-gradient(135deg, rgba(236,72,153,0.08), rgba(168,85,247,0.08))`,
              border: `1px solid rgba(236,72,153,0.2)`,
            }}
          >
            <p
              className="font-serif text-xl sm:text-2xl font-bold italic"
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              &ldquo;Talvez ela não esteja esperando um presente. Ela está esperando uma prova de que você se importa.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-14"
        >
          <Link href="https://pay.cakto.com.br/shr6o8n_899154">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 40px rgba(236,72,153,0.55), 0 0 80px rgba(168,85,247,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              className="py-4 px-10 rounded-2xl text-sm font-bold text-white uppercase tracking-wide cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`,
                boxShadow: "0 0 24px rgba(236,72,153,0.4)",
              }}
            >
              Criar Minha Surpresa ♥
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
