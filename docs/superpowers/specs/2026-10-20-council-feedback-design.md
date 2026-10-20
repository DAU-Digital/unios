# Thiết kế: sửa site Đề án AI-native theo góp ý ngày 20/10/2026

Trạng thái: chờ duyệt · Ngày: 20/10/2026 · Repo: `unios` (site `dau-unios.coregenaihub.com`)

## 1. Bối cảnh và mục đích

Site là trang trình bày Đề án AI-native University của Trường Đại học Kiến trúc Đà Nẵng (DAU). Site có 4 thứ tiếng (vi, en, ja, zh) và một màn hình nhập mã truy cập. Site được trình bày như một bộ slide cuộn dọc: mỗi phần là một màn hình, phần dài thì chia thành các trang con trượt ngang.

**Người dùng chính:** thầy trình chiếu trước Hội đồng trường trong phòng họp, qua máy chiếu hoặc màn hình lớn, điều khiển bằng bàn phím hoặc bút trình chiếu. Người dùng phụ là khách mời tự mở link xem.

**Góp ý cần xử lý (nguyên văn):**

1. Chỗ các 5A, 5B,… ở hình đầu trang nên show nó là cái gì (lấy bên slide 9 tầng).
2. Slide Overview quá nhiều text, cần sửa lại.
3. Cần một mục chọn chuyển sang dạng slide (kiểu lật trang sách để xem).
4. Nên có thêm trang giới thiệu vì sao phải có đề án AI-native.
5. Chuẩn hóa việc dịch các từ theo file thầy gửi.

Trong lúc trao đổi có thêm một yêu cầu xuyên suốt: **chú ý xuống dòng cho hợp lý.**

**Thế nào là thành công:** thầy trình chiếu trơn tru ở cả chế độ web lẫn chế độ sách. Người xem hiểu 5A–5I là gì. Slide Tổng quan nhẹ chữ. Có một phần trả lời "vì sao cần đề án". Chữ ở cả 4 thứ tiếng đúng theo bản của thầy. Không chỗ nào xuống dòng xấu.

## 2. Nguồn tài liệu

| Nguồn | Đường dẫn | Dùng cho |
|---|---|---|
| Bản song ngữ Việt–Anh của thầy | `/Users/lehuuphu/Downloads/UNIOS-DOCS/feedback/DAU_AI_native_Website_Song_ngu_Viet_Anh_2026-10-20.docx` | Chữ tiếng Việt và tiếng Anh, ghi chú thuật ngữ tiếng Anh |
| Bản song ngữ Việt–Nhật | `…/feedback/DAU_AI_native_Website_Song_ngu_Viet_Nhat_2026-10-20.docx` | Chữ tiếng Nhật, ghi chú thuật ngữ tiếng Nhật |
| Bản song ngữ Việt–Trung | `…/feedback/DAU_AI_native_Website_Song_ngu_Viet_Trung_2026-10-20.docx` | Chữ tiếng Trung, ghi chú thuật ngữ tiếng Trung |
| Executive Summary của đề án | `/Users/lehuuphu/Downloads/UNIOS-DOCS/tam-nhin-2050/1a. Chung - Executive Summary - DAU AI-native Competency-Based 5T University (V8.8 - 20.10.2026) .doc` (có dấu cách trước `.doc`) | Nguồn của trang Vì sao (mục 2 "Vấn đề chiến lược mà DAU cần giải quyết", bảng I.2). Chữ đã soạn sẵn ở mục 4.3, người làm không cần đọc lại. |
| Mockup đã duyệt | `.superpowers/brainstorm/74004-1792501461/content/` gồm `flip-style.html` (kiểu A), `book-map.html`, `hero-labels.html` (kiểu C), `overview-why.html` | Tham khảo bố cục và cảm giác. Đây không phải code để dùng lại. Thư mục này không được commit. |

