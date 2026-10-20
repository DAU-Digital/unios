// Headless Chrome for the end-to-end tests and screenshots (needs a local Chrome;
// set CHROME_PATH elsewhere, as for `npm run og`).
import puppeteer, { type Browser, type Page } from "puppeteer-core";

const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export function launch(): Promise<Browser> {
  return puppeteer.launch({ executablePath: chrome, headless: true });
}

export async function openPage(browser: Browser, url: string, viewport = { width: 1440, height: 900 }): Promise<Page> {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  // A returning guest skips the welcome screen (see the unlock script in the locale layout).
  await page.evaluateOnNewDocument(() => localStorage.setItem("dau-access", "1"));
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

// Display copy glues words with no-break spaces; compare text with whitespace flattened.
export const flat = (s: string | null | undefined) => (s ?? "").replace(/\s+/g, " ").trim();
