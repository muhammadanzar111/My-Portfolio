import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Muhammad Anzar — Data Science & AI",
  description: "Data Science, AI prompt engineering & e-commerce growth portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-bg text-white antialiased selection:bg-accent/30 font-body">
        {children}
      </body>
    </html>
  );
}
