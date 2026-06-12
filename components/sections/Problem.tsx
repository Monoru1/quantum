"use client";

// ============================================================
// QUANTUM — Section "The Wall"
// L'humanité produit plus d'information qu'elle ne peut en
// comprendre. Chaque domaine est montré au bord de la
// saturation : barres rouges pulsantes, serveurs en surchauffe.
// ============================================================

import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { PROBLEM } from "@/data/content";

export default function Problem() {
  return (
    <section id="problem" className="relative px-6 py-32 md:py-44">
      {/* Lueur d'alarme en fond */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,77,94,0.07),transparent)]" />

      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow>{PROBLEM.eyebrow}</Eyebrow>
          <h2 className="display max-w-3xl text-3xl md:text-5xl">
            {PROBLEM.title}
          </h2>
          <p className="mt-6 max-w-2xl text-(--color-ink-dim) md:text-lg">
            {PROBLEM.body}
          </p>
        </Reveal>

        {/* Saturation par domaine */}
        <div className="mt-20 space-y-7">
          {PROBLEM.domains.map((domain, i) => (
            <Reveal key={domain.name} delay={i * 0.06}>
              <div className="group">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium md:text-lg">{domain.name}</h3>
                  <span className="font-mono text-xs text-(--color-alarm)">
                    {domain.load}% CAPACITY
                  </span>
                </div>
                <div className="mt-3 h-px w-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${domain.load}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bar-alarm h-px bg-gradient-to-r from-(--color-cherenkov) via-(--color-alarm) to-(--color-alarm) shadow-[0_0_12px_rgba(255,77,94,0.8)]"
                  />
                </div>
                <p className="mt-2 font-mono text-[11px] tracking-wide text-(--color-ink-dim)/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {domain.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="display mt-24 text-center text-2xl text-(--color-ink) md:text-4xl">
            {PROBLEM.conclusion}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
