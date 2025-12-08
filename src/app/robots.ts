import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://build360.ma";

  return {
    rules: {
      userAgent: "*", // Tous les robots (Google, Bing, etc.)
      allow: "/", // Tout est autorisé
      disallow: "/private/", // (Optionnel) Bloquer les dossiers privés si vous en avez
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Le chemin vers votre sitemap généré
  };
}
