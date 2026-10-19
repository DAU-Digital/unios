import type { Locale } from "./types";

// The production host that answers 200. Canonicals, og:url, sitemap, robots and
// JSON-LD ids all derive from it.
export const SITE_URL = "https://dau-unios.coregenaihub.com";

export const DEFAULT_LOCALE: Locale = "vi";

export const ogLocale: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN",
};

// Facts about the owner, shared by the footer copy and the JSON-LD graph.
export const owner = {
  name: "Trường Đại học Kiến trúc Đà Nẵng",
  alternateName: ["Danang Architecture University", "DAU"],
  url: "https://dau.edu.vn",
  foundingDate: "2006",
  address: {
    streetAddress: "566 Núi Thành, phường Hoà Cường",
    addressLocality: "Đà Nẵng",
    addressCountry: "VN",
  },
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;
export const localePath = (locale: Locale) => `/${locale}/`;

// The welcome screen's key. It is a courtesy door for invited guests, not access
// control: the site is static, so the content still ships in the HTML.
export const ACCESS_KEY = "DAU2026";
export const ACCESS_STORE = "dau-access";
