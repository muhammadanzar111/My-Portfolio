"use client";

import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 md:px-16 py-32 overflow-hidden">
      <div className="mesh-glow" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-6">
          Let's build something.
        </h2>
        <p className="text-muted max-w-lg mb-10">
          Open to internships, freelance work, and collaborations in data science, e-commerce, and AI.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:muhammadanzar111@gmail.com"
            className="rounded-full px-7 py-3.5 text-sm bg-white text-bg font-medium hover:bg-accent transition-colors"
          >
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/muhammadanzar111"
            target="_blank"
            rel="noreferrer"
            className="glass-card rounded-full px-7 py-3.5 text-sm hover:bg-white/10 transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </motion.div>
      <p className="relative z-10 text-xs text-muted mt-24">
        © {new Date().getFullYear()} Muhammad Anzar
      </p>
    </section>
  );
}
