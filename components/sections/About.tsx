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
              <div key={i} className="glass-card-flat rounded-2xl p-5 mb-3">
                <p className="font-medium">{ed.school}</p>
                {ed.degree && <p className="text-sm text-muted mt-1">{ed.degree}</p>}
                {ed.years && <p className="text-xs text-muted mt-1">{ed.years}</p>}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
