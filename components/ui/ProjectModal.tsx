"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/sanity";

type Project = {
  _id: string;
  title: string;
  description?: string;
  techSkills?: string[];
  liveUrl?: string;
  timeframe?: string;
  coverImage?: any;
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent background body scroll while open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div
          key="modal-container"
          className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 md:p-8"
        >
          {/* High-performance non-blur dark backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/85"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="relative z-10 bg-[#121216] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-[#1e1e24] border border-white/15 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            {/* Cover image */}
            {project.coverImage && (
              <div className="w-full h-44 sm:h-56 md:h-64 overflow-hidden rounded-t-3xl bg-[#16161b]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlFor(project.coverImage).width(1100).url()}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-5 sm:p-7 md:p-8">
              {/* Timeframe */}
              {project.timeframe && (
                <p className="text-xs text-indigo-400 tracking-widest uppercase mb-2 font-medium">
                  {project.timeframe}
                </p>
              )}

              {/* Title */}
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl tracking-tight mb-3 text-white">
                {project.title}
              </h2>

              {/* Description */}
              {project.description && (
                <p className="text-muted leading-relaxed mb-6 text-sm sm:text-base">
                  {project.description}
                </p>
              )}

              {/* Tech stack */}
              {project.techSkills && project.techSkills.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-indigo-400 font-medium mb-2.5">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.techSkills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full w-full sm:w-auto px-7 py-3 text-sm bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
                >
                  View live project ↗
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
