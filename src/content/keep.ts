import type { Dict, Locale } from "./types";

// Vietnamese words are written as space-separated syllables, so the browser
// happily breaks "đề / xuất" or "Đà / Nẵng" across lines. Phrases listed here
// are glued with no-break spaces. Longer phrases must come before shorter ones
// they contain.

const NBSP = " ";
// Word joiner: forbids a line break after the hyphen in "AI-native".
const WJ = "⁠";

const shared = [
  "AI-native Competency-Based 5T University",
  "Second Brain",
  "Knowledge Graph",
  "Digital Twin University",
  "Digital Twin",
  "Living Portfolio",
  "Learning Analytics",
  "AI Tutor",
  "Faculty Copilot",
  "Research Copilot",
  "Admin Copilot",
  "OBE/CBE Core",
  "Competency Map",
  "World Models",
  "Data/AI Governance",
  "Agentic AI",
  "human-in-the-loop",
  "Human-in-command",
  "Build–Buy–Partner",
  "Design × Domain",
];

const english = [
  "Danang Architecture University",
  "Da Nang",
  "Nui Thanh",
  "Hoa Cuong Ward",
  "University Council",
  "Sustainable Construction",
  "Visual Communication",
  "Digital Product",
  "Project Finance",
  "Urban Design",
];

const vietnamese = [
  // Names and places
  "Trường Đại học Kiến trúc Đà Nẵng",
  "Đại học Kiến trúc Đà Nẵng",
  "TP. Đà Nẵng",
  "566 Núi Thành",
  "phường Hoà Cường",
  "Đà Nẵng",
  "Việt Nam",
  "châu Á",
  "Hội đồng trường",
  "Ban Chỉ đạo",
  "Khung trình độ quốc gia",
  "Chiến lược phát triển",
  // Names of layers and Copilots (the teacher's Vietnamese, 20/10/2026)
  "Điều phối tác nhân AI",
  "Hiệu quả hạ tầng AI",
  "Hồ sơ năng lực sống",
  "Mô hình thế giới",
  "Bộ não thứ hai",
  "Lõi OBE/CBE",
  "Gia sư AI",
  // Terms split in the screenshot review (npm run shots)
  "Thiết kế × Lĩnh vực chuyên môn",
  "Chỉ số trưởng thành dữ liệu",
  "Chỉ số xác thực minh chứng",
  "con người trong vòng lặp",
  "chương trình đào tạo",
  "một nền tảng chung",
  "hạ tầng trí tuệ",
  "bản đồ năng lực",
  "một hệ sinh thái",
  "phá dữ liệu nền",
  "ra quyết định",
  "dữ liệu – AI",
  "nâng mức trưởng thành",
  "triết lý định hướng",
  "nhật ký kiểm toán",
  "quản trị dữ liệu",
  "với AI dẫn dắt",
  // Multi-syllable terms
  "đô thị thông minh",
  "chuỗi giá trị",
  "bản sao số",
  "cá nhân hóa",
  "cơ sở vật chất",
  "chuẩn đầu ra",
  "hệ sinh thái",
  "tái cấu trúc",
  "tự động hóa",
  "kinh tế số",
  "chuyển đổi xanh",
  "dữ liệu lớn",
  "đổi mới sáng tạo",
  "khoa học công nghệ",
  "hợp tác quốc tế",
  "trách nhiệm giải trình",
  "năng lực thực chứng",
  "học tập suốt đời",
  "Bản thử nghiệm",
  // Compounds (matched case-insensitively)
  ...`hiện thực hóa|phần mềm quản lý|nhà nghiên cứu|về đầu trang|đa tác nhân|đề án|dự án|đề xuất|cam kết|chiến lược|đại học|giáo dục|dữ liệu|năng lực|thực chứng|chất lượng|giảng viên|sinh viên|người học|con người|trung tâm|học thuật|đào tạo|chương trình|kiểm định|minh chứng|đánh giá|quản trị|quản lý|phần mềm|vận hành|quyết định|thiết kế|tích hợp|trí tuệ|hạ tầng|bản sắc|giá trị|triết lý|phương thức|tiềm năng|đối sánh|liên ngành|thử nghiệm|thí điểm|mở rộng|cải tiến|lộ trình|giai đoạn|trưởng thành|học phần|tài chính|nhân sự|học vụ|đội ngũ|cộng đồng|hợp tác|quốc tế|truyền thông|bồi dưỡng|học liệu|tiến sĩ|học vị|cơ hữu|khóa mới|ý tưởng|sáng tạo|không gian|công năng|quy hoạch|cảnh quan|công nghệ|kỹ thuật|vật liệu|cấu tạo|kiến trúc|lan tỏa|thể hiện|bảo vệ|nhất quán|cơ chế|truy vết|thiếu hụt|công nhận|chính thức|linh hoạt|hồ sơ|nhận định|vượt trội|kết quả|kết luận|nguyên tắc|tri thức|xác thực|công bố|triển khai|bằng chứng|tóm lược|phát triển|tầm nhìn|tầm vóc|tôn chỉ|chuyển đổi|tự chủ|trách nhiệm|minh bạch|thị trường|sản phẩm|bảng điểm|quy mô|xây dựng|nền tảng|trọng điểm|mục tiêu|điều kiện|căn cứ|hoạt động|trọng tâm|điều phối|quy trình|giám sát|học tập|toàn trường|tối ưu|chính sách|chỉ số|chỉ tiêu|luyện tập|phản hồi|chuyên môn|nghiên cứu|tổng quan|tài liệu|báo cáo|theo dõi|đồng hành|bản đồ|tác nhân|phân quyền|kiểm soát|kiểm toán|vòng lặp|chi phí|mô hình|mô tả|xương sống|hành vi|quan sát|thành thạo|trí nhớ|thể chế|thành lập|ban hành|cấp độ|thực hiện|tư tưởng|tư duy|kiến tạo|tương lai|dấu ấn|chỉ dấu|học hiệu|đặc trưng|thực tiễn|toàn diện|tương tác|tiên phong|thực học|thực hành|thực nghề|thực chiến|thực sáng tạo|tĩnh tại|tuệ giác|thông biến|trường tồn|thực chất|thực tài|bề mặt|chủ thể|cuối cùng|thống nhất|rời rạc|tiền lệ|thế giới|tên gọi|địa phương|đầu tư|đối tác|nguồn lực|đa dạng|ứng dụng|ổn định|dẫn dắt|số hóa|tiêu chí|tiêu chuẩn|lợi thế|đường đi|bên trong|cá nhân|kháng AI|khai báo|xuyên suốt|lồng vào|chứng minh|thay đổi|định hướng|riêng biệt|đo lường|công cụ|đơn lẻ|giới hạn|rõ ràng|gợi ý|hỗ trợ|dự báo|tiếp theo|từng bước|tin cậy|khởi động|ngày đầu|nhật ký|thành phần|đơn vị|rà soát|hoàn thành|trụ cột|phục vụ|kết nối|ưu tiên|đồ án|bản địa|thực thi|sứ mạng|dài hạn|thước đo|sở hữu|hệ thống|khoa học|thay thế|đầu tiên|yếu tố|dành cho|nội dung|hướng tới|cơ sở|chuẩn chung|AI hóa|studio hóa|sạch trước|tách thành|đi sau|ngược lại|tốt hơn|nhớ đúng|đo thật|bắt đầu|làm thật|vì vậy|chưa phải|không phải|không chỉ|trong khi|vì sao|ốc đảo|tác vụ|bài giảng|phòng ban|cách làm|ma trận|thủ công|hành động|truy xuất|thụ động|đúng lúc|khảo thí|phân tán|phản ánh|đầy đủ|quá trình|đóng vòng|sẵn sàng|liên tục|con đường|lựa chọn|bền vững|thị giác|lĩnh vực|nâng mức|hoàn thiện`.split("|"),
].filter((p) => p.includes(" "));

