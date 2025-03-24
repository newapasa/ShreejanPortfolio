"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

interface ResumeHeaderProps {
  data: {
    name: string;
    title: string;
    summary: string;
    location: string;
    email: string;
    phone: string;
    profiles: {
      network: string;
      url: string;
    }[];
  };
}

export default function ResumeHeader({ data }: ResumeHeaderProps) {
  const getIconForNetwork = (network: string) => {
    switch (network.toLowerCase()) {
      case "github":
        return <Github className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-8"
    >
      <div className="relative z-10 p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 p-1 mb-4">
            <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {data.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">{data.name}</h2>
          <p className="text-lg text-white/80 mb-4">{data.title}</p>

          <p className="text-white/70 mb-6">{data.summary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <a
              href={`mailto:${data.email}`}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm truncate">{data.email}</span>
            </a>

            <a
              href={`tel:${data.phone}`}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{data.phone}</span>
            </a>

            <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white/80">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{data.location}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {data.profiles.map((profile, index) => (
            <a
              key={index}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label={profile.network}
            >
              {getIconForNetwork(profile.network)}
            </a>
          ))}
        </div>
      </div>

      {/* Glass decoration behind the card */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-green-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
    </motion.div>
  );
}