Đổi file `.docx` sang chữ thường: `pandoc "<file>.docx" -t plain --wrap=none -o <file>.txt`. File `.doc` cũ đổi bằng `textutil -convert txt`.

Cấu trúc mỗi file của thầy: đi lần lượt từ đầu đến cuối site, câu tiếng Việt rồi đến câu dịch, có bảng cho các phần dạng lưới. Cuối file có mục "Ghi chú thuật ngữ dịch thuật" và "Danh mục từ viết tắt". Hai mục này là quy tắc dịch, **không** phải nội dung site.

## 3. Mục tiêu, không làm, điều cấm

**Mục tiêu**

- G1. Hình đầu trang cho biết 5A–5I là gì (kiểu C, mục 4.1).
- G2. Tổng quan còn một màn hình, ít chữ (mục 4.2).
- G3. Thêm trang Vì sao trước Tổng quan (mục 4.3).
- G4. Thêm chế độ xem dạng sách mở hai trang, lật qua gáy sách (kiểu A, mục 4.4).
- G5. Toàn bộ chữ trên site theo 3 file của thầy, kể cả tiếng Việt (mục 4.5).
- G6. Xuống dòng hợp lý ở mọi ngôn ngữ, cả trên web lẫn trong sách (mục 4.6).

**Không làm**

- Không đổi nội dung các phần khác, ngoài việc cập nhật chữ theo file của thầy và đánh số lại.
- Không làm chế độ sách cho điện thoại hay màn hình dọc.
- Không đưa ghi chú thuật ngữ hay bảng viết tắt của thầy lên site.
- Không đổi cơ chế cổng mã truy cập, cách đặt URL, cấu trúc SEO và JSON-LD (chỉ chữ bên trong thay theo Dict).
- Không thêm thư viện lật trang khi CSS 3D làm được. Đây là quyết định của mình, không phải của bạn.
- Không deploy. Làm xong toàn bộ thì bạn tự deploy. Không có hạn chót gấp, nên không cần bản phát hành tạm.

**Điều cấm** (vẫn coi là hỏng dù chạy được)

- Chữ trong sách nhỏ đến mức cuối phòng họp không đọc được, hoặc bị tràn, bị cắt.
- Sách viết thêm câu chữ không có trên web, làm phát sinh chữ chưa được duyệt.
- Từ tiếng Việt bị tách đôi khi xuống dòng ("chương / trình"), "AI-native" bị ngắt ở dấu gạch, mã lớp (5D…) rơi một mình xuống dòng.
- Dịch lệch bảng thuật ngữ của thầy, ví dụ dùng "tenured faculty", dùng "faculty" để chỉ Khoa, hay "living accreditation".
- Đang mở sách mà phím tắt của trang web (`Deck`) vẫn chạy song song, hoặc bút trình chiếu không lật được trang.
- Chú thích ở hình đầu trang làm bố cục nhảy (layout shift) mỗi lần đổi lớp.

## 4. Những gì đã chốt

### 4.1 Hình đầu trang: kiểu C, chú thích chạy theo

- Sơ đồ giữ bố cục hiện tại (`HeroVisual`): vòng ngoài 5A–5I, 4 Copilot, lõi 5T, các hiệu ứng.
- **Dưới sơ đồ là một dòng chú thích:** mã lớp viết lớn, tên lớp và mô tả ngắn của lớp đang sáng, lấy từ `model.layers[i].name` và `.text` theo ngôn ngữ. Chú thích đổi theo nhịp sáng của vòng ngoài. Nhịp phải đủ chậm để đọc, khoảng 2,6–3 giây mỗi lớp. Hiện tại là 1 giây mỗi lớp, nên vòng sáng phải chậm lại cho khớp.
- Rê chuột, chạm hoặc focus vào một ô thì hiện ngay lớp đó và tạm dừng vòng chạy. Rời ra thì chạy tiếp.
- Chiều cao chú thích cố định, đủ cho mô tả dài nhất ở cả 4 thứ tiếng, để bố cục không nhảy.
- Phần đầu trang vẫn phải gói trong màn hình đầu ở cỡ 1280×720 và 1440×900, kể cả khi thêm chú thích.
- Tên 4 Copilot trong sơ đồ đổi theo ngôn ngữ (hiện đang ghi cứng tiếng Anh). Lấy phần tên tiếng bản địa trong file của thầy, bỏ phần tiếng Anh trong ngoặc:
  - vi: Gia sư AI · Copilot dành cho giảng viên · Copilot hỗ trợ nghiên cứu · Copilot hỗ trợ quản trị
  - en: AI Tutor · Faculty Copilot · Research Copilot · Admin Copilot
  - ja: AIチューター · 教員支援Copilot · 研究支援Copilot · 大学運営支援Copilot
  - zh: AI学习导师 · 教师协同助手 · 科研协同助手 · 管理协同助手

  Tên dài thì cho xuống hai dòng ở chỗ hợp lý.
