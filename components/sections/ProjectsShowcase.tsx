"use client";

import { useState, useMemo } from "react";
import { urlFor } from "@/lib/sanity";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectModal } from "@/components/ui/ProjectModal";

type Project = {
  _id: string;
  title: string;
  description?: string;
  techSkills?: string[];
  liveUrl?: string;
  timeframe?: string;
  coverImage?: any;
};

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View details for ${project.title}`}
      className="glass-card-flat rounded-3xl overflow-hidden h-full flex flex-col cursor-pointer group hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-200 shadow-lg select-none"
    >
      {/* Cover image container */}
      <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden bg-[#151518]">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(project.coverImage).width(900).url()}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent flex items-center justify-center">
            <span className="text-3xl opacity-20 font-mono text-indigo-300">{ "{ / }" }</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        {project.liveUrl && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-black/60 border border-emerald-400/30 text-xs text-emerald-400 font-medium backdrop-blur-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {project.timeframe && (
          <p className="text-xs text-indigo-400 tracking-wider uppercase mb-1.5 font-medium">
            {project.timeframe}
          </p>
        )}
        <h3 className="text-lg sm:text-xl font-medium mb-2 text-white group-hover:text-indigo-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted mb-4 line-clamp-2 flex-1 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.techSkills?.slice(0, 4).map((s) => (
            <span
              key={s}
              className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium"
            >
              {s}
            </span>
          ))}
          {(project.techSkills?.length ?? 0) > 4 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted">
              +{(project.techSkills?.length ?? 0) - 4}
            </span>
          )}
        </div>
        <p className="mt-4 text-xs text-indigo-400 font-medium flex items-center gap-1">
          Explore project details <span className="group-hover:translate-x-1 transition-transform">→</span>
        </p>
      </div>
    </div>
  );
}

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.techSkills?.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.techSkills?.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <>
      <section id="work" className="px-5 sm:px-8 md:px-16 py-20 md:py-28">
        <SectionLabel number="03" label="Projects" />

        <h2 className="font-display text-3xl md:text-5xl mb-6 md:mb-8 tracking-tight text-white">
          Selected Work.
        </h2>

        {/* Filter tabs */}
        {allTags.length > 1 && (
          <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide py-1 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`filter-tab shrink-0 ${activeFilter === tag ? "active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Project grid - pure CSS grid for zero frame drops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {filtered.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              onClick={() => setSelectedProject(p)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted text-sm mt-8 text-center py-10 glass-card-flat rounded-2xl">
            No projects match that filter yet.
          </p>
        )}
      </section>

      {/* Detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
