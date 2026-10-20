# Kế hoạch thực hiện: sửa site theo góp ý ngày 20/10/2026

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm trang Vì sao, làm gọn Tổng quan, thêm chú thích 9 lớp ở hình đầu trang, thêm chế độ xem dạng sách, và đưa chữ cả 4 thứ tiếng về đúng bản dịch của thầy, không lỗi xuống dòng.

**Architecture:**
- **Chữ:** vẫn nằm trong các Dict `src/content/*.ts`. Thêm phần `why`, bỏ `overview.drivers`. Một bộ test so từng chuỗi với bản chữ thường của 3 file của thầy, lưu trong repo ở `docs/translation-source/`.
- **Hero:** thành client component, có chú thích chạy theo vòng sáng.
- **Sách:** mỗi trang sách là một server component (`BookPage`), truyền vào client component `Book`. `Book` lo lật trang CSS 3D, phím bấm và toàn màn hình. Nút trên thanh đầu trang mở sách bằng sự kiện `dau:book`.

**Tech Stack:**
- Next.js 16.4 (`output: "export"`), React 19, Tailwind 4, TypeScript.
- Test đơn vị: `node:test` + `tsx`.
- Test trình duyệt và ảnh chụp: `puppeteer-core` + Chrome trên máy. Gói này đã có sẵn, không thêm dependency.

**Spec:** `docs/superpowers/specs/2026-10-20-council-feedback-design.md`. Gọi tắt là "spec"; số mục như §4.4 trỏ vào spec.

## Global Constraints

- Đọc tài liệu trong `node_modules/next/dist/docs/` trước khi viết code. `AGENTS.md` cảnh báo: "This is NOT the Next.js you know".
- Site là static export, không có server. Mọi tương tác chạy ở client.
- Mọi chữ hiển thị nằm trong `src/content/{vi,en,ja,zh}.ts` và đi qua `getDict()` (rồi `keepTogether`). Component không chứa chữ viết cứng, trừ mã ("5A", "TC1"), số trang và ký hiệu.
- Không thêm dependency. Hiệu ứng lật trang dùng CSS 3D.
- Sách không thêm câu chữ nào ngoài Dict. Được bỏ dòng phụ và dàn lại bố cục (§4.4).
- Xuống dòng: không tách đôi từ tiếng Việt, không ngắt sau "AI-", ô mã lớp luôn dính với chữ đứng trước (§4.6).
- Chữ trong sách đo ở cửa sổ 1280×720: chữ ≥ 16px, tiêu đề phần ≥ 32px. Riêng dòng tiêu đề chạy, số trang và ô mã được nhỏ hơn.
- Thiết bị trình chiếu: màn 16:9, Chrome, bút gửi PageUp/PageDown. Ba cỡ kiểm tra: 1280×720, 1440×900, 1920×1080.
- Tôn trọng `prefers-reduced-motion`.
- Nguồn chữ: `docs/translation-source/2026-10-20/{vi-en,vi-ja,vi-zh}.txt`. Chuỗi nào không có trong nguồn thì ghi vào `docs/translation-review/2026-10-20-new-strings.md`.
- Không commit `.superpowers/` và `.shots/`. Không deploy.
- Làm trên nhánh `feat/council-feedback`.

## Review Focus

1. **Bấm nhanh liên tục** (giữ phím →, bấm đúp): sách dừng đúng lần mở và trang trên cùng đúng thứ tự. Test: Task 9 `rapid flips keep page order`.
2. **Đổi độ phân giải khi đang mở sách** (cắm máy chiếu giữa chừng): sách co giãn lại vừa màn hình. Test: Task 9 `book refits after a resize`.
3. **Focus đang ở nút trong sách** mà bấm Enter/Space, hoặc phím "màn hình đen" (`.`, `b`) của bút: không lật hai lần, không lật nhầm. Test: Task 9 `button keys do not double-act`.
4. **Tên lớp dài tiếng Nhật, Trung trong chú thích hero** trên điện thoại 375px: không tràn ngang. Test: Task 8 `caption fits a phone`.
5. **Trình duyệt từ chối toàn màn hình:** sách vẫn phủ kín cửa sổ và dùng được. Test: Task 9 `works without fullscreen`.

---

### Task 1: Công cụ test và bản chữ nguồn

**Files:**
- Modify: `package.json` (scripts), `.gitignore`
- Create: `docs/translation-source/2026-10-20/vi-en.txt`, `vi-ja.txt`, `vi-zh.txt`, `README.md`
- Create: `src/content/testing/corpus.ts`
- Test: `src/content/testing/corpus.test.ts`

**Interfaces:**
- Produces:
  - `corpus(file: "vi-en" | "vi-ja" | "vi-zh"): string`: nội dung file đã chuẩn hóa.
  - `norm(s: string): string`
  - `leaves(value: unknown, path?: string): [path: string, text: string][]`: đường dẫn dạng `model.layers.3.name`.

- [ ] **Step 1:** `git switch -c feat/council-feedback`
- [ ] **Step 2:** Thêm `.superpowers/` và `.shots/` vào `.gitignore`.
- [ ] **Step 3:** Tạo bản chữ nguồn:

```bash
mkdir -p docs/translation-source/2026-10-20
for p in Anh:vi-en Nhat:vi-ja Trung:vi-zh; do
  pandoc "/Users/lehuuphu/Downloads/UNIOS-DOCS/feedback/DAU_AI_native_Website_Song_ngu_Viet_${p%%:*}_2026-10-20.docx" \
    -t plain --wrap=none -o "docs/translation-source/2026-10-20/${p##*:}.txt"
done
```

  `README.md` ghi ba điều: nguồn là 3 file .docx của thầy ngày 20/10/2026; lệnh tạo ở trên; mục "Ghi chú thuật ngữ" cuối mỗi file là quy tắc dịch, không phải nội dung site.
- [ ] **Step 4:** Viết test (sẽ hỏng) `src/content/testing/corpus.test.ts`:

```ts
test("corpus holds the teacher's English motto", () =>
  assert.ok(corpus("vi-en").includes(norm("Substance – Proven Capability – Shaping the Future"))));
test("norm drops glue and table pipes", () =>
  assert.equal(norm("| Nền tảng  |  AI-⁠native |"), "Nền tảng AI-native"));
test("leaves lists strings with dotted paths", () =>
  assert.deepEqual(leaves({ a: { b: ["x", "y"] }, c: "z" }), [["a.b.0", "x"], ["a.b.1", "y"], ["c", "z"]]));
```

- [ ] **Step 5:** Thêm script `"test": "node --import tsx --test \"src/**/*.test.ts\""`. Chạy `npm test`. Kết quả mong đợi: FAIL (không tìm thấy module `./corpus`).
- [ ] **Step 6:** Viết `src/content/testing/corpus.ts`.
  - `norm`: xóa U+2060, đổi U+00A0 và `|` thành dấu cách, gộp khoảng trắng, trim.
  - `corpus`: đọc `docs/translation-source/2026-10-20/<file>.txt` (tính từ `process.cwd()`), rồi `norm`.
