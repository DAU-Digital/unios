// Animated diagram of the model: nested diamonds (after the DAU logo) around a
// human-centred 5T core, four Copilots feeding it, nine layers on the outer ring.
// Labels are proper names shared by every locale.

const C = 280;
const diamond = (d: number) => `${C},${C - d} ${C + d},${C} ${C},${C + d} ${C - d},${C}`;

const copilots = [
  { name: "AI Tutor", x: C, y: C - 130, tx: C, ty: C - 152, anchor: "middle" },
  { name: "Faculty Copilot", x: C + 130, y: C, tx: C + 130, ty: C + 32, anchor: "middle" },
  { name: "Research Copilot", x: C, y: C + 130, tx: C, ty: C + 160, anchor: "middle" },
  { name: "Admin Copilot", x: C - 130, y: C, tx: C - 130, ty: C + 32, anchor: "middle" },
] as const;

const layers = ["5A", "5B", "5C", "5D", "5E", "5F", "5G", "5H", "5I"].map((code, i) => {
  const a = ((-90 + i * 40) * Math.PI) / 180;
  return {
    code,
    x: C + 252 * Math.cos(a),
    y: C + 252 * Math.sin(a),
    lx: C + 228 * Math.cos(a),
    ly: C + 228 * Math.sin(a) + 4,
  };
});

// Knowledge-graph satellites on the outer diamond.
const satellites = [
  [C, C - 195],
  [C + 195, C],
  [C, C + 195],
  [C - 195, C],
  [C + 97, C - 97],
  [C + 97, C + 97],
  [C - 97, C + 97],
  [C - 97, C - 97],
] as const;

export function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 560" className={`hero-visual ${className}`} role="img" aria-label="AI-native Competency-Based 5T University">
      <defs>
        <pattern id="hv-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className="fill-ink/15" />
        </pattern>
      </defs>
      <rect width="560" height="560" fill="url(#hv-dots)" />

      {/* Outer ring with the nine layers, lit one after another. */}
      <g className="hv-spin">
        <circle cx={C} cy={C} r="252" fill="none" className="stroke-ink/25" strokeDasharray="2 6" />
        <circle cx={C} cy={C - 252} r="4" className="fill-brand" />
      </g>
      {layers.map((l, i) => (
        <g key={l.code} className="hv-layer" style={{ "--i": i } as React.CSSProperties}>
          <rect x={l.x - 4} y={l.y - 4} width="8" height="8" className="fill-paper stroke-ink" />
          <text x={l.lx} y={l.ly} textAnchor="middle" className="hv-label fill-ink-soft text-[11px] font-semibold">
            {l.code}
          </text>
          <g className="hv-layer-on">
            <rect x={l.x - 5} y={l.y - 5} width="10" height="10" className="fill-brand" />
            <text x={l.lx} y={l.ly} textAnchor="middle" className="fill-brand text-[11px] font-semibold">
              {l.code}
            </text>
          </g>
        </g>
      ))}

      {/* Nested diamonds draw themselves in. */}
      {[195, 130, 70].map((d, i) => (
        <polygon
          key={d}
          points={diamond(d)}
          pathLength={1}
          fill="none"
          className={`hv-draw ${i === 1 ? "stroke-ink" : "stroke-ink/40"}`}
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}

      {satellites.map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={copilots[i % 4].x} y2={copilots[i % 4].y} className="stroke-ink/15" />
          <rect x={x - 3} y={y - 3} width="6" height="6" className="hv-twinkle fill-ink" style={{ "--i": i } as React.CSSProperties} />
        </g>
      ))}

      {/* Data flowing from each Copilot into the core. */}
      {copilots.map((c, i) => (
        <g key={c.name}>
          <line x1={c.x} y1={c.y} x2={C} y2={C} className="stroke-ink/30" />
          <line
            x1={c.x}
            y1={c.y}
            x2={C}
            y2={C}
            pathLength={100}
            className="hv-flow stroke-brand"
            strokeWidth="2.5"
            style={{ "--i": i } as React.CSSProperties}
          />
        </g>
      ))}

      {copilots.map((c, i) => (
        <g key={c.name} className="hv-node" style={{ "--i": i } as React.CSSProperties}>
          <rect x={c.x - 9} y={c.y - 9} width="18" height="18" className="fill-paper stroke-ink" strokeWidth="1.5" />
          <rect x={c.x - 4} y={c.y - 4} width="8" height="8" className="fill-ink" />
          <text x={c.tx} y={c.ty} textAnchor={c.anchor} className="hv-label fill-ink text-[13px] font-semibold">
            {c.name}
          </text>
        </g>
      ))}

      {/* Human-centred 5T core. */}
      <polygon points={diamond(46)} className="hv-halo fill-brand" />
      <polygon points={diamond(46)} className="fill-brand" />
      <text x={C} y={C + 8} textAnchor="middle" className="fill-white text-[24px] font-bold">
        5T
      </text>
    </svg>
  );
}
