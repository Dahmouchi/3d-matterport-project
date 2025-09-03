/* eslint-disable @typescript-eslint/no-unused-vars */
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
import Image from "next/image";
type Step = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactElement;
  duration: string;
  color: string; // e.g. "from-blue-500 to-cyan-500"
  details: string[];
  image: {
    src: string;
    alt: string;
    blurDataURL?: string; // optional
  };
};
const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

 const processSteps: Step[] = [
  {
    id: 1,
    title: "Capture 3D",
    subtitle: "Scan de l'espace",
    description:
      "Notre équipe se déplace avec un équipement Matterport professionnel pour capturer votre espace en haute définition. Chaque angle est méticuleusement scanné pour garantir une couverture complète.",
    icon: <Camera className="w-8 h-8" />,
    duration: "30-60 min",
    color: "from-blue-500 to-cyan-500",
    details: ["Équipement Matterport Pro3", "Capture 4K HDR", "Scan 360° complet", "Mesures précises automatiques"],
    image: {
      src: "/images/steps/capture.webp",
      alt: "Capture dun espace avec Matterport",
      // blurDataURL: "data:image/jpeg;base64,...." // optional
    },
  },
  {
    id: 2,
    title: "Upload Sécurisé",
    subtitle: "Transfert des données",
    description:
      "Les données capturées sont automatiquement uploadées vers nos serveurs sécurisés via une connexion chiffrée. Vos informations restent privées et protégées.",
    icon: <Upload className="w-8 h-8" />,
    duration: "5-15 min",
    color: "from-purple-500 to-pink-500",
    details: ["Chiffrement SSL/TLS", "Upload automatique", "Sauvegarde redondante", "Accès sécurisé"],
    image: {
      src: "/images/steps/upload.jpg",
      alt: "Transfert sécurisé des données",
    },
  },
  {
    id: 3,
    title: "Visualisation",
    subtitle: "Modèle 3D prêt",
    description:
      "Votre espace 3D est maintenant prêt ! Explorez-le avec notre viewer interactif, prenez des mesures, ajoutez des annotations et bien plus encore.",
    icon: <Eye className="w-8 h-8" />,
    duration: "Instantané",
    color: "from-orange-500 to-red-500",
    details: ["Viewer interactif", "Navigation fluide", "Outils de mesure", "Mode VR disponible"],
    image: {
      src: "/images/steps/visualisation.webp",
      alt: "Visualisation du modèle 3D",
    },
  },
  {
    id: 4,
    title: "Partage",
    subtitle: "Diffusion multi-canal",
    description:
      "Partagez votre création sur toutes les plateformes : site web, réseaux sociaux, applications mobiles. Intégration facile et formats multiples.",
    icon: <Share2 className="w-8 h-8" />,
    duration: "En continu",
    color: "from-violet-500 to-purple-500",
    details: ["Embed code HTML", "Liens de partage", "Export multi-format", "API disponible"],
    image: {
      src: "/images/steps/share.webp",
      alt: "Partage multi-plateforme",
    },
  },
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
              <h3 className="text-2xl font-bold dark:text-white text-gray-700 ">{step.title}</h3>
              <p className="dark:text-gray-400 text-gray-700">{step.subtitle}</p>
            </div>
          </div>
          
          <p className="dark:text-gray-300 text-gray-500 mb-6 leading-relaxed">
            {step.description}
          </p>

          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-5 h-5 text-orange-400" />
            <span className="text-orange-600 font-semibold">Durée: {step.duration}</span>
          </div>

          <div className="space-y-3">
            {step.details.map((detail, detailIndex) => (
              <div
                key={detailIndex}               
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="dark:text-gray-300 text-gray-600">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Visual */}
       <div className="relative">
  <div className={`aspect-square rounded-2xl bg-gradient-to-br ${step.color} p-1`}>
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Ken Burns subtle zoom */}
      <div
       
        className="absolute inset-0"
      >
        <Image
          src={step.image.src}
          alt={step.image.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 28rem, 100vw"
          priority={step.id === 1}
          {...(step.image.blurDataURL
            ? { placeholder: "blur" as const, blurDataURL: step.image.blurDataURL }
            : {})}
        />
      </div>

      {/* Soft top gradient overlay for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Step Number */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center ring-1 ring-white/20">
        <span className="text-white font-bold text-lg">{step.id}</span>
      </div>
    </div>
  </div>
</div>
      </div>
    ),
  }));

  return (
    <section className="py-20  relative overflow-hidden">
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
          <h2 className="text-4xl md:text-6xl font-bold dark:text-white mb-6 text-black">
            Notre{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Processus
            </span>{" "}
            Simplifié
          </h2>
          <p className="text-xl dark:text-gray-300 text-gray-500 max-w-3xl mx-auto">
            De la capture à la diffusion, découvrez comment nous transformons 
            vos espaces en expériences 3D immersives en quelques étapes simples
          </p>
        </motion.div>
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Timeline data={timelineData}/>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-500/10 dark:from-blue-500/10 darkto-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-gray-700 dark:text-white mb-4">
              Commencez votre projet 3D dès aujourd&apos;hui
            </h3>
            <p className="text-gray-500 dark:text-gray-300 mb-6">
              Processus simple, résultats exceptionnels. Votre espace en 3D en moins de 24h.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Planifier un Scan
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;

