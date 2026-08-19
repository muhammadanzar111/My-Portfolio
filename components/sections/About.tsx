"use client";

import { motion } from "framer-motion";

type Education = { school?: string; degree?: string; years?: string };

export function About({ bio, education }: { bio?: string; education?: Education[] }) {
  if (!bio && (!education || education.length === 0)) return null;

  return (
    <section id="about" className="px-6 md:px-16 py-32">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-3xl md:text-5xl mb-12 tracking-tight"
      >
        About
      </motion.h2>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-12">
        {bio && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl"
          >
            {bio}
          </motion.p>
        )}

        {education && education.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Education</p>
            {education.map((ed, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: i * 0.3 }}
                style={{ willChange: "transform", transform: "translateZ(0)" }}
                className="glass-card-flat rounded-2xl p-5 mb-3 flex items-center gap-4"
              >
                {ed.logoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ed.logoUrl} alt="" className="w-10 h-10 object-contain rounded-md bg-white/90 p-1 shrink-0" />
                )}
                <div>
                  <p className="font-medium">{ed.school}</p>
                  {ed.degree && <p className="text-sm text-muted mt-1">{ed.degree}</p>}
                  {ed.years && <p className="text-xs text-muted mt-1">{ed.years}</p>}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
