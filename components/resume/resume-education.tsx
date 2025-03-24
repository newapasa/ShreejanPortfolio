"use client";

import { formatDate } from "@/lib/date-utils";
import { motion } from "framer-motion";

interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  courses?: string[];
}

interface ResumeEducationProps {
  data: Education[];
}

export default function ResumeEducation({ data }: ResumeEducationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative mb-8"
    >
      <div className="relative z-10 p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Education</h3>

        <div className="space-y-6">
          {data.map((education, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-cyan-500 before:to-green-500"
            >
              <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 transform -translate-x-1/2"></div>

              <div className="mb-2">
                <h4 className="text-lg font-bold text-white">
                  {education.studyType} in {education.area}
                </h4>
                <div className="flex flex-wrap justify-between items-start">
                  <p className="text-white/80">{education.institution}</p>
                  <p className="text-white/60 text-sm">
                    {formatDate(education.startDate)} -{" "}
                    {formatDate(education.endDate)}
                  </p>
                </div>
                {education.gpa && (
                  <p className="text-white/70 text-sm">GPA: {education.gpa}</p>
                )}
              </div>

              {education.courses && (
                <div>
                  <p className="text-white/80 mb-1">Relevant Courses:</p>
                  <div className="flex flex-wrap gap-2">
                    {education.courses.map((course, cIndex) => (
                      <span
                        key={cIndex}
                        className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 -translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
    </motion.div>
  );
}
