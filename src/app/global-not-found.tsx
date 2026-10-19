import type { Metadata } from "next";
import Image from "next/image";
import { localeLabels, locales, type Locale } from "@/content";
import { fix } from "@/content/keep";
import "./globals.css";
import { bricolage } from "./fonts";

export const metadata: Metadata = {
  // Next.js adds noindex to the 404 itself.
  title: "404 — Không tìm thấy trang | DAU AI-native University",
};

const copy: Record<Locale, { label: string; title: string; text: string; home: string; owner: string }> = {
  vi: {
    label: "Lỗi 404",
    title: "Không tìm thấy trang",
    text: "Trang bạn tìm có thể đã được di chuyển, đổi tên hoặc chưa từng tồn tại. Mời bạn quay lại trang giới thiệu Đề án AI-native University.",
    home: "Về trang chủ",
    owner: "Hệ thống này thuộc sở hữu của Trường Đại học Kiến trúc Đà Nẵng.",
  },
  en: {
    label: "Error 404",
    title: "Page not found",
    text: "The page you are looking for may have been moved, renamed or never existed. Head back to the AI-native University project page.",
    home: "Back to home",
    owner: "This system is owned by Danang Architecture University.",
  },
  ja: {
    label: "エラー 404",
    title: "ページが見つかりません",
    text: "お探しのページは移動・名称変更されたか、存在しない可能性があります。AI-native University プロジェクトのページへお戻りください。",
    home: "トップページへ",
    owner: "本システムはダナン建築大学（Danang Architecture University）が所有しています。",
  },
  zh: {
    label: "错误 404",
    title: "页面未找到",
    text: "您访问的页面可能已被移动、重命名或从未存在。请返回 AI-native University 项目页面。",
    home: "返回首页",
    owner: "本系统归岘港建筑大学（Danang Architecture University）所有。",
  },
};

// One static 404.html serves every locale: pick the language from the URL
// before paint, falling back to Vietnamese.
const pickLocale = `(function(){var l=location.pathname.split("/")[1];if(${JSON.stringify(
  locales,
)}.indexOf(l)>-1)document.documentElement.setAttribute("data-l404",l);})();`;

const localeCss = locales
  .map((l) => `html[data-l404="${l}"] [data-l]{display:none}html[data-l404="${l}"] [data-l="${l}"]{display:block}`)
  .join("");

function LostDiagram() {
  const C = 160;
  const d = (r: number) => `${C},${C - r} ${C + r},${C} ${C},${C + r} ${C - r},${C}`;
  return (
    <svg viewBox="0 0 320 320" className="hero-visual nf-visual w-full max-w-[22rem]" aria-hidden>
      <defs>
        <pattern id="nf-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className="fill-ink/15" />
        </pattern>
      </defs>
      <rect width="320" height="320" fill="url(#nf-dots)" />
      {[140, 95, 50].map((r, i) => (
        <polygon
          key={r}
          points={d(r)}
          pathLength={1}
          fill="none"
          className={`hv-draw ${i === 1 ? "stroke-ink" : "stroke-ink/40"}`}
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}
      {/* The core is missing: an empty, dashed slot where 5T should be. */}
      <polygon points={d(30)} fill="none" className="stroke-brand" strokeWidth="2" strokeDasharray="5 5" />
      <text x={C} y={C + 7} textAnchor="middle" className="fill-brand text-[20px] font-bold">
        ?
      </text>
      <rect x="236" y="62" width="14" height="14" className="nf-drift fill-brand" />
    </svg>
  );
}

export default function GlobalNotFound() {
  return (
    <html lang="vi" className={bricolage.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: pickLocale }} />
        <style>{`[data-l]:not([data-l="vi"]){display:none}${localeCss}`}</style>
      </head>
      <body className="flex min-h-dvh flex-col">
        <header className="border-b border-rule">
          <div className="bg-ink text-[0.8125rem] text-white/75">
            <div className="mx-auto flex h-9 max-w-site items-center justify-between px-4 sm:px-6 lg:px-8">
              <span className="truncate">{fix("Trường Đại học Kiến trúc Đà Nẵng", "vi")}</span>
              <nav aria-label="Language" className="flex h-full">
                {locales.map((l) => (
                  <a key={l} href={`/${l}/`} hrefLang={l} className="grid h-full place-items-center px-3 hover:text-white">
                    {localeLabels[l]}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="mx-auto flex h-[4.5rem] max-w-site items-center px-4 sm:px-6 lg:px-8">
            <a href="/vi/" className="flex items-center gap-3">
              <Image src="/images/logo-dau.png" alt="DAU" width={44} height={45} priority />
              <span className="flex flex-col leading-tight">
                <span className="text-lg font-semibold tracking-tight">DAU</span>
                <span className="text-xs text-ink-soft">AI-native University</span>
              </span>
            </a>
          </div>
        </header>

        <main className="flex-1">
          <div className="mullions mx-auto grid max-w-site items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-x-6 lg:px-8 lg:py-24">
            <div className="lg:col-span-7">
              <p className="num text-brand">404</p>
              {locales.map((l) => {
                const c = copy[l];
                return (
                  <div key={l} data-l={l} lang={l === "zh" ? "zh-Hans" : l} className="mt-8 border-t-2 border-ink pt-5">
                    <p className="label">{c.label}</p>
                    <h1 className="d2 mt-3">{fix(c.title, l)}</h1>
                    <p className="lead mt-5 max-w-xl">{fix(c.text, l)}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={`/${l}/`}
                        className="group inline-flex h-13 items-center gap-3 bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-strong"
                      >
                        <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
                          ←
                        </span>
                        {c.home}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center lg:col-span-5">
              <LostDiagram />
            </div>
          </div>
        </main>

        <footer className="bg-ink text-white">
          <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm sm:px-6 lg:px-8">
            {locales.map((l) => (
              <p key={l} data-l={l} className="text-white/80">
                {fix(copy[l].owner, l)}
              </p>
            ))}
            <span className="text-white/55">© 2026 DAU</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
