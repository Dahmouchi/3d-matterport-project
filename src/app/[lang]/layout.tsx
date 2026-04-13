import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  ADLaM_Display,
  Montserrat,
  Cairo,
} from "next/font/google";
import "../globals.css";
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
// 2. Configure the Arabic Font
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

// 1. Changez ceci par votre vrai domaine (ex: https://build360.ma)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://build360.ma";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  const metadataByLang: Record<
    string,
    {
      title: string;
      description: string;
      keywords: string[];
      ogTitle: string;
      ogDescription: string;
      altText: string;
    }
  > = {
    fr: {
      title: "Build360 : Création Visite Virtuelle Maroc & 3D Immersive",
      description:
        "Expert en création de visite virtuelle au Maroc (Casablanca, Rabat, Marrakech). Solutions 3D immersives pour l'immobilier, l'hôtellerie et l'industrie. Demandez votre devis gratuit.",
      keywords: [
        "Visite virtuelle Maroc",
        "Visite 360 degré",
        "Réalité virtuelle Immobilier",
        "Visite virtuelle Riad Hôtel",
        "Agence 3D Casablanca",
        "Scan 3D Maroc",
        "Build360",
        "Prix visite virtuelle Maroc",
      ],
      ogTitle: "Build360 - Donnez VIE à vos espaces",
      ogDescription:
        "Transformez vos espaces en expériences 3D immersives et interactives.",
      altText: "Aperçu Build360 Expérience Immersive",
    },
    en: {
      title: "Build360: Virtual Tour Creation in Morocco & Immersive 3D",
      description:
        "Expert in virtual tour creation in Morocco (Casablanca, Rabat, Marrakech). Immersive 3D solutions for real estate, hospitality, and industry. Request your free quote.",
      keywords: [
        "Virtual tour Morocco",
        "360 degree tour",
        "Virtual reality Real estate",
        "Virtual tour Riad Hotel",
        "3D Agency Casablanca",
        "3D Scan Morocco",
        "Build360",
        "Virtual tour price Morocco",
      ],
      ogTitle: "Build360 - Bring your spaces to LIFE",
      ogDescription:
        "Transform your spaces into immersive and interactive 3D experiences.",
      altText: "Build360 Immersive Experience Preview",
    },
    ar: {
      title: "Build360: إنشاء جولات افتراضية في المغرب وتجربة ثلاثية الأبعاد",
      description:
        "خبير في إنشاء جولات افتراضية في المغرب (الدار البيضاء، الرباط، مراكش). حلول ثلاثية الأبعاد غامرة للعقارات والفنادق والصناعة. اطلب عرض أسعار مجاني.",
      keywords: [
        "جولة افتراضية المغرب",
        "جولة 360 درجة",
        "الواقع الافتراضي للعقارات",
        "جولة افتراضية رياض فندق",
        "وكالة ثلاثية الأبعاد الدار البيضاء",
        "مسح ثلاثي الأبعاد المغرب",
        "Build360",
        "سعر الجولة الافتراضية المغرب",
      ],
      ogTitle: "Build360 - امنح الحياة لمساحاتك",
      ogDescription: "حول مساحاتك إلى تجارب ثلاثية الأبعاد غامرة وتفاعلية.",
      altText: "معاينة تجربة Build360 الغامرة",
    },
  };

  const currentMeta = metadataByLang[lang] || metadataByLang["fr"];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: currentMeta.title,
      template: "%s | Build360 Maroc",
    },
    description: currentMeta.description,
    keywords: currentMeta.keywords,
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
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : lang === "en" ? "en_US" : "ar_MA",
      url: siteUrl,
      title: currentMeta.ogTitle,
      description: currentMeta.ogDescription,
      siteName: "Build360 Maroc",
      images: [
        {
          url: "/images/steps/room6.png",
          width: 1200,
          height: 630,
          alt: currentMeta.altText,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: currentMeta.ogTitle,
      description: currentMeta.ogDescription,
      images: ["/images/steps/room6.png"],
      creator: "@build360",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  };
}
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "ar" }];
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const mainFontClass = lang === "ar" ? cairo.className : geistSans.className;

  return (
    // Correct: lang is set to French
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`
          ${mainFontClass} 
          ${geistMono.variable} 
          antialiased
        `}
      >
        {children}
        <Toaster position="top-center" />
        <AOSInit />
      </body>
    </html>
  );
}
