/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  MapPin,
  Maximize2,
  X,
  Building2,
  Hotel,
  Store,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Category =
  | "Tous"
  | "Immobilier"
  | "Showroom"
  | "Hôtellerie"
  | "Offices"
  | "Ecoles";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: Exclude<Category, "Tous">;
  location: string;
  matterportId: string;
  thumbnail: string;
  description: string;
  area: string;
  icon: LucideIcon;
  accentColor: string;
}

type CarouselDict = {
  badge: string;
  heading: string;
  subheading: string;
  ctaText: string;
  ctaButton: string;
  categories: Record<string, string>;
  projects: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    location: string;
  }>;
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const projects: Project[] = [
  {
    id: 1,
    title: "Villa Scandinavienne",
    subtitle: "Résidence de luxe",
    category: "Immobilier",
    location: "Témara, Maroc",
    matterportId: "cb3PdBNtPt9",
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/67d65f56ec463a6e9aff64be/5726358c-b613-4fd2-8c17-77f70812a357/SlavaBlazerPhotography_RealEstatePhotography103.jpg",
    description:
      "Numérisation 3D complète d'une villa de luxe 500 m² avec piscine, jardins et terrasse panoramique.",
    area: "500 m²",
    icon: Building2,
    accentColor: "#f6ba13",
  },
  {
    id: 3,
    title: "SUPMTI",
    subtitle: "Ecole",
    category: "Ecoles",
    location: "Rabat, Maroc",
    matterportId: "NamRELgC9Hy",
    thumbnail:
      "https://my.matterport.com/api/v1/player/models/NamRELgC9Hy/thumb?width=853&height=480&fm=webp",
    description:
      "Visite virtuelle interactive d'un showroom haut de gamme — accessible 24h/24 pour vos clients.",
    area: "800 m²",
    icon: Store,
    accentColor: "#fb923c",
  },
  {
    id: 4,
    title: "Office SUMPTI",
    subtitle: "Bureau",
    category: "Offices",
    location: "Tanger, Maroc",
    matterportId: "PgAV361iABv",
    thumbnail:
      "https://my.matterport.com/api/v1/player/models/PgAV361iABv/thumb?width=853&height=480&fm=webp",
    description:
      "Appartement moderne avec vue panoramique sur le détroit — présenté en visite 360° haute définition.",
    area: "280 m²",
    icon: Building2,
    accentColor: "#f6ba13",
  },
];

