import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// A clean, characterful sans, loaded via next/font (self-hosted at build time,
// no layout shift). Exposed as a CSS variable that Tailwind reads.
const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Codobux CMS — Page Builder",
  description: "Block-based landing page builder with instant live preview.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-white font-sans text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
