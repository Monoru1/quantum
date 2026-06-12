// ============================================================
// QUANTUM — Pied de page
// ============================================================

import { SITE } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-mono text-[11px] tracking-[0.3em] text-(--color-ink-dim)">
          {SITE.name} — {SITE.tagline.toUpperCase()}
        </p>
        <p className="font-mono text-[11px] text-(--color-ink-dim)/60">
          © {new Date().getFullYear()} QUANTUM INITIATIVE. ALL FUTURES RESERVED.
        </p>
      </div>
    </footer>
  );
}
