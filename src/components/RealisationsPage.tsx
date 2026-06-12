"use client";

import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  MapPin,
  Maximize2,
  X,
  ArrowUpRight,
  SquareDashedMousePointer,
  Play,
  Layers,
  ChevronDown,
} from "lucide-react";

/* ─────────────────────────── Types ─────────────────────────── */
type ProjectListing = {
  id: string;
  title: string;
  description: string;
  link: string;
  matterportId: string;
  area: string;
  city: string;
  category?: string;
};

type RealisationsPageDict = {
  badge?: string;
  heading: string;
  subheading: string;
  columns: {
    title: string;
    city: string;
    area: string;
    action: string;
    showMore: string;
    showLess: string;
  };
  projects: ProjectListing[];
};

/* ─────────────────────────── Helpers ───────────────────────── */
function buildMpUrl(modelId: string) {
  const params = new URLSearchParams({
    m: modelId,
    play: "1",
    brand: "0",
    qs: "1",
    title: "0",
    dh: "1",
  });
  return `https://my.matterport.com/show/?${params}`;
}

function mpThumb(modelId: string) {
  return `https://my.matterport.com/api/v1/player/models/${modelId}/thumb?width=900&height=600&fm=webp`;
}

/* ─────────────────────────── Counter ───────────────────────── */
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.round(p * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return { count, ref };
}

/* ─────────────────────────── Stat Card ─────────────────────── */
function StatCard({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <p className="text-5xl font-black text-[#1a1a1a] tracking-tight tabular-nums">
        {count}
        <span className="text-amber-500">{suffix}</span>
      </p>
      <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-black/40">
        {label}
      </p>
    </div>
  );
}

