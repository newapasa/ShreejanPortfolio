"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

interface HeroData {
  title: string
  subtitle: string
  description: string
  ctaText: string
}

interface HeroProps {
  data: HeroData
}

export default function Hero({ data }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()

      const x = (clientX - left) / width
      const y = (clientY - top) / height

      heroRef.current.style.setProperty("--mouse-x", `${x}`)
      heroRef.current.style.setProperty("--mouse-y", `${y}`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      style={{
        backgroundImage:
          "radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(123, 31, 162, 0.15), transparent 25%)",
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500"
          >
            {data.title}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light mb-8 text-white/80"
          >
            {data.subtitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg mb-10 text-white/70 max-w-2xl mx-auto"
          >
            {data.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="#projects"
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition-all rounded-full group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-500 via-green-500 to-blue-500 opacity-70 group-hover:opacity-80 transition-opacity duration-300 blur"></span>
              <span className="relative inline-flex items-center justify-center w-full h-full px-8 py-4 transition-all duration-300 bg-black/30 backdrop-blur-sm rounded-full group-hover:bg-black/40">
                {data.ctaText}
                <ArrowDown className="ml-2 w-4 h-4 animate-bounce" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Glass panel decoration */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-green-500/10 rounded-3xl rotate-12 backdrop-blur-sm border border-white/10"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full backdrop-blur-sm border border-white/10"></div>
    </section>
  )
}