- [ ] **Step 7:** `npm test`. Mong đợi: PASS 3 test.
- [ ] **Step 8:** Commit:

```bash
git add .gitignore package.json AGENTS.md docs src/content/testing
git commit -m "Add unit test runner and the teacher's translation sources"
```

### Task 2: Mô hình chữ mới, trang Vì sao, Tổng quan gọn

**Files:**
- Modify: `src/content/types.ts`, `vi.ts`, `en.ts`, `ja.ts`, `zh.ts`, `src/app/[locale]/page.tsx`, `src/components/Header.tsx`, `package.json`
- Create: `src/lib/text.ts`, `scripts/e2e/server.mts`, `scripts/e2e/browser.mts`, `docs/translation-review/2026-10-20-new-strings.md`
- Test: `src/content/dict.test.ts`, `src/lib/text.test.ts`, `scripts/e2e/why.test.mts`

**Interfaces:**
- Consumes: `leaves` (Task 1).
- Produces (types.ts):

```ts
export type WhyPath = { tag: string; title: string; text: string; result: string; strong: string }; // strong ⊂ result
export type WhyRow = { problem: string; effect: string; answer: string; codes: string[] };
// Dict["nav"]      += why: string; book: string
// Dict["overview"] -= drivers
// Dict["why"]       = { label; title; lead; note?: string; drivers: Item[]; paths: [WhyPath, WhyPath];
//                       table: { head: [string, string, string]; rows: WhyRow[] } }
// Dict["translationNote"] bị xóa
```

- Produces: `withTail(text: string): [head: string, tail: string]` trong `src/lib/text.ts`.
- Produces: `sectionIds = ["why", "overview", "philosophy", "model", "copilots", "roadmap", "benchmark"] as const` (Header.tsx; Footer dùng lại) và slide `id="why"`.
- Produces (e2e):
  - `serve(dir: string): Promise<{ url: string; close(): Promise<void> }>`: phục vụ `out/` như `trailingSlash`.
  - `launch(): Promise<Browser>`: dùng `CHROME_PATH`, mặc định Chrome trong `/Applications`.
  - `openPage(browser, url, viewport = { width: 1440, height: 900 }): Promise<Page>`: đặt `localStorage["dau-access"] = "1"` trước khi tải, rồi chờ `networkidle0` và `document.fonts.ready`.
- Produces (DOM): `#why [data-track] > .panel` (3 trang con), `[data-why-note]` (chỉ hiện khi có `t.why.note`).

**Chữ đã chốt:**

| Khóa | vi | en | ja | zh |
|---|---|---|---|---|
| `nav.why` | Vì sao | Why | なぜ必要か | 为何需要 |
| `nav.book` | Xem dạng sách | Book view | ブック表示 | 书本视图 |
| `why.title` | (spec §4.3) | Why DAU needs the AI-native initiative | DAUにAIネイティブ構想が必要な理由 | DAU为何需要AI原生大学建设方案 |
| `why.note` | (không có) | The translation of this section is awaiting review. | このセクションの翻訳は確認中です。 | 本部分译文尚待审校。 |

- **Phần `why` tiếng Việt:** chép nguyên văn spec §4.3, gồm nhãn, tiêu đề, lời dẫn, hai con đường (tag, title, text, result, strong), tiêu đề bảng và 5 hàng kèm mã. `why.drivers` là `vi.overview.drivers` hiện tại, chuyển sang nguyên vẹn.
- **Phần `why` tiếng Anh, Nhật, Trung còn lại:** dịch từ bản Việt, bám mục "Ghi chú thuật ngữ" và bảng viết tắt cuối file nguồn của từng thứ tiếng. Tên lớp và tên Copilot dùng đúng như file đó. `why.drivers` lấy `overview.drivers` hiện có; Task 4–6 sẽ thay bằng bản của thầy.
- **Nhãn phần, đánh số lại.** Tiếng Việt chốt đúng như sau:
  - why `01 — Vì sao`
  - overview `02 — Tổng quan`
  - philosophy `03 — Bản sắc`
  - model `04 — Mô hình`
  - copilots `05 — Copilot`
  - maturity `06 — Trưởng thành`
  - roadmap `07 — Lộ trình`
  - pillars `08 — Trụ cột`
  - studio `09 — Thí điểm`
  - benchmark `10 — Đối sánh`
  - principles `11 — Nguyên tắc`

  Ba thứ tiếng kia dùng cùng số, giữ tên hiện có; Task 4–6 đổi sang tên trong file.

- [ ] **Step 1:** Viết test (sẽ hỏng) `src/content/dict.test.ts`:
  - `every locale has the same shape`: so `shape(d)` của từng thứ tiếng với vi, sau khi bỏ `why.note`. `shape` đổi chuỗi thành `"s"`, giữ cấu trúc mảng, sắp khóa của object.
  - `sections are numbered 01–11 in deck order`: nhãn theo thứ tự [why, overview, philosophy, model, copilots, maturity, roadmap, pillars, studio, benchmark, principles] khớp `/^(\d{2}) — \S/`, số chạy từ `01` đến `11`.
  - `vi why copy matches the spec`:
    - `vi.why.title === "Vì sao DAU cần đề án AI-native"`
    - `rows.length === 5`
    - `rows[0].problem === "Dữ liệu đào tạo, khảo thí, LMS, portfolio và kiểm định còn phân tán"`
    - `paths[1].tag === "Lựa chọn của DAU"`
    - `drivers.map(d => d.title)` deepEqual `["Công nghệ tái cấu trúc giáo dục", "Thị trường cần năng lực thật", "Tự chủ và trách nhiệm giải trình", "Từ quy mô sang năng lực"]`
  - `why codes are the same everywhere`: mọi thứ tiếng, `rows.map(r => r.codes)` deepEqual `[["5D","5F"],["5H"],["5I"],["5I"],["5E"]]`.
  - `strong text sits inside its result`: mọi thứ tiếng, cả hai con đường.
  - `only translations carry the review note`: `vi.why.note === undefined`; en, ja, zh có chuỗi khác rỗng.
  - `overview has no drivers`: mọi thứ tiếng.
- [ ] **Step 2:** Viết test (sẽ hỏng) `src/lib/text.test.ts`:

```ts
assert.deepEqual(withTail("theo bản đồ năng lực"), ["theo bản đồ ", "năng lực"]);
assert.deepEqual(withTail("Gia sư AI"), ["Gia sư ", "AI"]);
assert.deepEqual(withTail("管理协同助手"), ["管理协同", "助手"]);
assert.deepEqual(withTail("AI"), ["", "AI"]);
```

  Quy tắc: tách sau dấu cách thường (U+0020) cuối cùng. Nếu không có U+0020 thì phần đuôi là 2 ký tự cuối, hoặc cả chuỗi khi chuỗi ≤ 2 ký tự.
