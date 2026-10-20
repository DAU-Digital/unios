import assert from "node:assert/strict";
import { test } from "node:test";
import { notInSource } from "./testing/corpus";
import zh from "./zh";

test("zh strings come from the teacher's file", () => {
  assert.deepEqual(notInSource(zh, "vi-zh"), []);
});

test("zh pinned values", () => {
  assert.equal(zh.meta.title, "AI原生大学建设方案 | 岘港建筑大学");
  assert.equal(zh.hero.eyebrow, "2026—2031年战略建设方案");
  assert.deepEqual(zh.hero.title, ["以人为本的", "AI原生大学"]);
  assert.equal(zh.hero.model, "AI原生能力本位5T大学（AI-native Competency-Based 5T University）");
  assert.deepEqual(zh.motto, { label: "办学宗旨", text: "求真务实—真才实学—开创未来" });
  assert.deepEqual(
    [zh.nav.overview, zh.nav.philosophy, zh.nav.model, zh.nav.copilots, zh.nav.roadmap, zh.nav.benchmark],
    ["总览", "5T哲学", "模式", "Copilot协同助手", "路线图", "对标"],
  );
  assert.deepEqual(
    zh.model.layers.map((l) => l.name),
    [
      "以人为本的5T",
      "OBE/VQF",
      "AI原生能力本位教育（CBE）生态系统",
      "OBE/CBE核心",
      "能力图谱",
      "第二大脑与治理",
      "AI基础设施效能",
      "AI智能体编排",
      "世界模型、证据与质量智能分析",
    ],
  );
  assert.deepEqual(
    zh.copilots.items.map((c) => c.name),
    ["AI学习导师（AI Tutor）", "教师协同助手（Faculty Copilot）", "科研协同助手（Research Copilot）", "管理协同助手（Admin Copilot）"],
  );
  assert.equal(zh.targets.title, "截至2030年的建议指标");
  assert.equal(zh.brand.project, "AI原生大学");
});
