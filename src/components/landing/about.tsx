import { motion } from "framer-motion";
import { Search, Sparkles, ScanEye, TrendingUp } from "lucide-react"; // Changed icons for better context

export default function AboutUsSteps() {
  const steps = [
    {
      title: "1. Audit & Stratégie",
      text: "Nous étudions votre espace et vos objectifs commerciaux pour définir le type de visite virtuelle le plus rentable pour vous.",
      icon: Search,
    },
    {
      title: "2. Scénarisation UX",
      text: "Nous concevons un parcours utilisateur fluide. Choix des points de vue stratégiques et design de l'interface interactive.",
      icon: Sparkles,
    },
    {
      title: "3. Captation & Tech",
      text: "Numérisation 4K avec technologie Matterport ou Laser. Création du jumeau numérique et intégration de vos médias (tags, vidéos).",
      icon: ScanEye, // Changed to ScanEye (more relevant for 3D)
    },
    {
      title: "4. Déploiement & Suivi",
      text: "Intégration sur votre site, Google Maps et réseaux sociaux. Formation de vos équipes et suivi des statistiques de visites.",
      icon: TrendingUp, // Changed to TrendingUp (implies ROI/Growth)
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f6ba13] via-orange-400 to-orange-600 lg:py-20 py-10">
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" />

      {/* Decorative Image (Desktop) */}
      <img
        src="/images/pro22.png"
        className="absolute bottom-0 right-2/3 lg:block hidden w-1/5 object-contain z-10"
        alt="Technicien Build360 réalisant un scan 3D au Maroc"
        title="Expertise 3D Build360"
        data-aos="fade-up"
        data-aos-delay="200"
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Title & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-20"
        >
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">
            De la vision à la{" "}
            <span className="bg-white/90 bg-clip-text text-transparent drop-shadow-sm">
              réalité virtuelle
            </span>
          </h2>
          <p className="mt-4 text-orange-50 text-lg leading-relaxed">
            Chez Build360, nous ne faisons pas que prendre des photos. Nous
            bâtissons une <strong>stratégie digitale immersive</strong>. Voici
            notre processus pour transformer vos espaces en outils de vente
            performants au Maroc.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-white text-orange-600 px-6 py-3 font-bold shadow-lg hover:shadow-xl hover:bg-slate-50 transition transform hover:-translate-y-1"
            >
              Lancer mon projet
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-6 py-3 text-white font-medium hover:bg-white/10 transition"
            >
              Voir des exemples
            </a>
          </div>
        </motion.div>

        {/* Right: Step-by-step Grid */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {steps.map((step, i) => (
            <li key={step.title} className="h-full w-full">
              <div className="group h-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-xl hover:shadow-orange-900/10">
                <div className="flex flex-col gap-4">
                  <div className="self-start rounded-xl text-orange-600 bg-white p-3 shadow-lg group-hover:scale-110 transition-transform">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-orange-50 text-sm leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Mobile Image */}
      <div
        className="flex justify-center relative z-10"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <img
          src="/images/pro22.png"
          className="block lg:hidden w-3/4 mt-8 drop-shadow-2xl"
          alt="Scan 3D Matterport Maroc"
        />
      </div>
    </section>
  );
}
