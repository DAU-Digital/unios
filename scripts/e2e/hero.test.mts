// Runs against the last build: `npm run build && npm run test:e2e`.
import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { setTimeout as wait } from "node:timers/promises";
import type { Browser, Page } from "puppeteer-core";
import { getDict } from "../../src/content";
import { flat, launch, openPage } from "./browser.mts";
import { serve } from "./server.mts";

let site: Awaited<ReturnType<typeof serve>>;
let browser: Browser;

before(async () => {
  site = await serve("out");
  browser = await launch();
});
after(async () => {
  await browser.close();
  await site.close();
});

const lit = (page: Page) => page.$eval("[data-hero-caption]", (el) => Number(el.getAttribute("data-lit")));
const shown = async (page: Page) => flat(await page.$eval('[data-hero-caption] [aria-hidden="false"]', (el) => el.textContent));

test("caption follows the ring", async () => {
  const page = await openPage(browser, `${site.url}/vi/`);
  const first = await lit(page);
  await wait(3200);
  const next = (first + 1) % 9;
  assert.equal(await lit(page), next);
  assert.ok((await shown(page)).includes(flat(getDict("vi").model.layers[next].name)));
  await page.close();
});

test("hover pins a layer", async () => {
  const page = await openPage(browser, `${site.url}/vi/`);
  await page.hover('[data-layer="4"] .hv-hit');
  assert.equal(await lit(page), 4);
  await wait(3200);
  assert.equal(await lit(page), 4);
  await page.mouse.move(5, 5);
  await wait(3200);
  assert.equal(await lit(page), 5);
  await page.close();
});

test("no layout shift", async () => {
  const page = await openPage(browser, `${site.url}/vi/`);
  const heights = [];
  for (let i = 0; i < 9; i++) {
    await page.$eval(`[data-layer="${i}"]`, (el) => (el as SVGElement).focus());
    heights.push(
      await page.evaluate(() => [
        document.getElementById("top")!.getBoundingClientRect().height,
        document.querySelector("[data-hero-caption]")!.getBoundingClientRect().height,
      ]),
    );
  }
  for (const h of heights) assert.deepEqual(h, heights[0]);
  await page.close();
});

test("reduced motion holds still", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, undefined, (p) =>
    p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]),
  );
  await wait(3500);
  assert.equal(await lit(page), 0);
  await page.close();
});

test("hero fits the first screen", async () => {
  for (const locale of ["vi", "ja"]) {
    for (const viewport of [{ width: 1280, height: 720 }, { width: 1440, height: 900 }]) {
      const page = await openPage(browser, `${site.url}/${locale}/`, viewport);
      const bottom = await page.$eval("#top dl", (el) => el.getBoundingClientRect().bottom);
      assert.ok(bottom <= viewport.height, `${locale} ${viewport.width}×${viewport.height}: stats end at ${bottom}`);
      await page.close();
    }
  }
});

test("caption fits a phone", async () => {
  for (const locale of ["ja", "zh"]) {
    const page = await openPage(browser, `${site.url}/${locale}/`, { width: 375, height: 812 });
    await page.$eval('[data-layer="8"]', (el) => (el as SVGElement).focus());
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    assert.ok(width <= 375, `${locale}: page is ${width}px wide`);
    await page.close();
  }
});

test("copilot labels follow the locale", async () => {
  const vi = await openPage(browser, `${site.url}/vi/`);
  assert.ok(flat(await vi.$eval("#top svg", (el) => el.textContent)).includes("Gia sư AI"));
  await vi.close();
  const ja = await openPage(browser, `${site.url}/ja/`);
  const text = flat(await ja.$eval("#top svg", (el) => el.textContent));
  assert.ok(text.includes("AIチューター"));
  assert.ok(!text.includes("（AI Tutor）"));
  await ja.close();
});
