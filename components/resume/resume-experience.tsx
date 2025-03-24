"use client";

import { calculateDuration, formatDate } from "@/lib/date-utils";
import { motion } from "framer-motion";

interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

interface ResumeExperienceProps {
  data: Experience[];
}

export default function ResumeExperience({ data }: ResumeExperienceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mb-8"
    >
      <div className="relative z-10 p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Work Experience</h3>

        <div className="space-y-8">
          {data.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-cyan-500 before:to-green-500"
            >
              <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 transform -translate-x-1/2"></div>

              <div className="mb-2">
                <h4 className="text-lg font-bold text-white">
                  {experience.position}
                </h4>
                <div className="flex flex-wrap justify-between items-start">
                  <p className="text-white/80">
                    {experience.company} • {experience.location}
                  </p>
                  <div className="text-right">
                    <p className="text-white/60 text-sm">
                      {formatDate(experience.startDate)} -{" "}
                      {experience.endDate === "Present"
                        ? "Present"
                        : formatDate(experience.endDate)}
                    </p>
                    <p className="text-white/60 text-sm">
                      {calculateDuration(
                        experience.startDate,
                        experience.endDate
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <ul className="list-disc list-inside space-y-1 text-white/70">
                {experience.highlights.map((highlight, hIndex) => (
                  <li key={hIndex}>{highlight}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glass decoration behind the card */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-green-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
    </motion.div>
  );
}
