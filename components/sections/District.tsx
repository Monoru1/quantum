"use client";

// ============================================================
// QUANTUM — Section District
// Pas un campus : une cité. Une skyline générative dessinée en
// SVG (tours de recherche, dômes, antennes) au-dessus d'une
// grille de secteurs.
// ============================================================

import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { DISTRICT } from "@/data/content";

// Skyline stylisée — chaque silhouette est un bâtiment du district
const SKYLINE = [
  { x: 0, w: 60, h: 120 },
  { x: 70, w: 36, h: 210 },
  { x: 116, w: 80, h: 90 },
  { x: 206, w: 44, h: 260 },
  { x: 260, w: 70, h: 150 },
  { x: 340, w: 30, h: 300 },
  { x: 380, w: 90, h: 110 },
  { x: 480, w: 50, h: 230 },
  { x: 540, w: 70, h: 170 },
  { x: 620, w: 38, h: 280 },
  { x: 668, w: 90, h: 130 },
  { x: 768, w: 56, h: 200 },
  { x: 834, w: 80, h: 100 },
  { x: 924, w: 40, h: 250 },
  { x: 974, w: 26, h: 320 },
];

export default function District() {
  return (
    <section
      id="district"
      className="bg-blueprint relative overflow-hidden px-6 py-32 md:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(77,124,255,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>{DISTRICT.eyebrow}</Eyebrow>
          <h2 className="display max-w-3xl text-3xl md:text-5xl">
            {DISTRICT.title}
          </h2>
          <p className="mt-6 max-w-2xl text-(--color-ink-dim) md:text-lg">
            {DISTRICT.body}
          </p>
        </Reveal>

        {/* Skyline générative */}
        <Reveal className="mt-16">
          <svg
            viewBox="0 0 1000 340"
            className="h-auto w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="tower" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4d7cff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4d7cff" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            {SKYLINE.map((b, i) => (
              <g key={i}>
                <rect
                  x={b.x}
                  y={340 - b.h}
                  width={b.w}
                  height={b.h}
                  fill="url(#tower)"
                  stroke="#4d7cff"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                />
                {/* Feux de signalisation au sommet des tours hautes */}
                {b.h > 200 && (
                  <circle
                    cx={b.x + b.w / 2}
                    cy={336 - b.h}
                    r="2.5"
                    fill="#f5e9c8"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0.2;1"
                      dur={`${2 + i * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            ))}
            <line
              x1="0"
              y1="340"
              x2="1000"
              y2="340"
              stroke="#4d7cff"
              strokeOpacity="0.5"
            />
          </svg>
        </Reveal>

        {/* Les secteurs de la cité */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-5">
          {DISTRICT.sectors.map((sector, i) => (
            <Reveal key={sector.name} delay={(i % 5) * 0.05}>
              <div className="group h-full bg-(--color-void) p-5 transition-colors duration-500 hover:bg-(--color-void-2)">
                <p className="font-mono text-[10px] tracking-[0.25em] text-(--color-cherenkov)/70">
                  SECTOR {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-sm font-medium leading-snug">
                  {sector.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-(--color-ink-dim)">
                  {sector.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-16 max-w-2xl text-(--color-ink-dim) italic md:text-lg">
            {DISTRICT.conclusion}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
