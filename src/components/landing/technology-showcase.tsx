"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize, 
  Settings,
  Layers,
  Ruler,
  Palette
} from "lucide-react";

const TechnologyShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const tabs = [
    {
      title: "LiDAR",
      value: "lidar",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="text-2xl font-bold text-white mb-3">LiDAR Avancé</h3>
          <p className="text-gray-300 mb-6">
            Technologie de mesure laser pour une précision exceptionnelle
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {["Portée 100m", "Précision ±1mm", "Scan 360°", "Temps réel"].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-blue-500/20"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                <span className="text-white text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Photogrammétrie",
      value: "photogrammetrie",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="text-2xl font-bold text-white mb-3">Photogrammétrie IA</h3>
          <p className="text-gray-300 mb-6">
            Intelligence artificielle pour la reconstruction 3D à partir de photos
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {["IA Deep Learning", "Auto-calibration", "HDR Support", "Cloud Processing"].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-blue-500/20"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                <span className="text-white text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Réalité",
      value: "realite-mixte",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="text-2xl font-bold text-white mb-3">Réalité Mixte</h3>
          <p className="text-gray-300 mb-6">
            Fusion parfaite entre monde réel et éléments virtuels
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {["AR/VR Ready", "Tracking précis", "Interaction naturelle", "Multi-plateforme"].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-blue-500/20"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                <span className="text-white text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
  ];
  const stats = [
    { label: "Précision", value: "±1mm", color: "text-blue-400" },
    { label: "Résolution", value: "4K HDR", color: "text-purple-400" },
    { label: "Vitesse", value: "2h/scan", color: "text-green-400" },
    { label: "Formats", value: "15+", color: "text-orange-400" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
            Technologie de Pointe
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            L&apos;Innovation{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              3D
            </span>{" "}
            en Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez comment notre technologie révolutionnaire transforme 
            la capture et la visualisation 3D
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Viewer Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl">
              {/* Viewer Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                  </button>
                  <button className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
                    <RotateCcw className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
                    <Maximize className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* 3D Viewer Content */}
              <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl relative overflow-hidden">
                {/* Placeholder for 3D content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      rotateY: isPlaying ? 360 : 0,
                      scale: isPlaying ? [1, 1.1, 1] : 1
                    }}
                    transition={{ 
                      rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg opacity-80"
                  />
                </div>
                
                {/* Overlay UI Elements */}
                <div className="absolute top-4 left-4 space-y-2">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                    Scan: Salon Moderne
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                    Points: 2.4M
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                    <Layers className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                    <Ruler className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                    <Palette className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="mt-4 grid grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Technology Tabs */}
          <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40"
    >
      <Tabs tabs={tabs} />
    </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;

