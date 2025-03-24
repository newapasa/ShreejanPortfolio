"use client";

import { motion } from "framer-motion";

interface ResumeInterestsProps {
  data: string[];
}

export default function ResumeInterests({ data }: ResumeInterestsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative mb-8"
    >
      <div className="relative z-10 p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Interests</h3>

        <div className="flex flex-wrap gap-2">
          {data.map((interest, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-green-500/20 text-white/80 text-sm"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Glass decoration behind the card */}
      <div className="absolute inset-0 -translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
    </motion.div>
  );
}
