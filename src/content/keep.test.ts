import assert from "node:assert/strict";
import { test } from "node:test";
import { getDict } from "./index";
import { fix } from "./keep";

// Words from this round's Vietnamese copy (the Why section and the teacher's
// new names) that must never be split across lines.
const MUST_GLUE = [
  "vì sao",
  "ốc đảo",
  "dữ liệu",
  "cá nhân hóa",
  "chuỗi giá trị",
  "tác vụ",
  "bài giảng",
  "phòng ban",
  "phần mềm",
  "cách làm",
  "ma trận",
  "thủ công",
  "xương sống",
  "hành động",
  "thống nhất",
  "truy xuất",
  "thụ động",
  "đúng lúc",
  "khảo thí",
  "phân tán",
  "bề mặt",
  "thay thế",
  "phản ánh",
  "đầy đủ",
  "quá trình",
  "sản phẩm",
  "đóng vòng",
  "vòng lặp",
  "sẵn sàng",
  "liên tục",
  "con đường",
  "lựa chọn",
  "bản sao số",
  "đô thị thông minh",
  "bền vững",
  "thị giác",
  "lĩnh vực",
  "chuyên môn",
  "nâng mức",
  "hoàn thiện",
  "Gia sư AI",
  "Bộ não thứ hai",
  "Lõi OBE/CBE",
  "Hồ sơ năng lực sống",
  "Mô hình thế giới",
  "Điều phối tác nhân AI",
  "Hiệu quả hạ tầng AI",
  // Found in the screenshot review (npm run shots)
  "bản đồ năng lực",
  "vì vậy",
  "chưa phải",
  "không phải",
  "trong khi",
  "ra quyết định",
  "chương trình đào tạo",
  "con người trong vòng lặp",
  "hạ tầng trí tuệ",
  "một nền tảng chung",
  "một hệ sinh thái",
  "Chỉ số trưởng thành dữ liệu",
  "Chỉ số xác thực minh chứng",
  "Thiết kế × Lĩnh vực chuyên môn",
  "với AI dẫn dắt",
  "nâng mức trưởng thành",
  "nhật ký kiểm toán",
  "triết lý định hướng",
  "quản trị dữ liệu",
  "không chỉ",
  "thực sáng tạo",
  "phá dữ liệu nền",
];

const NBSP = " ";
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test("each new word is glued", () => {
  for (const word of MUST_GLUE) {
    assert.equal(fix(word, "vi").replace(/⁠/g, ""), word.replaceAll(" ", NBSP), word);
  }
});

test("no new word is left breakable in the Vietnamese page", () => {
  const page = JSON.stringify(getDict("vi"));
  for (const word of MUST_GLUE) {
    const breakable = new RegExp(`(?<!\\p{L})${escape(word).replaceAll(" ", " +")}(?!\\p{L})`, "iu");
    assert.doesNotMatch(page, breakable, word);
  }
});

test("AI- never breaks", () => {
  const out = fix("AI-assisted và AI-native", "vi");
  assert.ok(out.includes("AI-⁠assisted"));
  assert.ok(out.includes("AI-⁠native"));
});

test("a year range never breaks at its dash", () => {
  assert.ok(fix("khóa mới 2027–2030", "vi").includes("2027–⁠2030"));
});

test("a spaced dash stays with the word before it", () => {
  assert.equal(fix("Kiến trúc – Xây dựng", "vi").replace(/ /g, "_"), "Kiến_trúc_– Xây_dựng");
  assert.equal(fix("Substance – Proven", "en"), "Substance – Proven");
});

test("an acronym never breaks from its hyphenated word", () => {
  assert.ok(fix("AI-integrated and CBE-integrated", "en").includes("CBE-⁠integrated"));
});

test("english product and discipline names stay whole", () => {
  for (const name of ["Visual Communication", "Project Finance", "Urban Design", "Sustainable Construction", "Digital Product"]) {
    assert.equal(fix(name, "en"), name.replaceAll(" ", NBSP), name);
  }
});

test("chinese breaks only between words", () => {
  const out = fix("难以快速决策", "zh");
  assert.ok(out.includes("​"), "no break opportunity between words");
  assert.doesNotMatch(out, /决​策|快​速/);
});

test("chinese keeps a latin term joined to its han word", () => {
  assert.ok(!fix("AI原生大学", "zh").includes("AI​"));
});

test("japanese keeps katakana compounds joined at their middle dot", () => {
  assert.ok(fix("リビング・ポートフォリオ", "ja").includes("・⁠ポ"));
});

test("shared names glue inside japanese text", () => {
  assert.ok(fix("というBuild–Buy–Partnerモデル", "ja").includes("Build–⁠Buy–⁠Partner"));
});
