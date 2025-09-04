/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { ArrowRight, Play } from "lucide-react";
import React, { useRef } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <div
        className="grid grid-cols-1 md:grid-cols-3 relative h-screen w-full text-black"
        style={{
          backgroundImage: "url(/images/Vector1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="col-span-2 flex flex-col justify-center max-w-3xl pl-16 mt-6 gap-4"
          data-aos="fade-right"
        >
          <div>
            <h1 className="lg:text-5xl text-3xl font-bold  font-adlamn italic bg-gradient-to-r px-2 from-[#f6ba13] to-orange-400 bg-clip-text text-transparent uppercase">
              Une expérience unique :
            </h1>

            <h1 className="lg:text-5xl text-3xl  font-adlamn italic leading-16">
              Vos espaces en
              <span className="bg-gradient-to-r px-2 from-[#f6ba13] to-orange-400 bg-clip-text text-transparent">
                3D
              </span>{" "}
              , vivants et immersifs
            </h1>
          </div>
          <h1 className="text-xl font-light ">
            Redéfinissez la façon dont vos clients découvrent vos biens, hôtels
            et projets au MONDE ENTIER
          </h1>
          <div className="flex gap-4">
            <div className=" flex justify-between itcems-center  w-fit max-w-md mt-4 bg-[#FCA311] rounded-full text-center pl-6 pr-2 py-2 gap-8">
              <div className="text-xl text-white font-adlamn">Get touch</div>
              <div className="h-8 w-8 rounded-full bg-orange-300 text-white text-center flex items-center justify-center">
                <ArrowRight />
              </div>
            </div>
            <div className=" flex justify-between itcems-center w-fit max-w-md mt-4 border border-[#FCA311]/50 rounded-full text-center pl-2 pr-6 py-2 gap-4">
              <div className="h-8 w-8 rounded-full bg-[#FCA311] text-white text-center flex items-center justify-center">
                <Play />
              </div>
              <div className="text-xl  font-adlamn">Demo</div>
            </div>
          </div>
        </div>
          <div className="  bg-gradient-to-r  from-[#f6ba13] to-orange-400  p-8 shadow-lg flex flex-col justify-center h-full">
            <motion.img
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              src="/images/test.png"
              alt=""
              className="w-[700px] bottom-0 right-0 h-auto absolute "
            />
          </div>
      </div>
    </div>
  );
};

export default HeroSection;
