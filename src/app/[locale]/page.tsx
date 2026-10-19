import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDict, type Dict, type Locale } from "@/content";

const pad = (n: number) => String(n).padStart(2, "0");

function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto max-w-site px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function SectionHead({ label, title, lead, dark }: { label: string; title: string; lead?: string; dark?: boolean }) {
  return (
    <div className={`border-t-2 pt-5 ${dark ? "border-white" : "border-ink"}`} data-reveal>
      <p className={`label ${dark ? "!text-white/60" : ""}`}>{label}</p>
      <div className="mt-4 grid gap-6 lg:grid-cols-4 lg:gap-x-6">
        <h2 className="d2 lg:col-span-2">{title}</h2>
        {lead && <p className={`lead lg:col-span-2 lg:pt-2 ${dark ? "!text-white/70" : ""}`}>{lead}</p>}
      </div>
    </div>
  );
}

function Hero({ t }: { t: Dict }) {
  return (
    <section id="top">
      <Container className="mullions pt-14 pb-16 lg:pt-20 lg:pb-24">
        {t.translationNote && (
          <p className="mb-8 inline-block border-l-2 border-brand bg-brand-soft px-4 py-2 text-sm text-brand-deep">
            {t.translationNote}
          </p>
        )}
        <p className="label flex items-center gap-2" data-reveal>
          <span className="size-2.5 bg-brand" aria-hidden />
          {t.hero.eyebrow} · {t.brand.school}
        </p>
        <h1 className="d1 mt-6 max-w-5xl" data-reveal style={{ "--delay": "80ms" } as React.CSSProperties}>
          {t.hero.title[0]}
          <br />
          <span className="text-ink-soft">{t.hero.title[1]}</span>
        </h1>
        <p className="lead mt-8 max-w-3xl" data-reveal style={{ "--delay": "160ms" } as React.CSSProperties}>
          {t.hero.lead}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-4 lg:gap-x-6">
          <div className="flex flex-col justify-between gap-8 bg-paper lg:pr-6" data-reveal>
            <div>
              <p className="label">{t.nav.model}</p>
              <p className="d4 mt-2">{t.hero.model}</p>
            </div>
            <a
              href="#overview"
              className="flex h-14 items-center justify-between border border-ink px-5 font-semibold transition-colors hover:bg-ink hover:text-white"
            >
              {t.hero.cta}
              <span aria-hidden>↓</span>
            </a>
          </div>
          <div className="relative aspect-[4/3] bg-paper-deep sm:aspect-[8/3] lg:col-span-3" data-reveal>
            <Image
              src="/images/banner.webp"
              alt={t.brand.school}
              fill
              priority
              sizes="(min-width: 64rem) 75vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Motto({ t }: { t: Dict }) {
  return (
    <section className="bg-ink text-white">
      <Container className="grid items-baseline gap-3 py-8 lg:grid-cols-4 lg:gap-x-6 lg:py-10">
        <p className="text-sm text-white/60">{t.motto.label}</p>
        <p className="d3 lg:col-span-3">{t.motto.text}</p>
      </Container>
    </section>
  );
}

function Overview({ t }: { t: Dict }) {
  const o = t.overview;
  return (
    <section id="overview" className="py-20 lg:py-28">
      <Container>
        <SectionHead label={o.label} title={o.title} lead={o.lead} />
        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {o.drivers.map((d, i) => (
            <div key={d.title} className="border-t border-rule pt-5" data-reveal style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
              <p className="text-sm font-semibold text-brand">{pad(i + 1)}</p>
              <h3 className="d4 mt-3">{d.title}</h3>
              <p className="mt-3 text-ink-soft">{d.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
          {o.facts.map((f) => (
            <div
              key={f.value}
              className="group flex min-h-48 flex-col lg:min-h-64 justify-between gap-10 border-b border-rule p-6 transition-colors duration-300 hover:bg-brand hover:text-white sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"
            >
              <p className="num">{f.value}</p>
              <div>
                <p className="d4">{f.title}</p>
                <p className="mt-2 text-ink-soft group-hover:text-white/85">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Philosophy({ t }: { t: Dict }) {
  const p = t.philosophy;
  return (
    <section id="philosophy" className="py-20 lg:py-28">
      <Container className="mullions">
        <SectionHead label={p.label} title={p.title} lead={p.lead} />
        <div className="mt-14">
          {p.tiers.map((tier) => (
            <div key={tier.name} className="grid gap-6 border-t border-rule py-8 lg:grid-cols-4 lg:gap-x-6" data-reveal>
              <div>
                <h3 className="d3">{tier.name}</h3>
                <p className="label mt-2">{tier.text}</p>
              </div>
              <ol className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-5">
                {tier.items.map((it, i) => (
                  <li key={it.en}>
                    <span className="text-xs font-semibold text-brand">T{i + 1}</span>
                    <p className="mt-1 text-lg font-semibold">{it.name}</p>
                    <p className="text-sm text-ink-soft">{it.en}</p>
                  </li>
                ))}
              </ol>
            </div>
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
        </div>
      </Container>
    </section>
  );
}

function Model({ t }: { t: Dict }) {
  const m = t.model;
  return (
    <section id="model" className="py-20 lg:py-28">
      <Container>
        <SectionHead label={m.label} title={m.title} lead={m.lead} />
        <ol className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {m.layers.map((l, i) => (
            <li
              key={l.code}
              className="bg-paper p-6 transition-colors hover:bg-white lg:p-8"
              data-reveal
              style={{ "--delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
            >
              <p className="text-sm font-semibold text-brand tabular-nums">{l.code}</p>
              <h3 className="d4 mt-3">{l.name}</h3>
              <p className="mt-3 text-ink-soft">{l.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Copilots({ t }: { t: Dict }) {
  const c = t.copilots;
  return (
    <section id="copilots" className="bg-ink py-20 text-white lg:py-28">
      <Container>
        <SectionHead label={c.label} title={c.title} lead={c.lead} dark />
        <div className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((it, i) => (
            <article
              key={it.name}
              className="flex flex-col bg-ink p-6 lg:p-8"
              data-reveal
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <p className="text-sm text-white/55">
                {c.forLabel}: {it.for}
              </p>
              <h3 className="d3 mt-3">{it.name}</h3>
              <p className="mt-4 min-h-[3lh] text-white/75">{it.does}</p>
              <div className="mt-8 border-t border-white/15 pt-4">
                <p className="text-xs font-semibold tracking-wide text-[#ff6b72]">{c.guardLabel}</p>
                <p className="mt-1 font-medium">{it.guard}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-white/60">{c.foundation}</p>
        <div className="mt-20 grid gap-4 lg:grid-cols-4 lg:gap-x-6" data-reveal>
          <div className="lg:col-start-2 lg:col-span-3">
            {c.quote.map((q, i) => (
              <p key={q} className={`quote ${i === 2 ? "font-medium text-brand" : ""}`}>
                {q}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Maturity({ t }: { t: Dict }) {
  const m = t.maturity;
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHead label={m.label} title={m.title} lead={m.lead} />
        <ol className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {m.levels.map((l, i) => (
            <li key={l.en} data-reveal style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
              <div className={`h-1 ${i === m.levels.length - 1 ? "bg-brand" : "bg-ink"}`} style={{ opacity: 0.35 + i * 0.16 }} />
              <p className="label mt-5">{pad(i + 1)}</p>
              <h3 className="d4 mt-2">{l.name}</h3>
              {l.en !== l.name && <p className="text-sm text-ink-soft">{l.en}</p>}
              <p className="mt-3 text-ink-soft">{l.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 flex items-center gap-3 font-semibold">
          <span className="size-2.5 bg-brand" aria-hidden />
          {m.target}
        </p>
      </Container>
    </section>
  );
}

function Roadmap({ t }: { t: Dict }) {
  const r = t.roadmap;
  return (
    <section id="roadmap" className="py-20 lg:py-28">
      <Container className="mullions">
        <SectionHead label={r.label} title={r.title} lead={r.lead} />
        <ol className="mt-14">
          {r.phases.map((p, i) => (
            <li key={p.when} className="grid gap-3 border-t border-rule py-7 lg:grid-cols-4 lg:gap-x-6" data-reveal>
              <p className={`d3 tabular-nums ${i === 0 ? "text-brand" : ""}`}>{p.when}</p>
              <p className="d4">{p.name}</p>
              <p className="text-ink-soft lg:col-span-2">{p.text}</p>
            </li>
          ))}
        </ol>
        <div className="grid gap-4 border-t-2 border-ink pt-10 lg:grid-cols-4 lg:gap-x-6" data-reveal>
          <p className="quote font-normal lg:col-span-3">“{r.principle}”</p>
          <p className="text-sm text-ink-soft lg:pt-2">{r.note}</p>
        </div>
      </Container>
    </section>
  );
}

function Targets({ t }: { t: Dict }) {
  const g = t.targets;
  return (
    <section className="bg-brand py-20 text-white lg:py-24">
      <Container>
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
              <dd className="num">{s.value}</dd>
              <dd className="mt-4 text-white/85">{s.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm text-white/70">{g.note}</p>
      </Container>
    </section>
  );
}

function Pillars({ t }: { t: Dict }) {
  const p = t.pillars;
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHead label={p.label} title={p.title} lead={p.lead} />
        <ol className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {p.items.map((it, i) => (
            <li key={it.title} className="bg-paper p-6" data-reveal>
              <p className="text-sm font-semibold text-brand">{pad(i + 1)}</p>
              <h3 className="d4 mt-8">{it.title}</h3>
              <p className="mt-2 text-ink-soft">{it.text}</p>
            </li>
          ))}
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
        </ol>
      </Container>
    </section>
  );
}

function Studio({ t }: { t: Dict }) {
  const s = t.studio;
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 border-t-2 border-ink pt-5 lg:grid-cols-4 lg:gap-x-6">
          <div className="lg:col-span-2" data-reveal>
            <p className="label">{s.label}</p>
            <h2 className="d2 mt-4">{s.title}</h2>
            <p className="mt-6 inline-block border border-ink px-3 py-1 text-sm font-medium">{s.badge}</p>
            <p className="lead mt-6 max-w-xl">{s.lead}</p>
            <div className="relative mt-10 aspect-[16/9] bg-paper-deep">
              <Image src="/images/campus.webp" alt={t.brand.school} fill sizes="(min-width: 64rem) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
          <ol className="lg:col-span-2 lg:pt-10">
            {s.standards.map((name, i) => (
              <li key={name} className="flex items-baseline gap-6 border-b border-rule py-4" data-reveal>
                <span className="w-12 shrink-0 text-sm font-semibold text-brand tabular-nums">TC{i + 1}</span>
                <span className="d4">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Benchmark({ t }: { t: Dict }) {
  const b = t.benchmark;
  return (
    <section id="benchmark" className="py-20 lg:py-28">
      <Container className="mullions">
        <SectionHead label={b.label} title={b.title} lead={b.lead} />
        <dl className="mt-14 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {b.stats.map((s) => (
            <div key={s.label} className="border-t border-rule py-6" data-reveal>
              <dt className="sr-only">{s.label}</dt>
              <dd className="num">{s.value}</dd>
              <dd className="mt-3 text-ink-soft">{s.label}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-16 grid gap-6 lg:grid-cols-4 lg:gap-x-6">
          <h3 className="d3">{b.advantagesTitle}</h3>
          <ol className="grid gap-x-6 sm:grid-cols-2 lg:col-span-3">
            {b.advantages.map((a, i) => (
              <li key={a} className="flex gap-4 border-t border-rule py-4" data-reveal>
                <span className="text-sm font-semibold text-brand">{pad(i + 1)}</span>
                <span className="font-medium">{a}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-10 border-l-2 border-brand pl-4 text-ink-soft lg:ml-[calc(25%+0.375rem)]">{b.caveat}</p>
      </Container>
    </section>
  );
}

function Principles({ t }: { t: Dict }) {
  const p = t.principles;
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHead label={p.label} title={p.title} />
        <ul className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {p.items.map((it, i) => (
            <li key={it.title} className="bg-paper p-6 lg:p-8" data-reveal style={{ "--delay": `${(i % 3) * 80}ms` } as React.CSSProperties}>
              <h3 className="d4">{it.title}</h3>
              <p className="mt-3 text-ink-soft">{it.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Closing({ t }: { t: Dict }) {
  return (
    <section className="pt-8">
      <Container>
        <figure className="grid gap-6 border-t-2 border-ink pt-10 lg:grid-cols-4 lg:gap-x-6" data-reveal>
          <span className="text-7xl leading-none font-bold text-brand" aria-hidden>
            “
          </span>
          <div className="lg:col-span-3">
            <blockquote className="quote">{t.closing.quote}</blockquote>
            <figcaption className="label mt-6">— {t.closing.cite}</figcaption>
          </div>
        </figure>
      </Container>
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const t = getDict(locale);
  return (
    <>
      <Header t={t} locale={locale} />
      <main>
        <Hero t={t} />
        <Motto t={t} />
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
      <Footer t={t} />
    </>
  );
}
