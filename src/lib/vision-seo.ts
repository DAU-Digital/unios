import type { Metadata } from "next";
import { htmlLang, locales, type Locale } from "@/content";
import { SITE_URL, absoluteUrl, ogLocale, owner } from "@/content/site";
import { getVision, visionLocales } from "@/content/vision";
import { ogImagePath } from "@/lib/seo";

export const visionPath = (locale: Locale) => `/${locale}/2050/`;

// Display copy glues words with no-break spaces / word joiners; tags want plain text.
const plain = (s: string) => s.replace(/ /g, " ").replace(/⁠/g, "");

// Only translated pages are alternates; x-default is the Vietnamese original.
export function visionAlternates() {
  return {
    ...Object.fromEntries(visionLocales.map((l) => [htmlLang[l], absoluteUrl(visionPath(l))])),
    "x-default": absoluteUrl(visionPath("vi")),
  };
}

// Untranslated locales show the Vietnamese text, so they point at it and stay
// out of the index.
export function visionMetadata(locale: Locale): Metadata {
  const { t, translated } = getVision(locale);
  const url = absoluteUrl(visionPath(locale));
  // Placeholder: the AI-native page's share image until /2050 has its own.
  const image = { url: absoluteUrl(ogImagePath("vi")), width: 1200, height: 630, alt: t.meta.title };
  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    alternates: { canonical: translated ? url : absoluteUrl(visionPath("vi")), languages: visionAlternates() },
    ...(translated ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type: "website",
      url,
      siteName: plain(t.brand.school),
      title: t.meta.title,
      description: t.meta.description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [image],
    },
  };
}

export function visionJsonLd(locale: Locale) {
  const { t, lang } = getVision(locale);
  const pageUrl = absoluteUrl(visionPath(locale));
  const orgId = `${SITE_URL}/#dau`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        "@id": orgId,
        name: owner.name,
        alternateName: owner.alternateName,
        url: owner.url,
        logo: absoluteUrl("/icon-512.png"),
        foundingDate: owner.foundingDate,
        address: { "@type": "PostalAddress", ...owner.address },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: htmlLang[lang],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": orgId },
        publisher: { "@id": orgId },
      },
    ],
  };
}
