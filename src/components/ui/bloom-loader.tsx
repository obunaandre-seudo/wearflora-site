/**
 * Wearflora's signature loader: five petals bloom open around a gold centre, then the
 * flower breathes while it waits. Pure SVG + CSS (no JS loop), so it can render on the
 * server in every `loading.tsx` before any client code has hydrated.
 */
const PETALS = [0, 72, 144, 216, 288];

export function Bloom({ size = 96, showOrbit = true }: { size?: number; showOrbit?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true" className="wf-bloom overflow-visible">
      {showOrbit && (
        <circle cx="60" cy="60" r="54" stroke="#C9A46A" strokeOpacity="0.45" strokeWidth="0.8" strokeDasharray="1.5 5" className="wf-orbit" />
      )}
      <g className="wf-flower">
        {PETALS.map((deg, i) => (
          <g key={deg} transform={`rotate(${deg} 60 60)`}>
            <ellipse
              cx="60"
              cy="34"
              rx="14"
              ry="25"
              className="wf-petal"
              style={{ animationDelay: `${i * 0.12}s` }}
              fill="url(#wf-petal-grad)"
              stroke="#C65D79"
              strokeOpacity="0.55"
              strokeWidth="0.9"
            />
          </g>
        ))}
        <circle cx="60" cy="60" r="9" fill="#C9A46A" className="wf-core" />
        <circle cx="60" cy="60" r="4" fill="#FFF9F6" fillOpacity="0.85" />
      </g>
      <defs>
        <linearGradient id="wf-petal-grad" x1="60" y1="9" x2="60" y2="59" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8DDE2" />
          <stop offset="1" stopColor="#EFB7C3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
