// ============================================================
// QUANTUM — Contenu éditorial centralisé
// Tout le texte du site vit ici : une seule source de vérité.
// ============================================================

export const SITE = {
  name: "QUANTUM",
  tagline: "Computing Beyond Reality",
  heroLine: "The future will not be discovered. It will be engineered.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://quantum.netlify.app",
};

export const MANIFESTO = [
  "Humanity built tools.",
  "Then machines.",
  "Then computers.",
  "Then networks.",
  "Then intelligence.",
  "The next step is not evolution.",
  "The next step is acceleration.",
];

// --- Section : LE MUR (The Problem) ---------------------------------
export const PROBLEM = {
  eyebrow: "01 / THE WALL",
  title: "Humanity is reaching a computational wall.",
  body: "Every field of science now produces more information than it can understand. Classical architectures are collapsing under complexity. Discovery itself is slowing down.",
  domains: [
    { name: "Artificial Intelligence", load: 97, note: "Training runs constrained by physics, not ideas." },
    { name: "Scientific Discovery", load: 91, note: "Decades of data. Years of analysis. Months of insight." },
    { name: "Drug Development", load: 88, note: "10 years and billions per molecule. Still mostly trial and error." },
    { name: "Climate Simulation", load: 94, note: "Planetary systems modeled at a fraction of real resolution." },
    { name: "Defense", load: 85, note: "Adversarial complexity outpacing analytic capacity." },
    { name: "Energy", load: 90, note: "Fusion-grade plasma states beyond classical simulation." },
    { name: "Space Exploration", load: 86, note: "Trajectories and habitats designed with last-century tools." },
  ],
  conclusion: "We need something radically different.",
};

// --- Section : LA VISION (sphère holographique) ----------------------
export const VISION = {
  eyebrow: "02 / THE VISION",
  title: "One ecosystem. Every layer of computation.",
  body: "QUANTUM is not a product. It is an integrated system — intelligence, infrastructure, security and discovery, designed as a single organism.",
  nodes: [
    { label: "Quantum Intelligence", desc: "Reasoning systems beyond classical limits." },
    { label: "Quantum Cloud", desc: "Computation delivered as planetary infrastructure." },
    { label: "Quantum Research", desc: "Fundamental science as a production pipeline." },
    { label: "Quantum Security", desc: "Cryptography for the post-classical era." },
    { label: "Quantum Simulation", desc: "Reality, modeled at native resolution." },
    { label: "Autonomous Discovery", desc: "Systems that generate and test their own hypotheses." },
    { label: "Advanced Infrastructure", desc: "Energy, cooling and silicon engineered together." },
  ],
};

// --- Section : LE DISTRICT -------------------------------------------
export const DISTRICT = {
  eyebrow: "05 / THE DISTRICT",
  title: "Not a campus. A city built for scientific acceleration.",
  body: "Research, energy, manufacturing, education and life — engineered as one continuous system.",
  sectors: [
    { name: "Research Towers", desc: "Vertical laboratories for a thousand simultaneous programs." },
    { name: "Underground Data Centers", desc: "Kilometers of compute, thermally coupled to the bedrock." },
    { name: "Fusion-Ready Energy Facilities", desc: "A grid designed for the reactors that come next." },
    { name: "Quantum Laboratories", desc: "Millikelvin environments at industrial scale." },
    { name: "Autonomous Logistics", desc: "Materials that move themselves, around the clock." },
    { name: "Residential Sectors", desc: "Ten thousand researchers living next to their work." },
    { name: "Education Districts", desc: "The next generation, trained inside the machine." },
    { name: "Satellite Communication Hubs", desc: "Direct uplink to orbital infrastructure." },
    { name: "Green Energy Grids", desc: "Every watt accounted for, every watt renewable." },
    { name: "Advanced Manufacturing", desc: "From wafer to processor without leaving the district." },
  ],
  conclusion: "Built so that the distance between a question and an experiment is a walk, not a decade.",
};

// --- Section : L'ARCHITECTURE ----------------------------------------
export const ARCHITECTURE = {
  eyebrow: "06 / THE ARCHITECTURE",
  title: "Seven layers. One direction: upward.",
  layers: [
    { name: "Planetary Infrastructure", desc: "Land, fiber, orbit." },
    { name: "Energy Layer", desc: "Generation, storage, distribution." },
    { name: "Data Layer", desc: "Exabytes in motion." },
    { name: "Quantum Layer", desc: "Coherence as a resource." },
    { name: "Artificial Intelligence Layer", desc: "Models that design models." },
    { name: "Scientific Discovery Layer", desc: "Hypotheses at machine speed." },
    { name: "Human Applications Layer", desc: "Medicine. Energy. Civilization." },
  ],
};