- Khi bật giảm chuyển động (`prefers-reduced-motion`): không tự chạy. Chú thích hiện 5A, rê chuột, chạm hoặc focus thì đổi.
- Không gắn `aria-live` cho chú thích tự chạy, vì trình đọc màn hình sẽ đọc liên tục.

### 4.2 Tổng quan: gọn còn một màn hình

- Bỏ trang con "4 động lực" khỏi Tổng quan, chuyển sang trang Vì sao.
- Tổng quan còn: nhãn, tiêu đề, lời dẫn và 4 mốc. Gói trong một màn hình, không còn trang con.
- 4 mốc giữ cách xếp hiện tại: số lớn là 2006 / 6 năm / Cấp 5 / 2050. Chữ theo file của thầy. File của thầy đảo hàng thứ 2 thành mốc "2026–2031", ý nghĩa "6 năm". Ta vẫn giữ "6 năm" làm số lớn, vì "2026–2031" quá dài cho cỡ chữ số lớn.

### 4.3 Trang Vì sao (mới)

**Vị trí và đánh số.** Thứ tự trên web: Hero → Tôn chỉ → **Vì sao** → Tổng quan → Bản sắc → Mô hình → Copilot → Trưởng thành → Lộ trình → Chỉ tiêu → Trụ cột → Thí điểm → Đối sánh → Nguyên tắc → Lời kết. Đánh số lại: 01 Vì sao, 02 Tổng quan, 03 Bản sắc, 04 Mô hình, 05 Copilot, 06 Trưởng thành, 07 Lộ trình, 08 Trụ cột, 09 Thí điểm, 10 Đối sánh, 11 Nguyên tắc. Chỉ tiêu vẫn không đánh số như hiện tại. Thêm "Vì sao" vào menu đầu trang (trước "Tổng quan") và vào dòng menu ở chân trang.

**Ba trang con**, dùng bộ điều khiển trang con có sẵn (`Panels`):

1. **Bốn động lực:** chuyển nguyên từ `overview.drivers`. Chữ đã có bản dịch của thầy.
2. **Hai con đường:** hai khối đặt cạnh nhau. Khối trái nền xám nhạt, khối phải nền tối, giống mockup.
3. **Nếu không thay đổi:** bảng 3 cột, 5 hàng. Cột cuối có ô mã lớp dẫn về mô hình.

**Chữ tiếng Việt đã được bạn duyệt.** Viết sát theo Executive Summary, mục 2 và bảng I.2:

