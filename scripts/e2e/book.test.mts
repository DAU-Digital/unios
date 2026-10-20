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

const spread = (page: Page) => page.$eval("[data-book]", (el) => Number(el.getAttribute("data-spread")));
const isOpen = (page: Page) => page.$eval("[data-book]", (el) => !el.hasAttribute("hidden"));
const bookOpenAttr = (page: Page) => page.evaluate(() => document.documentElement.hasAttribute("data-book-open"));

async function openBook(page: Page) {
  await page.click("[data-book-open-button]");
  await page.waitForSelector("[data-book]:not([hidden])");
  await wait(300);
}

test("opens from the header and flips with the clicker keys", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR);
  await openBook(page);
  assert.equal(await spread(page), 0);
  for (const [key, expected] of [["ArrowRight", 1], ["PageDown", 2], ["PageUp", 1], ["End", 15], ["Home", 0]] as const) {
    await page.keyboard.press(key);
    assert.equal(await spread(page), expected, key);
  }
  await page.keyboard.press("Escape");
  await wait(300);
  assert.equal(await isOpen(page), false);
  assert.equal(await bookOpenAttr(page), false);
  await page.close();
});

test("deck stays still while the book is open", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR);
  const before = await page.evaluate(() => window.scrollY);
  await openBook(page);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("PageDown");
  await wait(700);
  assert.equal(await page.evaluate(() => window.scrollY), before);
  await page.close();
});

test("opens at the section on screen and returns there", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR);
  await page.evaluate(() => document.getElementById("roadmap")!.scrollIntoView({ behavior: "instant" }));
  await wait(500);
  await openBook(page);
  assert.equal(await spread(page), 9);
  await page.keyboard.press("End");
  await wait(200);
  await page.keyboard.press("Escape");
  await wait(600);
  const top = await page.$eval("#closing", (el) => el.getBoundingClientRect().top);
  assert.ok(Math.abs(top) <= 5, `#closing top is ${top}`);
  await page.close();
});

test("F5 does not reload while open", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR);
  await openBook(page);
  const prevented = await page.evaluate(() => {
    const e = new KeyboardEvent("keydown", { key: "F5", cancelable: true, bubbles: true });
    window.dispatchEvent(e);
    return e.defaultPrevented;
  });
  assert.equal(prevented, true);
  await page.close();
});

test("button shows only on wide landscape screens", async () => {
  const display = (page: Page) => page.$eval("[data-book-open-button]", (el) => getComputedStyle(el).display);
  const narrow = await openPage(browser, `${site.url}/vi/`, { width: 900, height: 700 });
  assert.equal(await display(narrow), "none");
  await narrow.close();
  const wide = await openPage(browser, `${site.url}/vi/`, PROJECTOR);
  assert.notEqual(await display(wide), "none");
  await wide.close();
});

test("rapid flips keep page order", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR);
  await openBook(page);
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("ArrowRight");
    await wait(60);
  }
  await wait(1400);
  assert.equal(await spread(page), 5);
  const pages = await page.evaluate(`(() => {
    const sheet = document.querySelector(".book-sheet").getBoundingClientRect();
    const y = sheet.top + sheet.height / 2;
    const pageAt = (x) => {
      const el = document.elementFromPoint(x, y);
      const p = el && el.closest("[data-page]");
      return p ? p.getAttribute("data-page") : null;
    };
    return [pageAt(sheet.left + sheet.width * 0.25), pageAt(sheet.left + sheet.width * 0.75)];
  })()`);
  assert.deepEqual(pages, ["11", "12"]);
  await page.close();
});

test("book refits after a resize", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, { width: 1440, height: 900 });
  await openBook(page);
  await page.setViewport(PROJECTOR);
  await wait(400);
  const box = await page.$eval(".book-sheet", (el) => {
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
  });
  assert.ok(box.left >= 0 && box.top >= 0 && box.right <= 1280 && box.bottom <= 720, JSON.stringify(box));
  await page.close();
});

test("button keys do not double-act", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR);
  await openBook(page);
  await page.focus("[data-book-next]");
  await page.keyboard.press("Enter");
  await wait(100);
  assert.equal(await spread(page), 1);
  await page.keyboard.press("Space");
  await wait(100);
  assert.equal(await spread(page), 2);
  for (const key of [".", "b"]) {
    await page.keyboard.press(key);
    await wait(100);
    assert.equal(await spread(page), 2, key);
  }
  await page.close();
});

test("works without fullscreen", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR, (p) =>
    p.evaluateOnNewDocument(() => {
      Element.prototype.requestFullscreen = () => Promise.reject(new Error("denied"));
    }),
  );
  await openBook(page);
  const box = await page.$eval("[data-book]", (el) => {
    const r = el.getBoundingClientRect();
    return [r.left, r.top, r.width, r.height];
  });
  assert.deepEqual(box, [0, 0, 1280, 720]);
  await page.keyboard.press("ArrowRight");
  assert.equal(await spread(page), 1);
  await page.close();
});

test("reduced motion turns pages without animation", async () => {
  const page = await openPage(browser, `${site.url}/vi/`, PROJECTOR, (p) =>
    p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]),
  );
  await openBook(page);
  assert.equal(await page.$eval(".book-leaf", (el) => getComputedStyle(el).transitionDuration), "0s");
  await page.close();
});

test("pages never overflow and stay readable", async () => {
  for (const locale of ["vi", "en", "ja", "zh"]) {
    const page = await openPage(browser, `${site.url}/${locale}/`, PROJECTOR);
    await openBook(page);
    const report = (await page.evaluate(`(() => {
      const scale = document.querySelector(".book-stage").getBoundingClientRect().width / 1280;
      const kind = (el) => el.closest("[data-kind]").getAttribute("data-kind");
      const overflow = [...document.querySelectorAll(".book-page-inner")]
        .filter((el) => el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1)
        .map(kind);
      const small = [];
      for (const el of document.querySelectorAll(".book-page-inner *")) {
        if (el.closest("svg, .book-runhead, .book-num, .book-chip")) continue;
        if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
        const size = parseFloat(getComputedStyle(el).fontSize) * scale;
        if (size < 15.9) small.push(kind(el) + " " + Math.round(size) + "px: " + el.textContent.trim().slice(0, 30));
      }
      const titles = [...document.querySelectorAll(".book-title")]
        .filter((el) => parseFloat(getComputedStyle(el).fontSize) * scale < 31.9)
        .map(kind);
      return { overflow, small, titles };
    })()`)) as { overflow: string[]; small: string[]; titles: string[] };
    assert.deepEqual(report, { overflow: [], small: [], titles: [] }, locale);
    await page.close();
  }
});

test("header fits at 1024 and 1280", async () => {
  for (const locale of ["vi", "ja"]) {
    for (const width of [1024, 1280]) {
      const page = await openPage(browser, `${site.url}/${locale}/`, { width, height: 768 });
      const fits = await page.$eval("header > div", (el) => el.scrollWidth <= el.clientWidth);
      assert.ok(fits, `${locale} ${width}`);
      await page.close();
    }
  }
});
