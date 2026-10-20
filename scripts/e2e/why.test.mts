// Runs against the last build: `npm run build && npm run test:e2e`.
import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import type { Browser } from "puppeteer-core";
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

test("why has three panels", async () => {
  const page = await openPage(browser, `${site.url}/vi/`);
  assert.equal(await page.$$eval("#why [data-track] > .panel", (els) => els.length), 3);
  await page.close();
});

test("overview has a single screen", async () => {
  const page = await openPage(browser, `${site.url}/vi/`);
  assert.equal(await page.$$eval("#overview [data-track] > .panel", (els) => els.length), 1);
  await page.close();
});

test("header menu starts with why", async () => {
  const page = await openPage(browser, `${site.url}/vi/`);
  assert.equal(flat(await page.$eval('header nav a[href^="#"]', (a) => a.textContent)), "Vì sao");
  await page.close();
});

test("review note only outside Vietnamese", async () => {
  const vi = await openPage(browser, `${site.url}/vi/`);
  assert.equal(await vi.$$eval("[data-why-note]", (els) => els.length), 0);
  await vi.close();
  const page = await openPage(browser, `${site.url}/en/`);
  const notes = await page.$$eval("[data-why-note]", (els) => els.map((e) => e.textContent));
  assert.deepEqual(notes.map(flat), [flat(getDict("en").why.note)]);
  await page.close();
});
