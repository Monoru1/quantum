// Étiquette mono d'introduction de section ("01 / THE WALL")
export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow mb-6 flex items-center gap-4">
      <span className="inline-block h-px w-10 bg-(--color-ink-dim)/50" />
      {children}
    </p>
  );
}
