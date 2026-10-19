import type { MetadataRoute } from "next";
import { locales } from "@/content";
import { absoluteUrl, localePath } from "@/content/site";
import { languageAlternates } from "@/lib/seo";

export const dynamic = "force-static";

// Exactly the indexable pages: one per locale ("/" only redirects to /vi/).
// No lastModified: there is no real content date to report.
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((l) => ({
    url: absoluteUrl(localePath(l)),
    alternates: { languages: languageAlternates() },
  }));
}
