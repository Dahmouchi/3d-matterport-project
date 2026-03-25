import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqDict = {
  heading: string;
  subheading: string;
  items: FaqItem[];
};

const FAQSection = ({ dict }: { dict: FaqDict }) => {
  return (
    <section id="faq" className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(246,186,19,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(251,146,60,0.08),transparent_70%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className=" mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {dict.heading.split("Fréquentes").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <span className="bg-gradient-to-r from-[#f6ba13] via-orange-400 to-orange-600 bg-clip-text text-transparent">
                    Fréquentes
                  </span>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
            {!dict.heading.includes("Fréquentes") && (
              <span className="bg-gradient-to-r from-[#f6ba13] via-orange-400 to-orange-600 bg-clip-text text-transparent">
                {dict.heading}
              </span>
            )}
          </h2>
          <p className="text-lg text-gray-400">{dict.subheading}</p>
        </header>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto pb-4">
          <Accordion type="single" collapsible className="space-y-4">
            {dict.items.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#111827] border border-gray-800 rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow duration-300 data-[state=open]:shadow-lg data-[state=open]:border-[#f6ba13]/30"
              >
                <AccordionTrigger className="text-left text-white font-semibold text-lg hover:text-[#f6ba13] transition-colors py-6 [&[data-state=open]]:text-[#f6ba13]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed pb-6 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: dict.items.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
};

export default FAQSection;
