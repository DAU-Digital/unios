import type { Metadata } from "next";
import Image from "next/image";
import { Book } from "@/components/book/Book";
import { BookPage } from "@/components/book/BookPage";
import { PAGES } from "@/components/book/plan";
import { Deck } from "@/components/Deck";
import { Footer } from "@/components/Footer";
import { Gate } from "@/components/Gate";
import { Header } from "@/components/Header";
import { HeroVisual } from "@/components/HeroVisual";
import { Panels } from "@/components/Panels";
import { getDict, type Dict, type Locale } from "@/content";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { shortName, splitAlias, withTail } from "@/lib/text";

const pad = (n: number) => String(n).padStart(2, "0");

function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

// Splits a heading into words so they can rise in one after another.
function Words({ text, from = 0 }: { text: string; from?: number }) {
  return text.split(" ").map((w, i) => (
    <span key={i}>
      {i > 0 && " "}
      <span className="w" style={{ "--w": from + i } as React.CSSProperties}>
        {w}
      </span>
    </span>
  ));
}

type Head = { label: string; title: string; lead?: string };

function SectionHead({ label, title, lead, note, dark }: Head & { note?: string; dark?: boolean }) {
  return (
    <div className={`border-t-2 pt-5 ${dark ? "border-white" : "border-ink"}`} data-reveal>
      <p className={`label ${dark ? "!text-white/60" : ""}`}>{label}</p>
      <div className="mt-4 grid gap-6 lg:grid-cols-4 lg:gap-x-6">
        <h2 className="d2 lg:col-span-2">
          <Words text={title} />
        </h2>
        {lead && (
          <div className="lg:col-span-2 lg:pt-2">
            <p className={`lead ${dark ? "!text-white/70" : ""}`}>{lead}</p>
            {/* Translations written for this section, until the teacher approves them. */}
            {note && (
              <p data-why-note className="mt-4 inline-block border-l-2 border-brand bg-brand-soft px-4 py-2 text-sm text-brand-deep">
                {note}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// A Copilot's name, with any parenthesised English alias on its own small line
// ("AIチューター（AI Tutor）"), so narrow cards never break inside it.
function CopilotName({ name, className, aliasClass }: { name: string; className: string; aliasClass: string }) {
  const [main, alias] = splitAlias(name);
  return (
    <h3 className={className}>
      {main}
      {alias && (
        <span data-copilot-alias className={`mt-1 block text-sm font-normal tracking-normal ${aliasClass}`}>
          {alias}
        </span>
      )}
    </h3>
  );
}

// Emphasises one phrase inside a sentence; plain text when it is not there.
function Strong({ text, strong, className }: { text: string; strong: string; className: string }) {
  const at = text.indexOf(strong);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong className={`font-semibold ${className}`}>{strong}</strong>
      {text.slice(at + strong.length)}
    </>
  );
}

// One screen of the deck. The fixed header sits over its top padding.
function Slide({ id, title, className = "", children }: { id: string; title: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} data-slide data-title={title} aria-label={title} className={`slide ${className}`}>
      {children}
    </section>
  );
}

// A section head over its details; details that need more than one screen
// are split into panels that scroll sideways.
function Section({
  id,
  head,
  panels,
  t,
  dark,
  className = "",
  mullions,
  note,
}: {
  id: string;
  head: Head;
  panels: React.ReactNode[];
  t: Dict;
  dark?: boolean;
  className?: string;
  mullions?: boolean;
  note?: string;
}) {
  // Only the head's own fields: section dicts carry other keys (roadmap.note, …).
  const sectionHead = <SectionHead label={head.label} title={head.title} lead={head.lead} note={note} dark={dark} />;
  return (
    <Slide id={id} title={head.title} className={className}>
      <Container className={`slide-body ${mullions ? "mullions" : ""}`}>
        <Panels head={sectionHead} panels={panels} prev={t.deck.prev} next={t.deck.next} />
      </Container>
    </Slide>
  );
}

function Hero({ t }: { t: Dict }) {
  const h = t.hero;
  return (
    <Slide id="top" title={t.brand.project} className="overflow-hidden">
      {/* On desktop the whole hero fits the first screen below the header. */}
      <Container className="mullions grid gap-10 py-10 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:content-between lg:gap-x-6 lg:py-12 [@media(max-height:52rem)]:lg:gap-y-6 [@media(max-height:52rem)]:lg:py-6">
        <div className="flex flex-col justify-center lg:col-span-7" data-reveal>
          <p className="label flex items-start gap-2">
            <span className="mt-1.5 size-2.5 shrink-0 bg-brand" aria-hidden />
            {h.eyebrow} · {h.model}
          </p>
          <h1 className="hero-title mt-6">
            <span className="block">
              <Words text={h.title[0]} />
            </span>
            <span className="block text-balance text-ink-soft">
              <Words text={h.title[1]} from={h.title[0].split(" ").length} />
            </span>
          </h1>
          <p className="lead mt-6 max-w-2xl">{h.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#motto"
              className="group inline-flex h-13 items-center gap-3 bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              {h.cta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </a>
            <a
              href="#model"
              className="group inline-flex h-13 items-center gap-3 border border-ink px-6 font-semibold transition-colors hover:bg-ink hover:text-white"
            >
              {t.nav.model}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center lg:col-span-5">
          <HeroVisual
            layers={t.model.layers}
            copilots={t.copilots.items.map((c) => shortName(c.name))}
            label={t.hero.model}
            className="w-full max-w-[32rem]"
          />
        </div>

        <dl className="grid grid-cols-2 border-t-2 border-ink sm:grid-cols-4 lg:col-span-12" data-reveal>
          {h.stats.map((s) => (
            <div key={s.label} className="border-rule py-4 pr-4 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className="d3 tabular-nums" data-count>
                {s.value}
              </dd>
              <dd className="label mt-1">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Slide>
  );
}

function Motto({ t }: { t: Dict }) {
  return (
    <Slide id="motto" title={t.motto.label} className="bg-ink text-white">
      <Container className="slide-body">
        <div className="border-t-2 border-white pt-5" data-reveal>
          <p className="text-sm text-white/60">{t.motto.label}</p>
          <p className="d1 mt-10 max-w-5xl">
            <Words text={t.motto.text} />
          </p>
        </div>
      </Container>
    </Slide>
  );
}

// The Why table, split over two panels so every row fits a projector screen.
function WhyTable({ head, rows }: { head: Dict["why"]["table"]["head"]; rows: Dict["why"]["table"]["rows"] }) {
  return (
    <div role="table" className="border-t-2 border-ink">
      <div role="row" className="hidden gap-6 py-2 text-sm font-semibold text-ink-soft lg:grid lg:grid-cols-[1.1fr_1.1fr_1fr]">
        {head.map((h) => (
          <span key={h} role="columnheader">
            {h}
          </span>
        ))}
      </div>
      {rows.map((r) => {
        // The last word travels with the layer codes so a code never starts a line alone.
        const [lead, tail] = withTail(r.answer);
        return (
          <div key={r.problem} role="row" className="grid gap-2 border-t border-rule py-2.5 lg:grid-cols-[1.1fr_1.1fr_1fr] lg:gap-6" data-reveal>
            <span role="cell">{r.problem}</span>
            <span role="cell" className="text-ink-soft">
              {r.effect}
            </span>
            <span role="cell" className="font-medium">
              {lead}
              <span className="whitespace-nowrap">
                {tail}
                {r.codes.map((c) => (
                  <span key={c} className="ml-1.5 inline-block border border-brand px-1.5 align-middle text-xs leading-5 font-semibold text-brand">
                    {c}
                  </span>
                ))}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

// The case for the initiative: the forces at work, the two paths, and what is at stake.
function Why({ t }: { t: Dict }) {
  const w = t.why;
  return (
    <Section
      id="why"
      t={t}
      head={w}
      note={w.note}
      panels={[
        <div key="drivers" className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {w.drivers.map((d, i) => (
            <div key={d.title} className="group relative border-t border-rule pt-5" data-reveal style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
              <span aria-hidden className="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
              <p className="text-sm font-semibold text-brand">{pad(i + 1)}</p>
              <h3 className="d4 mt-3 transition-colors group-hover:text-brand">{d.title}</h3>
              <p className="mt-3 text-ink-soft">{d.text}</p>
            </div>
          ))}
        </div>,
        // Subgrid rows keep the two cards' result lines level.
        <div key="paths" className="grid gap-6 lg:grid-cols-2 lg:grid-rows-[repeat(4,auto)]">
          {w.paths.map((p, i) => (
            <article
              key={p.tag}
              className={`flex flex-col p-6 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-y-0 lg:p-8 ${i ? "bg-ink text-white" : "bg-paper-deep"}`}
              data-reveal
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <p className={`text-sm font-semibold tracking-wide ${i ? "text-[#ff6b72]" : "text-ink-soft"}`}>{p.tag}</p>
              <h3 className="d3 mt-3">{p.title}</h3>
              <p className={`mt-4 ${i ? "text-white/75" : "text-ink-soft"}`}>{p.text}</p>
              <div className="pt-8">
                <p data-path-result className={`border-t pt-5 font-medium ${i ? "border-white/15" : "border-rule"}`}>
                  <Strong text={p.result} strong={p.strong} className={i ? "text-[#ff6b72]" : "text-brand"} />
                </p>
              </div>
            </article>
          ))}
        </div>,
        <WhyTable key="table-1" head={w.table.head} rows={w.table.rows.slice(0, 3)} />,
        <WhyTable key="table-2" head={w.table.head} rows={w.table.rows.slice(3)} />,
      ]}
    />
  );
}

function Overview({ t }: { t: Dict }) {
  const o = t.overview;
  return (
    <Section
      id="overview"
      t={t}
      head={o}
      panels={[
        <div key="facts" className="grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
          {o.facts.map((f) => (
            <div
              key={f.value}
              data-reveal
              className="group flex min-h-48 flex-col justify-start gap-10 border-b border-rule p-6 transition-colors duration-300 hover:bg-brand hover:text-white sm:[&:nth-child(odd)]:border-r lg:min-h-60 lg:border-r lg:last:border-r-0"
            >
              <p className="num" data-count>
                {f.value}
              </p>
              <div>
                <p data-fact-title className="d4">
                  {f.title}
                </p>
                <p className="mt-2 text-ink-soft group-hover:text-white/85">{f.text}</p>
              </div>
            </div>
          ))}
        </div>,
      ]}
    />
  );
}

function Tier({ tier }: { tier: Dict["philosophy"]["tiers"][number] }) {
  return (
    <div className="grid gap-6 border-t border-rule py-7 transition-colors first:border-t-0 first:pt-0 hover:border-ink lg:grid-cols-4 lg:gap-x-6" data-reveal>
      <div>
        <h3 className="d3">{tier.name}</h3>
        <p className="label mt-2">{tier.text}</p>
      </div>
      <ol className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-5">
        {tier.items.map((it, i) => (
          <li key={it.en} className="group cursor-default">
            <span className="text-xs font-semibold text-brand">T{i + 1}</span>
            <p className="mt-1 text-lg font-semibold transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand">{it.name}</p>
            <p className="text-sm text-ink-soft">{it.en}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Philosophy({ t }: { t: Dict }) {
  const p = t.philosophy;
  const [first, ...rest] = p.tiers;
  return (
    <Section
      id="philosophy"
      t={t}
      head={p}
      mullions
      panels={[
        <div key="1">
          <Tier tier={first} />
          {rest.slice(0, 1).map((tier) => (
            <Tier key={tier.name} tier={tier} />
          ))}
        </div>,
        <div key="2">
          {rest.slice(1).map((tier) => (
            <Tier key={tier.name} tier={tier} />
          ))}
          <div className="grid gap-4 border-t-2 border-ink pt-6 lg:grid-cols-4 lg:gap-x-6" data-reveal>
            <p className="label">{p.bridge.label}</p>
            <p className="d4 flex flex-wrap gap-x-4 gap-y-2 lg:col-span-3">
              {p.bridge.items.map((b, i) => (
                <span key={b}>
                  {i > 0 && <span className="mr-4 text-brand" aria-hidden>·</span>}
                  {b}
                </span>
              ))}
            </p>
          </div>
        </div>,
      ]}
    />
  );
}

function Layers({ layers, from }: { layers: Dict["model"]["layers"]; from: number }) {
  return (
    <ol start={from + 1} className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
      {layers.map((l, i) => (
        <li
          key={l.code}
          className="group bg-paper p-6 transition-colors duration-300 hover:bg-ink hover:text-white lg:p-7"
          data-reveal
          style={{ "--delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
        >
          <p className="text-sm font-semibold text-brand tabular-nums">{l.code}</p>
          <h3 className="d4 mt-3 transition-transform duration-300 group-hover:translate-x-1">{l.name}</h3>
          <p className="mt-3 text-ink-soft transition-colors group-hover:text-white/70">{l.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Model({ t }: { t: Dict }) {
  const m = t.model;
  return (
    <Section
      id="model"
      t={t}
      head={m}
      panels={[<Layers key="1" layers={m.layers.slice(0, 6)} from={0} />, <Layers key="2" layers={m.layers.slice(6)} from={6} />]}
    />
  );
}

function Copilots({ t }: { t: Dict }) {
  const c = t.copilots;
  return (
    <Section
      id="copilots"
      t={t}
      head={c}
      dark
      className="bg-ink text-white"
      panels={[
        <div key="items">
          {/* Subgrid rows keep the cards' limit lines level. */}
          <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(4,auto)]">
            {c.items.map((it, i) => (
              <article
                key={it.name}
                className="group relative flex flex-col bg-ink p-6 transition-colors duration-300 hover:bg-[#262a31] lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-y-0 lg:p-7"
                data-reveal
                style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                <p className="text-sm text-white/55">
                  {c.forLabel}: {it.for}
                </p>
                <CopilotName name={it.name} aliasClass="text-white/55" className="d3 mt-3" />
                <p className="mt-4 min-h-[3lh] text-white/75">{it.does}</p>
                <div data-copilot-guard className="mt-6 border-t border-white/15 pt-4">
                  <p className="text-xs font-semibold tracking-wide text-[#ff6b72]">{c.guardLabel}</p>
                  <p className="mt-1 font-medium">{it.guard}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-white/60">{c.foundation}</p>
        </div>,
        <div key="quote" className="grid gap-4 lg:grid-cols-4 lg:gap-x-6" data-reveal>
          <div className="lg:col-span-3 lg:col-start-2">
            {c.quote.map((q, i) => (
              <p key={q} className={`quote ${i === 2 ? "font-medium text-brand" : ""}`}>
                {q}
              </p>
            ))}
          </div>
        </div>,
      ]}
    />
  );
}

function Maturity({ t }: { t: Dict }) {
  const m = t.maturity;
  return (
    <Section
      id="maturity"
      t={t}
      head={m}
      panels={[
        <div key="levels">
          {/* Subgrid rows keep the descriptions level whatever the names wrap to. */}
          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-[repeat(5,auto)]">
            {m.levels.map((l, i) => (
              <li key={l.en} className="lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:gap-y-0" data-reveal style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
                <div className={`grow-x h-1 ${i === m.levels.length - 1 ? "bg-brand" : "bg-ink"}`} style={{ opacity: 0.35 + i * 0.16 }} />
                <p className="label mt-5">{pad(i + 1)}</p>
                <h3 className="d4 mt-2">{l.name}</h3>
                {/* The second name line, held empty where a level has none so the rows stay level. */}
                <p className="text-sm text-ink-soft" aria-hidden={l.en === l.name || undefined}>
                  {l.en !== l.name ? l.en : ""}
                </p>
                <p data-level-text className="mt-3 text-ink-soft">
                  {l.text}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-12 flex items-center gap-3 font-semibold">
            <span className="size-2.5 bg-brand" aria-hidden />
            {m.target}
          </p>
        </div>,
      ]}
    />
  );
}

function Phases({ phases, from }: { phases: Dict["roadmap"]["phases"]; from: number }) {
  return (
    <ol start={from + 1}>
      {phases.map((p, i) => (
        <li key={p.when} className="group relative grid gap-3 border-t border-rule py-6 transition-colors hover:bg-white lg:grid-cols-4 lg:gap-x-6" data-reveal>
          <span aria-hidden className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100" />
          <p className={`d3 pl-4 tabular-nums transition-colors group-hover:text-brand ${from + i === 0 ? "text-brand" : ""}`}>{p.when}</p>
          <p className="d4 pl-4 lg:pl-0">{p.name}</p>
          <p className="pl-4 text-ink-soft lg:col-span-2 lg:pl-0">{p.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Roadmap({ t }: { t: Dict }) {
  const r = t.roadmap;
  return (
    <Section
      id="roadmap"
      t={t}
      head={r}
      mullions
      panels={[
        <Phases key="1" phases={r.phases.slice(0, 3)} from={0} />,
        <div key="2">
          <Phases phases={r.phases.slice(3)} from={3} />
          <div className="grid gap-4 border-t-2 border-ink pt-8 lg:grid-cols-4 lg:gap-x-6" data-reveal>
            <p className="quote font-normal lg:col-span-3">“{r.principle}”</p>
            <p className="text-sm text-ink-soft lg:pt-2 lg:pr-6">{r.note}</p>
          </div>
        </div>,
      ]}
    />
  );
}

function Targets({ t }: { t: Dict }) {
  const g = t.targets;
  return (
    <Slide id="targets" title={g.title} className="bg-brand text-white">
      <Container className="slide-body">
        <div>
          <p className="text-sm text-white/75">{g.label}</p>
          <h2 className="d2 mt-3">{g.title}</h2>
          <dl className="mt-12 grid border-t-2 border-white sm:grid-cols-2 lg:grid-cols-5">
            {g.items.map((s, i) => (
              <div
                key={s.label}
                className="border-b border-white/25 py-6 sm:px-5 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"
                data-reveal
                style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="num" data-count>
                  {s.value}
                </dd>
                <dd className="mt-4 text-white/85">{s.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-sm text-white/70">{g.note}</p>
        </div>
      </Container>
    </Slide>
  );
}

function Pillars({ t }: { t: Dict }) {
  const p = t.pillars;
  const tile = (it: { title: string; text: string }, i: number) => (
    <li key={it.title} className="group bg-paper p-6 transition-colors duration-300 hover:bg-brand hover:text-white" data-reveal>
      <p className="text-sm font-semibold text-brand transition-colors group-hover:text-white">{pad(i + 1)}</p>
      <h3 className="d4 mt-8">{it.title}</h3>
      <p className="mt-2 text-ink-soft transition-colors group-hover:text-white/85">{it.text}</p>
    </li>
  );
  return (
    <Section
      id="pillars"
      t={t}
      head={p}
      panels={[
        <ol key="1" className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {p.items.slice(0, 4).map((it, i) => tile(it, i))}
        </ol>,
        <ol key="2" start={5} className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {p.items.slice(4).map((it, i) => tile(it, i + 4))}
          <li className="flex flex-col bg-ink p-6 text-white" data-reveal>
            <p className="text-sm text-white/60">{p.crossTitle}</p>
            <ul className="mt-auto space-y-2 pt-8 text-[0.9375rem]">
              {p.cross.map((c) => (
                <li key={c} className="border-t border-white/15 pt-2">
                  {c}
                </li>
              ))}
            </ul>
          </li>
        </ol>,
      ]}
    />
  );
}

function Studio({ t }: { t: Dict }) {
  const s = t.studio;
  return (
    <Section
      id="studio"
      t={t}
      head={{ label: s.label, title: s.title }}
      panels={[
        <div key="brief" className="grid gap-8 lg:grid-cols-4 lg:gap-x-6" data-reveal>
          <div className="lg:col-span-2">
            <p className="inline-block border border-ink px-3 py-1 text-sm font-medium">{s.badge}</p>
            <p className="lead mt-6 max-w-xl">{s.lead}</p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-paper-deep lg:col-span-2">
            <Image src="/images/campus.webp" alt={t.brand.school} fill sizes="(min-width: 64rem) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]" />
          </div>
        </div>,
        <ol key="standards" className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {s.standards.map((name, i) => (
            <li key={name} className="group flex items-baseline gap-6 border-b border-rule py-4 transition-all duration-300 hover:border-ink hover:pl-3" data-reveal>
              <span className="w-12 shrink-0 text-sm font-semibold text-brand tabular-nums">TC{i + 1}</span>
              <span className="d4 transition-colors group-hover:text-brand">{name}</span>
            </li>
          ))}
        </ol>,
      ]}
    />
  );
}

function Benchmark({ t }: { t: Dict }) {
  const b = t.benchmark;
  return (
    <Section
      id="benchmark"
      t={t}
      head={b}
      mullions
      panels={[
        <dl key="stats" className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {b.stats.map((s) => (
            <div key={s.label} className="border-t border-rule py-6" data-reveal>
              <dt className="sr-only">{s.label}</dt>
              <dd className="num" data-count>
                {s.value}
              </dd>
              <dd className="mt-3 text-ink-soft">{s.label}</dd>
            </div>
          ))}
        </dl>,
        <div key="advantages">
          <div className="grid gap-6 lg:grid-cols-4 lg:gap-x-6">
            <h3 className="d3">{b.advantagesTitle}</h3>
            <ol className="grid gap-x-6 sm:grid-cols-2 lg:col-span-3">
              {b.advantages.map((a, i) => (
                <li key={a} className="group relative flex gap-4 border-t border-rule py-4" data-reveal>
                  <span aria-hidden className="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="w-6 shrink-0 text-sm font-semibold text-brand tabular-nums">{pad(i + 1)}</span>
                  <span data-advantage-text className="font-medium transition-transform duration-300 group-hover:translate-x-1">
                    {a}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-8 border-l-2 border-brand pl-4 text-ink-soft lg:ml-[calc(25%+0.375rem)]">{b.caveat}</p>
        </div>,
      ]}
    />
  );
}

function Principles({ t }: { t: Dict }) {
  const p = t.principles;
  return (
    <Section
      id="principles"
      t={t}
      head={p}
      panels={[
        <ul key="items" className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {p.items.map((it, i) => (
            <li key={it.title} className="group relative bg-paper p-6 transition-colors duration-300 hover:bg-white lg:p-7" data-reveal style={{ "--delay": `${(i % 3) * 80}ms` } as React.CSSProperties}>
              <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
              <h3 className="d4 transition-colors group-hover:text-brand">{it.title}</h3>
              <p className="mt-3 text-ink-soft">{it.text}</p>
            </li>
          ))}
        </ul>,
      ]}
    />
  );
}

// The last slide closes with the quote and the footer.
function Closing({ t }: { t: Dict }) {
  return (
    <Slide id="closing" title={t.closing.cite} className="!justify-between lg:!pr-0">
      {/* The footer runs full width; the quote keeps the room other slides leave for the rail. */}
      <Container className="slide-body lg:pr-16">
        <figure className="grid gap-6 border-t-2 border-ink pt-8 lg:grid-cols-4 lg:gap-x-6" data-reveal>
          <span className="text-7xl leading-none font-bold text-brand" aria-hidden>
            “
          </span>
          <div className="lg:col-span-3">
            <blockquote className="quote [@media(max-height:52rem)]:text-[1.5rem]">{t.closing.quote}</blockquote>
            <figcaption className="label mt-6">— {t.closing.cite}</figcaption>
          </div>
        </figure>
      </Container>
      <Footer t={t} />
    </Slide>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return pageMetadata(locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const t = getDict(locale);
  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD must be raw JSON; "<" is escaped so content can never close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)).replace(/</g, "\\u003c") }}
      />
      <Gate t={t} locale={locale} />
      <div id="deck">
        <Header t={t} locale={locale} />
        <main>
          <Hero t={t} />
          <Motto t={t} />
          <Why t={t} />
          <Overview t={t} />
          <Philosophy t={t} />
          <Model t={t} />
          <Copilots t={t} />
          <Maturity t={t} />
          <Roadmap t={t} />
          <Targets t={t} />
          <Pillars t={t} />
          <Studio t={t} />
          <Benchmark t={t} />
          <Principles t={t} />
          <Closing t={t} />
        </main>
        <Deck hint={t.deck.hint} />
      </div>
      {/* Outside #deck, which turns inert while the book is open. */}
      <Book
        pages={PAGES.map((kind, i) => (
          <BookPage key={kind} kind={kind} t={t} number={i + 1} />
        ))}
        title={t.brand.project}
        closeLabel={t.nav.close}
        prevLabel={t.deck.prev}
        nextLabel={t.deck.next}
      />
    </>
  );
}