- Nhãn: `01 — Vì sao` · Menu: `Vì sao`
- Tiêu đề: `Vì sao DAU cần đề án AI-native`
- Lời dẫn: `AI không còn chỉ hỗ trợ từng tác vụ nhỏ mà đang tác động đến toàn bộ chuỗi giá trị của đại học. Chỉ thêm chatbot vào LMS hay dùng AI soạn bài giảng mới là AI-assisted, chưa phải AI-native.`
- Con đường 1. Thẻ: `Con đường 1`. Tiêu đề: `Tiếp tục phát triển rời rạc`. Nội dung: `Mỗi phòng ban một phần mềm, mỗi khoa một cách làm, mỗi chương trình một ma trận chuẩn đầu ra, mỗi đợt kiểm định lại gom minh chứng thủ công.` Kết quả: `Kết quả: những “ốc đảo dữ liệu”, không đủ sức bảo đảm chất lượng, cá nhân hóa học tập hay tạo lợi thế dài hạn.` Phần nhấn mạnh: “ốc đảo dữ liệu”.
- Con đường 2. Thẻ: `Lựa chọn của DAU`. Tiêu đề: `Tích hợp thành một hệ sinh thái AI-native`. Nội dung: `Chuẩn đầu ra là xương sống, năng lực thực chứng là mục tiêu, dữ liệu là hạ tầng, AI là lớp hỗ trợ hành động.` Kết quả: `Kết quả: một thiết kế thống nhất, trong đó con người quyết định.` Phần nhấn mạnh: "con người quyết định".
- Tiêu đề cột bảng: `Vấn đề hiện tại` · `Hệ quả nếu không xử lý` · `Hướng giải quyết trong đề án`
- Các hàng của bảng:

| Vấn đề hiện tại | Hệ quả nếu không xử lý | Hướng giải quyết | Mã |
|---|---|---|---|
| Dữ liệu đào tạo, khảo thí, LMS, portfolio và kiểm định còn phân tán | Khó đo mức đạt chuẩn đầu ra, khó truy xuất minh chứng, khó ra quyết định nhanh | Lõi OBE/CBE, Bộ não thứ hai và quản trị dữ liệu | 5D, 5F |
| AI dễ bị dùng như công cụ rời rạc | Chatbot hóa bề mặt, không tạo thay đổi chất lượng thật | Điều phối tác nhân AI có con người trong vòng lặp | 5H |
| Đánh giá truyền thống dễ bị AI thay thế | Điểm số không còn phản ánh đầy đủ năng lực thật | Đánh giá kháng AI gắn quá trình, sản phẩm, bảo vệ và hồ sơ năng lực sống | 5I |
| Kiểm định còn nặng gom hồ sơ theo kỳ | Minh chứng thiếu tính sống, khó đóng vòng cải tiến PDCA | Minh chứng sống và sẵn sàng kiểm định liên tục | 5I |
| Sinh viên cần lộ trình cá nhân hóa | Dễ học thụ động, thiếu hỗ trợ đúng lúc | Gia sư AI theo bản đồ năng lực | 5E |

**Bản Anh, Nhật, Trung của trang này** do người làm dịch, bám bảng thuật ngữ và ghi chú trong file của thầy. Một số ví dụ: "kiểm định sống" → *continuous accreditation readiness*, "Bộ não thứ hai" → *Second Brain*, "Đánh giá kháng AI" → *AI-resistant assessment*. Tên lớp và tên Copilot dùng đúng như bản dịch của thầy trong slide Mô hình và Copilot.

### 4.4 Chế độ sách: kiểu A, sách mở hai trang

**Cách vào và ra**

- Nút "Xem dạng sách" trên thanh đầu trang, cạnh chỗ đổi ngôn ngữ. Nút ẩn khi màn hình rộng dưới 1024px hoặc đang để dọc.
- Bấm nút thì sách phủ toàn bộ cửa sổ và xin chế độ toàn màn hình (Fullscreen API). Nếu trình duyệt từ chối toàn màn hình thì sách vẫn phủ kín cửa sổ.
- Thoát bằng Esc hoặc nút đóng. Thoát toàn màn hình (sự kiện `fullscreenchange`) thì cũng đóng sách, vì nhiều trình duyệt nuốt phím Esc đầu tiên.
- Sách mở ở đúng lần mở sách chứa phần đang hiện trên web. Đóng sách thì web cuộn về phần ứng với trang đang mở. Đây là quyết định của mình.
- Sách chỉ có sau khi đã nhập mã truy cập (nút nằm trong `#deck`).

