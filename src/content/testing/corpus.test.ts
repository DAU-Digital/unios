import assert from "node:assert/strict";
import { test } from "node:test";
import { corpus, leaves, norm } from "./corpus";

test("corpus holds the teacher's English motto", () =>
  assert.ok(corpus("vi-en").includes(norm("Substance – Proven Capability – Shaping the Future"))));

test("norm drops glue and table pipes", () =>
  assert.equal(norm("| Nền tảng  |  AI-⁠native |"), "Nền tảng AI-native"));

test("leaves lists strings with dotted paths", () =>
  assert.deepEqual(leaves({ a: { b: ["x", "y"] }, c: "z" }), [
    ["a.b.0", "x"],
    ["a.b.1", "y"],
    ["c", "z"],
  ]));