function compile(phrases: string[]) {
  // Only match whole words (no letter right before or after), in any case.
  // Longest first, so a phrase is glued before the shorter words inside it.
  return [...new Set(phrases)]
    .sort((a, b) => b.length - a.length)
    .map(
    (p) => new RegExp(`(?<!\\p{L})${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?!\\p{L})`, "giu"),
  );
}

const glue = (match: string) => match.replaceAll(" ", NBSP).replace(/[-–]/g, `$&${WJ}`);

const rules: Record<Locale, RegExp[]> = {
  vi: compile([...shared, ...vietnamese]),
  en: compile([...shared, ...english]),
  ja: compile(shared),
  zh: compile(shared),
};

export function fix(text: string, locale: Locale): string {
  let out = text;
  for (const re of rules[locale]) out = out.replace(re, glue);
  return (
    out
      // An acronym stays with its hyphenated word ("AI-native", "CBE-integrated").
      .replace(/\b([A-Z]{2,})-(?!\u2060)/g, `$1-${WJ}`)
      // A year range never breaks at its dash ("2027–2030", "2026～2031年").
      .replace(/(\d)([–—～])(?=\d)/g, `$1$2${WJ}`)
      // A spaced dash ends a line, never starts one.
      .replace(/ ([–—]) /g, `${NBSP}$1 `)
  );
}

function walk<T>(value: T, locale: Locale): T {
  if (typeof value === "string") return fix(value, locale) as T;
  if (Array.isArray(value)) return value.map((v) => walk(v, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, walk(v, locale)])) as T;
  }
  return value;
}

export function keepTogether(dict: Dict, locale: Locale): Dict {
  // Metadata goes into <title>/<meta>, where no-break spaces only get in the way.
  return { ...walk(dict, locale), meta: dict.meta };
}
