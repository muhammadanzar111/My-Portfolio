"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Certification = {
  _id: string;
  name: string;
  issuer?: string;
  issueDate?: string;
  credentialUrl?: string;
};

// Maps known issuer names to their company domain, so we can pull a real
// logo automatically via a public logo API — no manual upload needed,
// works for every current and future certification with a recognized issuer.
const ISSUER_DOMAINS: Record<string, string> = {
  "google": "google.com",
  "coursera": "coursera.org",
  "cisco networking academy": "cisco.com",
  "university of leeds": "leeds.ac.uk",
  "digiskills.pk": "digiskills.pk",
  "scrimba": "scrimba.com",
  "higher education commission, pakistan": "hec.gov.pk",
  "nda": "nda.com.pk",
  // These certs were issued via DigiSkills.pk under the Ministry of IT
  // umbrella, so we point them at DigiSkills' favicon rather than leaving
  // them blank.
  "ministry of it and telecommunication pakistan": "digiskills.pk",
};

// Direct logo files for issuers where a favicon lookup doesn't work well
// (e.g. no reliable public domain) — drop the file in public/images/logos
// and reference it here.
const CUSTOM_LOGOS: Record<string, string> = {
  "skillsbooster | digital marketing academy": "/images/logos/skillsbooster.png",
  "skillsbooster": "/images/logos/skillsbooster.png",
};

function logoUrlFor(issuer?: string): string | null {
  if (!issuer) return null;
  const key = issuer.trim().toLowerCase();
  if (CUSTOM_LOGOS[key]) return CUSTOM_LOGOS[key];
  const domain = ISSUER_DOMAINS[key];
  if (!domain) return null;
  // Google's favicon service — no API key required, stable, doesn't
  // get deprecated (unlike Clearbit's now-defunct free Logo API).
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

function IssuerLogo({ issuer }: { issuer?: string }) {
  const [failed, setFailed] = useState(false);
  const src = logoUrlFor(issuer);
  if (!src || failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className="w-7 h-7 rounded-md bg-white/90 object-contain p-1 mb-3"
    />
  );
}

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
            className="glass-card-flat content-lazy rounded-2xl p-6 flex flex-col justify-between min-h-[160px]"
          >
            <div>
              <IssuerLogo issuer={cert.issuer} />
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
