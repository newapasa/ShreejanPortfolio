"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AboutData {
  title: string
  subtitle: string
  description: string[]
  skills: {
    category: string
    items: string[]
  }[]
}

interface AboutProps {
  data: AboutData
}

export default function About({ data }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-500">
            {data.title}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">{data.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 p-6 md:p-8 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10 h-full transform transition-transform hover:translate-y-[-5px] hover:translate-x-[-5px] duration-300">
              <h3 className="text-2xl font-bold mb-6 text-white">About Me</h3>
              <div className="space-y-4">
                {data.description.map((paragraph, index) => (
                  <p key={index} className="text-white/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Glass decoration behind the card */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 p-6 md:p-8 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10 h-full transform transition-transform hover:translate-y-[-5px] hover:translate-x-[5px] duration-300">
              <h3 className="text-2xl font-bold mb-6 text-white">Skills</h3>

              <div className="space-y-6">
                {data.skills.map((skillGroup, groupIndex) => (
                  <div key={groupIndex}>
                    <h4 className="text-lg font-medium mb-3 text-white/90">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm hover:bg-white/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glass decoration behind the card */}
            <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-green-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
          </motion.div>
        </div>
      </div>

      {/* Glass decoration */}
      <div className="absolute top-1/4 -right-20 w-60 h-60 bg-gradient-to-br from-cyan-500/10 to-green-500/10 rounded-full backdrop-blur-sm border border-white/10"></div>
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full backdrop-blur-sm border border-white/10"></div>
    </section>
  )
}

