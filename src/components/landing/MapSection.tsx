"use client";
import React from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";

type MapSectionProps = {
  dict: {
    heading: string;
    subheading: string;
  };
};

const MapSection = ({ dict }: MapSectionProps) => {
  return (
    <section className="py-10 bg-slate-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {dict.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            {dict.subheading}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-orange-500/5 group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.2567599786767!2d-6.847084300000001!3d34.0013586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76d36f1327f77%3A0xbe11cdb8e45d7d64!2sBUILD360.ma%20%7C%20Visite%20virtuelle%20Maroc%20%E2%80%93%20360%2C%20Immobilier%2C%20H%C3%B4tels!5e1!3m2!1sfr!2sma!4v1777905009272!5m2!1sfr!2sma"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale invert contrast-125 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 transition-all duration-700"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
