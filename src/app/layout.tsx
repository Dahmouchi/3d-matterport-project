import type { Metadata } from "next";
import { Geist, Geist_Mono, ADLaM_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { AOSInit } from "@/components/aos";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const adlamn = ADLaM_Display({
  variable: "--font-adlamn",
  subsets: ["latin"],
  weight: "400",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "500",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Changez ceci par votre vrai domaine (ex: https://build360.ma)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://build360.ma";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // 2. Title optimized for French
  title: {
    default: "Build360 - Donnez VIE à vos espaces | Expériences 3D Immersives",
    template: "%s | Build360 Maroc",
  },

  // 3. Description in French
  description:
    "Build360 transforme les espaces réels et numériques en expériences 3D immersives au Maroc. Que ce soit pour l'immobilier ou les projets créatifs, nous donnons vie aux environnements grâce au design interactif.",

  // 4. Keywords focused on Morocco/French market
  keywords: [
    "Expériences 3D",
    "Visite virtuelle Maroc",
    "Design immersif",
    "Immobilier 3D",
    "Espaces numériques",
    "Architecture interactive",
    "Build360",
    "Maroc",
    "Visualisation 3D",
  ],

  authors: [{ name: "Build360 Team" }],
  creator: "Build360",
  publisher: "Build360",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 5. OpenGraph for Facebook/LinkedIn sharing
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    title: "Build360 - Donnez VIE à vos espaces",
    description:
      "Transformez vos espaces en expériences 3D immersives et interactives.",
    siteName: "Build360 Maroc",
    images: [
      {
        url: "/images/steps/room6.png",
        width: 1200,
        height: 630,
        alt: "Aperçu Build360 Expérience Immersive",
      },
    ],
  },

  // 6. Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Build360 - Donnez VIE à vos espaces",
    description:
      "Création d'espaces 3D immersifs et visites virtuelles au Maroc.",
    images: ["/images/steps/room6.png"],
    creator: "@build360",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Correct: lang is set to French
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${adlamn.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
        <AOSInit />
      </body>
    </html>
  );
}
