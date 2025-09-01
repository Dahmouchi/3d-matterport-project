"use client";
import CTASection from "@/components/landing/cta-section";
import FeaturesSection from "@/components/landing/features-section";
import Footer from "@/components/landing/footer";
import HeroSection from "@/components/landing/Hero";
import Navbar from "@/components/landing/NavBar";
import PortfolioSection from "@/components/landing/portfolio-section";
import ProcessSection from "@/components/landing/process-section";
import TechnologyShowcase from "@/components/landing/technology-showcase";
import React from "react";


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <HeroSection />
        </section>

        {/* Features Section */}
        <section id="services">
          <FeaturesSection />
        </section>

        {/* Technology Showcase */}
        <section id="technology">
          <TechnologyShowcase />
        </section>

        {/* Process Section */}
        <ProcessSection />

        {/* Portfolio Section */}
        <section id="portfolio">
          <PortfolioSection />
        </section>

        {/* CTA Section */}
        <section id="contact">
          <CTASection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

