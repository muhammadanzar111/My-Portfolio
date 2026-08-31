"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Experience = {
  _id: string;
  role?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  skills?: string[];
};

function formatDate(date?: string) {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export function ExperienceTimeline({
  experience,
}: {
  experience: Experience[];
}) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="px-6 md:px-16 py-24">
      <SectionLabel number="03" label="Experience" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-3xl md:text-5xl mb-14 tracking-tight"
      >
        Where I've worked.
      </motion.h2>

      {/* Timeline container */}
      <div className="relative max-w-3xl">
        {/* Vertical connector line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ originY: 0 }}
          className="timeline-connector hidden md:block"
        />

        <div className="space-y-6 md:pl-8">
          {experience.map((exp, i) => {
            const start = formatDate(exp.startDate);
            const isPresent = !exp.endDate;
            const end = isPresent ? "Present" : formatDate(exp.endDate);

            return (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(i * 0.1, 0.4),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[2.15rem] top-6 hidden md:block timeline-dot ${
                    isPresent ? "present" : ""
                  }`}
                />

                <div className="glass-card-flat rounded-2xl p-6 hover:border-indigo-500/20 transition-all">
                  {/* Date row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs text-muted">
                      {start}
                      {end ? ` — ` : ""}
                    </span>
                    {isPresent ? (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-400">
                        Present
                      </span>
                    ) : (
                      <span className="text-xs text-muted">{end}</span>
                    )}
                  </div>

                  {/* Role & company */}
                  <h3 className="text-lg font-medium">{exp.role}</h3>
                  {exp.company && (
                    <p className="text-sm text-indigo-400 mt-0.5">{exp.company}</p>
                  )}

                  {/* Summary */}
                  {exp.summary && (
                    <p className="text-sm text-muted mt-3 leading-relaxed">
                      {exp.summary}
                    </p>
                  )}

                  {/* Skills */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-3 py-1 rounded-full glass-card-indigo text-indigo-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
