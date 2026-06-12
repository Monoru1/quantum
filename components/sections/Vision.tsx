"use client";

// ============================================================
// QUANTUM — Section Vision
// La sphère holographique : tout l'écosystème dans une seule
// structure vivante que l'utilisateur peut faire tourner et
// explorer.
// ============================================================

import dynamic from "next/dynamic";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { VISION } from "@/data/content";

const VisionSphere = dynamic(() => import("@/components/3d/VisionSphere"), {
  ssr: false,
});

export default function Vision() {
  return (
    <section id="vision" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>{VISION.eyebrow}</Eyebrow>
          <h2 className="display max-w-3xl text-3xl md:text-5xl">
            {VISION.title}
          </h2>
          <p className="mt-6 max-w-2xl text-(--color-ink-dim) md:text-lg">
            {VISION.body}
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* La sphère interactive */}
          <Reveal className="relative h-[420px] md:h-[560px]">
            <VisionSphere />
            <p className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 font-mono md:block text-[10px] tracking-[0.3em] text-(--color-ink-dim)/60">
              DRAG TO ROTATE — SCROLL TO ZOOM
            </p>
          </Reveal>

          {/* Les sept systèmes */}
          <div className="space-y-1">
            {VISION.nodes.map((node, i) => (
              <Reveal key={node.label} delay={i * 0.05}>
                <div className="group border-b border-white/8 py-4 transition-colors hover:border-(--color-cherenkov)/40">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-(--color-cherenkov)">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-medium md:text-lg">{node.label}</h3>
                  </div>
                  <p className="mt-1 pl-9 text-sm text-(--color-ink-dim)">
                    {node.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
