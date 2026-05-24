"use client"

import { Heart } from "./icons"

export default function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #ff2d78, #c0392b)" }}
          >
            <Heart size={12} className="text-white" />
          </div>
          <span className="font-bold text-foreground text-sm">InfinityLove</span>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} InfinityLove. Todos os direitos reservados. Feito com ♥ para casais apaixonados.
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
          <a href="#" className="hover:text-foreground transition-colors">Termos</a>
          <a href="#" className="hover:text-foreground transition-colors">Contato</a>
        </div>
      </div>
    </footer>
  )
}
