"use client";

// ============================================================
// QUANTUM — Section Investor Brief
// Quatre faits structurants + CTA. Fond aurora génératif
// (CSS pur, zéro image).
// ============================================================

import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { INVESTOR } from "@/data/content";

export default function InvestorBrief() {
  return (
    <section id="investors" className="relative overflow-hidden px-6 py-32 md:py-44">
      {/* Visuel génératif premium */}
      <div className="aurora" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow>{INVESTOR.eyebrow}</Eyebrow>
          <h2 className="display max-w-3xl text-3xl md:text-5xl">
            {INVESTOR.title}
          </h2>
          <p className="mt-6 max-w-2xl text-(--color-ink-dim) md:text-lg">
            {INVESTOR.body}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {INVESTOR.facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 0.07} className="h-full">
              <div className="h-full bg-(--color-void)/90 p-6 backdrop-blur-sm">
                <p className="font-mono text-[10px] tracking-[0.35em] text-(--color-cherenkov)">
                  {fact.label}
                </p>
                <p className="mt-3 font-medium leading-snug md:text-lg">
                  {fact.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-(--color-ink-dim)">
                  {fact.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <a
            href={INVESTOR.cta.href}
            className="group mt-12 inline-flex items-center gap-4 border border-(--color-cherenkov)/50 px-9 py-4 font-mono text-xs tracking-[0.35em] text-(--color-cherenkov) transition-all duration-500 hover:border-(--color-cherenkov) hover:bg-(--color-cherenkov)/10 hover:shadow-[0_0_36px_rgba(77,124,255,0.25)]"
          >
            {INVESTOR.cta.label}
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
