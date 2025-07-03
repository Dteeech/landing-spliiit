"use client"

import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

type Step2Props = {
  onNext: () => void
  onBack: () => void
}

export default function Step2({ onNext, onBack }: Step2Props) {
  const [acceptCGU, setAcceptCGU] = useState(false)
  const [newsletter, setNewsletter] = useState(false)

  const handleContinue = () => {
    if (acceptCGU) {
      onNext()
    } else {
      toast.error("Vous devez accepter les conditions générales d'utilisation pour continuer.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#f4e8e7] text-black">
      <div className="w-full max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">
          À un clic des économies !
        </h2>

        <div className="-mt-4 mb-4">
          <Image
            src="/images/step2.png"
            alt="Illustration fauteuils"
            width={280}
            height={280}
            className="mx-auto"
          />
        </div>

        <div className="flex flex-col gap-4 mb-6 text-left px-2">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
              className="mt-1 accent-purple-600"
            />
            <span>Je souhaite recevoir les newsletters et offres promotionnelles de Spliit</span>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={acceptCGU}
              onChange={() => setAcceptCGU(!acceptCGU)}
              className="mt-1 accent-purple-600"
            />
            <span>
              En vous inscrivant, vous reconnaissez avoir pris connaissance et acceptez nos{" "}
              <a href="#" className="underline font-semibold">
                Conditions Générales d’Utilisation
              </a>.
            </span>
          </label>
        </div>

        <div className="bg-[#e3dbff] text-sm text-gray-800 rounded-lg px-5 py-[18px] mb-6 text-left">
          Les données sont collectées par Spliit, responsable de traitement, et sont nécessaires
          à la création de votre compte et à la fourniture de nos services. Pour plus d’informations,
          consultez notre{" "}
          <a href="#" className="underline font-medium">
            Politique de confidentialité
          </a>.
        </div>

        <div className="flex items-center justify-between px-2">
          <button
            onClick={onBack}
            className="rounded-full w-10 h-10 bg-[#d1c4ff] flex items-center justify-center text-xl"
          >
            <Image
              src="/icons/arrow-back.svg"
              alt="Retour"
              width={15}
              height={15}
            />
          </button>

          <button
            onClick={handleContinue}
            className={`px-8 py-2 rounded-full font-semibold transition ${
              acceptCGU
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 text-black cursor-not-allowed"
            }`}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  )
}
