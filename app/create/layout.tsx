import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Criar Surpresa — InfinityLove",
  description: "Crie uma experiência romântica personalizada em minutos.",
}

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
