"use client";

import { formatDate } from "@/lib/date-utils";
import { motion } from "framer-motion";

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface ResumeCertificationsProps {
  data: Certification[];
}

export default function ResumeCertifications({
  data,
}: ResumeCertificationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative mb-8"
    >
      <div className="relative z-10 p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Certifications</h3>

        <div className="space-y-4">
          {data.map((certification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div>
                <h4 className="text-white font-medium">{certification.name}</h4>
                <p className="text-white/70 text-sm">{certification.issuer}</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-green-500/20 text-white/80 text-sm">
                {formatDate(certification.date)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glass decoration behind the card */}
      <div className="absolute inset-0 -translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
    </motion.div>
  );
}
