"use client";

// ============================================================
// QUANTUM — Section Simulation
// Sphère de Bloch stylisée 100 % SVG (zéro asset externe, léger).
// Un qubit en superposition : le vecteur d'état précesse, le
// bouton "Run Simulation" effectue une mesure probabiliste qui
// fait s'effondrer l'état vers |0⟩ ou |1⟩ selon ses amplitudes.
// ============================================================

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { SIMULATION } from "@/data/content";

const R = 120; // rayon de la sphère (unités SVG)

type Status = "superposition" | "measuring" | "measured";

function randomTheta() {
  // Angle polaire entre 0.2π et 0.8π : superposition franche
  return Math.PI * (0.2 + Math.random() * 0.6);
}

export default function Simulation() {
  const [theta, setTheta] = useState(0.42 * Math.PI);
  const [status, setStatus] = useState<Status>("superposition");
  const [result, setResult] = useState<0 | 1 | null>(null);
  const [runs, setRuns] = useState<{ zeros: number; ones: number }>({
    zeros: 0,
    ones: 0,
  });

  // Probabilités de Born : P(|0⟩) = cos²(θ/2)
  const p0 = Math.cos(theta / 2) ** 2;
  const p1 = 1 - p0;

  // Précession du vecteur d'état — pilotée hors React (refs), 0 re-render
  const phi = useRef(0);
  const speed = useRef(0.8);
  const collapse = useRef<{ active: boolean; target: number; t: number }>({
    active: false,
    target: 0,
    t: 0,
  });
  const thetaRef = useRef(theta);
  const vecRef = useRef<SVGLineElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const trailRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    thetaRef.current = theta;
  }, [theta]);

  useAnimationFrame((_, delta) => {
    const dt = delta / 1000;
    phi.current += speed.current * dt * Math.PI * 2 * 0.25;

    let th = thetaRef.current;
    if (collapse.current.active) {
      // Effondrement : interpolation vers le pôle mesuré
      collapse.current.t = Math.min(collapse.current.t + dt * 2.2, 1);
      const k = 1 - Math.pow(1 - collapse.current.t, 3); // ease-out cubic
      th = th + (collapse.current.target - th) * k;
      if (collapse.current.t >= 1) {
        collapse.current.active = false;
        thetaRef.current = collapse.current.target;
      }
    }

    // Projection pseudo-3D du vecteur d'état
    const x = R * Math.sin(th) * Math.cos(phi.current);
    const y = -R * Math.cos(th);
    const depth = Math.sin(th) * Math.sin(phi.current); // -1 (arrière) → 1 (avant)

    if (vecRef.current && tipRef.current) {
      vecRef.current.setAttribute("x2", String(x));
      vecRef.current.setAttribute("y2", String(y));
      vecRef.current.setAttribute(
        "stroke-opacity",
        String(0.55 + 0.45 * (depth + 1) * 0.5)
      );
      tipRef.current.setAttribute("cx", String(x));
      tipRef.current.setAttribute("cy", String(y));
      tipRef.current.setAttribute("r", String(5 + 2.5 * (depth + 1) * 0.5));
    }
    if (trailRef.current) {
      // Orbite de précession à la latitude courante
      trailRef.current.setAttribute("cy", String(-R * Math.cos(th)));
      trailRef.current.setAttribute("rx", String(R * Math.sin(th)));
      trailRef.current.setAttribute("ry", String(R * Math.sin(th) * 0.28));
    }
  });

  function runMeasurement() {
    if (status === "measuring") return;
    setStatus("measuring");
    setResult(null);
    speed.current = 7; // le système "chauffe" avant la mesure

    setTimeout(() => {
      const outcome: 0 | 1 = Math.random() < p0 ? 0 : 1;
      collapse.current = {
        active: true,
        target: outcome === 0 ? 0.02 : Math.PI - 0.02,
        t: 0,
      };
      speed.current = 0.8;
      setResult(outcome);
      setStatus("measured");
      setRuns((r) =>
        outcome === 0 ? { ...r, zeros: r.zeros + 1 } : { ...r, ones: r.ones + 1 }
      );
    }, 1100);
  }

  function prepareSuperposition() {
    const next = randomTheta();
    setTheta(next);
    thetaRef.current = next;
    collapse.current.active = false;
    setResult(null);
    setStatus("superposition");
  }

  const alpha = Math.cos(theta / 2);
  const beta = Math.sin(theta / 2);

  return (
    <section id="simulation" className="relative px-6 py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_30%_50%,rgba(180,124,255,0.07),transparent)]" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>{SIMULATION.eyebrow}</Eyebrow>
          <h2 className="display max-w-3xl text-3xl md:text-5xl">
            {SIMULATION.title}
          </h2>
          <p className="mt-6 max-w-2xl text-(--color-ink-dim) md:text-lg">
            {SIMULATION.body}
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* --- Sphère de Bloch --- */}
          <Reveal className="flex justify-center">
            <svg
              viewBox="-170 -170 340 340"
              className="w-full max-w-[420px]"
              role="img"
              aria-label="Bloch sphere — qubit state visualization"
            >
              <defs>
                <radialGradient id="bloch-glow" cx="35%" cy="30%">
                  <stop offset="0%" stopColor="#4d7cff" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#4d7cff" stopOpacity="0.02" />
                </radialGradient>
              </defs>

              {/* Lignes d'énergie de fond */}
              {[0.45, 0.7, 1].map((k) => (
                <circle
                  key={k}
                  r={R * k + 28}
                  fill="none"
                  stroke="#4d7cff"
                  strokeOpacity={0.07}
                  strokeDasharray="2 7"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0"
                    to={k > 0.6 ? "360" : "-360"}
                    dur={`${24 * k + 12}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              {/* Sphère */}
              <circle r={R} fill="url(#bloch-glow)" stroke="#4d7cff" strokeOpacity="0.45" />
              <ellipse rx={R} ry={R * 0.28} fill="none" stroke="#4d7cff" strokeOpacity="0.25" />
              <line x1="0" y1={-R - 18} x2="0" y2={R + 18} stroke="#8a92b0" strokeOpacity="0.3" strokeDasharray="3 5" />

              {/* Pôles */}
              <text x="12" y={-R - 6} className="fill-(--color-ink)" fontSize="15" fontFamily="var(--font-mono)">|0⟩</text>
              <text x="12" y={R + 16} className="fill-(--color-ink)" fontSize="15" fontFamily="var(--font-mono)">|1⟩</text>

              {/* Orbite de précession */}
              <ellipse ref={trailRef} cx="0" fill="none" stroke="#b47cff" strokeOpacity="0.35" strokeDasharray="1 5" />

              {/* Vecteur d'état */}
              <line ref={vecRef} x1="0" y1="0" x2="0" y2={-R} stroke="#f5e9c8" strokeWidth="2" strokeLinecap="round" />
              <circle ref={tipRef} cx="0" cy={-R} r="5" fill="#f5e9c8" style={{ filter: "drop-shadow(0 0 8px rgba(245,233,200,0.9))" }} />
              <circle r="3.5" fill="#4d7cff" />
            </svg>
          </Reveal>

          {/* --- Console de mesure --- */}
          <div>
            <Reveal>
              {/* État quantique courant */}
              <p className="font-mono text-xs tracking-[0.3em] text-(--color-ink-dim)">
                STATE VECTOR
              </p>
              <p className="mt-3 font-mono text-lg text-(--color-ink) md:text-xl">
                |ψ⟩ = {alpha.toFixed(2)}|0⟩ + {beta.toFixed(2)}|1⟩
              </p>

              {/* Probabilités animées */}
              <div className="mt-8 space-y-5">
                {[
                  { label: "P(|0⟩)", value: p0, color: "#4d7cff", active: result === 0 },
                  { label: "P(|1⟩)", value: p1, color: "#b47cff", active: result === 1 },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex items-baseline justify-between font-mono text-xs">
                      <span className="text-(--color-ink-dim)">{bar.label}</span>
                      <span style={{ color: bar.active ? "#f5e9c8" : bar.color }}>
                        {(bar.value * 100).toFixed(0)}%
                        {bar.active && " — MEASURED"}
                      </span>
                    </div>
                    <div className="mt-2 h-1 w-full max-w-full bg-white/8">
                      <motion.div
                        className="h-1"
                        style={{
                          background: bar.color,
                          boxShadow: bar.active
                            ? `0 0 14px ${bar.color}`
                            : "none",
                        }}
                        animate={{ width: `${bar.value * 100}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Résultat */}
              <div className="mt-8 min-h-[28px] font-mono text-sm" aria-live="polite">
                {status === "measuring" && (
                  <span className="text-(--color-photon)">MEASURING…</span>
                )}
                {status === "measured" && result !== null && (
                  <span className="text-(--color-fusion)">
                    COLLAPSED → |{result}⟩ &nbsp;·&nbsp; outcome history:{" "}
                    {runs.zeros}×|0⟩ / {runs.ones}×|1⟩
                  </span>
                )}
                {status === "superposition" && (
                  <span className="text-(--color-ink-dim)/70">
                    SUPERPOSITION ACTIVE — STATE UNDETERMINED
                  </span>
                )}
              </div>

              {/* Contrôles */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={runMeasurement}
                  disabled={status === "measuring"}
                  className="border border-(--color-cherenkov)/50 px-7 py-3 font-mono text-xs tracking-[0.3em] text-(--color-cherenkov) transition-all duration-300 hover:border-(--color-cherenkov) hover:bg-(--color-cherenkov)/10 disabled:opacity-40"
                >
                  RUN SIMULATION
                </button>
                <button
                  onClick={prepareSuperposition}
                  className="border border-white/15 px-7 py-3 font-mono text-xs tracking-[0.3em] text-(--color-ink-dim) transition-all duration-300 hover:border-white/40 hover:text-(--color-ink)"
                >
                  NEW SUPERPOSITION
                </button>
              </div>

              <p className="mt-8 max-w-md text-sm leading-relaxed text-(--color-ink-dim)/80">
                {SIMULATION.hint}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
