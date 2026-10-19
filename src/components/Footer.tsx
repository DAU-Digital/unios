import Image from "next/image";
import type { Dict } from "@/content";
import { sectionIds } from "./Header";

export function Footer({ t }: { t: Dict }) {
  return (
    <footer className="mt-24 overflow-hidden bg-ink text-white lg:mt-32">
      <div className="mx-auto max-w-site px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-x-6">
          <div className="lg:col-span-2">
            <Image src="/images/logo-dau.png" alt="DAU" width={56} height={57} />
            <p className="d4 mt-6 max-w-xl">{t.footer.ownership}</p>
          </div>
          <div className="text-[0.9375rem]">
            <p className="text-sm text-white/60">{t.brand.project}</p>
            <ul className="mt-4 space-y-2">
              {sectionIds.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="hover:underline">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
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

        <p className="mt-14 max-w-3xl text-sm text-white/55">{t.footer.source}</p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 py-6 text-sm text-white/60">
          <span>{t.footer.rights}</span>
          <a href="#top" className="hover:text-white">
            {t.footer.top} ↑
          </a>
        </div>
      </div>
      <div
        aria-hidden
        className="select-none text-center text-[min(38vw,26rem)] leading-[0.72] font-bold tracking-[-0.06em] text-brand"
      >
        DAU
      </div>
    </footer>
  );
}
