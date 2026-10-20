// Test helpers: the teacher's bilingual files as plain text (docs/translation-source),
// so tests can check that the page copy matches them word for word.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type SourceFile = "vi-en" | "vi-ja" | "vi-zh";

// Display copy carries no-break spaces and word joiners (see keep.ts) and the
// source files carry table borders; neither is part of the words.
export function norm(s: string): string {
  return s
    .replace(/⁠/g, "")
    .replace(/[ |]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function corpus(file: SourceFile): string {
  return norm(readFileSync(join(process.cwd(), "docs/translation-source/2026-10-20", `${file}.txt`), "utf8"));
}

// Every string inside a value, with its dotted path ("model.layers.3.name").
export function leaves(value: unknown, path = ""): [path: string, text: string][] {
  if (typeof value === "string") return [[path, value]];
  const at = (key: string | number) => (path ? `${path}.${key}` : String(key));
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, at(i)));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([k, v]) => leaves(v, at(k)));
  return [];
}
