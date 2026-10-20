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
