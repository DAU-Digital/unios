import { getDict, locales } from "@/content";
import { absoluteUrl, localePath, owner } from "@/content/site";

export const dynamic = "force-static";

const plain = (s: string) => s.replace(/\u00a0/g, " ").replace(/[\u2060\u200b]/g, "");

// A Markdown map of the site for AI assistants, built from the page copy.
export function GET() {
  const vi = getDict("vi");
  const en = getDict("en");
  const body = [
    `# ${plain(en.meta.title)}`,
    "",
    `> ${plain(en.meta.description)}`,
    "",
    `Owner: ${owner.name} (${owner.alternateName.join(", ")}), ${owner.url}`,
    `Model: ${plain(en.hero.model)}. Motto: ${plain(vi.motto.text)} (${plain(en.motto.text)}).`,
    "Timelines and targets on this site are proposals, not commitments.",
    "",
    "## Pages",
    "",
    ...locales.map((l) => {
      const t = getDict(l);
      return `- [${plain(t.meta.title)}](${absoluteUrl(localePath(l))}): ${plain(t.meta.description)}`;
    }),
    "",
    "## Key facts",
    "",
    ...en.model.layers.map((l) => `- ${l.code} ${plain(l.name)}: ${plain(l.text)}`),
    ...en.copilots.items.map((c) => `- ${plain(c.name)} (${plain(c.for)}): ${plain(c.does)} Limit: ${plain(c.guard)}`),
    ...en.roadmap.phases.map((p) => `- ${plain(p.when)}, ${plain(p.name)}: ${plain(p.text)}`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
