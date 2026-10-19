import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";

export const dynamic = "force-static";

// AI crawlers are named so answer engines can read and cite the project page.
// A crawler follows only the most specific group naming it, so these bots
// ignore `*`: any Disallow added later must be repeated in their groups.
const aiUserAgents = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [...aiUserAgents.map((userAgent) => ({ userAgent, allow: "/" })), { userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
