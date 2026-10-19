import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { htmlLang, locales, type Locale } from "@/content";
import { ACCESS_STORE, SITE_URL } from "@/content/site";
import "../globals.css";
import { bricolage } from "../fonts";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Defaults only: canonical, og:url and copy are set per page (see lib/seo.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "AI-native University — DAU",
  authors: [{ name: "Trường Đại học Kiến trúc Đà Nẵng", url: "https://dau.edu.vn" }],
  publisher: "Trường Đại học Kiến trúc Đà Nẵng",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    // favicon.ico comes from the app/ file convention.
    icon: { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1b1e23",
};

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
    // The unlock script below may set data-unlocked on <html> before hydration.
    <html lang={htmlLang[locale]} className={bricolage.variable} suppressHydrationWarning>
      <body>
        {/* Runs before first paint, so a returning guest never sees the welcome screen flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{localStorage.getItem(${JSON.stringify(ACCESS_STORE)})&&document.documentElement.setAttribute("data-unlocked","")}catch(e){}`,
          }}
        />
        {children}
        <Reveal />
      </body>
    </html>
  );
}
