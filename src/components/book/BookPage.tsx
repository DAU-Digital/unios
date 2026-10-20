import Image from "next/image";
import type { Dict } from "@/content";
import { shortName, withTail } from "@/lib/text";
import { HeroVisual } from "../HeroVisual";
import type { PageKind } from "./plan";

// One page of the book view. Pages reuse the deck's copy as is: a page may leave
// out secondary lines to fit, but never says anything the slides do not.

const pad = (n: number) => String(n).padStart(2, "0");

function Opener({ label, title, lead, children }: { label: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <>
      <p className="book-label">{label}</p>
      <h2 className="book-title">{title}</h2>
      {lead && <p className="book-lead">{lead}</p>}
      {children}
    </>
  );
}

// A large figure at the foot of an opening page ("9" layers, "4" Copilots…).
function Big({ value, caption }: { value: string; caption: string }) {
  return (
    <p className="book-big">
      <span className="book-big-num">{value}</span>
      <span className="book-big-cap">{caption}</span>
    </p>
  );
}

function Strong({ text, strong }: { text: string; strong: string }) {
  const at = text.indexOf(strong);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong className="font-semibold text-brand">{strong}</strong>
      {text.slice(at + strong.length)}
    </>
  );
}

function Chips({ text, codes }: { text: string; codes: string[] }) {
  const [head, tail] = withTail(text);
  return (
    <>
      {head}
      <span className="whitespace-nowrap">
        {tail}
        {codes.map((c) => (
          <span key={c} className="book-chip ml-1.5 border border-brand px-1">
            {c}
          </span>
        ))}
      </span>
    </>
  );
}

function Tier({ tier, children }: { tier: Dict["philosophy"]["tiers"][number]; children?: React.ReactNode }) {
  return (
    <>
      <h3 className="book-subtitle">{tier.name}</h3>
      <p className="book-text text-ink-soft">{tier.text}</p>
      <ol className="book-list mt-4">
        {tier.items.map((it, i) => (
          <li key={it.en} className="flex items-baseline gap-4">
            <span className="book-chip w-6 shrink-0">T{i + 1}</span>
            <span className="book-item-name">{it.name}</span>
            <span className="book-text ml-auto text-right text-ink-soft">{it.en}</span>
          </li>
        ))}
      </ol>
      {children}
    </>
  );
}

