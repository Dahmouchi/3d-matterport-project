"use client";
import CTASection from "@/components/landing/cta-section";
import Footer from "@/components/landing/footer";
import PortfolioSection from "@/components/landing/portfolio-section";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import Demo from "@/components/landing/Demo";
import AboutUsSteps from "@/components/landing/about";
import { AnimatedTestimonialsDemo } from "@/components/landing/testimonial";
import HeroSection1 from "@/components/Hero";
import Navbar1 from "@/components/landing/NavBar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-montserrat">
      {/* Navigation */}
      <div className="flex justify-center w-full relative">
        <Navbar1 />
      </div>
      {/* Main Content*/}
      <main>
        <section className="relative isolate overflow-hidden dark:bg-slate-950 bg-white text-white">
          <section id="home">
            <HeroSection1 />
          </section>
          {/* Process Section */}
          <section id="demo">
            {" "}
            <Demo />
          </section>
          <section id="about">
            <AboutUsSteps />
          </section>
          <section id="portfolio">
            <PortfolioSection />
          </section>
          <section>
            <AnimatedTestimonialsDemo />
          </section>
        </section>
        {/* CTA Section */}
        <div className="h-fit relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
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
