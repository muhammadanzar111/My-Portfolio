"use client";

interface SectionLabelProps {
  number: string;   // e.g. "01"
  label: string;    // e.g. "About"
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <p className="section-label">
      {number} / {label}
    </p>
  );
}
