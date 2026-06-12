// Utilitaires partagés
import { clsx, type ClassValue } from "clsx";

/** Fusionne des classes conditionnelles */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
