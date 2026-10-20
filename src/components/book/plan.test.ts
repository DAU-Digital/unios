import assert from "node:assert/strict";
import { test } from "node:test";
import { PAGES, SPREADS, bookAction, sectionOfSpread, spreadOfSection } from "./plan";

test("the book has 16 spreads and 32 pages", () => {
  assert.equal(SPREADS.length, 16);
  assert.equal(PAGES.length, 32);
});

test("it opens on the diagram and cover and ends on the back cover", () => {
  assert.equal(PAGES[0], "diagram");
  assert.equal(PAGES[1], "cover");
  assert.equal(PAGES[30], "closing-quote");
  assert.equal(PAGES[31], "back-cover");
});

test("each slide maps to the spread where its section opens", () => {
  const expected: Record<string, number> = {
    top: 0,
    motto: 0,
    why: 1,
    overview: 3,
    philosophy: 4,
    model: 6,
    copilots: 7,
    maturity: 8,
    roadmap: 9,
    targets: 10,
    pillars: 11,
    studio: 12,
    benchmark: 13,
    principles: 14,
    closing: 15,
    nope: 0,
  };
  for (const [id, spread] of Object.entries(expected)) assert.equal(spreadOfSection(id), spread, id);
});

test("continuation spreads belong to their section", () => {
  assert.equal(sectionOfSpread(2), "why");
  assert.equal(sectionOfSpread(5), "philosophy");
});

test("clicker and keyboard keys map to book actions", () => {
  assert.equal(bookAction("ArrowRight"), "next");
  assert.equal(bookAction("PageDown"), "next");
  assert.equal(bookAction("ArrowDown"), "next");
  assert.equal(bookAction("ArrowUp"), "prev");
  assert.equal(bookAction("ArrowLeft"), "prev");
  assert.equal(bookAction("PageUp"), "prev");
  assert.equal(bookAction("Home"), "first");
  assert.equal(bookAction("End"), "last");
  assert.equal(bookAction("Escape"), "close");
  assert.equal(bookAction("F5"), "block");
  for (const key of [" ", "Enter", ".", "b"]) assert.equal(bookAction(key), null, key);
});