- [ ] **Step 3:** `npm test`. Mong đợi: FAIL.
- [ ] **Step 4:** Sửa `types.ts` và 4 file Dict theo bảng trên. Xóa `translationNote` ở ja và zh. Viết `withTail`.
- [ ] **Step 5:** `npm test`. Mong đợi: PASS.
- [ ] **Step 6:** Sửa `page.tsx`:
  - **Hero:** bỏ khối `translationNote`.
  - **Overview:** chỉ còn một trang con là lưới 4 mốc.
  - **`Why` mới:** một `Section` với `id="why"`. `SectionHead` nhận thêm prop `note`, hiện dưới lời dẫn thành `<p data-why-note>`, kiểu giống ghi chú dịch cũ. Ba trang con:
    1. Lưới 4 động lực, chuyển từ Overview sang.
    2. Hai `<article>` trong `lg:grid-cols-2`. Khối đầu nền `bg-paper-deep`, khối sau `bg-ink text-white`. Mỗi khối có tag, title (`d3`), text, rồi result. Phần `strong` trong result bọc `<strong>`, màu `text-brand`; trên nền tối dùng `text-[#ff6b72]`.
    3. Bảng lưới 3 cột: hàng đầu là `table.head` (chữ nhỏ, `text-ink-soft`), sau đó 5 hàng. Ô thứ ba render `head`, rồi `<span className="whitespace-nowrap">{tail}{các ô mã}</span>`, với `[head, tail] = withTail(answer)`. Ô mã là nhãn nhỏ có viền màu brand, như mockup `overview-why.html`.
  - **Thứ tự trong `Page`:** Hero, Motto, Why, Overview, Philosophy…
- [ ] **Step 7:** `Header.tsx`: đổi `sectionIds` như ở Interfaces.
- [ ] **Step 8:** Viết helper e2e và `scripts/e2e/why.test.mts`. Các test chạy trên `out/` có sẵn, không tự build. So chữ sau khi chuẩn hóa khoảng trắng (`\s` → ` `).
  - `why has three panels`: `/vi/` cỡ 1440×900, `#why [data-track] > .panel` có 3.
  - `overview has a single screen`: `#overview [data-track] > .panel` có 1.
  - `header menu starts with why`: link đầu tiên trong `header nav` là "Vì sao".
  - `review note only outside Vietnamese`: `/vi/` không có `[data-why-note]`; `/en/` có một, đúng chữ `en.why.note`.

  Thêm script `"test:e2e": "node --import tsx --test --test-concurrency=1 \"scripts/e2e/*.test.mts\""`.
- [ ] **Step 9:** `npm run build && npm run test:e2e`. Mong đợi: PASS 4 test.
- [ ] **Step 10:** Tạo `docs/translation-review/2026-10-20-new-strings.md`. Đầu file có một đoạn giải thích: các chuỗi dưới đây không có trong file của thầy, cần thầy duyệt. Sau đó là bảng `khóa | vi | en | ja | zh`, gồm `nav.why`, `nav.book`, mọi khóa `why.*` trừ `why.drivers`, và `why.note`. Các task sau ghi thêm vào bảng này.
- [ ] **Step 11:** Commit: `git commit -am "Add the Why section and slim the Overview"` (nhớ `git add` cho các file mới).

### Task 3: Tiếng Việt theo bản của thầy

**Files:**
- Modify: `src/content/vi.ts`, `src/content/testing/corpus.ts` (thêm `NEW_STRING_PATHS`)
- Test: `src/content/vi.test.ts`

**Interfaces:**
- Consumes: `corpus`, `norm`, `leaves` (Task 1).
- Produces: `NEW_STRING_PATHS: RegExp[]` trong `src/content/testing/corpus.ts`, dùng chung cho Task 4–6:

```ts
[/^meta\.description$/, /^gate\.error$/, /^nav\.(menu|close|why|book)$/,
 /^why\.(label|title|lead|note|paths|table)/, /^[a-z]+\.label$/]
```

Quy tắc tách chữ từ file vào Dict: spec §4.5, gồm giữ dạng `NN — Tên`, câu "Tên. Nội dung", tách `hero.title`, nhãn khi file gộp làm một.

**Giá trị chốt:**
- `hero.model` "Đại học AI-native dựa trên năng lực theo mô hình 5T"
- `brand.project` "Đại học AI-native"
- `hero.stats[].label` ["Lớp thiết kế tích hợp", "Copilot lõi", "Cấp độ trưởng thành", "Mục tiêu AI-native"]
- `model.layers[].name` ["5T lấy con người làm trung tâm", "OBE/VQF", "Hệ sinh thái CBE AI-native", "Lõi OBE/CBE", "Bản đồ năng lực", "Bộ não thứ hai và quản trị", "Hiệu quả hạ tầng AI", "Điều phối tác nhân AI", "Mô hình thế giới, minh chứng và trí tuệ chất lượng"]
- `copilots.items[].name` ["Gia sư AI", "Copilot dành cho giảng viên", "Copilot hỗ trợ nghiên cứu", "Copilot hỗ trợ quản trị"]
- `copilots.quote` ["Second Brain giúp DAU nhớ đúng.", "World Models giúp DAU dự báo tốt hơn.", "Con người quyết định."]
- `roadmap.phases[].name` ["Khởi động", "Sẵn sàng cho AI và CBE", "Tích hợp AI và CBE", "DAU đào tạo theo năng lực với AI dẫn dắt", "Hoàn thiện lõi AI-native", "Mở rộng và nâng mức trưởng thành AI-native"]
- `pillars.items[].title` ["Đào tạo", "Khoa học công nghệ – AI", "Cộng đồng", "Hợp tác quốc tế và truyền thông", "Đội ngũ", "Tài chính và cơ sở vật chất", "Chất lượng và IQA"]
- `pillars.crossTitle` "Ưu tiên liên ngành Thiết kế × Lĩnh vực chuyên môn"
- `pillars.cross` ["Đô thị thông minh, thiết kế đô thị và bản sao số", "Kiến trúc xanh và xây dựng bền vững", "BIM, quản lý xây dựng và tài chính dự án", "UX/UI, sản phẩm số và truyền thông thị giác"]
- `studio.standards` ["Ý tưởng và sáng tạo", "Bản sắc và bản địa", "Không gian và công năng", "Quy hoạch và cảnh quan", "Công nghệ kỹ thuật", "Vật liệu và cấu tạo", "Kiến trúc xanh", "Lan tỏa cộng đồng", "Thể hiện và bảo vệ"]
- `targets` { label "Chỉ tiêu", title "Chỉ tiêu đề xuất đến năm 2030" }
- `principles` { label "11 — Nguyên tắc", title "Nguyên tắc vận hành" }
- `footer.top` "Về đầu trang"

