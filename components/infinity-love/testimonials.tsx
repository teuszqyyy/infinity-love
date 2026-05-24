"use client"

import { motion } from "framer-motion"

const testimonials = [
  { name: "Larissa M.", handle: "@larissa.marques", avatar: "L", color: "#EC4899",
    text: "Fiz para o meu namorado no aniversário de 1 ano. Ele CHOROU. Nunca vi ele assim. A página ficou incrível, parecia coisa de filme. Melhor R$19,90 que já gastei na minha vida! 😭♥", stars: 5, time: "há 2 dias" },
  { name: "Gabriel S.", handle: "@gabs_silva", avatar: "G", color: "#A855F7",
    text: "Comprei de madrugada e em 5 minutos já tava pronto. Minha esposa ficou sem palavras. Ela ainda hoje fica mostrando pra todo mundo. Compra logo sem medo! 🔥", stars: 5, time: "há 5 dias" },
  { name: "Camila T.", handle: "@camilatavares_", avatar: "C", color: "#EC4899",
    text: "Que coisa mais linda! Mandei o link pra ele e ele ficou olhando por horas. Colocamos nossa música, as fotos das viagens... ficou perfeito. Vale muito a pena! 💕", stars: 5, time: "há 1 semana" },
  { name: "Rafael O.", handle: "@rafa_oficial", avatar: "R", color: "#A855F7",
    text: "Nunca fui de presentes criativos mas isso mudou tudo. Minha namorada postou no Instagram stories e todo mundo ficou perguntando como eu fiz. Simples demais de criar.", stars: 5, time: "há 1 semana" },
  { name: "Beatriz F.", handle: "@bia.ferreira", avatar: "B", color: "#EC4899",
    text: "Presentei meu marido no dia dos pais com uma página falando sobre a nossa família. Ele mostrou pra família toda, foi lindo demais. Já indiquei pra todas as minhas amigas! 🥹", stars: 5, time: "há 2 semanas" },
  { name: "Thiago R.", handle: "@thiagoreiss", avatar: "T", color: "#A855F7",
    text: "Cara, que produto incrível. Parece aquele Spotify Wrapped mas de casal. Minha namorada amou demais. Já comprei pela segunda vez pro aniversário dela. Nota 1000! 🎵", stars: 5, time: "há 3 semanas" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Testimonials() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(255,45,120,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#EC4899" }}>
            Prova social
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Mais de{" "}
            <span style={{ background: "linear-gradient(90deg, #EC4899, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              50 mil casais
            </span>{" "}
            já criaram uma surpresa
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-8 mb-14"
        >
          {[
            { value: "127K+", label: "Páginas criadas" },
            { value: "4.9★", label: "Avaliação média" },
            { value: "98%", label: "Recomendam" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black text-foreground" style={{ background: "linear-gradient(90deg, #EC4899, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl p-5 flex flex-col gap-4"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, si) => (
                  <span key={si} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-foreground leading-relaxed flex-1">{t.text}</p>

              {/* Footer */}
              <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid var(--glass-border)" }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.handle} · {t.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
