"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { localeLabels, locales, type Dict, type Locale } from "@/content";
import { ACCESS_KEY, ACCESS_STORE } from "@/content/site";

// What the welcome screen says; each page fills it from its own copy.
export type GateCopy = {
  school: string;
  project: string;
  eyebrow: string;
  motto: string;
  gate: Dict["gate"];
};

export function Gate({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <GateView
      copy={{ school: t.brand.school, project: t.brand.project, eyebrow: t.hero.eyebrow, motto: t.motto.text, gate: t.gate }}
      locale={locale}
    />
  );
}

// Welcome screen over the deck until the guest enters the access key. A guest
// who has entered it once is let straight in (see the script in the layout).
// `path` keeps the language links on the same page, e.g. "2050/".
export function GateView({ copy, locale, path = "" }: { copy: GateCopy; locale: Locale; path?: string }) {
  const t = { brand: { school: copy.school, project: copy.project }, hero: { eyebrow: copy.eyebrow }, motto: { text: copy.motto } };
  const g = copy.gate;
  const input = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<"locked" | "opening" | "open">("locked");
  const [tries, setTries] = useState(0);

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-unlocked")) {
      setPhase("open");
      return;
    }
    document.getElementById("deck")?.setAttribute("inert", "");
    input.current?.focus();
  }, []);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.current?.value.trim().toUpperCase() !== ACCESS_KEY) {
      setTries((n) => n + 1);
      input.current?.select();
      return;
    }
    try {
      localStorage.setItem(ACCESS_STORE, "1");
    } catch {}
    document.getElementById("deck")?.removeAttribute("inert");
    document.documentElement.setAttribute("data-unlocked", "");
    window.dispatchEvent(new Event("dau:unlock"));
    setPhase("opening");
  }

  if (phase === "open") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      className={`gate ${phase === "opening" ? "is-opening" : ""}`}
      onAnimationEnd={(e) => e.target === e.currentTarget && setPhase("open")}
    >
      <div className="flex flex-col overflow-hidden bg-ink p-6 text-white sm:p-10 lg:w-5/12 lg:p-12">
        <div className="flex items-center gap-3">
          <Image src="/images/logo-dau.png" alt="DAU" width={44} height={45} priority />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight">DAU</span>
            <span className="text-xs text-white/60">{t.brand.school}</span>
          </span>
        </div>
        <div className="mt-auto hidden pt-10 lg:block">
          <p className="label !text-white/60">{t.hero.eyebrow}</p>
          <p className="d2 mt-4">{t.brand.project}</p>
          <p className="mt-4 max-w-md text-white/70">{t.motto.text}</p>
        </div>
        {/* Tall screens only, so it never runs into the copy above. */}
        <div
          aria-hidden
          className="-mb-6 mt-8 hidden text-[min(14vw,13rem)] leading-[0.75] font-bold tracking-[-0.06em] text-brand select-none lg:[@media(min-height:46rem)]:block"
        >
          DAU
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-paper p-6 sm:p-10 lg:p-12">
        <nav aria-label="Language" className="flex self-end text-[0.8125rem]">
          {locales.map((l) => (
            <a
              key={l}
              href={`/${l}/${path}`}
              hrefLang={l}
              aria-current={l === locale ? "page" : undefined}
              className={`grid h-8 place-items-center px-3 font-medium ${l === locale ? "bg-ink text-white" : "text-ink-soft hover:text-ink"}`}
            >
              {localeLabels[l]}
            </a>
          ))}
        </nav>

        <div className="my-auto w-full max-w-xl py-10">
          <p className="label flex items-center gap-2">
            <span className="size-2.5 bg-brand" aria-hidden />
            {t.brand.project}
          </p>
          <h1 id="gate-title" className="d1 mt-5">
            {g.title}
          </h1>
          <p className="lead mt-6">{g.lead}</p>

          <form onSubmit={submit} className="mt-10" noValidate>
            <label htmlFor="gate-key" className="label">
              {g.label}
            </label>
            <div key={tries} className={`mt-2 flex flex-col gap-3 sm:flex-row ${tries ? "gate-shake" : ""}`}>
              <input
                ref={input}
                id="gate-key"
                name="key"
                type="text"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder={g.placeholder}
                aria-invalid={tries > 0 || undefined}
                aria-describedby={tries ? "gate-error" : "gate-note"}
                className={`h-14 w-full min-w-0 border-2 sm:flex-1 bg-white px-4 text-lg font-semibold tracking-[0.2em] uppercase outline-none placeholder:font-normal placeholder:tracking-normal placeholder:normal-case focus:border-brand ${
                  tries ? "border-brand" : "border-ink"
                }`}
              />
              <button
                type="submit"
                className="group inline-flex h-14 items-center justify-center gap-3 bg-brand px-7 font-semibold text-white transition-colors hover:bg-brand-strong"
              >
                {g.submit}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
            <p id="gate-error" role="alert" className="mt-3 min-h-6 text-sm font-medium text-brand">
              {tries > 0 && g.error}
            </p>
            <p id="gate-note" className="text-sm text-ink-soft">
              {g.note}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
