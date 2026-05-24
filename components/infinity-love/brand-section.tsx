"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Heart } from "./icons"

export default function BrandSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,45,120,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo with glow effect */}
          <div className="relative mb-8">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 40px rgba(236,72,153,0.3)",
                  "0 0 80px rgba(168,85,247,0.4)",
                  "0 0 40px rgba(236,72,153,0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full overflow-hidden"
            >
              <Image
                src="/images/infinitylove-logo.png"
                alt="InfinityLove - Conectando Almas, Infinitas Possibilidades"
                width={280}
                height={280}
                className="rounded-full"
                priority
              />
            </motion.div>
            
            {/* Floating hearts around logo */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-[#ff2d78]"
                style={{
                  left: `${["-15%", "100%", "15%", "85%"][i]}`,
                  top: `${["20%", "30%", "80%", "75%"][i]}`,
                  color: i % 2 === 0 ? "#EC4899" : "#A855F7",
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
              >
                <Heart size={[16, 12, 14, 10][i]} />
              </motion.div>
            ))}
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            {[
              { number: "127.000+", label: "Casais Surpreendidos" },
              { number: "4.9", label: "Avaliação Média" },
              { number: "98%", label: "Recomendam" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="px-6 py-3 rounded-xl text-center"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <span className="block text-2xl font-bold" style={{ color: i % 2 === 0 ? "#EC4899" : "#A855F7" }}>{stat.number}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif text-xl sm:text-2xl text-foreground text-balance max-w-lg"
          >
            Conectando almas.{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #EC4899, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Infinitas possibilidades.
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-sm mt-4 max-w-md"
          >
            A plataforma número 1 do Brasil para criar presentes digitais românticos que emocionam de verdade.
          </motion.p>

          {/* Certifications/Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {[
              "100% Brasileira",
              "Pagamento Seguro",
              "Garantia 7 Dias",
              "Suporte 24h",
            ].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
