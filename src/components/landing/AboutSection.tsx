"use client";

import { useEffect, useRef, useState } from "react";

type SectorDict = {
  title: string;
  description: string;
};

type AboutSectionProps = {
  dict: {
    sectors: SectorDict[];
  };
};

// Static data that doesn't change per language
const SECTOR_IMAGES = [
  "https://images.pexels.com/photos/18844906/pexels-photo-18844906.jpeg",
  "https://images.pexels.com/photos/2288281/pexels-photo-2288281.jpeg",
  "https://images.pexels.com/photos/3726902/pexels-photo-3726902.png",
  "https://images.pexels.com/photos/31611195/pexels-photo-31611195.jpeg",
];

const SECTOR_THEMES: ("light" | "dark")[] = ["light", "dark", "light", "dark"];

export default function StickyCardsSection({ dict }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const sectors = dict.sectors.map((s, i) => ({
    id: i + 1,
    title: s.title,
    description: s.description,
    image: SECTOR_IMAGES[i] ?? SECTOR_IMAGES[0],
    theme: SECTOR_THEMES[i] ?? ("light" as const),
  }));

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const sectionScrollable = rect.height - window.innerHeight;

      if (sectionTop < 0 || sectionTop > sectionScrollable) return;

      const perCard = sectionScrollable / (sectors.length - 1);
      const rawIndex = sectionTop / perCard;
      const currentCard = Math.min(Math.floor(rawIndex), sectors.length - 1);
      const cardProgress = rawIndex - currentCard;

      setActiveIndex(currentCard);
      setProgress(cardProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectors.length]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${sectors.length * 100}vh` }}
      className="relative"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4 md:px-20 lg:py-6">
        <div
          className="relative w-full overflow-hidden rounded-[10px]"
          style={{ height: "min(600px, 80vh)" }}
        >
          {sectors.map((sector, index) => {
            const isActive = index === activeIndex;
            const isNext = index === activeIndex + 1;
            const isPast = index < activeIndex;

            let transform = "";
            let scale = 1;

            if (isPast) {
              transform = "translateY(-100%)";
              scale = 0.93;
            } else if (isActive) {
              scale = 1 - progress * 0.07;
              const yDrift = -progress * 3;
              transform = `translateY(${yDrift}%)`;
            } else if (isNext) {
              const yPos = 100 - progress * 100;
              transform = `translateY(${yPos}%)`;
              scale = 0.93 + progress * 0.07;
            } else {
              transform = "translateY(100%)";
              scale = 0.93;
            }

            const isDark = sector.theme === "dark";

            return (
              <div
                key={sector.id}
                className="absolute inset-0 flex flex-col md:flex-row overflow-hidden rounded-lg lg:rounded-[1.5rem]"
                style={{
                  backgroundColor: isDark ? "#000000" : "#f9fafb",
                  transform: `${transform} scale(${scale})`,
                  transition:
                    !isActive && !isNext ? "transform 0.05s linear" : "none",
                  willChange: "transform",
                  transformOrigin: "center bottom",
                  zIndex: isNext ? 10 : isActive ? 9 : index,
                }}
              >
                {/* Image side */}
                <div className="relative flex-shrink-0 w-full h-[60%] min-h-[300px] md:h-auto md:w-[50%] md:p-[24px_0_24px_24px] md:min-h-0">
                  <div className="w-full h-full md:rounded-[8px] overflow-hidden relative">
                    {/* Mobile gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden z-10" />
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="object-cover w-full bg-top h-full absolute inset-0"
                    />
                    {/* Counter badge (mobile) */}
                    <div className="absolute top-4 right-4 z-20 text-[10px] text-white/80 bg-black/40 px-2.5 py-1 rounded-full tracking-wide md:hidden">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(sectors.length).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                {/* Text side */}
                <div className="flex-1 flex flex-col justify-center p-[20px] md:p-[30px_60px_30px_40px] overflow-hidden">
                  <div className="flex flex-col gap-3 md:gap-6">
                    {/* Counter (desktop) */}
                    <span
                      className="hidden md:block text-[13px] font-mono tracking-widest"
                      style={{ color: isDark ? "#555" : "#999" }}
                    >
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(sectors.length).padStart(2, "0")}
                    </span>

                    <h3
                      className="text-[24px] md:text-[36px] lg:text-[46px] font-medium leading-[1.1] tracking-[-0.025em] m-0"
                      style={{ color: isDark ? "#ffffff" : "#101014" }}
                    >
                      {sector.title}
                    </h3>
                    <p
                      className="text-[13px] md:text-[18px] lg:text-[19px] leading-[150%] tracking-[-0.1px] m-0 max-w-full md:max-w-[540px]"
                      style={{
                        color: isDark ? "#aaaaaa" : "#28282C",
                        opacity: isDark ? 1 : 0.8,
                      }}
                    >
                      {sector.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
