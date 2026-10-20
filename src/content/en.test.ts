import assert from "node:assert/strict";
import { test } from "node:test";
import en from "./en";
import { notInSource } from "./testing/corpus";

test("en strings come from the teacher's file", () => {
  assert.deepEqual(notInSource(en, "vi-en"), []);
});

test("en pinned values", () => {
  assert.equal(en.meta.title, "AI-native University Initiative | Danang Architecture University");
  assert.equal(en.hero.eyebrow, "Strategic Initiative 2026–2031");
  assert.deepEqual(en.hero.title, ["A human-centered", "AI-native university"]);
  assert.equal(en.hero.model, "AI-native Competency-Based 5T University");
  assert.equal(en.hero.cta, "Explore the initiative");
  assert.deepEqual(en.motto, { label: "Guiding motto", text: "Substance – Proven Capability – Shaping the Future" });
  assert.deepEqual(
    [en.nav.overview, en.nav.philosophy, en.nav.model, en.nav.copilots, en.nav.roadmap, en.nav.benchmark],
    ["Overview", "5T Philosophy", "The Model", "Copilots", "Roadmap", "Benchmarking"],
  );
  assert.deepEqual(
    en.model.layers.map((l) => l.name),
    [
      "Human-centered 5T",
      "OBE/VQF",
      "AI-native CBE Ecosystem",
      "OBE/CBE Core",
      "Competency Map",
      "Second Brain and Governance",
      "AI Infrastructure Efficiency",
      "Agentic Orchestration",
      "World Models, Evidence, and Quality Intelligence",
    ],
  );
  assert.deepEqual(
    en.copilots.items.map((c) => c.name),
    ["AI Tutor", "Faculty Copilot", "Research Copilot", "Admin Copilot"],
  );
  assert.deepEqual([en.targets.label, en.targets.title], ["Targets", "Proposed targets for 2030"]);
  assert.deepEqual([en.principles.label, en.principles.title], ["11 — Principles", "Operating principles"]);
  assert.equal(en.principles.items[0].title, "People make the decisions");
  assert.deepEqual([en.gate.title, en.gate.submit, en.gate.note], ["Welcome", "Enter", "Your access code is included in your invitation."]);
  assert.deepEqual(en.deck, { prev: "Previous", next: "Next", hint: "↑ ↓ Navigate sections · ← → View details" });
  assert.equal(en.footer.top, "Back to top");
  assert.equal(en.brand.project, "AI-native University");
});

test("en avoids terms the glossary rules out", () => {
  assert.doesNotMatch(JSON.stringify(en), /tenured|living accreditation|evidenced competence|centred|programme|labour|realis(e|ing)/i);
});
