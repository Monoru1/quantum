"use client";

// ============================================================
// QUANTUM — Section Industries
// Pas de cartes. Des scènes cinématiques pleine largeur :
// chaque industrie a sa propre teinte, son propre champ
// d'énergie radial, sa propre accroche — un trailer par scène.
// ============================================================

import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { INDUSTRIES } from "@/data/content";

export default function Industries() {
  return (
    <section id="industries" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>{INDUSTRIES.eyebrow}</Eyebrow>
        </Reveal>
      </div>

      <div className="mt-10">
        {INDUSTRIES.scenes.map((scene, i) => (
          <div
            key={scene.name}
            className="relative overflow-hidden border-t border-white/8"
          >
            {/* Champ d'énergie de la scène (teinte propre à l'industrie) */}
            <div
              className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse 70% 90% at ${
                  i % 2 === 0 ? "85%" : "15%"
                } 50%, hsl(${scene.hue} 90% 60% / 0.13), transparent 65%)`,
              }}
            />
            {/* Lignes de balayage cinématiques */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, white 0 1px, transparent 1px 4px)",
              }}
            />

            <div
              className={`relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-20 md:py-28 ${
                i % 2 === 0 ? "md:items-start" : "md:items-end md:text-right"
              }`}
            >
              <Reveal>
                <p
                  className="font-mono text-xs tracking-[0.4em]"
                  style={{ color: `hsl(${scene.hue} 90% 70%)` }}
                >
                  {scene.name.toUpperCase()}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <motion.h3
                  className="display max-w-2xl text-2xl md:text-4xl"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {scene.headline}
                </motion.h3>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="max-w-xl text-(--color-ink-dim) md:text-lg">
                  {scene.body}
                </p>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
