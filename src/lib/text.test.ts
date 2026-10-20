import assert from "node:assert/strict";
import { test } from "node:test";
import { withTail } from "./text";

test("withTail splits off the last word, keeping glued words whole", () => {
  assert.deepEqual(withTail("theo bản đồ năng lực"), ["theo bản đồ ", "năng lực"]);
  assert.deepEqual(withTail("Gia sư AI"), ["Gia sư ", "AI"]);
});

test("withTail takes the last two characters of unspaced text", () => {
  assert.deepEqual(withTail("管理协同助手"), ["管理协同", "助手"]);
  assert.deepEqual(withTail("AI"), ["", "AI"]);
});
