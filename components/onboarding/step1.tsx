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
import clsx from "clsx"
import { Loader2 } from "lucide-react"
import persoOtp from "@/public/Images/step1.png"

type Step1Props = {
  onNext: () => void
}

export default function Step1({ onNext }: Step1Props) {
  const [code, setCode] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleComplete = (val: string) => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)

      if (val === "000000") {
        setIsVerifying(true)

        setTimeout(() => {
        toast.success("Code validé ✅") // ✅ déplacé ici
        setIsVerifying(false)
        onNext()
      }, 2000)
    }
 else {
        toast.error("Code incorrect ❌")
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 600)
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#f4e8e7] px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold mb-2">
          Entrez votre code de vérification
        </h2>
        <p className="text-gray-700 mb-6">
          Entrez le code à 6 chiffres reçu par téléphone.
        </p>

        <Image
          src={persoOtp}
          alt="Personnages OTP"
          width={280}
          height={220}
          className="mb-6 mx-auto"
        />

        {isVerifying ? (
          <div className="flex flex-col items-center gap-3 mb-4">
            <Loader2 className="animate-spin h-6 w-6 text-mauve" />
            <p className="text-sm text-gray-700">Vérification du code...</p>
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <div className={clsx("w-full max-w-xs", isShaking && "animate-shake")}>
              <InputOTP
                maxLength={6}
                value={code}
                onChange={setCode}
                onComplete={handleComplete}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        )}

        <button
          className="mt-4 underline text-sm font-semibold text-black hover:text-mauve transition"
          onClick={() => toast("Code renvoyé")}
          disabled={isLoading || isVerifying}
        >
          Renvoyer le code
        </button>
      </div>
    </div>
  )
}
