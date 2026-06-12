"use client";

// ============================================================
// QUANTUM — Section Timeline
// Pas une roadmap : un voyage. La section est épinglée et les
// huit phases défilent horizontalement au scroll (GSAP
// ScrollTrigger). Le bord droit s'évanouit : le visiteur ne
// voit jamais la fin.
// ============================================================

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";
import { TIMELINE } from "@/data/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !section.current || !track.current) return;

    const ctx = gsap.context(() => {
      const distance = () =>
        track.current!.scrollWidth - window.innerWidth + 120;

      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="timeline"
      ref={section}
      className="relative overflow-hidden py-24 md:h-svh md:py-0"
    >
      <div className="mx-auto flex h-full max-w-none flex-col justify-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Eyebrow>{TIMELINE.eyebrow}</Eyebrow>
          <h2 className="display text-3xl md:text-5xl">{TIMELINE.title}</h2>
        </div>

        {/* Piste horizontale — fondu à droite : l'horizon n'a pas de fin */}
        <div className="fade-right mt-16 overflow-hidden md:overflow-visible">
          <div
            ref={track}
            className="flex flex-col gap-10 px-6 md:flex-row md:gap-0 md:pl-[max(1.5rem,calc((100vw-72rem)/2))]"
          >
            {TIMELINE.phases.map((phase, i) => (
              <article
                key={phase.phase}
                className="relative shrink-0 md:w-[420px] md:pr-16"
              >
                {/* Ligne d'horizon */}
                <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-(--color-cherenkov)/60 to-(--color-cherenkov)/10 md:block" />
                <div className="relative">
                  <span className="relative z-10 inline-block size-[15px] rounded-full border border-(--color-cherenkov) bg-(--color-void) shadow-[0_0_18px_rgba(77,124,255,0.8)]" />
                </div>
                <p className="mt-6 font-mono text-xs tracking-[0.4em] text-(--color-cherenkov)">
                  {phase.phase}
                </p>
                <h3 className="display mt-3 text-xl md:text-3xl">
                  {phase.name}
                </h3>
                <p className="mt-3 max-w-xs text-sm text-(--color-ink-dim) md:text-base">
                  {phase.desc}
                </p>
                {/* Les dernières phases s'estompent vers l'horizon */}
                {i >= TIMELINE.phases.length - 2 && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-(--color-void)/70" />
                )}
              </article>
            ))}

            {/* Au-delà de la dernière phase : l'horizon continue */}
            <div className="hidden shrink-0 items-start pt-[7px] md:flex md:w-[60vw]">
              <div className="h-px w-full bg-gradient-to-r from-(--color-cherenkov)/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
