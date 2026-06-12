"use client";

// ============================================================
// QUANTUM — L'Univers (élément signature du site)
// Un champ de ~12 000 particules piloté par shader GLSL :
//  - révélation "pulse par pulse" (une, puis des milliers)
//  - morphing perpétuel sphère ↔ réseau neuronal ↔ treillis
//  - réaction fluide à la souris
// Le visiteur ne regarde pas l'espace : il regarde le calcul.
// ============================================================

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Optimisation mobile : moitié moins de particules, DPR plafonné
const IS_MOBILE =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;
const COUNT = IS_MOBILE ? 6000 : 12000;
const MAX_DPR = IS_MOBILE ? 1.5 : 2;

// --- Vertex shader : positions = mélange animé de trois géométries ---
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform vec2  uMouse;
  uniform float uPixelRatio;
  uniform float uIntensity;

  attribute vec3 aSphere;
  attribute vec3 aCloud;
  attribute vec3 aLattice;
  attribute float aRand;

  varying float vAlpha;
  varying float vDepth;

  void main() {
    // Cycle de morphing perpétuel entre les trois états
    float t = uTime * 0.08;
    float m1 = smoothstep(0.25, 0.75, 0.5 + 0.5 * sin(t));
    float m2 = smoothstep(0.25, 0.75, 0.5 + 0.5 * sin(t * 0.62 + 2.1));

    vec3 pos = mix(aSphere, aCloud, m1);
    pos = mix(pos, aLattice, m2 * 0.55);

    // Respiration organique
    pos += 0.12 * vec3(
      sin(uTime * 0.6 + aRand * 40.0),
      cos(uTime * 0.5 + aRand * 60.0),
      sin(uTime * 0.7 + aRand * 80.0)
    );

    // Rotation lente + influence de la souris (l'univers réagit)
    float rx = uMouse.y * 0.35;
    float ry = uTime * 0.03 + uMouse.x * 0.55;
    mat3 rotY = mat3(cos(ry), 0.0, sin(ry), 0.0, 1.0, 0.0, -sin(ry), 0.0, cos(ry));
    mat3 rotX = mat3(1.0, 0.0, 0.0, 0.0, cos(rx), -sin(rx), 0.0, sin(rx), cos(rx));
    pos = rotX * rotY * pos;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Révélation séquentielle : chaque particule "s'allume" à son tour
    float appear = smoothstep(aRand - 0.04, aRand, uReveal);
    vAlpha = appear * uIntensity;
    vDepth = clamp((-mv.z - 2.0) / 10.0, 0.0, 1.0);

    gl_PointSize = (1.4 + 2.2 * aRand) * uPixelRatio * (6.0 / -mv.z);
  }
`;

// --- Fragment shader : point lumineux doux, spectre Cherenkov → Photon ---
const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.0, d);
    core = pow(core, 2.2);

    vec3 cherenkov = vec3(0.302, 0.486, 1.0);   // #4D7CFF
    vec3 photon    = vec3(0.706, 0.486, 1.0);   // #B47CFF
    vec3 color = mix(cherenkov, photon, vDepth);

    gl_FragColor = vec4(color, core * vAlpha);
  }
`;

type UniverseProps = {
  /** Multiplicateur de luminosité (le final est plus brillant que le héros) */
  intensity?: number;
  /** Durée de la révélation pulse-par-pulse, en secondes */
  revealDuration?: number;
};

function Particles({ intensity = 1, revealDuration = 4 }: UniverseProps) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { gl } = useThree();

  // Génération des trois géométries cibles (une seule fois)
  const { positions, sphere, cloud, lattice, rand } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sphere = new Float32Array(COUNT * 3);
    const cloud = new Float32Array(COUNT * 3);
    const lattice = new Float32Array(COUNT * 3);
    const rand = new Float32Array(COUNT);

    const side = Math.ceil(Math.cbrt(COUNT));
    for (let i = 0; i < COUNT; i++) {
      // Sphère (distribution de Fibonacci, rayon légèrement bruité)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.6 + Math.random() * 0.5;
      sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sphere[i * 3 + 1] = r * Math.cos(phi);
      sphere[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      // Nuage neuronal (gaussien anisotrope)
      cloud[i * 3] = (Math.random() - 0.5) * 9;
      cloud[i * 3 + 1] = (Math.random() - 0.5) * 5;
      cloud[i * 3 + 2] = (Math.random() - 0.5) * 9;

      // Treillis mathématique (grille cubique)
      const gx = i % side;
      const gy = Math.floor(i / side) % side;
      const gz = Math.floor(i / (side * side));
      lattice[i * 3] = (gx / side - 0.5) * 7;
      lattice[i * 3 + 1] = (gy / side - 0.5) * 7;
      lattice[i * 3 + 2] = (gz / side - 0.5) * 7;

      rand[i] = Math.random();
    }
    positions.set(sphere);
    return { positions, sphere, cloud, lattice, rand };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), MAX_DPR) },
      uIntensity: { value: intensity },
    }),
    [gl, intensity]
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    u.uTime.value += delta;
    // Révélation progressive (pulse par pulse au début, puis avalanche)
    u.uReveal.value = Math.min(u.uReveal.value + delta / revealDuration, 1);
    // Souris lissée — l'univers réagit, sans jamais sursauter
    mouse.current.lerp(state.pointer, 0.04);
    u.uMouse.value.copy(mouse.current);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSphere" args={[sphere, 3]} />
        <bufferAttribute attach="attributes-aCloud" args={[cloud, 3]} />
        <bufferAttribute attach="attributes-aLattice" args={[lattice, 3]} />
        <bufferAttribute attach="attributes-aRand" args={[rand, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function QuantumUniverse(props: UniverseProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, MAX_DPR]}
      className="!absolute inset-0"
    >
      <Particles {...props} />
    </Canvas>
  );
}
