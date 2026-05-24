"use client"

import { motion } from "framer-motion"
import { Shield } from "./icons"

export default function GuaranteeSection() {
  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{ background: "rgba(255,45,120,0.1)", border: "2px solid rgba(255,45,120,0.3)" }}
          >
            <Shield size={36} className="text-[#ff2d78]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">
            Garantia Incondicional de 7 Dias
          </h2>

          <p className="text-muted-foreground leading-relaxed max-w-lg text-base">
            Se por qualquer motivo você não ficar 100% satisfeito com a sua página nos primeiros{" "}
            <span className="text-foreground font-semibold">7 dias após a compra</span>, basta nos contatar e
            devolvemos <span className="text-[#ff2d78] font-semibold">todo o seu dinheiro</span> sem perguntas,
            sem burocracia, sem estresse. Simples assim.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <span>🔒</span>
            <span>Compra 100% segura · SSL · Dados protegidos</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