**Điều khiển**

- → và PageDown lật tới, ← và PageUp lật lui. Bút trình chiếu thường gửi PageUp/PageDown hoặc phím mũi tên.
- Home về bìa, End về bìa sau.
- Bấm trang phải là lật tới, bấm trang trái là lật lui.
- Khi sách mở, phím tắt của `Deck` phải im, và trang web phía sau không cuộn.
- Khi sách mở, chặn phím F5, vì nhiều bút trình chiếu có nút gửi F5; lỡ bấm cũng không tải lại trang. Esc vẫn đóng sách.

**Hình thức** (theo mockup `flip-style.html`, kiểu A)

- Hai trang giấy đặt trên nền tối. Tờ giấy lật qua gáy bằng CSS 3D, khoảng 1 giây, có bóng ở gáy và bóng khi đang lật.
- Mỗi trang có dòng tiêu đề nhỏ ở trên: trang trái là tên đề án, trang phải là tên trường, lấy từ chuỗi có sẵn. Mỗi trang có số trang ở góc ngoài.
- Khi bật giảm chuyển động thì đổi trang tức thì, không lật.
- Sách giữ tỷ lệ cố định và co giãn theo màn hình.
- **Ngưỡng đọc được** (đo ở màn hình 1280×720): chữ nội dung trên trang ≥ 16px, tiêu đề phần ≥ 32px. Dòng tiêu đề nhỏ và số trang được nhỏ hơn.

**Nội dung**

- Sách dùng đúng chuỗi trong Dict của ngôn ngữ đang xem. Được bỏ bớt dòng phụ khi trang chật, ví dụ chỉ giữ tên 9 lớp mà bỏ mô tả, hoặc bỏ câu "dành cho" của Copilot.
- Được dàn lại bố cục, ví dụ bảng 3 cột đổi thành các khối xếp dọc.
- **Không được viết câu mới.** Ngoại lệ duy nhất là nhãn giao diện của sách: "Xem dạng sách", "Đóng", nhãn trợ năng. Các nhãn này là chuỗi mới, cần dịch và đưa vào danh sách duyệt (mục 4.5).

**Kế hoạch trang** (khoảng 16 lần mở, người làm được chỉnh theo độ vừa chữ; mỗi phần bắt đầu ở trang trái):

| # | Trang trái | Trang phải |
|---|---|---|
| 1 | Sơ đồ mô hình, có chú thích kiểu C | Bìa: dòng trên tiêu đề, tiêu đề, tên mô hình, Tôn chỉ, logo DAU |
| 2 | 01 Vì sao: nhãn, tiêu đề, lời dẫn | Bốn động lực |
| 3 | Hai con đường | Nếu không thay đổi (5 khối xếp dọc) |
| 4 | 02 Tổng quan: nhãn, tiêu đề, lời dẫn | 4 mốc |
| 5 | 03 Bản sắc: nhãn, tiêu đề, lời dẫn | Triết lý 5T |
| 6 | Giáo dục 5T | Giá trị học hiệu 5T và chỉ dấu vận hành |
| 7 | 04 Mô hình, số lớn "9" | 9 lớp |
| 8 | 05 Copilot, số lớn "4", ba câu trích | 4 Copilot và giới hạn |
| 9 | 06 Trưởng thành, số lớn "5" | 5 cấp độ và mục tiêu |
| 10 | 07 Lộ trình và câu nguyên tắc | 6 giai đoạn và ghi chú |
| 11 | Chỉ tiêu: nhãn, tiêu đề, ghi chú | 5 chỉ tiêu |
| 12 | 08 Trụ cột, số lớn "7" | 7 trụ cột và ưu tiên liên ngành |
| 13 | 09 Thí điểm: nhãn, tiêu đề, nhãn bản thử nghiệm, ảnh, lời dẫn | Rubric TC1–TC9 |
| 14 | 10 Đối sánh và 4 con số | 6 lợi thế và lưu ý |
| 15 | 11 Nguyên tắc | 6 nguyên tắc |
| 16 | Lời kết (trích dẫn) | Bìa sau: DAU, địa chỉ, ghi chú nguồn, © |

