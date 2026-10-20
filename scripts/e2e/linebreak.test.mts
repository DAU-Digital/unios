// Line-break regressions found in the screenshot review (`npm run shots`).
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

// Line tops of the characters of `word` inside `scope`; one value when the word
// sits on a single line.
async function lineTops(page: Page, scope: string, word: string): Promise<number[] | null> {
  return (await page.evaluate(`(() => {
    const root = document.querySelector(${JSON.stringify(scope)});
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const at = node.textContent.indexOf(${JSON.stringify(word)});
      if (at < 0) continue;
      const range = document.createRange();
      range.setStart(node, at);
      range.setEnd(node, at + ${word.length});
      return [...new Set([...range.getClientRects()].map((r) => Math.round(r.top)))];
    }
    return null;
  })()`)) as number[] | null;
}

test("japanese keeps phrases whole in the book", async () => {
  const page = await openPage(browser, `${site.url}/ja/`, { width: 1280, height: 720 });
  await page.evaluate(() => document.getElementById("roadmap")!.scrollIntoView({ behavior: "instant" }));
  await wait(400);
  await page.click("[data-book-open-button]");
  await wait(800);
  const tops = await lineTops(page, '[data-kind="roadmap-phases"]', "方針");
  assert.ok(tops, "phrase not found");
  assert.equal(tops.length, 1, `"方針" spans lines at ${tops.join(", ")}`);
  await page.close();
});

// Shows panel `panel` (0-based) of slide `id` with reveal transitions skipped.
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
const still = (p: Page) => p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

test("chinese breaks between words, not inside them", async () => {
  const page = await openPage(browser, `${site.url}/zh/`, { width: 1280, height: 720 }, still);
  await show(page, "why", 2);
  for (const word of ["决策", "提升"]) {
    const tops = await lineTops(page, "#why", word);
    assert.ok(tops, `${word} not found`);
    assert.equal(tops.length, 1, `"${word}" spans lines at ${tops.join(", ")}`);
  }
  await page.close();
});

test("chinese uses a simplified chinese font", async () => {
  const page = await openPage(browser, `${site.url}/zh/`);
  const family = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  assert.ok(family.indexOf("PingFang SC") >= 0 && family.indexOf("PingFang SC") < family.indexOf("Hiragino"), family);
  await page.close();
});

test("copilot names put their english alias on its own line", async () => {
  for (const locale of ["ja", "zh"]) {
    const page = await openPage(browser, `${site.url}/${locale}/`, { width: 1280, height: 720 }, still);
    await show(page, "copilots");
    const titles = await page.$$eval("#copilots article h3", (els) =>
      els.map((h) => ({ main: h.firstChild?.textContent ?? "", alias: h.querySelector("[data-copilot-alias]")?.textContent ?? null })),
    );
    for (const { main, alias } of titles) {
      assert.ok(!main.includes("（"), `${locale}: ${main}`);
      assert.ok(alias, `${locale}: ${main} has no alias line`);
    }
    await page.close();
  }
});

test("japanese keeps katakana and kanji compounds whole at their middle dot", async () => {
  const page = await openPage(browser, `${site.url}/ja/`, { width: 1280, height: 720 }, still);
  await show(page, "copilots");
  const tops = await lineTops(page, "#copilots", "評価・\u2060認証");
  assert.ok(tops, "phrase not found");
  assert.equal(tops.length, 1, `"評価・認証" spans lines at ${tops.join(", ")}`);
  await page.close();
});