function content(kind: PageKind, t: Dict): React.ReactNode {
  switch (kind) {
    case "diagram":
      return (
        <HeroVisual
          variant="book"
          layers={t.model.layers}
          copilots={t.copilots.items.map((c) => shortName(c.name))}
          label={t.hero.model}
          className="my-auto w-full"
        />
      );
    case "cover":
      return (
        <>
          <Image src="/images/logo-dau.png" alt="DAU" width={56} height={57} />
          <p className="book-text mt-auto text-white/70">{t.hero.eyebrow}</p>
          <h1 className="book-title mt-3 !text-[44px]">
            <span className="block">{t.hero.title[0]}</span>
            <span className="block text-white/70">{t.hero.title[1]}</span>
          </h1>
          <p className="book-text mt-4 text-white/80">{t.hero.model}</p>
          <div className="mt-10 border-t border-white/25 pt-4">
            <p className="book-text text-white/60">{t.motto.label}</p>
            <p className="book-item-name mt-1">{t.motto.text}</p>
          </div>
        </>
      );
    case "why-open":
      return (
        <Opener label={t.why.label} title={t.why.title} lead={t.why.lead}>
          {t.why.note && <p className="book-text mt-6 border-l-2 border-brand bg-brand-soft px-4 py-2 text-brand-deep">{t.why.note}</p>}
        </Opener>
      );
    case "why-drivers":
      return (
        <ol className="book-list">
          {t.why.drivers.map((d, i) => (
            <li key={d.title}>
              <span className="book-chip">{pad(i + 1)}</span>
              <p className="book-item-name mt-1">{d.title}</p>
              <p className="book-text text-ink-soft">{d.text}</p>
            </li>
          ))}
        </ol>
      );
    case "why-paths":
      return t.why.paths.map((p, i) => (
        <article key={p.tag} className={`p-5 ${i ? "mt-4 bg-ink text-white" : "bg-paper-deep"}`}>
          <p className={`book-text font-semibold ${i ? "text-[#ff6b72]" : "text-ink-soft"}`}>{p.tag}</p>
          <h3 className="book-subtitle mt-1">{p.title}</h3>
          <p className={`book-text mt-2 ${i ? "text-white/75" : "text-ink-soft"}`}>{p.text}</p>
          <p className="book-text mt-2 font-medium">
            <Strong text={p.result} strong={p.strong} />
          </p>
        </article>
      ));
    case "why-table":
      return (
        <ol className="book-list book-dense">
          {t.why.table.rows.map((r) => (
            <li key={r.problem}>
              <p className="book-item-name">{r.problem}</p>
              <p className="book-text text-ink-soft">{r.effect}</p>
              <p className="book-text">
                → <Chips text={r.answer} codes={r.codes} />
              </p>
            </li>
          ))}
        </ol>
      );
    case "overview-open":
      return <Opener label={t.overview.label} title={t.overview.title} lead={t.overview.lead} />;
    case "overview-facts":
      return (
        <div className="grid grid-cols-2 border-t-2 border-ink">
          {t.overview.facts.map((f) => (
            <div key={f.value} className="border-b border-rule p-4 odd:border-r">
              <p className="book-fact">{f.value}</p>
              <p className="book-item-name mt-3">{f.title}</p>
              <p className="book-text text-ink-soft">{f.text}</p>
            </div>
          ))}
        </div>
      );
    case "identity-open":
      return <Opener label={t.philosophy.label} title={t.philosophy.title} lead={t.philosophy.lead} />;
    case "tier-philosophy":
      return <Tier tier={t.philosophy.tiers[0]} />;
    case "tier-education":
      return <Tier tier={t.philosophy.tiers[1]} />;
    case "tier-values":
      return (
        <Tier tier={t.philosophy.tiers[2]}>
          <div className="mt-auto border-t-2 border-ink pt-3">
            <p className="book-text text-ink-soft">{t.philosophy.bridge.label}</p>
            <p className="book-item-name mt-1">
              {t.philosophy.bridge.items.map((b, i) => (
                <span key={b}>
                  {i > 0 && " · "}
                  {/* An indicator breaks only between items. */}
                  <span data-bridge-item className="whitespace-nowrap">
                    {b}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </Tier>
      );
    case "model-open":
      return (
        <Opener label={t.model.label} title={t.model.title} lead={t.model.lead}>
          <Big value={t.hero.stats[0].value} caption={t.hero.stats[0].label} />
        </Opener>
      );
    case "model-layers":
      return (
        <ol className="book-list book-rows">
          {t.model.layers.map((l) => (
            <li key={l.code} className="flex items-baseline gap-4">
              <span className="book-chip w-7 shrink-0">{l.code}</span>
              <span className="book-item-name">{l.name}</span>
            </li>
          ))}
        </ol>
      );
    case "copilots-open":
      return (
        <Opener label={t.copilots.label} title={t.copilots.title} lead={t.copilots.lead}>
          <div className="mt-5">
            {t.copilots.quote.map((q, i) => (
              <p key={q} className={`book-text ${i === 2 ? "font-semibold text-brand" : ""}`}>
                {q}
              </p>
            ))}
          </div>
          <Big value={t.hero.stats[1].value} caption={t.hero.stats[1].label} />
        </Opener>
      );
    case "copilots-list":
      return (
        <ol className="book-list">
          {t.copilots.items.map((c) => (
            <li key={c.name}>
              <p className="book-item-name">{c.name}</p>
              <p className="book-text text-ink-soft">
                {t.copilots.forLabel}: {c.for}
              </p>
              <p className="book-text text-brand-deep">
                {t.copilots.guardLabel}: {c.guard}
              </p>
            </li>
          ))}
        </ol>
      );
    case "maturity-open":
      return (
        <Opener label={t.maturity.label} title={t.maturity.title} lead={t.maturity.lead}>
          <Big value={t.hero.stats[2].value} caption={t.hero.stats[2].label} />
        </Opener>
      );
    case "maturity-levels":
      return (
        <>
          <ol className="book-list">
            {t.maturity.levels.map((l, i) => (
              <li key={l.text} className="grid grid-cols-[2rem_1fr] gap-x-3">
                <span className="book-chip pt-1">{pad(i + 1)}</span>
                <span>
                  <span className="book-item-name block">{l.name}</span>
                  <span className="book-text block text-ink-soft">{l.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="book-text mt-4 font-semibold">{t.maturity.target}</p>
        </>
      );
    case "roadmap-open":
      return (
        <Opener label={t.roadmap.label} title={t.roadmap.title} lead={t.roadmap.lead}>
          <p className="book-quote mt-auto">“{t.roadmap.principle}”</p>
        </Opener>
      );
    case "roadmap-phases":
      return (
        <ol className="book-list book-dense">
          {t.roadmap.phases.map((p) => (
            <li key={p.when} className="grid grid-cols-[7.5rem_1fr] gap-x-4">
              <span className="book-text font-semibold text-brand">{p.when}</span>
              <span>
                <span className="book-item-name block">{p.name}</span>
                <span className="book-text block text-ink-soft">{p.text}</span>
              </span>
            </li>
          ))}
        </ol>
      );
    case "targets-open":
      return <Opener label={t.targets.label} title={t.targets.title} lead={t.targets.note} />;
    case "targets-list":
      return (
        <ol className="book-list">
          {t.targets.items.map((s) => (
            <li key={s.label} className="grid grid-cols-[6rem_1fr] items-baseline gap-x-4">
              <span className="book-fact !text-[32px]">{s.value}</span>
              <span className="book-text">{s.label}</span>
            </li>
          ))}
        </ol>
      );
    case "pillars-open":
      return (
        <Opener label={t.pillars.label} title={t.pillars.title} lead={t.pillars.lead} />
      );
    case "pillars-list":
      return (
        <>
          <ol className="book-list book-rows">
            {t.pillars.items.map((p, i) => (
              <li key={p.title} className="flex items-baseline gap-4">
                <span className="book-chip w-6 shrink-0">{pad(i + 1)}</span>
                <span className="book-item-name">{p.title}</span>
              </li>
            ))}
          </ol>
          <div className="mt-auto bg-ink p-4 text-white">
            <p className="book-text text-white/60">{t.pillars.crossTitle}</p>
            <ul className="mt-2">
              {t.pillars.cross.map((c) => (
                <li key={c} className="book-text">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    case "studio-open":
      return (
        <>
          <p className="book-label">{t.studio.label}</p>
          <h2 className="book-title">{t.studio.title}</h2>
          <p className="book-text mt-2 self-start border border-ink px-2">{t.studio.badge}</p>
          <div className="relative mt-4 h-40 shrink-0 overflow-hidden">
            <Image src="/images/campus.webp" alt={t.brand.school} fill sizes="580px" className="object-cover" />
          </div>
          <p className="book-text mt-4 text-ink-soft">{t.studio.lead}</p>
        </>
      );
    case "studio-standards":
      return (
        <ol className="book-list book-rows">
          {t.studio.standards.map((name, i) => (
            <li key={name} className="flex items-baseline gap-4">
              <span className="book-chip w-9 shrink-0">TC{i + 1}</span>
              <span className="book-item-name">{name}</span>
            </li>
          ))}
        </ol>
      );
    case "benchmark-open":
      return (
        <Opener label={t.benchmark.label} title={t.benchmark.title} lead={t.benchmark.lead}>
          <dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-3 border-t-2 border-ink pt-3">
            {t.benchmark.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="book-fact !text-[32px]">{s.value}</dd>
                <dd className="book-text text-ink-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Opener>
      );
    case "benchmark-advantages":
      return (
        <>
          <h3 className="book-subtitle">{t.benchmark.advantagesTitle}</h3>
          <ol className="book-list mt-3">
            {t.benchmark.advantages.map((a, i) => (
              <li key={a} className="flex items-baseline gap-4">
                <span className="book-chip w-6 shrink-0">{pad(i + 1)}</span>
                <span className="book-text font-medium">{a}</span>
              </li>
            ))}
          </ol>
          <p className="book-text mt-auto border-l-2 border-brand pl-3 text-ink-soft">{t.benchmark.caveat}</p>
        </>
      );
    case "principles-open":
      return (
        <Opener label={t.principles.label} title={t.principles.title} />
      );
    case "principles-list":
      return (
        <ol className="book-list">
          {t.principles.items.map((p) => (
            <li key={p.title}>
              <p className="book-item-name">{p.title}</p>
              <p className="book-text text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ol>
      );
    case "closing-quote":
      return (
        <figure className="my-auto">
          <span aria-hidden className="block text-[84px] leading-[0.8] font-bold text-brand">
            “
          </span>
          <blockquote className="book-quote mt-3">{t.closing.quote}</blockquote>
          <figcaption className="book-text mt-5 text-ink-soft">— {t.closing.cite}</figcaption>
        </figure>
      );
    case "back-cover":
      return (
        <>
          <Image src="/images/logo-dau.png" alt="DAU" width={56} height={57} />
          <p className="book-item-name mt-6">{t.footer.ownership}</p>
          <p className="book-text mt-auto text-white/70">{t.footer.address}</p>
          <p className="book-text text-white/70">dau.edu.vn</p>
          <p className="book-text mt-4 text-white/60">{t.footer.source}</p>
          <p className="book-text mt-4 text-white/60">{t.footer.rights}</p>
        </>
      );
  }
}

const DARK: PageKind[] = ["cover", "back-cover"];

export function BookPage({ kind, t, number }: { kind: PageKind; t: Dict; number: number }) {
  const left = number % 2 === 1;
  const dark = DARK.includes(kind);
  return (
    <div className={`book-page ${left ? "is-left" : "is-right"} ${dark ? "is-dark" : ""}`} data-kind={kind} data-page={number}>
      <div className="book-page-inner">
        {!dark && (
          <p className="book-runhead">
            <span>{left ? t.brand.project : ""}</span>
            <span>{left ? "" : t.brand.school}</span>
          </p>
        )}
        <div className="book-body">{content(kind, t)}</div>
      </div>
      {!dark && <span className={`book-num ${left ? "left-11" : "right-11"}`}>{number}</span>}
    </div>
  );
}
