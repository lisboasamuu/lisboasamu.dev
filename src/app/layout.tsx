import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Samuel Lisboa — Software Engineering, Automation & AI",
    template: "%s — Samuel Lisboa",
  },
  description:
    "Portfolio de Samuel Lisboa, estudante de Engenharia de Software focado em desenvolvimento de software, automação, inteligência artificial e produtos digitais.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: siteConfig.domain,
    title: "Samuel Lisboa — Software Engineering, Automation & AI",
    description:
      "Software, automação, inteligência artificial e produtos digitais.",
    siteName: "Samuel Lisboa",
  },
  twitter: {
    card: "summary",
    title: "Samuel Lisboa — Software Engineering, Automation & AI",
    description:
      "Software, automação, inteligência artificial e produtos digitais.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
