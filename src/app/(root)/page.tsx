import type { Metadata } from "next";
import { absoluteUrl } from "@/content/site";

// Vercel redirects "/" to /vi/ (vercel.json); this page is only the fallback for
// other static hosts, so it points crawlers at the real page and stays out of the index.
export const metadata: Metadata = {
  title: "Đề án AI-native University | Đại học Kiến trúc Đà Nẵng",
  alternates: { canonical: absoluteUrl("/vi/") },
  robots: { index: false, follow: true },
};

export default function Home() {
  return (
    <main className="grid min-h-dvh place-items-center p-8">
      <meta httpEquiv="refresh" content="0;url=/vi/" />
      <a className="more" href="/vi/">
        Đề án AI-native University
      </a>
    </main>
  );
}
