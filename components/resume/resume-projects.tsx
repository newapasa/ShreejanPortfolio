"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  url: string;
}

interface ResumeProjectsProps {
  data: Project[];
}

export default function ResumeProjects({ data }: ResumeProjectsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative mb-8"
    >
      <div className="relative z-10 p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-green-500 transition-all duration-300">
                  {project.name}
                </h4>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-white/70 text-sm mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glass decoration behind the card */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-green-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
    </motion.div>
  );
}
