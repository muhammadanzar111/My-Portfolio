"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Education = {
  school?: string;
  degree?: string;
  years?: string;
  logoUrl?: string;
};

export function About({
  bio,
  education,
}: {
  bio?: string;
  education?: Education[];
}) {
  if (!bio && (!education || education.length === 0)) return null;

  return (
    <section id="about" className="px-5 sm:px-8 md:px-16 py-20 md:py-28">
      <SectionLabel number="01" label="About" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-3xl md:text-5xl mb-12 tracking-tight text-white"
      >
        Who I am.
      </motion.h2>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-12 items-start">
        {bio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-muted leading-relaxed font-body"
          >
            <p className="glass-card-flat rounded-3xl p-6 md:p-8 border border-white/5 shadow-lg">
              {bio}
            </p>
          </motion.div>
        )}

        {education && education.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-medium mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Education
            </p>
            <div className="space-y-3">
              {education.map((ed, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                  style={{ willChange: "transform", transform: "translateZ(0)" }}
                  className="glass-card-flat rounded-2xl p-5 flex items-center gap-4 hover:border-indigo-500/30 transition-colors shadow-md"
                >
                  {ed.logoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ed.logoUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 object-contain rounded-md bg-white/90 p-1 shrink-0 shadow-sm"
                    />
                  )}
                  <div>
                    <p className="font-medium text-white">{ed.school}</p>
                    {ed.degree && (
                      <p className="text-sm text-muted mt-0.5">{ed.degree}</p>
                    )}
                    {ed.years && (
                      <p className="text-xs text-indigo-300 mt-1">{ed.years}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
