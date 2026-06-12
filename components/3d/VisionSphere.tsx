"use client";

// ============================================================
// QUANTUM — La Sphère de la Vision
// Sphère holographique interactive : ~400 nœuds reliés à leurs
// voisins, 7 nœuds majeurs étiquetés. Rotation auto + contrôle
// utilisateur (rotation / zoom) — un OS extraterrestre.
// ============================================================

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { VISION } from "@/data/content";

const NODE_COUNT = 420;
const RADIUS = 2.2;
const LINK_DIST = 0.78;

function NetworkSphere() {
  const group = useRef<THREE.Group>(null);

  // Nœuds + arêtes calculés une seule fois
  const { nodePositions, linePositions, majorNodes } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push(
        new THREE.Vector3(
          RADIUS * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.cos(phi),
          RADIUS * Math.sin(phi) * Math.sin(theta)
        )
      );
    }

    // Arêtes entre voisins proches
    const lines: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (pts[i].distanceTo(pts[j]) < LINK_DIST) {
          lines.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    const nodePositions = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      nodePositions[i * 3] = p.x;
      nodePositions[i * 3 + 1] = p.y;
      nodePositions[i * 3 + 2] = p.z;
    });

    // 7 nœuds majeurs répartis régulièrement sur la sphère
    const majorNodes = VISION.nodes.map((node, i) => {
      const idx = Math.floor((i / VISION.nodes.length) * NODE_COUNT);
      return { ...node, position: pts[idx].clone().multiplyScalar(1.04) };
    });

    return {
      nodePositions,
      linePositions: new Float32Array(lines),
      majorNodes,
    };
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={group}>
      {/* Réseau de connexions */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4d7cff"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Nœuds */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#b47cff"
          size={0.045}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Cœur lumineux */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#4d7cff" transparent opacity={0.35} />
      </mesh>

      {/* Nœuds majeurs étiquetés */}
      {majorNodes.map((node) => (
        <group key={node.label} position={node.position}>
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#f5e9c8" />
          </mesh>
          <Html
            distanceFactor={9}
            className="pointer-events-none select-none"
            occlude={false}
          >
            <div className="whitespace-nowrap rounded-sm border border-white/10 bg-[#02030a]/80 px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-[#e6e9f5] backdrop-blur-sm">
              {node.label.toUpperCase()}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function VisionSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 5.4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      className="!absolute inset-0"
    >
      <NetworkSphere />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3}
        maxDistance={8}
        autoRotate={false}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
