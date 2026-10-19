import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Đề án AI-native University — Trường Đại học Kiến trúc Đà Nẵng",
    short_name: "DAU AI-native",
    description: "Đề án chiến lược 2026–2031 của Trường Đại học Kiến trúc Đà Nẵng.",
    lang: "vi",
    start_url: "/vi/",
    scope: "/",
    display: "browser",
    theme_color: "#1b1e23",
    background_color: "#f6f6f4",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
