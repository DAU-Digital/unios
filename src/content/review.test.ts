import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { getDict } from "./index";
import { corpus, leaves, norm, type SourceFile } from "./testing/corpus";
import type { Locale } from "./types";

// Interface labels are too short for notInSource; spec §4.5 still wants those the
// teacher's files lack (the menu, the book's buttons) in the review doc.
const LABELS = ["nav.menu", "nav.close", "nav.why", "nav.book", "deck.prev", "deck.next"];
const FILES: Record<Locale, SourceFile> = { vi: "vi-en", en: "vi-en", ja: "vi-ja", zh: "vi-zh" };

test("the review doc lists the interface labels the teacher's files lack", () => {
  const doc = readFileSync(join(process.cwd(), "docs/translation-review/2026-10-20-new-strings.md"), "utf8");
  for (const path of LABELS) {
    const missing = (Object.keys(FILES) as Locale[]).filter((l) => {
      const text = new Map(leaves(getDict(l))).get(path);
      return !text || !corpus(FILES[l]).includes(norm(text));
    });
    if (missing.length) assert.ok(doc.includes(`\`${path}\``), `${path} (${missing.join(", ")}) is not in the review doc`);
  }
});
