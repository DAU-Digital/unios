"use client";

import { useEffect, useRef, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

export const motion = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

// Index of the panel nearest the track's scroll position.
function current(track: HTMLElement) {
  const panels = [...track.children] as HTMLElement[];
  const gap = (p: HTMLElement) => Math.abs(p.offsetLeft - track.scrollLeft);
  return panels.reduce((best, p, i) => (gap(p) < gap(panels[best]) ? i : best), 0);
}

function show(track: HTMLElement, i: number, behavior: ScrollBehavior) {
  const panel = track.children[i] as HTMLElement | undefined;
  if (!panel) return false;
  track.scrollTo({ left: panel.offsetLeft, behavior });
  return true;
}

// Moves a slide's details one panel along; false when already at that end.
export function stepPanel(slide: Element, dir: 1 | -1) {
  const track = slide.querySelector<HTMLElement>("[data-track]");
  return !!track && show(track, current(track) + dir, motion());
}

// Jumps a slide's details to its first or last panel, without animating.
export function resetPanels(slide: Element, to: "first" | "last") {
  const track = slide.querySelector<HTMLElement>("[data-track]");
  if (track) show(track, to === "first" ? 0 : track.children.length - 1, "auto");
}

// A slide's head and its details. Details that don't fit one screen are laid out
// side by side; their controls sit on the head's label line to save height.
export function Panels({ head, panels, prev, next }: { head: React.ReactNode; panels: React.ReactNode[]; prev: string; next: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setAt(current(el)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => track.current && show(track.current, i, motion());
  const n = panels.length;

  return (
    <>
      <div className="relative">
        {head}
        {n > 1 && (
          <div className="absolute top-3 right-0 flex items-center gap-3 sm:gap-4">
            <div className="hidden gap-1.5 sm:flex">
              {panels.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${i + 1} / ${n}`}
                  aria-current={i === at || undefined}
                  className="group grid h-6 place-items-center"
                >
                  <span className={`block h-1 w-8 transition-colors ${i === at ? "bg-brand" : "bg-current opacity-25 group-hover:opacity-60"}`} />
                </button>
              ))}
            </div>
            <span className="text-sm font-medium tabular-nums opacity-70">
              {pad(at + 1)} / {pad(n)}
            </span>
            <div className="flex gap-1.5">
              <button type="button" onClick={() => go(at - 1)} disabled={at === 0} aria-label={prev} className="panel-btn">
                ←
              </button>
              <button type="button" onClick={() => go(at + 1)} disabled={at === n - 1} aria-label={next} className="panel-btn">
                →
              </button>
            </div>
          </div>
        )}
      </div>
      <div ref={track} data-track className="panel-track">
        {panels.map((p, i) => (
          <div key={i} className="panel">
            {p}
          </div>
        ))}
      </div>
    </>
  );
}
