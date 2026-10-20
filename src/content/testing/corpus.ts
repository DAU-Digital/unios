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

// Copy that is not in the teacher's files: written for this round (see
// docs/translation-review) or reshaped from them (renumbered section labels).
export const NEW_STRING_PATHS: RegExp[] = [
  /^meta\.description$/,
  /^gate\.error$/,
  /^nav\.(menu|close|why|book)$/,
  /^why\.(label|title|lead|note|paths|table)/,
  /^[a-z]+\.label$/,
];

// Paths of a dict's strings (12+ characters, outside NEW_STRING_PATHS) that do
// not appear word for word in the given source file. A fragment lifted from
// mid-sentence may start with a capital ("For university administration." →
// "University administration").
export function notInSource(dict: unknown, file: SourceFile): string[] {
  const text = corpus(file);
  const found = (s: string) => text.includes(s) || text.includes(s.charAt(0).toLowerCase() + s.slice(1));
  return leaves(dict)
    .filter(([path, s]) => s.length >= 12 && !NEW_STRING_PATHS.some((re) => re.test(path)))
    .filter(([, s]) => !found(norm(s)))
    .map(([path]) => path);
}

// Every string inside a value, with its dotted path ("model.layers.3.name").
export function leaves(value: unknown, path = ""): [path: string, text: string][] {
  if (typeof value === "string") return [[path, value]];
  const at = (key: string | number) => (path ? `${path}.${key}` : String(key));
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, at(i)));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([k, v]) => leaves(v, at(k)));
  return [];
}
