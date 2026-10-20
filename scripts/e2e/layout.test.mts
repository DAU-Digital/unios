// Layout regressions found in the screenshot review (`npm run shots`).
// Runs against the last build: `npm run build && npm run test:e2e`.
import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { setTimeout as wait } from "node:timers/promises";
import type { Browser, Page } from "puppeteer-core";
import { launch, openPage } from "./browser.mts";
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

const PROJECTOR = { width: 1280, height: 720 };
const LAPTOP = { width: 1440, height: 900 };
const LARGE = { width: 1920, height: 1080 };

// Measure the settled layout: reduced motion skips the reveal transitions.
const still = (p: Page) => p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

// Shows panel `panel` (0-based) of slide `id`.
async function show(page: Page, id: string, panel = 0) {
  await page.evaluate(
    `(() => {
      const slide = document.getElementById(${JSON.stringify(id)});
      slide.scrollIntoView({ behavior: "instant" });
      const track = slide.querySelector("[data-track]");
      if (track) track.scrollTo({ left: track.children[${panel}].offsetLeft, behavior: "instant" });
    })()`,
  );
  await wait(400);
}

// Rounded top (or left) edges of the elements matching `selector`.
const edges = (page: Page, selector: string, side: "top" | "left" = "top") =>
  page.$$eval(selector, (els, side) => els.map((el) => Math.round(el.getBoundingClientRect()[side as "top" | "left"])), side);

test("why table fits the projector screen", async () => {
  for (const locale of ["vi", "en", "ja", "zh"]) {
    const page = await openPage(browser, `${site.url}/${locale}/`, PROJECTOR, still);
    for (const panel of [2, 3]) {
      await show(page, "why", panel);
      const bottom = await page.$eval("#why", (slide, panel) => {
        const rows = slide.querySelectorAll("[data-track] > .panel")[panel as number].querySelectorAll('[role="row"]');
        return rows[rows.length - 1].getBoundingClientRect().bottom;
      }, panel);
      assert.ok(bottom <= PROJECTOR.height, `${locale} panel ${panel + 1}: last row ends at ${bottom}`);
    }
    await page.close();
  }
});

test("maturity descriptions line up", async () => {
  for (const locale of ["vi", "en"]) {
    const page = await openPage(browser, `${site.url}/${locale}/`, LAPTOP, still);
    await show(page, "maturity");
    const tops = await edges(page, "[data-level-text]");
    assert.equal(new Set(tops).size, 1, `${locale}: ${tops.join(", ")}`);
    await page.close();
  }
});

test("overview fact titles line up", async () => {
  for (const viewport of [LAPTOP, LARGE]) {
    for (const locale of ["vi", "en"]) {
      const page = await openPage(browser, `${site.url}/${locale}/`, viewport, still);
      await show(page, "overview");
      const tops = await edges(page, "[data-fact-title]");
      assert.equal(new Set(tops).size, 1, `${locale} ${viewport.width}: ${tops.join(", ")}`);
      await page.close();
    }
  }
});

test("card dividers line up", async () => {
  for (const viewport of [LAPTOP, LARGE]) {
    for (const locale of ["vi", "en"]) {
      const page = await openPage(browser, `${site.url}/${locale}/`, viewport, still);
      await show(page, "why", 1);
      const paths = await edges(page, "[data-path-result]");
      assert.equal(new Set(paths).size, 1, `${locale} ${viewport.width} paths: ${paths.join(", ")}`);
      await show(page, "copilots");
      const guards = await edges(page, "[data-copilot-guard]");
      assert.equal(new Set(guards).size, 1, `${locale} ${viewport.width} copilots: ${guards.join(", ")}`);
      await page.close();
    }
  }
});

test("advantage texts line up", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, LAPTOP, still);
  await show(page, "benchmark", 1);
  // Two columns: compare each text's offset from its own item.
  const offsets = await page.$$eval("[data-advantage-text]", (els) =>
    els.map((el) => Math.round(el.getBoundingClientRect().left - el.parentElement!.getBoundingClientRect().left)),
  );
  assert.equal(new Set(offsets).size, 1, offsets.join(", "));
  await page.close();
});

async function openBook(page: Page) {
  await page.click("[data-book-open-button]");
  await page.waitForSelector("[data-book]:not([hidden])");
  await wait(300);
}

test("book keeps the focus ring off its buttons while presenting", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR);
  await openBook(page);
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.evaluate(() => document.activeElement?.hasAttribute("data-book")), true);
  await page.close();
});

test("book pager stays put", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR);
  await openBook(page);
  const first = await edges(page, "[data-book-next]", "left");
  await page.keyboard.press("End");
  await wait(200);
  assert.deepEqual(await edges(page, "[data-book-next]", "left"), first);
  await page.close();
});

test("every big number in the book has a caption", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR);
  const bare = await page.$$eval(".book-big", (els) => els.filter((el) => !el.querySelector(".book-big-cap")).length);
  assert.equal(bare, 0);
  await page.close();
});

test("indicator items in the book never split", async () => {
  for (const locale of ["vi", "en"]) {
    const page = await openPage(browser, `${site.url}/${locale}/`, PROJECTOR);
    await openBook(page);
    await page.keyboard.press("ArrowRight");
    for (let i = 0; i < 4; i++) await page.keyboard.press("ArrowRight");
    await wait(1200);
    const lines = await page.$$eval("[data-bridge-item]", (els) => els.map((el) => new Set([...el.getClientRects()].map((r) => Math.round(r.top))).size));
    assert.ok(lines.length > 0 && lines.every((n) => n === 1), `${locale}: ${lines.join(", ")}`);
    await page.close();
  }
});

test("closing footer stays on the projector screen and clear of the rail", async () => {
  for (const locale of ["vi", "en"]) {
    const page = await openPage(browser, `${site.url}/${locale}/`, PROJECTOR, still);
    await show(page, "closing");
    const box = await page.$eval("#closing footer", (footer) => {
      const texts = [...footer.querySelectorAll("p, a, span")].map((el) => el.getBoundingClientRect()).filter((r) => r.width > 0);
      return { bottom: Math.max(...texts.map((r) => r.bottom)), right: Math.max(...texts.map((r) => r.right)) };
    });
    assert.ok(box.bottom <= PROJECTOR.height, `${locale}: footer text ends at ${box.bottom}`);
    assert.ok(box.right <= PROJECTOR.width - 48, `${locale}: footer text reaches ${box.right}`);
    await page.close();
  }
});
