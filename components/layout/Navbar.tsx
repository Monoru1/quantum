"use client";

// ============================================================
// QUANTUM — Navigation
// Invisible au chargement (le héros s'ouvre dans le noir total),
// elle n'apparaît qu'une fois le héros dépassé.
// ============================================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, NAV_LINKS } from "@/data/content";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-(--color-void)/75 backdrop-blur-md"
        >
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="#top" className="display text-sm tracking-[0.25em]">
              {SITE.name}
            </a>
            <ul className="hidden items-center gap-7 md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-[11px] tracking-[0.2em] text-(--color-ink-dim) transition-colors hover:text-(--color-ink)"
                  >
                    {link.label.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#timeline"
              className="font-mono text-[11px] tracking-[0.25em] text-(--color-cherenkov) transition-colors hover:text-(--color-ink)"
            >
              JOIN →
            </a>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