// --- Section : INDUSTRIES --------------------------------------------
export const INDUSTRIES = {
  eyebrow: "07 / INDUSTRIES OF TOMORROW",
  scenes: [
    {
      name: "Finance",
      headline: "Global markets as living neural systems.",
      body: "Risk modeled across every instrument, every market, every second — simultaneously.",
      hue: 215,
    },
    {
      name: "Medicine",
      headline: "Molecules designed, not discovered.",
      body: "Protein folding and drug interaction simulated at quantum resolution before a single synthesis.",
      hue: 280,
    },
    {
      name: "Cybersecurity",
      headline: "Defense that evolves faster than attack.",
      body: "Self-rewriting cryptographic systems, hardened against adversaries that do not exist yet.",
      hue: 330,
    },
    {
      name: "Space",
      headline: "Interplanetary navigation, computed in advance.",
      body: "Mission trajectories, habitats and life-support optimized across decades of variables.",
      hue: 190,
    },
    {
      name: "Energy",
      headline: "A planet, optimized in real time.",
      body: "Grid flow, storage and fusion plasma states resolved as one continuous calculation.",
      hue: 45,
    },
    {
      name: "Manufacturing",
      headline: "Industrial ecosystems that run themselves.",
      body: "Supply chains and factories that simulate their own futures before committing atoms.",
      hue: 150,
    },
  ],
};

// --- Section : TIMELINE -----------------------------------------------
export const TIMELINE = {
  eyebrow: "09 / THE FUTURE TIMELINE",
  title: "A journey, not a roadmap.",
  phases: [
    { phase: "PHASE I", name: "Intelligence", desc: "Foundation systems for reasoning at scale." },
    { phase: "PHASE II", name: "Simulation", desc: "Physical reality, modeled faithfully." },
    { phase: "PHASE III", name: "Optimization", desc: "Industry-scale problems, resolved." },
    { phase: "PHASE IV", name: "Discovery", desc: "Autonomous science begins." },
    { phase: "PHASE V", name: "Quantum Infrastructure", desc: "Coherent computation as a utility." },
    { phase: "PHASE VI", name: "Planetary Scale Computing", desc: "One machine, the size of a civilization." },
    { phase: "PHASE VII", name: "Scientific Acceleration", desc: "Centuries of progress per decade." },
    { phase: "PHASE VIII", name: "Civilizational Infrastructure", desc: "The substrate of everything after." },
  ],
};

// --- Section : FINAL ---------------------------------------------------
export const FINAL = {
  lines: [
    "Every civilization is remembered for a breakthrough.",
    "Fire.",
    "Electricity.",
    "Flight.",
    "Computation.",
    "The next breakthrough has not happened yet.",
    "We are building it.",
  ],
  cta: "ENTER THE FUTURE",
};


// --- Section : QUANTUM SIMULATION (démo interactive) ------------------
export const SIMULATION = {
  eyebrow: "03 / QUANTUM SIMULATION",
  title: "One qubit. Every possibility at once.",
  body: "A classical bit is 0 or 1. A qubit exists in a superposition of both — until it is measured. Prepare a state, run the measurement, watch probability become reality.",
  hint: "Each run collapses the superposition according to its probability amplitudes. Same state, different outcomes — that is quantum mechanics, not randomness in the engineering.",
};

// --- Section : SCIENTIFIC INTELLIGENCE ---------------------------------
export const INTELLIGENCE = {
  eyebrow: "04 / SCIENTIFIC INTELLIGENCE",
  title: "Five capabilities. One integrated stack.",
  body: "QUANTUM concentrates its research on the layers where computation compounds: each capability feeds the next.",
  capabilities: [
    {
      tag: "QC",
      name: "Quantum Computing",
      desc: "Algorithms and error-corrected architectures targeting problems with exponential classical cost — chemistry, materials, cryptanalysis.",
    },
    {
      tag: "AI",
      name: "Artificial Intelligence",
      desc: "Foundation models specialized for scientific reasoning, trained to propose, critique and rank hypotheses before any experiment runs.",
    },
    {
      tag: "SIM",
      name: "Scientific Simulation",
      desc: "High-fidelity digital twins of physical systems — from plasma states to protein dynamics — validated against experimental data.",
    },
    {
      tag: "OPT",
      name: "Optimization",
      desc: "Hybrid quantum-classical solvers for logistics, energy grids and portfolio-scale combinatorial problems measured in billions of variables.",
    },
    {
      tag: "PQC",
      name: "Post-Quantum Cybersecurity",
      desc: "Migration tooling and lattice-based cryptography deployed before large-scale quantum machines make current standards obsolete.",
    },
  ],
};

// --- Section : WHY QUANTUM MATTERS --------------------------------------
export const WHY = {
  eyebrow: "08 / WHY QUANTUM MATTERS",
  title: "Why Quantum Matters",
  pillars: [
    {
      name: "Scientific Acceleration",
      desc: "Compressing decade-long discovery cycles into years. The bottleneck of modern science is computation — removing it changes the rate of progress itself.",
    },
    {
      name: "Industrial Optimization",
      desc: "Single-digit efficiency gains in energy, logistics and manufacturing represent hundreds of billions in value. Quantum-grade optimization targets the problems classical solvers abandon.",
    },
    {
      name: "Sovereign Infrastructure",
      desc: "Compute is strategic territory. Nations and institutions that own the next computational layer will not rent their future from those who do.",
    },
  ],
};

export const NAV_LINKS = [
  { label: "The Wall", href: "#problem" },
  { label: "Vision", href: "#vision" },
  { label: "Simulation", href: "#simulation" },
  { label: "District", href: "#district" },
  { label: "Architecture", href: "#architecture" },
  { label: "Industries", href: "#industries" },
  { label: "Timeline", href: "#timeline" },
];
