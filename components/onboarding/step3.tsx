"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "@react-hook/window-size"
import { useRouter } from "next/navigation"

type Step3Props = {
  onBack: () => void // On le garde dans les props si jamais tu veux l'utiliser ailleurs
}

export default function Step3({ onBack }: Step3Props) {
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [width, height] = useWindowSize()
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
      setShowConfetti(true)

      // ⏳ Après 5 secondes, rediriger vers l'app Spliiit
      setTimeout(() => {
        setShowConfetti(false)
        router.push("https://app.spliiit.com/marketplace")
      }, 5000)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#f4e8e7] relative">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin h-10 w-10 text-purple-600" />
          <p className="text-lg font-medium text-gray-800">Validation de votre inscription...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {showConfetti && <Confetti width={width} height={height} />}
          <h2 className="text-2xl font-bold text-purple-700 mb-4">🎉 Félicitations !</h2>
          <p className="text-gray-800 text-lg mb-6">
            Votre inscription a bien été validée. Bienvenue chez Spliit 💜
          </p>
          <p className="text-sm text-gray-600">Redirection en cours...</p>
        </motion.div>
      )}
    </div>
  )
}
