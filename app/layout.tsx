// ============================================================
// QUANTUM — Layout racine
// Polices, métadonnées SEO complètes, structure HTML globale.
// ============================================================

import type { Metadata, Viewport } from "next";
import { Unbounded, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SITE } from "@/data/content";

// --- Polices (auto-hébergées par next/font : zéro requête externe) ---
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// --- SEO ----------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "QUANTUM is a civilization-scale technological initiative engineering the computational infrastructure of the next century. Quantum intelligence, simulation, security and autonomous discovery — designed as one system.",
  keywords: [
    "quantum computing",
    "quantum intelligence",
    "planetary scale computing",
    "scientific acceleration",
    "quantum infrastructure",
  ],
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "The future will not be discovered. It will be engineered.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: "The future will not be discovered. It will be engineered.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#02030a",
  width: "device-width",
  initialScale: 1,
};

// --- Données structurées (JSON-LD) ---------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  slogan: SITE.tagline,
  description:
    "A civilization-scale technological initiative engineering the computational infrastructure of the next century.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
