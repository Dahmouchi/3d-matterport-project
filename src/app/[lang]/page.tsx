import CTASection from "@/components/landing/cta-section";
import Footer from "@/components/landing/footer";
import React from "react";
import Demo from "@/components/landing/Demo";
import AboutUsSteps from "@/components/landing/about";
import HeroSection1 from "@/components/Hero";
import Navbar1 from "@/components/landing/NavBar";
import AboutSection from "@/components/landing/AboutSection";
import FAQSection from "@/components/landing/FAQSection";
//import MatterportCarousel from "@/components/landing/MatterportCarousel";
import { getDictionary } from "./dictionaries";
import MatterportCarousel from "@/components/landing/MatterportCarousel";
import ProjectsListing from "@/components/landing/ProjectsListing";
import PartnersSection from "@/components/landing/PartnersSection";
import MapSection from "@/components/landing/MapSection";

type Props = {
  params: Promise<{ lang: "en" | "fr" | "ar" }>;
};

const LandingPage = async ({ params }: Props) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isRtl = lang === "ar";

  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden font-montserrat"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Navigation */}
      <div className="flex justify-center w-full relative">
        <Navbar1 dict={dict.navbar} lang={lang} />
      </div>
      {/* Main Content*/}
      <main>
        <section className="relative isolate dark:bg-slate-950 bg-white text-white">
          <section id="home">
            <HeroSection1 dict={dict.hero} rtl={isRtl} />
          </section>
          {/* Process Section */}
          <section id="demo">
            {" "}
            <Demo dict={dict.demo} />
          </section>

          <section id="how-it-works">
            <AboutUsSteps dict={dict.about} rtl={isRtl} />
          </section>

          <section id="about">
            <AboutSection dict={dict.aboutSection} />
          </section>

           {/* Matterport Projects Listing (One per line) */}
           <section id="portfolio">
             <ProjectsListing dict={dict.projectsListing} rtl={isRtl} />
           </section>

           <PartnersSection dict={dict.partners} />

           {/* Matterport Projects Carousel
           <section id="projects">
             <MatterportCarousel dict={dict.carousel} />
           </section> */}
        </section>
        {/* CTA Section */}
        <div
          className="h-fit relative w-full bg-slate-900 flex flex-col items-center justify-center"
          style={{
            backgroundImage: "url(/images/Vector.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <section id="contact">
            <CTASection dict={dict.cta} />
            <FAQSection dict={dict.faq} />
          </section>
        </div>
      </main>

      {/* Map Section */}
      <MapSection dict={dict.map} />

      {/* Footer*/}
      <Footer dict={dict.footer} lang={lang} />
    </div>
  );
};

export default LandingPage;
