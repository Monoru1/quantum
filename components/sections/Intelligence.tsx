"use client";

// ============================================================
// QUANTUM — Section Scientific Intelligence
// Cinq capacités, ton investor-grade, visuel génératif léger
// (gradients + grille), zéro image externe.
// ============================================================

import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { INTELLIGENCE } from "@/data/content";

export default function Intelligence() {
  return (
    <section id="intelligence" className="bg-blueprint relative px-6 py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#02030a,transparent_25%,transparent_75%,#02030a)]" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>{INTELLIGENCE.eyebrow}</Eyebrow>
          <h2 className="display max-w-3xl text-3xl md:text-5xl">
            {INTELLIGENCE.title}
          </h2>
          <p className="mt-6 max-w-2xl text-(--color-ink-dim) md:text-lg">
            {INTELLIGENCE.body}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/8 bg-white/8 md:grid-cols-2 lg:grid-cols-5">
          {INTELLIGENCE.capabilities.map((cap, i) => (
            <Reveal key={cap.tag} delay={i * 0.06} className="h-full">
              <article className="group flex h-full flex-col bg-(--color-void) p-6 transition-colors duration-500 hover:bg-(--color-void-2)">
                <p className="font-mono text-[11px] tracking-[0.3em] text-(--color-photon)">
                  {cap.tag}
                </p>
                <h3 className="mt-4 text-sm font-medium leading-snug md:text-base">
                  {cap.name}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-(--color-ink-dim) md:text-[13px]">
                  {cap.desc}
                </p>
                <span className="mt-auto block pt-5">
                  <span className="block h-px w-8 bg-(--color-photon)/40 transition-all duration-500 group-hover:w-full group-hover:bg-(--color-photon)" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
