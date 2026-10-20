// Copy for the /[locale]/2050/ page: the school's development strategy
// 2026–2030 and its vision to 2050.

type Item = { title: string; text: string };
type Stat = { value: string; label: string };

export type VisionDict = {
  meta: { title: string; description: string };
  // Shown while a locale still falls back to the Vietnamese original.
  translationNote?: string;
  brand: { project: string; school: string };
  nav: {
    vision: string;
    mission: string;
    journey: string;
    identity: string;
    views: string;
    pillars: string;
    // Link to the AI-native University page.
    initiative: string;
    menu: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    title: [string, string];
    lead: string;
    cta: string;
    stats: Stat[];
    // Labels of the nested diamonds, innermost first.
    rings: { name: string; year: string }[];
    visual: string;
  };
  // The short vision used in outreach, one line per part.
  statement: { label: string; title: string; parts: string[]; note: string };
  vision: { label: string; title: string; lead: string; markersTitle: string; markers: string[] };
  real: { label: string; title: string; lead: string; abilitiesTitle: string; abilities: string[] };
  mission: {
    label: string;
    title: string;
    lead: string;
    learnersTitle: string;
    learners: Item[];
    motto: string;
    commitmentsTitle: string;
    commitments: Item[];
  };
  journey: {
    label: string;
    title: string;
    lead: string;
    phases: { from: number; to: number; name: string; text: string }[];
    note: string;
  };
  future: { label: string; title: string; items: Item[]; fieldsTitle: string; fields: string[] };
  identity: {
    label: string;
    title: string;
    lead: string;
    tiers: { name: string; role: string; items: { name: string; en: string; text: string }[] }[];
    bridge: { label: string; items: string[] };
  };
  views: {
    label: string;
    title: string;
    lead: string;
    // "Lấy … làm …": the subject, then what it serves as.
    chainTitle: string;
    chainWords: [string, string];
    chain: { what: string; as: string }[];
    items: Item[];
  };
  domain: {
    label: string;
    title: string;
    lead: string;
    steps: Item[];
    core: string;
    domains: { name: string; text: string }[];
    scale: Stat[];
  };
  pillars: {
    label: string;
    title: string;
    lead: string;
    items: Item[];
    targetsTitle: string;
    targets: Stat[];
    more: string;
  };
  closing: { quote: string; cite: string };
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
