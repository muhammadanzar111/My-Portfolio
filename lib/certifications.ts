export type Certification = {
  _id: string;
  name: string;
  issuer?: string;
  issueDate?: string;
  credentialUrl?: string;
};

type LogoRule = {
  match: string;
  // "local": src is a static path under /public
  // "favicon": src is a domain, resolved via Google's favicon service
  type: "local" | "favicon";
  src: string;
};

// Ordered by specificity — first match wins, so keep more specific
// strings (e.g. "digi skills") above shorter generic ones if needed.
export const LOGO_RULES: LogoRule[] = [
  { match: "skillsbooster", type: "local", src: "/images/logos/skillsbooster.png" },
  { match: "imuna", type: "local", src: "/images/logos/imun.png" },
  { match: "imun", type: "local", src: "/images/logos/imun.png" },
  { match: "national youth leadership programme", type: "local", src: "/images/logos/imun.png" },
  { match: "nylp", type: "local", src: "/images/logos/imun.png" },
  { match: "google", type: "favicon", src: "google.com" },
  { match: "cisco", type: "favicon", src: "cisco.com" },
  { match: "university of leeds", type: "favicon", src: "leeds.ac.uk" },
  { match: "digi skills", type: "favicon", src: "digiskills.pk" },
  { match: "digiskills", type: "favicon", src: "digiskills.pk" },
  { match: "scrimba", type: "favicon", src: "scrimba.com" },
  { match: "higher education commission", type: "favicon", src: "hec.gov.pk" },
  { match: "nda", type: "favicon", src: "nda.com.pk" },
  { match: "ministry of it", type: "favicon", src: "digiskills.pk" },
  // Specific, multi-word matches on purpose: a bare "aws" would also match
  // unrelated names like "Lawson".
  { match: "aws training", type: "favicon", src: "aws.amazon.com" },
  { match: "amazon web services", type: "favicon", src: "aws.amazon.com" },
  { match: "university of michigan", type: "favicon", src: "umich.edu" },
  { match: "outskill", type: "favicon", src: "outskill.com" },
  // Keep Coursera LAST: many certs are "offered through Coursera" by another
  // organization, and the first matching rule wins — the actual issuer
  // (HEC, Michigan, etc.) should take priority over the delivery platform.
  { match: "coursera", type: "favicon", src: "coursera.org" },
];

/**
 * Resolves a display-ready logo URL for a given issuer name, or null
 * if no rule matches (the UI should render without a logo in that case).
 */
export function logoUrlFor(issuer?: string | null): string | null {
  if (!issuer) return null;
  const key = issuer.trim().toLowerCase();
  if (!key) return null;

  const rule = LOGO_RULES.find((r) => key.includes(r.match));
  if (!rule) return null;

  return rule.type === "local"
    ? rule.src
    : `https://www.google.com/s2/favicons?domain=${rule.src}&sz=64`;
}

/**
 * Filters certifications by a free-text query against name and issuer.
 * Empty/whitespace-only query returns the full list unchanged.
 */
export function filterCertifications(
  certifications: Certification[],
  query: string
): Certification[] {
  const q = query.trim().toLowerCase();
  if (!q) return certifications;

  return certifications.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      Boolean(c.issuer && c.issuer.toLowerCase().includes(q))
  );
}

/**
 * Formats an ISO issue date as e.g. "Sep 2026". Returns null for
 * missing/invalid dates so the UI can omit the date row.
 */
export function formatIssueDate(issueDate?: string | null): string | null {
  if (!issueDate) return null;
  const d = new Date(issueDate);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}
