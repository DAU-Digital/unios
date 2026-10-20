import assert from "node:assert/strict";
import { test } from "node:test";
import { notInSource } from "./testing/corpus";
import vi from "./vi";

test("vi strings come from the teacher's file", () => {
  assert.deepEqual(notInSource(vi, "vi-en"), []);
});

test("vi pinned values", () => {
  assert.equal(vi.hero.model, "Đại học AI-native dựa trên năng lực theo mô hình 5T");
  assert.equal(vi.brand.project, "Đại học AI-native");
  assert.deepEqual(
    vi.hero.stats.map((s) => s.label),
    ["Lớp thiết kế tích hợp", "Copilot lõi", "Cấp độ trưởng thành", "Mục tiêu AI-native"],
  );
  assert.deepEqual(
    vi.model.layers.map((l) => l.name),
    [
      "5T lấy con người làm trung tâm",
      "OBE/VQF",
      "Hệ sinh thái CBE AI-native",
      "Lõi OBE/CBE",
      "Bản đồ năng lực",
      "Bộ não thứ hai và quản trị",
      "Hiệu quả hạ tầng AI",
      "Điều phối tác nhân AI",
      "Mô hình thế giới, minh chứng và trí tuệ chất lượng",
    ],
  );
  assert.deepEqual(
    vi.copilots.items.map((c) => c.name),
    ["Gia sư AI", "Copilot dành cho giảng viên", "Copilot hỗ trợ nghiên cứu", "Copilot hỗ trợ quản trị"],
  );
  assert.deepEqual(vi.copilots.quote, ["Second Brain giúp DAU nhớ đúng.", "World Models giúp DAU dự báo tốt hơn.", "Con người quyết định."]);
  assert.deepEqual(
    vi.roadmap.phases.map((p) => p.name),
    [
      "Khởi động",
      "Sẵn sàng cho AI và CBE",
      "Tích hợp AI và CBE",
      "DAU đào tạo theo năng lực với AI dẫn dắt",
      "Hoàn thiện lõi AI-native",
      "Mở rộng và nâng mức trưởng thành AI-native",
    ],
  );
  assert.deepEqual(
    vi.pillars.items.map((p) => p.title),
    ["Đào tạo", "Khoa học công nghệ – AI", "Cộng đồng", "Hợp tác quốc tế và truyền thông", "Đội ngũ", "Tài chính và cơ sở vật chất", "Chất lượng và IQA"],
  );
  assert.equal(vi.pillars.crossTitle, "Ưu tiên liên ngành Thiết kế × Lĩnh vực chuyên môn");
  assert.deepEqual(vi.pillars.cross, [
    "Đô thị thông minh, thiết kế đô thị và bản sao số",
    "Kiến trúc xanh và xây dựng bền vững",
    "BIM, quản lý xây dựng và tài chính dự án",
    "UX/UI, sản phẩm số và truyền thông thị giác",
  ]);
  assert.deepEqual(vi.studio.standards, [
    "Ý tưởng và sáng tạo",
    "Bản sắc và bản địa",
    "Không gian và công năng",
    "Quy hoạch và cảnh quan",
    "Công nghệ kỹ thuật",
    "Vật liệu và cấu tạo",
    "Kiến trúc xanh",
    "Lan tỏa cộng đồng",
    "Thể hiện và bảo vệ",
  ]);
  assert.deepEqual([vi.targets.label, vi.targets.title], ["Chỉ tiêu", "Chỉ tiêu đề xuất đến năm 2030"]);
  assert.deepEqual([vi.principles.label, vi.principles.title], ["11 — Nguyên tắc", "Nguyên tắc vận hành"]);
  assert.equal(vi.footer.top, "Về đầu trang");
});
