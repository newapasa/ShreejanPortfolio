"use client";

import { motion } from "framer-motion";

interface FooterData {
  links: {
    name: string;
    href: string;
  }[];
}

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/60 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} Shreejan Prajapati All rights reserved.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-6"
          >
            {data.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Glass decoration */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </footer>
  );
}
