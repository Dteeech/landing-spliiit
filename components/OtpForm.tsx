"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10)
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim()
}

function isValidFrenchMobile(number: string): boolean {
  const digits = number.replace(/\D/g, "")
  return /^0[67]\d{8}$/.test(digits)
}

function OtpForm() {
  const router = useRouter()

  const [countryCode, setCountryCode] = useState("+33")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSendCode = () => {
    const formatted = phoneNumber.replace(/\D/g, "")

    if (!isValidFrenchMobile(phoneNumber)) {
      toast.error("Numéro invalide. Veuillez entrer un numéro valide.")
      return
    }

    const fullNumber = countryCode + formatted

    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      toast.success(`Code envoyé à ${fullNumber}`)
      router.push("/onboarding")
    }, 1500)
  }

  return (
    <section id="otp-section" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-primary">
          Créez votre compte en 10 secondes
        </h2>
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto hover-lift">
          <div className="flex mb-4">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="bg-white border border-gray-300 rounded-l-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-spliiit-brown transition-all"
              disabled={isSending}
            >
              <option value="+33">🇫🇷 +33</option>
              <option value="+32">🇧🇪 +32</option>
              <option value="+41">🇨🇭 +41</option>
            </select>
            <input
              type="tel"
              placeholder="06 12 34 56 78"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              className="flex-1 border border-gray-300 rounded-r-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-spliiit-brown transition-all"
              disabled={isSending}
              inputMode="numeric"
            />
          </div>

          <button
            onClick={handleSendCode}
            className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Envoi du code...
              </>
            ) : (
              "Recevoir mon code"
            )}
          </button>
          <p className="mt-4 text-sm text-gray-500">
            <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="underline hover:text-spliiit-purple transition"
          >
    S'inscrire autrement
  </a>
</p>
        </div>
      </div>
    </section>
  )
}

export default OtpForm
