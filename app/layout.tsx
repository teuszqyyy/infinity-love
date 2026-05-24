import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'InfinityLove — Crie uma memória impossível de esquecer',
  description:
    'Crie em minutos uma experiência romântica personalizada com fotos, música, mensagens e momentos especiais que emocionam de verdade.',
  keywords: ['presente romântico', 'página de casal', 'carta de amor', 'presente namorada', 'InfinityLove'],
  openGraph: {
    title: 'InfinityLove — Crie uma memória impossível de esquecer',
    description: 'Crie em minutos uma experiência romântica personalizada com fotos, música e mensagens especiais.',
    type: 'website',
  },
  themeColor: '#090909',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
