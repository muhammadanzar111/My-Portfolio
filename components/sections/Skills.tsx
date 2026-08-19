"use client";

import { motion } from "framer-motion";

type Skill = { _id: string; name: string; category?: string };

export function Skills({ skills }: { skills: Skill[] }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="px-6 md:px-16 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-3xl md:text-5xl mb-10 tracking-tight"
      >
        Skills
      </motion.h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <motion.span
            key={skill._id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.5), ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="glass-card-flat rounded-full px-5 py-2.5 text-sm md:text-base"
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