- [ ] **Step 1:** Viết test (sẽ hỏng) `src/content/vi.test.ts`:
  - `vi strings come from the teacher's file`: với mỗi `[path, s]` trong `leaves(vi)` có `s.length >= 12` và `path` không khớp `NEW_STRING_PATHS`, khẳng định `corpus("vi-en").includes(norm(s))`. Khi hỏng, in ra `path`.
  - `vi pinned values`: một `assert.deepEqual` cho mỗi giá trị chốt ở trên.
- [ ] **Step 2:** `npm test`. Mong đợi: FAIL, có danh sách đường dẫn lệch.
- [ ] **Step 3:** Sửa `vi.ts`: đi lần lượt cột tiếng Việt của `vi-en.txt`, chép từng chuỗi vào trường tương ứng.
- [ ] **Step 4:** `npm test && npm run build`. Mong đợi: PASS và build sạch.
- [ ] **Step 5:** Commit: `git commit -am "Bring the Vietnamese copy in line with the teacher's file"`

### Task 4: Tiếng Anh theo bản của thầy

**Files:**
- Modify: `src/content/en.ts`, `docs/translation-review/2026-10-20-new-strings.md`
- Test: `src/content/en.test.ts`

**Interfaces:**
- Consumes: `corpus`, `norm`, `leaves`, `NEW_STRING_PATHS`.

**Giá trị chốt:**
- `meta.title` "AI-native University Initiative | Danang Architecture University"
- `hero.eyebrow` "Strategic Initiative 2026–2031"
- `hero.title` ["A human-centered", "AI-native university"]
- `hero.model` "AI-native Competency-Based 5T University"
- `hero.cta` "Explore the initiative"
- `motto` { label "Guiding motto", text "Substance – Proven Capability – Shaping the Future" }
- `nav` { overview "Overview", philosophy "5T Philosophy", model "The Model", copilots "Copilots", roadmap "Roadmap", benchmark "Benchmarking" }
- `model.layers[].name` ["Human-centered 5T", "OBE/VQF", "AI-native CBE Ecosystem", "OBE/CBE Core", "Competency Map", "Second Brain and Governance", "AI Infrastructure Efficiency", "Agentic Orchestration", "World Models, Evidence, and Quality Intelligence"]
- `copilots.items[].name` ["AI Tutor", "Faculty Copilot", "Research Copilot", "Admin Copilot"]
- `targets` { label "Targets", title "Proposed targets for 2030" }
- `principles` { label "11 — Principles", title "Operating principles" }
- `principles.items[0].title` "People make the decisions"
- `gate` { title "Welcome", submit "Enter", note "Your access code is included in your invitation." }
- `deck` { prev "Previous", next "Next", hint "↑ ↓ Navigate sections · ← → View details" }
- `footer.top` "Back to top"
- `brand.project` "AI-native University"

- [ ] **Step 1:** Viết test (sẽ hỏng) `src/content/en.test.ts`:
  - `en strings come from the teacher's file`: như Task 3, dùng `corpus("vi-en")`.
  - `en pinned values`: kiểm các giá trị chốt ở trên.
  - `en avoids terms the glossary rules out`: `JSON.stringify(en)` không khớp `/tenured|living accreditation|evidenced competence|centred|programme|labour|realis(e|ing)/i`.
- [ ] **Step 2:** `npm test`. Mong đợi: FAIL.
- [ ] **Step 3:** Sửa `en.ts` theo `vi-en.txt` (cột tiếng Anh) và quy tắc spec §4.5. Các chuỗi không có nguồn (`meta.description`, `gate.error`, `nav.menu`, `nav.close`): sửa cho khớp thuật ngữ, ví dụ "initiative" thay cho "project". Ghi thêm vào `new-strings.md`.
- [ ] **Step 4:** `npm test && npm run build`. Mong đợi: PASS.
- [ ] **Step 5:** Commit: `git commit -am "Bring the English copy in line with the teacher's file"`

### Task 5: Tiếng Nhật theo bản của thầy

**Files:**
- Modify: `src/content/ja.ts`, `docs/translation-review/2026-10-20-new-strings.md`
- Test: `src/content/ja.test.ts`

**Interfaces:**
- Consumes: như Task 4.

**Giá trị chốt:**
- `meta.title` "AIネイティブ大学構想 | ダナン建築大学"
- `hero.eyebrow` "2026～2031年の戦略構想"
- `hero.title` ["人間中心の", "AIネイティブ大学"]
- `hero.model` "AIネイティブ・コンピテンシー基盤型5T大学"
- `motto` { label "基本指針", text "実質を重んじ、確かな実力を育み、未来を創る" }
- `nav` { overview "概要", philosophy "5Tの理念", model "モデル", copilots "Copilot", roadmap "ロードマップ", benchmark "ベンチマーキング" }
- `model.layers[].name` ["人間中心の5T", "OBE/VQF", "AIネイティブなCBEエコシステム", "OBE/CBEコア", "コンピテンシー・マップ", "セカンドブレインとガバナンス", "AI基盤の効率性", "AIエージェントのオーケストレーション", "世界モデルとエビデンスと質保証インテリジェンス"]
- `copilots.items[].name` ["AIチューター（AI Tutor）", "教員支援Copilot（Faculty Copilot）", "研究支援Copilot（Research Copilot）", "大学運営支援Copilot（Admin Copilot）"]
- `philosophy.tiers[0].items[0]` { name "静穏", en "Tranquility" }. File ghi "静穏（Tranquility）"; các mục T khác tách theo cùng cách.
- `targets.title` "2030年に向けた目標案"
- `brand.project` "AIネイティブ大学"

- [ ] **Step 1:** Viết test `src/content/ja.test.ts`: kiểm chuỗi có trong `corpus("vi-ja")` và các giá trị chốt. Mong đợi: FAIL.
- [ ] **Step 2:** Sửa `ja.ts` theo `vi-ja.txt`. Văn phong thể である theo file. Ghi thêm chuỗi không có nguồn vào `new-strings.md`.
- [ ] **Step 3:** `npm test && npm run build`. Mong đợi: PASS.
- [ ] **Step 4:** Commit: `git commit -am "Bring the Japanese copy in line with the teacher's file"`

### Task 6: Tiếng Trung theo bản của thầy

**Files:**
- Modify: `src/content/zh.ts`, `docs/translation-review/2026-10-20-new-strings.md`
- Test: `src/content/zh.test.ts`

**Interfaces:**
- Consumes: như Task 4.

