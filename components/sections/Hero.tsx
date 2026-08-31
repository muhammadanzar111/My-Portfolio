"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ParticleField } from "@/components/canvas/ParticleField";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/muhammadanzar111",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/muhammadanzar111",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    href: "mailto:muhammadanzar111@gmail.com",
    label: "Email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export function Hero({
  headline,
  resumeUrl,
}: {
  headline?: string;
  resumeUrl?: string;
}) {
  const roles = (
    headline || "Data Scientist | AI Prompt Engineer | E-commerce Growth Strategist"
  )
    .split("|")
    .map((r) => r.trim());

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");

  // Typewriter state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll-spy for nav active state
  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(`#${id}`);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth typewriter loop
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 50);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 25);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex, roles]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <ParticleField />
      <div className="mesh-glow" />

      {/* ── Nav ────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 flex items-center justify-between px-6 md:px-16 py-7"
      >
        <a
          href="#top"
          className="font-display text-sm tracking-[0.2em] uppercase text-muted hover:text-white transition-colors"
        >
          M. Anzar
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-sm text-muted">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link ${activeSection === l.href ? "active" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 hover:bg-indigo-500/20 hover:text-white transition-all"
          >
            Résumé ↓
          </a>
        )}

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden relative z-20 w-11 h-11 flex flex-col items-center justify-center gap-1.5 glass-card-flat rounded-full"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            className="block w-4 h-[1.5px] bg-white"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-4 h-[1.5px] bg-white"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            className="block w-4 h-[1.5px] bg-white"
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden absolute top-[76px] left-6 right-6 z-20"
          >
            <div className="bg-[#111114] border border-white/10 rounded-2xl flex flex-col divide-y divide-white/10 shadow-2xl">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-5 py-4 text-sm text-muted hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero content ───────────────────────────────────────── */}
      <div className="relative z-10 flex-1 grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-12 items-center px-6 md:px-16 py-8 md:py-0">
        <div>
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[0.9]"
          >
            Muhammad
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-muted">
              Anzar
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex items-center h-8"
          >
            <span className="text-indigo-300/90 text-base md:text-xl font-body">
              {displayed}
            </span>
            <span className="cursor-blink" aria-hidden />
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mt-7"
          >
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="w-10 h-10 glass-card-flat rounded-full flex items-center justify-center text-muted hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3 mt-9"
          >
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm bg-white text-bg font-medium hover:bg-indigo-200 transition-colors shadow-lg shadow-white/5"
              >
                View Résumé <span aria-hidden>↓</span>
              </a>
            )}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm glass-card-flat hover:bg-indigo-500/10 hover:border-indigo-500/30 text-muted hover:text-white transition-all"
            >
              Let's Talk <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full flex justify-center md:block"
        >
          <div className="relative glass-card-flat rounded-3xl p-3 w-full max-w-[240px] md:max-w-sm md:ml-auto shadow-2xl">
            <Image
              src="/images/portrait.jpg"
              alt="Muhammad Anzar"
              width={731}
              height={1024}
              priority
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <a
          href="#about"
          aria-label="Scroll to About"
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5 hover:border-indigo-400/50 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-indigo-400"
          />
        </a>
      </motion.div>
    </section>
  );
}
