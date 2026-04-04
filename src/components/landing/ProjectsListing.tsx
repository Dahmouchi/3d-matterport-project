"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  MapPin,
  Maximize2,
  X,
  ArrowRight,
  Eye,
  ChevronDown,
  ChevronUp,
  Building2,
} from "lucide-react";

type ProjectListing = {
  id: string;
  title: string;
  description: string;
  link: string;
  matterportId: string;
  area: string;
  city: string;
};

type ProjectsListingDict = {
  badge: string;
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

const ProjectsListing = ({
  dict,
  rtl = false,
}: {
  dict: ProjectsListingDict;
  rtl?: boolean;
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectListing | null>(
    null,
  );
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? dict.projects : dict.projects.slice(0, 6);
  const hasMore = dict.projects.length > 6;

  function buildMpUrl(modelId: string) {
    const base = "https://my.matterport.com/show/";
    const params = new URLSearchParams({
      m: modelId,
      play: "1",
      brand: "0",
      qs: "1",
      title: "0",
      dh: "1",
    }).toString();
    return `${base}?${params}`;
  }

  return (
    <section
      id="portfolio"
      className="relative py-24 bg-gray-50/50 overflow-hidden"
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-amber-400/10 to-transparent blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-500/10 to-transparent blur-3xl opacity-50" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {dict.heading}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {dict.subheading}
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-amber-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-400/10 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Image Thumbnail Area */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-900 shadow-inner">
                {/* Matterport Thumbnail */}
                <img
                  src={`https://my.matterport.com/api/v1/player/models/${project.matterportId}/thumb?width=800&height=600&fm=webp`}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Fallback/Overlay if image fails or for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Top Badge */}
                <div
                  className={`absolute top-5 ${rtl ? "right-5" : "left-5"} px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl`}
                >
                  {project.city}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-500" />

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                  <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center shadow-2xl">
                    <Maximize2 className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-[2px] bg-amber-400 rounded-full" />
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                    {project.city}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700 font-bold">
                    <Maximize2 className="w-4 h-4 text-amber-500" />
                    <span>{project.area}</span>
                  </div>

                  <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                    <span>{dict.columns.action}</span>
                    <ArrowRight
                      className={`w-4 h-4 transform group-hover:translate-x-1 ${rtl ? "rotate-180 group-hover:-translate-x-1" : ""} transition-transform`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Less Toggle */}
        {hasMore && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white border-2 border-gray-100 text-gray-900 font-bold hover:border-amber-400 hover:text-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              {showAll ? (
                <>
                  {dict.columns.showLess}
                  <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  {dict.columns.showMore}
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Modal / Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent
          dir={rtl ? "rtl" : "ltr"}
          className="lg:min-w-5xl lg:w-[95vw] h-[90vh] md:h-[95vh] p-0 bg-black border border-white/10 rounded-[1.5rem] overflow-hidden shadow-[0_0_50px_rgba(246,186,19,0.15)]"
        >
          {selectedProject && (
            <div className="flex flex-col h-full font-montserrat">
              {/* Header/Title Bar in Modal */}
              <div className="absolute top-0 left-0 right-0 z-50 p-6 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-2xl">
                    <img
                      src="/images/logov1white.png"
                      alt="logo"
                      className="h-6 w-auto"
                    />
                    <div className="h-4 w-[1px] bg-white/20 mx-1" />
                    <span className="text-sm font-bold">
                      {selectedProject.title}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="pointer-events-auto p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-2xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative flex-1">
                <iframe
                  src={buildMpUrl(selectedProject.matterportId)}
                  className="w-full h-full border-none"
                  title={selectedProject.title}
                  allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
                  allowFullScreen
                />
              </div>

              {/* Modal Details Footer */}
              <div className="bg-white p-6 flex flex-col gap-4 border-t border-gray-100">
                <div className={rtl ? "text-right" : "text-left"}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-[2px] bg-amber-400 rounded-full" />
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                      {selectedProject.city}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4">
                    {selectedProject.title}
                  </h3>
                  <div
                    className={`flex flex-wrap ${rtl ? "flex-row-reverse" : "flex-row"} gap-6 text-gray-600`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-amber-50">
                        <MapPin className="w-4 h-4 text-amber-500" />
                      </div>
                      <span className="font-bold">{selectedProject.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-amber-50">
                        <Maximize2 className="w-4 h-4 text-amber-500" />
                      </div>
                      <span className="font-bold">{selectedProject.area}</span>
                    </div>
                  </div>
                </div>

                {/*<div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gray-900 text-white font-bold shadow-xl hover:bg-black transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Us
                    <ArrowRight
                      className={`w-4 h-4 ${rtl ? "rotate-180" : ""}`}
                    />
                  </a>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-600 text-white font-bold shadow-xl hover:shadow-orange-500/20 transform hover:scale-105 transition-all duration-300"
                  >
                    {dict.columns.action}
                    <Eye className="w-4 h-4" />
                  </a>
                </div>*/}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsListing;
