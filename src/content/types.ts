export const locales = ["vi", "en", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  vi: "VI",
  en: "EN",
  ja: "JA",
  zh: "ZH",
};

export const htmlLang: Record<Locale, string> = {
  vi: "vi",
  en: "en",
  ja: "ja",
  zh: "zh-Hans",
};

type Item = { title: string; text: string };
type Stat = { value: string; label: string };
type Term = { name: string; en: string };

export type Dict = {
  meta: { title: string; description: string };
  // Shown on machine-translated locales until reviewed.
  translationNote?: string;
  brand: { project: string; school: string };
  nav: {
    overview: string;
    philosophy: string;
    model: string;
    copilots: string;
    roadmap: string;
    benchmark: string;
    menu: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    title: [string, string];
    model: string;
    lead: string;
    cta: string;
    stats: Stat[];
  };
  overview: {
    label: string;
    title: string;
    lead: string;
    drivers: Item[];
    facts: { value: string; title: string; text: string }[];
  };
  motto: { label: string; text: string };
  philosophy: {
    label: string;
    title: string;
    lead: string;
    tiers: { name: string; text: string; items: Term[] }[];
    bridge: { label: string; items: string[] };
  };
  model: {
    label: string;
    title: string;
    lead: string;
    layers: { code: string; name: string; text: string }[];
  };
  copilots: {
    label: string;
    title: string;
    lead: string;
    forLabel: string;
    guardLabel: string;
    items: { name: string; for: string; does: string; guard: string }[];
    foundation: string;
    quote: [string, string, string];
  };
  maturity: {
    label: string;
    title: string;
    lead: string;
    levels: { name: string; en: string; text: string }[];
    target: string;
  };
  roadmap: {
    label: string;
    title: string;
    lead: string;
    phases: { when: string; name: string; text: string }[];
    principle: string;
    note: string;
  };
  targets: { label: string; title: string; note: string; items: Stat[] };
  pillars: {
    label: string;
    title: string;
    lead: string;
    items: Item[];
    crossTitle: string;
    cross: string[];
  };
  studio: {
    label: string;
    title: string;
    lead: string;
    badge: string;
    standards: string[];
  };
  benchmark: {
    label: string;
    title: string;
    lead: string;
    stats: Stat[];
    advantagesTitle: string;
    advantages: string[];
    caveat: string;
  };
  principles: { label: string; title: string; items: Item[] };
  closing: { quote: string; cite: string };
  // Welcome screen that asks invited guests for the access key.
  gate: {
    title: string;
    lead: string;
    label: string;
    placeholder: string;
    submit: string;
    error: string;
    note: string;
  };
  deck: { prev: string; next: string; hint: string };
  footer: {
    ownership: string;
    address: string;
    source: string;
    rights: string;
    top: string;
  };
};