/* ─────────────────────────── Project Card ─────────────────────── */
function ProjectCard({
  project,
  index,
  onOpen,
  actionLabel,
  rtl,
}: {
  project: ProjectListing;
  index: number;
  onOpen: (p: ProjectListing) => void;
  actionLabel: string;
  rtl: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Outer border glow on hover */}
      <div
        className={`absolute -inset-px rounded-3xl transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(245,158,11,0.4) 0%, rgba(245,158,11,0) 60%)",
        }}
      />

      <div className="relative rounded-3xl overflow-hidden bg-white border border-black/[0.05] h-full flex flex-col shadow-sm transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-amber-500/5">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={mpThumb(project.matterportId)}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay - more subtle in light mode */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* City pill */}
          <div
            className={`absolute top-4 ${rtl ? "right-4" : "left-4"} flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/5 shadow-sm`}
          >
            <MapPin className="w-3 h-3 text-amber-600" />
            <span className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-widest">
              {project.city}
            </span>
          </div>

          {/* Index number */}
          <div className="absolute bottom-4 right-4 font-black text-[64px] leading-none text-black/10 select-none pointer-events-none">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Play overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center shadow-2xl shadow-amber-500/40">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-widest drop-shadow-md">
                {actionLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-7">
          {/* Category tag */}
          {project.category && (
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-600">
                <span className="w-4 h-px bg-amber-600/50" />
                {project.category}
              </span>
            </div>
          )}

          <h3 className="text-xl font-bold text-[#1a1a1a] leading-tight mb-3 group-hover:text-amber-600 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-sm text-black/50 leading-relaxed mb-8 line-clamp-2 font-medium">
            {project.description}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-5 border-t border-black/[0.05]">
            <div className="flex items-center gap-1.5 text-black/40 text-xs font-semibold">
              <Maximize2 className="w-3.5 h-3.5 text-amber-600/60" />
              <span>{project.area}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-600 text-xs font-bold group-hover:text-amber-700 transition-colors">
              <span>{actionLabel}</span>
              <ArrowUpRight
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  hovered ? "translate-x-0.5 -translate-y-0.5" : ""
                } ${rtl ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────── Main Page ─────────────────────── */
const RealisationsPage = ({
  dict,
  rtl = false,
}: {
  dict: RealisationsPageDict;
  rtl?: boolean;
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectListing | null>(
    null,
  );
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set(dict.projects.map((p) => p.category ?? p.city))),
  ];

  const filtered =
    activeFilter === "all"
      ? dict.projects
      : dict.projects.filter((p) => (p.category ?? p.city) === activeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, 6);
  const hasMore = filtered.length > 6;

  return (
    <div
      className="min-h-screen bg-[#fafafa] text-[#1a1a1a]"
      dir={rtl ? "rtl" : "ltr"}
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-14 overflow-hidden bg-black"
        style={{
          backgroundImage: "url(/images/Vector.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Noise texture overlay */}

        <div className="container mx-auto px-6 max-w-7xl">
          {/* Badge */}

          {/* Heading */}
          <h1 className="text-center text-4xl md:text-6xl font-black tracking-tight leading-none">
            <span className="block text-white">
              {dict.heading.split(" ").slice(0, -1).join(" ")}
            </span>
            <span
              className="block text-primary"
              style={{
                WebkitTextStroke: "1px #f6ba13",
                color: "transparent",
              }}
            >
              {dict.heading.split(" ").slice(-1)[0]}
            </span>
          </h1>

          <p className="text-center text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-16">
            {dict.subheading}
          </p>

          {/* Stats bar 
          <div className="relative max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-8 py-10 px-8 rounded-2xl border border-black/[0.05] bg-white/50 backdrop-blur-sm shadow-sm">
              <StatCard
                value={dict.projects.length}
                label="Réalisations"
                suffix="+"
              />
              <StatCard value={12} label="Villes" suffix="+" />
              <StatCard value={100} label="Clients satisfaits" suffix="%" />
            </div>
          </div>*/}
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/[0.05]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div
            className={`flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide ${rtl ? "flex-row-reverse" : ""}`}
          >
            <Layers className="w-4 h-4 text-black/20 flex-shrink-0 mr-2" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setShowAll(false);
                }}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                    : "bg-black/[0.03] text-black/40 border border-black/[0.05] hover:border-amber-500/30 hover:text-black/70"
                }`}
              >
                {cat === "all" ? "Tous" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setSelectedProject}
                actionLabel={dict.columns.action}
                rtl={rtl}
              />
            ))}
          </div>

          {/* Show more */}
          {hasMore && (
            <div className="mt-14 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-black/10 bg-white text-black/60 text-sm font-bold hover:border-amber-500/40 hover:text-black shadow-sm transition-all duration-300"
              >
                {showAll ? dict.columns.showLess : dict.columns.showMore}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-24 bg-white border-t border-black/[0.05]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600 mb-4">
            Vous avez un projet ?
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-8 leading-tight">
            Donnons vie à votre <span className="text-amber-500">espace</span>
          </h2>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-500 text-white font-extrabold text-sm hover:bg-amber-600 transition-colors duration-200 shadow-xl shadow-amber-500/20"
          >
            Démarrer un projet
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── Modal ── */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent
          dir={rtl ? "rtl" : "ltr"}
          className="lg:min-w-[90vw] lg:w-[90vw] h-[90vh] p-0 bg-white border border-black/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.1)]"
        >
          {selectedProject && (
            <div className="flex flex-col h-full">
              {/* Top bar */}
              <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-white/80 to-transparent pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-sm font-bold text-[#1a1a1a]">
                      {selectedProject.title}
                    </span>
                    <span className="text-black/10">·</span>
                    <span className="text-xs text-black/50">
                      {selectedProject.city}
                    </span>
                  </div>
                </div>
              </div>

              {/* iframe */}
              <div className="flex-1 relative bg-black">
                <iframe
                  src={buildMpUrl(selectedProject.matterportId)}
                  className="w-full h-full border-none"
                  title={selectedProject.title}
                  allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
                  allowFullScreen
                />
              </div>

              {/* Bottom strip */}
              <div className="shrink-0 flex items-center justify-between px-6 py-4 bg-white border-t border-black/[0.05]">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <span className="text-sm font-bold text-black/70">
                      {selectedProject.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <span className="text-sm font-bold text-black/70">
                      {selectedProject.area}
                    </span>
                  </div>
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 text-white text-xs font-extrabold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/10"
                >
                  Nous contacter
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RealisationsPage;
