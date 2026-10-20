import assert from "node:assert/strict";
import { test } from "node:test";
import en from "./en";
import ja from "./ja";
import type { Dict } from "./types";
import vi from "./vi";
import zh from "./zh";

const dicts: Record<string, Dict> = { vi, en, ja, zh };

// The structure with every string replaced, so locales can be compared.
function shape(value: unknown): unknown {
  if (typeof value === "string") return "s";
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    return Object.fromEntries(Object.keys(o).sort().map((k) => [k, shape(o[k])]));
  }
  return value;
}

test("every locale has the same shape", () => {
  const strip = (d: Dict) => {
    const copy = structuredClone(d);
    delete copy.why.note;
    return shape(copy);
  };
  for (const [locale, d] of Object.entries(dicts)) assert.deepEqual(strip(d), strip(vi), locale);
});

test("sections are numbered 01–11 in deck order", () => {
  const order = ["why", "overview", "philosophy", "model", "copilots", "maturity", "roadmap", "pillars", "studio", "benchmark", "principles"] as const;
  for (const [locale, d] of Object.entries(dicts)) {
    order.forEach((key, i) => {
      const m = d[key].label.match(/^(\d{2}) — \S/);
      assert.ok(m, `${locale} ${key}: ${d[key].label}`);
      assert.equal(m[1], String(i + 1).padStart(2, "0"), `${locale} ${key}`);
    });
  }
});

test("vi why copy matches the spec", () => {
  assert.equal(vi.why.title, "Vì sao DAU cần đề án AI-native");
  assert.equal(vi.why.table.rows.length, 5);
  assert.equal(vi.why.table.rows[0].problem, "Dữ liệu đào tạo, khảo thí, LMS, portfolio và kiểm định còn phân tán");
  assert.equal(vi.why.paths[1].tag, "Lựa chọn của DAU");
  assert.deepEqual(
    vi.why.drivers.map((d) => d.title),
    ["Công nghệ tái cấu trúc giáo dục", "Thị trường cần năng lực thật", "Tự chủ và trách nhiệm giải trình", "Từ quy mô sang năng lực"],
  );
});

test("why codes are the same everywhere", () => {
  for (const [locale, d] of Object.entries(dicts)) {
    assert.deepEqual(
      d.why.table.rows.map((r) => r.codes),
      [["5D", "5F"], ["5H"], ["5I"], ["5I"], ["5E"]],
      locale,
    );
  }
});

test("strong text sits inside its result", () => {
  for (const [locale, d] of Object.entries(dicts)) {
    for (const p of d.why.paths) assert.ok(p.result.includes(p.strong), `${locale}: ${p.strong}`);
  }
});

test("only translations carry the review note", () => {
  assert.equal(vi.why.note, undefined);
  for (const d of [en, ja, zh]) assert.ok(d.why.note && d.why.note.length > 0);
});

test("overview has no drivers", () => {
  for (const [locale, d] of Object.entries(dicts)) assert.equal("drivers" in d.overview, false, locale);
});
