"use client"

import Image from "next/image"
import { useState } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "sonner"

type Step1Props = {
  onNext: () => void
}

export default function Step1({ onNext }: Step1Props) {
  const [code, setCode] = useState("")

  const handleComplete = (val: string) => {
    if (val === "000000") {
      toast.success("Code validé ✅")
      onNext()
    } else {
      toast.error("Code incorrect ❌")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4e8e7] px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold mb-2">
          Entrez votre code de vérification
        </h2>
        <p className="text-gray-700 mb-6">
          Entrez le code à 6 chiffres reçu par téléphone.
        </p>

        <Image
          src="/images/step1.png"
          alt="Personnages OTP"
          width={280}
          height={220}
          className="mb-6 mx-auto"
        />

        <div className="flex justify-center mb-4">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            onComplete={handleComplete}
            className="w-full max-w-xs mx-auto"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button
          className="mt-4 underline text-sm font-semibold text-black hover:text-purple-600 transition"
          onClick={() => toast("Code renvoyé")}
        >
          Renvoyer le code
        </button>
      </div>
    </div>
  )
}
