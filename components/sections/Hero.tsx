"use client";

import { motion } from "framer-motion";

export function Hero({ headline, resumeUrl }: { headline?: string; resumeUrl?: string }) {
  const roles = (headline || "Data Science | AI Prompt Engineer | E-commerce Growth Strategist")
    .split("|")
    .map((r) => r.trim());

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="mesh-glow" />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-16 py-8"
      >
        <span className="font-display text-sm tracking-[0.2em] uppercase text-muted">M. Anzar</span>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </motion.nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 mb-8 w-fit glass-card rounded-full pl-2 pr-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-xs text-muted tracking-wide">Open to internships & freelance</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl md:text-[9rem] tracking-tight leading-[0.9]"
        >
          Muhammad
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-muted">
            Anzar
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-3 mt-8 max-w-2xl"
        >
          {roles.map((role, i) => (
            <span
              key={i}
              className="glass-card rounded-full px-4 py-2 text-sm md:text-base text-muted"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {resumeUrl && (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 w-fit rounded-full px-7 py-3.5 text-sm bg-white text-bg font-medium hover:bg-accent transition-colors"
          >
            Download Résumé
            <span aria-hidden>↓</span>
          </motion.a>
        )}
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 flex justify-center pb-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
