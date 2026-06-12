// ============================================================
// QUANTUM — Page d'accueil
// Assemblage du récit : noir → univers → mur → vision →
// district → architecture → industries → voyage → retour
// à l'univers.
// ============================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Vision from "@/components/sections/Vision";
import District from "@/components/sections/District";
import Architecture from "@/components/sections/Architecture";
import Industries from "@/components/sections/Industries";
import Timeline from "@/components/sections/Timeline";
import Final from "@/components/sections/Final";

export default function Home() {
  return (
    <main id="top">
      <Navbar />
      <Hero />
      <Problem />
      <Vision />
      <District />
      <Architecture />
      <Industries />
      <Timeline />
      <Final />
      <Footer />
    </main>
  );
}
