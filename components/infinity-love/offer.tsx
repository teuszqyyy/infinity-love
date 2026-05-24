"use client"

import { motion } from "framer-motion"
import { Shield } from "./icons"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

export default function Offer() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(236,72,153,0.09) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(168,85,247,0.07) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "#0d0d0d",
            border: `1px solid rgba(236,72,153,0.2)`,
            backdropFilter: "blur(16px)",
            boxShadow: `0 0 80px rgba(236,72,153,0.1), 0 0 140px rgba(168,85,247,0.07)`,
          }}
        >
          {/* Top banner */}
          <div
            className="text-center py-4 px-6 text-sm font-bold text-white uppercase tracking-widest"
            style={{ background: `linear-gradient(90deg, ${PINK}, ${PURPLE})` }}
          >
            Oferta por tempo limitado — 77% de desconto
          </div>

          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2 text-balance">
                Comece sua história agora
              </h2>
              <p className="text-muted-foreground">Acesse tudo de uma vez. Sem mensalidades. Para sempre.</p>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-muted-foreground line-through text-xl">De R$87,90</span>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: `rgba(236,72,153,0.15)`,
                    color: PINK,
                    border: `1px solid rgba(236,72,153,0.3)`,
                  }}
                >
                  77% OFF
                </span>
              </div>
              <div className="flex items-end justify-center gap-2">
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="text-6xl font-black text-foreground"
                >
                  R$19,90
                </motion.span>
              </div>
              <p className="text-muted-foreground text-sm mt-1">pagamento único • acesso vitalício</p>
            </div>

            {/* What's included */}
            <div className="space-y-3 mb-8">
              {[
                "Página romântica personalizada do casal",
                "Música favorita integrada (Spotify / YouTube)",
                "Galeria de fotos ilimitadas com efeitos premium",
                "Contador de tempo juntos em tempo real",
                "Carta de amor personalizada com IA",
                "Efeitos cinematográficos e animações premium",
                "QR Code imprimível exclusivo",
                "Link vitalício — nunca expira",
                "Suporte premium por WhatsApp",
              ].map((item, i) => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, rgba(236,72,153,0.2), rgba(168,85,247,0.15))` }}
                  >
                    <span className="text-xs font-bold" style={{ color: i % 2 === 0 ? PINK : PURPLE }}>
                      ✓
                    </span>
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 50px rgba(236,72,153,0.6), 0 0 100px rgba(168,85,247,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-5 rounded-2xl text-base font-bold text-white uppercase tracking-wide cursor-pointer mb-4"
              style={{
                background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`,
                boxShadow: "0 0 30px rgba(236,72,153,0.45)",
              }}
            >
              Quero Aproveitar por R$19,90 ♥
            </motion.button>

            <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Shield size={12} style={{ color: PINK }} />
              Garantia de 7 dias ou seu dinheiro de volta. Sem perguntas.
            </p>

            {/* Scarcity */}
            <div
              className="mt-6 text-center rounded-xl py-3 px-4 text-xs"
              style={{
                background: `rgba(236,72,153,0.06)`,
                border: `1px solid rgba(236,72,153,0.15)`,
                color: PINK,
              }}
            >
              Apenas <strong>43 vagas</strong> disponíveis neste preço. Renova amanhã às 00h.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
