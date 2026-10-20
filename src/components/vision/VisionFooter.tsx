import Image from "next/image";
import type { Locale } from "@/content";
import type { VisionDict } from "@/content/vision";
import { visionSectionIds } from "./VisionHeader";

export function VisionFooter({ t, locale }: { t: VisionDict; locale: Locale }) {
  return (
    <footer className="overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-site px-4 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-x-6">
          <div className="lg:col-span-2">
            <Image src="/images/logo-dau.png" alt="DAU" width={56} height={57} />
            <p className="d4 mt-6 max-w-xl">{t.footer.ownership}</p>
          </div>
          <div className="text-[0.9375rem]">
            <p className="text-sm text-white/60">{t.brand.project}</p>
            <ul className="mt-4 space-y-2">
              {visionSectionIds.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="hover:underline">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
              <li>
                <a href={`/${locale}/`} className="text-white/80 hover:underline">
                  {t.nav.initiative} →
                </a>
              </li>
            </ul>
          </div>
          <div className="text-[0.9375rem]">
            <p className="text-sm text-white/60">DAU</p>
            <p className="mt-4">{t.footer.address}</p>
            <a href="https://dau.edu.vn" className="mt-2 inline-block hover:underline" rel="noopener">
              dau.edu.vn
            </a>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-sm text-white/55">{t.footer.source}</p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 py-6 text-sm text-white/60">
          <span>{t.footer.rights}</span>
          <a href="#top" className="hover:text-white">
            {t.footer.top} ↑
          </a>
        </div>
      </div>
      <div
        aria-hidden
        className="select-none text-center text-[min(30vw,12rem)] [@media(max-height:62rem)]:hidden leading-[0.72] font-bold tracking-[-0.06em] text-brand"
      >
        2050
      </div>
    </footer>
  );
}
