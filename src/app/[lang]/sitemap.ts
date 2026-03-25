import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://build360.ma";

  return [
    {
      url: baseUrl, // La racine du site (/)
      lastModified: new Date(),
      changeFrequency: "weekly", // "weekly" est bien si vous mettez à jour vos projets souvent
      priority: 1, // Priorité maximale absolue
    },
  ];
}
