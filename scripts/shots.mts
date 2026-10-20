// Screenshots of every slide, every side panel and every book spread, for a
// line-break review: `npm run build && npm run shots` → .shots/<w>x<h>/<locale>/.
// Projector size in every language; the larger sizes in Vietnamese only.
import { mkdirSync } from "node:fs";
import { setTimeout as wait } from "node:timers/promises";
import { launch, openPage } from "./e2e/browser.mts";
import { serve } from "./e2e/server.mts";

const runs = [
  ...["vi", "en", "ja", "zh"].map((locale) => ({ locale, width: 1280, height: 720 })),
  { locale: "vi", width: 1440, height: 900 },
  { locale: "vi", width: 1920, height: 1080 },
];

const pad = (n: number) => String(n).padStart(2, "0");
const site = await serve("out");
const browser = await launch();
let count = 0;

for (const { locale, width, height } of runs) {
  const dir = `.shots/${width}x${height}/${locale}`;
  mkdirSync(dir, { recursive: true });
  const page = await openPage(browser, `${site.url}/${locale}/`, { width, height });
  // The keyboard hint would cover the first slide.
  await page.addStyleTag({ content: ".deck-hint{display:none!important}" });

  const slides = await page.$$eval("[data-slide]", (els) =>
    els.map((el) => ({ id: el.id, panels: el.querySelector("[data-track]")?.children.length ?? 1 })),
  );
  for (const [i, { id, panels }] of slides.entries()) {
    for (let p = 0; p < panels; p++) {
      await page.evaluate(
        (id, p) => {
          const slide = document.getElementById(id)!;
          slide.scrollIntoView({ behavior: "instant" });
          const track = slide.querySelector<HTMLElement>("[data-track]");
          const panel = track?.children[p] as HTMLElement | undefined;
          if (track && panel) track.scrollTo({ left: panel.offsetLeft, behavior: "instant" });
        },
        id,
        p,
      );
      // Long enough for the reveal and the count-up (Reveal.tsx, 1.4s) to finish.
      await wait(1700);
      await page.screenshot({ path: `${dir}/web-${pad(i)}-${id}-${p + 1}.png` });
      count++;
    }
  }

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.click("[data-book-open-button]");
  await wait(600);
  await page.keyboard.press("Home");
  for (let s = 0; s < 16; s++) {
    await wait(1200);
    await page.screenshot({ path: `${dir}/book-${pad(s)}.png` });
    count++;
    await page.keyboard.press("ArrowRight");
  }
  await page.close();
}

await browser.close();
await site.close();
console.log(`${count} screenshots in .shots/`);
