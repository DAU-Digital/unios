import { fix } from "../keep";
import type { Locale } from "../types";
import type { VisionDict } from "./types";
import vi from "./vi";

export * from "./types";

// Only the Vietnamese original exists so far. Other locales show it with a note
// in their own language, and stay out of the index until translated.
const dicts: Partial<Record<Locale, VisionDict>> = { vi };

const untranslated: Record<Locale, string> = {
  vi: "",
  en: "This page has not been translated yet. The Vietnamese original is shown below.",
  ja: "このページはまだ翻訳されていません。ベトナム語の原文を表示しています。",
  zh: "本页尚未翻译，下面显示越南语原文。",
};

export const visionLocales = Object.keys(dicts) as Locale[];

function glue<T>(value: T, locale: Locale): T {
  if (typeof value === "string") return fix(value, locale) as T;
  if (Array.isArray(value)) return value.map((v) => glue(v, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, glue(v, locale)])) as T;
  }
  return value;
}

// The copy for a locale, and the language it is actually written in.
export function getVision(locale: Locale): { t: VisionDict; lang: Locale; translated: boolean } {
  const own = dicts[locale];
  const lang = own ? locale : "vi";
  const base = own ?? { ...vi, translationNote: untranslated[locale] };
  // Metadata goes into <title>/<meta>, where no-break spaces only get in the way.
  return { t: { ...glue(base, lang), meta: base.meta }, lang, translated: !!own };
}
