import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name — Creative Developer",
  description: "Design & creative development portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-white antialiased selection:bg-accent/30">
        {children}
      </body>
    </html>
  );
}
