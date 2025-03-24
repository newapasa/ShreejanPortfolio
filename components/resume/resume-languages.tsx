"use client";

import { motion } from "framer-motion";

interface Language {
  language: string;
  fluency: string;
}

interface ResumeLanguagesProps {
  data: Language[];
}

export default function ResumeLanguages({ data }: ResumeLanguagesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mb-8"
    >
      <div className="relative z-10 p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Languages</h3>

        <div className="space-y-3">
          {data.map((language, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-white/80">{language.language}</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
                {language.fluency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Glass decoration behind the card */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-green-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
    </motion.div>
  );
}