Số lớn "9", "4", "5", "7" lấy từ con số đã có trên site (thống kê ở hero, tên phần), không phải chữ mới.

### 4.5 Chuẩn hóa bản dịch theo file của thầy

**Nguyên tắc**

- 3 file của thầy là chuẩn cho mọi chuỗi có trong file, ở cả 4 thứ tiếng.
- Cột tiếng Việt giống nhau ở cả 3 file; đã đối chiếu tên lớp và tên Copilot. Người làm vẫn phải so toàn bộ cột tiếng Việt giữa 3 file. Nếu có chỗ lệch thì dừng lại và báo, không tự chọn.
- Giữ cấu trúc của site (nhãn, tiêu đề, lời dẫn, các mục). Lấy chữ từ file cho từng chỗ tương ứng.
- Nhãn phần giữ dạng `NN — Tên` của site. File ghi "01 Tổng quan" thì site ghi `02 — Tổng quan` sau khi đánh số lại.
- Chỗ nào file gộp nhãn và tiêu đề làm một thì dùng câu của file làm tiêu đề. Nhãn khi đó là số phần cộng tên ngắn, lấy theo tên phần trong file. Hai chỗ như vậy: Chỉ tiêu ("Chỉ tiêu đề xuất đến năm 2030") và Nguyên tắc ("10 Nguyên tắc vận hành").
- Chỗ file viết một câu "Tên. Nội dung" (các giai đoạn lộ trình, "Dành cho: …", "Giới hạn: …") thì tách vào đúng trường của Dict. Ví dụ `name` / `text`, `for` / `does` / `guard`. Nhãn "Dành cho", "Giới hạn" lấy từ file cho `forLabel` / `guardLabel`.
- `hero.title` là cặp hai dòng. File cho một câu, người làm tách ở chỗ tự nhiên:
  - vi: "Đại học AI-native" / "lấy con người làm trung tâm"
  - en: "A human-centered" / "AI-native university"
  - ja: "人間中心の" / "AIネイティブ大学"
  - zh: "以人为本的" / "AI原生大学"
- Tên có tiếng Anh trong ngoặc (bản Nhật, Trung) thì giữ nguyên ở chỗ rộng. Ở chỗ chật như sơ đồ hay trang sách thì được bỏ phần trong ngoặc.

**Các thay đổi tiếng Việt đã thấy** (chưa đủ hết, người làm đối chiếu toàn bộ):

- Tên mô hình ở hero thành "Đại học AI-native dựa trên năng lực theo mô hình 5T".
- `brand.project` thành "Đại học AI-native".
- Nhãn thống kê viết hoa chữ đầu.
- Tên 9 lớp, ví dụ "5T lấy con người làm trung tâm", "Hệ sinh thái CBE AI-native", "Lõi OBE/CBE", "Bản đồ năng lực", "Bộ não thứ hai và quản trị".
- Tên 4 Copilot.
- Tên 5 giai đoạn lộ trình, ví dụ "Sẵn sàng cho AI và CBE".
- Tên trụ cột, tiêu chuẩn rubric và nhãn liên ngành dùng "và" thay cho "&".
- Danh sách ưu tiên liên ngành chuyển sang tiếng Việt.
- Ba câu trích ở phần Copilot có dấu chấm cuối.

**Tiếng Anh:** thay toàn bộ theo file. File dùng chính tả Mỹ, *initiative* thay cho *project*, *demonstrated competence*, tôn chỉ "Substance – Proven Capability – Shaping the Future", v.v.

**Tiếng Nhật, Trung:** thay toàn bộ theo file. Văn phong bản Nhật đổi sang thể である. Bỏ `translationNote` ở cả hai.

