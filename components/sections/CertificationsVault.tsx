"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Certification = {
  _id: string;
  name: string;
  issuer?: string;
  issueDate?: string;
  credentialUrl?: string;
};

const ISSUER_DOMAINS: { match: string; domain: string }[] = [
  { match: "google", domain: "google.com" },
  { match: "coursera", domain: "coursera.org" },
  { match: "cisco", domain: "cisco.com" },
  { match: "university of leeds", domain: "leeds.ac.uk" },
  { match: "digiskills", domain: "digiskills.pk" },
  { match: "digi skills", domain: "digiskills.pk" },
  { match: "scrimba", domain: "scrimba.com" },
  { match: "higher education commission", domain: "hec.gov.pk" },
  { match: "nda", domain: "nda.com.pk" },
  { match: "ministry of it", domain: "digiskills.pk" },
];

const CUSTOM_LOGOS: { match: string; src: string }[] = [
  { match: "skillsbooster", src: "/images/logos/skillsbooster.png" },
  { match: "imuna", src: "/images/logos/imun.png" },
  { match: "imun", src: "/images/logos/imun.png" },
];

function logoUrlFor(issuer?: string): string | null {
  if (!issuer) return null;
  const key = issuer.trim().toLowerCase();
  const custom = CUSTOM_LOGOS.find((c) => key.includes(c.match));
  if (custom) return custom.src;
  const domainMatch = ISSUER_DOMAINS.find((d) => key.includes(d.match));
  if (!domainMatch) return null;
  return `https://www.google.com/s2/favicons?domain=${domainMatch.domain}&sz=64`;
}

function FlipCard({ cert, index }: { cert: Certification; index: number }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const logoSrc = logoUrlFor(cert.issuer);

  const formattedDate = cert.issueDate
    ? new Date(cert.issueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.03, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => setIsFlipped((v) => !v)}
      className="flip-card h-[175px] cursor-pointer focus-within:outline-none select-none"
      tabIndex={0}
      role="button"
      aria-label={`${cert.name} — ${cert.issuer} (Tap to flip)`}
    >
      <div
        className="flip-card-inner"
        style={{ transform: isFlipped ? "rotateY(180deg)" : undefined }}
      >
        {/* Front face */}
        <div className="flip-card-front">
          <div>
            {logoSrc && !logoFailed && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoSrc}
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => setLogoFailed(true)}
                className="w-7 h-7 rounded-md bg-white/90 object-contain p-1 mb-2.5"
              />
            )}
            <p className="text-xs text-muted mb-1 line-clamp-1">{cert.issuer}</p>
            <h3 className="text-sm font-medium leading-snug line-clamp-3 text-white">
              {cert.name}
            </h3>
          </div>
          <div className="flex items-center justify-between mt-2">
            {formattedDate && (
              <p className="text-xs text-muted">{formattedDate}</p>
            )}
            <span className="text-[10px] text-indigo-400/80 uppercase tracking-wider ml-auto">
              Tap / hover ↻
            </span>
          </div>
        </div>

        {/* Back face */}
        <div className="flip-card-back">
          <div>
            <p className="text-[11px] text-indigo-300 tracking-widest uppercase mb-1.5 font-medium">
              Credential Details
            </p>
            <h3 className="text-sm font-medium leading-snug text-white mb-1 line-clamp-2">
              {cert.name}
            </h3>
            <p className="text-xs text-muted line-clamp-1">{cert.issuer}</p>
          </div>
          {cert.credentialUrl ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white font-medium transition-colors mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              Verify credential ↗
            </a>
          ) : (
            <p className="text-xs text-muted mt-2">Completed</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function CertificationsVault({
  certifications,
}: {
  certifications: Certification[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return certifications;
    const q = query.toLowerCase();
    return certifications.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.issuer && c.issuer.toLowerCase().includes(q))
    );
  }, [certifications, query]);

  return (
    <section id="certifications" className="px-5 sm:px-8 md:px-16 py-20 md:py-28">
      <SectionLabel number="04" label="Certifications" />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl md:text-5xl tracking-tight"
        >
          Certifications Vault.
        </motion.h2>

        {/* Search filter */}
        {certifications.length > 3 && (
          <div className="relative w-full sm:w-64">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search certs or issuers…"
              aria-label="Search certifications"
              className="form-input w-full pr-9 text-sm"
            />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        )}
      </div>

      {/* Cert count summary */}
      <p className="text-xs text-muted mb-6">
        Showing {filtered.length} of {certifications.length} certifications
        {query ? ` matching "${query}"` : ""}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
        {filtered.map((cert, i) => (
          <FlipCard key={cert._id} cert={cert} index={i} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-muted text-sm py-8 text-center glass-card-flat rounded-2xl">
            No certifications match "{query}".
          </p>
        )}
      </div>
    </section>
  );
}
