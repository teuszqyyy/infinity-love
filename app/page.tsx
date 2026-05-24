import Navbar from "@/components/infinity-love/navbar"
import HeroSection from "@/components/infinity-love/hero-section"
import BrandSection from "@/components/infinity-love/brand-section"
import HowItWorks from "@/components/infinity-love/how-it-works"
import LivePreview from "@/components/infinity-love/live-preview"
import CopyBlack from "@/components/infinity-love/copy-black"
import Benefits from "@/components/infinity-love/benefits"
import Testimonials from "@/components/infinity-love/testimonials"
import Offer from "@/components/infinity-love/offer"
import GuaranteeSection from "@/components/infinity-love/guarantee"
import FAQ from "@/components/infinity-love/faq"
import FinalCTA from "@/components/infinity-love/final-cta"
import Footer from "@/components/infinity-love/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <BrandSection />
      <HowItWorks />
      <LivePreview />
      <CopyBlack />
      <Benefits />
      <Testimonials />
      <Offer />
      <GuaranteeSection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
