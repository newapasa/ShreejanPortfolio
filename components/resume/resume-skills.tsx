"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  items: Skill[];
}

interface ResumeSkillsProps {
  data: SkillCategory[];
}

export default function ResumeSkills({ data }: ResumeSkillsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative mb-8"
    >
      <div className="relative z-10 p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Skills</h3>

        <div className="space-y-6">
          {data.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h4 className="text-lg font-medium text-white/90 mb-3">
                {category.category}
              </h4>

              <div className="space-y-3">
                {category.items.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-white/60">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.2 + skillIndex * 0.1,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-green-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glass decoration behind the card */}
      <div className="absolute inset-0 -translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
    </motion.div>
  );
}
