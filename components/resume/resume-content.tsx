"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Printer } from "lucide-react";
import ResumeCertifications from "./resume-certifications";
import ResumeHeader from "./resume-header";
import ResumeSkills from "./resume-skills";
import ResumeExperience from "./resume-experience";
import ResumeEducation from "./resume-education";
import ResumeProjects from "./resume-projects";
import ResumeLanguages from "./resume-languages";
import ResumeInterests from "./resume-interests";

interface ResumeContentProps {
  initialData?: any;
}

export default function ResumeContent({ initialData }: ResumeContentProps) {
  const [data, setData] = useState<any>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("all");
  useEffect(() => {
    if (initialData) return;

    const fetchResumeData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/resume");

        if (!response.ok) {
          throw new Error("Failed to fetch resume data");
        }

        const resumeData = await response.json();
        setData(resumeData);
        setError(null);
      } catch (err) {
        console.error("Error fetching resume data:", err);
        setError("Failed to load resume data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [initialData]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-16 h-16">
          <div className="w-full h-full rounded-full border-4 border-white/10 border-t-cyan-400 animate-spin"></div>
        </div>
      </div>
    );
  }


  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-white/70 mb-6">
            {error || "Unable to load resume data"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500/30 to-green-500/30 text-white hover:from-cyan-500/40 hover:to-green-500/40 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "all", label: "All" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Resume Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-500"
        >
          Resume
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-3 print:hidden"
        >
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/30 to-green-500/30 text-white hover:from-cyan-500/40 hover:to-green-500/40 transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
        </motion.div>
      </div>

      {/* Section Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex overflow-x-auto gap-2 mb-8 pb-2 print:hidden"
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
              activeSection === section.id
                ? "bg-gradient-to-r from-cyan-500/30 to-green-500/30 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            }`}
          >
            {section.label}
          </button>
        ))}
      </motion.div>

      {/* Resume Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1">
          <ResumeHeader data={data.basics} />

          {(activeSection === "all" || activeSection === "skills") && (
            <ResumeSkills data={data.skills} />
          )}

          {(activeSection === "all" || activeSection === "languages") && (
            <ResumeLanguages data={data.languages} />
          )}

          {(activeSection === "all" || activeSection === "interests") && (
            <ResumeInterests data={data.interests} />
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          {(activeSection === "all" || activeSection === "experience") && (
            <ResumeExperience data={data.experience} />
          )}

          {(activeSection === "all" || activeSection === "education") && (
            <ResumeEducation data={data.education} />
          )}

          {(activeSection === "all" || activeSection === "projects") && (
            <ResumeProjects data={data.projects} />
          )}

          {(activeSection === "all" || activeSection === "certifications") && (
            <ResumeCertifications data={data.certifications} />
          )}
        </div>
      </div>
    </div>
  );
}