**Chuỗi không có trong file:** `meta.description`, `gate.error`, `nav.menu`, `nav.close`, menu "Vì sao", trang Vì sao, nhãn giao diện của sách, chữ của trang 404 (`global-not-found.tsx`). Người làm dịch hoặc sửa cho khớp thuật ngữ; ví dụ trang 404 bản Anh đổi "project" thành "initiative". Tất cả những chuỗi này ghi vào **`docs/translation-review/2026-10-20-new-strings.md`**: mỗi chuỗi có đủ 4 thứ tiếng và chỗ dùng, để bạn gửi thầy duyệt.

**Chữ dịch mới được lên site ngay**, không chờ thầy duyệt:
- Trang Vì sao ở bản Anh, Nhật, Trung có thêm một dòng ghi chú nhỏ, nghĩa là "phần này đang chờ duyệt bản dịch". Ghi chú nằm trong trường `why.note`; bản Việt không có trường này. Bỏ ghi chú khi thầy duyệt xong.
- Danh sách `new-strings.md` phải xong ngay sau các bước chữ, trước phần hero và sách, để thầy duyệt song song.

**Việc kéo theo:** `llms.txt` tự đổi theo Dict. Ảnh OG có chữ tiêu đề hero, phải chạy lại `npm run og`. JSON-LD và metadata lấy từ Dict nên tự đổi.

### 4.6 Xuống dòng

**Quy tắc**

- Không tách đôi từ tiếng Việt. Dùng cơ chế sẵn có `src/content/keep.ts`. Bổ sung vào danh sách mọi cụm từ mới hoặc đổi từ file của thầy và trang Vì sao, ví dụ "ốc đảo dữ liệu", "cá nhân hóa", "Gia sư AI", "Bộ não thứ hai", "Lõi OBE/CBE", "bản đồ năng lực".
- Không ngắt sau dấu gạch trong "AI-native", "AI-assisted", "AI-ready". keep.ts đã chèn ký tự nối từ sau "AI-", cần kiểm tra lại cho chuỗi mới.
- Ô mã lớp luôn dính với chữ đứng trước.
- Tiêu đề dùng `text-wrap: balance`, đoạn văn dùng `pretty` (đã có).
- Tiếng Nhật dùng `word-break: auto-phrase`, tiếng Trung dùng `line-break: strict` (đã có).
- Mọi chuỗi hiển thị, kể cả trong sách và chú thích hero, phải đi qua `getDict` / `keepTogether` hoặc `fix()`.

**Kiểm chứng**

- Viết một script chụp màn hình. `puppeteer-core` đã có, cách dùng như `scripts/og-images.mts`.
- Chụp mọi slide, mọi trang con và mọi lần mở sách, ở 4 thứ tiếng, ở 3 cỡ: 1280×720, 1440×900, 1920×1080. Ảnh lưu vào thư mục không commit.
- Soát từng ảnh, sửa hết lỗi xuống dòng, tràn, cắt chữ. Gửi kèm bộ ảnh khi bàn giao.

## 5. Ràng buộc kỹ thuật

- Thiết bị trình chiếu (đã xác nhận): màn 16:9, trình duyệt Chrome, bút trình chiếu gửi PageUp/PageDown. Các cỡ kiểm tra 1280×720, 1440×900, 1920×1080 bám theo đó.
- Next.js 16.4, React 19, Tailwind 4, TypeScript 7. `output: "export"` (tĩnh, không có server), `trailingSlash`. Theo `AGENTS.md`: đọc tài liệu trong `node_modules/next/dist/docs/` trước khi viết code, vì API khác với kiến thức cũ.
- Mọi chữ nằm trong `src/content/{vi,en,ja,zh}.ts`, có kiểu `Dict` (`types.ts`). Thêm trường mới thì thêm vào kiểu và đủ 4 file.
- `Deck.tsx` bắt phím trên `window`. `Panels.tsx` điều khiển trang con. `Header.tsx` có menu `sectionIds`. `HeroVisual.tsx` hiện không theo ngôn ngữ, cần nhận chữ từ Dict.
- Menu đầu trang sẽ có 7 mục cộng nút sách cộng chỗ chọn ngôn ngữ. Phải kiểm tra không tràn ở cỡ 1024–1280px. Nếu chật thì được ẩn menu ở cỡ đó, giữ lại nút sách.
- `html` đang dùng `scroll-snap`. Khi sách mở phải khóa cuộn.
- Không commit thư mục `.superpowers/`.

