"use client";

import type React from "react";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";
import emailjs from "emailjs-com";

interface ContactData {
  title: string;
  subtitle: string;
  email: string;
  socials: {
    name: string;
    url: string;
    icon: string;
  }[];
}

interface ContactProps {
  data: ContactData;
}

export default function Contact({ data }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send email using EmailJS
    emailjs
      .sendForm(
        "service_6fnv5c7", // Your EmailJS service ID
        "template_is2dukz", // Your EmailJS template ID
        e.target as HTMLFormElement,
        "FXUYqgNAXgXdhkEge"
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormState({ name: "", email: "", message: "" });

          // Reset success message after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        },
        (error) => {
          console.log(error.text);
          setIsSubmitting(false);
          setIsSubmitted(false);
        }
      );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-500">
            {data.title}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">{data.subtitle}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 p-6 md:p-8 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10 h-full">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Get in Touch
                </h3>

                <div className="mb-6">
                  <p className="text-white/70 mb-2">Email me at:</p>
                  <a
                    href={`mailto:${data.email}`}
                    className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500 hover:from-cyan-300 hover:to-green-400 transition-all"
                  >
                    {data.email}
                  </a>
                </div>

                <div>
                  <p className="text-white/70 mb-4">Connect with me:</p>
                  <div className="flex flex-wrap gap-3">
                    {data.socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors flex items-center gap-2"
                      >
                        <span>{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glass decoration */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-green-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="relative z-10 p-6 md:p-8 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10 h-full">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Send a Message
                </h3>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-white/70">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all rounded-lg group"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-500 via-green-500 to-blue-500 opacity-70 group-hover:opacity-80 transition-opacity duration-300 blur"></span>
                      <span className="relative inline-flex items-center justify-center w-full h-full px-6 py-3 transition-all duration-300 bg-black/30 backdrop-blur-sm rounded-lg group-hover:bg-black/40">
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="ml-2 w-4 h-4" />
                      </span>
                    </button>
                  </form>
                )}
              </div>

              {/* Glass decoration */}
              <div className="absolute inset-0 -translate-x-3 translate-y-3 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Glass decoration */}
      <div className="absolute top-1/3 -left-20 w-60 h-60 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full backdrop-blur-sm border border-white/10"></div>
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-green-500/10 rounded-full backdrop-blur-sm border border-white/10"></div>
    </section>
  );
}
