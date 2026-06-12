// Types partagés du projet QUANTUM

export interface VisionNode {
  label: string;
  desc: string;
}

export interface TimelinePhase {
  phase: string;
  name: string;
  desc: string;
}

export interface IndustryScene {
  name: string;
  headline: string;
  body: string;
  /** Teinte HSL de la scène cinématique */
  hue: number;
}
