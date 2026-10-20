import type { MetadataRoute } from "next";
import { locales } from "@/content";
import { visionLocales } from "@/content/vision";
import { absoluteUrl, localePath } from "@/content/site";
import { languageAlternates } from "@/lib/seo";
import { visionAlternates, visionPath } from "@/lib/vision-seo";

export const dynamic = "force-static";

// Exactly the indexable pages: the initiative in every locale and /2050 in the
// locales it is translated into ("/" and "/2050" only redirect).
// No lastModified: there is no real content date to report.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.map((l) => ({
      url: absoluteUrl(localePath(l)),
      alternates: { languages: languageAlternates() },
    })),
    ...visionLocales.map((l) => ({
      url: absoluteUrl(visionPath(l)),
      alternates: { languages: visionAlternates() },
    })),
  ];
}
