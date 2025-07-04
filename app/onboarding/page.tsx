'use client'

import { useState } from 'react'
import ProgressBar from '@/components/onboarding/progressbar'
import Step1 from '@/components/onboarding/step1'
import Step2 from '@/components/onboarding/step2'
import Step3 from '@/components/onboarding/step3'
// import Step4 from '@/components/onboarding/step4'
// import Step5 from '@/components/onboarding/step5'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="h-screen flex flex-col bg-[#f4e8e7] overflow-hidden">
      <ProgressBar currentStep={step} totalSteps={3} />

      <div className="flex-grow px-4 py-6 overflow-y-auto">
        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <Step3 onBack={handleBack} />}
      </div>
    </div>
  )
}

