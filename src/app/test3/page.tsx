/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import MatterportHero from "@/components/Hero";
import CTASection from "@/components/landing/cta-section";
import FeaturesSection from "@/components/landing/features-section";
import Footer from "@/components/landing/footer";
import PortfolioSection from "@/components/landing/portfolio-section";
import ProcessSection from "@/components/landing/process-section";
import Navbar from "@/components/Nav";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Boxes } from "@/components/ui/background-boxes";
import HeroSection from "@/components/landing/Hero";
import Demo from "@/components/landing/Demo";
import AboutUsSteps from "@/components/landing/about";
import { AnimatedTestimonialsDemo } from "@/components/landing/testimonial";
import ProcessSteps from "@/components/landing/steps";
import ComingSoonSection from "@/components/landing/Comming-soon";
import { Vortex } from "@/components/ui/vortex";

const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animated spotlight coordinates
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 140, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 140, damping: 22, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
     
      {/* Navigation */}
      <div className="flex justify-center w-full relative">
        <Navbar />
      </div>
      {/* Main Content*/}
      <main>
        <section
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative isolate overflow-hidden dark:bg-slate-950 bg-white text-white"
        > 

      {/* Background gradients */}

      {/* Animated Spotlight*/}
          <motion.div
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            className="pointer-events-none absolute -z-0 h-[44rem] w-[44rem] rounded-full opacity-60"
          >
            <div
              className="hidden dark:block h-full w-full rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,0.20), rgba(255,255,255,0.10) 35%, transparent 70%)",
                mixBlendMode: "screen",
              }}
            />

            <div
              className="block dark:hidden h-full w-full rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,165,0,0.30), rgba(255,140,0,0.15) 35%, transparent 50%)",
                mixBlendMode: "screen",
              }}
            />
          </motion.div> 

      {/* Hero Section */}
       <ComingSoonSection />
      
          <section id="home">
            <HeroSection />
          </section>

      {/* Process Section */}
          <section id="demo"> <Demo /></section>
         
          <section id="about">
            <AboutUsSteps />
          </section>
      
          {/*<section id="services">
            <FeaturesSection />
          </section>
           Features Section <section id="how-it-works">
            <ProcessSteps />
          </section>**/}
      {/* Portfolio Section */}
          <section id="portfolio">
            <PortfolioSection />
          </section>
          <section>
            <AnimatedTestimonialsDemo />
          </section>
         
        </section>
      {/* CTA Section */}  <div className="h-fit relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
          <Boxes />
          <section id="contact">
            <CTASection />
          </section>
        </div>
      </main>

      {/* Footer*/}
      <Footer /> 
    </div>
  );
};

export default LandingPage;
