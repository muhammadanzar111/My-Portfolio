"use client";

import { motion } from "framer-motion";

export function Hero({ headline, resumeUrl }: { headline?: string; resumeUrl?: string }) {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 relative">
      <motion.h1
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-5xl md:text-8xl tracking-tight leading-[0.95]"
      >
        Muhammad Anzar
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="text-muted text-lg md:text-2xl mt-6 max-w-xl"
      >
        {headline || "Data Science | AI Prompt Engineer | E-commerce Growth Strategist"}
      </motion.p>
      {resumeUrl && (
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-block w-fit glass-card rounded-full px-6 py-3 text-sm hover:bg-white/10 transition-colors"
        >
          Download Résumé
        </motion.a>
      )}
    </section>
  );
}
