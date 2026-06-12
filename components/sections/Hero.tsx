"use client";

// ============================================================
// QUANTUM — Section Héros
// L'écran s'ouvre dans le noir total. Une pulsation. Puis des
// milliers. L'univers se forme, puis QUANTUM est révélé —
// pas animé : révélé.
// ============================================================

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SITE, MANIFESTO } from "@/data/content";

// Le canvas 3D est chargé côté client uniquement (WebGL)
const QuantumUniverse = dynamic(
  () => import("@/components/3d/QuantumUniverse"),
  { ssr: false }
);

export default function Hero() {
  return (
    <section className="relative flex h-svh min-h-[640px] items-center justify-center overflow-hidden">
      {/* L'univers — élément signature */}
      <QuantumUniverse intensity={1} revealDuration={4} />

      {/* Vignette : la lumière naît du centre */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#02030a_95%)]" />

      <div className="pointer-events-none relative z-10 px-6 text-center">
        {/* Le nom — révélé, pas animé : un simple fondu lent, massif */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 2.4, ease: "linear" }}
          className="display glow-cherenkov text-[clamp(3rem,12vw,9.5rem)] tracking-[0.08em] text-(--color-ink)"
        >
          {SITE.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 1.6 }}
          className="mt-6 font-mono text-[clamp(0.7rem,1.6vw,1rem)] tracking-[0.55em] text-(--color-ink-dim)"
        >
          {SITE.tagline.toUpperCase()}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.4, duration: 1.4 }}
          className="mx-auto mt-12 max-w-xl text-balance text-base text-(--color-ink-dim) md:text-lg"
        >
          {SITE.heroLine}
        </motion.p>
      </div>

      {/* Manifeste — défile en marge basse, discret */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6.2, duration: 1.5 }}
        className="absolute bottom-8 left-0 right-0 z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 font-mono text-[10px] tracking-[0.2em] text-(--color-ink-dim)/60"
      >
        {MANIFESTO.slice(0, 5).map((line) => (
          <span key={line}>{line.toUpperCase()}</span>
        ))}
        <span className="text-(--color-cherenkov)">
          {MANIFESTO[6].toUpperCase()}
        </span>
      </motion.div>
    </section>
  );
}