**Giá trị chốt:**
- `meta.title` "AI原生大学建设方案 | 岘港建筑大学"
- `hero.eyebrow` "2026—2031年战略建设方案"
- `hero.title` ["以人为本的", "AI原生大学"]
- `hero.model` "AI原生能力本位5T大学（AI-native Competency-Based 5T University）"
- `motto` { label "办学宗旨", text "求真务实—真才实学—开创未来" }
- `nav` { overview "总览", philosophy "5T哲学", model "模式", copilots "Copilot协同助手", roadmap "路线图", benchmark "对标" }
- `model.layers[].name` ["以人为本的5T", "OBE/VQF", "AI原生能力本位教育（CBE）生态系统", "OBE/CBE核心", "能力图谱", "第二大脑与治理", "AI基础设施效能", "AI智能体编排", "世界模型、证据与质量智能分析"]
- `copilots.items[].name` ["AI学习导师（AI Tutor）", "教师协同助手（Faculty Copilot）", "科研协同助手（Research Copilot）", "管理协同助手（Admin Copilot）"]
- `targets.title` "截至2030年的建议指标"
- `brand.project` "AI原生大学"

- [ ] **Step 1:** Viết test `src/content/zh.test.ts`: kiểm chuỗi có trong `corpus("vi-zh")` và các giá trị chốt. Mong đợi: FAIL.
- [ ] **Step 2:** Sửa `zh.ts` theo `vi-zh.txt`. Ghi thêm chuỗi không có nguồn vào `new-strings.md`.
- [ ] **Step 3:** `npm test && npm run build`. Mong đợi: PASS.
- [ ] **Step 4:** Commit: `git commit -am "Bring the Chinese copy in line with the teacher's file"`

### Task 7: Giữ từ tiếng Việt mới đi liền nhau

**Files:**
- Modify: `src/content/keep.ts`
- Test: `src/content/keep.test.ts`

**Interfaces:**
- Consumes: `fix(text, locale)` và `getDict` (đã có).

- [ ] **Step 1:** Viết test (sẽ hỏng) `src/content/keep.test.ts`, với `MUST_GLUE` là danh sách cố định sau:

```ts
const MUST_GLUE = ["vì sao", "ốc đảo", "dữ liệu", "cá nhân hóa", "chuỗi giá trị", "tác vụ", "bài giảng", "phòng ban",
  "phần mềm", "cách làm", "ma trận", "thủ công", "xương sống", "hành động", "thống nhất", "truy xuất", "thụ động",
  "đúng lúc", "khảo thí", "phân tán", "bề mặt", "thay thế", "phản ánh", "đầy đủ", "quá trình", "sản phẩm",
  "đóng vòng", "vòng lặp", "sẵn sàng", "liên tục", "con đường", "lựa chọn", "bản sao số", "đô thị thông minh",
  "bền vững", "thị giác", "lĩnh vực", "chuyên môn", "nâng mức", "hoàn thiện", "Gia sư AI", "Bộ não thứ hai",
  "Lõi OBE/CBE", "Hồ sơ năng lực sống", "Mô hình thế giới", "Điều phối tác nhân AI", "Hiệu quả hạ tầng AI"];
```

  - `each new word is glued`: với mỗi `c`, `fix(c, "vi").replace(/⁠/g, "") === c.replaceAll(" ", " ")`.
  - `no new word is left breakable in the Vietnamese page`: `JSON.stringify(getDict("vi"))` không chứa `c` (không phân biệt hoa thường) mà còn dấu cách thường.
  - `AI- never breaks`: `fix("AI-assisted và AI-native", "vi")` chứa `"AI-⁠assisted"` và `"AI-⁠native"`.
- [ ] **Step 2:** `npm test`. Mong đợi: FAIL.
- [ ] **Step 3:** Thêm các cụm còn thiếu vào danh sách `vietnamese` trong `keep.ts`. Cụm dài đặt trước cụm ngắn nằm trong nó, như ghi chú đầu file.
- [ ] **Step 4:** `npm test && npm run build`. Mong đợi: PASS.
- [ ] **Step 5:** Commit: `git commit -am "Keep the new Vietnamese words together"`
- [ ] **Step 6:** Điểm dừng: báo người dùng `docs/translation-review/2026-10-20-new-strings.md` đã đủ phần chữ, để gửi thầy duyệt song song (spec §4.5).

### Task 8: Hình đầu trang kiểu C

**Files:**
- Modify: `src/components/HeroVisual.tsx` (thành client component), `src/app/[locale]/page.tsx` (`Hero`), `src/app/globals.css`, `src/lib/text.ts`
- Test: `src/lib/text.test.ts`, `scripts/e2e/hero.test.mts`

**Interfaces:**
- Produces:
  - `shortName(name: string): string`: bỏ một cụm ngoặc ở cuối, dạng `（…）` hoặc `(…)`, kèm dấu cách bao quanh.
  - `wrapLabel(text: string, max: number): string[]`: chia tham lam, chỉ tại U+0020. Chuỗi không có U+0020 thì không chia.
  - `HeroVisual(props: { layers: { code: string; name: string; text: string }[]; copilots: string[]; label: string; className?: string })`, có `"use client"`, hằng `STEP_MS = 2800`. `Hero` truyền `layers = t.model.layers`, `copilots = t.copilots.items.map(c => shortName(c.name))`, `label = t.hero.model`.
- Produces (DOM):
  - `[data-hero-caption]` có thuộc tính `data-lit="<index>"`.
  - Ô lớp `[data-layer="<index>"]`, có `tabIndex={0}` và `aria-label={`${code} ${name}`}`.

**Cách chạy (spec §4.1):**
- Cứ `STEP_MS` thì đổi lớp. Vòng sáng theo `lit` bằng class, thay cho keyframes `hv-layer`.
- `pointerenter` hoặc `focus` vào ô thì chọn lớp đó và dừng. `pointerleave` hoặc `blur` thì chạy tiếp từ lớp đó.
- Khi giảm chuyển động thì không chạy.
- **Chú thích:** xếp chồng cả 9 chú thích vào cùng một ô lưới (`[grid-area:1/1]`). Chỉ chú thích đang chọn hiện; các chú thích khác `invisible` và `aria-hidden`. Nhờ vậy chiều cao bằng chú thích dài nhất của ngôn ngữ đó, không nhảy bố cục. Mỗi chú thích gồm mã viết lớn màu brand, tên (`d4`) và mô tả (`text-ink-soft`).
- **Nhãn Copilot:** dùng `wrapLabel(label, 16)`, mỗi dòng một `<tspan>`. Nhãn phía trên mọc dần lên trên.
- Chỉnh khung hero để vẫn gói trong màn hình đầu.

- [ ] **Step 1:** Thêm test (sẽ hỏng) vào `text.test.ts`:

