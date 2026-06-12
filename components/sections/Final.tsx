"use client";

// ============================================================
// QUANTUM — Section Finale
// Tout retombe dans le noir. L'univers du début revient — plus
// brillant. Le message final s'écrit ligne par ligne, puis la
// seule touche d'or du site : ENTER THE FUTURE.
// ============================================================

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FINAL, SITE } from "@/data/content";

const QuantumUniverse = dynamic(
  () => import("@/components/3d/QuantumUniverse"),
  { ssr: false }
);

export default function Final() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-32">
      {/* L'univers revient — intensité supérieure au héros */}
      <QuantumUniverse intensity={1.5} revealDuration={2.5} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#02030a_92%)]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {FINAL.lines.map((line, i) => {
          const isBreakthrough = i >= 1 && i <= 4; // Fire / Electricity / Flight / Computation
          return (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.25 }}
              className={
                isBreakthrough
                  ? "display my-2 text-2xl text-(--color-ink) md:text-4xl"
                  : "my-6 text-lg text-(--color-ink-dim) md:text-xl"
              }
            >
              {line}
            </motion.p>
          );
        })}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1.9 }}
          className="mt-20"
        >
          <p className="display glow-fusion text-4xl tracking-[0.1em] text-(--color-fusion) md:text-6xl">
            {SITE.name}
          </p>
          <p className="mt-4 font-mono text-xs tracking-[0.5em] text-(--color-ink-dim)">
            {SITE.tagline.toUpperCase()}
          </p>

          <a
            href="#top"
            className="group mt-14 inline-flex items-center gap-4 border border-(--color-fusion)/40 px-10 py-4 font-mono text-sm tracking-[0.35em] text-(--color-fusion) transition-all duration-500 hover:border-(--color-fusion) hover:bg-(--color-fusion)/10 hover:shadow-[0_0_40px_rgba(245,233,200,0.25)]"
          >
            {FINAL.cta}
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
