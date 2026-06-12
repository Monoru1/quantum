"use client";

// ============================================================
// QUANTUM — Section Why Quantum Matters
// Trois piliers investor-grade. Visuels génératifs CSS purs.
// ============================================================

import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { WHY } from "@/data/content";

const ACCENTS = ["#4d7cff", "#b47cff", "#f5e9c8"];

export default function WhyQuantum() {
  return (
    <section id="why" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>{WHY.eyebrow}</Eyebrow>
          <h2 className="display text-3xl md:text-5xl">{WHY.title}</h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {WHY.pillars.map((pillar, i) => (
            <Reveal key={pillar.name} delay={i * 0.1} className="h-full">
              <article
                className="relative h-full overflow-hidden rounded-md border border-white/10 bg-(--color-void-2)/50 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-white/25"
              >
                {/* Champ d'énergie génératif propre au pilier */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background: `radial-gradient(ellipse 90% 60% at 50% -10%, ${ACCENTS[i]}1f, transparent 70%)`,
                  }}
                />
                <div
                  className="relative mb-8 h-10 w-10 rounded-full"
                  style={{
                    border: `1px solid ${ACCENTS[i]}80`,
                    boxShadow: `0 0 24px ${ACCENTS[i]}40, inset 0 0 12px ${ACCENTS[i]}30`,
                  }}
                />
                <h3 className="display relative text-lg md:text-xl">
                  {pillar.name}
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-(--color-ink-dim)">
                  {pillar.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
