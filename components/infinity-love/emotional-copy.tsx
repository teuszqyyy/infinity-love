"use client"

import { motion } from "framer-motion"
import { Shield } from "./icons"

export default function EmotionalCopy() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(192,57,43,0.1) 0%, transparent 70%)" }}
      />

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-10 sm:p-14"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid rgba(255,45,120,0.15)",
            backdropFilter: "blur(16px)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl mb-6"
          >
            ♥
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance mb-6 leading-tight">
            Você já parou pra pensar se a pessoa que você ama sabe o quanto ela é{" "}
            <span style={{ background: "linear-gradient(90deg, #ff2d78, #c0392b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              essencial pra você?
            </span>
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6 text-base sm:text-lg">
            A vida passa rápido. Os dias viram semanas, as semanas viram meses... e às vezes a gente esquece de
            mostrar o quanto ama. Um &ldquo;te amo&rdquo; no Whatsapp não basta. Ela merece{" "}
            <span className="text-foreground font-semibold">uma memória que vai durar para sempre.</span>
          </p>

          <p className="text-muted-foreground leading-relaxed mb-6 text-base sm:text-lg">
            Não espere uma data especial. Não espere ter &ldquo;tempo&rdquo;. O momento perfeito é{" "}
            <span className="text-[#ff2d78] font-semibold">agora</span> — e em 5 minutos você pode criar algo que
            ela vai guardar pra sempre no coração.
          </p>

          <p className="text-foreground font-semibold text-base sm:text-lg leading-relaxed">
            Uma surpresa é mais poderosa quando ninguém está esperando. 🥹
          </p>
        </motion.div>
      </div>
    </section>
  )
}
