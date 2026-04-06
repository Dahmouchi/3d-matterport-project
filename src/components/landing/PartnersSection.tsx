"use client";
import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

type PartnersDict = {
  heading: string;
};

const PartnersSection = ({ dict }: { dict: PartnersDict }) => {
  // Array of logo paths. We use the existing airbnb logo and some placeholders for now.
  // In a real scenario, the user would provide these logos in /public/images/logos/
  const partnerLogos = [
    "/images/logos/supmti.png",
    "/images/logos/alwoud.png",
    "/images/logos/auto.png",
    "/images/logos/complirisk.png",
    "/images/logos/sedec.webp",
    "/images/logos/calx.jpg",
  ];

  return (
    <section className="py-8 bg-white overflow-hidden relative border-y border-gray-100">
      {/* Background radial effects */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent bottom-0" />
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent top-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {dict.heading}
          </h3>
          <div className="h-0.5 w-12 bg-amber-400 mx-auto rounded-full" />
        </div>

        <div className="flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-500">
          <InfiniteMovingCards
            items={partnerLogos}
            direction="left"
            speed="slow"
            className="w-full grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
