"use client";

import { motion } from "framer-motion";

type Certification = {
  _id: string;
  name: string;
  issuer?: string;
  issueDate?: string;
  credentialUrl?: string;
};

/**
 * Renders whatever certifications currently exist in Sanity.
 * New entries added in the Studio show up here automatically on next
 * ISR revalidation — no code change needed. This satisfies the
 * "zero manual coding" requirement from the brief, just sourced from
 * Sanity instead of a direct LinkedIn pull (see README).
 */
export function CertificationsVault({ certifications }: { certifications: Certification[] }) {
  return (
    <section id="certifications" className="px-6 md:px-16 py-32">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-3xl md:text-5xl mb-12 tracking-tight"
      >
        Certifications
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {certifications.map((cert, i) => (
          <motion.a
            key={cert._id}
            href={cert.credentialUrl || "#"}
            target={cert.credentialUrl ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: Math.min(i * 0.05, 0.6), ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card-flat rounded-2xl p-6 flex flex-col justify-between min-h-[160px]"
          >
            <div>
              <p className="text-sm text-muted mb-1">{cert.issuer}</p>
              <h3 className="text-lg font-medium leading-snug">{cert.name}</h3>
            </div>
            {cert.issueDate && (
              <p className="text-xs text-muted mt-4">
                {new Date(cert.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
              </p>
            )}
          </motion.a>
        ))}
        {certifications.length === 0 && (
          <p className="text-muted text-sm">No certifications yet — add one in Sanity Studio.</p>
        )}
      </div>
    </section>
  );
}
