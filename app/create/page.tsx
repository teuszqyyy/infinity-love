"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FormProvider } from "./form-context"
import ProgressBar from "./progress-bar"
import Step1Name from "./steps/step-1-name"
import Step2Cover from "./steps/step-2-cover"
import Step3Music from "./steps/step-3-music"
import Step4Timer from "./steps/step-4-timer"
import Step5Message from "./steps/step-5-message"
import Step6Gallery from "./steps/step-6-gallery"
import Step7Preview from "./steps/step-7-preview"

const TOTAL_STEPS = 7

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
  }),
}

function CreateFlow() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      setDirection(1)
      setStep((s) => s + 1)
    }
  }

  const goBack = () => {
    if (step > 1) {
      setDirection(-1)
      setStep((s) => s - 1)
    }
  }

  const stepProps = { onNext: goNext, onBack: goBack }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 50% -20%, rgba(236,72,153,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 90%, rgba(168,85,247,0.05) 0%, transparent 55%)",
        }}
      />

      <ProgressBar step={step} total={TOTAL_STEPS} />

      <div className="relative z-10 pt-28 pb-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {step === 1 && <Step1Name onNext={goNext} />}
            {step === 2 && <Step2Cover {...stepProps} />}
            {step === 3 && <Step3Music {...stepProps} />}
            {step === 4 && <Step4Timer {...stepProps} />}
            {step === 5 && <Step5Message {...stepProps} />}
            {step === 6 && <Step6Gallery {...stepProps} />}
            {step === 7 && <Step7Preview onBack={goBack} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function CreatePage() {
  return (
    <FormProvider>
      <CreateFlow />
    </FormProvider>
  )
}
