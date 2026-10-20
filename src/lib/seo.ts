import type { Metadata } from "next";
import { getDict, htmlLang, locales, type Locale } from "@/content";
import { DEFAULT_LOCALE, SITE_URL, absoluteUrl, localePath, ogLocale, owner } from "@/content/site";

// Display copy glues words with no-break spaces / word joiners and marks Chinese
// word breaks with zero-width spaces; tags want plain text.
const plain = (s: string) => s.replace(/\u00a0/g, " ").replace(/[\u2060\u200b]/g, "");

export const ogImagePath = (locale: Locale) => `/og/${locale}.png`;

// Every locale page links to all translations; x-default is the Vietnamese original.
export function languageAlternates() {
  return {
    ...Object.fromEntries(locales.map((l) => [htmlLang[l], absoluteUrl(localePath(l))])),
    "x-default": absoluteUrl(localePath(DEFAULT_LOCALE)),
  };
}

// Complete page metadata: metadata merges shallowly, so openGraph and twitter
// are always returned whole, with explicit images.
export function pageMetadata(locale: Locale): Metadata {
  const t = getDict(locale);
  const url = absoluteUrl(localePath(locale));
  const image = { url: absoluteUrl(ogImagePath(locale)), width: 1200, height: 630, alt: t.meta.title };
  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    alternates: { canonical: url, languages: languageAlternates() },
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

// JSON-LD graph: the university, this site, and the page in its language.
export function jsonLd(locale: Locale) {
  const t = getDict(locale);
  const pageUrl = absoluteUrl(localePath(locale));
  const orgId = `${SITE_URL}/#dau`;
  const siteId = `${SITE_URL}/#website`;
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
        "@type": "WebSite",
        "@id": siteId,
        url: absoluteUrl("/"),
        name: "AI-native University — DAU",
        publisher: { "@id": orgId },
        inLanguage: locales.map((l) => htmlLang[l]),
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: htmlLang[locale],
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        publisher: { "@id": orgId },
        primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(ogImagePath(locale)), width: 1200, height: 630 },
      },
    ],
  };
}
