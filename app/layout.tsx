import type { Metadata } from "next";
import { Geist, Geist_Mono, Rethink_Sans, Italianno } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const italianno = Italianno({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Adeola Martins - Product Designer",
    template: "%s | Adeola Martins"
  },
  description: "Portfolio of Adeola Martins, a Product Designer crafting intuitive digital experiences and impactful digital products.",
  openGraph: {
    title: "Adeola Martins - Product Designer",
    description: "Portfolio of Adeola Martins, a Product Designer crafting intuitive digital experiences and impactful digital products.",
    url: "/",
    siteName: "Adeola Martins",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adeola Martins - Product Designer",
    description: "Portfolio of Adeola Martins, a Product Designer crafting intuitive digital experiences and impactful digital products.",
  },
};

import { SmoothScroll } from "@/components/providers/smooth-scroll";

import { Navbar } from "@/components/navbar";

import { ScrollToTop } from "@/components/scroll-to-top";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, rethinkSans.variable, italianno.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col 2xl:container 2xl:mx-auto bg-[linear-gradient(164.34deg,#FFFFFF_-18.24%,#D3FBFD_-6.6%,#EFF1FD_25.14%,#FFFFFF_77.86%)]">
        <SmoothScroll>
          <ScrollToTop />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
