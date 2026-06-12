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
import Simulation from "@/components/sections/Simulation";
import Intelligence from "@/components/sections/Intelligence";
import District from "@/components/sections/District";
import Architecture from "@/components/sections/Architecture";
import Industries from "@/components/sections/Industries";
import WhyQuantum from "@/components/sections/WhyQuantum";
import InvestorBrief from "@/components/sections/InvestorBrief";
import Timeline from "@/components/sections/Timeline";
import Final from "@/components/sections/Final";

export default function Home() {
  return (
    <main id="top">
      <Navbar />
      <Hero />
      <Problem />
      <Vision />
      <Simulation />
      <Intelligence />
      <District />
      <Architecture />
      <Industries />
      <WhyQuantum />
      <InvestorBrief />
      <Timeline />
      <Final />
      <Footer />
    </main>
  );
}
