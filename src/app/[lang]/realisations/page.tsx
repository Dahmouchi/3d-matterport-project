// app/realisations/page.tsx
import RealisationsPage from "@/components/RealisationsPage";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Navbar1 from "@/components/landing/NavBar";
import MapSection from "@/components/landing/MapSection";
import Footer from "@/components/landing/footer";
import CTASection from "@/components/landing/cta-section";
import FAQSection from "@/components/landing/FAQSection";
type Props = {
  params: Promise<{ lang: "en" | "fr" | "ar" }>;
};

const RealisationsRoute = async ({ params }: Props) => {
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
        <Navbar1 dict={dict.navbar} lang={lang} color="white" />
      </div>
      <RealisationsPage dict={dict.projectsListing} rtl={isRtl} />
      {/* Map Section */}
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
      <MapSection dict={dict.map} />
      {/* Footer*/}
      <Footer dict={dict.footer} lang={lang} />
    </div>
  );
};

export default RealisationsRoute;

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "ar" }];
}
