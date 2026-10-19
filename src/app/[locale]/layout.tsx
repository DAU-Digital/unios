import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDict, htmlLang, locales, type Locale } from "@/content";
import "../globals.css";
import { bricolage } from "../fonts";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}/`])),
    },
    openGraph: { title: t.meta.title, description: t.meta.description, images: ["/images/banner.webp"] },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={htmlLang[locale]} className={bricolage.variable}>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
