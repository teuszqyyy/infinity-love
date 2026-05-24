"use client"

import { motion } from "framer-motion"
import { Heart, Music } from "./icons"

export default function PhoneMockup() {
  return (
    <div className="relative w-64">
      {/* Glow behind phone */}
      <div
        className="absolute inset-0 rounded-[3rem] blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #ff2d78 0%, #c0392b 60%, transparent 100%)" }}
      />

      {/* Phone frame */}
      <div
        className="relative rounded-[3rem] overflow-hidden w-64 h-[520px]"
        style={{
          background: "#0e0e0e",
          border: "2px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 0 1px rgba(255,45,120,0.2), 0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-b-2xl z-10" style={{ background: "#0e0e0e" }} />

        {/* Screen content */}
        <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: "linear-gradient(160deg, #1a0a12 0%, #0e0e0e 40%, #0a0614 100%)" }}>
          {/* Header */}
          <div className="px-5 pt-12 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,45,120,0.3)" }}>
                  <Heart size={14} className="text-[#ff2d78]" />
                </div>
                <span className="text-xs font-bold text-foreground">InfinityLove</span>
              </div>
              <span className="text-[10px] text-muted-foreground">● LIVE</span>
            </div>
          </div>

          {/* Photo area */}
          <div className="mx-4 rounded-2xl overflow-hidden flex-shrink-0" style={{ height: "160px", background: "linear-gradient(135deg, #2d0f1e 0%, #1a0a12 50%, #0f0820 100%)", border: "1px solid rgba(255,45,120,0.2)" }}>
            <div className="w-full h-full flex items-center justify-center relative">
              {/* Fake photo grid */}
              <div className="absolute inset-2 grid grid-cols-3 gap-1 opacity-40">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-lg" style={{ background: `rgba(255,45,120,${0.1 + i * 0.06})` }} />
                ))}
              </div>
              <div className="relative z-10 flex flex-col items-center gap-1">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-3xl"
                >
                  ♥
                </motion.div>
                <span className="text-[10px] text-[#ff2d78] font-semibold">Nossa História</span>
              </div>
            </div>
          </div>

          {/* Names */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-center text-xs font-bold text-foreground">Ana & Lucas</p>
            <p className="text-center text-[10px] text-muted-foreground">Juntos há 2 anos, 3 meses e 14 dias</p>
          </div>

          {/* Music Player */}
          <div className="mx-4 mt-2 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,45,120,0.2)" }}>
                <Music size={12} className="text-[#ff2d78]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-foreground truncate">Perfect — Ed Sheeran</p>
                <div className="mt-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #ff2d78, #c0392b)" }}
                    animate={{ width: ["30%", "65%", "30%"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
              </div>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,45,120,0.2)" }}>
                <span className="text-[8px] text-[#ff2d78]">▶</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mx-4 mt-3 rounded-xl p-3" style={{ background: "rgba(255,45,120,0.06)", border: "1px solid rgba(255,45,120,0.15)" }}>
            <p className="text-[9px] text-muted-foreground leading-relaxed italic">
              &ldquo;Você é a melhor coisa que já me aconteceu. Cada dia ao seu lado é um presente...&rdquo;
            </p>
          </div>

          {/* CTA */}
          <div className="px-4 mt-4">
            <motion.div
              className="w-full py-2.5 rounded-xl text-center text-[10px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #ff2d78, #c0392b)", boxShadow: "0 0 12px rgba(255,45,120,0.4)" }}
              animate={{ boxShadow: ["0 0 12px rgba(255,45,120,0.4)", "0 0 24px rgba(255,45,120,0.7)", "0 0 12px rgba(255,45,120,0.4)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ver Nossa Página ♥
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute -right-4 top-16 rounded-xl px-3 py-2 text-[10px] font-bold text-white"
        style={{
          background: "rgba(255,45,120,0.15)",
          border: "1px solid rgba(255,45,120,0.4)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 16px rgba(255,45,120,0.2)",
        }}
      >
        ♥ Link ativo!
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -left-8 bottom-24 rounded-xl px-3 py-2 text-[10px] font-bold text-white"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
        }}
      >
        🎵 Spotify integrado
      </motion.div>
    </div>
  )
}
