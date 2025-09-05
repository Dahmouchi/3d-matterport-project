import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
  {
    quote:
      "Grâce aux visites virtuelles, nous avons réduit les déplacements de nos clients de plus de moitié. C’est une vraie révolution pour l’immobilier au Maroc.",
    name: "Yassine El Idrissi",
    designation: "Directeur d’agence immobilière à Casablanca",
    src: "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8", // portrait style pro
  },
  {
    quote:
      "La solution nous a permis de présenter nos projets de construction de manière interactive et de gagner la confiance des investisseurs plus rapidement.",
    name: "Salma Benkiran",
    designation: "Architecte à Rabat",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "Votre concept est unique : une plateforme qui combine visualisation 3D, économies sur le terrain et engagement client. C’est exactement ce dont nous avions besoin pour moderniser notre workflow.",
    name: "Projet Concept",
    designation: "Client pilote — secteur BTP & Immobilier",
    src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

  return <div>
     <div className="text-center max-w-3xl mx-auto ">
    
      <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-black">
        Ils nous font confiance au{" "}
        <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
          Maroc
        </span>
      </h2>
      <p className="mt-3 text-slate-500">
        Découvrez comment notre concept transforme l’immobilier et la
        construction grâce à des expériences immersives et interactives.
      </p>
    </div>
    <AnimatedTestimonials testimonials={testimonials} />
  </div>;
}
