import type { Metadata } from "next";
import { absoluteUrl } from "@/content/site";

// The short link people share. Vercel redirects /2050 to /vi/2050/ (vercel.json);
// this page is the fallback for `next dev` and other static hosts.
export const metadata: Metadata = {
  title: "Tầm nhìn 2050 | Đại học Kiến trúc Đà Nẵng",
  alternates: { canonical: absoluteUrl("/vi/2050/") },
  robots: { index: false, follow: true },
};

export default function Vision2050() {
  return (
    <main className="grid min-h-dvh place-items-center p-8">
      <meta httpEquiv="refresh" content="0;url=/vi/2050/" />
      <a className="more" href="/vi/2050/">
        Tầm nhìn 2050
      </a>
    </main>
  );
}
