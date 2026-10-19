import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đề án AI-native University — Trường Đại học Kiến trúc Đà Nẵng",
};

// Static export has no server redirects, so send visitors to the Vietnamese page.
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
