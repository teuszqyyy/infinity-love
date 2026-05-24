"use client"

import { motion } from "framer-motion"
import { Camera, Music, MessageHeart, Link as LinkIcon } from "./icons"
import NextLink from "next/link"

const PINK = "#EC4899"
const PURPLE = "#A855F7"

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Escolha fotos e música",
    description:
      "Selecione as fotos mais especiais do casal e adicione a música que marcou a história de vocês. Simples e rápido.",
  },
  {
    number: "02",
    icon: MessageHeart,
    title: "Escreva mensagens especiais",
    description:
      "Escreva uma carta de amor, adicione a data do primeiro encontro e conte os momentos que só vocês dois conhecem.",
  },
  {
    number: "03",
    icon: Music,
    title: "Personalize a experiência",
    description:
      "Escolha o tema visual, adicione efeitos cinematográficos e configure o contador de tempo juntos em tempo real.",
  },
  {
    number: "04",
    icon: LinkIcon,
    title: "Receba um link exclusivo instantaneamente",
    description:
      "Em segundos você recebe um link único pronto para compartilhar. Ele nunca expira e pode ser acessado a qualquer hora.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(236,72,153,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 20%, rgba(168,85,247,0.06) 0%, transparent 60%)",
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
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: PINK }}
          >
            Simples assim
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Crie em menos de{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              5 minutos
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative rounded-3xl p-7 flex flex-col"
              style={{
                background: "var(--glass-bg)",
                border: `1px solid rgba(255,255,255,0.08)`,
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Step number */}
              <span
                className="text-7xl font-black absolute -top-4 -left-2 leading-none select-none pointer-events-none"
                style={{ color: `rgba(236,72,153,0.1)` }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: `linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.1))`,
                  border: `1px solid rgba(236,72,153,0.25)`,
                }}
              >
                <step.icon size={22} style={{ color: PINK }} />
              </div>

              <h3 className="text-base font-bold text-foreground mb-3 leading-snug">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

              {/* Connector */}
              {i < 3 && (
                <div
                  className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-xl font-bold"
                  style={{ color: PURPLE, opacity: 0.5 }}
                >
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <NextLink href="https://pay.cakto.com.br/shr6o8n_899154">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 40px rgba(236,72,153,0.5), 0 0 80px rgba(168,85,247,0.25)",
              }}
              whileTap={{ scale: 0.97 }}
              className="py-4 px-10 rounded-2xl text-sm font-bold text-white uppercase tracking-wide cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`,
                boxShadow: "0 0 20px rgba(236,72,153,0.35)",
              }}
            >
              Criar Minha Surpresa ♥
            </motion.div>
          </NextLink>
        </motion.div>
      </div>
    </section>
  )
}
