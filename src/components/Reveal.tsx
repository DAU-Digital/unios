"use client";

import { useEffect } from "react";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Counts the number inside "≥50%", "2031", etc. up from zero.
function countUp(el: HTMLElement) {
  const m = el.textContent?.match(/^(\D*)(\d+)(\D*)$/);
  if (!m || reduceMotion()) return;
  const [, pre, num, post] = m;
  const target = Number(num);
  // Years count from close by rather than from zero.
  const from = target > 1900 ? target - 40 : 0;
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - start) / 1400, 1);
    const eased = 1 - (1 - p) ** 3;
    el.textContent = `${pre}${Math.round(from + (target - from) * eased)}${post}`;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Scroll behaviours: reveal on view, count-up, active nav link, progress bar.
export function Reveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          e.target.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          if (e.target instanceof HTMLElement && e.target.hasAttribute("data-count")) countUp(e.target);
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    // The hero is on screen at load, so it animates in straight away
    // (after a frame, so the hidden start state is painted first), or as the
    // welcome screen lifts.
    const hero = document.querySelectorAll("#top [data-reveal]");
    const showHero = () =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          hero.forEach((el) => {
            el.classList.add("is-in");
            el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          }),
        ),
      );
    if (document.documentElement.hasAttribute("data-unlocked")) showHero();
    else window.addEventListener("dau:unlock", showHero, { once: true });
    document.querySelectorAll("[data-reveal]:not(#top [data-reveal])").forEach((el) => reveal.observe(el));

    const links = document.querySelectorAll<HTMLAnchorElement>(".nav-link");
    const active = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          links.forEach((a) => a.toggleAttribute("data-active", a.hash === `#${e.target.id}`));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((a) => {
      const section = a.hash && document.querySelector(a.hash);
      if (section) active.observe(section);
    });

    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar?.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      reveal.disconnect();
      active.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("dau:unlock", showHero);
    };
  }, []);
  return null;
}