```ts
assert.equal(shortName("AIチューター（AI Tutor）"), "AIチューター");
assert.equal(shortName("教师协同助手（Faculty Copilot）"), "教师协同助手");
assert.equal(shortName("Gia sư AI"), "Gia sư AI");
assert.deepEqual(wrapLabel("Copilot dành cho giảng viên", 16), ["Copilot dành cho", "giảng viên"]);
assert.deepEqual(wrapLabel("AI Tutor", 16), ["AI Tutor"]);
assert.deepEqual(wrapLabel("大学運営支援Copilot", 16), ["大学運営支援Copilot"]);
```

- [ ] **Step 2:** Viết `scripts/e2e/hero.test.mts` (sẽ hỏng):
  - `caption follows the ring`: `/vi/` cỡ 1440×900. `data-lit` bằng `"0"`; sau 3200ms bằng `"1"`. Chú thích đang hiện chứa tên lớp 1 của `vi`.
  - `hover pins a layer`: hover `[data-layer="4"]` thì `data-lit` bằng `"4"`; chờ 3200ms vẫn `"4"`. Đưa chuột ra (5,5), chờ 3200ms thì thành `"5"`.
  - `no layout shift`: lần lượt `page.focus('[data-layer="i"]')` với i = 0..8. Chiều cao `#top` và `[data-hero-caption]` không đổi.
  - `reduced motion holds still`: giả lập `prefers-reduced-motion: reduce`, chờ 3500ms, vẫn `"0"`.
  - `hero fits the first screen`: ở 1280×720 và 1440×900, với vi và ja, đáy `#top dl` ≤ `innerHeight`.
  - `caption fits a phone`: ja và zh ở 375×812, focus `[data-layer="8"]`, `document.documentElement.scrollWidth <= 375`.
  - `copilot labels follow the locale`: chữ trong svg ở `/vi/` có "Gia sư AI"; ở `/ja/` có "AIチューター" và không có "（AI Tutor）".
- [ ] **Step 3:** `npm test`. Mong đợi: FAIL. Chạy `npm run build && npm run test:e2e`. Mong đợi: các test hero FAIL.
- [ ] **Step 4:** Viết `shortName`, `wrapLabel` và `HeroVisual` mới, sửa `Hero`, thêm CSS chú thích và trạng thái vòng sáng.
- [ ] **Step 5:** `npm test && npm run build && npm run test:e2e`. Mong đợi: PASS.
- [ ] **Step 6:** Commit: `git commit -am "Name the nine layers under the hero diagram"`

### Task 9: Chế độ sách

**Files:**
- Create: `src/components/book/plan.ts`, `src/components/book/BookPage.tsx` (server), `src/components/book/Book.tsx` (client), `src/components/book/BookButton.tsx` (client)
- Modify: `src/components/Deck.tsx`, `src/components/Header.tsx`, `src/app/[locale]/page.tsx`, `src/app/globals.css`
- Test: `src/components/book/plan.test.ts`, `scripts/e2e/book.test.mts`

**Interfaces:**

```ts
// plan.ts
export type SectionId = "top" | "motto" | "why" | "overview" | "philosophy" | "model" | "copilots" | "maturity"
  | "roadmap" | "targets" | "pillars" | "studio" | "benchmark" | "principles" | "closing";
export type PageKind = "diagram" | "cover" | "why-open" | "why-drivers" | "why-paths" | "why-table"
  | "overview-open" | "overview-facts" | "identity-open" | "tier-philosophy" | "tier-education" | "tier-values"
  | "model-open" | "model-layers" | "copilots-open" | "copilots-list" | "maturity-open" | "maturity-levels"
  | "roadmap-open" | "roadmap-phases" | "targets-open" | "targets-list" | "pillars-open" | "pillars-list"
  | "studio-open" | "studio-standards" | "benchmark-open" | "benchmark-advantages" | "principles-open"
  | "principles-list" | "closing-quote" | "back-cover";
export type Spread = { left: PageKind; right: PageKind; section: SectionId; also?: SectionId[] };
export const SPREADS: readonly Spread[];   // 16, theo bảng dưới
export const PAGES: readonly PageKind[];   // trải phẳng: [s0.left, s0.right, s1.left, …], 32
export function spreadOfSection(id: string): number;      // lần mở đầu tiên có section hoặc also chứa id; không có thì 0
export function sectionOfSpread(index: number): SectionId;
export type BookAction = "next" | "prev" | "first" | "last" | "close" | "block";
export function bookAction(key: string): BookAction | null;
// Deck.tsx
export function currentSlideId(): string;  // id của [data-slide] có mép trên ≤ 40% chiều cao màn hình (logic hiện có)
// BookPage.tsx (không có "use client")
export function BookPage(props: { kind: PageKind; t: Dict; number: number }): React.JSX.Element; // number 1..32; số lẻ = trang trái
// Book.tsx ("use client")
export function Book(props: { pages: React.ReactNode[]; title: string; closeLabel: string; prevLabel: string; nextLabel: string }): React.JSX.Element;
// BookButton.tsx ("use client"): <button data-book-open-button className="hidden lg:landscape:inline-flex …">,
// bấm thì window.dispatchEvent(new Event("dau:book"))
export function BookButton(props: { label: string }): React.JSX.Element;
```

**Các lần mở sách (`SPREADS`):**

| # | left | right | section |
|---|---|---|---|
| 0 | diagram | cover | top, also motto |
| 1 | why-open | why-drivers | why |
| 2 | why-paths | why-table | why |
| 3 | overview-open | overview-facts | overview |
| 4 | identity-open | tier-philosophy | philosophy |
| 5 | tier-education | tier-values | philosophy |
| 6 | model-open | model-layers | model |
| 7 | copilots-open | copilots-list | copilots |
| 8 | maturity-open | maturity-levels | maturity |
| 9 | roadmap-open | roadmap-phases | roadmap |
| 10 | targets-open | targets-list | targets |
| 11 | pillars-open | pillars-list | pillars |
| 12 | studio-open | studio-standards | studio |
| 13 | benchmark-open | benchmark-advantages | benchmark |
| 14 | principles-open | principles-list | principles |
| 15 | closing-quote | back-cover | closing |

**Nội dung từng loại trang** (chỉ dùng chuỗi Dict; được bỏ dòng ghi trong ngoặc khi bị tràn):

