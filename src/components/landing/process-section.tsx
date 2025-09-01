"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { 
  Camera, 
  Upload, 
  Cpu, 
  Eye, 
  Share2,
  CheckCircle,
  ArrowRight,
  Clock
} from "lucide-react";

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      id: 1,
      title: "Capture 3D",
      subtitle: "Scan de l'espace",
      description: "Notre équipe se déplace avec un équipement Matterport professionnel pour capturer votre espace en haute définition. Chaque angle est méticuleusement scanné pour garantir une couverture complète.",
      icon: <Camera className="w-8 h-8" />,
      duration: "30-60 min",
      color: "from-blue-500 to-cyan-500",
      details: [
        "Équipement Matterport Pro3",
        "Capture 4K HDR",
        "Scan 360° complet",
        "Mesures précises automatiques"
      ]
    },
    {
      id: 2,
      title: "Upload Sécurisé",
      subtitle: "Transfert des données",
      description: "Les données capturées sont automatiquement uploadées vers nos serveurs sécurisés via une connexion chiffrée. Vos informations restent privées et protégées.",
      icon: <Upload className="w-8 h-8" />,
      duration: "5-15 min",
      color: "from-purple-500 to-pink-500",
      details: [
        "Chiffrement SSL/TLS",
        "Upload automatique",
        "Sauvegarde redondante",
        "Accès sécurisé"
      ]
    },
    {
      id: 3,
      title: "Traitement IA",
      subtitle: "Reconstruction 3D",
      description: "Notre intelligence artificielle avancée traite les données pour créer un modèle 3D photoréaliste. Algorithmes de pointe pour une qualité exceptionnelle.",
      icon: <Cpu className="w-8 h-8" />,
      duration: "1-3 heures",
      color: "from-green-500 to-emerald-500",
      details: [
        "IA Deep Learning",
        "Reconstruction automatique",
        "Optimisation qualité",
        "Génération de métadonnées"
      ]
    },
    {
      id: 4,
      title: "Visualisation",
      subtitle: "Modèle 3D prêt",
      description: "Votre espace 3D est maintenant prêt ! Explorez-le avec notre viewer interactif, prenez des mesures, ajoutez des annotations et bien plus encore.",
      icon: <Eye className="w-8 h-8" />,
      duration: "Instantané",
      color: "from-orange-500 to-red-500",
      details: [
        "Viewer interactif",
        "Navigation fluide",
        "Outils de mesure",
        "Mode VR disponible"
      ]
    },
    {
      id: 5,
      title: "Partage",
      subtitle: "Diffusion multi-canal",
      description: "Partagez votre création sur toutes les plateformes : site web, réseaux sociaux, applications mobiles. Intégration facile et formats multiples.",
      icon: <Share2 className="w-8 h-8" />,
      duration: "En continu",
      color: "from-violet-500 to-purple-500",
      details: [
        "Embed code HTML",
        "Liens de partage",
        "Export multi-format",
        "API disponible"
      ]
    }
  ];

  const timelineData = processSteps.map((step) => ({
    title: step.title,
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        {/* Left Column - Info */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-full bg-gradient-to-r ${step.color}`}>
              {step.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{step.title}</h3>
              <p className="text-gray-400">{step.subtitle}</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            {step.description}
          </p>

          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">Durée: {step.duration}</span>
          </div>

          <div className="space-y-3">
            {step.details.map((detail, detailIndex) => (
              <motion.div
                key={detailIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{detail}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Visual */}
        <div className="relative">
          <div className={`aspect-square rounded-2xl bg-gradient-to-br ${step.color} p-1`}>
            <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
              {/* Animated Background */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-10 blur-xl`}
              />
              
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className={`p-8 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                  {React.cloneElement(step.icon, { className: "w-16 h-16" })}
                </div>
              </motion.div>

              {/* Step Number */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{step.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Notre{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Processus
            </span>{" "}
            Simplifié
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            De la capture à la diffusion, découvrez comment nous transformons 
            vos espaces en expériences 3D immersives en quelques étapes simples
          </p>
        </motion.div>

        {/* Process Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {processSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                    activeStep === index 
                      ? `bg-gradient-to-r ${step.color} border-transparent text-white` 
                      : 'border-gray-600 text-gray-300 hover:border-gray-500'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`p-2 rounded-full ${activeStep === index ? 'bg-white/20' : 'bg-gray-700'}`}>
                    {React.cloneElement(step.icon, { className: "w-4 h-4" })}
                  </div>
                  <span className="font-semibold">{step.title}</span>
                </motion.div>
                
                {index < processSteps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-500 hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Timeline data={timelineData} />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Commencez votre projet 3D dès aujourd&apos;hui
            </h3>
            <p className="text-gray-300 mb-6">
              Processus simple, résultats exceptionnels. Votre espace en 3D en moins de 24h.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Planifier un Scan
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;

