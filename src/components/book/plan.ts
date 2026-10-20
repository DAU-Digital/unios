// The book view's running order: which pages face each other, and which slide
// of the deck each spread stands for (to open the book where the presenter is
// and to return there on closing).

export type SectionId =
  | "top"
  | "motto"
  | "why"
  | "overview"
  | "philosophy"
  | "model"
  | "copilots"
  | "maturity"
  | "roadmap"
  | "targets"
  | "pillars"
  | "studio"
  | "benchmark"
  | "principles"
  | "closing";

export type PageKind =
  | "diagram"
  | "cover"
  | "why-open"
  | "why-drivers"
  | "why-paths"
  | "why-table"
  | "overview-open"
  | "overview-facts"
  | "identity-open"
  | "tier-philosophy"
  | "tier-education"
  | "tier-values"
  | "model-open"
  | "model-layers"
  | "copilots-open"
  | "copilots-list"
  | "maturity-open"
  | "maturity-levels"
  | "roadmap-open"
  | "roadmap-phases"
  | "targets-open"
  | "targets-list"
  | "pillars-open"
  | "pillars-list"
  | "studio-open"
  | "studio-standards"
  | "benchmark-open"
  | "benchmark-advantages"
  | "principles-open"
  | "principles-list"
  | "closing-quote"
  | "back-cover";

export type Spread = { left: PageKind; right: PageKind; section: SectionId; also?: SectionId[] };

// Each section opens on a left page (its head) with the details on the right.
export const SPREADS: readonly Spread[] = [
  { left: "diagram", right: "cover", section: "top", also: ["motto"] },
  { left: "why-open", right: "why-drivers", section: "why" },
  { left: "why-paths", right: "why-table", section: "why" },
  { left: "overview-open", right: "overview-facts", section: "overview" },
  { left: "identity-open", right: "tier-philosophy", section: "philosophy" },
  { left: "tier-education", right: "tier-values", section: "philosophy" },
  { left: "model-open", right: "model-layers", section: "model" },
  { left: "copilots-open", right: "copilots-list", section: "copilots" },
  { left: "maturity-open", right: "maturity-levels", section: "maturity" },
  { left: "roadmap-open", right: "roadmap-phases", section: "roadmap" },
  { left: "targets-open", right: "targets-list", section: "targets" },
  { left: "pillars-open", right: "pillars-list", section: "pillars" },
  { left: "studio-open", right: "studio-standards", section: "studio" },
  { left: "benchmark-open", right: "benchmark-advantages", section: "benchmark" },
  { left: "principles-open", right: "principles-list", section: "principles" },
  { left: "closing-quote", right: "back-cover", section: "closing" },
];

export const PAGES: readonly PageKind[] = SPREADS.flatMap((s) => [s.left, s.right]);

// The first spread for a slide id; the cover for anything else.
export function spreadOfSection(id: string): number {
  const at = SPREADS.findIndex((s) => s.section === id || s.also?.includes(id as SectionId));
  return at < 0 ? 0 : at;
}

export function sectionOfSpread(index: number): SectionId {
  return SPREADS[Math.max(0, Math.min(SPREADS.length - 1, index))].section;
}

export type BookAction = "next" | "prev" | "first" | "last" | "close" | "block";

// Presentation clickers send PageUp/PageDown (or arrows); some also send F5,
// which must not reload the page while the book is open. Every key that would
// otherwise scroll the deck behind the book turns a page instead.
export function bookAction(key: string): BookAction | null {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
    case "PageDown":
      return "next";
    case "ArrowLeft":
    case "ArrowUp":
    case "PageUp":
      return "prev";
    case "Home":
      return "first";
    case "End":
      return "last";
    case "Escape":
      return "close";
    case "F5":
      return "block";
    default:
      return null;
  }
}
