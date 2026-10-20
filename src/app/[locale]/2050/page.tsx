import type { Metadata } from "next";
import { Deck } from "@/components/Deck";
import { GateView } from "@/components/Gate";
import { HorizonVisual } from "@/components/vision/HorizonVisual";
import { Container, Section, Slide, Words, delay, pad } from "@/components/vision/parts";
import { VisionFooter } from "@/components/vision/VisionFooter";
import { VisionHeader } from "@/components/vision/VisionHeader";
import type { Locale } from "@/content";
import { getVision, type VisionDict } from "@/content/vision";
import { visionJsonLd, visionMetadata } from "@/lib/vision-seo";

type P = { t: VisionDict; locale: Locale };

function Hero({ t, locale }: P) {
  const h = t.hero;
  return (
    <Slide id="top" title={t.brand.project} className="overflow-hidden">
      {/* On desktop the whole hero fits the first screen below the header. */}
      <Container className="mullions grid gap-10 py-10 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:content-between lg:gap-x-6 lg:py-12 [@media(max-height:52rem)]:lg:gap-y-6 [@media(max-height:52rem)]:lg:py-6">
        <div className="flex flex-col justify-center lg:col-span-7" data-reveal>
          {t.translationNote && (
            <p className="mb-6 self-start border-l-2 border-brand bg-brand-soft px-4 py-2 text-sm text-brand-deep">{t.translationNote}</p>
          )}
          <p className="label flex items-start gap-2">
            <span className="mt-1.5 size-2.5 shrink-0 bg-brand" aria-hidden />
            {h.eyebrow}
          </p>
          <h1 className="hero-title mt-6">
            <span className="block">
              <Words text={h.title[0]} />
            </span>
            <span className="mt-2 block text-ink-soft">
              <Words text={h.title[1]} from={h.title[0].split(" ").length} />
            </span>
          </h1>
          <p className="lead mt-6 max-w-2xl">{h.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#statement"
              className="group inline-flex h-13 items-center gap-3 bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              {h.cta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </a>
            <a
              href={`/${locale}/`}
              className="group inline-flex h-13 items-center gap-3 border border-ink px-6 font-semibold transition-colors hover:bg-ink hover:text-white"
            >
              {t.nav.initiative}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center lg:col-span-5">
          <HorizonVisual rings={h.rings} label={h.visual} className="aspect-square w-full max-w-[32rem] lg:max-h-[calc(100svh-17rem)]" />
        </div>

        <dl className="grid grid-cols-2 border-t-2 border-ink sm:grid-cols-4 lg:col-span-12" data-reveal>
          {h.stats.map((s, i) => (
            <div key={s.value} className="border-rule py-4 pr-4 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className={`d3 tabular-nums ${i === h.stats.length - 1 ? "text-brand" : ""}`} data-count>
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

// The short vision, large, on dark: the line the school uses in outreach.
function Statement({ t }: P) {
  const s = t.statement;
  return (
    <Slide id="statement" title={s.title} className="bg-ink text-white">
      <Container className="slide-body">
        <div className="border-t-2 border-white pt-5" data-reveal>
          <p className="text-sm text-white/60">{s.label}</p>
          <p className="mt-8 text-[clamp(3.5rem,2rem+6vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.05em] text-brand">{s.title}</p>
          <ol className="mt-8 space-y-2">
            {s.parts.map((part, i) => (
              <li key={part} className="d1 flex items-baseline gap-5">
                <span className="w-10 shrink-0 text-base font-semibold text-white/45 tabular-nums">{pad(i + 1)}</span>
                <span>
                  <Words text={part} from={i * 3} />
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-2xl text-white/60">{s.note}</p>
        </div>
      </Container>
    </Slide>
  );
}

function Vision({ t }: P) {
  const v = t.vision;
  return (
    <Section
      id="vision"
      head={v}
      deck={t.deck}
      panels={[
        <div key="markers">
          <p className="label" data-reveal>
            {v.markersTitle}
          </p>
          <ol className="mt-4 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {v.markers.map((m, i) => (
              <li
                key={m}
                className="group relative flex min-h-32 flex-col justify-between gap-6 bg-paper p-6 transition-colors duration-300 hover:bg-ink hover:text-white"
                data-reveal
                style={delay((i % 3) * 80)}
              >
                <span className="text-sm font-semibold text-brand tabular-nums">{pad(i + 1)}</span>
                <span className="d4">{m}</span>
              </li>
            ))}
          </ol>
        </div>,
      ]}
    />
  );
}

function Real({ t }: P) {
  const r = t.real;
  return (
    <Section
      id="real"
      head={r}
      deck={t.deck}
      mullions
      panels={[
        <div key="abilities" className="grid gap-6 lg:grid-cols-4 lg:gap-x-6">
          <p className="d4 lg:pt-1" data-reveal>
            {r.abilitiesTitle}
          </p>
          <ol className="lg:col-span-3">
            {r.abilities.map((a, i) => (
              <li
                key={a}
                className="group relative flex items-baseline gap-6 border-t border-rule py-4 transition-colors last:border-b hover:bg-white"
                data-reveal
                style={delay(i * 70)}
              >
                <span aria-hidden className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100" />
                <span className="w-10 shrink-0 pl-4 text-sm font-semibold text-brand tabular-nums">{pad(i + 1)}</span>
                <span className={`d3 ${i === r.abilities.length - 1 ? "text-brand" : ""}`}>{a}</span>
              </li>
            ))}
          </ol>
        </div>,
      ]}
    />
  );
}

function Mission({ t }: P) {
  const m = t.mission;
  return (
    <Section
      id="mission"
      head={m}
      deck={t.deck}
      panels={[
        <div key="learners">
          <p className="label" data-reveal>
            {m.learnersTitle}
          </p>
          <ol className="mt-4 grid gap-x-6 gap-y-8 sm:grid-cols-3">
            {m.learners.map((it, i) => (
              <li key={it.title} className="group relative border-t border-rule pt-5" data-reveal style={delay(i * 80)}>
                <span aria-hidden className="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                <p className="text-sm font-semibold text-brand">{pad(i + 1)}</p>
                <h3 className="d4 mt-3">{it.title}</h3>
                <p className="mt-3 text-ink-soft">{it.text}</p>
              </li>
            ))}
          </ol>
          <p className="d3 mt-10 border-l-4 border-brand pl-5" data-reveal>
            {m.motto}
          </p>
        </div>,
        <div key="commitments">
          <p className="label" data-reveal>
            {m.commitmentsTitle}
          </p>
          <ol className="mt-4 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
            {m.commitments.map((c, i) => (
              <li
                key={c.title}
                data-reveal
                style={delay(i * 80)}
                className="group flex min-h-48 flex-col justify-between gap-8 border-b border-rule p-6 transition-colors duration-300 hover:bg-brand hover:text-white sm:[&:nth-child(odd)]:border-r lg:min-h-56 lg:border-r lg:last:border-r-0"
              >
                <p className="num text-brand transition-colors group-hover:text-white">{pad(i + 1)}</p>
                <div>
                  <h3 className="d4">{c.title}</h3>
                  <p className="mt-2 text-ink-soft group-hover:text-white/85">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>,
      ]}
    />
  );
}

const START = 2026;
const END = 2050;
const at = (year: number) => `${((year - START) / (END - START)) * 100}%`;

// The four horizons drawn on one 2026–2050 axis.
function Journey({ t }: P) {
  const j = t.journey;
  const ticks = [2026, 2030, 2040, 2050];
  return (
    <Section
      id="journey"
      head={j}
      deck={t.deck}
      panels={[
        <div key="horizons">
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-x-6" aria-hidden>
            <div className="lg:col-start-2 lg:col-span-3">
              <div className="relative h-6 text-sm font-semibold tabular-nums text-ink-soft">
                {ticks.map((y, i) => (
                  <span
                    key={y}
                    className={`absolute top-0 ${i === 0 ? "" : i === ticks.length - 1 ? "-translate-x-full text-brand" : "-translate-x-1/2"}`}
                    style={{ left: at(y) }}
                  >
                    {y}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ol>
            {j.phases.map((p, i) => {
              const last = i === j.phases.length - 1;
              return (
                <li
                  key={p.name}
                  className="grid gap-3 border-t border-rule py-5 last:border-b lg:grid-cols-4 lg:gap-x-6 [@media(max-height:52rem)]:lg:py-3"
                  data-reveal
                  style={delay(i * 90)}
                >
                  <div>
                    <p className={`d3 tabular-nums ${last ? "text-brand" : ""}`}>
                      {p.from}–{p.to}
                    </p>
                    <p className="d4 mt-1">{p.name}</p>
                  </div>
                  <div className="lg:col-span-3">
                    <div className="relative h-3 bg-paper-deep">
                      {ticks.slice(1, -1).map((y) => (
                        <span key={y} aria-hidden className="absolute inset-y-0 w-px bg-paper" style={{ left: at(y) }} />
                      ))}
                      <span
                        className={`grow-x absolute inset-y-0 ${last ? "bg-brand" : "bg-ink"}`}
                        style={{ left: at(p.from), width: `calc(${at(p.to)} - ${at(p.from)})`, opacity: last ? 1 : 0.45 + i * 0.18 }}
                      />
                    </div>
                    <p className="mt-3 max-w-3xl text-ink-soft">{p.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          {/* Short projector screens drop the source line; the footer carries it too. */}
          <p className="label mt-4 [@media(max-height:52rem)]:hidden">{j.note}</p>
        </div>,
      ]}
    />
  );
}

function Future({ t }: P) {
  const f = t.future;
  return (
    <Slide id="future" title={f.title} className="bg-brand text-white">
      <Container className="slide-body">
        <div>
          <p className="text-sm text-white/75">{f.label}</p>
          <h2 className="d2 mt-3 max-w-4xl">{f.title}</h2>
          <ol className="mt-10 grid gap-px border-y-2 border-white bg-white/25 sm:grid-cols-2 lg:grid-cols-3 [@media(max-height:52rem)]:lg:mt-6">
            {f.items.map((it, i) => (
              <li key={it.title} className="bg-brand p-5 lg:p-6" data-reveal style={delay((i % 3) * 80)}>
                <p className="text-sm font-semibold text-white/65 tabular-nums">{pad(i + 1)}</p>
                <h3 className="d4 mt-2">{it.title}</h3>
                <p className="mt-2 text-white/85">{it.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8" data-reveal>
            <p className="text-sm text-white/75">{f.fieldsTitle}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {f.fields.map((x) => (
                <li key={x} className="border border-white/45 px-3 py-1 text-[0.9375rem] font-medium transition-colors hover:bg-white hover:text-brand">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Slide>
  );
}

function Tier({ tier, index }: { tier: VisionDict["identity"]["tiers"][number]; index: number }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1" data-reveal>
        <span className="text-sm font-semibold text-brand tabular-nums">{pad(index + 1)} / 03</span>
        <h3 className="d3">{tier.name}</h3>
        <span className="label">{tier.role}</span>
      </div>
      <ol className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
        {tier.items.map((it, i) => (
          <li
            key={it.en}
            className="group flex flex-col bg-paper p-5 transition-colors duration-300 hover:bg-ink hover:text-white lg:min-h-64"
            data-reveal
            style={delay(i * 70)}
          >
            <span className="text-xs font-semibold text-brand">T{i + 1}</span>
            <p className="d4 mt-3">{it.name}</p>
            <p className="text-sm text-ink-soft transition-colors group-hover:text-white/60">{it.en}</p>
            <p className="mt-4 text-[0.9375rem] text-ink-soft transition-colors group-hover:text-white/80 lg:mt-auto lg:pt-4">{it.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Identity({ t }: P) {
  const d = t.identity;
  return (
    <Section
      id="identity"
      head={d}
      deck={t.deck}
      panels={d.tiers.map((tier, i) => (
        <div key={tier.name}>
          <Tier tier={tier} index={i} />
          {i === d.tiers.length - 1 && (
            <div className="mt-6 grid gap-4 border-t-2 border-ink pt-5 lg:grid-cols-4 lg:gap-x-6" data-reveal>
              <p className="label">{d.bridge.label}</p>
              <p className="d4 flex flex-wrap gap-x-4 gap-y-2 lg:col-span-3">
                {d.bridge.items.map((b, k) => (
                  <span key={b}>
                    {k > 0 && (
                      <span className="mr-4 text-brand" aria-hidden>
                        ·
                      </span>
                    )}
                    {b}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      ))}
    />
  );
}

function Views({ t }: P) {
  const v = t.views;
  const [take, as] = v.chainWords;
  return (
    <Section
      id="views"
      head={v}
      deck={t.deck}
      mullions
      panels={[
        <div key="chain" className="grid gap-6 lg:grid-cols-4 lg:gap-x-6">
          <p className="d4 lg:pt-1" data-reveal>
            {v.chainTitle}
          </p>
          {/* Read as a table: "Lấy <what>" on the left, "làm <role>" on the right. */}
          <ol className="lg:col-span-3">
            {v.chain.map((c, i) => (
              <li
                key={c.what}
                className="group relative grid grid-cols-2 gap-x-6 border-t border-rule py-2.5 transition-colors last:border-b hover:bg-white"
                data-reveal
                style={delay(i * 50)}
              >
                <span aria-hidden className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100" />
                <span className="flex items-baseline gap-3 pl-4">
                  <span className="label w-8 shrink-0">{take}</span>
                  <span className="d4">{c.what}</span>
                </span>
                <span className="flex items-baseline gap-3">
                  <span className="label w-8 shrink-0">{as}</span>
                  <span className="d4 text-brand">{c.as}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>,
        <ul key="items" className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {v.items.map((it, i) => (
            <li key={it.title} className="group relative flex flex-col bg-paper p-6 transition-colors duration-300 hover:bg-white lg:min-h-72 lg:p-7" data-reveal style={delay(i * 80)}>
              <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
              <p className="text-sm font-semibold text-brand tabular-nums">{pad(i + 1)}</p>
              <h3 className="d4 mt-6 transition-colors group-hover:text-brand">{it.title}</h3>
              <p className="mt-3 text-ink-soft">{it.text}</p>
            </li>
          ))}
        </ul>,
      ]}
    />
  );
}

function Domain({ t }: P) {
  const d = t.domain;
  return (
    <Section
      id="domain"
      head={d}
      deck={t.deck}
      panels={[
        <div key="steps" className="grid gap-8 lg:grid-cols-4 lg:gap-x-6">
          <ol className="grid gap-px bg-rule sm:grid-cols-3 lg:col-span-3">
            {d.steps.map((s, i) => {
              const last = i === d.steps.length - 1;
              return (
                <li
                  key={s.title}
                  className={`relative flex min-h-56 flex-col justify-between p-6 ${last ? "bg-brand text-white" : i === 1 ? "bg-ink text-white" : "bg-paper-deep"}`}
                  data-reveal
                  style={delay(i * 100)}
                >
                  <span className={`text-sm font-semibold tabular-nums ${last || i === 1 ? "text-white/65" : "text-brand"}`}>{pad(i + 1)}</span>
                  <div>
                    <h3 className="d3">{s.title}</h3>
                    <p className={`mt-2 ${last || i === 1 ? "text-white/80" : "text-ink-soft"}`}>{s.text}</p>
                  </div>
                  {!last && (
                    <span aria-hidden className="absolute top-1/2 -right-3 z-10 hidden size-6 -translate-y-1/2 place-items-center bg-paper text-sm font-bold text-ink sm:grid">
                      →
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
          <dl className="grid grid-cols-2 gap-x-6 lg:grid-cols-1 lg:content-end">
            {d.scale.map((s) => (
              <div key={s.label} className="border-t-2 border-ink pt-3 pb-4" data-reveal>
                <dt className="sr-only">{s.label}</dt>
                <dd className="num" data-count>
                  {s.value}
                </dd>
                <dd className="label mt-2">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>,
        <div key="domains" className="grid gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-6">
          <div className="flex min-h-40 flex-col justify-between bg-ink p-6 text-white sm:col-span-3 lg:col-span-1 lg:min-h-64" data-reveal>
            <span className="text-sm text-white/60">{d.core}</span>
            <span className="d2">Design</span>
          </div>
          {d.domains.map((x, i) => (
            <div
              key={x.name}
              className="group flex min-h-40 flex-col justify-between bg-paper p-6 transition-colors duration-300 hover:bg-brand hover:text-white lg:min-h-64"
              data-reveal
              style={delay(i * 70)}
            >
              <span className="d3 text-brand transition-colors group-hover:text-white">×</span>
              <div>
                <p className="d4">{x.name}</p>
                <p className="mt-1 text-ink-soft transition-colors group-hover:text-white/85">{x.text}</p>
              </div>
            </div>
          ))}
        </div>,
      ]}
    />
  );
}

function Pillars({ t, locale }: P) {
  const p = t.pillars;
  return (
    <Section
      id="pillars"
      head={p}
      deck={t.deck}
      panels={[
        <ol key="items" className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {p.items.map((it, i) => (
            <li key={it.title} className="group bg-paper p-6 transition-colors duration-300 hover:bg-brand hover:text-white" data-reveal style={delay((i % 4) * 70)}>
              <p className="text-sm font-semibold text-brand transition-colors group-hover:text-white">{pad(i + 1)}</p>
              <h3 className="d4 mt-6">{it.title}</h3>
              <p className="mt-2 text-ink-soft transition-colors group-hover:text-white/85">{it.text}</p>
            </li>
          ))}
          <li className="flex bg-ink text-white" data-reveal>
            <a href={`/${locale}/#roadmap`} className="group flex w-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-[#262a31]">
              <span className="text-sm text-white/60">{t.nav.initiative}</span>
              <span className="d4">
                {p.more}{" "}
                <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </li>
        </ol>,
        <div key="targets">
          <p className="label" data-reveal>
            {p.targetsTitle}
          </p>
          <dl className="mt-4 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-5">
            {p.targets.map((s, i) => (
              <div
                key={s.label}
                className="border-b border-rule py-6 sm:px-5 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"
                data-reveal
                style={delay(i * 80)}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="num text-brand" data-count>
                  {s.value}
                </dd>
                <dd className="mt-4 text-ink-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>,
      ]}
    />
  );
}

// The last slide closes with the quote and the footer.
function Closing({ t, locale }: P) {
  return (
    <Slide id="closing" title={t.closing.cite} className="!justify-between lg:!pr-0">
      <Container className="slide-body">
        <figure className="grid gap-6 border-t-2 border-ink pt-8 lg:grid-cols-4 lg:gap-x-6" data-reveal>
          <span className="text-7xl leading-none font-bold text-brand" aria-hidden>
            “
          </span>
          <div className="lg:col-span-3">
            <blockquote className="quote">{t.closing.quote}</blockquote>
            <figcaption className="label mt-6">— {t.closing.cite}</figcaption>
          </div>
        </figure>
      </Container>
      <VisionFooter t={t} locale={locale} />
    </Slide>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return visionMetadata(locale);
}

export default async function VisionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const { t, lang } = getVision(locale);
  const p = { t, locale };
  // Untranslated locales show Vietnamese text; mark it so type and line breaks follow Vietnamese.
  const textLang = lang === locale ? undefined : lang;
  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD must be raw JSON; "<" is escaped so content can never close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(visionJsonLd(locale)).replace(/</g, "\\u003c") }}
      />
      <div lang={textLang}>
        <GateView
          copy={{ school: t.brand.school, project: t.brand.project, eyebrow: t.hero.eyebrow, motto: t.statement.parts.join(" – "), gate: t.gate }}
          locale={locale}
          path="2050/"
        />
      </div>
      <div id="deck" lang={textLang}>
        <VisionHeader t={t} locale={locale} />
        <main>
          <Hero {...p} />
          <Statement {...p} />
          <Vision {...p} />
          <Real {...p} />
          <Mission {...p} />
          <Journey {...p} />
          <Future {...p} />
          <Identity {...p} />
          <Views {...p} />
          <Domain {...p} />
          <Pillars {...p} />
          <Closing {...p} />
        </main>
        <Deck hint={t.deck.hint} />
      </div>
    </>
  );
}
