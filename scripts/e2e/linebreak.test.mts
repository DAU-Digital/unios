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
