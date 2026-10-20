import assert from "node:assert/strict";
import { test } from "node:test";
import ja from "./ja";
import { notInSource } from "./testing/corpus";

test("ja strings come from the teacher's file", () => {
  assert.deepEqual(notInSource(ja, "vi-ja"), []);
});

test("ja pinned values", () => {
  assert.equal(ja.meta.title, "AIネイティブ大学構想 | ダナン建築大学");
  assert.equal(ja.hero.eyebrow, "2026～2031年の戦略構想");
  assert.deepEqual(ja.hero.title, ["人間中心の", "AIネイティブ大学"]);
  assert.equal(ja.hero.model, "AIネイティブ・コンピテンシー基盤型5T大学");
  assert.deepEqual(ja.motto, { label: "基本指針", text: "実質を重んじ、確かな実力を育み、未来を創る" });
  assert.deepEqual(
    [ja.nav.overview, ja.nav.philosophy, ja.nav.model, ja.nav.copilots, ja.nav.roadmap, ja.nav.benchmark],
    ["概要", "5Tの理念", "モデル", "Copilot", "ロードマップ", "ベンチマーキング"],
  );
  assert.deepEqual(
    ja.model.layers.map((l) => l.name),
    [
      "人間中心の5T",
      "OBE/VQF",
      "AIネイティブなCBEエコシステム",
      "OBE/CBEコア",
      "コンピテンシー・マップ",
      "セカンドブレインとガバナンス",
      "AI基盤の効率性",
      "AIエージェントのオーケストレーション",
      "世界モデルとエビデンスと質保証インテリジェンス",
    ],
  );
  assert.deepEqual(
    ja.copilots.items.map((c) => c.name),
    ["AIチューター（AI Tutor）", "教員支援Copilot（Faculty Copilot）", "研究支援Copilot（Research Copilot）", "大学運営支援Copilot（Admin Copilot）"],
  );
  assert.deepEqual(ja.philosophy.tiers[0].items[0], { name: "静穏", en: "Tranquility" });
  assert.equal(ja.targets.title, "2030年に向けた目標案");
  assert.equal(ja.brand.project, "AIネイティブ大学");
});
