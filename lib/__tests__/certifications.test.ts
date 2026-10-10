import { describe, it, expect } from "vitest";
import {
  logoUrlFor,
  filterCertifications,
  formatIssueDate,
  type Certification,
} from "../certifications";

describe("logoUrlFor", () => {
  it("returns null when issuer is missing or empty", () => {
    expect(logoUrlFor(undefined)).toBeNull();
    expect(logoUrlFor(null)).toBeNull();
    expect(logoUrlFor("")).toBeNull();
    expect(logoUrlFor("   ")).toBeNull();
  });

  it("returns the local IMUN logo for IMUNA-related issuers", () => {
    expect(logoUrlFor("International Model United Nations Association (IMUNA)")).toBe(
      "/images/logos/imun.png"
    );
    expect(logoUrlFor("IMUN")).toBe("/images/logos/imun.png");
  });

  it("returns the local IMUN logo for NYLP (shared branding)", () => {
    expect(logoUrlFor("National Youth Leadership Programme (NYLP)")).toBe(
      "/images/logos/imun.png"
    );
    expect(logoUrlFor("NYLP")).toBe("/images/logos/imun.png");
  });

  it("returns the local SkillsBooster logo", () => {
    expect(logoUrlFor("SkillsBooster")).toBe("/images/logos/skillsbooster.png");
  });

  it("returns a favicon URL for known domains", () => {
    expect(logoUrlFor("Google")).toBe(
      "https://www.google.com/s2/favicons?domain=google.com&sz=64"
    );
    expect(logoUrlFor("Scrimba")).toBe(
      "https://www.google.com/s2/favicons?domain=scrimba.com&sz=64"
    );
  });

  it("is case-insensitive and matches substrings", () => {
    expect(logoUrlFor("google llc")).toBe(
      "https://www.google.com/s2/favicons?domain=google.com&sz=64"
    );
    expect(logoUrlFor("GOOGLE")).toBe(
      "https://www.google.com/s2/favicons?domain=google.com&sz=64"
    );
  });

  it("returns null for unknown issuers", () => {
    expect(logoUrlFor("ADBInstitute")).toBeNull();
    expect(logoUrlFor("Some Random Org")).toBeNull();
  });

  it("resolves AWS Training & Certification to the AWS favicon", () => {
    expect(logoUrlFor("AWS Training & Certification")).toBe(
      "https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=64"
    );
    expect(logoUrlFor("Amazon Web Services")).toBe(
      "https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=64"
    );
  });

  it("does not false-match unrelated names that merely contain 'aws'", () => {
    expect(logoUrlFor("Lawson Institute")).toBeNull();
  });

  it("resolves University of Michigan to the umich.edu favicon", () => {
    expect(logoUrlFor("University of Michigan")).toBe(
      "https://www.google.com/s2/favicons?domain=umich.edu&sz=64"
    );
  });

  it("does not match a rule inside a longer word (Foundation vs 'nda')", () => {
    expect(logoUrlFor("ULEFUSA UETians Lahore Endowment Foundation USA")).toBeNull();
  });

  it("still matches a rule at the edge of punctuation", () => {
    expect(logoUrlFor("DigiSkills.pk")).toBe(
      "https://www.google.com/s2/favicons?domain=digiskills.pk&sz=64"
    );
    expect(logoUrlFor("International Model United Nations Association (IMUNA)")).toBe(
      "/images/logos/imun.png"
    );
  });

  it("resolves Outskill to the outskill.com favicon", () => {
    expect(logoUrlFor("Outskill")).toBe(
      "https://www.google.com/s2/favicons?domain=outskill.com&sz=64"
    );
  });

  it("prefers the actual issuer over Coursera when both are named", () => {
    expect(
      logoUrlFor("Higher Education Commission, Pakistan (offered through Coursera)")
    ).toBe("https://www.google.com/s2/favicons?domain=hec.gov.pk&sz=64");
    expect(logoUrlFor("University of Michigan (offered through Coursera)")).toBe(
      "https://www.google.com/s2/favicons?domain=umich.edu&sz=64"
    );
  });

  it("still falls back to Coursera when Coursera is the issuer", () => {
    expect(logoUrlFor("Coursera")).toBe(
      "https://www.google.com/s2/favicons?domain=coursera.org&sz=64"
    );
  });
});

describe("formatIssueDate", () => {
  it("returns null for missing or invalid dates", () => {
    expect(formatIssueDate(undefined)).toBeNull();
    expect(formatIssueDate(null)).toBeNull();
    expect(formatIssueDate("not-a-date")).toBeNull();
  });

  it("formats a valid ISO date as 'Mon YYYY'", () => {
    expect(formatIssueDate("2026-09-01")).toBe("Sep 2026");
    expect(formatIssueDate("2026-02-01")).toBe("Feb 2026");
  });
});

describe("filterCertifications", () => {
  const certs: Certification[] = [
    { _id: "1", name: "Introduction to AI", issuer: "Google" },
    { _id: "2", name: "Vibe Coding with Claude Code", issuer: "Scrimba" },
    { _id: "3", name: "NYLP Ambassador Certificate", issuer: "National Youth Leadership Programme (NYLP)" },
  ];

  it("returns the full list when query is empty or whitespace", () => {
    expect(filterCertifications(certs, "")).toEqual(certs);
    expect(filterCertifications(certs, "   ")).toEqual(certs);
  });

  it("filters by certification name (case-insensitive)", () => {
    const result = filterCertifications(certs, "claude");
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("2");
  });

  it("filters by issuer (case-insensitive)", () => {
    const result = filterCertifications(certs, "GOOGLE");
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("1");
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterCertifications(certs, "nonexistent")).toEqual([]);
  });

  it("does not throw when a certification has no issuer", () => {
    const noIssuer: Certification[] = [{ _id: "4", name: "Mystery Cert" }];
    expect(() => filterCertifications(noIssuer, "mystery")).not.toThrow();
    expect(filterCertifications(noIssuer, "mystery")).toHaveLength(1);
  });
});
