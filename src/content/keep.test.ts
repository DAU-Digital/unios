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
  "trưởng thành AI-native",
  "Tầm vóc châu Á và thế giới",
  "chỉ là",
  "đào tạo theo chuẩn đầu ra",
  "bảo đảm chất lượng",
  "đào tạo theo năng lực",
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
  for (const name of [
    "Visual Communication",
    "Project Finance",
    "Urban Design",
    "Sustainable Construction",
    "Digital Product",
    "Proven Capability",
    "Shaping the Future",
    "and engineering",
    "Data Maturity Index",
    "Evidence Validation Index",
    "demonstrated competence",
  ]) {
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

test("english never breaks inside a hyphenated word", () => {
  assert.ok(fix("outcome-based education", "en").includes("outcome-⁠based"));
  assert.ok(fix("a university-wide digital twin", "en").includes("university-⁠wide"));
});

test("japanese lets a long compound break after its middle dot", () => {
  // Glued, "グリーン・トランスフォーメーション、" is wider than a card and splits mid-word.
  assert.ok(fix("グリーン・トランスフォーメーション", "ja").includes("・​ト"));
  assert.ok(fix("BIM、コンストラクション・マネジメント", "ja").includes("・​マ"));
});

test("japanese keeps a short compound joined at its middle dot", () => {
  assert.ok(fix("データ・AIガバナンス", "ja").includes("・⁠A"));
  assert.ok(fix("教育・学修・運営", "ja").includes("教育・⁠学修・⁠運営"));
});

test("japanese never splits a word its phrase breaker cuts", () => {
  // Chrome's auto-phrase breaks "関する方 / 針を策定する".
  assert.ok(fix("データおよびAIに関する方針を策定する。", "ja").includes("方⁠針"));
});

test("place names stay whole in every language", () => {
  const out = fix("越南岘港市Hòa Cường坊Núi Thành路566号", "zh");
  assert.ok(out.includes("Hòa\u00a0Cường"), out);
  assert.ok(out.includes("Núi\u00a0Thành"), out);
});

// Words Intl.Segmenter splits ("课|件", "常|态|化"), found in the screenshot review.
const ZH_WORDS = [
  "课件",
  "而非",
  "常态化",
  "微证书",
  "跨学科",
  "工作室制",
  "可证明",
  "下一",
  "量规",
  "图谱",
  "孪生体",
  "试点",
  "智能体",
  "每类",
  "基础设施",
  "合作伙伴",
  "人在回路",
  "质量保障",
  "学习管理系统",
  "国家资格框架",
  "评价量规",
  "协同助手",
  "学习成果",
  "不在于",
  "不提前",
  "尚不构成",
];

const strings = (value: unknown): string[] =>
  typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];

test("chinese keeps the words its segmenter splits whole", () => {
  const copy = strings(getDict("zh"));
  for (const word of ZH_WORDS) {
    const hits = copy.filter((s) => s.replaceAll("​", "").includes(word));
    assert.ok(hits.length > 0, `${word} is not in the copy`);
    for (const s of hits) {
      assert.equal(s.split(word).length, s.replaceAll("​", "").split(word).length, `${word} split in: ${s}`);
    }
  }
});
