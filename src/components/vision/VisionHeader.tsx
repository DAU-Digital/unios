import Image from "next/image";
import { localeLabels, locales, type Locale } from "@/content";
import type { VisionDict } from "@/content/vision";

export const visionSectionIds = ["vision", "mission", "journey", "identity", "views", "pillars"] as const;

// The /2050 page's bar: same frame as the AI-native page, its own sections,
// and a way across to the initiative.
export function VisionHeader({ t, locale }: { t: VisionDict; locale: Locale }) {
  const links = visionSectionIds.map((id) => ({ id, label: t.nav[id] }));

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div aria-hidden className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-brand" />
      <div className="mx-auto flex h-[4.5rem] max-w-site items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <Image src="/images/logo-dau.png" alt="DAU" width={44} height={45} priority />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight">DAU</span>
            <span className="text-xs text-ink-soft">{t.brand.project}</span>
          </span>
        </a>

        <nav aria-label={t.nav.menu} className="hidden items-center gap-6 text-[0.9375rem] font-medium xl:flex xl:gap-7">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`/${locale}/`}
            className="group hidden h-8 items-center gap-1.5 border border-ink px-3 text-[0.8125rem] font-medium transition-colors hover:bg-ink hover:text-white md:inline-flex"
          >
            {t.nav.initiative}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <nav aria-label="Language" className="flex text-[0.8125rem]">
            {locales.map((l) => (
              <a
                key={l}
                href={`/${l}/2050/`}
                hrefLang={l}
                aria-current={l === locale ? "page" : undefined}
                className={`grid h-8 place-items-center px-2 font-medium ${l === locale ? "bg-ink text-white" : "text-ink-soft hover:text-ink"}`}
              >
                {localeLabels[l]}
              </a>
            ))}
          </nav>

          <details className="group xl:hidden">
            <summary className="flex h-11 cursor-pointer list-none items-center border border-ink px-4 font-medium [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">{t.nav.menu}</span>
              <span className="hidden group-open:inline">{t.nav.close}</span>
            </summary>
            <nav className="absolute inset-x-0 top-full border-b-2 border-ink bg-paper px-4 py-4 shadow-[0_24px_48px_-24px_rgb(27_30_35/.35)] sm:px-6">
              {links.map((l) => (
                <a key={l.id} href={`#${l.id}`} className="block border-b border-rule py-3 text-xl font-medium">
                  {l.label}
                </a>
              ))}
              <a href={`/${locale}/`} className="block py-3 text-xl font-medium text-brand">
                {t.nav.initiative} →
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
