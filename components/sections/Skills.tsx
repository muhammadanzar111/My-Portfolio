"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Skill = {
  _id: string;
  name: string;
  category?: string;
};

export function Skills({ skills }: { skills: Skill[] }) {
  if (!skills || skills.length === 0) return null;

  // Group by category, putting uncategorized in "Core Focus"
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || "Core Focus";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categories = Object.entries(grouped);

  return (
    <section id="skills" className="px-6 md:px-16 py-24">
      <SectionLabel number="02" label="Skills" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-3xl md:text-5xl mb-12 tracking-tight"
      >
        What I work with.
      </motion.h2>

      <div className="space-y-10">
        {categories.map(([category, catSkills], catIdx) => (
          <div key={category} className="glass-card-flat rounded-3xl p-6 md:p-8">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: catIdx * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-medium mb-5 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {category}
            </motion.p>

            <div className="flex flex-wrap gap-2.5">
              {catSkills.map((skill, i) => (
                <motion.span
                  key={skill._id || `${category}-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(i * 0.02, 0.3),
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="glass-card rounded-xl px-4 py-2.5 text-sm md:text-[0.925rem] text-muted hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all cursor-default select-none inline-flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-indigo-400/60" />
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
