
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pagamento Confirmado — InfinityLove",
  description: "Seu pagamento foi confirmado! Agora é só publicar sua surpresa.",
}

export default function ObrigadoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
