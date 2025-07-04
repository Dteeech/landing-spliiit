"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "@react-hook/window-size"
import { useRouter } from "next/navigation"

type Step3Props = {
  onBack: () => void
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

      setTimeout(() => {
        setShowConfetti(false)
        router.push("https://app.spliiit.com/marketplace")
      }, 5000)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 bg-[#f4e8e7] relative overflow-hidden">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin h-10 w-10 text-mauve" />
          <p className="text-lg font-medium text-gray-800">Validation de votre inscription...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {showConfetti && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <Confetti width={width} height={height} />
            </div>
          )}
         <h2 className="text-2xl font-bold text-mauve mb-4 z-20 relative">
  Félicitations{" "}
  <span className="text-black animate-fade-in-up">spliiiter42</span> !
</h2>
          <p className="text-gray-800 text-lg mb-6 z-20 relative">
            Votre inscription a bien été validée. Bienvenue chez Spliiit 💜
          </p>
          <p className="text-sm text-gray-700 z-20 relative">Redirection en cours...</p>
        </motion.div>
      )}
    </div>
  )
}
