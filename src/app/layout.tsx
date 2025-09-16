import type { Metadata } from "next";
import { Geist, Geist_Mono, ADLaM_Display,Montserrat } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Build360 - We are here, to make YOUR SPACE look ALIVE",
  description:
    "Build360 transforms real and digital spaces into immersive 3D experiences. Whether for businesses, affiliates, or creative projects, we bring environments to life with interactive design and modern technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${adlamn.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <Toaster 
        position="top-center"
        />
        {/*<ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
           
          </ThemeProvider>*/}
         
           <AOSInit />
      </body>
    </html>
  );
}
