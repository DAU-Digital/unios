import en from "./en";
import ja from "./ja";
import type { Dict, Locale } from "./types";
import vi from "./vi";
import zh from "./zh";

export * from "./types";

const dicts: Record<Locale, Dict> = { vi, en, ja, zh };

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}
