"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, Heart, Camera, Gift, CreditCard, Shield, Sparkles, Clock } from "./icons"

const categories = [
  { id: "sobre", label: "Sobre a InfinityLove", icon: Heart },
  { id: "criar", label: "Como Criar", icon: Sparkles },
  { id: "funcionalidades", label: "Funcionalidades", icon: Camera },
  { id: "ocasioes", label: "Ocasiões & Presentes", icon: Gift },
  { id: "pagamento", label: "Pagamento & Planos", icon: CreditCard },
  { id: "acesso", label: "Acesso & Entrega", icon: Clock },
  { id: "seguranca", label: "Segurança & Confiança", icon: Shield },
]

const faqsByCategory: Record<string, { q: string; a: string }[]> = {
  sobre: [
    {
      q: "O que exatamente é a InfinityLove?",
      a: "A InfinityLove é uma plataforma que permite criar páginas românticas personalizadas com fotos, músicas e mensagens especiais. É o presente digital perfeito para surpreender quem você ama com uma experiência única e emocionante.",
    },
    {
      q: "O que é um presente digital personalizado?",
      a: "É uma página web exclusiva criada especialmente para a pessoa amada, contendo fotos do casal, uma playlist personalizada, contador de tempo juntos, mensagens carinhosas e muito mais — tudo em um link único e memorável.",
    },
    {
      q: "A InfinityLove é uma empresa brasileira?",
      a: "Sim! Somos uma empresa 100% brasileira, com suporte em português e pagamento facilitado em real. Entendemos a cultura e o carinho dos casais brasileiros.",
    },
    {
      q: "O que torna a InfinityLove diferente de outros sites?",
      a: "Nossa plataforma combina design premium, animações cinematográficas, integração com Spotify, e uma experiência mobile-first pensada para emocionar. Além disso, oferecemos acesso vitalício e garantia incondicional de 7 dias.",
    },
  ],
  criar: [
    {
      q: "Preciso saber programar ou ter algum conhecimento técnico?",
      a: "Não! O processo é completamente intuitivo. Você preenche as informações, sobe as fotos, escolhe a música e pronto — a plataforma faz tudo automaticamente em segundos.",
    },
    {
      q: "Em quanto tempo a página fica pronta?",
      a: "Em menos de 5 minutos! Assim que você preencher as informações e confirmar o pagamento, seu link exclusivo é gerado instantaneamente.",
    },
    {
      q: "Posso editar a página depois de criada?",
      a: "Sim! Você pode editar fotos, mensagens e músicas sempre que quiser. Nada é definitivo — atualize quando quiser sem custo adicional.",
    },
    {
      q: "Quantas fotos posso adicionar?",
      a: "Você pode adicionar até 20 fotos na sua página romântica. Recomendamos escolher as mais significativas para criar uma narrativa emocional perfeita.",
    },
  ],
  funcionalidades: [
    {
      q: "Quais recursos estão inclusos na página?",
      a: "Sua página inclui: galeria de fotos com animações, player de música integrado (Spotify), contador de tempo juntos, mensagens personalizadas, linha do tempo de momentos especiais, e um design responsivo que funciona em qualquer dispositivo.",
    },
    {
      q: "Posso adicionar músicas do Spotify?",
      a: "Sim! Você pode vincular qualquer música do Spotify para tocar de fundo enquanto a pessoa especial navega pela página. A música toca automaticamente, criando uma atmosfera única.",
    },
    {
      q: "O contador de dias funciona automaticamente?",
      a: "Sim! Basta informar a data que vocês começaram a namorar ou uma data especial, e o contador atualiza em tempo real mostrando dias, horas, minutos e segundos juntos.",
    },
  ],
  ocasioes: [
    {
      q: "Para quais ocasiões posso usar a InfinityLove?",
      a: "A InfinityLove é perfeita para: aniversários de namoro, Dia dos Namorados, pedidos de namoro, pedidos de casamento, datas especiais, ou simplesmente para demonstrar amor sem motivo específico.",
    },
    {
      q: "Posso usar para outros tipos de relacionamento?",
      a: "Claro! Embora seja focada em casais, você pode criar páginas para homenagear pais, filhos, amigos especiais ou qualquer pessoa que você queira surpreender com carinho.",
    },
    {
      q: "É um bom presente de última hora?",
      a: "Perfeito para última hora! Como a página é gerada instantaneamente após o pagamento, você pode criar e enviar o link em minutos, mesmo na véspera de uma data especial.",
    },
  ],
  pagamento: [
    {
      q: "Qual é o valor do investimento?",
      a: "O valor promocional atual é de apenas R$19,90 (77% OFF do preço original de R$87,90). É um pagamento único que garante acesso vitalício à plataforma.",
    },
    {
      q: "Quais formas de pagamento são aceitas?",
      a: "Aceitamos cartão de crédito (todas as bandeiras), PIX (aprovação instantânea) e boleto bancário. O pagamento é processado de forma 100% segura.",
    },
    {
      q: "Existe alguma mensalidade ou taxa adicional?",
      a: "Não! O pagamento é único. Você paga uma vez e tem acesso vitalício à sua página, sem cobranças recorrentes ou taxas escondidas.",
    },
    {
      q: "Como funciona a garantia de 7 dias?",
      a: "Se por qualquer motivo você não ficar satisfeito nos primeiros 7 dias após a compra, basta entrar em contato com nosso suporte e devolvemos 100% do seu dinheiro. Sem burocracia.",
    },
  ],
  acesso: [
    {
      q: "A página tem validade? Ela some depois de um tempo?",
      a: "Não. Sua página tem acesso vitalício. Após a criação, o link fica ativo para sempre e pode ser acessado a qualquer momento, em qualquer dispositivo.",
    },
    {
      q: "Como recebo o link da página?",
      a: "Imediatamente após a confirmação do pagamento, você recebe o link exclusivo por e-mail e também pode acessar diretamente pelo painel de controle da plataforma.",
    },
    {
      q: "Posso usar no celular para criar e compartilhar?",
      a: "Sim, totalmente. A plataforma é 100% otimizada para mobile — você cria, edita e compartilha direto do seu smartphone.",
    },
    {
      q: "A pessoa precisa fazer login para ver a página?",
      a: "Não! A página é pública através do link exclusivo. A pessoa amada só precisa clicar no link para visualizar toda a surpresa — sem cadastro ou login.",
    },
  ],
  seguranca: [
    {
      q: "O pagamento é seguro?",
      a: "Completamente. Utilizamos criptografia SSL e processadores de pagamento certificados. Seus dados financeiros nunca ficam armazenados em nossos servidores.",
    },
    {
      q: "Minhas fotos e mensagens ficam privadas?",
      a: "Sim! Suas fotos e mensagens são protegidas e só podem ser acessadas através do link exclusivo que você compartilha. Não indexamos conteúdo em buscadores.",
    },
    {
      q: "Posso excluir minha página se quiser?",
      a: "Sim, você tem controle total. A qualquer momento pode excluir permanentemente sua página e todos os dados associados através do painel de controle.",
    },
  ],
}

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05, duration: 0.4 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${open ? "rgba(255,45,120,0.3)" : "var(--glass-border)"}`, transition: "border-color 0.2s" }}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
        style={{ background: open ? "rgba(255,45,120,0.05)" : "var(--glass-bg)", backdropFilter: "blur(10px)" }}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-sm text-foreground pr-4">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-[#ff2d78]"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ overflow: "hidden" }}
      >
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed" style={{ background: "rgba(255,45,120,0.03)" }}>
          {a}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("sobre")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = searchQuery
    ? Object.values(faqsByCategory)
        .flat()
        .filter(
          (faq) =>
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : faqsByCategory[activeCategory]

  return (
    <section className="relative py-24 px-4 overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#ff2d78] mb-4"
            style={{ background: "rgba(255,45,120,0.1)", border: "1px solid rgba(255,45,120,0.2)" }}
          >
            Central de Ajuda
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance mb-3">
            Perguntas{" "}
            <span style={{ background: "linear-gradient(90deg, #ff2d78, #c0392b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Frequentes
            </span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Separamos as dúvidas mais comuns para te ajudar a criar a surpresa perfeita.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-md mx-auto"
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por dúvidas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </motion.div>

        {/* Category tabs */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? "linear-gradient(135deg, #ff2d78, #c0392b)" : "var(--glass-bg)",
                    color: isActive ? "#fff" : "var(--muted-foreground)",
                    border: isActive ? "none" : "1px solid var(--glass-border)",
                    boxShadow: isActive ? "0 4px 16px rgba(255,45,120,0.3)" : "none",
                  }}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
                </button>
              )
            })}
          </motion.div>
        )}

        {/* FAQs */}
        <div className="flex flex-col gap-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} i={i} />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhuma pergunta encontrada para &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
