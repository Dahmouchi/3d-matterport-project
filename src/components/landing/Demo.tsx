/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ContainerScroll } from "../ui/container-scroll-animation";

const Demo = () => {
  const modelId = "UoqjwziqrZs"; // Replace with your actual Matterport model ID
  const mpUrl = useMemo(() => {
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
  }, [modelId]);

  return (
    <section className=" relative overflow-hidden bg-[#EDE3D2] py-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold dark:text-white mb-6 text-black">
          Notre{" "}
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Processus
          </span>{" "}
          Simplifié
        </h2>
        <p className="text-xl dark:text-gray-300 text-gray-500 max-w-3xl mx-auto">
          De la capture à la diffusion, découvrez comment nous transformons vos
          espaces en expériences 3D immersives en quelques étapes simples
        </p>
      </motion.div>
      <div className="h-[60rem]  md:h-[60rem] flex items-center justify-center relative p-2 md:p-20">
        <div
          className="py-10 w-full relative h-full"
          style={{
            perspective: "1000px",
          }}
        >
          <iframe
            key={mpUrl}
            src={mpUrl}
            allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
            allowFullScreen
            className="mx-auto w-full rounded-2xl object-cover h-full object-left-top"
            title="Matterport 360 Tour"
          />
        </div>
      </div>
    </section>
  );
};

export default Demo;
