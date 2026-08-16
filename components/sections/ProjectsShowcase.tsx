"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

function ProjectCard({ project }: { project: Project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [14, -14]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-14, 14]), { stiffness: 150, damping: 18 });
  const scale = useSpring(1, { stiffness: 150, damping: 18 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseEnter={() => scale.set(1.03)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        scale.set(1);
      }}
      style={{ rotateX, rotateY, scale, transformPerspective: 1000 }}
      className="relative shrink-0 w-[80vw] md:w-[520px] glass-card rounded-3xl overflow-hidden"
    >
      {project.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(project.coverImage).width(1000).url()}
          alt={project.title}
          className="w-full h-[320px] object-cover"
        />
      )}
      <div className="p-6">
        <p className="text-xs text-muted mb-2">{project.timeframe}</p>
        <h3 className="text-xl font-medium mb-2">{project.title}</h3>
        <p className="text-sm text-muted mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techSkills?.map((s) => (
            <span key={s} className="text-xs px-3 py-1 rounded-full glass-card">
              {s}
            </span>
          ))}
        </div>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-block mt-4 text-sm text-accent">
            View live ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  return (
    <section className="py-32">
      <h2 className="font-display text-3xl md:text-5xl mb-12 px-6 md:px-16 tracking-tight">
        Selected Work
      </h2>
      <div className="flex gap-6 overflow-x-auto px-6 md:px-16 pb-8 snap-x snap-mandatory">
        {projects.map((p) => (
          <div key={p._id} className="snap-center">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