## 6. Để lại cho người làm

- Cách chia component và cách sinh trang sách từ Dict: dùng chung dữ liệu, layout trang sách riêng.
- Cách cài hiệu ứng lật (khuyên dùng CSS 3D) và cách đồng bộ chú thích hero (CSS hay JS).
- Chia trang sách chính xác, bỏ dòng phụ nào khi chật (trong giới hạn mục 4.4).
- Chi tiết trợ năng: bẫy focus trong sách, vai trò dialog, nhãn nút.
- Cách xử lý chạm trên điện thoại cho chú thích hero.
- Tên khóa mới trong Dict, chữ tiếng Anh, Nhật, Trung cho chuỗi mới (theo bảng thuật ngữ).
- Thứ tự làm. Gợi ý: chữ trước (mọi thứ khác dùng chữ mới), rồi Tổng quan và Vì sao, rồi hero, rồi sách, cuối cùng soát xuống dòng.

## 7. Nghiệm thu

1. Cả 4 thứ tiếng: mọi chuỗi có trong file của thầy mà ứng với một chỗ trên site đều hiển thị đúng như file, sau khi tách vào trường của Dict. Ngoại lệ: cột "Ý nghĩa" của bảng 5T (xem Q1).
2. Có `docs/translation-review/2026-10-20-new-strings.md` liệt kê đủ chuỗi mới.
3. Hero: chú thích chạy, rê chuột, chạm hoặc focus thì dừng ở lớp đó. Không nhảy bố cục. Hero vừa màn hình đầu ở 1280×720 và 1440×900.
4. Tổng quan một màn hình. Vì sao có 3 trang con, đánh số và menu đúng.
5. Sách mở từ nút, lật bằng chuột, phím mũi tên, PageUp/PageDown, Home/End. Đóng bằng Esc, nút đóng và khi thoát toàn màn hình. Đang mở sách thì web không cuộn, phím của Deck không chạy. Nút sách ẩn dưới 1024px. Giảm chuyển động thì không lật. Chữ đạt ngưỡng đọc ở 1280×720.
6. Bộ ảnh chụp (mục 4.6) không còn lỗi xuống dòng, tràn hay cắt chữ.
7. `npm run build` chạy sạch. Ảnh OG được tạo lại.

## 8. Câu hỏi còn mở

- Q1. Bảng 5T trong file của thầy có thêm cột "Ý nghĩa" cho từng chữ T (ví dụ Tĩnh tại: "Sự tĩnh lặng nội tâm"). Site hiện không có cột này. **Tạm chốt (quyết định của mình): không hiển thị**, giữ như site hiện tại. Ghi chú thuật ngữ của thầy mô tả cột này là phần giải nghĩa cho người đọc bản dịch. Nếu thầy muốn hiển thị thì thêm một trường `meaning` vào mục T sau.
- Q2. Chữ dịch mới có được lên site trước khi thầy duyệt không? **Có**, kèm ghi chú `why.note` (xem 4.5). Bạn đã đồng ý ngày 21/10.
- Q3. Có hạn chót hay deploy không? **Không gấp. Không deploy**, bạn tự deploy. Bạn đã đồng ý ngày 21/10.
- Q4. Thiết bị phòng họp? **16:9, Chrome, bút gửi PageUp/PageDown. Chặn F5 khi mở sách.** Bạn đã đồng ý ngày 21/10.
