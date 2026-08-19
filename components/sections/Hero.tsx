"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CanvasErrorBoundary } from "@/components/canvas/CanvasErrorBoundary";

const ParticleField = dynamic(
  () => import("@/components/canvas/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

export function Hero({ headline, resumeUrl }: { headline?: string; resumeUrl?: string }) {
  const roles = (headline || "Data Science | Artificial Intelligence | E-commerce Growth Strategist")
    .split("|")
    .map((r) => r.trim());

  const sectionRef = useRef<HTMLElement>(null);
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Only run the WebGL render loop while the Hero is actually visible —
    // otherwise it keeps burning GPU/main-thread time on every scroll
    // frame for the rest of the page, which is what was causing the
    // lag lower down on the site.
    const observer = new IntersectionObserver(
      ([entry]) => setShowParticles(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {showParticles && (
        <CanvasErrorBoundary>
          <ParticleField />
        </CanvasErrorBoundary>
      )}
      <div className="mesh-glow" />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-16 py-8"
      >
        <span className="font-display text-sm tracking-[0.2em] uppercase text-muted">M. Anzar</span>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </motion.nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 grid md:grid-cols-[1.3fr_1fr] gap-12 items-center px-6 md:px-16">
        <div>
        <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl tracking-tight leading-[0.9]"
          >
            Muhammad
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-muted">
              Anzar
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3 mt-8 max-w-xl"
          >
            {roles.map((role, i) => (
              <span
                key={i}
                className="glass-card rounded-full px-4 py-2 text-sm md:text-base text-muted"
              >
                {role}
              </span>
            ))}
          </motion.div>

          {resumeUrl && (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 w-fit rounded-full px-7 py-3.5 text-sm bg-white text-bg font-medium hover:bg-accent transition-colors"
            >
              Download Résumé
              <span aria-hidden>↓</span>
            </motion.a>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden md:block"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            style={{ willChange: "transform", transform: "translateZ(0)" }}
            className="glass-card rounded-3xl p-3 max-w-sm ml-auto"
          >
            <Image
              src="/images/portrait.jpg"
              alt="Muhammad Anzar"
              width={731}
              height={1024}
              priority
              className="rounded-2xl w-full h-auto object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 flex justify-center pb-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