const ALL_CATEGORIES: Category[] = [
  "Tous",
  "Immobilier",
  "Hôtellerie",
  "Ecoles",
  "Showroom",
  "Offices",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function buildMpUrl(modelId: string, autoplay = false) {
  const base = "https://my.matterport.com/show/";
  const params = new URLSearchParams({
    m: modelId,
    play: autoplay ? "1" : "0",
    brand: "0",
    qs: "1",
    title: "0",
    dh: "1",
  }).toString();
  return `${base}?${params}`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function CategoryBadge({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-2 rounded-full text-sm font-semibold ${
        active
          ? "text-black bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-400/30"
          : "text-gray-400 border border-white/10 hover:text-white hover:border-white/30"
      }`}
    >
      {label}
    </button>
  );
}

function ProjectCard({
  project,
  active,
  onClick,
  onFullscreen,
}: {
  project: Project;
  active: boolean;
  onClick: () => void;
  onFullscreen: () => void;
}) {
  const Icon = project.icon;

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-3xl overflow-hidden border group ${
        active
          ? "border-amber-400/60 shadow-2xl shadow-amber-400/20"
          : "border-white/10 hover:border-white/25"
      }`}
      style={{
        background: "linear-gradient(135deg, #111827 0%, #0f172a 100%)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Active iframe preview */}
        {active && (
          <div className="absolute inset-0">
            <iframe
              src={buildMpUrl(project.matterportId)}
              className="w-full h-full"
              title={project.title}
              allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
              allowFullScreen
            />
          </div>
        )}

        {/* Fullscreen button */}
        {active && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFullscreen();
            }}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-amber-400/80 hover:text-black"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Play icon on non-active */}
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-14 h-14 rounded-full bg-amber-400/90 flex items-center justify-center shadow-xl">
              <Play className="w-6 h-6 text-black ml-0.5" />
            </div>
          </div>
        )}

        {/* Category pill */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-black"
          style={{ background: project.accentColor }}
        >
          {project.category}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mt-0.5">{project.subtitle}</p>
          </div>
          <div
            className="flex-shrink-0 p-2 rounded-xl"
            style={{ background: `${project.accentColor}22` }}
          >
            <Icon className="w-5 h-5" style={{ color: project.accentColor }} />
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-3 text-gray-400 text-xs">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{project.location}</span>
          <span className="ml-auto text-gray-500">{project.area}</span>
        </div>

        {active && (
          <p className="text-gray-400 text-sm mt-3 leading-relaxed border-t border-white/10 pt-3">
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Section
// ---------------------------------------------------------------------------
const MatterportCarousel = ({ dict }: { dict: CarouselDict }) => {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous");
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Merge static project data with translations from dict
  const translatedProjects = projects.map(p => {
    const translation = dict.projects[p.id];
    if (translation) {
      return {
        ...p,
        title: translation.title,
        subtitle: translation.subtitle,
        description: translation.description,
        location: translation.location
      };
    }
    return p;
  });

  const filtered =
    activeCategory === "Tous"
      ? translatedProjects
      : translatedProjects.filter((p) => p.category === activeCategory);

  const current = filtered[activeIndex] ?? filtered[0];

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === filtered.length - 1 ? 0 : i + 1));
  }, [filtered.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    autoplayRef.current = setInterval(next, 8000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [next]);

  const resetAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(next, 8000);
  };

  const handlePrev = () => {
    prev();
    resetAutoplay();
  };
  const handleNext = () => {
    next();
    resetAutoplay();
  };

  return (
    <section
      id="projects"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f9fafb 40%, #111827 80%, #0f172a 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-12">
          {/* Eye icon badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-sm font-semibold mb-6">
            <Eye className="w-4 h-4" />
            {dict.badge}
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {dict.heading.split("3D").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <React.Fragment key={i}>
                  {part}
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-orange-600 bg-clip-text text-transparent">
                    3D
                  </span>
                </React.Fragment>
              ) : (
                part
              )
            )}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {dict.subheading}
          </p>
        </div>

        {/* ── Category Filters ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {ALL_CATEGORIES.map((cat) => (
            <CategoryBadge
              key={cat}
              label={dict.categories[cat] ?? cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* ── Featured Viewer + Sidebar ── */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Featured project — large left panel */}
          <div
            className="lg:col-span-2 rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl shadow-amber-400/10 relative"
            style={{ background: "#111827" }}
          >
            {/* Iframe */}
            <div className="aspect-video relative">
              <iframe
                key={current.matterportId}
                src={buildMpUrl(current.matterportId)}
                className="w-full h-full"
                title={current.title}
                allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
                allowFullScreen
              />
              {/* Fullscreen btn */}
              <button
                onClick={() => setFullscreenOpen(true)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-amber-400 hover:text-black z-10"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              {/* Logo watermark */}
              <div className="absolute bottom-4 left-4 z-10">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                  <img
                    src="/images/logov1.png"
                    alt="logo"
                    className="h-6 w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Info bar */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: current.accentColor, color: "#000" }}
                  >
                    {dict.categories[current.category] ?? current.category}
                  </span>
                </div>
                <h3 className="text-white text-xl font-bold">
                  {current.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{current.location}</span>
                  <span className="ml-3 text-gray-500">{current.area}</span>
                </div>
              </div>

              {/* Nav buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-white/20 text-white hover:bg-amber-400 hover:text-black hover:border-amber-400"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-gray-400 text-sm font-mono">
                  {activeIndex + 1} / {filtered.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full border border-white/20 text-white hover:bg-amber-400 hover:text-black hover:border-amber-400"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-white/5">
              <div
                key={`${current.id}-progress`}
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Sidebar card list */}
          <div className="flex flex-col gap-4 lg:max-h-[460px] lg:overflow-y-auto pr-1">
            {filtered.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                active={idx === activeIndex}
                onClick={() => {
                  setActiveIndex(idx);
                  resetAutoplay();
                }}
                onFullscreen={() => setFullscreenOpen(true)}
              />
            ))}
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center gap-2 mt-8">
          {filtered.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                resetAutoplay();
              }}
            >
              <div
                className={`rounded-full ${
                  idx === activeIndex
                    ? "w-8 h-2.5 bg-amber-400"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-14">
          <p className="text-gray-400 mb-6">{dict.ctaText}</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-black bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-400/30 hover:shadow-xl"
          >
            <Play className="w-4 h-4" />
            {dict.ctaButton}
          </a>
        </div>
      </div>

      {/* ── Fullscreen Dialog ── */}
      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 bg-black border border-amber-400/30 rounded-2xl overflow-hidden">
          <iframe
            src={buildMpUrl(current.matterportId, true)}
            className="w-full h-full"
            title={current.title}
            allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
            allowFullScreen
          />
          <button
            onClick={() => setFullscreenOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:bg-amber-400 hover:text-black z-50"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 z-50">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
              <img src="/images/logov1.png" alt="logo" className="h-6 w-auto" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MatterportCarousel;
