/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { ArrowRight, Play } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

const HeroSection = () => {
  const logos = [
    "/images/logov1.png",
    "/images/logov1.png",
    "/images/logov1.png",
    "/images/logov1.png",
  ];
   const words = [
    {
      text: "Une",
    },
    {
      text: "expérience",
    },
    {
      text: "unique",
      className: "text-orange-500 dark:text-blue-500",
    },
    
  ];
  const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
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
          className="col-span-2 flex flex-col justify-center  max-w-3xl lg:pl-16 p-2 mt-6 gap-4"
          
        >
          <div className="text-left">
            <TypewriterEffectSmooth words={words}  className="lg:text-5xl text-3xl font-bold  font-adlamn italic  uppercase"/>
           

            <h1 className="lg:text-5xl text-3xl  font-adlamn italic lg:leading-16">
              Vos Espaces en
              <span className="bg-gradient-to-r px-2 from-[#f6ba13] to-orange-400 bg-clip-text text-transparent">
                3D
              </span>{" "}
              , Vivants et Immersifs
            </h1>
          </div>
          <h1 className="text-xl font-light ">
            Redéfinissez la façon dont vos clients découvrent vos biens, hôtels
            et projets au MONDE ENTIER
          </h1>
          <div className="flex gap-4">
            <div className=" flex justify-between itcems-center  w-fit max-w-md mt-4 bg-[#FCA311] rounded-full text-center pl-6 pr-2 py-2 gap-8">
              <div className="text-xl text-white font-adlamn">
                Remplissez le formulaire
              </div>
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

    
       <div className="flex flex-col antialiased  bg-gradient-to-r from-[#f6ba13] to-orange-400 items-center justify-between relative overflow-hidden">
      <h1></h1>
      {/* Scrolling container<InfiniteMovingCards
        items={logos}
        direction="right"
        speed="fast"
      /> */}
    </div>
    </div>
  );
};

export default HeroSection;



