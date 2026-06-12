// ============================================================
// QUANTUM — Image Open Graph générée au build (next/og)
// Visuel premium 1200×630 pour les partages sociaux,
// sans aucun fichier image externe.
// ============================================================

import { ImageResponse } from "next/og";
import { SITE } from "@/data/content";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, #0a1030 0%, #02030a 70%)",
          color: "#e6e9f5",
          fontFamily: "sans-serif",
        }}
      >
        {/* Anneau quantique */}
        <div
          style={{
            position: "absolute",
            width: 460,
            height: 460,
            borderRadius: 9999,
            border: "2px solid rgba(77,124,255,0.5)",
            boxShadow: "0 0 120px rgba(77,124,255,0.35)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 460,
            height: 140,
            borderRadius: 9999,
            border: "2px solid rgba(180,124,255,0.45)",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 110,
            letterSpacing: 18,
            fontWeight: 700,
            textShadow: "0 0 60px rgba(77,124,255,0.8)",
            display: "flex",
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            letterSpacing: 14,
            color: "#8a92b0",
            display: "flex",
          }}
        >
          {SITE.tagline.toUpperCase()}
        </div>
      </div>
    ),
    size
  );
}
