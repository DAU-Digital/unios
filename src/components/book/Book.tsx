"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { currentSlideId } from "../Deck";
import { SPREADS, bookAction, sectionOfSpread, spreadOfSection } from "./plan";

// The deck as an open book: two pages on a 1280×720 stage scaled to the screen,
// turned over the spine with CSS 3D. Opened by BookButton ("dau:book"); takes
// the keys (and a presentation clicker's PageUp/PageDown) while open.

// Leaf k carries page 2k+1 on its front (right side) and 2k+2 on its back (left
// side); page 0 stays on the left and the last page on the right.
const LEAVES = SPREADS.length - 1;
const LAST = LEAVES;
const TURN_MS = 1100;

// Leaves already turned lie on the left, the latest on top; the rest wait on the
// right, the next one on top.
const restingZ = (k: number, at: number) => (k < at ? 10 + k + 1 : 10 + (LEAVES - k));

export function Book({
  pages,
  title,
  closeLabel,
  prevLabel,
  nextLabel,
}: {
  pages: React.ReactNode[];
  title: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const atRef = useRef(0);
  const timers = useRef<Record<number, number>>({});
  const inFullscreen = useRef(false);
  const [open, setOpen] = useState(false);
  const [at, setAt] = useState(0);
  // A leaf being turned rides above both stacks until it lands.
  const [turning, setTurning] = useState<Record<number, number>>({});
  // Set for one change that skips the animation (opening, Home/End).
  const [jump, setJump] = useState(false);

  const skipAnimation = () => {
    setJump(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setJump(false)));
  };

  const goTo = useCallback((target: number) => {
    const from = atRef.current;
    const to = Math.max(0, Math.min(LAST, target));
    if (to === from) return;
    atRef.current = to;
    if (Math.abs(to - from) > 1) {
      skipAnimation();
    } else {
      const k = Math.min(from, to);
      setTurning((t) => ({ ...t, [k]: 50 + (to > from ? k : LEAVES - k) }));
      window.clearTimeout(timers.current[k]);
      timers.current[k] = window.setTimeout(() => {
        setTurning((t) => {
          const rest = { ...t };
          delete rest[k];
          return rest;
        });
      }, TURN_MS);
    }
    setAt(to);
  }, []);

  const close = useCallback(() => {
    const section = sectionOfSpread(atRef.current);
    inFullscreen.current = false;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    document.documentElement.removeAttribute("data-book-open");
    document.getElementById("deck")?.removeAttribute("inert");
    setOpen(false);
    // Back on the slide of the spread the presenter stopped at.
    document.getElementById(section)?.scrollIntoView({ behavior: "instant" });
    document.querySelector<HTMLElement>("[data-book-open-button]")?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onOpen = () => {
      const start = spreadOfSection(currentSlideId());
      atRef.current = start;
      setAt(start);
      setTurning({});
      skipAnimation();
      setOpen(true);
    };
    window.addEventListener("dau:book", onOpen);
    return () => window.removeEventListener("dau:book", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.setAttribute("data-book-open", "");
    document.getElementById("deck")?.setAttribute("inert", "");
    inFullscreen.current = false;
    root.current
      ?.requestFullscreen?.()
      .then(() => {
        inFullscreen.current = true;
      })
      .catch(() => {
        // Not allowed here; the book still covers the window.
      });
    closeButton.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      // Space presses a focused button; anywhere else it turns the page, like in the deck.
      if (e.key === " " && !(e.target as Element).closest("button")) {
        e.preventDefault();
        goTo(atRef.current + (e.shiftKey ? -1 : 1));
        return;
      }
      const action = bookAction(e.key);
      if (!action) return;
      e.preventDefault();
      e.stopPropagation();
      if (action === "next") goTo(atRef.current + 1);
      else if (action === "prev") goTo(atRef.current - 1);
      else if (action === "first") goTo(0);
      else if (action === "last") goTo(LAST);
      else if (action === "close") close();
    };
    // Browsers use the first Escape to leave fullscreen; close with it.
    const onFullscreen = () => {
      if (!document.fullscreenElement && inFullscreen.current) close();
    };
    const fit = () => {
      const el = root.current;
      if (!el || !stage.current) return;
      stage.current.style.setProperty("--book-scale", String(Math.min(el.clientWidth / 1280, el.clientHeight / 720)));
    };
    fit();
    const resize = new ResizeObserver(fit);
    if (root.current) resize.observe(root.current);
    window.addEventListener("keydown", onKey, true);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      resize.disconnect();
      window.removeEventListener("keydown", onKey, true);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, [open, goTo, close]);

  // A click on the right half turns forward, on the left half back.
  const onStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    const r = e.currentTarget.getBoundingClientRect();
    goTo(atRef.current + (e.clientX > r.left + r.width / 2 ? 1 : -1));
  };

  return (
    <div
      ref={root}
      data-book
      data-spread={at}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      hidden={!open}
      className={`book ${jump ? "book-jump" : ""}`}
    >
      <div ref={stage} className="book-stage" onClick={onStageClick}>
        <div className="book-sheet">
          <div className="book-static is-left">{pages[0]}</div>
          <div className="book-static is-right">{pages[2 * LEAVES + 1]}</div>
          {Array.from({ length: LEAVES }, (_, k) => (
            <div key={k} className="book-leaf" data-flipped={k < at || undefined} style={{ zIndex: turning[k] ?? restingZ(k, at) }}>
              <div className="book-face">{pages[2 * k + 1]}</div>
              <div className="book-face book-back">{pages[2 * k + 2]}</div>
            </div>
          ))}
        </div>
        <div className="book-controls">
          <button type="button" data-book-prev onClick={() => goTo(atRef.current - 1)} disabled={at === 0} aria-label={prevLabel}>
            ←
          </button>
          <span className="tabular-nums">
            {2 * at + 1}–{2 * at + 2} / {pages.length}
          </span>
          <button type="button" data-book-next onClick={() => goTo(atRef.current + 1)} disabled={at === LAST} aria-label={nextLabel}>
            →
          </button>
        </div>
        <button ref={closeButton} type="button" data-book-close onClick={close} className="book-close" aria-label={closeLabel}>
          ✕
        </button>
      </div>
    </div>
  );
}
