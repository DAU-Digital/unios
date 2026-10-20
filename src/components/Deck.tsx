"use client";

import { useEffect, useState } from "react";
import { motion, resetPanels, stepPanel } from "./Panels";

type Item = { id: string; title: string };

const unlocked = () => document.documentElement.hasAttribute("data-unlocked");

// The slide whose top has reached the upper part of the screen.
function currentSlide(slides: HTMLElement[]) {
  let at = 0;
  slides.forEach((s, i) => {
    if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) at = i;
  });
  return at;
}

// The id of the slide on screen, e.g. to open the book view at the same place.
export function currentSlideId(): string {
  const slides = [...document.querySelectorAll<HTMLElement>("[data-slide]")];
  return slides[currentSlide(slides)]?.id ?? "";
}

// Presentation controls: ↑/↓ (PageUp/PageDown, Space) change slide, ←/→ walk
// through a slide's details first and then on to the next slide, like a clicker.
export function Deck({ hint }: { hint: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [at, setAt] = useState(0);
  const [hinted, setHinted] = useState(false);

  useEffect(() => {
    const slides = [...document.querySelectorAll<HTMLElement>("[data-slide]")];
    setItems(slides.map((s) => ({ id: s.id, title: s.dataset.title ?? "" })));

    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setAt(slides.indexOf(e.target as HTMLElement));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    slides.forEach((s) => seen.observe(s));

    const onKey = (e: KeyboardEvent) => {
      // The book view (Book.tsx) takes the keys while it is open.
      if (document.documentElement.hasAttribute("data-book-open")) return;
      if (!unlocked() || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable]")) return;

      let dir: 1 | -1;
      let sideways = false;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          dir = 1;
          break;
        case "ArrowUp":
        case "PageUp":
          dir = -1;
          break;
        case " ":
          if (target.closest("a, button, summary")) return;
          dir = e.shiftKey ? -1 : 1;
          break;
        case "ArrowRight":
          dir = 1;
          sideways = true;
          break;
        case "ArrowLeft":
          dir = -1;
          sideways = true;
          break;
        case "Home":
        case "End":
          e.preventDefault();
          (e.key === "Home" ? slides[0] : slides[slides.length - 1]).scrollIntoView({ behavior: motion() });
          return;
        default:
          return;
      }
      e.preventDefault();
      setHinted(true);

      const i = currentSlide(slides);
      const slide = slides[i];
      if (sideways && stepPanel(slide, dir)) return;

      // A slide taller than the screen (phones, short windows) is read through first.
      const box = slide.getBoundingClientRect();
      if (dir > 0 && box.bottom > window.innerHeight + 2) {
        window.scrollBy({ top: Math.min(box.bottom - window.innerHeight, window.innerHeight * 0.8), behavior: motion() });
        return;
      }
      if (dir < 0 && box.top < -2) {
        window.scrollBy({ top: Math.max(box.top, -window.innerHeight * 0.8), behavior: motion() });
        return;
      }

      const to = slides[i + dir];
      if (!to) return;
      // Stepping back with ← lands on the last detail, as a clicker would.
      resetPanels(to, sideways && dir < 0 ? "last" : "first");
      to.scrollIntoView({ behavior: motion() });
    };
    window.addEventListener("keydown", onKey);

    // The hint shows once the deck is open, then fades.
    let timer = 0;
    const showHint = () => {
      timer = window.setTimeout(() => setHinted(true), 6000);
    };
    if (unlocked()) showHint();
    else window.addEventListener("dau:unlock", showHint, { once: true });

    return () => {
      seen.disconnect();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("dau:unlock", showHint);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <nav aria-label="Slides" className="fixed top-1/2 right-3 z-30 hidden -translate-y-1/2 flex-col gap-1 lg:flex xl:right-5">
        {items.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            title={s.title}
            aria-label={s.title}
            aria-current={i === at || undefined}
            className="group grid size-5 place-items-center"
          >
            <span
              className={`block size-2 border border-ink transition-all duration-300 ${
                i === at ? "scale-125 border-brand bg-brand" : "bg-paper group-hover:bg-ink"
              }`}
            />
          </a>
        ))}
      </nav>
      <p
        aria-hidden
        className={`deck-hint pointer-events-none fixed top-[5.25rem] left-1/2 z-30 hidden -translate-x-1/2 bg-brand px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-lg transition-opacity duration-700 lg:block ${
          hinted ? "opacity-0" : "opacity-100"
        }`}
      >
        {hint}
      </p>
    </>
  );
}
