import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadanzar.vercel.app"),
  title: "Muhammad Anzar — Data Science & AI",
  description:
    "Personal portfolio of Muhammad Anzar — Data Science, AI prompt engineering & e-commerce growth strategist. Browse projects, certifications, and get in touch.",
  keywords: ["Data Science", "Artificial Intelligence", "E-commerce", "Portfolio", "Muhammad Anzar"],
  authors: [{ name: "Muhammad Anzar" }],
  openGraph: {
    title: "Muhammad Anzar — Data Science & AI Portfolio",
    description:
      "Explore projects, certifications, and skills of Muhammad Anzar — Data Scientist & AI specialist.",
    url: "https://muhammadanzar.vercel.app",
    type: "website",
    images: [
      {
        url: "/images/portrait.jpg",
        width: 731,
        height: 1024,
        alt: "Muhammad Anzar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Anzar — Data Science & AI",
    description: "Data Science, AI prompt engineering & e-commerce growth portfolio",
    images: ["/images/portrait.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      id="top"
      className={`dark ${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="bg-bg text-white antialiased selection:bg-indigo-500/30 font-body grain">
        {children}
        <ScrollProgress />
      </body>
    </html>
  );
}
