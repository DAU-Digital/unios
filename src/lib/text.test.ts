import assert from "node:assert/strict";
import { test } from "node:test";
import { shortName, splitAlias, withColon, withTail, wrapLabel } from "./text";

test("withTail splits off the last word, keeping glued words whole", () => {
  assert.deepEqual(withTail("theo bản đồ năng lực"), ["theo bản đồ ", "năng lực"]);
  assert.deepEqual(withTail("Gia sư AI"), ["Gia sư ", "AI"]);
});

test("withTail takes the last two characters of unspaced text", () => {
  assert.deepEqual(withTail("管理协同助手"), ["管理协同", "助手"]);
  assert.deepEqual(withTail("AI"), ["", "AI"]);
});

test("shortName drops a trailing parenthetical", () => {
  assert.equal(shortName("AIチューター（AI Tutor）"), "AIチューター");
  assert.equal(shortName("教师协同助手（Faculty Copilot）"), "教师协同助手");
  assert.equal(shortName("Gia sư AI"), "Gia sư AI");
});

test("wrapLabel breaks only at plain spaces", () => {
  assert.deepEqual(wrapLabel("Copilot dành cho giảng viên", 16), ["Copilot dành cho", "giảng viên"]);
  assert.deepEqual(wrapLabel("AI Tutor", 16), ["AI Tutor"]);
  assert.deepEqual(wrapLabel("大学運営支援Copilot", 16), ["大学運営支援Copilot"]);
});

test("withTail splits chinese at its last word break", () => {
  assert.deepEqual(withTail("依据​能力​图谱"), ["依据​能力​", "图谱"]);
});

test("splitAlias separates a name from its parenthesised english", () => {
  assert.deepEqual(splitAlias("教员支援Copilot（Faculty Copilot）"), ["教员支援Copilot", "Faculty Copilot"]);
  assert.deepEqual(splitAlias("Gia sư AI"), ["Gia sư AI", null]);
});

test("withColon uses a full-width colon after japanese and chinese labels", () => {
  assert.equal(withColon("対象"), "対象：");
  assert.equal(withColon("服务对象"), "服务对象：");
  assert.equal(withColon("Đối tượng"), "Đối tượng: ");
  assert.equal(withColon("For"), "For: ");
});
