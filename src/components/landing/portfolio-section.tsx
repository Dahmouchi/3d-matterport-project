/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play,
  ExternalLink,
  MapPin,
  Calendar,
} from "lucide-react";

const PortfolioSection = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Villa Moderne Cannes",
      category: "Résidentiel",
      location: "Cannes, France",
      date: "2024",
      image: "/images/steps/capture.webp",
      description: "Numérisation 3D complète d'une villa de luxe de 500m² avec piscine et jardins.",
      stats: { rooms: 12, area: "500m²", points: "2.4M" },
      tags: ["Luxe", "Piscine", "Jardin", "Vue mer"]
    },
    {
      id: 2,
      title: "Showroom BMW Paris",
      category: "Commercial",
      location: "Paris, France",
      date: "2024",
      image: "/api/placeholder/600/400",
      description: "Visite virtuelle interactive pour le nouveau showroom BMW avec configurateur 3D.",
      stats: { rooms: 8, area: "800m²", points: "3.1M" },
      tags: ["Automobile", "Showroom", "Interactif", "Premium"]
    },
    {
      id: 3,
      title: "Château de Versailles",
      category: "Patrimoine",
      location: "Versailles, France",
      date: "2024",
      image: "/api/placeholder/600/400",
      description: "Préservation numérique des appartements royaux avec précision historique.",
      stats: { rooms: 25, area: "1200m²", points: "5.8M" },
      tags: ["Histoire", "Patrimoine", "Musée", "Culture"]
    },
    {
      id: 4,
      title: "Hôtel Boutique Lyon",
      category: "Hôtellerie",
      location: "Lyon, France",
      date: "2024",
      image: "/api/placeholder/600/400",
      description: "Visites virtuelles de toutes les suites pour réservations en ligne.",
      stats: { rooms: 45, area: "2000m²", points: "4.2M" },
      tags: ["Hôtel", "Booking", "Suites", "Luxe"]
    }
  ];

 

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };



  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold dark:text-white text-black mb-6">
            Nos{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Réalisations
            </span>
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez comment nous avons transformé des espaces exceptionnels 
            en expériences 3D immersives pour nos clients
          </p>
        </motion.div>

        {/* Projects Carousel */}
        <div className="mb-20">
          <div className="relative max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                {/* Project Image */}
                <div className="relative group">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700">
                    <img
                      src={projects[currentProject].image}
                      alt={projects[currentProject].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </button>
                    </div>

                    {/* Project Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="text-white text-sm font-semibold">{projects[currentProject].stats.rooms} Pièces</div>
                      </div>
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="text-white text-sm font-semibold">{projects[currentProject].stats.area}</div>
                      </div>
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="text-white text-sm font-semibold">{projects[currentProject].stats.points} Points</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-6">
                  <div>
                    <Badge className="mb-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      {projects[currentProject].category}
                    </Badge>
                    <h3 className="text-3xl font-bold dark:text-white text-black mb-4">
                      {projects[currentProject].title}
                    </h3>
                    <p className="dark:text-gray-300 text-gray-500 text-lg leading-relaxed">
                      {projects[currentProject].description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{projects[currentProject].location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{projects[currentProject].date}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {projects[currentProject].tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
                    <span>Voir le projet complet</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute left-4 bottom-0 transform -translate-y-1/2 w-12 h-12 dark:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 bottom-0 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Project Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentProject 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default PortfolioSection;