| Loại trang | Nội dung |
|---|---|
| `diagram` | `HeroVisual`, props giống Task 8 |
| `cover` | logo, `hero.eyebrow`, `hero.title` (2 dòng), `hero.model`, `motto.label` + `motto.text` |
| `*-open` | `label`, `title` và `lead` của phần đó. Thêm `why.note` nếu có. `model` thêm số lớn "9" với `hero.stats[0].label`; `copilots` thêm "4" với `stats[1].label` và `copilots.quote`; `maturity` thêm "5" với `stats[2].label`; `roadmap` thêm `principle`; `targets` thêm `note`; `studio` thêm `badge`, ảnh `/images/campus.webp` và `lead`; `benchmark` thêm 4 `stats` |
| `why-drivers` | 4 mục: số, title, (text) |
| `why-paths` | 2 khối: tag, title, (text), result có phần strong |
| `why-table` | 5 khối xếp dọc: problem, (effect), answer kèm ô mã (dùng `withTail`) |
| `overview-facts` | 4 mốc: value, title, (text) |
| `tier-*` | tên tầng, mô tả tầng, 5 mục T (T#, name, en). `tier-values` thêm `bridge` |
| `model-layers` | 9 hàng: code, name |
| `copilots-list` | 4 mục: name, `forLabel`: for, `guardLabel`: guard |
| `maturity-levels` | 5 cấp: số, name, (text), rồi `target` |
| `roadmap-phases` | 6 giai đoạn: when, name, (text), rồi (`note`) |
| `targets-list` | 5 chỉ tiêu: value, label |
| `pillars-list` | 7 trụ cột: title, (text), rồi `crossTitle` và `cross` |
| `studio-standards` | TC1–TC9 kèm tên |
| `benchmark-advantages` | `advantagesTitle`, 6 lợi thế, (`caveat`) |
| `principles-list` | 6 nguyên tắc: title, (text) |
| `closing-quote` | `closing.quote`, `closing.cite` |
| `back-cover` | logo, `footer.ownership`, `footer.address`, dau.edu.vn, `footer.source`, `footer.rights` |

Mọi trang có dòng tiêu đề chạy `.book-runhead`: trang trái là `t.brand.project`, trang phải là `t.brand.school`. Mọi trang có số trang `.book-num`.

**Hợp đồng DOM và CSS:**
- **Gốc:** `<div data-book data-spread={at} role="dialog" aria-modal="true" aria-label={title} hidden={!open}>`, đặt cạnh `#deck` chứ không nằm trong.
- **Sân khấu:** `.book-stage` kích thước ảo 1280×720, `transform: translate(-50%,-50%) scale(var(--book-scale))`. `--book-scale = min(innerWidth/1280, innerHeight/720)`, tính lại bằng ResizeObserver.
- **Cuốn sách:** `.book-sheet` 1160×652, đặt ở (60, 34), có `perspective`. Mỗi trang 580×652: `.book-page[data-kind][data-page]` bọc `.book-page-inner` (cố định kích thước, `overflow: hidden`).
- **Tờ giấy:** 15 tờ `.book-leaf[data-flipped]`. Tờ k mang trang 2k+1 ở mặt trước (bên phải) và 2k+2 ở mặt sau (bên trái). Trang 0 nằm cố định bên trái, trang 31 nằm cố định bên phải.
- **Nút:** `[data-book-close]`, `[data-book-prev]`, `[data-book-next]` (dùng `closeLabel`, `prevLabel`, `nextLabel`). Bộ đếm hiện "3–4 / 32".
- **Khi mở:** `<html data-book-open>` (CSS khóa cuộn trang) và `#deck[inert]`.
- **Chữ được nhỏ hơn ngưỡng:** `.book-runhead`, `.book-num`, `.book-chip`.

**Xếp lớp tờ giấy** (thuật toán, không suy ra được từ chữ ký hàm):

```ts
// mỗi lần at đổi từ `from`:
const LEAVES = 15;
const z = (k: number) => (k < at ? 10 + k + 1 : 10 + (LEAVES - k)); // tờ đã lật: tờ lật sau nằm trên
if (Math.abs(at - from) > 1) { /* Home/End: nhảy thẳng, tắt transition một khung hình */ }
else {
  const k = Math.min(from, at);                    // tờ đang lật
  leaf[k].style.zIndex = String(50 + (at > from ? k : LEAVES - k));
  setTimeout(() => (leaf[k].style.zIndex = String(z(k))), 1100); // hẹn giờ riêng cho từng tờ
}
```

**Hành vi:**
- **Mở** khi nhận sự kiện `dau:book`:
  - `at = spreadOfSection(currentSlideId())`.
  - Đặt `data-book-open` và `inert`.
  - Gọi `root.requestFullscreen()`, bỏ qua nếu bị từ chối.
  - Focus nút đóng.
- **Đóng:**
  - Thoát toàn màn hình nếu đang ở đó.
  - Gỡ hai thuộc tính.
  - `document.getElementById(sectionOfSpread(at))?.scrollIntoView({ behavior: "instant" })`.
  - Focus `[data-book-open-button]`.
  - Cũng đóng khi có `fullscreenchange` mà đã rời toàn màn hình sau khi từng vào.
- **Phím:** listener `keydown` trên `window` ở pha capture, chỉ khi sách đang mở. Bỏ qua khi có alt, ctrl hoặc meta. `bookAction`:
  - `ArrowRight` và `PageDown` → `next`
  - `ArrowLeft` và `PageUp` → `prev`
  - `Home` → `first`
  - `End` → `last`
  - `Escape` → `close`
  - `F5` → `block`

  Có action thì `preventDefault` và `stopPropagation`. Enter, Space, `.` và `b` không có action.
- **Bấm chuột:** bấm vào sân khấu ngoài các nút thì nửa phải là `next`, nửa trái là `prev`.
- **Deck:** dòng đầu của `onKey` thoát luôn nếu `<html>` có `data-book-open`.
- **Giảm chuyển động:** `transition: none` cho `.book-leaf`.

- [ ] **Step 1:** Viết test (sẽ hỏng) `src/components/book/plan.test.ts`:
  - `SPREADS.length === 16`, `PAGES.length === 32`.
  - `PAGES[0] === "diagram"`, `PAGES[1] === "cover"`, `PAGES[30] === "closing-quote"`, `PAGES[31] === "back-cover"`.
  - `spreadOfSection`: top 0, motto 0, why 1, overview 3, philosophy 4, model 6, copilots 7, maturity 8, roadmap 9, targets 10, pillars 11, studio 12, benchmark 13, principles 14, closing 15, "nope" 0.
  - `sectionOfSpread(2) === "why"`, `sectionOfSpread(5) === "philosophy"`.
  - `bookAction`: ArrowRight/PageDown → next; ArrowLeft/PageUp → prev; Home → first; End → last; Escape → close; F5 → block; " ", "Enter", ".", "b" → null.
- [ ] **Step 2:** `npm test`. Mong đợi: FAIL. Viết `plan.ts`. `npm test`. Mong đợi: PASS.
- [ ] **Step 3:** Viết `scripts/e2e/book.test.mts` (sẽ hỏng). Mặc định cỡ 1280×720, `/vi/`:
  - `opens from the header and flips with the clicker keys`: bấm `[data-book-open-button]` thì `[data-book]` hiện và `data-spread="0"`. Sau đó lần lượt: → cho 1; PageDown cho 2; PageUp cho 1; End cho 15; Home cho 0; Escape thì sách ẩn và `<html>` mất `data-book-open`.
  - `deck stays still while the book is open`: ghi `scrollY`, mở sách, bấm ArrowDown và PageDown, `scrollY` không đổi.
  - `opens at the section on screen and returns there`: cuộn `#roadmap` vào màn hình, mở sách thì `data-spread="9"`. Bấm End rồi Escape thì `#closing` có `top` trong khoảng ±5px.
  - `F5 does not reload while open`: phát `KeyboardEvent("keydown", { key: "F5", cancelable: true })` trên `window`, `defaultPrevented === true`.
  - `button shows only on wide landscape screens`: 900×700 thì nút ẩn; 1280×720 thì hiện.
  - `rapid flips keep page order`: bấm → 5 lần, mỗi lần cách 60ms, chờ 1400ms. `data-spread="5"`. `elementFromPoint` ở tâm trang trái thuộc `[data-page="11"]`, ở tâm trang phải thuộc `[data-page="12"]`.
  - `book refits after a resize`: mở ở 1440×900, đổi sang 1280×720. Khung `.book-sheet` nằm trọn trong cửa sổ.
  - `button keys do not double-act`: focus `[data-book-next]`, Enter tăng đúng 1; Space tăng đúng 1; `.` và `b` không đổi.
  - `works without fullscreen`: dùng `evaluateOnNewDocument` cho `Element.prototype.requestFullscreen` reject. Mở sách: `[data-book]` phủ kín cửa sổ, → vẫn lật.
  - `reduced motion turns pages without animation`: transition-duration của `.book-leaf` là `"0s"`.
  - `pages never overflow and stay readable`: với vi, en, ja, zh ở 1280×720, mở sách:
    - Mọi `.book-page-inner` có `scrollHeight ≤ clientHeight + 1` và `scrollWidth ≤ clientWidth + 1`. Báo ra `data-kind` của trang tràn.
    - Mọi phần tử có chữ (không nằm trong `svg`, `.book-runhead`, `.book-num`, `.book-chip`) có cỡ chữ ≥ 16px.
    - Tiêu đề phần `.book-title` ≥ 32px.
  - `header fits at 1024 and 1280`: với vi và ja, ở cả hai cỡ, `header > div` có `scrollWidth ≤ clientWidth`.
- [ ] **Step 4:** Viết `BookPage`, `Book`, `BookButton` và CSS sách trong `globals.css`. Sửa `Deck` (export `currentSlideId`, nhường phím khi sách mở). Đặt `BookButton` trong `Header` cạnh chỗ chọn ngôn ngữ. Trong `page.tsx`, render `<Book pages={PAGES.map((kind, i) => <BookPage key={kind} kind={kind} t={t} number={i + 1} />)} title={t.brand.project} closeLabel={t.nav.close} prevLabel={t.deck.prev} nextLabel={t.deck.next} />` ngay sau `#deck`.
- [ ] **Step 5:** `npm test && npm run build && npm run test:e2e`. Mong đợi: PASS. Trang nào báo tràn thì bỏ dòng phụ theo bảng nội dung hoặc chỉnh bố cục, rồi chạy lại.
- [ ] **Step 6:** Commit: `git commit -am "Add the book view"`

### Task 10: Trang 404, ảnh chia sẻ, danh sách duyệt

**Files:**
- Modify: `src/app/global-not-found.tsx`, `public/og/{vi,en,ja,zh}.png`, `docs/translation-review/2026-10-20-new-strings.md`

**Chữ chốt cho trang 404:**
- en: câu cuối của `text` thành "Head back to the AI-native University Initiative page."
- ja: câu cuối thành "AIネイティブ大学構想のページへお戻りください。"
- zh: câu cuối thành "请返回AI原生大学建设方案页面。"
- Dòng nhỏ dưới logo (đang viết cứng "AI-native University") lấy theo `brand.project` của từng thứ tiếng.

- [ ] **Step 1:** Sửa `global-not-found.tsx` như trên. Ghi các câu 404 vào `new-strings.md`.
- [ ] **Step 2:** `npm run og`. Mở xem `public/og/vi.png` và `public/og/en.png`: tiêu đề phải là bản mới, không tràn.
- [ ] **Step 3:** `npm run build`. Sau đó `grep -c "AI-native University Initiative" out/llms.txt` phải ≥ 1, và `grep "Second Brain and Governance" out/llms.txt` phải có kết quả.
- [ ] **Step 4:** Commit: `git commit -am "Align the 404 copy and regenerate share images"`

### Task 11: Chụp màn hình và soát xuống dòng

**Files:**
- Create: `scripts/shots.mts` (script `"shots": "tsx scripts/shots.mts"` trong `package.json`)
- Modify: tùy chỗ cần sửa (`keep.ts` cùng `MUST_GLUE` trong `keep.test.ts`, CSS, bố cục trang sách)

**Interfaces:**
- Consumes: `serve`, `launch`, `openPage` (Task 2).

**Phạm vi chụp:**
- Cỡ 1280×720: cả 4 thứ tiếng. Cỡ 1440×900 và 1920×1080: chỉ vi.
- **Web:** với mỗi `[data-slide]`, cuộn tới bằng `scrollIntoView({ behavior: "instant" })` và chờ 900ms cho hiệu ứng hiện xong. Chụp từng trang con. Lưu `.shots/<w>x<h>/<locale>/web-<NN>-<id>-<panel>.png`.
- **Sách:** mở sách, bấm Home, chụp 16 lần mở thành `.shots/<w>x<h>/<locale>/book-<NN>.png`, sau mỗi lần bấm →.

- [ ] **Step 1:** Viết `scripts/shots.mts` và chạy `npm run build && npm run shots`. Mong đợi: có ảnh trong `.shots/`, số ảnh in ra cuối.
- [ ] **Step 2:** Xem từng ảnh, ghi lỗi:
  - từ tiếng Việt bị tách đôi;
  - "AI-" bị ngắt;
  - ô mã rơi một mình xuống dòng;
  - một chữ mồ côi ở dòng cuối tiêu đề;
  - chữ tràn hoặc bị cắt;
  - tiếng Nhật, Trung ngắt giữa cụm.
- [ ] **Step 3:** Sửa từng lỗi:
  - Từ tiếng Việt: thêm cụm vào `keep.ts`, đồng thời thêm vào `MUST_GLUE` để khóa lại.
  - Chỗ khác: chỉnh CSS hoặc bố cục.
  - Chạy `npm test`. Mong đợi: PASS.
- [ ] **Step 4:** Lặp lại Step 1–3 tới khi không còn lỗi. Sau đó `npm test && npm run build && npm run test:e2e`. Mong đợi: PASS toàn bộ.
- [ ] **Step 5:** Commit: `git commit -am "Fix line breaks found in the screenshot review"`. Khi bàn giao, gửi kèm vài ảnh tiêu biểu: hero, Vì sao, một lần mở sách mỗi thứ tiếng.
