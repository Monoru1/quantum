"use client";

// ============================================================
// QUANTUM — Section Architecture
// Les sept couches de l'infrastructure, empilées du planétaire
// vers l'humain. Des flux d'énergie animés traversent la pile
// en continu : tout est vivant.
// ============================================================

import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { ARCHITECTURE } from "@/data/content";

export default function Architecture() {
  const layers = ARCHITECTURE.layers;

  return (
    <section id="architecture" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Eyebrow>{ARCHITECTURE.eyebrow}</Eyebrow>
          <h2 className="display max-w-3xl text-3xl md:text-5xl">
            {ARCHITECTURE.title}
          </h2>
        </Reveal>

        <div className="relative mt-20">
          {/* Conduits verticaux de flux (énergie / données / savoir) */}
          <div className="pointer-events-none absolute inset-y-0 left-[12%] hidden w-px overflow-hidden bg-white/8 md:block">
            <span className="energy-flow absolute h-24 w-px bg-gradient-to-b from-transparent via-(--color-cherenkov) to-transparent" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-[12%] hidden w-px overflow-hidden bg-white/8 md:block">
            <span
              className="energy-flow absolute h-24 w-px bg-gradient-to-b from-transparent via-(--color-photon) to-transparent"
              style={{ animationDelay: "1.4s" }}
            />
          </div>

          {/* La pile — du planétaire (bas) à l'humain (haut) */}
          <div className="space-y-3">
            {[...layers].reverse().map((layer, i) => {
              const depth = layers.length - 1 - i; // 0 = humain, 6 = planétaire
              return (
                <Reveal key={layer.name} delay={i * 0.07}>
                  <div
                    className="group relative rounded-sm border border-white/10 bg-(--color-void-2)/60 px-6 py-5 backdrop-blur-sm transition-all duration-500 hover:border-(--color-cherenkov)/50 md:mx-auto"
                    style={{ width: `${100 - depth * 4}%` }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-medium md:text-lg">{layer.name}</h3>
                      <p className="font-mono text-[11px] tracking-wide text-(--color-ink-dim)">
                        {layer.desc}
                      </p>
                    </div>
                    {/* Indicateur de flux ascendant */}
                    {i < layers.length - 1 && (
                      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-(--color-cherenkov)/60">
                        ↑
                      </span>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 flex justify-between font-mono text-[10px] tracking-[0.3em] text-(--color-ink-dim)/60">
              <span>FOUNDATION : PLANETARY</span>
              <span>DESTINATION : HUMAN</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
