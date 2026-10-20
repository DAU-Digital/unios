// "Từ Đà Nẵng vươn tầm châu Á và thế giới": nested diamonds (after the DAU logo)
// grow out from a 5T core, one ring per horizon, the outermost in brand red.
// It reuses the hero diagram's animation classes from globals.css.

const C = 280;
const diamond = (d: number) => `${C},${C - d} ${C + d},${C} ${C},${C + d} ${C - d},${C}`;

const CORE = 52;
const STEP = 52;

// Dashes flowing from the core out to the middle of each outer edge.
const flows = [
  [C + 130, C - 130],
  [C + 130, C + 130],
  [C - 130, C + 130],
  [C - 130, C - 130],
] as const;

export function HorizonVisual({
  rings,
  label,
  className = "",
}: {
  rings: { name: string; year: string }[];
  label: string;
  className?: string;
}) {
  const last = rings.length - 1;
  const size = (i: number) => CORE + STEP * (i + 1);

  return (
    <svg viewBox="0 0 560 560" className={`hero-visual ${className}`} role="img" aria-label={label}>
      {/* The world: a slow dashed orbit just outside the outer ring. */}
      <g className="hv-spin">
        <circle cx={C} cy={C} r={274} fill="none" stroke="var(--color-ink)" strokeOpacity="0.22" strokeDasharray="2 10" />
      </g>

      {/* Outermost first, so its tint sits under the inner rings. */}
      {rings.map((_, k) => last - k).map((i) => (
        <polygon
          key={rings[i].name}
          points={diamond(size(i))}
          pathLength={1}
          fill={i === last ? "var(--color-brand-soft)" : "none"}
          fillOpacity={i === last ? 0.55 : undefined}
          stroke={i === last ? "var(--color-brand)" : "var(--color-ink)"}
          strokeOpacity={i === last ? 1 : 0.3 + i * 0.18}
          strokeWidth={i === last ? 2.5 : 1.5}
          className="hv-draw"
          style={{ "--i": i + 1 } as React.CSSProperties}
        />
      ))}

      {flows.map(([x, y], i) => (
        <line
          key={i}
          x1={C}
          y1={C}
          x2={x}
          y2={y}
          pathLength={100}
          stroke="var(--color-brand)"
          strokeOpacity="0.7"
          strokeWidth={1.5}
          strokeLinecap="square"
          className="hv-flow"
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}

      {/* The 5T core, pulsing outward. */}
      <polygon points={diamond(CORE)} fill="var(--color-brand)" opacity="0.35" className="hv-halo" />
      <polygon points={diamond(CORE)} fill="var(--color-brand)" />
      <text x={C} y={C + 10} textAnchor="middle" fill="#fff" fontSize="30" fontWeight="700" letterSpacing="-1">
        5T
      </text>

      {rings.map((r, i) => {
        const d = size(i);
        return (
          <g key={r.name} className="hv-node" style={{ "--i": i + 1 } as React.CSSProperties}>
            <text
              x={C}
              y={C - d + 32}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill={i === last ? "var(--color-brand)" : "var(--color-ink)"}
              className="hv-label"
            >
              {r.name}
            </text>
            <text
              x={C + d - 12}
              y={C + 5}
              textAnchor="end"
              fontSize="13"
              fontWeight="600"
              fill={i === last ? "var(--color-brand)" : "var(--color-ink-soft)"}
              className="hv-label tabular-nums"
            >
              {r.year}
            </text>
          </g>
        );
      })}

      {/* Corners of the outer ring. */}
      {[
        [C, C - size(last)],
        [C + size(last), C],
        [C, C + size(last)],
        [C - size(last), C],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x - 5}
          y={y - 5}
          width={10}
          height={10}
          fill="var(--color-brand)"
          transform={`rotate(45 ${x} ${y})`}
          className="hv-twinkle"
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}
