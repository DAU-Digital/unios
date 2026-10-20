"use client";

import { useEffect, useId, useState } from "react";
import { wrapLabel } from "@/lib/text";

// Animated diagram of the model: nested diamonds (after the DAU logo) around a
// human-centred 5T core, four Copilots feeding it, nine layers on the outer ring.
// The layer lit on the ring is named in the caption below; hovering or focusing
// a layer holds it there.

type Layer = { code: string; name: string; text: string };

// Long enough to read a layer's name and description before the next one.
const STEP_MS = 2800;

const C = 280;
const diamond = (d: number) => `${C},${C - d} ${C + d},${C} ${C},${C + d} ${C - d},${C}`;

// Copilot nodes, top/right/bottom/left; the top label grows upwards.
const nodes = [
  { x: C, y: C - 130, ty: C - 152 },
  { x: C + 130, y: C, ty: C + 32 },
  { x: C, y: C + 130, ty: C + 160 },
  { x: C - 130, y: C, ty: C + 32 },
] as const;
const LINE = 15;

const ring = Array.from({ length: 9 }, (_, i) => {
  const a = ((-90 + i * 40) * Math.PI) / 180;
  return {
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

export function HeroVisual({
  layers,
  copilots,
  label,
  className = "",
  variant = "hero",
}: {
  layers: Layer[];
  copilots: string[];
  label: string;
  className?: string;
  // "book": sized for a page of the book view, where text must read from afar.
  variant?: "hero" | "book";
}) {
  const dots = useId();
  const [lit, setLit] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setLit((i) => (i + 1) % layers.length), STEP_MS);
    return () => window.clearInterval(timer);
  }, [held, layers.length]);

  const hold = (i: number) => {
    setLit(i);
    setHeld(true);
  };
  const release = () => setHeld(false);

  return (
    <div className={`flex flex-col ${className}`}>
      <svg viewBox="0 0 560 560" className={`hero-visual aspect-square w-full ${
          variant === "book" ? "max-h-[340px]" : "lg:max-h-[calc(100svh-26rem)] [@media(max-height:52rem)]:lg:max-h-[calc(100svh-24rem)]"
        }`} role="group" aria-label={label}>
        <defs>
          <pattern id={dots} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="fill-ink/15" />
          </pattern>
        </defs>
        <rect width="560" height="560" fill={`url(#${dots})`} />

        {/* Outer ring with the nine layers, lit one after another. */}
        <g className="hv-spin">
          <circle cx={C} cy={C} r="252" fill="none" className="stroke-ink/25" strokeDasharray="2 6" />
          <circle cx={C} cy={C - 252} r="4" className="fill-brand" />
        </g>
        {layers.map((l, i) => {
          const p = ring[i];
          return (
            <g
              key={l.code}
              data-layer={i}
              tabIndex={0}
              aria-label={`${l.code} ${l.name}`}
              className={`hv-layer ${i === lit ? "is-on" : ""}`}
              onPointerEnter={() => hold(i)}
              onPointerLeave={release}
              onFocus={() => hold(i)}
              onBlur={release}
            >
              {/* A generous target around the node and its code. */}
              <circle className="hv-hit" cx={(p.x + p.lx) / 2} cy={(p.y + p.ly) / 2} r="24" fill="transparent" pointerEvents="all" />
              <rect x={p.x - 4} y={p.y - 4} width="8" height="8" className="fill-paper stroke-ink" />
              <text x={p.lx} y={p.ly} textAnchor="middle" className="hv-label fill-ink-soft text-[11px] font-semibold">
                {l.code}
              </text>
              <g className="hv-layer-on">
                <rect x={p.x - 5} y={p.y - 5} width="10" height="10" className="fill-brand" />
                <text x={p.lx} y={p.ly} textAnchor="middle" className="fill-brand text-[11px] font-semibold">
                  {l.code}
                </text>
              </g>
            </g>
          );
        })}

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
            <line x1={x} y1={y} x2={nodes[i % 4].x} y2={nodes[i % 4].y} className="stroke-ink/15" />
            <rect x={x - 3} y={y - 3} width="6" height="6" className="hv-twinkle fill-ink" style={{ "--i": i } as React.CSSProperties} />
          </g>
        ))}

        {/* Data flowing from each Copilot into the core. */}
        {nodes.map((n, i) => (
          <g key={i}>
            <line x1={n.x} y1={n.y} x2={C} y2={C} className="stroke-ink/30" />
            <line
              x1={n.x}
              y1={n.y}
              x2={C}
              y2={C}
              pathLength={100}
              className="hv-flow stroke-brand"
              strokeWidth="2.5"
              style={{ "--i": i } as React.CSSProperties}
            />
          </g>
        ))}

        {nodes.map((n, i) => {
          const lines = wrapLabel(copilots[i] ?? "", 16);
          const top = i === 0 ? n.ty - (lines.length - 1) * LINE : n.ty;
          return (
            <g key={i} className="hv-node" style={{ "--i": i } as React.CSSProperties}>
              <rect x={n.x - 9} y={n.y - 9} width="18" height="18" className="fill-paper stroke-ink" strokeWidth="1.5" />
              <rect x={n.x - 4} y={n.y - 4} width="8" height="8" className="fill-ink" />
              <text x={n.x} y={top} textAnchor="middle" className="hv-label fill-ink text-[13px] font-semibold">
                {lines.map((line, j) => (
                  <tspan key={j} x={n.x} dy={j ? LINE : 0}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        {/* Human-centred 5T core. */}
        <polygon points={diamond(46)} className="hv-halo fill-brand" />
        <polygon points={diamond(46)} className="fill-brand" />
        <text x={C} y={C + 8} textAnchor="middle" className="fill-white text-[24px] font-bold">
          5T
        </text>
      </svg>

      {/* Every caption sits in the same grid cell, so the box keeps the height of
          the longest one and nothing shifts as the layers change. */}
      <div data-hero-caption data-lit={lit} className="mt-3 grid border-t-2 border-ink pt-3">
        {layers.map((l, i) => (
          <p
            key={l.code}
            aria-hidden={i !== lit}
            className={`grid grid-cols-[3.25rem_1fr] content-start gap-x-3 transition-opacity duration-300 [grid-area:1/1] ${
              i === lit ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <span className="row-span-2 text-3xl leading-none font-bold tracking-tight text-brand">{l.code}</span>
            <span className="d4">{l.name}</span>
            <span className={`mt-1 text-ink-soft ${variant === "book" ? "text-base" : "text-sm"}`}>{l.text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
