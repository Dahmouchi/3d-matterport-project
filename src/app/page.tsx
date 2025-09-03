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
    <div className="min-h-screen dark:bg-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <section
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative isolate overflow-hidden dark:bg-slate-950 bg-white text-white"
        >
          {/* Background gradients */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(60rem_60rem_at_10%_10%,rgba(99,102,241,0.25),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(50rem_50rem_at_90%_30%,rgba(236,72,153,0.20),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(40rem_40rem_at_50%_100%,rgba(34,197,94,0.15),transparent_60%)]" />
          </div>
          {/* Animated Spotlight */}
          <motion.div
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            className="pointer-events-none absolute -z-0 h-[44rem] w-[44rem] rounded-full opacity-60"
          >
            {/* Dark mode spotlight */}
            <div
              className="hidden dark:block h-full w-full rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,0.20), rgba(255,255,255,0.10) 35%, transparent 70%)",
                mixBlendMode: "screen",
              }}
            />

            {/* Light mode spotlight */}
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
          <section id="home">
            <MatterportHero />
          </section>

          {/* Process Section */}
          <ProcessSection />

          {/* Features Section */}
          <section id="services">
            <FeaturesSection />
          </section>

          {/* Portfolio Section */}
          <section id="portfolio">
            <PortfolioSection />
          </section>

          {/* CTA Section */}
        </section>
        <div className="h-fit relative w-full overflow-hidden bg-slate-200 dark:bg-slate-900 flex flex-col items-center justify-center rounded-lg">

          <Boxes />
          <section id="contact">
            <CTASection />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
