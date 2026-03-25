import { Building2, Hotel, Store } from "lucide-react";

type ServiceItem = {
  title: string;
  description: string;
  features: string[];
};

type AboutSectionDict = {
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
  heading5: string;
  subheading: string;
  ctaQuote: string;
  ctaRealisations: string;
  readyText: string;
  services: ServiceItem[];
};

const SERVICE_ICONS = [Building2, Hotel, Store];

const AboutSection = ({ dict }: { dict: AboutSectionDict }) => {
  const services = dict.services.map((s, i) => ({
    ...s,
    icon: SERVICE_ICONS[i],
  }));

  return (
    <section className="relative py-8 lg:py-12 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(246,186,19,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.08),transparent_50%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Section */}
        <header className=" mx-auto text-center mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-20 mb-8">
            <span className="text-gray-900">{dict.heading1}</span>
            <span className="bg-gradient-to-r from-[#f6ba13] via-orange-400 to-orange-600 bg-clip-text text-transparent">
              {dict.heading2}
            </span>
            <span className="text-gray-900">{dict.heading3}</span>
            <span className="bg-gradient-to-r from-[#f6ba13] via-orange-400 to-orange-600 bg-clip-text text-transparent">
              {dict.heading4}
            </span>
            <span className="text-gray-900">{dict.heading5}</span>
          </h1>

          <p className="text-md sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {dict.subheading}
          </p>
        </header>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 150}ms` }}
                className="group relative w-full h-full cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1"
              >
                <div className="relative h-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#f6ba13] via-orange-400 to-orange-600 shadow-2xl backdrop-blur-xl transition-all duration-700 hover:shadow-orange-500/40 hover:shadow-3xl">
                  {/* Background Effects */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div
                      style={{ animationDelay: "0.5s" }}
                      className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-white blur-[100px] opacity-20 group-hover:opacity-40 transform group-hover:scale-110 transition-all duration-700 animate-bounce"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col items-center text-center p-8 h-full">
                    {/* Icon Container */}
                    <div className="relative mb-8">
                      <div className="absolute inset-0 rounded-full border-2 border-white/60 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                      <div className="relative p-5 rounded-full shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 bg-white/90 backdrop-blur-md border border-white/50">
                        <service.icon className="w-8 h-8 text-orange-600 drop-shadow-sm" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <h3 className="text-2xl font-extrabold text-white group-hover:text-black transition-all duration-300 drop-shadow-sm">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-white text-sm leading-relaxed mb-6 font-medium">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mt-auto">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="text-gray-800/70 text-xs uppercase tracking-wider font-bold group-hover:text-black transition-colors duration-300"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Decorative Line */}
                    <div className="mt-8 w-12 h-1 rounded-full bg-white/70 group-hover:w-24 transition-all duration-500 group-hover:bg-white" />

                    {/* Dots */}
                    <div className="flex space-x-1 mt-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                      <div
                        style={{ animationDelay: "0.1s" }}
                        className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce"
                      />
                      <div
                        style={{ animationDelay: "0.2s" }}
                        className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">{dict.readyText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#f6ba13] via-orange-400 to-orange-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {dict.ctaQuote}
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border-2 border-gray-300 text-gray-900 font-semibold text-lg hover:border-[#f6ba13] hover:text-[#f6ba13] transition-all duration-300"
            >
              {dict.ctaRealisations}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
