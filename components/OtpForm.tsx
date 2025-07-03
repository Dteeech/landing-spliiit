"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function OtpForm() {
  const router = useRouter()

  const [countryCode, setCountryCode] = useState("+33")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSendCode = () => {
    const fullNumber = countryCode + phoneNumber.replace(/\s/g, "")

    if (fullNumber.length < 10) {
      alert("Numéro invalide")
      return
    }

    // 🔜 plus tard ici tu pourras appeler un endpoint pour envoyer un vrai code OTP

    // 🧭 Redirection vers la première étape de l'onboarding
    router.push("/onboarding")
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
            >
              <option value="+33">🇫🇷 +33</option>
              <option value="+32">🇧🇪 +32</option>
              <option value="+41">🇨🇭 +41</option>
            </select>
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 border border-gray-300 rounded-r-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-spliiit-brown transition-all"
            />
          </div>
          <button
            onClick={handleSendCode}
            className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Recevoir mon code
          </button>
        </div>
      </div>
    </section>
  )
}

export default OtpForm
